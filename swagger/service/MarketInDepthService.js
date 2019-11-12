'use strict';

var fake = require('./MarketInDepthFake');

exports.GetLatestIndices = function(language, pageSize,status) {
  return new Promise(function(resolve, reject) {
    var result = fake.getListLatestIndices();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetProspect = function(ComGroupCode, language) {
  return new Promise(function(resolve, reject) {
    var result = fake.getProspect();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetIndexSeries = function(language, ComGroupCode, TimeRange, id) {
  return new Promise(function(resolve, reject) {
    var result = fake.getIndexSeries();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetValuationSeries = function(language, Code, TimeRange) {
  return new Promise(function(resolve, reject) {
    var result = fake.getValuationSeries();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetLiquiditySeries = function(language, Code, TimeRange) {
  return new Promise(function(resolve, reject) {
    var result = fake.getLiquiditySeries();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetMarketAnomaly = function(language, Code, TimeRange) {
  return new Promise(function(resolve, reject) {
    var result = fake.getMarketAnomaly();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}