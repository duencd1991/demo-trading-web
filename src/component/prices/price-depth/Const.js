const symbolInformation = {
  MATCH_PRICE: 'price.matchPrice',
  PRICE_CHANGE: 'price.priceChange',
  PERCENT_PRICE_CHANGE: 'price.percentPriceChange',
  OPEN_PRICE: 'price.openPrice',
  HIGHEST_PRICE: 'price.highestPrice',
  LOWEST_PRICE: 'price.lowestPrice',
  BID: 'bidAsk.best1Bid',
  ASK: 'bidAsk.best1Offer',
  REFERENCE_PRICE: 'price.referencePrice',
};

const list3Data = [...Array(3)].map((_, index) => {
  return {
    BID: `bidAsk.best${index + 1}Bid`,
    BID_VOLUME: `bidAsk.best${index + 1}BidVolume`,
    ASK: `bidAsk.Best${index + 1}Offer`,
    ASK_VOLUME: `BidAsk.best${index + 1}OfferVolume`,
  };
});

const list10Data = [...Array(10)].map((_, index) => {
  return {
    BID: `bidAsk.best${index + 1}Bid`,
    BID_VOLUME: `bidAsk.best${index + 1}BidVolume`,
    ASK: `bidAsk.best${index + 1}Offer`,
    ASK_VOLUME: `bidAsk.best${index + 1}OfferVolume`,
  };
});

const relatedInformations = {
  BID: 'bidAsk.best1Bid',
  ASK: 'bidAsk.best1Offer',
  Fr_Buy_Vol: 'price.foreignBuyVolumeTotal',
  Fr_Sell_Vol: 'price.foreignSellVolumeTotal',
  VOLUME: 'price.totalMatchVolume',
  AVG_PRICE: 'price.averagePrice',
  AVG_Vol_1M: 'extraInfo.averageVolume1Month',
  AVG_Vol_10D: 'extraInfo.averageVolume2Week',
  PE: 'extraInfo.rtd21',
  ROE: 'extraInfo.rtq12',
  PB: 'extraInfo.rtd25',
  FOREIGN_OWNER: 'extraInfo.foreignerPercentage',
  RANKING: 'ranking',
  EPS: 'extraInfo.rtd14',
  BETA: 'extraInfo.rtd35',
  MARKET_CAP: 'extraInfo.rtd11',
  TOTAL_MATCH_VALUE: 'price.totalMatchValue',
  TOTAL_MATCH_VOLUME: 'price.totalMatchVolume',
};

const priceData = {
  PRICE: 'Price',
  BIDASK: 'BidAsk',
  EXTRAINFO: 'ExtraInfo',
};

const listTicker = {
  ORGAN_CODE: 'organCode',
  TICKER: 'ticker',
  ORGAN_SHORT_NAME: 'organShortName',
  COM_GROUP_CODE: 'comGroupCode',
};

const listIndex = {
  COM_GROUP_CODE: 'comGroupCode',
  COM_GROUP_NAME: 'comGroupName',
};

const listDerivatives = {
  DERIVATIVE_CODE: 'derivativeCode',
  DERIVATIVE_NAME: 'derivativeName',
  COM_GROUP_CODE: 'comGroupCode',
};

const defaultCode = 'AAA';

const defaultCodeName = 'An Phat Plastic';

const realTimeData = {
  MATCH_PRICE: 'matchPrice',
  PRICE_CHANGE: 'priceChange',
  PERCENT_PRICE_CHANGE: 'percentPriceChange',
  OPEN_PRICE: 'openPrice',
  HIGHEST_PRICE: 'highestPrice',
  LOWEST_PRICE: 'lowestPrice',
  REFERENCE_PRICE: 'referencePrice',
  LIST_10_DATA: [...Array(10)].map((_, index) => {
    return {
      BID: `best${index + 1}Bid`,
      BID_VOLUME: `best${index + 1}BidVolume`,
      ASK: `best${index + 1}Offer`,
      ASK_VOLUME: `best${index + 1}OfferVolume`,
    };
  }),
  BID: 'best1Bid',
  ASK: 'best1Offer',
  TRADING_DATE: 'tradingDate',
};

const listIndexName = {
  vnIndex: 'VNINDEX',
  hnIndex: 'HNXINDEX',
  upcomIndex: 'UPCOMINDEX',
};

const listIndexExchange = {
  hose: 'HOSE',
  hnx: 'HNX',
  upcom: 'UPCOM',
};

const exportConfigs = {
  page: {
    width: 928,
    height: 1306,
  },
  listPromise: {
    data: [
      {
        isId: false,
        className: '.headerAndFooterPdf',
        config: {
          x: 0,
          y: 0,
          width: 928,
          height: 1306,
        },
      },
    ],
  },
};

export default {
  symbolInformation,
  relatedInformations,
  list3Data,
  list10Data,
  priceData,
  listTicker,
  listIndex,
  defaultCode,
  realTimeData,
  defaultCodeName,
  listDerivatives,
  listIndexName,
  listIndexExchange,
  exportConfigs,
};
