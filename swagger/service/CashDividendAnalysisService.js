'use strict';

var fake = require('./CashDividendAnalysisFake');

exports.GetAnalysis = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetAnalysis(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}