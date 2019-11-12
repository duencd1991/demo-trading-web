'use strict';
var _ = require('lodash');
var namor = require('namor');
var moment = require('moment');
var fakeHelper = require('./FakeHelper');


exports.GetPriceData = function GetPriceData(language, code, Frequently, Page, PageSize){
  let priceDataList = fakeHelper.makeData(PageSize, getPriceDataList);

  return {
    dataTableId: code,
    page: Page,
    pageSize: PageSize,
    totalCount: (Page + 2)*PageSize,
    ...priceDataList
  };
}

exports.GetLatestPrice = function GetLatestPrice(language, code){
  console.log('Fake - GetLatestPrice');
  return fakeHelper.makeData(1, getPriceInfo);
}

exports.GetPriceDepth = function GetPriceDepth(language, code){
  console.log('Fake - GetPriceDepth');
  return fakeHelper.makeData(1, getPriceDepth);
}


/*

 */
function getPriceDataList(idx) {
  //var ticker = listDerivativeTicker[idx];
  //console.log('PriceDataFake - GetPriceData - getPriceDataList ' + idx);
  return {
    tradingDate: moment().toString(), 
    ClosePriceAdjusted: _.random(1000, 10000, true),
    matchValue: _.random(1000, 100000, true), 
    valueChange: _.random(1000, 10000, true),
    percentValueChange: _.random(1000, 10000, true), 
    openValue:  _.random(1000, 100000, true),
    highestValue:  _.random(1000, 100000, true),
    lowestValue:  _.random(1000, 100000, true), 
    averageValue:  _.random(1000, 100000, true), 
    totalMatchVolume:  _.random(1000, 100000, true), 
    totalMatchValue:  _.random(1000, 100000, true), 
    totalDealVolume:  _.random(1000, 100000, true),
    totalDealValue:  _.random(1000, 100000, true),   
    totalVolume:  _.random(1000, 100000, true),
    totalValue:  _.random(1000, 100000, true),
    foreignBuyVolumeMatched: _.random(1000, 100000, true),
    foreignBuyValueMatched: _.random(1000, 100000, true),
    foreignSellVolumeMatched: _.random(1000, 100000, true),
    foreignSellValueMatched: _.random(1000, 100000, true),
    totalBuyTrade: _.random(0, 10, true),
    totalBuyTradeVolume: _.random(0, 10, true),
    buyOrderAvgVol: _.random(0, 10, true),
    totalSellTrade: _.random(0, 10, true),
    totalSellTradeVolume: _.random(0, 10, true),
    sellOrderAvgVol: _.random(0, 10, true),
    netVolOrderStatistic: _.random(0, 10, true),
  }
}

function getPriceInfo(idx) {
  return {
    organCode: 'SSI',
    ticker: 'SSI', // Ticker
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
      averagePrice5SessionQuarterly: _.random(300, 700, true)
    }
  }
}


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
