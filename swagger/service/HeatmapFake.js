'use strict';
var _ = require('lodash');
//var namor = require('namor');
//var moment = require('moment');
var fakeHelper = require('./FakeHelper');


exports.GetHeatMap = function(language, exchange, creiteria){
  console.log('Fake - GetHeatMap');
  return fakeHelper.makeData(1, getHeatMap);
}

/*

 */

function getHeatMap(idx) {
  var listICBS = fakeHelper.listICBIndustry(3);
  var minItem = _.min([10, listICBS.length]);
  var sectors = fakeHelper.makeArrayData(_.random(minItem, listICBS.length, true), "sectors", getHeatmapSector);
  return {
    ...sectors
  }
}
function getHeatmapSector(idx) {
  var listICBS = fakeHelper.listICBIndustry(3);
  var item = listICBS[idx];
  return {
        tickers: getHeatmapTicker(item),
        icbCode: item.icbCode,
        name: item.icbName,
        rate: _.random(2, 20, true),
        value: _.ceil(_.random(1000, 500000, true), 0)
  }
}

function getHeatmapTicker(icbItem) {
  var listSymbols = fakeHelper.listSecuritiesInfoByICBLevel(3, icbItem.icbCode);
  var maxItems = _.min([10, listSymbols.length]);
  return  _.range(maxItems).map((index) => {
    var item = listSymbols[index];
    return {
      ticker:item.ticker,
      organCode:item.organCode,
      value: _.ceil(_.random(1000, 500000, true), 0),
      rate:_.ceil(_.random(1, 10, true), 2),
      matchPrice: _.ceil(_.random(1000, 500000, true), 2),
      percentPriceChange: _.ceil(_.random(1000, 500000, true), 2),
      ceilingPrice: _.ceil(_.random(1000, 500000, true), 2),
      floorPrice: _.ceil(_.random(1000, 500000, true), 2),
      referencePrice:_.ceil(_.random(1000, 500000, true), 2)
    }

  });


  // return listSymbols.map((item) => {
  //   return {
  //     ticker:item.ticker,
  //     organCode:item.organCode,
  //     value: _.ceil(_.random(1000, 500000, true), 0),
  //     rate:_.ceil(_.random(1, 10, true), 2),
  //     matchPrice: _.ceil(_.random(1000, 500000, true), 2),
  //     percentPriceChange: _.ceil(_.random(1000, 500000, true), 2),
  //     ceilingPrice: _.ceil(_.random(1000, 500000, true), 2),
  //     floorPrice: _.ceil(_.random(1000, 500000, true), 2),
  //     referencePrice:_.ceil(_.random(1000, 500000, true), 2)
  //   }
  // });
  
}