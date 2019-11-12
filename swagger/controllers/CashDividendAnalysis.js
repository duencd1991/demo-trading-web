var utils = require('../utils/writer.js');
var service = require('../service/CashDividendAnalysisService');

module.exports.GetAnalysis = function(req, res, next) {
  var organCode = req.swagger.params['OrganCode'].value;
  var language = req.swagger.params['language'].value;
  service.GetAnalysis(language, organCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};