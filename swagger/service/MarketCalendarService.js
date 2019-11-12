'use strict';

var fake = require('./MarketCalendarFake');

exports.GetEconomy = function() {
  return new Promise(function(resolve, reject) {
    var result = fake.GetEconomy();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetCalendarWatchList = function() {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCalendarWatchList();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetCorporateEarning = function() {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCorporateEarning();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
