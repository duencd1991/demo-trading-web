import _ from 'lodash';
import namor from 'namor';
import moment from 'moment';
import { makeData, makeRealtime } from '../../../helpers/Fake';

export {
  getListSummary,
  getListDerivative,
  getListPutThrough,
  getMyWatList,
  getTwoDaysSeries,
  getListRealtimeTick,
}

function getItemIndex() {
  return {
    priceInfo: {
      ticker: namor.generate({words: 1, numbers: 0}), // Ticker
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
      ticker: namor.generate({ words: 1, numbers: 2 }),
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
      ticker: namor.generate({words: 1, numbers: 2}),
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

function getItemDerivative() {
  return {
    derivativeCode: namor.generate({words: 1, numbers: 0}), // Ticker
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
  }
}

function getItemPutThroughBid() {
  return {
    ticker: namor.generate({words: 1, numbers: 0}),
    price: _.random(1000, 10000, true),
    volume: _.random(1000, 10000, true),
    time: moment().toString(),
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    referencePrice: _.ceil(_.random(300, 700, true), 2),
    matchPrice: _.ceil(_.random(300, 700, true), 2),
  };
}

function getItemPutThroughMatched() {
  return {
    ticker: namor.generate({words: 1, numbers: 0}),
    price: _.random(1000, 10000, true),
    volume: _.random(1000, 10000, true),
    value: _.random(1000000, 100000000, true),
    accumulatedValue: _.random(1000000, 100000000, true),
    time: moment().toString(),
    ceilingPrice: _.random(1000, 10000, true), // Ceil
    floorPrice: _.random(1000, 10000, true), // Floor
    referencePrice: _.ceil(_.random(300, 700, true), 2),
    matchPrice: _.ceil(_.random(300, 700, true), 2),
  };
}

function getItemPutThroughAsk() {
  return {
    ticker: namor.generate({words: 1, numbers: 0}),
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

function getListSummary() {
  return makeData(30, getItemIndex);
}

function getListDerivative() {
  return makeData(10, getItemDerivative)
}

function getListPutThrough() {
  return {
    bid: makeData(10, getItemPutThroughBid),
    matched: makeData(10, getItemPutThroughMatched),
    ask: makeData(10, getItemPutThroughAsk),
  }
}

function getMyWatList() {
  return makeData(10, getItemWatchList)
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

function getTwoDaysSeries(ticker){


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

  const ARRAY_LENGTH = 240;

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

function getItemRealtimeTick() {
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
  return makeRealtime(1, getItemRealtimeTick);
}
