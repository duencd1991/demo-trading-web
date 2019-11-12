'use strict';

var utils = require('../utils/writer.js');
var UserSetting = require('../service/UserSettingService');

module.exports.GetUserWatchList = function GetUserWatchList (req, res, next) {
  var language = req.swagger.params['language'].value;
  UserSetting.GetUserWatchList(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetWorkspace = function GetWorkspace (req, res, next) {
  var language = req.swagger.params['language'].value;
  UserSetting.GetWorkspace(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.getTopScreeners = function GetWorkspace (req, res, next) {
  var language = req.swagger.params['language'].value;
  UserSetting.getTopScreeners(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
