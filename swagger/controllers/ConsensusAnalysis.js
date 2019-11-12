'use strict';

var utils = require('../utils/writer.js');
var service = require('../service/ConsensusAnalysisService');

module.exports.GetConsensus = function(req, res, next) {
  var organCode = req.swagger.params['OrganCode'].value;
  var language = req.swagger.params['language'].value;
  service.GetConsensus(language, organCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};