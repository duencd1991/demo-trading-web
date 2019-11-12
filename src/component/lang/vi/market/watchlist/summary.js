export default {
  listTitleIndexTable: {
    TICKER: 'TICKER_V',
    REFERENCE_PRICE: 'REF_V',
    MATCH_PRICE: 'PRICE_V',
    PRICE_CHANGE: 'CHANGE_V',
    D_CHANGE: '%1D CHANGE_V',
    TOTAL_MATCH_VOLUME: 'VOLUME_V',
    TOTAL_MATCH_VALUE: 'VALUE_V',
    NET_FOREIGN_VOLUME_MATCHED: 'NET FR. (VOL)_V',
    CLOSE_PRICE: 'TREND_V',
    DAY_RANGE: 'DAY RANGE_V', // calculate from LowestPrice, HighestPrice, MatchPrice, ReferencePrice
    PERFORMANCE: 'PERFORMANCE_V', // calculate MatchPrice, ReferencePrice
    RANKING: 'RANKING_V',
    ORGAN_SHORT_NAME: 'SYMBOL NAME_V',
    COM_GROUP_CODE: 'EXCHANGE_V',
    DEAL_PRICE: 'PUT THROUGH PRICE_V',
    TOTAL_DEAL_VOLUME: 'PUT THROUGH VOL_V',
    TOTAL_DEAL_VALUE: 'PUT THROUGH VAL_V',
    BEST_1_BID: 'BID PRICE_V',
    BEST_1_OFFER: 'ASK PRICE_V',
    CEILING_PRICE: 'CEILING_V',
    FLOOR_PRICE: 'FLOOR_V',
    OPEN_PRICE: 'OPEN_V',
    HIGHEST_PRICE: 'HIGH_V',
    LOWEST_PRICE: 'LOW_V',
    AVERAGE_PRICE: 'AVG PRICE_V',
    _52W_RANGE: '52W RANGE_V',
    TOTAL_VOLUME: 'TOTAL VOL_V',
    TOTAL_VALUE: 'TOTAL VAL_V',
    TOTAL_BUY_TRADE_VOLUME: 'UNMATCHED BUY VOL_V',
    TOTAL_SELL_TRADE_VOLUME: 'UNMATCHED SELL VOL_V',
    FOREIGN_BUY_VOLUME_TOTAL: 'FOREIGN BUY VOL_V',
    FOREIGN_BUY_VALUE_TOTAL: 'FOREIGN BUY VAL_V',
    FOREIGN_SELL_VOLUME_TOTAL: 'FOREIGN SELL VOL_V',
    FOREIGN_SELL_VALUE_TOTAL: 'FOREIGN SELL VAL_V',
    FOREIGN_CURRENT_ROOM: 'FOREIGN ROOM_V',
    FOREIGN_NET_VOLUME_TOTAL: 'FOREIGN NET VOL_V',
    FOREIGN_NET_VALUE_TOTAL: 'FOREIGN NET VAL_V',
    FREE_FLOAT: 'FREE FLOAT_V',
    FREE_FLOAT_RATE: 'FREE FLOAT RATE_V',
    RTD19: 'BETA 2Y_V',
    AVERAGE_MATCHED_VOLUME_2WEEK: '10D AVG VOL_V',
    AVERAGE_MATCHED_VOLUME_1MONTH: '1M AVG VOL_V',
    AVERAGE_MATCHED_VOLUME_3MONTH: '3M AVG VOL_V',
    PERCENT_PRICE_CHANGE_1WEEK: '% 1W PRICE CHANGE_V',
    PERCENT_PRICE_CHANGE_1MONTH: '% 1M PRICE CHANGE_V',
    PERCENT_PRICE_CHANGE_3MONTH: '% 3M PRICE CHANGE_V',
    PERCENT_PRICE_CHANGE_1YEAR: '% 1Y PRICE CHANGE_V',

    PUT_THROUGH_PRICE: 'PUT THROUGH PRICE_v',
    ONE_YEAR_HIGH: 'ONE YEAR HIGH_v',
    ONE_YEAR_LOW: 'ONE YEAR LOW_v',
    MATCH_VOLUME: 'MATCH VOLUME_v',
    MATCH_VALUE: 'MATCH VALUE_v',
    AVERAGE_MATCHED_VOLUME_1YEAR: 'AVERAGE VOLUME 1YEAR_v',
  },

  listTitleDerivativeTable: {
    DERIVATIVE_CODE: 'TICKER_V', // Ticker
    LAST_TRADING_DATE: 'EXPIRY DATE_V', // Expiry date
    REFERENCE_PRICE: 'REF_V', // Ref
    MATCHED: 'PRICE_V', // MatchPrice and CurrentPrice
    MATCH_VOLUME: 'VOLUME_V', // Volume
    BEST_1_BID: 'BEST BID_V', // Best bid
    BEST_1_OFFER: 'BEST ASK_V', // Best ask
    TOTAL_SELL_TRADE_VOLUME: 'UNMATCHED SELL_V', // Unmatched sell
    TOTAL_BUY_TRADE_VOLUME: 'UNMATCHED BUY_V', // Unmatched buy
    BASIS: 'BASIS_V', // basic = matched - matchPrice
    OPEN_INTEREST: 'OI_V', // OI
    DAY_RANGE: 'DAY RANGE_V', // dayRange: lowestPrice, highestPrice
    CEILING_PRICE: 'CEIL_V', // Ceil
    FLOOR_PRICE: 'FLOOR_V', // Floor
    OPEN_PRICE: 'OPEN_V', // Open
    HIGHEST_PRICE: 'HIGH_V', // High
    LOWEST_PRICE: 'LOW_V', // Low
    FOREIGN_BUY_VOLUME_MATCHED: 'FOREIGN BUY VOL._V', // Foreign buy Vol.
    FOREIGN_SELL_VOLUME_MATCHED: 'FOREIGN SELL VOL._V', // Foreign sell Vol.
  },

  listTitlePutThroughBidTable: {
    TICKER: 'TICKER_V',
    PRICE: 'PRICE_V',
    VOLUME: 'VOLUME_V',
    TIME: 'TIME_V',
  },

  listTitlePutThroughMatchedTable: {
    TICKER: 'TICKER_V',
    PRICE: 'PRICE_V',
    VOLUME: 'VOLUME_V',
    ACCUMULATED_VALUE: 'ACCUMULATED VALUE_V',
    TIME: 'TIME_V',
  },

  listTitlePutThroughAskTable: {
    TICKER: 'TICKER_V',
    PRICE: 'PRICE_V',
    VOLUME: 'VOLUME_V',
    TIME: 'TIME_V',
  },

  movingAveragePrice: {
    daily: 'Daily_v',
    weekly: 'Weekly_v',
    monthly: 'Monthly_v',
    quarterly: 'Quarterly_v',
  },

  confirmDelete: 'Delete this?_V',
  manageColumn: 'Manage Column_V',
  clearAll: 'Clear All_V',
  resetToDefault: 'Reset to Default_V',

  viewChartIcon: 'View charts_v',
  viewTableIcon: 'View table_v',
  createNewWatchlistIcon: 'New watchlist_v',
  settingIcon: 'Setting_v',
  tooltipItemCompanyGroup: 'Show top 100 tickers on Market Cap_v',
  createWatchList: 'Create Watch List_v',
};
