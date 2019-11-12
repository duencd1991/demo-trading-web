'use strict';
var fakeHelper = require('./FakeHelper');

function getItemIndicator() {
  return {
    cmf: 0.13761322993040634,
    ma5: 40900,
    roc: 0.03125,
    rockPrev: 0.007352941176470588,
    rsi: 100,
    rsiPrev: 100
  }
}
exports.GetIndicators = function GetIndicators() {
  return {
    daily: getItemIndicator(),
    hourly: getItemIndicator(),
    matchPrice: 41500,
    organCode: "BID",
    quarterly: getItemIndicator(),
    weekly: getItemIndicator()
  }
}

function getItemOverview() {
  return {
    aggressive: true,
    cancelled: true,
    ceFl: false,
    ceilingPrice: 44100,
    closing: false,
    floorPrice: 38400,
    matchPrice: 41300,
    organCode: "BID",
    percentPriceChange: 0.0012121212121212121,
    pressing: false,
    referencePrice: 41250,
    ticker: "BID",
    totalMatchedVolume: 885680
  }
}
exports.getOverview = function getOverview() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemOverview),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemCEFLAbnormality() {
  return {
    abnormalityType: "CeilingBuy",
    averageMatchVolume2Week: 10052718,
    ceilingPrice: 4950,
    floorPrice: 4310,
    matchPrice: 4950,
    organCode: "FLC",
    previouseSession: 6,
    rank: 11,
    ratio: 1.2675517208380858,
    referencePrice: 4630,
    session: 6,
    ticker: "FLC",
    totalMatchVolume: 9433810,
    totalRank: 120,
    tradingDate: "2019-10-21T11:14:47",
    volumeCEUnmatched: 12742340,
    volumeFLUnmatched: 0
  }
}
exports.GetCEFLAbnormality = function GetCEFLAbnormality() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemCEFLAbnormality),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemCancelled() {
  return {
    averageMatchVolume2Week: 1931514,
    cancelledBuyOrder: 195,
    cancelledBuyOrderVolume: 1956000,
    cancelledSellOrder: 156,
    cancelledSellOrderVolume: 706900,
    ceilingPrice: 20200,
    floorPrice: 16600,
    matchPrice: 18600,
    organCode: "PVS",
    referencePrice: 18400,
    ticker: "PVS",
    totalCancelledOrder: 351,
    totalCancelledOrderVolume: 2662900,
    totalMatchedVolume: 2313248
  }
}
exports.GetCancelled = function GetCancelled() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemCancelled),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemPressing() {
  return {
    averageMatchVolume2Week: 1904130,
    bid: 24000,
    bidVolume: 325600,
    ceilingPrice: 26000,
    floorPrice: 21400,
    matchPrice: 24100,
    offer: 24300,
    offerVolume: 275900,
    organCode: "ACB",
    pressingType: "Both",
    rank: 6,
    referencePrice: 23700,
    ticker: "ACB",
    totalMatchVolume: 4680084,
    totalRank: 18
  }
}
exports.GetPressing = function GetPressing() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemPressing),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemAggressive() {
  return {
    averageMatchVolume2Week: 1302571,
    ceilingPrice: 4790,
    floorPrice: 4170,
    matchPrice: 4470,
    matchVolume: 310,
    organCode: "HAG",
    rank: 38,
    referencePrice: 4480,
    ticker: "HAG",
    totalMatchVolume: 1084190,
    totalRank: 102,
    totalVolumeBuyUp: 227900,
    totalVolumeSellDown: 846290
  }
}
exports.GetAggressive = function GetAggressive() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemAggressive),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemClosing() {
  return {
    averageMatchVolume2Week: 156373,
    ceilingPrice: 18200,
    floorPrice: 15000,
    matchPrice: 16600,
    organCode: "HLD",
    rank: 70,
    referencePrice: 16600,
    ticker: "HLD",
    totalMatchVolume: 81661,
    totalRank: 120,
    tradingDate: "2019-10-10T14:23:14",
    volumeAfter2pm: 49400,
    volumeBefore2pm: 32261,
    volumePrevious: 91500
  }
}
exports.GetClosing = function GetClosing() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemClosing),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}

function getItemPriceVolume() {
  return {
    ceilingPrice: 25550,
    floorPrice: 22250,
    lastClose: 23900,
    lastVolume: 161500,
    matchPrice: 24850,
    nrOfDay: 5,
    organCode: "DBC",
    rank: 17,
    referencePrice: 23900,
    rsI14: 64.8936170213,
    ticker: "DBC",
    totalMatchVolume: 247020,
    totalRank: 102,
    totalTradingTime: 4.25,
    tradingDate: "2019-10-10T14:24:43",
    volumeExpected: 268366.54121991084
  }
}
exports.GetPriceVolumeAnalysis = function GetPriceVolumeAnalysis() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemPriceVolume),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 30
  }
}