'use strict';

var fake = require('./MoneyFlowFake');

exports.GetContribution = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetContribution(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetForeign = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetForeign(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetProprietary = function(language, comGroupCode) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetProprietary(language, comGroupCode);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}