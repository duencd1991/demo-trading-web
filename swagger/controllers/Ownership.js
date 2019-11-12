'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/SnapshotService');

module.exports.GetOwnership = function(req, res, next) {
  var organCode = req.swagger.params['OrganCode'].value;
  var language = req.swagger.params['language'].value;
  service.GetOwnership(language, organCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetShareHolderTooltip = function(req, res, next) {
  var code = req.swagger.params['Code'].value;
  var language = req.swagger.params['language'].value;
  service.GetShareHolderTooltip(language, code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};