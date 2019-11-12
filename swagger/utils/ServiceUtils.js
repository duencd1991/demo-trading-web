'use strict';

var fs = require('fs'),
    path = require('path');
    
exports.GetResultFromJSONFile = function(file, existedFieldName) {
    var rawdata = fs.readFileSync(file, 'utf8');
    var jdata = JSON.parse(rawdata);
    var results = {};
    if ((existedFieldName in jdata)==false)
    {
      results['application/json'] = [];
    }
    else 
    {
      results['application/json'] = jdata;
    }
   
    if (Object.keys(results).length > 0) {
      return results[Object.keys(results)[0]];
    } else {
      return results;
    }
  };
