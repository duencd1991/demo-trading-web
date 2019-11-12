'use strict';
var fakeHelper = require('./FakeHelper');

function getItemCheckup() {
  return {
    checkupItem: {
      checkupInfors: [
        {
          rateComment: "Doanh nghiệp tăng vốn nhanh với mức tăng 2.7 lần trong vòng 3 năm",
          rateIndicatorId: 5,
          rateIndicatorName: "FA_Phát hành tăng vốn",
          rateResult: "Alert",
          rateValue: null
        }
      ],
      lengthReport: 2,
      marketCap: 2533759644800,
      organCode: "AAA",
      organShortName: "An Phat Bioplastics",
      ticker: "AAA",
      yearReport: 2019
    },
    comparingCheckupItems: [
      {
        checkupInfors: [
          {
            rateComment: "Không có dấu hiệu bất thường",
            rateIndicatorId: 5,
            rateIndicatorName: "FA_Phát hành tăng vốn",
            rateResult: "Neutral",
            rateValue: null
          }
        ],
        lengthReport: 2,
        marketCap: 54636000000000,
        organCode: "VNRG",
        organShortName: "Tập đoàn CN Cao su VN",
        ticker: "GVR",
        yearReport: 2019
      }
    ],
    organCode: "AAA"
  }
}
exports.GetCheckup = function GetCheckup() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemCheckup),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}

function getItemFinancialRatio() {
  return {
    comTypeCode: "CT",
    icbCode: "1350",
    isBank: false,
    organCode: "AAA",
    ratios: [
      {
        bsa53: null,
        bsb103: null,
        lengthReport: 2,
        lengthReportCal: 2,
        rtd3: 171199976,
        rtd7: 16924.7643138571,
        rtd11: 2533759644800,
        rtd14: 2582.8460466133,
        rtd20: 0.0337837838,
        rtd21: 5.7301131128,
        rtd25: 0.8744582628,
        rtd26: 0.2684692074,
        rtd28: 25.9146300879,
        rtd30: 7.3363800054,
        rtd51: 0.1935849025,
        rtq1: 0.0785509905,
        rtq3: 1.611163435,
        rtq12: 0.143675756,
        rtq14: 0.0576333264,
        rtq16: 37.9679943661,
        rtq18: 55.8295887987,
        rtq20: 27.3415398841,
        rtq23: 0.0363244277,
        rtq25: 0.1082215755,
        rtq29: 0.049325181,
        rtq31: 1.2358001782,
        rtq44: null,
        rtq45: null,
        rtq46: null,
        rtq47: null,
        rtq50: null,
        rtq51: null,
        rtq54: null,
        rtq55: null,
        rtq56: null,
        rtq57: null,
        rtq58: null,
        rtq59: null,
        rtq60: null,
        rtq61: null,
        rtq67: null,
        rtq69: null,
        rtq71: 2.5917858375,
        rtq77: 3.40831743,
        rtq78: 0.0482502526,
        rtq81: 5.3196877627,
        rtq83: 2.5970409772,
        rtq118: null,
        ryd20: null,
        ryd51: null,
        yearReport: 2019,
        yearReportCal: 2019
      }
    ],
    ratiosIndustry: {
      icbCode: "1350",
      rsd3: 7678846973,
      rsd7: 13645.4066419916,
      rsd11: 104327348480838,
      rsd14: 1672.8194107409,
      rsd20: 0.0427273329,
      rsd21: 14.0548620339,
      rsd25: 1.0647201433,
      rsd26: 2.2054670168,
      rsd28: 15.0053575677,
      rsd30: 16.450570815,
      rsd51: 0.2508521585,
      rsq1: 0.5252775425,
      rsq3: 2.2355980163,
      rsq12: -0.0539845682,
      rsq14: 0.0500962575,
      rsq16: 30.356805174,
      rsq18: 82.5627796556,
      rsq20: 24.3526028343,
      rsq23: null,
      rsq25: 0.1919549813,
      rsq29: 0.1471415122,
      rsq31: 0.5446771049,
      rsq34: 0.2632181729,
      rsq37: 0.0578616103,
      rsq39: 0.8656675873,
      rsq44: 0,
      rsq45: 0,
      rsq46: 0,
      rsq47: 0,
      rsq50: 0,
      rsq51: 0,
      rsq57: 0,
      rsq58: 0,
      rsq59: 0,
      rsq60: 0,
      rsq61: 0,
      rsq67: 0,
      rsq71: 0,
      rsq77: null,
      rsq118: 0,
      rtq12Max: 0.610794491,
      rtq14Max: 0.2760256072,
      rtq25Max: 0.6712718034,
      rtq29Max: 0.7163859129,
      rtq44Max: 0,
      rtq45Max: 0
    }
  }
}
exports.GetFinancialRatio = function GetFinancialRatio() {
  return {
    errors: null,
    ...fakeHelper.makeData(5, getItemFinancialRatio),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 5
  }
}

function getItemZMFScore() {
  return {
    organCode: "AAA",
    scorings: [
      {
        fScore: 5,
        mScore: 0.7462129593,
        yearReport: 2018,
        zScore: 1.7413659548
      },
      {
        fScore: 4,
        mScore: -1.5338025654,
        yearReport: 2017,
        zScore: 1.84110999
      },
      {
        fScore: 4,
        mScore: -1.6525463087,
        yearReport: 2016,
        zScore: 1.4020244785
      }
    ]
  }
}
exports.GetZMFScore = function GetZMFScore() {
  return {
    errors: null,
    ...fakeHelper.makeData(5, getItemZMFScore),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 5
  }
}