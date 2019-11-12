'use strict';

var fs = require('fs'),
    path = require('path'),
    fake = require('./SnapshotFake'),
    sutils = require('../utils/ServiceUtils');
    
    
exports.GetCompanyScore = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCompanyScore(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}    
exports.GetSnapshot = function(language,organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetSnapshot(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetOwnership = function(language, organCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetOwnership(language, organCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetShareHolderTooltip = function(language, code) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetShareHolderTooltip(language, code);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
