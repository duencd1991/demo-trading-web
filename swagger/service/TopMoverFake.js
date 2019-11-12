'use strict';
var _ = require('lodash');
var namor = require('namor');
var moment = require('moment');
var fakeHelper = require('./FakeHelper');

exports.GetTopVolume = function GetTopVolume(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopVolume);
}

exports.GetTopBreakout = function TopBreakout(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopBreakout);
}

exports.GetTopValue = function TopValue(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopValue);
}

exports.GetTopGainers = function TopGainers(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopGainers);
}

exports.GetTopLosers = function GetTopLosers(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopLosers);
}

exports.GetMarketCalendar = function MarketCalendar(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getMarketCalendar);
}

exports.GetMoneyFlow = function MoneyFlow(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getMoneyFlow);
}

exports.GetTopNewHigh = function TopNewHigh(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopNewHigh);
}

exports.GetTopNewLow = function TopNewLow(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopNewLow);
}

exports.GetTopForeignTrading = function TopForeignTrade(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getTopForeignTrading);
}

exports.GetHeatMap = function HeatMap(language, comGroupCode){
  var listSymbols = fakeHelper.listSymbols();
  return fakeHelper.makeData(_.random(2, listSymbols.listUnderlyingTickers.length, true), getHeatMap);
}

/*

 */
function getTopVolume(idx) {
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true),
        volume: _.ceil(_.random(10000, 1000000, true), 0),
        price: _.ceil(_.random(1000, 500000, true), 2),
        priceChange:_.ceil(_.random(10, 99000, true), 2),
        ceilingPrice:  _.ceil(_.random(1000, 500000, true), 2),
        floorPrice:  _.ceil(_.random(1000, 500000, true), 2),
        referencePrice: _.ceil(_.random(1000, 500000, true), 2),
        o: _.ceil(_.random(1000, 500000, true), 2),
        performance: {
            percentPriceChange1Day:  _.ceil(_.random(1, 100, true), 2),
            percentPriceChange1Week: _.ceil(_.random(1, 100, true), 2),
            percentPriceChange1Month: _.ceil(_.random(1, 100, true), 2),
            percentPriceChange3Month: _.ceil(_.random(1, 100, true), 2),
            percentPriceChange6Month: _.ceil(_.random(1, 100, true), 2),
            percentPriceChange1Year: _.ceil(_.random(1, 100, true), 2),
            percentPriceChangeYTD: _.ceil(_.random(1, 100, true), 2)
        },
        financial: {
            isa3:  _.ceil(_.random(1, 100, true), 2),     
            rtd7:  _.ceil(_.random(1, 100, true), 2),
            rtd11: _.ceil(_.random(1, 100, true), 2),
            isa20: _.ceil(_.random(1, 100, true), 2),
            rtd21: _.ceil(_.random(1, 100, true), 2),
            rtd25: _.ceil(_.random(1, 100, true), 2)
            
        },
        technical: {
            o1: _.ceil(_.random(1, 100, true), 2),
            o2: _.ceil(_.random(1, 100, true), 2),
            h1: _.ceil(_.random(1, 100, true), 2),
            h2: _.ceil(_.random(1, 100, true), 2),
            l1: _.ceil(_.random(1, 100, true), 2),
            l2: _.ceil(_.random(1, 100, true), 2),
            c1: _.ceil(_.random(1, 100, true), 2),
            c2: _.ceil(_.random(1, 100, true), 2),
            sma20: _.ceil(_.random(1, 100, true), 2),
            sma50: _.ceil(_.random(1, 100, true), 2),
            sma100: _.ceil(_.random(1, 100, true), 2),
            sma20Past4: _.ceil(_.random(1, 100, true), 2),
            rsi: _.ceil(_.random(1, 100, true), 2)
        }
  }
}


function getTopBreakout(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopValue(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopGainers(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopLossers(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getMarketCalendar(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getMoneyFlow(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopLosers(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopNewHigh(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopNewLow(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getTopForeignTrading(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}

function getHeatMap(idx) {
  /*
  var listSymbols = fakeHelper.listSymbols();
  var item = listSymbols.listUnderlyingTickers[idx];
  return {
        ticker: item.ticker,
        organCode: item.ticker,
        sectorName: item.sectorCode,
        tradingDate:moment().toString(),
        rank: _.random(2, 5, true)
  }*/
  return getTopVolume(idx);
}