'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/ScreenerService');

module.exports.GetScreenerParameters = function(req, res, next) {
  var language = req.swagger.params['language'].value;
  service.GetScreenerParameters(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};