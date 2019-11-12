'use strict';

var fake = require('./NewsServiceFake');
    
    
exports.GetAggregatorNews = function(language, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetAggregatorNews(language, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetAutoNews = function(language, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetAutoNews(language, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPremiumAnalysis = function(language, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPremiumAnalysis(language, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetMostRecent = function(language, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetMostRecent(language, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetRumors = function(language, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetRumors(language, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
