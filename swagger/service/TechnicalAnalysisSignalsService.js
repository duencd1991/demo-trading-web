'use strict';

var fake = require('./TechnicalAnalysisSignalsFake');
    
    
exports.GetIndicators = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetIndicators(language);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.getOverview = function(language, WatchListId) {
  return new Promise(function(resolve, reject) {
    var result = fake.getOverview(language, WatchListId);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetCEFLAbnormality = function(language, abnormalityType, averageVolume10D, rateOfUnmatched) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCEFLAbnormality(language, abnormalityType, averageVolume10D, rateOfUnmatched);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetCancelled = function(language, averageVolume10D) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetCancelled(language, averageVolume10D);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPressing = function(language, averageVolume10D, orderType, proportion) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPressing(language, averageVolume10D, orderType, proportion);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetAggressive = function(language, averageVolume10D, orderType, totalVolumeBuSd) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetAggressive(language, averageVolume10D, orderType, totalVolumeBuSd);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetClosing = function(language, averageVolume10D, exceedingPercentage) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetClosing(language, averageVolume10D, exceedingPercentage);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPriceVolumeAnalysis = function(language, priceVolumeAnalysis, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPriceVolumeAnalysis(language, priceVolumeAnalysis, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}