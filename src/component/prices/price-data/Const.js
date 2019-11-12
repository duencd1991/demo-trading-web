export default {
  tabs: {
    overview: 1,
    orderStatistic: 2,
    foreign: 3,
    properietary: 4,
  },

  colorChangeAndPercenChange: {
    REF_PRICE: 'referenceValue',
    FLOOR_PRICE: 'floorValue',
    CEILING_PRICE: 'ceilingValue',
  },

  priceDataTableOverview: {
    DATE: 'tradingDate',
    //LAST : 'ClosePriceAdjusted' ,
    LAST: 'matchValue',
    CHANGE: 'valueChange',
    PERCENT_PRICE_CHANGE: 'percentValueChange',
    OPEN: 'openValue',
    HIGH: 'highestValue',
    LOW: 'lowestValue',
    // OPEN_INDEX: 'openValue',
    // HIGH_INDEX: 'highestValue',
    // LOW_INDEX: 'lowestValue',
    AVERAGE_PRICE: 'averageValue',
    MATCHED_VOLUME: 'totalMatchVolume',
    MATCHED_VALUE: 'totalMatchValue',
    PUT_THROUGH_VOL: 'totalDealVolume',
    PUT_THROUGH_VALUE: 'totalDealValue',
    TOTAL_VOL: 'totalVolume',
    TOTAL_VALUE: 'totalValue',
  },

  priceDataTableOrderStatistic: {
    DATE: 'tradingDate',
    //LAST : 'ClosePriceAdjusted' ,
    LAST: 'matchValue',
    CHANGE: 'valueChange',
    PERCENT_PRICE_CHANGE: 'percentValueChange',
    NR_OF_BUY_ORDER: 'totalBuyTrade',
    BUY_VOL: 'totalBuyTradeVolume',
    VOLUMN_BUY_ORDER: 'buyOrderAvgVol',
    NR_OF_SELL_ORDER: 'totalSellTrade',
    SELL_VOL: 'totalSellTradeVolume',
    VOLUMN_SELL_ORDER: 'sellOrderAvgVol',
    NET_VOL: 'netVolOrderStatistic',
  },

  priceDataTableForeign: {
    DATE: 'tradingDate',
    //LAST : 'ClosePriceAdjusted' ,
    LAST: 'matchValue',
    CHANGE: 'valueChange',
    PERCENT_PRICE_CHANGE: 'percentValueChange',
    BUY_ORDER_VOL: 'foreignBuyVolumeMatched',
    BUY_ORDER_VALUE: 'foreignBuyValueMatched',
    SELL_ORDER_VOL: 'foreignSellVolumeMatched',
    SELL_ORDER_VALUE: 'foreignSellValueMatched',
    NET_VOLUME: 'netVol',
    NET_VALUE: 'netValue',
    OWNED_RATIO: 'foreignerPercentage',
  },

  priceDataTableProprietary: {
    DATE: 'tradingDate',
    //LAST : 'ClosePriceAdjusted' ,
    LAST: 'matchValue',
    CHANGE: 'valueChange',
    PERCENT_PRICE_CHANGE: 'percentValueChange',
    BUY_VOL: 'totalMatchBuyTradeVolume',
    BUY_VALUE: 'totalMatchBuyTradeValue',
    SELL_VOL: 'totalMatchSellTradeVolume',
    SELL_VALUE: 'totalMatchSellTradeValue',
    NET_VOL: 'netVolProprietary',
    NET_VALUE: 'netValueProprietary',
  },

  listTimeRange: ['Daily', 'Weekly', 'Monthly', 'Yearly'],

  listTimeRangeByKey: {
    Daily: { key: 'Daily', name: 'DAILY' },
    Weekly: { key: 'Weekly', name: 'WEEKLY' },
    Monthly: { key: 'Monthly', name: 'MONTHLY' },
    Yearly: { key: 'Yearly', name: 'YEARLY' },
  },

  defaultTimeRange: 'Daily',

  listTicker: {
    ORGAN_CODE: 'organCode',
    TICKER: 'ticker',
    ORGAN_SHORT_NAME: 'organShortName',
    COM_GROUP_CODE: 'comGroupCode',
  },

  listIndex: {
    COM_GROUP_CODE: 'comGroupCode',
    COM_GROUP_NAME: 'comGroupName',
    PARENT_COM_GROUP_CODE: 'parentComGroupCode',
  },

  listIndexName: {
    vnIndex: 'VNINDEX',
    hnIndex: 'HNXIndex',
    upcomIndex: 'UpcomIndex',
  },

  listIndexExchange: {
    hose: 'HOSE',
    hnx: 'HNX',
    upcom: 'UPCOM',
  },
};
