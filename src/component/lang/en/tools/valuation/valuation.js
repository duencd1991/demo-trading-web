export default {
  buttonCalculate: 'Calculate',

  method: 'Method',

  resultTitle: 'Result',

  popupPE: {
    title: 'STOCKS IN THE SAME SECTOR',
    button: 'DONE',
    selectAll: 'SELECT ALL',
    totalAsset: 'TOTAL ASSET',
    rev: 'REV.',
    netProfit: 'NET PROFIT',
    marketCap: 'MARKET CAP',
    pe: 'P/E',
    averagePE: 'Average P/E',
  },

  methodFCFE: {
    numOneFirst: '1 /Current Free Cashflow to Equity',
    numOneLast: 'Bn.VND',
    numTwoFirst: '2 /Growth rate of FCFE: g1',
    numTwoMid: '% in the next',
    numTwoLast: 'years',
    numThreeFirst: '3 /Growth rate of FCFE: g2',
    numThreeLast: '% in the sustainable period',
    numFour: '4 /Cost of Equity',
  },

  resultFCFE: {
    numOneFirst: 'Estimated Stock Price',
    numOneLast: 'VND/Share',
  },

  methodPE: {
    numOneFirst: '1 /Current EPS of the company',
    numOneLast: 'VND/Share',
    numTwoFirst: '2 /Estimated EPS(EOY)',
    numbTwoLast: 'VND/Share',
    numThreeFirst: '3 /EPS Forecast(Next Year)',
    numbThreeLast: 'VND/Share',
    numFour: '4 /P/E Multiple',
  },

  resultPE: {
    numOneFirst: 'EOY Stock Price',
    numOneLast: 'VND/Share',
    numTwoFirst: 'End of Next Year Stock Price',
    numTwoLast: 'VND/Share',
  },

  methodPB: {
    numOne: '1 /Current Book Value',
    numTwoFirst: '2 /Estimated Book Value(EOY)',
    numTwoLast: 'VND/Share',
    numThreeFirst: '3 /Book value Forecast(Next Year)',
    numThreeLast: 'VND/Share',
    numFour: '4 /P/B Multiple',
  },

  resultPB: {
    numOneFirst: 'EOY Stock Price',
    numOneLast: 'VND/Share',
    numTwoFirst: 'End of Next Year Stock Price',
    numTwoLast: 'VND/Share',
  },

  errorFCFE: {
    g1Error: 'Invalid calculation! Please check the growth rate',
    g2Error: 'Invalid Calculation, please check sustainable growth rate g2',
    g2ErrorSameNumber:
      'Failed! The value of g2 cannot be the same as cost of equity',
    costOfEquityError: 'Invalid Calculation, please check the Cost of Equity',
  },

  errorPE: {
    estimatedEOYError:
      'Invalid calculation! Please check the Estimated EPS (EOY)',
    epsForecastError:
      'Invalid calculation! Please check the EPS Forecast (Next Year)',
    peMultipleError: 'Invalid calculation! Please check the P/E Multiple',
  },

  errorPB: {
    estimateBookValuedEOYError:
      'Invalid calculation! Please check the Estimated Book Value(EOY)',
    bookValueForecastError:
      'Invalid calculation! Please check the Book value Forecast(Next Year)',
    pbMultiple: 'Invalid calculation! Please check the P/B Multiple',
  },
};
