'use strict';

var fake = require('./FinancialStatementFake');

exports.GetBalanceSheet = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetBalanceSheet(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetIncomeStatement = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetIncomeStatement(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetCashFlow = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCashFlow(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
