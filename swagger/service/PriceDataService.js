'use strict';

var fs = require('fs'),
    path = require('path'),
    fake = require('./PriceDataFake'),
    sutils = require('../utils/ServiceUtils');

/*    
var data_json = {
    GetPriceData: path.join(__dirname, '../data/PriceData_GetPriceData.json')
  , GetTwoDaysSeries: path.join(__dirname, '../data/WatchList_GetTwoDaysSeries.json')

};
*/    
/**
 **/
exports.GetPriceData = function(language, code, Frequently, Page, PageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPriceData(language, code, Frequently, Page, PageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetLatestPrice = function(language, code) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetLatestPrice(language, code);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPriceDepth = function(language, code) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPriceDepth(language, code);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}



