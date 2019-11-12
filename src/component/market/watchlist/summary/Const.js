import _ from 'lodash';

const index = {
  TICKER: 'ticker', // Ticker
  REFERENCE_PRICE: 'priceInfo.referencePrice', // Ref
  MATCH_PRICE: 'priceInfo.matchPrice', // Price
  PRICE_CHANGE: 'priceInfo.priceChange', // Change
  D_CHANGE: 'priceInfo.percentPriceChange',
  TOTAL_MATCH_VOLUME: 'priceInfo.totalMatchVolume', // Volume
  TOTAL_MATCH_VALUE: 'priceInfo.totalMatchValue', // Value

  NET_FOREIGN_VOLUME_MATCHED: 'priceInfo.netForeignVolumeMatched', // Net Foreign = ForeignBuyVolumeMatched - ForeignSellVolumeMatched
  FOREIGN_BUY_VOLUME_MATCHED: 'priceInfo.foreignBuyVolumeMatched',
  FOREIGN_SELL_VOLUME_MATCHED: 'priceInfo.foreignSellVolumeMatched',

  CLOSE_PRICE: 'priceInfo.closePrice', // Trend
  AVERAGE_PRICE_DAILY: 'movingAveragePrice.daily', // for trend
  AVERAGE_PRICE_5SESSION_WEEKLY: 'movingAveragePrice.weekly', // for trend
  AVERAGE_PRICE_5SESSION_MONTHLY: 'movingAveragePrice.monthly', // for trend
  AVERAGE_PRICE_5SESSION_QUARTERLY: 'movingAveragePrice.quarterly', // for trend

  DAY_RANGE: 'priceInfo.dayRange', // calculate from LowestPrice, HighestPrice, MatchPrice, ReferencePrice
  PERFORMANCE: 'priceInfo.performance', // calculate MatchPrice, ReferencePrice
  RANKING: 'rank',
  ORGAN_SHORT_NAME: 'extraFields.organShortName', // Symbol Name
  COM_GROUP_CODE: 'extraFields.comGroupCode', // Exchange
  PUT_THROUGH_PRICE: 'priceInfo.dealPrice', // Put-through Price   DEAL_PRICE
  TOTAL_DEAL_VOLUME: 'priceInfo.totalDealVolume', // Put through vol  PUT_THROUGH_VOL
  TOTAL_DEAL_VALUE: 'priceInfo.totalDealValue', // Put through price  PUT_THROUGH_VAL
  BEST_1_BID: 'bidAsk.best1Bid', // Bid Price
  BEST_1_OFFER: 'bidAsk.best1Offer', // Ask Price
  CEILING_PRICE: 'priceInfo.ceilingPrice', // Ceiling price
  FLOOR_PRICE: 'priceInfo.floorPrice', // Floor price
  OPEN_PRICE: 'priceInfo.openPrice', // Open price
  HIGHEST_PRICE: 'priceInfo.highestPrice', // Highest price
  LOWEST_PRICE: 'priceInfo.lowestPrice', // Lowest price
  AVERAGE_PRICE: 'priceInfo.averagePrice', // Average price

  _52W_RANGE: '_52WRange',
  ONE_YEAR_HIGH: 'extraFields.highestPrice1Year',
  ONE_YEAR_LOW: 'extraFields.lowestPrice1Year',

  MATCH_VOLUME: 'priceInfo.matchVolume',
  MATCH_VALUE: 'priceInfo.matchValue',
  TOTAL_BUY_TRADE_VOLUME: 'priceInfo.totalBuyTradeVolume', //UNMATCHED_BUY_VOLUME
  TOTAL_SELL_TRADE_VOLUME: 'priceInfo.totalSellTradeVolume', //UNMATCHED_SELL_VOLUME
  FOREIGN_BUY_VOLUME_TOTAL: 'priceInfo.foreignBuyVolumeTotal',
  FOREIGN_BUY_VALUE_TOTAL: 'priceInfo.foreignBuyValueTotal',
  FOREIGN_SELL_VOLUME_TOTAL: 'priceInfo.foreignSellVolumeTotal',
  FOREIGN_SELL_VALUE_TOTAL: 'priceInfo.foreignSellValueTotal',
  FOREIGN_CURRENT_ROOM: 'priceInfo.foreignCurrentRoom',
  FOREIGN_NET_VALUE_TOTAL: 'priceInfo.foreignNetValueTotal', // = ForeignBuyValueTotal - ForeignSellValueTotal
  FREE_FLOAT: 'extraFields.freeFloat',
  FREE_FLOAT_RATE: 'freeFloatRate', //% Vol/Flee Float  = TotalMatchVolume/FreeFloat
  RTD19: 'extraFields.rtd19', //beta
  AVERAGE_MATCHED_VOLUME_2WEEK: 'extraFields.averageMatchVolume2Week',
  AVERAGE_MATCHED_VOLUME_1MONTH: 'extraFields.averageMatchVolume1Month',
  AVERAGE_MATCHED_VOLUME_3MONTH: 'extraFields.averageMatchVolume3Month',
  AVERAGE_MATCHED_VOLUME_1YEAR: 'extraFields.averageMatchVolume1Year',
  PERCENT_PRICE_CHANGE_1WEEK: 'performance.percentPriceChange1Week',
  PERCENT_PRICE_CHANGE_1MONTH: 'performance.percentPriceChange1Month',
  PERCENT_PRICE_CHANGE_3MONTH: 'performance.percentPriceChange3Month',
  PERCENT_PRICE_CHANGE_1YEAR: 'performance.percentPriceChange1Year',

  //======================
  ORGAN_CODE: 'organCode', // Organ Code
  TRADING_DATE: 'priceInfo.tradingDate',

  //======================

  // TOTAL_BUY_TRADE_VOLUME: 'priceInfo.totalBuyTradeVolume',
  // TOTAL_SELL_TRADE_VOLUME: 'priceInfo.totalSellTradeVolume',
  // TOTAL_VOLUME: 'priceInfo.totalVolume',
  // TOTAL_VALUE: 'priceInfo.totalValue',
};

const listIgnoreColumnIndex = [
  'FOREIGN_BUY_VOLUME_MATCHED',
  'FOREIGN_SELL_VOLUME_MATCHED',
  'TRADING_DATE',
  'ORGAN_CODE',
  'AVERAGE_PRICE_DAILY',
  'AVERAGE_PRICE_5SESSION_WEEKLY',
  'AVERAGE_PRICE_5SESSION_MONTHLY',
  'AVERAGE_PRICE_5SESSION_QUARTERLY',
  'ONE_YEAR_HIGH',
  'ONE_YEAR_LOW',
];

const listIgnoreColumnInMangageColumn = [
  'TICKER',
  'FOREIGN_BUY_VOLUME_MATCHED',
  'FOREIGN_SELL_VOLUME_MATCHED',
  'TRADING_DATE',
  'ORGAN_CODE',
  'AVERAGE_PRICE_DAILY',
  'AVERAGE_PRICE_5SESSION_WEEKLY',
  'AVERAGE_PRICE_5SESSION_MONTHLY',
  'AVERAGE_PRICE_5SESSION_QUARTERLY',
  'ONE_YEAR_HIGH',
  'ONE_YEAR_LOW',
];

const listHideColumnIndex = Object.values(
  _.omit(index, [
    'TICKER',
    'REFERENCE_PRICE',
    'MATCH_PRICE',
    'PRICE_CHANGE',
    'D_CHANGE',
    'TOTAL_MATCH_VOLUME',
    'TOTAL_MATCH_VALUE',
    'NET_FOREIGN_VOLUME_MATCHED',
    'CLOSE_PRICE',
    'RANKING',
    'DAY_RANGE',
    'PERFORMANCE',
  ]),
);

const listDisplayNullWhenValueEqualZeroInSummary = {};

const listDisplayNullWhenTotalVolumeEqualZeroInSummary = {
  MATCH_PRICE: 'priceInfo.matchPrice', // Price
  PRICE_CHANGE: 'priceInfo.priceChange', // Change
  D_CHANGE: 'priceInfo.percentPriceChange',
  TOTAL_MATCH_VOLUME: 'priceInfo.totalMatchVolume', // Volume
  TOTAL_MATCH_VALUE: 'priceInfo.totalMatchValue', // Value

  CLOSE_PRICE: 'priceInfo.closePrice', // Trend
  // AVERAGE_PRICE_DAILY: 'movingAveragePrice.daily', // for trend
  // AVERAGE_PRICE_5SESSION_WEEKLY: 'movingAveragePrice.weekly', // for trend
  // AVERAGE_PRICE_5SESSION_MONTHLY: 'movingAveragePrice.monthly', // for trend
  // AVERAGE_PRICE_5SESSION_QUARTERLY: 'movingAveragePrice.quarterly', // for trend

  DAY_RANGE: 'priceInfo.dayRange', // calculate from LowestPrice, HighestPrice, MatchPrice, ReferencePrice
  PERFORMANCE: 'priceInfo.performance', // calculate MatchPrice, ReferencePrice
  MATCH_VOLUME: 'priceInfo.matchVolume',
  MATCH_VALUE: 'priceInfo.matchValue',
  FREE_FLOAT_RATE: 'freeFloatRate', //% Vol/Flee Float  = TotalMatchVolume/FreeFloat
};

const derivative = {
  DERIVATIVE_CODE: 'derivativeCode', // Ticker
  LAST_TRADING_DATE: 'lastTradingDate', // Expiry date
  REFERENCE_PRICE: 'referencePrice', // Ref
  MATCHED: 'matched', // MatchPrice and CurrentPrice
  MATCH_VOLUME: 'totalMatchVolume', // Volume
  BEST_1_BID: 'best1Bid', // Bid Price
  BEST_1_OFFER: 'best1Offer', // Ask Price
  BASIS: 'basis',
  OPEN_INTEREST: 'openInterest', // OI
  DAY_RANGE: 'dayRange',
  TOTAL_BUY_TRADE_VOLUME: 'totalBuyTradeVolume',
  TOTAL_SELL_TRADE_VOLUME: 'totalSellTradeVolume',
  CEILING_PRICE: 'ceilingPrice', // Ceiling price
  FLOOR_PRICE: 'floorPrice', // Floor price
  OPEN_PRICE: 'openPrice', // Open price
  HIGHEST_PRICE: 'highestPrice', // Highest price
  LOWEST_PRICE: 'lowestPrice', // Lowest price
  FOREIGN_BUY_VOLUME_MATCHED: 'foreignBuyVolumeMatched',
  FOREIGN_SELL_VOLUME_MATCHED: 'foreignSellVolumeMatched',
  INDEX_VALUE: 'indexValue',
  MATCH_PRICE: 'matchPrice',
  CURRENT_PRICE: 'currentPrice',
  TRADING_DATE: 'tradingDate',
};

const listIgnoreColumnDerivative = [
  'TOTAL_BUY_TRADE_VOLUME',
  'TOTAL_SELL_TRADE_VOLUME',
  'CEILING_PRICE',
  'FLOOR_PRICE',
  'OPEN_PRICE',
  'HIGHEST_PRICE',
  'LOWEST_PRICE',
  'FOREIGN_BUY_VOLUME_MATCHED',
  'FOREIGN_SELL_VOLUME_MATCHED',
  'INDEX_VALUE',
  'MATCH_PRICE',
  'CURRENT_PRICE',
  'TRADING_DATE',
];

const putThrough = {
  TICKER: 'ticker',
  DEAL_PRICE: 'dealPrice',
  DEAL_VOLUME: 'dealVolume',
  DEAL_VALUE: 'dealValue',
  TOTAL_DEAL_VALUE: 'totalDealValue',
  TRADING_DATE: 'tradingDate',
  ORGAN_CODE: 'organCode',
  REFERENCE_PRICE: 'referencePrice',
  MATCH_PRICE: 'matchPrice',
  PRICE_CHANGE: 'priceChange',
  PERCENT_PRICE_CHANGE: 'percentPriceChange',
  TOTAL_DEAL_VOLUME: 'totalDealVolume',
};

const listIgnoreColumnPutThrough = [
  'ORGAN_CODE',
  'REFERENCE_PRICE',
  'PRICE_CHANGE',
  'PERCENT_PRICE_CHANGE',
  'TOTAL_DEAL_VOLUME',
  'MATCH_PRICE',
];

export default {
  index,
  listIgnoreColumnIndex,
  listIgnoreColumnInMangageColumn,
  listHideColumnIndex,

  listDisplayNullWhenValueEqualZeroInSummary,
  listDisplayNullWhenTotalVolumeEqualZeroInSummary,

  derivative,
  listIgnoreColumnDerivative,

  putThrough,
  listIgnoreColumnPutThrough,

  listUserWatchList: {
    TEXT: 'text',
    CODE: 'code',
    TYPE_CODE: 'typeCode',
    WATCH_LIST_ID: 'watchListId',
  },

  listMyIndex: [],
  listMyIndexByKey: {
    MyWatchList: { text: 'My WatchList', watchListId: 'MyWatchList' },
  },
  currentMyIndex: 'MyWatchList',

  currentDefaultIndex: 'VN30',

  listIndustry: [],
  listIndustryByKey: {
    Sector: { text: 'Sector', watchListId: 'Sector' },
  },
  currentIndustry: 'Sector',

  listDerivative: ['DERIVATIVE'],
  listDerivativeByKey: {
    DERIVATIVE: { key: 'DERIVATIVE', name: 'Derivatives' },
  },
  currentDerivative: 'DERIVATIVE',

  listPutThrough: ['PUT_THROUGH'],
  listPutThroughByKey: {
    PUT_THROUGH: { key: 'PUT_THROUGH', name: 'Put Through' },
  },
  currentPutThrough: 'PUT_THROUGH',

  watchListId: 'VN30',

  defaultWatchListId: 35,

  performanceChart: {
    CHART_HEIGHT: 14,
    TOP_LINE_COLOR: '#00de8b',
    BOTTOM_LINE_COLOR: '#eb505a',
    VALUE_ATTRIBUTE_NAME: 'matchPrice',
    INTERVAL_GET_DATA: 1000 * 60 * 10,
  },
};
