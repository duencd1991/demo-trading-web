'use strict';

var fake = require('./AlertFake');

exports.GetNotificationList = function(language, organCode, page, pageSize) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetNotificationList(language, organCode, page, pageSize);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
exports.GetAllSystemAlerts = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetAllSystemAlerts(language);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}

exports.GetPersonalAlertTypes = function(language) {
  return new Promise(function(resolve, reject) {
    var result = fake.GetPersonalAlertTypes(language);
    if (Object.keys(result).length > 0) {
      resolve(result);
    }
    else {
      resolve();
    }
  });
}
