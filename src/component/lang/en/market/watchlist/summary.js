export default {
  listTitleIndexTable: {
    TICKER: 'TICKER',
    REFERENCE_PRICE: 'REF',
    MATCH_PRICE: 'PRICE',
    PRICE_CHANGE: 'CHANGE',
    D_CHANGE: '%1D CHANGE',
    TOTAL_MATCH_VOLUME: 'VOLUME',
    TOTAL_MATCH_VALUE: 'VALUE',
    NET_FOREIGN_VOLUME_MATCHED: 'NET FR. (VOL)',
    CLOSE_PRICE: 'TREND',
    DAY_RANGE: 'DAY RANGE', // calculate from LowestPrice, HighestPrice, MatchPrice, ReferencePrice
    PERFORMANCE: 'PERFORMANCE', // calculate MatchPrice, ReferencePrice
    RANKING: 'RANKING',
    ORGAN_SHORT_NAME: 'SYMBOL NAME',
    COM_GROUP_CODE: 'EXCHANGE',
    DEAL_PRICE: 'PUT THROUGH PRICE',
    TOTAL_DEAL_VOLUME: 'PUT THROUGH VOL',
    TOTAL_DEAL_VALUE: 'PUT THROUGH VAL',
    BEST_1_BID: 'BID PRICE',
    BEST_1_OFFER: 'ASK PRICE',
    CEILING_PRICE: 'CEILING',
    FLOOR_PRICE: 'FLOOR',
    OPEN_PRICE: 'OPEN',
    HIGHEST_PRICE: 'HIGH',
    LOWEST_PRICE: 'LOW',
    AVERAGE_PRICE: 'AVG PRICE',
    _52W_RANGE: '52W RANGE',
    TOTAL_VOLUME: 'TOTAL VOL',
    TOTAL_VALUE: 'TOTAL VAL',
    TOTAL_BUY_TRADE_VOLUME: 'UNMATCHED BUY VOL',
    TOTAL_SELL_TRADE_VOLUME: 'UNMATCHED SELL VOL',
    FOREIGN_BUY_VOLUME_TOTAL: 'FOREIGN BUY VOL',
    FOREIGN_BUY_VALUE_TOTAL: 'FOREIGN BUY VAL',
    FOREIGN_SELL_VOLUME_TOTAL: 'FOREIGN SELL VOL',
    FOREIGN_SELL_VALUE_TOTAL: 'FOREIGN SELL VAL',
    FOREIGN_CURRENT_ROOM: 'FOREIGN ROOM',
    FOREIGN_NET_VOLUME_TOTAL: 'FOREIGN NET VOL',
    FOREIGN_NET_VALUE_TOTAL: 'FOREIGN NET VAL',
    FREE_FLOAT: 'FREE FLOAT',
    FREE_FLOAT_RATE: 'FREE FLOAT RATE',
    RTD19: 'BETA 2Y',
    AVERAGE_MATCHED_VOLUME_2WEEK: '10D AVG VOL',
    AVERAGE_MATCHED_VOLUME_1MONTH: '1M AVG VOL',
    AVERAGE_MATCHED_VOLUME_3MONTH: '3M AVG VOL',
    PERCENT_PRICE_CHANGE_1WEEK: '% 1W PRICE CHANGE',
    PERCENT_PRICE_CHANGE_1MONTH: '% 1M PRICE CHANGE',
    PERCENT_PRICE_CHANGE_3MONTH: '% 3M PRICE CHANGE',
    PERCENT_PRICE_CHANGE_1YEAR: '% 1Y PRICE CHANGE',

    PUT_THROUGH_PRICE: 'PUT THROUGH PRICE',
    ONE_YEAR_HIGH: 'ONE YEAR HIGH',
    ONE_YEAR_LOW: 'ONE YEAR LOW',
    MATCH_VOLUME: 'MATCH VOLUME',
    MATCH_VALUE: 'MATCH VALUE',
    AVERAGE_MATCHED_VOLUME_1YEAR: 'AVERAGE VOLUME 1YEAR',
  },

  listTitleDerivativeTable: {
    DERIVATIVE_CODE: 'TICKER', // Ticker
    LAST_TRADING_DATE: 'EXPIRY DATE', // Expiry date
    REFERENCE_PRICE: 'REF', // Ref
    MATCHED: 'PRICE', // MatchPrice and CurrentPrice
    MATCH_VOLUME: 'VOLUME', // Volume
    BEST_1_BID: 'BEST BID', // Best bid
    BEST_1_OFFER: 'BEST ASK', // Best ask
    TOTAL_SELL_TRADE_VOLUME: 'UNMATCHED SELL', // Unmatched sell
    TOTAL_BUY_TRADE_VOLUME: 'UNMATCHED BUY', // Unmatched buy
    BASIS: 'BASIS', // basic = matched - matchPrice
    OPEN_INTEREST: 'OI', // OI
    DAY_RANGE: 'DAY RANGE', // dayRange: lowestPrice, highestPrice
    CEILING_PRICE: 'CEIL', // Ceil
    FLOOR_PRICE: 'FLOOR', // Floor
    OPEN_PRICE: 'OPEN', // Open
    HIGHEST_PRICE: 'HIGH', // High
    LOWEST_PRICE: 'LOW', // Low
    FOREIGN_BUY_VOLUME_MATCHED: 'FOREIGN BUY VOL.', // Foreign buy Vol.
    FOREIGN_SELL_VOLUME_MATCHED: 'FOREIGN SELL VOL.', // Foreign sell Vol.
  },

  listTitlePutThroughMatchedTable: {
    TICKER: 'TICKER',
    DEAL_PRICE: 'PRICE',
    DEAL_VOLUME: 'VOLUME',
    DEAL_VALUE: 'VALUE',
    TOTAL_DEAL_VALUE: 'ACCU. VALUE',
    TRADING_DATE: 'TIME',
  },

  movingAveragePrice: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
  },

  confirmDelete: 'Delete this?',
  manageColumn: 'Manage Column',
  clearAll: 'Clear All',
  resetToDefault: 'Reset to Default',

  viewChartIcon: 'View charts',
  viewTableIcon: 'View table',
  createNewWatchlistIcon: 'New watchlist',
  settingIcon: 'Setting',
  tooltipItemCompanyGroup: 'Show top 100 tickers on Market Cap',
  createWatchList: 'Create Watch List',
};
