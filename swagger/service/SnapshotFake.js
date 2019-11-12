'use strict';
var _ = require('lodash');
//var namor = require('namor');
//var moment = require('moment');
var fakeHelper = require('./FakeHelper');



exports.GetCompanyScore = function(language, organCode) {
  return {
    ticker:organCode,
    organCode:organCode,
    items: getCompanyScore(language, organCode)
  }
}
exports.GetSnapshot = function(language, organCode) {
  return fakeHelper.makeData(10, getSnapshot);
}

/* */
function getCompanyScore(language, organCode) {
  return  _.range(1).map((index) => {
    //var item = listSymbols[index];
    return {
        value:_.ceil(_.random(1000, 500000, true), 0),
        vgm:_.ceil(_.random(1000, 500000, true), 0),
        growth:_.ceil(_.random(1000, 500000, true), 0),
        momentum:_.ceil(_.random(0, 99, true), 0),
        icbRank:_.ceil(_.random(1, 5, true), 0),
        icbTotalRanked:_.ceil(_.random(1, 5, true), 0),
        indexRank:_.ceil(_.random(1, 5, true), 0),
        indexTotalRanked:_.ceil(_.random(1, 5, true), 0),
        comGroupCode:"HOSE"
    }
  });
}
function getSnapshot(language, organCode) {
  return {
    quarterly: [
      {
        year: 2015,
        quarter: 1,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2016,
        quarter: 1,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2017,
        quarter: 1,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2018,
        quarter: 1,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2019,
        quarter: 1,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      }
    ],
    yearly: [
      {
        year: 2015,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2016,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2017,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2018,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      },
      {
        year: 2019,
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        bsa104: _.ceil(_.random(1000, 500000, true), 0),
        bsb98: _.ceil(_.random(1000, 500000, true), 0),
        bsb113: _.ceil(_.random(1000, 500000, true), 0),
        isa1: _.ceil(_.random(1000, 500000, true), 0),
        cfa18: _.ceil(_.random(1000, 500000, true), 0),
        isa22: _.ceil(_.random(1000, 500000, true), 0),
        cfa26: _.ceil(_.random(1000, 500000, true), 0),
        cfa34: _.ceil(_.random(1000, 500000, true), 0),
        bsa1: _.ceil(_.random(1000, 500000, true), 0),
        bsa23: _.ceil(_.random(1000, 500000, true), 0),
        bsa54: _.ceil(_.random(1000, 500000, true), 0),
        bsa78: _.ceil(_.random(1000, 500000, true), 0),
        isa27: _.ceil(_.random(1000, 500000, true), 0),
        bsa53: _.ceil(_.random(1000, 500000, true), 0),
        nob44: _.ceil(_.random(1000, 500000, true), 0),
        rtq25: _.ceil(_.random(1000, 500000, true), 0),
        rtq1: _.ceil(_.random(1000, 500000, true), 0),
        rtq2: _.ceil(_.random(1000, 500000, true), 0),
        rtqt3: _.ceil(_.random(1000, 500000, true), 0),
        bsa80: _.ceil(_.random(1000, 500000, true), 0),
        rtq44: _.ceil(_.random(1000, 500000, true), 0),
        rtq137: _.ceil(_.random(1000, 500000, true), 0)
      }
    ],
    summary: {
      averageMatchVolume1Month: 1732825,
      ceo: "Nguyễn Lê Trung",
      competitors: " DGC, DHB",
      foreignerPercentage: 0.0236,
      freeFloat: 94159987,
      highestPrice1Year: 18940,
      lowestPrice1Year: 13113,
      majorHoldings: 0.4662,
      organCode: null,
      outstandingShare: 171199976,
      rtd11: 2627919631600,
      rtd14: 2582.8460466133,
      rtd21: 5.9430565055,
      rtd25: 0.9069550226,
      rtd53: 2978.9723802298,
      rtq10: 1.5917858375,
      rtq12: 0.143675756,
      rtq14: 0.0576333264,
      rtq29: 0.049325181,
      statePercentage: 0,
      valuePerShare: 500
    }
  }
}

function getItemOwnership() {
  return {
    boardOfDirectors: [
      {
        fullName: "Phạm Ánh Dương",
        isRelationship: false,
        percentage: 0,
        personId: 9359,
        positionName: "Chủ tịch Hội đồng Quản trị, Phụ trách Công bố thông tin",
        publicDate: "2018-12-31T16:57:48",
        quantity: 0
      },
      {
        fullName: "Phạm Hoàng Việt",
        isRelationship: false,
        percentage: 0,
        personId: 9360,
        positionName: "Thành viên Hội đồng Quản trị",
        publicDate: "2018-12-31T09:37:29.07",
        quantity: 0
      },
      {
        fullName: "Nguyễn Lê Trung",
        isRelationship: false,
        percentage: 0,
        personId: 9361,
        positionName: "Thành viên Hội đồng Quản trị, Tổng Giám đốc",
        publicDate: "2018-12-31T16:55:53",
        quantity: 0
      },
      {
        fullName: "Hòa Thị Thu Hà",
        isRelationship: false,
        percentage: 0,
        personId: 9363,
        positionName: "Thành viên Hội đồng Quản trị, Phó Tổng Giám đốc Tài chính - Kế toán",
        publicDate: "2018-12-31T00:00:00",
        quantity: 0
      }
    ],
    majorOwnershipsChartData: [
      {
        item1: "Công ty Cổ phần An Phát Holdings",
        item2: 0.4662
      },
      {
        item1: "PYN Elite Fund (Non-UCITS)",
        item2: 0.0498
      },
      {
        item1: "Công ty TNHH Đầu tư Trung và Hòa",
        item2: 0.0494
      },
      {
        item1: "Công ty TNHH Đầu tư Việt và Dương",
        item2: 0.0494
      },
      {
        item1: "Khác",
        item2: 0.1647695375
      }
    ],
    majorShareHolders: [
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.4662,
        percentageAdjusted: 0,
        publicDate: "2018-12-31T15:14:36",
        quantity: 79817140,
        quantityAdjusted: 0,
        shareHolderCode: "APHOLD",
        shareHolderName: "Công ty Cổ phần An Phát Holdings",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0498,
        percentageAdjusted: 0,
        publicDate: "2018-11-12T14:42:05.34",
        quantity: 8520260,
        quantityAdjusted: 0,
        shareHolderCode: "PYNFUND",
        shareHolderName: "PYN Elite Fund (Non-UCITS)",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0494,
        percentageAdjusted: 0,
        publicDate: "2017-06-06T13:13:52.39",
        quantity: 2900000,
        quantityAdjusted: 0,
        shareHolderCode: "TRUNGHOA",
        shareHolderName: "Công ty TNHH Đầu tư Trung và Hòa",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0494,
        percentageAdjusted: 0,
        publicDate: "2017-06-06T13:22:39.47",
        quantity: 2900000,
        quantityAdjusted: 0,
        shareHolderCode: "VIETDUONG",
        shareHolderName: "Công ty TNHH Đầu tư Việt và Dương",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0494,
        percentageAdjusted: 0,
        publicDate: "2017-06-06T13:19:40.933",
        quantity: 2900000,
        quantityAdjusted: 0,
        shareHolderCode: "DPINVES",
        shareHolderName: "Công ty TNHH Dương Phạm Investment",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0487,
        percentageAdjusted: 0,
        publicDate: "2019-04-12T17:50:11.91",
        quantity: 8332334,
        quantityAdjusted: 0,
        shareHolderCode: "KALLANG",
        shareHolderName: "Kallang Limited",
        shareHolderType: "Individual"
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0398,
        percentageAdjusted: 0,
        publicDate: "2017-03-06T16:43:10.817",
        quantity: 2267910,
        quantityAdjusted: 0,
        shareHolderCode: "30001",
        shareHolderName: "Nguyễn Xuân Hà",
        shareHolderType: 2
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0247474747,
        percentageAdjusted: 0,
        publicDate: "2014-03-27T13:50:00",
        quantity: 980000,
        quantityAdjusted: 0,
        shareHolderCode: "30000",
        shareHolderName: "Nguyễn Minh Hoa",
        shareHolderType: 2
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0011682245,
        percentageAdjusted: 0,
        publicDate: "2018-12-31T00:00:00",
        quantity: 200000,
        quantityAdjusted: 0,
        shareHolderCode: "405266",
        shareHolderName: "Nguyễn Thị Thùy Vân",
        shareHolderType: 2
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0007575757,
        percentageAdjusted: 0,
        publicDate: "2010-05-25T00:00:00",
        quantity: 30000,
        quantityAdjusted: 0,
        shareHolderCode: "9362",
        shareHolderName: "Nguyễn Đức Dũng",
        shareHolderType: 2
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.0001262626,
        percentageAdjusted: 0,
        publicDate: "2010-05-25T00:00:00",
        quantity: 5000,
        quantityAdjusted: 0,
        shareHolderCode: "9365",
        shareHolderName: "Đỗ Thị Thoan",
        shareHolderType: 2
      },
      {
        isFounder: false,
        ownerTypeCode: null,
        percentage: 0.00007,
        percentageAdjusted: 0,
        publicDate: "2017-10-30T14:32:51.937",
        quantity: 4000,
        quantityAdjusted: 0,
        shareHolderCode: "113453",
        shareHolderName: "Nguyễn Đức Duy",
        shareHolderType: 2
      }
    ],
    overviewChartData: [
      {
        item1: "Sở hữu nhà nước",
        item2: 0
      },
      {
        item1: "Sở hữu nước ngoài",
        item2: 0.0216
      },
      {
        item1: "Khác",
        item2: 0.9784
      }
    ]
  }
}
exports.GetOwnership = function(language, organCode) {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemOwnership),
    packageId: null,
    page: 0,
    pageSize: 0,
    status: "Success",
    totalCount: 0
  }
}

function getItemShareHolderTooltip() {
  return {
    organCode: "AAA",
    percentage: 0.4662,
    percentageAdjusted: 0,
    publicDate: "2018-12-31T15:14:36",
    quantity: 79817140,
    quantityAdjusted: 0
  }
}
exports.GetShareHolderTooltip = function(language, organCode) {
  return {
    errors: null,
    ...fakeHelper.makeData(5, getItemShareHolderTooltip),
    packageId: null,
    page: 0,
    pageSize: 0,
    status: "Success",
    totalCount: 0
  }
}

