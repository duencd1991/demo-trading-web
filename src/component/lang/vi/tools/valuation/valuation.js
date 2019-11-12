export default {
  buttonCalculate: 'Calculate_v',

  method: 'Method_v',

  resultTitle: 'Result_v',

  popupPE: {
    title: 'STOCKS IN THE SAME SECTOR_v',
    button: 'DONE_v',
    selectAll: 'SELECT ALL_v',
    totalAsset: 'TOTAL ASSET_v',
    rev: 'REV._v',
    netProfit: 'NET PROFIT_v',
    marketCap: 'MARKET CAP_v',
    pe: 'P/E_v',
    averagePE: 'Average P/E_v',
  },

  methodFCFE: {
    numOneFirst: '1 /Current Free Cashflow to Equity_v',
    numOneLast: 'Bn.VND_v',
    numTwoFirst: '2 /Growth rate of FCFE: g1_v',
    numTwoMid: '% in the next_v',
    numTwoLast: 'years_v',
    numThreeFirst: '3 /Growth rate of FCFE: g2_v',
    numThreeLast: '% in the sustainable period_v',
    numFour: '4 /Cost of Equity_v',
  },

  resultFCFE: {
    numOneFirst: 'Estimated Stock Price_v',
    numOneLast: 'VND/Share_v',
  },

  methodPE: {
    numOneFirst: '1 /Current EPS of the company_v',
    numOneLast: 'VND/Share_v',
    numTwoFirst: '2 /Estimated EPS(EOY)_v',
    numbTwoLast: 'VND/Share_v',
    numThreeFirst: '3 /EPS Forecast(Next Year)_v',
    numbThreeLast: 'VND/Share_v',
    numFour: '4 /P/E Multiple_v',
  },

  resultPE: {
    numOneFirst: 'EOY Stock Price_v',
    numOneLast: 'VND/Share_v',
    numTwoFirst: 'End of Next Year Stock Price_v',
    numTwoLast: 'VND/Share_v',
  },

  methodPB: {
    numOne: '1 /Current Book Value_v',
    numTwoFirst: '2 /Estimated Book Value(EOY)_v',
    numTwoLast: 'VND/Share_v',
    numThreeFirst: '3 /Book value Forecast(Next Year)_v',
    numThreeLast: 'VND/Share_v',
    numFour: '4 /P/B Multiple_v',
  },

  resultPB: {
    numOneFirst: 'EOY Stock Price_v',
    numOneLast: 'VND/Share_v',
    numTwoFirst: 'End of Next Year Stock Price_v',
    numTwoLast: 'VND/Share_v',
  },

  errorFCFE: {
    g1Error: 'Invalid calculation! Please check the growth rate_v',
    g2Error: 'Invalid Calculation, please check sustainable growth rate g2_v',
    g2ErrorSameNumber:
      'Failed! The value of g2 cannot be the same as cost of equity_v',
    costOfEquityError: 'Invalid Calculation, please check the Cost of Equity_v',
  },

  errorPE: {
    estimatedEOYError:
      'Invalid calculation! Please check the Estimated EPS (EOY)_v',
    epsForecastError:
      'Invalid calculation! Please check the EPS Forecast (Next Year)_v',
    peMultipleError: 'Invalid calculation! Please check the P/E Multiple_v',
  },

  errorPB: {
    estimateBookValuedEOYError:
      'Invalid calculation! Please check the Estimated Book Value(EOY)_v',
    bookValueForecastError:
      'Invalid calculation! Please check the Book value Forecast(Next Year)_v',
    pbMultiple: 'Invalid calculation! Please check the P/B Multiple_v',
  },
};
