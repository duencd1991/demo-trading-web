'use strict';

var fs = require('fs'),
    path = require('path'),
    sutils = require('../utils/ServiceUtils');
    
var data_json = {
  GetListOrganization: path.join(__dirname, '../data/Master_GetListOrganization.json'),
  GetAllCompanyGroup: path.join(__dirname, '../data/Master_GetAllCompanyGroup.json'),
  GetAllDerivatives: path.join(__dirname, '../data/Master_GetAllDerivatives.json'),
  GetAllIcbIndustry: path.join(__dirname, '../data/Master_GetAllIcbIndustry.json')
};    

exports.GetListOrganization = function(language) {
  return new Promise(function(resolve, reject) {
    var result = sutils.GetResultFromJSONFile(data_json.GetListOrganization, 'items');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });  
}

exports.GetAllCompanyGroup = function(language) {
  return new Promise(function(resolve, reject) {
    var result = sutils.GetResultFromJSONFile(data_json.GetAllCompanyGroup, 'items');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });  
}

exports.GetAllDerivatives = function(language) {
  return new Promise(function(resolve, reject) {
    var result = sutils.GetResultFromJSONFile(data_json.GetAllDerivatives, 'items');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });  
}

exports.GetAllIcbIndustry = function(language) {
  return new Promise(function(resolve, reject) {
    var result = sutils.GetResultFromJSONFile(data_json.GetAllIcbIndustry, 'items');
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });  
}
