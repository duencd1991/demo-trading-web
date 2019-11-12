var  _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    sutils = require('../utils/ServiceUtils');

exports.listSymbols = function() {
  var underlyingList = sutils.GetResultFromJSONFile(path.join(__dirname, '../data/Master_GetListOrganization.json'), 'items');
  var derivativesList = sutils.GetResultFromJSONFile(path.join(__dirname, '../data/Master_GetAllDerivatives.json'), 'items');
  return {
    listUnderlyingTickers: underlyingList.items,
    listDerivativeTickers: derivativesList.items
  }
};

exports.listICBIndustry = function(icbLevel) {
  //console.log('listICBIndustry ' + icbLevel);
  var listICBS = sutils.GetResultFromJSONFile(path.join(__dirname, '../data/Master_GetAllIcbIndustry.json'), 'items');
   
  return listICBS.items.filter(item => item.icbLevel === icbLevel)
};


exports.listSecuritiesInfoByICBLevel = function(icbLevel, icbCode) {
  //console.log('listICBIndustry ' + icbLevel);
  var listSecuritiesInfo = sutils.GetResultFromJSONFile(path.join(__dirname, '../data/ListSecurities.json'), 'items');
  if (icbLevel === 3)
    return listSecuritiesInfo.items.filter(item => item.icbCodeL3 === icbCode);
  else if (icbLevel === 2)
    return listSecuritiesInfo.items.filter(item => item.icbCodeL2 === icbCode);
  return listSecuritiesInfo.items.filter(item => item.icbCodeL1 === icbCode);
};

exports.makeData = function makeData(len, model) {
  return {
    items: _.range(len).map((index) => {
      return {
        ...model(index)
      }
    })
  };
}


exports.makeArrayData = function makeArrayData(len, field, model) {
  return {
    [field]: _.range(len).map((index) => {
      return {
        ...model(index)
      }
    })
  };
}

exports.makeRealtime = function makeRealtime(len, model) {
  return _.range(len).map((index) => {
    return {
      ...model(index)
    }
  })
}
