export const componentLimit = {
  Watchlist: 1,
  MarketInDepth: 1,
  TopVolume: 1,
  TopBreakout: 1,
  TopValue: 1,
  TopGainers: 1,
  TopLosers: 1,
  TopNewHigh: 1,
  TopNewLow: 1,
  TopForeignTrade: 1,
  MarketCalendar: 1,
  HeatMap: 1,
  MoneyFlow: 1,

  TimeAndSales: -1,
  PriceDepth: -1,
  PriceData: -1,

  Charting: -1,
  TASignals: -1,

  FinancialAnalysis: -1,
  Ownership: -1,
  FADividendAnalysis: -1,
  FinancialStatement: -1,
  ConsensusAnalysis: -1,
  FASnapshot: -1,

  News: 1,

  Alerts: 1,
  Screener: 1,
  Valuation: 1,
  TradeData: 1,

  STRanking: 1,
  Strategy: 1,
};

const WidgetConfig = [
  {
    name: 'Market',
    list: [
      {
        name: 'Watchlist',
        limit: componentLimit.Watchlist,
        listReducer: ['WATCH_LIST:'],
      },
      {
        name: 'MarketInDepth',
        limit: componentLimit.MarketInDepth,
        listReducer: [
          'MARKET_IN_DEPTH:INDEX:',
          'MARKET_IN_DEPTH:VALUATION:',
          'MARKET_IN_DEPTH:MARKET_ANOMALY:',
          'MARKET_IN_DEPTH:LIQUIDITY:',
          'MARKET_IN_DEPTH:PROSPECT:',
        ],
      },
      {
        name: 'TopVolume',
        limit: componentLimit.TopVolume,
        listReducer: ['TOP_VOLUME:OVERVIEW:'],
      },
      {
        name: 'TopBreakout',
        limit: componentLimit.TopBreakout,
        listReducer: ['TOP_BREAKOUT:OVERVIEW:'],
      },
      {
        name: 'TopValue',
        limit: componentLimit.TopValue,
        listReducer: ['TOP_VALUE:OVERVIEW:'],
      },
      {
        name: 'TopGainers',
        limit: componentLimit.TopGainers,
        listReducer: ['TOP_GAINERS:OVERVIEW:'],
      },
      {
        name: 'TopLosers',
        limit: componentLimit.TopLosers,
        listReducer: ['TOP_LOSERS:OVERVIEW:'],
      },
      {
        name: 'TopNewHigh',
        limit: componentLimit.TopNewHigh,
        listReducer: ['TOP_NEW_HIGH:OVERVIEW:'],
      },
      {
        name: 'TopNewLow',
        limit: componentLimit.TopNewLow,
        listReducer: ['TOP_NEW_LOW:OVERVIEW:'],
      },
      {
        name: 'TopForeignTrade',
        limit: componentLimit.TopForeignTrade,
        listReducer: ['TOP_FOREIGN_TRADING:OVERVIEW:'],
      },
      {
        name: 'MarketCalendar',
        limit: componentLimit.MarketCalendar,
        listReducer: ['MARKET_CALENDAR:'],
      },
      {
        name: 'HeatMap',
        limit: componentLimit.HeatMap,
      },
      {
        name: 'MoneyFlow',
        limit: componentLimit.MoneyFlow,
        listReducer: ['MONEY_FLOW:CONTRIBUTION:', 'MONEY_FLOW'],
      },
    ],
  },
  {
    name: 'Price',
    list: [
      {
        name: 'TimeAndSales',
        limit: componentLimit.TimeAndSales,
        listReducer: ['TIME_AND_SALE:'],
      },
      {
        name: 'PriceDepth',
        limit: componentLimit.PriceDepth,
        listReducer: ['PRICE_DEPTH_:'],
      },
      {
        name: 'PriceData',
        limit: componentLimit.PriceData,
        listReducer: ['PRICE_DATA:'],
      },
    ],
  },

  {
    name: 'Technical',
    list: [
      {
        name: 'Charting',
        limit: componentLimit.Charting,
      },
      {
        name: 'TASignals',
        limit: componentLimit.TASignals,
        listReducer: ['PRICE_VOLUME:', 'TA_SIGNALS:', 'DECEPTIVE:'],
      },
    ],
  },
  {
    name: 'NewsAndAnalysis',
    list: [
      {
        name: 'News',
        limit: componentLimit.News,
        listReducer: ['NEW_AND_ANALYSIS:'],
      },
    ],
  },
  {
    name: 'Fundamental',
    list: [
      {
        name: 'FASnapshot',
        limit: componentLimit.FASnapshot,
        listReducer: ['FA_SNAPSHOT:'],
      },
      {
        name: 'Ownership',
        limit: componentLimit.Ownership,
      },
      {
        name: 'FinancialAnalysis',
        limit: componentLimit.FinancialAnalysis,
        listReducer: ['FINANCIAL_ANALYSIS:', 'FA_CHECKUP:'],
      },
      {
        name: 'FADividendAnalysis',
        limit: componentLimit.FADividendAnalysis,
        listReducer: ['FUNDAMENTAL:FA_DIVIDEND_ANALYSIS:'],
      },
      {
        name: 'ConsensusAnalysis',
        limit: componentLimit.ConsensusAnalysis,
        listReducer: ['FUNDAMENTAL:CONSENSUS_ANALYSIS'],
      },
      {
        name: 'FinancialStatement',
        limit: componentLimit.FinancialStatement,
        listReducer: ['FUNDAMENTAL:FINANCIAL_STATEMENT'],
      },
    ],
  },
  {
    name: 'Tools',
    list: [
      {
        name: 'Alerts',
        limit: componentLimit.Alerts,
        listReducer: ['TOOL_ALERT', 'ALERTS_SYSTEM:'],
      },
      {
        name: 'Screener',
        limit: componentLimit.Screener,
        listReducer: ['STOCK_SCREENER:'],
      },
      {
        name: 'Valuation',
        limit: componentLimit.Valuation,
        listReducer: ['VALUATION:'],
      },
      {
        name: 'TradeData',
        limit: componentLimit.TradeData,
        listReducer: ['TOOLS:TRADE_DATA:'],
      },
    ],
  },
  {
    name: 'ST',
    list: [
      {
        name: 'STRanking',
        limit: componentLimit.STRanking,
        listReducer: ['ST_RANKING'],
      },
      {
        name: 'Strategy',
        limit: componentLimit.Strategy,
        listReducer: ['FIINTRADE_STRATEGY', 'OVERVIEW', 'VALUE'],
      },
    ],
  },
];

export default WidgetConfig;
