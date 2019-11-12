export default {
  tabs: {
    accummulation: 1,
    breakOut: 2,
    breakOutMa: 3,
    bestInDowntrend: 4,
    marketAnomaly: 5,
  },

  //filter tap 1
  filterTabOne: {
    filterAccumulationPeriod: {
      1: '>5 days',
      2: '>10 days',
      3: '>20 days',
      4: '>40 days',
    },

    filterVolumnRateOfChange: {
      1: 'a volume rate of change >2',
      2: 'a volume rate of change >3',
      3: 'a volume rate of change >4',
      4: 'a volume rate of change >5',
    },

    filterIncreaseInPrice: {
      1: 'a price increase >1%',
      2: 'a price increase >3%',
      3: 'a price increase >5%',
      4: 'a price increase >7%',
    },
  },

  tableAccumulation: {
    TICKER: 'ticker',
    PRICE: 'price',
    VOL: 'vol',
    RSI14: 'rsi14',
    MA20: 'ma20',
    PRICE: 'price',
    VOL_PREVIOUS: 'volPrevious',
    PRICE_AVG: 'priceAvg',
    VOL_AVG: 'volAvg',
    RANKING: 'ranking',
  },

  tableBreakOut: {
    TICKER: 'ticker',
    PRICE: 'price',
    VOL: 'vol',
    AVG_VOL_1M: 'avgVol1m',
    RSI14: 'rsi14',
    MA20: 'ma20',
    TOP_PREVIOUS: 'topPrevious',
    PE: 'pe',
    PB: 'pb',
    RANKING: 'ranking',
  },

  tableBreakOutMa: {
    TICKER: 'ticker',
    PRICE: 'price',
    MA5: 'ma5',
    MA20: 'ma20',
    MA50: 'ma50',
    MA100: 'ma100',
    MA200: 'ma200',
    VOL: 'vol',
    RSI14: 'rsi14',
    RANKING: 'ranking',
  },

  tableBestInDowntrend: {
    TICKER: 'ticker',
    PRICE: 'price',
    VOL: 'vol',
    AVG_VOL_1M: 'avgVol1m',
    RETURN_DOWNTREND: 'returnDowntrend',
    RETURN_RECOVERY: 'returnRecovery',
    PE: 'pe',
    PB: 'pb',
    MA20: 'ma20',
    RANKING: 'ranking',
  },

  tableMarketAnomaly: {
    TICKER: 'ticker',
    PRICE: 'price',
    VOL: 'vol',
    AVG_RETURN: 'avgReturn',
    MEDIUM_RETURN: 'mediumReturn',
    RSI14: 'rsi14',
    MA20: 'ma20',
    PE: 'pe',
    PB: 'pb',
    RANKING: 'ranking',
  },
};
