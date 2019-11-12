'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/AlertService');

module.exports.GetNotificationList = function(req, res, next) {
  var organCode = req.swagger.params['OrganCode'].value;
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetNotificationList(language, organCode, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetAllSystemAlerts = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  service.GetAllSystemAlerts(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPersonalAlertTypes = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  service.GetPersonalAlertTypes(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};