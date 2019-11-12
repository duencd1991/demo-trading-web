'use strict';

var utils = require('../utils/writer.js');
var PriceDataService = require('../service/PriceDataService');

module.exports.GetPriceData = function GetPriceData (req, res, next) {
  var code = req.swagger.params['Code'].value;
  var Frequently = req.swagger.params['Frequently'].value;
  var Page = req.swagger.params['Page'].value;
  var PageSize = req.swagger.params['PageSize'].value;
  var language = req.swagger.params['language'].value;
  PriceDataService.GetPriceData(language, code, Frequently, Page,PageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetLatestPrice = function GetLatestPrice (req, res, next) {
  var code = req.swagger.params['Code'].value;
  var language = req.swagger.params['language'].value;
  PriceDataService.GetLatestPrice(language, code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPriceDepth = function GetPriceDepth (req, res, next) {
  var code = req.swagger.params['Code'].value;
  var language = req.swagger.params['language'].value;
  PriceDataService.GetPriceDepth(language, code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};