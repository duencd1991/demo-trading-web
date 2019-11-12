'use strict';
var _ = require('lodash');
var namor = require('namor');
var moment = require('moment');
var fakeHelper = require('./FakeHelper');

function getItemIndex(idx) {
  var ticker = listTicker[idx];
  return {
    organCode: ticker,
    ticker: ticker, // Ticker
    priceInfo: {
      priceChange: _.random(1, 100, true), // Change
      percentPriceChange: _.random(0.001, 1, true),
      totalMatchVolume: _.random(1000, 10000, true), // Volume
      totalMatchValue: _.random(1000000, 100000000, true), // Value
      // Net Foreign = ForeignBuyVolumeMatched - ForeignSellVolumeMatched
      foreignBuyVolumeMatched: _.random(1000, 10000, true),
      foreignSellVolumeMatched: _.random(1000, 10000, true),
      closePrice: _.random(1000, 10000, true), // Trend
      ranking: _.random(1, 5, true),
      en_OrganShortName: namor.generate({words: 1, numbers: 2}), // Symbol Name
      comGroupCode: namor.generate({words: 1, numbers: 2}), // Exchange
      dealPrice: _.random(1000, 10000, true), // Put-through Price
      totalDealVolume: _.random(1000, 10000, true), // Put through vol
      totalDealValue: _.random(1000000, 100000000, true), // Put through price
      best1Bid: _.random(1, 5, true), // Ask Price
      best1Offer: _.random(1, 5, true), // Bid Price
      ceilingPrice: _.random(300, 700, true), // Ceiling price
      floorPrice: _.random(300, 700, true), // Floor price
      openPrice: _.random(1000, 10000, true), // Open price
      lowestPrice: _.random(100, 200, true),
      highestPrice: _.random(900, 1000, true),
      referencePrice: _.random(300, 700, true),
      matchPrice: _.random(300, 700, true),
      // lowestPrice: 3,
      // referencePrice: 7,
      // matchPrice: 7,
      // highestPrice: 6,

      averagePrice: _.random(1000, 10000, true), // Average price
      _52WRange: _.random(1, 10, true),
      totalVolume: _.random(1000, 10000, true),
      totalValue: _.random(1000000, 100000000, true),
      totalBuyTradeVolume: _.random(1000, 10000, true),
      totalSellTradeVolume: _.random(1000, 10000, true),
      foreignBuyVolumeTotal: _.random(1000, 10000, true),
      foreignBuyValueTotal: _.random(1000000, 1000000, true),
      foreignSellVolumeTotal: _.random(1000, 10000, true),
      foreignSellValueTotal: _.random(1000000, 100000000, true),
      foreignCurrentRoom: _.random(1, 5, true),
      foreignNetVolumeTotal: _.random(1000, 10000, true),
      foreignNetValueTotal: _.random(1000000, 100000000, true),
      freeFloatRate: _.random(1, 5, true),
      freeFloat: _.random(1, 5, true),
      rTD19: _.random(1, 5, true),
      averageMatchedVolume2Week: _.random(1000, 10000, true),
      averageMatchedVolume1Month: _.random(1000, 10000, true),
      averageMatchedVolume3Month: _.random(1000, 10000, true),
      priceChange1Week: _.random(1000, 10000, true),
      priceChange1Month: _.random(1000, 10000, true),
      priceChange3Month: _.random(1000, 10000, true),
      priceChange1Year: _.random(1000, 10000, true),
      averagePrice1Week: _.random(300, 700, true),
      averagePrice5SessionWeekly: _.random(300, 700, true),
      averagePrice5SessionMonthly: _.random(300, 700, true),
      averagePrice5SessionQuarterly: _.random(300, 700, true),
    },
    fundamental: {
      rtd11: _.random(2000000, 1000000000, true),
      isa3: _.random(1000000, 100000000, true),
      isa20: _.random(1000000, 100000000, true),
      isa5: _.random(1000000, 100000000, true),
      rtd21: _.random(-20, 100, true),
      rtd54: _.random(-20, 100, true),
      rtd14: _.random(-20, 100000, true),
      rtd53: _.random(-20, 100, true),
      rtd7: _.random(-20, 100000, true),
    },
    performance: {
      percentPriceChange1Day: _.random(-0.1, 0.1, true),
      percentPriceChange1Week: _.random(-0.1, 0.1, true),
      percentPriceChange1Month: _.random(-0.1, 0.1, true),
      percentPriceChange3Month: _.random(-0.1, 0.1, true),
      percentPriceChange6Month: _.random(-0.1, 0.1, true),
      percentPriceChange9Month: _.random(-0.1, 0.1, true),
      percentPriceChange1Year: _.random(-0.1, 0.1, true),
      percentPriceChangeYTD: _.random(-0.1, 0.1, true),
    }
  }
}

function getItemDerivative(idx) {
  var ticker = listDerivativeTicker[idx];
  return {
    derivativeCode: ticker, // Ticker
    lastTradingDate: moment().toString(), // Expiry date
    referencePrice: _.random(1000, 10000, true), // Ref
    matched: _.random(1000, 10000, true), // MatchPrice and CurrentPrice
    matchVolume: _.random(1000, 10000, true), // Volume
    best1Offer: _.random(1, 10, true), // Best ask
    best1Bid: _.random(1, 10, true), // Best bid
    totalSellTradeVolume: _.random(1000, 10000, true), // Unmatched sell
    totalBuyTradeVolume: _.random(1000, 10000, true), // Unmatched buy
    // basis = matched - indexValue
    openInterest: _.random(1, 10, true), // OI
    // dayRange: lowestPrice, highestPrice
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    openPrice: _.random(1000, 10000, true), // Open
    highestPrice: _.random(1000, 10000, true), // High
    lowestPrice: _.random(1000, 10000, true), // Low
    foreignBuyVolumeMatched: _.random(1000, 10000, true), // Foreign buy Vol.
    foreignSellVolumeMatched: _.random(1000, 10000, true), // Foreign sell Vol.
    indexValue: _.random(1000, 10000, true),
    matchPrice:  _.random(1000, 10000, true),
    currentPrice: _.random(1000, 10000, true),
    tradingDate: moment().toString(), // Expiry date
  }
}

function getItemPutThroughBid(idx) {
  var ticker = listTicker[idx];
  return {
    ticker: ticker,
    price: _.random(1000, 10000, true),
    volume: _.random(1000, 10000, true),
    time: moment().toString(),
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    referencePrice: _.ceil(_.random(300, 700, true), 2),
    matchPrice: _.ceil(_.random(300, 700, true), 2),
  };
}

function getItemPutThroughMatched(idx) {
  var ticker = listTicker[idx];
  return {
    ticker: ticker,
    organCode: ticker,
    dealPrice: _.random(1000, 10000, true),
    dealVolume: _.random(1000, 10000, true),
    totalDealVolume: _.random(1000000, 100000000, true),
    dealValue: _.random(1000000, 100000000, true),
    totalDealValue: _.random(1000000, 100000000, true),
    tradingDate: moment().toString(),
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    referencePrice: _.ceil(_.random(300, 700, true), 2),
    matchPrice: _.ceil(_.random(300, 700, true), 2),
    priceChange: _.ceil(_.random(0, 10, true), 2),
    percentPriceChange: _.ceil(_.random(0, 99, true), 2),
  };
}

function getItemPutThroughAsk(idx) {
  var ticker = listTicker[idx];
  return {
    ticker: ticker,
    price: _.random(1000, 10000, true),
    volume: _.random(1000, 10000, true),
    time: moment().toString(),
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    referencePrice: _.ceil(_.random(300, 700, true), 2),
    matchPrice: _.ceil(_.random(300, 700, true), 2),
  };
}

function getItemWatchList() {
  return {
    key: namor.generate({words: 1, numbers: 2}),
    name: namor.generate({words: 1, numbers: 2}),
  };
}

exports.getListSummary = function getListSummary() {
  return fakeHelper.makeData(30, getItemIndex);
  //return fakeHelper.makeData(30, getSummaryItem);
}

exports.getListDerivative = function getListDerivative() {
  return fakeHelper.makeData(10, getItemDerivative)
}

exports.getListPutThrough = function getListPutThrough() {
  return {
    bid: fakeHelper.makeData(10, getItemPutThroughBid),
    matched: fakeHelper.makeData(10, getItemPutThroughMatched),
    ask: fakeHelper.makeData(10, getItemPutThroughAsk),
  }
}

exports.getMyWatList = function getMyWatList() {
  return fakeHelper.makeData(10, getItemWatchList)
}

exports.getPutThrough = function getPutThrough() {
  return {
    items:[
    {
      ...fakeHelper.makeArrayData(11, "hose", getItemPutThroughMatched),
      ...fakeHelper.makeArrayData(7, "hnx", getItemPutThroughMatched),
      ...fakeHelper.makeArrayData(10, "upcom", getItemPutThroughMatched),      
    }
    ]

  }
}

exports.getDerivatives = function getDerivatives() {
  return fakeHelper.makeData(listDerivativeTicker.length, getItemDerivative)
}


const listTicker = [
  'CII',
  'CTD',
  'CTG',
  'DHG',
  'DPM',
  'EIB',
  'FPT',
  'GAS',
  'GMD',
  'HDB',
  'HPG',
  'MBB',
  'MSN',
  'MWG',
  'NVL',
  'PNJ',
  'REE',
  'ROS',
  'SAB',
  'SBT',
  'SSI',
  'STB',
  'TCB',
  'VCB',
  'VHM',
  'VIC',
  'VJC',
  'VNM',
  'VPB',
  'VRE'
]

const listDerivativeTicker = [
  'VN30F1M',
  'VN30F2M',
  'VN30F2Q',
  'GB05F1909',
  'GB05F1912',
  'GB05F2003'
]

exports.getTwoDaysSeries = function getTwoDaysSeries(ticker){


  let {dataYesterday: previousDate, dataToday: toDate} = getTwoDaysSeriesDetail();

  return {
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: [{
      previousDate,
      toDate
    }]
  };
}

function getTwoDaysSeriesAllTicker(){
  let arrReturn = [];

  listTicker.forEach(item => {
    let {dataYesterday: previousDate, dataToday: toDate} = getTwoDaysSeriesDetail();

    previousDate.forEach(data => {
      data.ticker = item;
      data.organCode = item;
    });

    toDate.forEach(data => {
      data.ticker = item;
      data.organCode = item;
    });

    arrReturn.push({
      ticker: item,
      previousDate,
      toDate
    });
  });

  return arrReturn;
}

function getTwoDaysSeriesDetail(){

  //const ARRAY_LENGTH = 240;
  const ARRAY_LENGTH = 60;

  var fakeData = function() {
    let count = 0;
    let extra = 0;
    let currentValue;
    let isMinus = false;
    let dataYesterday = [];
    let dataToday = [];
    var func = () => {
      if (extra === 0) {
        currentValue = _.random(-50, 50, true);
        extra++;
        return currentValue;
      }
      extra++;
      if (extra > _.random(10, 50) || _.random(0, 1)) {
        extra = 1;
        isMinus = !isMinus;
      }
      if (isMinus) {
        currentValue -= _.random(5, 10);
      }
      else {
        currentValue += _.random(5, 12);
      }
      return currentValue;
    };
    let addDays = function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    let date = new Date("2018-01-01");
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      let dateTmp = addDays(date, i);
      dataYesterday.push({
        date: dateTmp,
        matchPrice: _.round((func)(), 2)
      });
    }
    let sizeToday = ARRAY_LENGTH + _.random( 50, ARRAY_LENGTH);
    // let sizeToday = ARRAY_LENGTH + _.random(150, 150);
    for (let i = ARRAY_LENGTH; i < sizeToday; i++) {
      let dateTmp = addDays(date, i);
      dataToday.push({
        date: dateTmp,
        matchPrice: _.round((func)(), 2)
      });
    }
    return { dataYesterday, dataToday };
  }

  return fakeData();
}
exports.getItemRealtimeTick = function getItemRealtimeTick() {
  return {
    averagePrice: _.random(1000, 10000, true),
    ceilingPrice: _.random(1000, 10000, true),
    closePrice: _.random(1000, 10000, true),
    dealPrice: _.random(1000, 10000, true),
    dealValue: _.random(1000000, 100000000, true),
    dealVolume: _.random(1000, 10000, true),
    floorPrice: _.random(1000, 10000, true),
    foreignBuyValueDeal: _.random(1000000, 100000000, true),
    foreignBuyValueMatched: _.random(1000000, 100000000, true),
    foreignBuyValueTotal: _.random(1000000, 100000000, true),
    foreignBuyVolumeDeal: _.random(1000, 10000, true),
    foreignBuyVolumeMatched: _.random(1000, 10000, true),
    foreignBuyVolumeTotal: _.random(1000, 10000, true),
    foreignCurrentRoom: _.random(1000, 10000, true),
    foreignSellValueDeal: _.random(1000000, 100000000, true),
    foreignSellValueMatched: _.random(1000, 10000, true),
    foreignSellValueTotal: _.random(1000000, 100000000, true),
    foreignSellVolumeDeal: _.random(1000, 10000, true),
    foreignSellVolumeMatched: _.random(1000, 10000, true),
    foreignSellVolumeTotal: _.random(1000, 10000, true),
    foreignTotalRoom: _.random(1000, 10000, true),
    highestPrice: _.random(1000, 10000, true),
    lowestPrice: _.random(1000, 10000, true),
    matchPrice: _.random(1000, 10000, true),
    matchValue: _.random(1000, 10000, true),
    matchVolume: _.random(1000, 10000, true),
    openPrice: _.random(1000, 10000, true),
    organCode: 'CII',
    percentPriceChange: _.random(-0.1, 1, true),
    priceChange: _.random(1000, 10000, true),
    referenceDate: '',
    referencePrice: _.random(1000, 10000, true),
    stockId: 0,
    ticker: 'CII',
    totalDealValue: _.random(1000000, 100000000, true),
    totalDealVolume: _.random(1000, 10000, true),
    totalMatchValue: _.random(1000000, 100000000, true),
    totalMatchVolume: _.random(1000, 10000, true),
    totalValue: _.random(1000000, 100000000, true),
    totalVolume: _.random(1000, 10000, true),
    tradingDate: moment().toString(),
  };
}
function getListRealtimeTick() {
  return fakeHelper.makeRealtime(1, getItemRealtimeTick);
}

function getItemNews() {
  return {
    newsId: 3836180,
    organCode: "TNC1",
    ticker: "BAX",
    newsTitle: "BAX: Vượt đường ngắn hạn MA20"
  }
}
exports.getWatchListNews = function getWatchListNews() {
  return {
    ...fakeHelper.makeData(10, getItemNews),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 0
  }
}

function getItemTechnical() {
  return  {
    daily: {
      ma5: 9080,
      rsi: 100,
      rsiPrev: 100,
      cmf: -0.13575402703416187,
      roc: 0,
      rockPrev: 0.01098901098901099
    },
    hourly: {
      ma5: 9120,
      rsi: 50,
      rsiPrev: 50, 
      cmf: -0.17421098280397682, 
      roc: -0.01098901098901099, 
      rockPrev: 0
    },
    matchPrice: 9000,
    organCode: "AAV",
    quarterly: {
      cmf: 0.7741935483870968, 
      ma5: 9040, 
      roc: -0.021739130434782608,
      rockPrev: -0.021739130434782608,
      rsi: 0, 
      rsiPrev: 0
    },
    weekly: {
      cmf: 1.7338557907498382, 
      ma5: 9300,
      roc: -0.010869565217391304,
      rockPrev: 0, 
      rsi: 100, 
      rsiPrev: 100
    }
  }
}
exports.getTechnical = function getTechnical() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemTechnical),
    packageId: "cf037cde-ebc7-4fec-b2f6-29c1374bee74",
    page: 0,
    pageSize: 0,
    status: "Apart",
    totalCount: 0
  }
}

function getItemTickerSeries() {
  return {
    ceilingPrice: _.random(1000, 10000, true),
    closePrice: _.random(1000, 10000, true),
    floorPrice: _.random(1000, 10000, true),
    foreignBuyValueDeal: _.random(1000000, 100000000, true),
    foreignBuyValueMatched: _.random(1000000, 100000000, true),
    foreignBuyVolumeDeal: _.random(1000000, 100000000, true),
    foreignBuyVolumeMatched: _.random(1000000, 100000000, true),
    foreignSellValueDeal: _.random(1000000, 100000000, true),
    foreignSellValueMatched: _.random(1000000, 100000000, true),
    foreignSellVolumeDeal: _.random(1000000, 100000000, true),
    foreignSellVolumeMatched: _.random(1000000, 100000000, true),
    highestPrice: _.random(1000, 10000, true),
    lowestPrice: _.random(1000, 10000, true),
    matchPrice: _.random(1000, 10000, true),
    matchValue: _.random(100000, 1000000, true),
    matchVolume: _.random(100000, 1000000, true),
    openPrice: _.random(1000, 10000, true),
    organCode: "AAA",
    percentPriceChange: _.random(1000, 10000, true),
    priceChange: _.random(1000, 10000, true),
    referencePrice: _.random(1000, 10000, true),
    ticker: "AAA",
    totalMatchValue: _.random(100000, 10000000, true),
    totalMatchVolume: _.random(100000, 10000000, true),
    tradingDate: moment().toString()
  }
}
exports.GetTickerSeries = function getTechnical() {
  return {
    errors: null,
    ...fakeHelper.makeData(100, getItemTickerSeries),
    packageId: "cf037cde-ebc7-4fec-b2f6-29c1374bee74",
    page: 0,
    pageSize: 0,
    status: "Apart",
    totalCount: 0
  }
}
