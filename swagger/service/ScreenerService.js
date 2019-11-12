'use strict';

var fake = require('./ScreenerFake');

exports.GetScreenerParameters = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetScreenerParameters(language);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}