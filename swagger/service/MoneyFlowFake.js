'use strict';

var fakeHelper = require('./FakeHelper');


function getItemTopGainers() {
  return {
    averageVolume1Week: 1326552,
    contribution: 8.7574167088729,
    contributionPercent: 0.008843285006283915,
    matchPrice: 85100,
    organCode: "VCB",
    percentPriceChange: 0.007100591715976331,
    priceChange: 600,
    rank: 1,
    rtd11: 313400144356000,
    ticker: "VCB",
    totalMatchValue: 20454000000,
    totalMatchVolume: 241470
  }
}
function getItemTopLosers() {
  return {
    averageVolume1Week: 486180,
    contribution: -5.28411465869917,
    contributionPercent: -0.005335926505063334,
    matchPrice: 117400,
    organCode: "VIC",
    percentPriceChange: 0.003418803418803419,
    priceChange: 400,
    rank: 1,
    rtd11: 391474440513000,
    ticker: "VIC",
    totalMatchValue: 5578000000,
    totalMatchVolume: 47550
  }
}
function getItemContribution() {
  return {
    contrib1Day: {
      ...fakeHelper.makeArrayData(10, "topGainers", getItemTopGainers),
      ...fakeHelper.makeArrayData(10, "topLosers", getItemTopLosers)
    },
    contrib5Day: {
      ...fakeHelper.makeArrayData(10, "topGainers", getItemTopGainers),
      ...fakeHelper.makeArrayData(10, "topLosers", getItemTopLosers)
    },
    contrib10Day: {
      ...fakeHelper.makeArrayData(10, "topGainers", getItemTopGainers),
      ...fakeHelper.makeArrayData(10, "topLosers", getItemTopLosers)
    },
    contrib20Day: {
      ...fakeHelper.makeArrayData(10, "topGainers", getItemTopGainers),
      ...fakeHelper.makeArrayData(10, "topLosers", getItemTopLosers)
    },
    series: {
      ceiling: 0,
      closeIndex: 990.29,
      comGroupCode: "VNINDEX",
      floor: 0,
      foreignBuyValueDeal: 0,
      foreignBuyValueMatched: 100603586000,
      foreignBuyValueTotal: 0,
      foreignBuyVolumeDeal: 0,
      foreignBuyVolumeMatched: 2413758,
      foreignBuyVolumeTotal: 0,
      foreignCurrentRoom: 0,
      foreignSellValueDeal: 0,
      foreignSellValueMatched: 127342256100,
      foreignSellValueTotal: 0,
      foreignSellVolumeDeal: 0,
      foreignSellVolumeMatched: 2850778,
      foreignSellVolumeTotal: 0,
      foreignTotalRoom: 0,
      highestIndex: 990.89,
      indexChange: 2.46,
      indexId: 0,
      indexValue: 990.29,
      lowestIndex: 987.83,
      marketStatus: null,
      matchValue: 0,
      matchVolume: 0,
      openIndex: 988.81,
      percentIndexChange: 0.0024903070366358586,
      referenceIndex: 987.83,
      status: 0,
      totalDealValue: 362926915700,
      totalDealVolume: 13668418,
      totalDownVolume: 0,
      totalMatchValue: 1326425000000,
      totalMatchVolume: 63129951,
      totalNoChangeVolume: 0,
      totalStockDownPrice: 208,
      totalStockNoChangePrice: 76,
      totalStockOverCeiling: 4,
      totalStockUnderFloor: 81,
      totalStockUpPrice: 118,
      totalTrade: 30059,
      totalUpVolume: 0,
      totalValue: 1326425000000,
      totalVolume: 63129951,
      tradingDate: "2019-10-10T11:19:56",
      typeIndex: 0
    }
  }
}
exports.GetContribution = function GetContribution(language, comGroupCode) {
  return {
    errors: null,
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 1,
    ...fakeHelper.makeData(10, getItemContribution)
  }
}

function getItemByTime(timeRange) {
  return {
    [timeRange]: {
      buy: [{
        ceilingPrice: 108200,
        floorPrice: 94200,
        foreignBuyValueMatched: 174795198120,
        foreignSellValueMatched: 248244699120,
        marketType: "Buy",
        matchPrice: 101200,
        organCode: "GAS",
        percentPriceChange: -0.0212765957,
        priceChange: -2200,
        referencePrice: 101200,
        ticker: "GAS",
        timeRange: timeRange
      }],
      comGroupCode: null,
      foreignBuyValueMatched: 6383027076500,
      foreignSellValueMatched: 8199544153300,
      sell: [{
        ceilingPrice: 108200,
        floorPrice: 94200,
        foreignBuyValueMatched: 174795198120,
        foreignSellValueMatched: 248244699120,
        marketType: "Sell",
        matchPrice: 101200,
        organCode: "GAS",
        percentPriceChange: -0.0212765957,
        priceChange: -2200,
        referencePrice: 101200,
        ticker: "GAS",
        timeRange: timeRange
      }],
      timeRange: timeRange
    }
  }
}
function getItemGetForeign() {
  return {
    comGroupCode: "VNINDEX",
    ...getItemByTime("oneMonth"),
    ...getItemByTime("oneWeek"),
    series: [
      {
        foreignBuyValueMatched: 0,
        foreignSellValueMatched: 0,
        tradingDate: "2019-10-17T09:00:56"
      }
    ],
    ...getItemByTime("today"),
    ...getItemByTime("yearToDate")
  }
}
exports.GetForeign = function GetForeign(language, comGroupCode) {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemGetForeign),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 1
  }
}


function getItemProprietaryByTime(timeRange) {
  return {
    [timeRange]: {
      buy: [{
        ceilingPrice: 24900,
        floorPrice: 21700,
        marketType: "Buy",
        matchPrice: 23200,
        organCode: "MBB",
        percentPriceChange: 0.075414727,
        priceChange: 1634,
        referencePrice: 23300,
        ticker: "MBB",
        timeRange: timeRange,
        totalBuyTradeValue: 229081400000,
        totalBuyTradeVolume: 10036640,
        totalSellTradeValue: 148892888500,
        totalSellTradeVolume: 6466400
      }],
      comGroupCode: null,
      foreignBuyValueMatched: 6383027076500,
      foreignSellValueMatched: 8199544153300,
      sell: [{
        ceilingPrice: 24900,
        floorPrice: 21700,
        marketType: "Sell",
        matchPrice: 23200,
        organCode: "MBB",
        percentPriceChange: 0.075414727,
        priceChange: 1634,
        referencePrice: 23300,
        ticker: "MBB",
        timeRange: timeRange,
        totalBuyTradeValue: 229081400000,
        totalBuyTradeVolume: 10036640,
        totalSellTradeValue: 148892888500,
        totalSellTradeVolume: 6466400
      }],
      timeRange: timeRange
    }
  }
}
function getItemProprietary() {
  return {
    comGroupCode: "VNINDEX",
    ...getItemProprietaryByTime("oneMonth"),
    ...getItemProprietaryByTime("oneWeek"),
    ...getItemProprietaryByTime("today"),
    ...getItemProprietaryByTime("yearToDate")
  }
}
exports.GetProprietary = function GetProprietary(language, comGroupCode) {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemProprietary),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 1
  }
}