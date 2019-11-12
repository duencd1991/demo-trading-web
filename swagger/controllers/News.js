'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/NewsService');


module.exports.GetAggregatorNews = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetAggregatorNews(language, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetAutoNews = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetAutoNews(language, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPremiumAnalysis = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetPremiumAnalysis(language, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetMostRecent = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetMostRecent(language, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetRumors = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  var page = req.swagger.params['Page'].value;
  var pageSize = req.swagger.params['PageSize'].value;
  service.GetRumors(language, page, pageSize)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
