'use strict';
var _ = require('lodash');
var namor = require('namor');
var moment = require('moment');
var fakeHelper = require('./FakeHelper');

function getItemMarketInDepth() {
  return {
    ceiling: 0,
    closeIndex: 989.61,
    comGroupCode: "VNINDEX",
    floor: 0,
    foreignBuyValueDeal: 0,
    foreignBuyValueMatched: 12143626900,
    foreignBuyValueTotal: 0,
    foreignBuyVolumeDeal: 0,
    foreignBuyVolumeMatched: 372300,
    foreignBuyVolumeTotal: 0,
    foreignCurrentRoom: 0,
    foreignSellValueDeal: 0,
    foreignSellValueMatched: 11101246200,
    foreignSellValueTotal: 0,
    foreignSellVolumeDeal: 0,
    foreignSellVolumeMatched: 249620,
    foreignSellVolumeTotal: 0,
    foreignTotalRoom: 0,
    highestIndex: 990.51,
    indexChange: 1.78,
    indexId: 0,
    indexValue: 989.61,
    lowestIndex: 987.83,
    marketStatus: null,
    matchValue: 9803000000,
    matchVolume: 608230,
    openIndex: 988.81,
    percentIndexChange: 0.001801929481793426,
    referenceIndex: 987.83,
    status: 0,
    totalDealValue: 25966000000,
    totalDealVolume: 410000,
    totalDownVolume: 0,
    totalMatchValue: 178933000000,
    totalMatchVolume: 9049501,
    totalNoChangeVolume: 0,
    totalStockDownPrice: 209,
    totalStockNoChangePrice: 74,
    totalStockOverCeiling: 3,
    totalStockUnderFloor: 146,
    totalStockUpPrice: 119,
    totalTrade: 6530,
    totalUpVolume: 0,
    totalValue: 178933000000,
    totalVolume: 9049501,
    tradingDate: "2019-10-10T09:29:25",
    typeIndex: 0
  }
}
exports.getListLatestIndices = function getListLatestIndices() {
  return fakeHelper.makeData(30, getItemMarketInDepth);
}
function getItemProspectHeatMap() {
  return {
    comGroupCode: "VNINDEX",
    heatmaps: [
      {
        asianMarket: [
          {
            indexChange: 24.52,
            indexValue: 2046.25,
            percentIndexChange: 0.0121282368,
            tradingDate: "2019-10-08T00:00:00",
            worldIndexCode: "KOSPI",
          }
        ],
        centralBankRate: {
          exchangeRate: 23156,
          previousExchangeRate: 23157,
          previousPublicDate: "2019-10-08T00:00:00",
          publicDate: "2019-10-09T00:00:00",
        },
        europMarket: [
          {
            indexChange: -127.23,
            indexValue: 11970.2,
            percentIndexChange: -0.0105170682,
            tradingDate: "2019-10-08T00:00:00",
            worldIndexCode: "DAX",
          }
        ],
        foreignFlow: {
          foreignBuyValueMatched: 200625373700,
          foreignSellValueMatched: 185036236300,
          netForeign: 15589137400,
          tradingDate: "2019-10-09T00:00:00",
        },
        oilWtiPrice: {
          percentPriceChange: -0.0123094363,
          price: 52.45,
          priceChange: -0.65,
          tradingDate: "2019-10-09T00:00:00",
        },
        timeRange: "Daily",
        usMarket: [
          {
            indexChange: -313.98,
            indexValue: 26164.04,
            percentIndexChange: -0.0118581553,
            tradingDate: "2019-10-08T00:00:00",
            worldIndexCode: "DJI",
          }
        ],
        vnIndex: {
          closeIndex: 987.83,
          indexChange: -0.39,
          indexValue: 987.83,
          percentIndexChange: -0.000394649,
          tradingDate: "2019-10-09T00:00:00",
        },
        worldGoldPrice: {
          buyPrice: 1506.25,
          buyPriceChange: 13.73,
          percentBuyPriceChange: 0.0091992067,
          tradingDate: "2019-10-09T00:00:00",
        }
      }
    ]
  }
}
function getItemProspectSeries() {
  return {
    ceiling: 0,
    closeIndex: 989.77,
    comGroupCode: "VNINDEX",
    floor: 0,
    foreignBuyValueDeal: 0,
    foreignBuyValueMatched: 73158043600,
    foreignBuyValueTotal: 0,
    foreignBuyVolumeDeal: 0,
    foreignBuyVolumeMatched: 1451578,
    foreignBuyVolumeTotal: 0,
    foreignCurrentRoom: 0,
    foreignSellValueDeal: 0,
    foreignSellValueMatched: 86979155300,
    foreignSellValueTotal: 0,
    foreignSellVolumeDeal: 0,
    foreignSellVolumeMatched: 1487698,
    foreignSellVolumeTotal: 0,
    foreignTotalRoom: 0,
    highestIndex: 990.89,
    indexChange: 1.94,
    indexId: 0,
    indexValue: 989.77,
    lowestIndex: 987.83,
    marketStatus: null,
    matchValue: 8757000000,
    matchVolume: 488910,
    openIndex: 988.81,
    percentIndexChange: 0.001963900671168116,
    referenceIndex: 987.83,
    status: 0,
    totalDealValue: 185660362800,
    totalDealVolume: 5890548,
    totalDownVolume: 0,
    totalMatchValue: 782042000000,
    totalMatchVolume: 36644442,
    totalNoChangeVolume: 0,
    totalStockDownPrice: 215,
    totalStockNoChangePrice: 64,
    totalStockOverCeiling: 4,
    totalStockUnderFloor: 104,
    totalStockUpPrice: 123,
    totalTrade: 19437,
    totalUpVolume: 0,
    totalValue: 782042000000,
    totalVolume: 36644442,
    tradingDate: "2019-10-10T10:06:50",
    typeIndex: 0
  }
}
exports.getProspect = function getProspect() {
   return {
    errors: null,
    items:[
      {
        ...fakeHelper.makeArrayData(10, "heatMap", getItemProspectHeatMap),
        ...fakeHelper.makeArrayData(10, "series", getItemProspectSeries),
      }
    ],
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 1
  }
}
function getItemIndexSeries() {
  return {
    closeIndex: 885.79,
    comGroupCode: "VN30",
    highestIndex: 886.83,
    indexChange: 0.18,
    indexValue: 885.79,
    lowestIndex: 885.27,
    matchValue: 72260000000,
    matchVolume: 2624930,
    openIndex: 886.83,
    percentIndexChange: 0.0002032497,
    referenceIndex: 885.61,
    totalMatchValue: 83426000000,
    totalMatchVolume: 2952610,
    tradingDate: "2019-09-10T09:30:37"
  }
}
exports.getIndexSeries = function getIndexSeries() {
  return fakeHelper.makeData(20, getItemIndexSeries);
}

function getItemValuationSeries() {
  return {
    code: "VNINDEX",
    r21: 16.7185017761,
    r25: 2.5738910205,
    r26: 3.8023544121,
    r27: 4.072201386,
    tradingDate: "2019-04-10T00:00:00",
    value: 981.91
  }
}
exports.getValuationSeries = function getValuationSeries() {
  return fakeHelper.makeData(10, getItemValuationSeries);
}

function getItemLiquiditySeries() {
  return {
    comGroupCode: "VNINDEX",
    totalMatchValue: 0,
    totalMatchVolume: 0,
    tradingDate: "2019-10-10T09:00:00"
  }
}
exports.getLiquiditySeries = function getLiquiditySeries() {
  return fakeHelper.makeData(10, getItemLiquiditySeries);
}

function getItemAnomaly() {
  return {
    apr: -0.005317899284174675,
    aug: -0.006066882409843956,
    code: "VNINDEX",
    dec: 0.002323259291323239,
    feb: 0.029436122022566357,
    fri: 0.0013055684,
    i: 0.08693546751773332,
    ii: 0.012852279681469719,
    iii: 0.03540312605010939,
    iv: 0.018199696275153034,
    jan: 0.034709327657799396,
    jul: 0.025456614845632924,
    jun: 0.018967515667784398,
    mar: 0.0019007770294066013,
    may: -0.004227273268842034,
    mon: -0.0003901187,
    nov: 0.018821017223274387,
    oct: -0.0007074934569730887,
    sep: 0.01619454665592055,
    thu: -0.00006804,
    tue: 0.0005694764,
    wed: 0.0013085501,
    year: 0
  }
}
function getItemMarketAnomaly() {
  return {
    ...fakeHelper.makeArrayData(10, "anomalyItems", getItemAnomaly),
    percentValueChange: 0.0024194446412844316,
    value: 990.22,
    valueChange: 2.39
  }
}
exports.getMarketAnomaly = function getMarketAnomaly() {
  return fakeHelper.makeData(10, getItemMarketAnomaly);
}
