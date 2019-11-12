'use strict';

var fs = require('fs'),
    path = require('path'),
    fake = require('./TopMoverFake'),
    sutils = require('../utils/ServiceUtils');
    
    
exports.GetTopVolume = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopVolume(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}    

exports.GetTopBreakout = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopBreakout(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}    

exports.GetTopValue = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopValue(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}    


exports.GetTopGainers = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopGainers(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}    

exports.GetTopLossers = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopLossers(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetMarketCalendar = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetMarketCalendar(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetMoneyFlow = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetMoneyFlow(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetTopLosers = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopLosers(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetTopNewHigh = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetTopNewHigh(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetTopNewLow = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetTopNewLow(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetTopForeignTrading = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetTopForeignTrading(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 

exports.GetHeatMap = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetHeatMap(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}