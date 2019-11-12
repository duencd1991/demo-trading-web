'use strict';

var fake = require('./FinancialAnalysisFake');

exports.GetCheckup = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCheckup(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetFinancialRatio = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetFinancialRatio(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetZMFScore = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetZMFScore(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
