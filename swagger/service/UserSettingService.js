'use strict';

var fs = require('fs'),
    path = require('path'),
    sutils = require('../utils/ServiceUtils'),
    fake = require('./UserSettingFake');
    
var data_json = {
  getUserWatchList: path.join(__dirname, '../data/UserSetting_GetUserWatchList.json'),
  getWorkspace: path.join(__dirname, '../data/UserSetting_GetWorkspace.json')

};    
/**
 * Get user's watch list
 * Multiple share codes
 *
 * language String Language code: en, vi, kr ... (optional)
 * returns userWatchList
 **/
exports.GetUserWatchList = function(language) {
  return new Promise(function(resolve, reject) {
    var result = sutils.GetResultFromJSONFile(data_json.getUserWatchList, 'items');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });  
}

exports.getTopScreeners = function(language, id, timeRange, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.getTopScreeners();
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}