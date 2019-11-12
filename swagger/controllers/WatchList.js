'use strict';

var utils = require('../utils/writer.js');
var WatchList = require('../service/WatchListService');

module.exports.GetWatchListSummary = function GetWatchListSummary (req, res, next) {
  var id = req.swagger.params['id'].value;
  var watchListId = req.swagger.params['WatchListId'].value;
  var watchListType = req.swagger.params['WatchListType'].value;
  var language = req.swagger.params['language'].value;
  WatchList.GetWatchListSummary(language, id,watchListId,watchListType)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTwoDaysSeries = function GetTwoDaysSeries (req, res, next) {
  var organCode = req.swagger.params['OrganCode'].value;
  var language = req.swagger.params['language'].value;
  WatchList.GetTwoDaysSeries(language, organCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPutThrough = function GetPutThrough (req, res, next) {
  var language = req.swagger.params['language'].value;
  WatchList.GetPutThrough(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetDerivatives = function GetDerivatives (req, res, next) {
  var language = req.swagger.params['language'].value;
  WatchList.GetDerivatives(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetWatchListNews = function GetWatchListNews (req, res, next) {
  var language = req.swagger.params['language'].value;
  var Page = req.swagger.params['Page'].value;
  var PageSize = req.swagger.params['PageSize'].value;
  var WatchListId = req.swagger.params['WatchListId'].value;
  var WatchListType = req.swagger.params['WatchListType'].value;
  WatchList.GetWatchListNews(language, Page, PageSize, WatchListId, WatchListType)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTechnical = function GetTechnical (req, res, next) {
  var language = req.swagger.params['language'].value;
  var id = req.swagger.params['id'].value;
  var WatchListId = req.swagger.params['WatchListId'].value;
  var Type = req.swagger.params['Type'].value;
  WatchList.GetTechnical(language, id, WatchListId, Type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTickerSeries = function GetTechnical (req, res, next) {
  var language = req.swagger.params['language'].value;
  var id = req.swagger.params['id'].value;
  var timeRange = req.swagger.params['TimeRange'].value;
  var organCode = req.swagger.params['OrganCode'].value;
  WatchList.GetTickerSeries(language, id, timeRange, organCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
