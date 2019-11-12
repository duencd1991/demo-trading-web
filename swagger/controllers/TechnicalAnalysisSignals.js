'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/TechnicalAnalysisSignalsService');


module.exports.GetIndicators = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  service.GetIndicators(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.getOverview = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var watchListId = req.swagger.params['WatchListId'].value;
  service.getOverview(language, watchListId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetCEFLAbnormality = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var abnormalityType = req.swagger.params['AbnormalityType'].value;
  var averageVolume10D = req.swagger.params['AverageVolume10D'].value;
  var rateOfUnmatched = req.swagger.params['RateOfUnmatched'].value;
  service.GetCEFLAbnormality(language, abnormalityType, averageVolume10D, rateOfUnmatched)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetCancelled = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var averageVolume10D = req.swagger.params['AverageVolume10D'].value;
  service.GetCancelled(language, averageVolume10D)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPressing = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var averageVolume10D = req.swagger.params['AverageVolume10D'].value;
  var orderType = req.swagger.params['OrderType'].value;
  var proportion = req.swagger.params['Proportion'].value;
  service.GetPressing(language, averageVolume10D, orderType, proportion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetAggressive = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var averageVolume10D = req.swagger.params['AverageVolume10D'].value;
  var orderType = req.swagger.params['OrderType'].value;
  var totalVolumeBuSd = req.swagger.params['TotalVolumeBuSd'].value;
  service.GetAggressive(language, averageVolume10D, orderType, totalVolumeBuSd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetClosing = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var averageVolume10D = req.swagger.params['AverageVolume10D'].value;
  var exceedingPercentage = req.swagger.params['ExceedingPercentage'].value;
  service.GetClosing(language, averageVolume10D, exceedingPercentage)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPriceVolumeAnalysis = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var priceVolumeAnalysis = req.swagger.params['PriceVolumeAnalysis'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetPriceVolumeAnalysis(language, priceVolumeAnalysis, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
