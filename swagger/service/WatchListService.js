'use strict';

var fs = require('fs'),
    path = require('path'),
    fake = require('./WatchListFake'),
    sutils = require('../utils/ServiceUtils');
    
var data_json = {
    GetWatchListSummary: path.join(__dirname, '../data/WatchList_GetWatchListSummary.json')
  , GetTwoDaysSeries: path.join(__dirname, '../data/WatchList_GetTwoDaysSeries.json')

};    
/**
 * Get user's watch list
 * Multiple share codes
 *
 * language String Language code: en, vi, kr ... (optional)
 * returns userWatchList
 **/
exports.GetWatchListSummary = function(language, id, watchListId, watchListType) {
  return new Promise(function(resolve, reject) {
    //var result = sutils.GetResultFromJSONFile(data_json.GetWatchListSummary, 'items');
    var result = fake.getListSummary();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetTwoDaysSeries = function(language,OrganCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.getTwoDaysSeries('SSI');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPutThrough = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.getPutThrough('SSI');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetDerivatives = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.getDerivatives();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetWatchListNews = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.getWatchListNews();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetTechnical = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.getTechnical();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetTickerSeries = function(language, id, timeRange, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetTickerSeries();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
