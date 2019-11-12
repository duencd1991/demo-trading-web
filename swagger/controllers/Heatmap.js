'use strict';

var utils = require('../utils/writer.js');
var HeatmapService = require('../service/HeatmapService');


module.exports.GetHeatMap = function GetHeatMap (req, res, next) {
  var Exchange = req.swagger.params['Exchange'].value;
  var Creiteria = req.swagger.params['Creiteria'].value;
  var language = req.swagger.params['language'].value;
  HeatmapService.GetHeatMap(language, Exchange, Creiteria)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
