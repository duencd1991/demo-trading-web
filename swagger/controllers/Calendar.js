'use strict';

var utils = require('../utils/writer.js');
var MarketCalendar = require('../service/MarketCalendarService');

module.exports.GetEconomy = function GetEconomy (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['WeekOfYear'].value;
  var comGroupCode = req.swagger.params['Year'].value;
  var comGroupCode = req.swagger.params['Page'].value;
  var comGroupCode = req.swagger.params['PageSize'].value;
  var comGroupCode = req.swagger.params['KeyWord'].value;
  MarketCalendar.GetEconomy()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetCalendarWatchList = function GetCalendarWatchList (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['Page'].value;
  var comGroupCode = req.swagger.params['PageSize'].value;
  // var comGroupCode = req.swagger.params['watchlistType'].value;
  // var comGroupCode = req.swagger.params['WatchListId'].value;
  MarketCalendar.GetCalendarWatchList()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.GetCorporateEarning = function GetCorporateEarning (req, res, next) {
  var language = req.swagger.params['language'].value;
  var comGroupCode = req.swagger.params['Page'].value;
  var comGroupCode = req.swagger.params['PageSize'].value;
  var comGroupCode = req.swagger.params['OrganCode'].value;
  // var comGroupCode = req.swagger.params['FromDate'].value;
  // var comGroupCode = req.swagger.params['ToDate'].value;
  // var comGroupCode = req.swagger.params['watchlistType'].value;
  MarketCalendar.GetCorporateEarning()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
