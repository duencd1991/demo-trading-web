'use strict';

var utils = require('../utils/writer.js');
var MoneyFlow = require('../service/MoneyFlowService');

module.exports.GetContribution = function GetContribution (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  MoneyFlow.GetContribution(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetForeign = function GetForeign (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  MoneyFlow.GetForeign(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetProprietary = function GetProprietary (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  MoneyFlow.GetProprietary(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};