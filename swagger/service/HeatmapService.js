'use strict';

var fs = require('fs'),
    path = require('path'),
    fake = require('./HeatmapFake'),
    sutils = require('../utils/ServiceUtils');
    
   

exports.GetHeatMap = function(language, exchange, creiteria) {
  return new Promise(function(resolve, reject) {
    //console.log('TopMoverService - GetTopVolume');
    var result = fake.GetHeatMap(language, exchange, creiteria);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
} 


