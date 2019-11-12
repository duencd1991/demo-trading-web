export default {
  listOrganization: {
    ORGAN_CODE: 'organCode',
    IS_IN_CODE: 'isinCode',
    TICKER: 'ticker',
    COM_GROUP_CODE: 'comGroupCode',
    ICB_CODE: 'icbCode',
    ORGAN_TYPE_CODE: 'organTypeCode',
    COM_TYPE_CODE: 'comTypeCode',
    COUNTRY_LOCATION_CODE: 'countryLocationCode',
    ORGAN_NAME: 'organName',
    ORGAN_SHORT_NAME: 'organShortName',
    ORGAN_FRIENDLY_NAME: 'organFriendlyName',
    STATUS: 'status',
    CREATE_DATE: 'createDate',
    UPDATE_DATE: 'updateDate',
  },
  listComGroup: {
    COM_GROUP_CODE: 'comGroupCode',
    PARENT_COM_GROUP_CODE: 'parentComGroupCode',
    COM_GROUP_NAME: 'comGroupName',
    FRIENDLY_NAME: 'friendlyName',
    COM_GROUP_TYPE: 'comGroupType',
    PRIORITY: 'priority',
    CALCULATE_RATIO: 'calculateRatio',
    CALCULATE_RETURN: 'calculateReturn',
    PRIORITY_ICB_INDUSTRY: 'priorityIcbIndustry',
    CALCULATE_RATIO_ICB_INDUSTRY: 'calculateRatioIcbIndustry',
    CALCULATE_RETURN_ICB_INDUSTRY: 'calculateReturnIcbIndustry',
    COM_GROUP_ORDER: 'comGroupOrder',
    DESCRIPTION: 'description',
    STATUS: 'status',
    CREATE_DATE: 'createDate',
    UPDATE_DATE: 'updateDate',
  },
  listIcbIndustry: {
    ICB_CODE: 'icbCode',
    ICB_NAME: 'icbName',
    PARENT_ICB_CODE: 'parentIcbCode',
    FRIENDLY_NAME: 'friendlyName',
    ICB_LEVEL: 'icbLevel',
    ICB_ORDER: 'icbOrder',
    SECTOR_PROFILE: 'sectorProfile',
    STATUS: 'status',
    CREATE_DATE: 'createDate',
    UPDATE_DATE: 'updateDate',
    ICB_CODE_PATH: 'icbCodePath',
    ICB_NAME_PATH: 'icbNamePath',
    INDUSTRY_ID: 'industryID',
    PARENT_INDUSTRY_ID: 'parentIndustryID',
    ICB_SHORT_NAME: 'icbShortName',
  },

  listExchange: {
    VNINDEX: 'HOSE',
    HNXIndex: 'HNX',
    UpcomIndex: 'UPCOM',
    VN30: 'HOSE',
    HNX30: 'HNX',
  },

  listComponent: {
    MarketInDepth: 'MarketInDepth',
    Watchlist: 'Watchlist',
    TopVolume: 'TopVolume',
    TopBreakout: 'TopBreakout',
    TopValue: 'TopValue',
    TopGainers: 'TopGainers',
    MarketCalendar: 'MarketCalendar',
    MoneyFlow: 'MoneyFlow',
    TopLosers: 'TopLosers',
    TopNewHigh: 'TopNewHigh',
    TopNewLow: 'TopNewLow',
    TopForeignTrade: 'TopForeignTrade',
    HeatMap: 'HeatMap',
    TimeAndSales: 'TimeAndSales',
    PriceDepth: 'PriceDepth',
    PriceData: 'PriceData',
    Charting: 'Charting',
    TASignals: 'TASignals',
    FinancialAnalysis: 'FinancialAnalysis',
    FADividendAnalysis: 'FADividendAnalysis',
    FinancialStatement: 'FinancialStatement',
    NewsAndAnalysis: 'NewsAndAnalysis',
    News: 'News',
    Alerts: 'Alerts',
    Screener: 'Screener',
    ConsensusAnalysis: 'ConsensusAnalysis',
    FASnapshot: 'FASnapshot',
    STRanking: 'STRanking',
    Strategy: 'Strategy',
    Ownership: 'Ownership',
    Valuation: 'Valuation',
    TradeData: 'TradeData',
  },

  timeRange: {
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
  },

  MIN_SCROLL_HEIGHT_TABLE: 50,

  RESPONSE_STATUS: {
    SUCCESS: 'Success',
    APART: 'Apart',
    FAILED: 'Failed',
    QUEUED: 'Queued',
    MARKET_PRE_OPEN: 'MarketPreOpen',
    MARKET_CLOSED: 'MarketClosed',
  },

  indexData: {
    VALUE: 'matchPrice',
    VALUE_CHANGE: 'priceChange',
    PERCENT_VALUE_CHANGE: 'percentPriceChange',
    REFERENCE_PRICE: 'referencePrice',
  },
};
