'use strict';

var utils = require('../utils/writer.js');
var PriceDepthService = require('../service/PriceDepthService');


module.exports.GetPriceDepth = function GetPriceDepth (req, res, next) {
  var code = req.swagger.params['Code'].value;
  var language = req.swagger.params['language'].value;
  PriceDepthService.GetPriceDepth(language, code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.GetTimeAndSales = function GetTimeAndSales(req, res, next) {
  var code = req.swagger.params['Code'].value;
  var language = req.swagger.params['language'].value;
  PriceDepthService.GetTimeAndSales(language, code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};