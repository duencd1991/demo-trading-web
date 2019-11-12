'use strict';
var _ = require('lodash');
var namor = require('namor');
var moment = require('moment');
var fakeHelper = require('./FakeHelper');



exports.GetPriceDepth = function GetPriceDepth(language, code){
  console.log('Fake - GetPriceDepth');
  return fakeHelper.makeData(1, getPriceDepth);
}

exports.GetTimeAndScale = function GetTimeAndScale(language, code){
  console.log('Fake - GetTimeAndScale');
  var tas = fakeHelper.makeData(1, getTimeAndScale);
  return {
    ...tas
  }
}


/*

 */
function getPriceDepth(idx) {
  return {
    organCode: 'SSI',
    ticker: 'SSI', // Ticker
    price: {
      matchPrice: _.random(10, 100, true),
      priceChange: _.random(10, 100, true),
      percentPriceChange: _.random(1, 10, true),
      openPrice: _.random(10, 100, true),
      highestPrice: _.random(10, 100, true),
      lowestPrice: _.random(10, 100, true),
      referencePrice: _.random(10, 100, true),
      foreignBuyVolumeTotal: _.random(100, 10000, true),
      foreignSellVolumeTotal: _.random(100, 10000, true),
      totalMatchVolume: _.random(100, 10000, true),
      averagePrice: _.random(10, 100, true),
      totalMatchValue: _.random(100, 10000, true),
      totalMatchVolume: _.random(100, 10000, true)
    },
    bidAsk:{
      best1Bid: _.random(10, 100, true),
      best1BidVolume: _.random(100, 10000, true),
      best2Bid: _.random(10, 100, true),
      best2BidVolume:  _.random(100, 10000, true),
      best3Bid: _.random(10, 100, true),
      best3BidVolume:  _.random(100, 10000, true),
      best4Bid: _.random(10, 100, true),
      best4BidVolume:  _.random(100, 10000, true),
      best5Bid: _.random(10, 100, true),
      best5BidVolume:  _.random(100, 10000, true),
      best6Bid: _.random(10, 100, true),
      best6BidVolume:  _.random(100, 10000, true),
      best7Bid: _.random(10, 100, true),
      best7BidVolume:  _.random(100, 10000, true),
      best8Bid: _.random(10, 100, true),
      best8BidVolume:  _.random(100, 10000, true),
      best9Bid: _.random(10, 100, true),
      best9BidVolume:  _.random(100, 10000, true),
      best10Bid: _.random(10, 100, true),
      best10BidVolume:   _.random(100, 10000, true),             
      best1Offer: _.random(10, 100, true),
      best1OfferVolume:  _.random(100, 10000, true),
      best2Offer: _.random(10, 100, true),
      best2OfferVolume:  _.random(100, 10000, true),
      best3Offer: _.random(10, 100, true),
      best3OfferVolume:  _.random(100, 10000, true),
      best4Offer: _.random(10, 100, true),
      best4OfferVolume:  _.random(100, 10000, true),
      best5Offer: _.random(10, 100, true),
      best5OfferVolume:  _.random(100, 10000, true),
      best6Offer: _.random(10, 100, true),
      best6OfferVolume:  _.random(100, 10000, true),
      best7Offer: _.random(10, 100, true),
      best7OfferVolume:  _.random(100, 10000, true),
      best8Offer: _.random(10, 100, true),
      best8OfferVolume:  _.random(100, 10000, true),
      best9Offer: _.random(10, 100, true),
      best9OfferVolume:  _.random(100, 10000, true),
      best10Offer: _.random(10, 100, true),
      best10OfferVolume:  _.random(100, 10000, true)      
    },
    extraInfo: {
      averageVolume1Month: _.random(1000, 10000, true),
      averageVolume2Week: _.random(1000, 10000, true),
      foreignerPercentage: _.random(10, 100, true),
      rtd21:_.random(10, 100, true),
      rtq12:_.random(10, 100, true),
      rtd25:_.random(10, 100, true),
      rtd14:_.random(10, 100, true),
      rtd35:_.random(10, 100, true),
      rtd11:_.random(10, 100, true)      
    }
  }
}

function getTimeAndScale(idx) {
  return {
    organCode: "SSI",
    ticker: "SSI",
    ...fakeHelper.makeArrayData(_.random(10, 100, true), "matches", getMatches),
    ...fakeHelper.makeArrayData(_.random(10, 100, true), "timeAndSales", getTaS),
  }
}

function getMatches(idx) {
  // BU: Buy Up
  // SD: Sell Down
  var matchType = _.random(0, 1, true) === 0 ? "BU" : "SD";
  return {
      tradingDate: moment().toString(),
      matchType: matchType,
      matchPrice: _.random(10, 100, true),
      priceChange: _.random(10, 100, true),
      percentPriceChange: _.random(10, 100, true),
      matchVolume: _.ceil(_.random(100, 10000, true), 0),
      totalMatchVolume: _.ceil(_.random(10000, 1000000, true), 0),
      ceilingPrice: _.random(10, 100, true),
      floorPrice: _.random(10, 100, true)
  }
}

function getTaS(idx) {
  //timeAndSales
  return {
    buyUpVolume:  _.ceil(_.random(100, 10000, true), 0),
    sellDownVolume:  _.ceil(_.random(100, 10000, true), 0),
    naVolume:  _.ceil(_.random(100, 10000, true), 0),
    price: _.random(10, 50, true)
  }  
}


