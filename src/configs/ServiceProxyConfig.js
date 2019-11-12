const serverURL = "http://test-findata.mbs.com.vn/api/v1";
const localhost = "http://localhost:8080"
const ServiceProxyConfig = {
  Market: {
    MarketInDepth: {
      ServiceUrl: `${localhost}/MarketInDepth/`,
    },
    HeatMap: {
      ServiceUrl: `${localhost}/HeatMap/`,
    },
    Fundamental: {
      ServiceUrl: `${localhost}/api/Fundamental`,
    },
    WatchList: {
      ServiceUrl: `${localhost}/WatchList/`,
    },
    MarketCalendar: {
      ServiceUrl: `${localhost}/Calendar/`,
    },
    MoneyFlow: {
      ServiceUrl: `${localhost}/MoneyFlow/`,
    },
    Chart: {
      ServiceUrl: `${localhost}/Chart/`,
    },
  },
  Prices: {
    PriceDepthUrl: `${localhost}/PriceDepth/`,
    PriceDataUrl: `${localhost}/PriceData/`,
    TimeAndSaleUrl: `${localhost}/TimeAndSales/`,
  },
  TopMover: {
    ServiceUrl: `${localhost}/TopMover/`,
    ServiceChart: `${localhost}/Chart/`,
  },
  Technical: {
    Charting: `${localhost}/TradingView/`,
    Deceptive: `${localhost}/TechnicalAnalysisSignals/`,
  },

  Fundamental: {
    FinancialStatement: {
      ServiceUrl: `${localhost}/FinancialStatement/`,
    },
    FinancialAnalysis: {
      ServiceUrl: `${localhost}/FinancialAnalysis/`,
    },
    OwnerShip: {
      ServiceUrl: `${localhost}/Ownership/`,
    },
    CashDividendAnalysis: {
      ServiceUrl: `${localhost}/CashDividendAnalysis/`,
    },
    Snapshot: {
      ServiceUrl: `${localhost}/Snapshot/`,
    },
    ConsensusAnalysis: {
      ServiceUrl: `${localhost}/ConsensusAnalysis/`,
    },
  },
  Tools: {
    Alerts: {
      ServiceUrl: `${localhost}/`,
      ServiceChart: `${localhost}/Chart/`,
    },
    Screener: {
      ServiceUrl: `${localhost}/Screener/`,
    },
  },
  Common: {
    Master: {
      ServiceUrl: `${localhost}/Master/`,
    },
    UserSetting: {
      ServiceUrl: `${localhost}/UserSetting/`,
    },
  },
  News: {
    ServiceUrl: `${localhost}/News/`,
  },
  Stategy: {
    Ranking: {
      ServiceUrl: `${localhost}/Strategy/`,
    },
  },
};
export default ServiceProxyConfig;
