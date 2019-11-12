export default {
  listTaStrategy: {
    accummulation: 'ACCUMMULATION',
    breakOut: 'BREAKOUT',
    breakOutMa: 'BREAKOUT MA',
    bestInDowntrend: 'BEST IN DOWNTREND',
    marketAnomaly: 'MARKET ANOMALY',
  },

  //filter tap 1
  filterAccumulationPeriod: {
    fiveDay: '>5D',
    tenDay: '>10D',
    twentyDay: '>20D',
    fourtyDay: '>40D',
  },

  filterVolumnRateOfChangeTabOne: {
    two: '>2',
    three: '>3',
    four: '>4',
    five: '>5',
  },

  filterIncreaseInPriceTabOne: {
    onePercen: '>1%',
    threePercen: '>3%',
    fivePercen: '>5%',
    sevenPercen: '>7%',
  },
  //

  //condition wrap
  filterAccumulationPeriodCondition: {
    1: '>5 days',
    2: '>10 days',
    3: '>20 days',
    4: '>40 days',
  },

  filterVolumnRateOfChangeTabOneCondition: {
    1: 'a volume rate of change >2',
    2: 'a volume rate of change >3',
    3: 'a volume rate of change >4',
    4: 'a volume rate of change >5',
  },

  filterIncreaseInPriceTabOneCondition: {
    1: 'a price increase >1%',
    2: 'a price increase >3%',
    3: 'a price increase >5%',
    4: 'a price increase >7%',
  },

  //filter tap 2
  filterBreakoutTopWithin: {
    threeMonth: '3M',
    sixMonth: '6M',
    nineMonth: '9M',
    oneYear: '1Y',
  },

  filterVolumnRateOfChangeTabTwo: {
    one: '>1',
    two: '>2',
    four: '>4',
    six: '>6',
  },

  filterStockGroupTabTwo: {
    all: 'All',
    vn30: 'VN30',
    vnMid: 'VNMid',
    vnSmall: 'VNSmall',
  },

  //condition tab 2
  filterBreakoutTopWithinCondition: {
    1: 'breakout the top > 3 month',
    2: 'breakout the top > 6 month',
    3: 'breakout the top > 9 month',
    4: 'breakout the top > 1 year',
  },

  filterVolumnRateOfChangeTabTwoCondition: {
    1: 'a volume rate of change >1',
    2: 'a volume rate of change >2',
    3: 'a volume rate of change >4',
    4: 'a volume rate of change >6',
  },

  filterStockGroupTabTwoCondition: {
    1: 'All',
    2: 'VN30',
    3: 'VNMid',
    4: 'VNSmall',
  },
  //

  //filter tap 3
  filterBreakoutMaBottom: {
    ma20: 'MA20',
    ma50: 'MA50',
    ma100: 'MA100',
    ma200: 'MA200',
  },

  filterVolumnRateOfChangeTabThree: {
    one: '>1',
    two: '>2',
    four: '>4',
    six: '>6',
  },

  filterIncreaseInPriceTabThree: {
    onePercen: '>1%',
    threePercen: '>3%',
    fivePercen: '>5%',
    sevenPercen: '>7%',
  },

  //condition tab 3
  filterBreakoutMaBottomCondition: {
    1: 'breakout MA20 bottom',
    2: 'breakout MA50 bottom',
    3: 'breakout MA100 bottom',
    4: 'breakout MA200 bottom',
  },

  filterVolumnRateOfChangeTabThreeCondition: {
    1: 'a volume rate of change >1',
    2: 'a volume rate of change >2',
    3: 'a volume rate of change >4',
    4: 'a volume rate of change >6',
  },

  filterIncreaseInPriceTabThreeCondition: {
    1: 'a price increase >1%',
    2: 'a price increase >3%',
    3: 'a price increase >5%',
    4: 'a price increase >7%',
  },
  //

  //filter tap 4
  filterVNIndexDowntrend: {
    recentSixMonth: 'Recent 6M',
    recentOneYear: 'Recent 1Y',
    recentTwoYear: 'Recent 2Y',
    recentThreeYear: 'Recent 3Y',
  },

  filterAverageVol1mTabFour: {
    fivety: '>50,000',
    hundred: '>100,000',
    threeHundred: '>300,000',
    fiveHundred: '>500,000',
  },

  filterStockGroupTabFour: {
    all: 'All',
    vn30: 'VN30',
    vnMid: 'VNMid',
    vnSmall: 'VNSmall',
  },

  //condition tab 4
  filterVNIndexDowntrendCondition: {
    1: 'recent 6 months',
    2: 'recent 1 year',
    3: 'recent 2 year',
    4: 'recent 3 year',
  },

  filterAverageVol1mTabFourCondition: {
    1: 'the current volume > 50,000',
    2: 'the current volume > 100,000',
    3: 'the current volume > 300,000',
    4: 'the current volume > 500,000',
  },

  filterStockGroupTabFourCondition: {
    1: 'All',
    2: 'VN30',
    3: 'VNMid',
    4: 'VNSmall',
  },
  //

  //filter tap 5
  filterHighestReturn: {
    monDay: 'Monday',
    tuesDay: 'Tuesday',
    wednesDay: 'Wednesday',
    thursDay: 'Thursday',
    friDay: 'Friday',
  },

  filterCaculationPeriod: {
    lastThreeYear: 'Last 3Y',
    lastFiveYear: 'Last 5Y',
    lastThenYear: 'Last 10Y',
    allTime: 'All Time',
  },

  filterAverageVol1mTabFive: {
    fivety: '>50,000',
    hundred: '>100,000',
    threeHundred: '>300,000',
    fiveHundred: '>500,000',
  },

  filterStockGroupTabFive: {
    all: 'All',
    vn30: 'VN30',
    vnMid: 'VNMid',
    vnSmall: 'VNSmall',
  },

  //condition tab 5
  filterHighestReturnCondition: {
    1: 'the highest return on Monday',
    2: 'the highest return on Tuesday',
    3: 'the highest return on Wednesday',
    4: 'the highest return on Thursday',
    5: 'the highest return on Friday',
  },

  filterCaculationPeriodCondition: {
    1: '3 years',
    2: '5 years',
    3: '10 years',
    4: 'all time',
  },

  filterAverageVol1mTabFiveCondition: {
    1: 'the average vol. 1M > 50,000',
    2: 'the average vol. 1M > 100,000',
    3: 'the average vol. 1M > 300,000',
    4: 'the average vol. 1M > 500,000',
  },

  filterStockGroupTabFiveCondition: {
    1: 'All',
    2: 'VN30',
    3: 'VNMid',
    4: 'VNSmall',
  },

  // close filter

  tableAccumulation: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOL: 'VOL.',
    RSI14: 'RSI14',
    MA20: 'MA20',
    PRICE: 'PRICE <br><small>(PREVIOUS)</small></br>',
    VOL_PREVIOUS: 'VOL. <br><small>(PREVIOUS)</small></br>',
    PRICE_AVG: 'PRICE <br><small>(AVG. 10D)</small></br>',
    VOL_AVG: 'VOL. <br><small>(AVG. 10D)</small></br>',
    RANKING: 'RANKING',
  },

  tableBreakOut: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOL: 'VOL.',
    AVG_VOL_1M: 'AVG. VOL. 1M',
    RSI14: 'RSI14',
    MA20: 'MA20',
    TOP_PREVIOUS: 'TOP <br><small>(PREVIOUS)</small></br>',
    PE: 'P/E',
    PB: 'P/B',
    RANKING: 'RANKING',
  },

  tableBreakOutMa: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    MA5: 'MA5',
    MA20: 'MA20',
    MA50: 'MA50',
    MA100: 'MA100',
    MA200: 'MA200',
    VOL: 'VOL.',
    RSI14: 'RSI14',
    RANKING: 'RANKING',
  },

  tableBestInDowntrend: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOL: 'VOL.',
    AVG_VOL_1M: 'AVG. VOL. 1M',
    RETURN_DOWNTREND: 'RETURN <br><small>(DOWNTREND)</small></br>',
    RETURN_RECOVERY: 'RETURN <br><small>(RECOVERY)</small></br>',
    PE: 'P/E',
    PB: 'P/B',
    MA20: 'MA20',
    RANKING: 'RANKING',
  },

  tableMarketAnomaly: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOL: 'VOL.',
    AVG_RETURN: 'AVG. RETURN',
    MEDIUM_RETURN: 'MEDIUM RETURN',
    RSI14: 'RSI14',
    MA20: 'MA20',
    PE: 'P/E',
    PB: 'P/B',
    RANKING: 'RANKING',
  },

  titleFilterAccumulation: {
    titleOne: 'Accumulation Period',
    titleTwo: 'Volume Rate of Change',
    titleThree: 'Increase in Price',
  },

  titleFilterBreakout: {
    titleOne: 'Breakout Top within',
    titleTwo: 'Volume Rate of Change',
    titleThree: 'Stock Group',
  },

  titleFilterBreakoutMa: {
    titleOne: 'Breakout MA Bottom',
    titleTwo: 'Volume Rate of Change',
    titleThree: 'Increase in Price',
  },

  titleFilterBestInDowntrend: {
    titleOne: 'VN-Index Downtrend',
    titleTwo: 'Average Vol. 1M',
    titleThree: 'Stock Group',
  },

  titleFilterMarketAnomaly: {
    titleOne: 'Highest Return',
    titleTwo: 'Calculation Period',
    titleThree: 'Average Vol. 1M',
    titleFour: 'Stock Group',
  },
};
