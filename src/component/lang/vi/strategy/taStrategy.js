export default {
  listTaStrategy: {
    accummulation: 'ACCUMMULATION_v',
    breakOut: 'BREAKOUT_v',
    breakOutMa: 'BREAKOUT MA_v',
    bestInDowntrend: 'BEST IN DOWNTREND_v',
    marketAnomaly: 'MARKET ANOMALY_v',
  },

  //filter tap 1
  filterAccumulationPeriod: {
    fiveDay: '>5D_v',
    tenDay: '>10D_v',
    twentyDay: '>20D_v',
    fourtyDay: '>40D_v',
  },

  filterVolumnRateOfChangeTabOne: {
    two: '>2_v',
    three: '>3_v',
    four: '>4_v',
    five: '>5_v',
  },

  filterIncreaseInPriceTabOne: {
    onePercen: '>1%_v',
    threePercen: '>3%_v',
    fivePercen: '>5%_v',
    sevenPercen: '>7%_v',
  },
  //

  //condition wrap
  filterAccumulationPeriodCondition: {
    1: '>5 days_v',
    2: '>10 days_v',
    3: '>20 days_v',
    4: '>40 days_v',
  },

  filterVolumnRateOfChangeTabOneCondition: {
    1: 'a volume rate of change >2_v',
    2: 'a volume rate of change >3_v',
    3: 'a volume rate of change >4_v',
    4: 'a volume rate of change >5_v',
  },

  filterIncreaseInPriceTabOneCondition: {
    1: 'a price increase >1%_v',
    2: 'a price increase >3%_v',
    3: 'a price increase >5%_v',
    4: 'a price increase >7%_v',
  },

  //filter tap 2
  filterBreakoutTopWithin: {
    threeMonth: '3M_v',
    sixMonth: '6M_v',
    nineMonth: '9M_v',
    oneYear: '1Y_v',
  },

  filterVolumnRateOfChangeTabTwo: {
    one: '>1_v',
    two: '>2_v',
    four: '>4_v',
    six: '>6_v',
  },

  filterStockGroupTabTwo: {
    all: 'All_v',
    vn30: 'VN30_v',
    vnMid: 'VNMid_v',
    vnSmall: 'VNSmall_v',
  },

  //condition tab 2
  filterBreakoutTopWithinCondition: {
    1: 'breakout the top > 3 month_v',
    2: 'breakout the top > 6 month_v',
    3: 'breakout the top > 9 month_v',
    4: 'breakout the top > 1 year_v',
  },

  filterVolumnRateOfChangeTabTwoCondition: {
    1: 'a volume rate of change >1_v',
    2: 'a volume rate of change >2_v',
    3: 'a volume rate of change >4_v',
    4: 'a volume rate of change >6_v',
  },

  filterStockGroupTabTwoCondition: {
    1: 'All_v',
    2: 'VN30_v',
    3: 'VNMid_v',
    4: 'VNSmall_v',
  },
  //

  //filter tap 3
  filterBreakoutMaBottom: {
    ma20: 'MA20_v',
    ma50: 'MA50_v',
    ma100: 'MA100_v',
    ma200: 'MA200_v',
  },

  filterVolumnRateOfChangeTabThree: {
    one: '>1_v',
    two: '>2_v',
    four: '>4_v',
    six: '>6_v',
  },

  filterIncreaseInPriceTabThree: {
    onePercen: '>1%_v',
    threePercen: '>3%_v',
    fivePercen: '>5%_v',
    sevenPercen: '>7%_v',
  },

  //condition tab 3
  filterBreakoutMaBottomCondition: {
    1: 'breakout MA20 bottom_v',
    2: 'breakout MA50 bottom_v',
    3: 'breakout MA100 bottom_v',
    4: 'breakout MA200 bottom_v',
  },

  filterVolumnRateOfChangeTabThreeCondition: {
    1: 'a volume rate of change >1_v',
    2: 'a volume rate of change >2_v',
    3: 'a volume rate of change >4_v',
    4: 'a volume rate of change >6_v',
  },

  filterIncreaseInPriceTabThreeCondition: {
    1: 'a price increase >1%_v',
    2: 'a price increase >3%_v',
    3: 'a price increase >5%_v',
    4: 'a price increase >7%_v',
  },
  //

  //filter tap 4
  filterVNIndexDowntrend: {
    recentSixMonth: 'Recent 6M_v',
    recentOneYear: 'Recent 1Y_v',
    recentTwoYear: 'Recent 2Y_v',
    recentThreeYear: 'Recent 3Y_v',
  },

  filterAverageVol1mTabFour: {
    fivety: '>50,000_v',
    hundred: '>100,000_v',
    threeHundred: '>300,000_v',
    fiveHundred: '>500,000_v',
  },

  filterStockGroupTabFour: {
    all: 'All_v',
    vn30: 'VN30_v',
    vnMid: 'VNMid_v',
    vnSmall: 'VNSmall_v',
  },

  //condition tab 4
  filterVNIndexDowntrendCondition: {
    1: 'recent 6 months_v',
    2: 'recent 1 year_v',
    3: 'recent 2 year_v',
    4: 'recent 3 year_v',
  },

  filterAverageVol1mTabFourCondition: {
    1: 'the current volume > 50,000_v',
    2: 'the current volume > 100,000_v',
    3: 'the current volume > 300,000_v',
    4: 'the current volume > 500,000_v',
  },

  filterStockGroupTabFourCondition: {
    1: 'All_v',
    2: 'VN30_v',
    3: 'VNMid_v',
    4: 'VNSmall_v',
  },
  //

  //filter tap 5
  filterHighestReturn: {
    monDay: 'Monday_v',
    tuesDay: 'Tuesday_v',
    wednesDay: 'Wednesday_v',
    thursDay: 'Thursday_v',
    friDay: 'Friday_v',
  },

  filterCaculationPeriod: {
    lastThreeYear: 'Last 3Y_v',
    lastFiveYear: 'Last 5Y_v',
    lastThenYear: 'Last 10Y_v',
    allTime: 'All Time_v',
  },

  filterAverageVol1mTabFive: {
    fivety: '>50,000_v',
    hundred: '>100,000_v',
    threeHundred: '>300,000_v',
    fiveHundred: '>500,000_v',
  },

  filterStockGroupTabFive: {
    all: 'All_v',
    vn30: 'VN30_v',
    vnMid: 'VNMid_v',
    vnSmall: 'VNSmall_v',
  },

  //condition tab 5
  filterHighestReturnCondition: {
    1: 'the highest return on Monday_v',
    2: 'the highest return on Tuesday_v',
    3: 'the highest return on Wednesday_v',
    4: 'the highest return on Thursday_v',
    5: 'the highest return on Friday_v',
  },

  filterCaculationPeriodCondition: {
    1: '3 years_v',
    2: '5 years_v',
    3: '10 years_v',
    4: 'all time_v',
  },

  filterAverageVol1mTabFiveCondition: {
    1: 'the average vol. 1M > 50,000_v',
    2: 'the average vol. 1M > 100,000_v',
    3: 'the average vol. 1M > 300,000_v',
    4: 'the average vol. 1M > 500,000_v',
  },

  filterStockGroupTabFiveCondition: {
    1: 'All_v',
    2: 'VN30_v',
    3: 'VNMid_v',
    4: 'VNSmall_v',
  },

  // close filter

  tableAccumulation: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOL: 'VOL._v',
    RSI14: 'RSI14_v',
    MA20: 'MA20_v',
    PRICE: 'PRICE <br><small>(PREVIOUS)_v</small></br>',
    VOL_PREVIOUS: 'VOL. <br><small>(PREVIOUS)_v</small></br>',
    PRICE_AVG: 'PRICE <br><small>(AVG. 10D)_v</small></br>',
    VOL_AVG: 'VOL. <br><small>(AVG. 10D)_v</small></br>',
    RANKING: 'RANKING_v',
  },

  tableBreakOut: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOL: 'VOL._v',
    AVG_VOL_1M: 'AVG. VOL. 1M_v',
    RSI14: 'RSI14_v',
    MA20: 'MA20_v',
    TOP_PREVIOUS: 'TOP <br><small>(PREVIOUS)_v</small></br>',
    PE: 'P/E_v',
    PB: 'P/B_v',
    RANKING: 'RANKING_v',
  },

  tableBreakOutMa: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    MA5: 'MA5_v',
    MA20: 'MA20_v',
    MA50: 'MA50_v',
    MA100: 'MA100_v',
    MA200: 'MA200_v',
    VOL: 'VOL._v',
    RSI14: 'RSI14_v',
    RANKING: 'RANKING_v',
  },

  tableBestInDowntrend: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOL: 'VOL._v',
    AVG_VOL_1M: 'AVG. VOL. 1M_v',
    RETURN_DOWNTREND: 'RETURN <br><small>(DOWNTREND)_v</small></br>',
    RETURN_RECOVERY: 'RETURN <br><small>(RECOVERY)_v</small></br>',
    PE: 'P/E_v',
    PB: 'P/B_v',
    MA20: 'MA20_v',
    RANKING: 'RANKING_v',
  },

  tableMarketAnomaly: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOL: 'VOL._v',
    AVG_RETURN: 'AVG. RETURN_v',
    MEDIUM_RETURN: 'MEDIUM RETURN_v',
    RSI14: 'RSI14_v',
    MA20: 'MA20_v',
    PE: 'P/E_v',
    PB: 'P/B_v',
    RANKING: 'RANKING_v',
  },

  titleFilterAccumulation: {
    titleOne: 'Accumulation Period_v',
    titleTwo: 'Volume Rate of Change_v',
    titleThree: 'Increase in Price_v',
  },

  titleFilterBreakout: {
    titleOne: 'Breakout Top within_v',
    titleTwo: 'Volume Rate of Change_v',
    titleThree: 'Stock Group_v',
  },

  titleFilterBreakoutMa: {
    titleOne: 'Breakout MA Bottom_v',
    titleTwo: 'Volume Rate of Change_v',
    titleThree: 'Increase in Price_v',
  },

  titleFilterBestInDowntrend: {
    titleOne: 'VN-Index Downtrend_v',
    titleTwo: 'Average Vol. 1M_v',
    titleThree: 'Stock Group_v',
  },

  titleFilterMarketAnomaly: {
    titleOne: 'Highest Return_v',
    titleTwo: 'Calculation Period_v',
    titleThree: 'Average Vol. 1M_v',
    titleFour: 'Stock Group_v',
  },
};
