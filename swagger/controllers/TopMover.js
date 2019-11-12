'use strict';

var utils = require('../utils/writer.js');
var TopMoverService = require('../service/TopMoverService');


module.exports.GetTopVolume = function GetTopVolume (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopVolume(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopBreakout = function GetTopBreakout (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopBreakout(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopValue = function GetTopValue (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopValue(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopGainers = function GetTopGainers (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopGainers(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopLossers = function GetTopLossers (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopLossers(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetMarketCalendar = function GetMarketCalendar (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetMarketCalendar(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetMoneyFlow = function GetMoneyFlow (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetMoneyFlow(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopLosers = function GetTopLosers (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopLosers(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopNewHigh = function GetTopNewHigh (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopNewHigh(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopNewLow = function GetTopNewLow (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopNewLow(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetTopForeignTrading = function GetTopForeignTrading (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetTopForeignTrading(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetHeatMap = function GetHeatMap (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetHeatMap(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetContribution = function GetContribution (req, res, next) {
  var comGroupCode = req.swagger.params['ComGroupCode'].value;
  var language = req.swagger.params['language'].value;
  TopMoverService.GetContribution(language, comGroupCode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};