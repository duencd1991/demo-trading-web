import { ChanelConfig } from '../../../../configs/GlobalConfig';
import messageHub from '../../../signalr/SignalrMessageHub';
import store from '../../../../component/app/store';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../../component/app/commonReducer';
import {
  EXCHANGES,
  MAP_EXCHANGES,
  MAX_ITEM_LENGTH,
  PRICE_SCALE,
  supportedResolutions,
  SYMBOL_TYPES,
  config,
} from './Const';
import historyProvider, { getPrice } from './historyProvider';

let subscribers = {};

const formatStockSymbol = (item, exchange, type = SYMBOL_TYPES.STOCK) => ({
  exchange,
  type,
  symbol: item.ticker,
  full_name: item.ticker,
  description: item.organShortName,
});

const formatFuturesSymbol = (item, exchange, type = SYMBOL_TYPES.FUTURES) => ({
  exchange,
  type,
  symbol: item.derivativeCode,
  full_name: item.derivativeCode,
  description: item.derivativeName,
});

const formatIndicesSymbol = (item, exchange, type = SYMBOL_TYPES.INDICES) => ({
  exchange,
  type,
  symbol: item.comGroupCode,
  full_name: item.comGroupCode,
  description: item.comGroupName,
});

const formatEconomySymbol = (item, exchange, type = SYMBOL_TYPES.ECONOMY) => ({
  exchange,
  type,
  symbol: item.code,
  full_name: item.code,
  description: item.name,
});

const formatList = ({
  items,
  formatItem,
  userInput,
  exchange,
  searchFields,
}) => {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.reduce((result, item) => {
    const includeChar = searchFields.some(
      field => item[field] && item[field].includes(userInput),
    );
    const hasExchange =
      exchange === EXCHANGES.ALL ||
      (MAP_EXCHANGES[exchange] &&
        MAP_EXCHANGES[exchange].includes(item.comGroupCode));
    if (includeChar && hasExchange) {
      return result.concat(formatItem(item, exchange));
    }

    return result;
  }, []);
};

const getALlSymbols = (userInput, exchange) => {
  const promises = [
    getStockSymbols(userInput, exchange),
    getFuturesSymbols(userInput, exchange),
    getIndicesSymbols(userInput, exchange),
    getEconomySymbols(userInput, exchange),
  ];

  return Promise.all(promises).then(([stocks, futures, indices, economies]) => [
    ...stocks,
    ...futures,
    ...indices,
    ...economies,
  ]);
};

const getStockSymbols = (userInput, exchange) => {
  const searchFields = ['organCode', 'organShortName'];
  const stocks = store.getState()[COMMON_REDUCER_NAME].listOrganizationSearch;
  return Promise.resolve(
    formatList({
      items: stocks,
      searchFields,
      userInput,
      exchange,
      formatItem: formatStockSymbol,
    }),
  );
};

const getFuturesSymbols = (userInput, exchange) => {
  const searchFields = ['comGroupCode', 'derivativeName'];
  const items = store.getState()[COMMON_REDUCER_NAME].listDerivative;
  return Promise.resolve(
    formatList({
      items,
      searchFields,
      userInput,
      exchange,
      formatItem: formatFuturesSymbol,
    }),
  );
};

const getIndicesSymbols = (userInput, exchange) => {
  const searchFields = ['comGroupCode', 'comGroupName'];
  const items = store.getState()[COMMON_REDUCER_NAME].listCompanyGroup;
  return Promise.resolve(
    formatList({
      items,
      userInput,
      exchange,
      searchFields,
      formatItem: formatIndicesSymbol,
    }),
  );
};

const getEconomySymbols = (userInput, exchange) => {
  const searchFields = ['code', 'name'];
  const items = store.getState()[COMMON_REDUCER_NAME].listEconomy;
  return Promise.resolve(
    formatList({
      items,
      userInput,
      exchange,
      searchFields,
      formatItem: formatEconomySymbol,
    }),
  );
};

const isCreateNewBar = (resolution, ticker, symbolInfo, subscriberUID) => {
  const tradingDate = new Date(ticker.tradingDate);
  let minutes = resolution;
  if (resolution.includes('D')) {
    minutes = 1440;
  }

  return (
    tradingDate.getTime() >
    subscribers[subscriberUID].lastBar.time + minutes * 60000
  );
};

const onReceiveTickers = (
  tickers,
  symbolInfo,
  resolution,
  onRealtimeCallback,
  onResetCacheNeededCallback,
  subscriberUID,
) => {
  const ticker = tickers.find(t => t.ticker === symbolInfo.ticker);
  if (!ticker) {
    return;
  }
  if (isCreateNewBar(resolution, ticker, symbolInfo, subscriberUID)) {
    subscribers[subscriberUID].lastBar = {
      time: new Date(ticker.tradingDate).getTime(),
      low: getPrice(symbolInfo, ticker.matchPrice),
      high: getPrice(symbolInfo, ticker.matchPrice),
      open: getPrice(symbolInfo, ticker.matchPrice),
      close: getPrice(symbolInfo, ticker.matchPrice),
      volume: ticker.matchVolume,
    };
  } else {
    const isIntraday = !resolution.includes('D');
    const volume = isIntraday
      ? subscribers[subscriberUID].lastBar.volume + ticker.matchVolume
      : ticker.totalMatchVolume;
    subscribers[subscriberUID].lastBar = {
      ...subscribers[subscriberUID].lastBar,
      volume,
      low: Math.min(
        getPrice(symbolInfo, ticker.matchPrice),
        subscribers[subscriberUID].lastBar.low,
      ),
      high: Math.max(
        getPrice(symbolInfo, ticker.matchPrice),
        subscribers[subscriberUID].lastBar.high,
      ),
      close: getPrice(symbolInfo, ticker.matchPrice),
    };
  }
  onRealtimeCallback(subscribers[subscriberUID].lastBar);
};

const getSymbolType = symbolName => {
  const futures = store.getState()[COMMON_REDUCER_NAME]
    .listDerivativeByDerivativeCode;
  const indices = store.getState()[COMMON_REDUCER_NAME]
    .listCompanyGroupByComGroupCode;
  const economies = store.getState()[COMMON_REDUCER_NAME]
    .listEconomyByEconomyCode;

  if (futures[symbolName]) {
    return SYMBOL_TYPES.FUTURES;
  }

  if (indices[symbolName]) {
    return SYMBOL_TYPES.INDICES;
  }

  if (economies[symbolName]) {
    return SYMBOL_TYPES.ECONOMY;
  }

  return SYMBOL_TYPES.STOCK;
};

export default {
  onReady: cb => {
    setTimeout(() => {
      cb(config);
    }, 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    const mapFunction = {
      [SYMBOL_TYPES.ALL]: getALlSymbols,
      [SYMBOL_TYPES.STOCK]: getStockSymbols,
      [SYMBOL_TYPES.FUTURES]: getFuturesSymbols,
      [SYMBOL_TYPES.INDICES]: getIndicesSymbols,
      [SYMBOL_TYPES.ECONOMY]: getEconomySymbols,
    };
    if (
      mapFunction[symbolType] &&
      typeof mapFunction[symbolType] === 'function'
    ) {
      mapFunction[symbolType](userInput, exchange).then(symbols => {
        symbols.length = Math.min(MAX_ITEM_LENGTH, symbols.length);
        onResultReadyCallback(symbols);
      });
    }
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    const type = getSymbolType(symbolName);
    const symbolStub = {
      type,
      name: symbolName,
      ticker: symbolName,
      minmov: 1,
      pricescale: PRICE_SCALE,
      supported_resolution: supportedResolutions,
      has_intraday: type !== SYMBOL_TYPES.ECONOMY,
      session: '0900-1500',
      timezone: 'Asia/Bangkok',
      intraday_multipliers: ['1', '60'],
    };

    setTimeout(() => {
      onSymbolResolvedCallback(symbolStub);
    }, 0);
  },

  getBars: (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest,
  ) => {
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then(bars => {
        if (!bars.length) {
          onHistoryCallback(bars, { noData: true });
          return;
        }
        if (firstDataRequest) {
          const subscriberUID = `${symbolInfo.ticker}_${resolution}`;
          subscribers[subscriberUID] = {
            lastBar: bars[bars.length - 1],
          };
        }
        onHistoryCallback(bars, { noData: false });
      })
      .catch(err => {
        console.log(err);
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback,
  ) => {
    if (!subscribers[subscriberUID]) {
      return;
    }
    subscribers[subscriberUID].listener = tickers =>
      onReceiveTickers(
        tickers,
        symbolInfo,
        resolution,
        onRealtimeCallback,
        onResetCacheNeededCallback,
        subscriberUID,
      );
    messageHub.subscribe(
      ChanelConfig.TickChanel,
      subscribers[subscriberUID].listener,
    );
  },
  unsubscribeBars: subscriberUID => {
    if (!subscribers[subscriberUID]) {
      return;
    }
    messageHub.unsubscribe(
      ChanelConfig.TickChanel,
      subscribers[subscriberUID].listener,
    );
    const { [subscriberUID]: _, ...rest } = subscribers;
    subscribers = rest;
  },
  getMarks: async (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution,
  ) => {
    if (symbolInfo.type !== SYMBOL_TYPES.STOCK) {
      return;
    }
    const marks = await historyProvider.getMarks(
      symbolInfo,
      startDate,
      endDate,
    );
    onDataCallback(marks);
  },
  getTimescaleMarks: async (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution,
  ) => {
    if (symbolInfo.type !== SYMBOL_TYPES.STOCK) {
      return;
    }
    const timescaleMarks = await historyProvider.getTimescaleMarks(
      symbolInfo,
      startDate,
      endDate,
    );
    onDataCallback(timescaleMarks);
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {},
  getServerTime: cb => {},
};
