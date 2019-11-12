'use strict';

var utils = require('../utils/writer.js');
var MartketInDepth = require('../service/MarketInDepthService');

module.exports.GetLatestIndices = function GetLatestIndices (req, res, next) {
  var pageSize = req.swagger.params['PageSize'].value;
  var status = req.swagger.params['status'].value;
  var language = req.swagger.params['language'].value;
  MartketInDepth.GetLatestIndices(language, pageSize, status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetProspect = function GetProspect (req, res, next) {
  var ComGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  MartketInDepth.GetProspect(ComGroupCode, language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetIndexSeries = function GetIndexSeries (req, res, next) {
  var language = req.swagger.params['language'].value;
  var ComGroupCode = req.swagger.params['ComGroupCode'].value;
  var TimeRange = req.swagger.params['TimeRange'].value;
  var id = req.swagger.params['id'].value;
  MartketInDepth.GetIndexSeries(language, ComGroupCode, TimeRange, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetValuationSeries = function GetValuationSeries (req, res, next) {
  var language = req.swagger.params['language'].value;
  var Code = req.swagger.params['Code'].value;
  var TimeRange = req.swagger.params['TimeRange'].value;
  MartketInDepth.GetValuationSeries(language, Code, TimeRange)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetLiquiditySeries = function GetLiquiditySeries (req, res, next) {
  var language = req.swagger.params['language'].value;
  var ComGroupCode = req.swagger.params['ComGroupCode'].value;
  var TimeRange = req.swagger.params['TimeRange'].value;
  MartketInDepth.GetLiquiditySeries(language, ComGroupCode, TimeRange)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetMarketAnomaly = function GetMarketAnomaly (req, res, next) {
  var language = req.swagger.params['language'].value;
  var Code = req.swagger.params['Code'].value;
  var TimeRange = req.swagger.params['TimeRange'].value;
  MartketInDepth.GetMarketAnomaly(language, Code, TimeRange)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
