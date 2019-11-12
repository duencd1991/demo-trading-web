'use strict';

var utils = require('../utils/writer.js');
var master = require('../service/MasterService');

module.exports.GetListOrganization = function GetListOrganization (req, res, next) {
  var language = req.swagger.params['language'].value;
  master.GetListOrganization(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetAllCompanyGroup = function GetAllCompanyGroup (req, res, next) {
  var language = req.swagger.params['language'].value;
  master.GetAllCompanyGroup(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetAllDerivatives = function GetAllDerivatives (req, res, next) {
  var language = req.swagger.params['language'].value;
  master.GetAllDerivatives(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetAllIcbIndustry = function GetAllIcbIndustry (req, res, next) {
  var language = req.swagger.params['language'].value;
  master.GetAllIcbIndustry(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


