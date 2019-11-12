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
  FOREIGN_NET: 'foreignNet', // foreignBuyValueMatched - foreignSellValueMatched
  TOTAL_DEAL_VOLUME: 'totalDealVolume',
  TOTAL_DEAL_VALUE: 'totalDealValue',
  REFERENCE_INDEX: 'referenceIndex',
  TRADING_DATE: 'tradingDate',
};
const listIndexNotiMaque = [
  'VNINDEX',
  'HNXIndex',
  'UpcomIndex',
  'VNXALL',
  'VN30',
  'HNX30',
];
const DEFAULT_INDEX = 'VNINDEX';

export default {
  listColumnTable,
  listIndexNotiMaque,
  DEFAULT_INDEX,
};
