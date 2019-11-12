const timeRange = {
  '1D': 'OneDay', // ONE_DAY
  '1W': 'OneWeek', // ONE_WEEK
  '1M': 'OneMonth', // ONE_MONTH
  '3M': 'ThreeMonths', // THREE_MONTHS
  '6M': 'SixMonths', // SIX_MONTHS
  YTD: 'YearToDate', // YEAR_To_DATE
  '1Y': 'OneYear', // ONE_YEAR
  '3Y': 'ThreeYears', // THREE_YEARS
  '5Y': 'FiveYears', // FIVE_YEARS
  // 'REALTIME': 0, // REALTIME
};

const listColumnTable = {
  COM_GROUP_CODE: 'comGroupCode',
  INDEX_VALUE: 'indexValue',
  INDEX_CHANGE: 'indexChange',
  PERCENT_INDEX_CHANGE: 'percentIndexChange',
  TOTAL_MATCH_VOLUME: 'totalMatchVolume',
  TOTAL_MATCH_VALUE: 'totalMatchValue',
  FOREIGN_BUY_VOL_MATCHED: 'foreignBuyVolumeMatched',
  FOREIGN_SELL_VOL_MATCHED: 'foreignSellVolumeMatched',
  FOREIGN_BUY_VALUE_MATCHED: 'foreignBuyValueMatched',
  FOREIGN_SELL_VALUE_MATCHED: 'foreignSellValueMatched',
  FOREIGN_NET_VOLUME: 'foreignNetVolume', // foreignBuyVolumeMatched - foreignSellVolumeMatched
  FOREIGN_NET_VALUE: 'foreignNetValue', // foreignBuyValueMatched - foreignSellValueMatched
  TOTAL_DEAL_VOLUME: 'totalDealVolume',
  TOTAL_DEAL_VALUE: 'totalDealValue',
};

const listIgnoreColumnTable = {
  OPEN_INDEX: 'openIndex',
  HIGHEST_INDEX: 'highestIndex',
  LOWEST_INDEX: 'lowestIndex',
  TOTAL_STOCK_OVER_CEILING: 'totalStockOverCeiling',
  TOTAL_STOCK_NO_CHANGE_PRICE: 'totalStockNoChangePrice',
  TOTAL_STOCK_UNDER_FLOOR: 'totalStockUnderFloor',
  TOTAL_STOCK_UP_PRICE: 'totalStockUpPrice',
  TOTAL_STOCK_DOWN_PRICE: 'totalStockDownPrice',
  REFERENCE_INDEX: 'referenceIndex',
  MATCH_VOLUME: 'matchVolume',
  TRADING_DATE: 'tradingDate',
  CEILING: 'ceiling',
  FLOOR: 'floor',
  FOREIGN_BUY_VOL_MATCHED: 'foreignBuyVolumeMatched',
  FOREIGN_SELL_VOL_MATCHED: 'foreignSellVolumeMatched',
  FOREIGN_BUY_VALUE_MATCHED: 'foreignBuyValueMatched',
  FOREIGN_SELL_VALUE_MATCHED: 'foreignSellValueMatched',
};

const DEFAULT_INDEX = 'VNINDEX';

export default {
  timeRange,
  listColumnTable,
  listIgnoreColumnTable,
  DEFAULT_INDEX,
};
