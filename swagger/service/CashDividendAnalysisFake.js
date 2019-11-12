'use strict';
var fakeHelper = require('./FakeHelper');
var _ = require('lodash');

function getItemRatioYears() {
  return {
    yearReport: 2019,
    ratioValue: _.ceil(_.random(0, 1, true), 0)
  }
}
function getItemRatio() {
  return {
    ratioTTM: _.ceil(_.random(0, 1, true), 0),
    ...fakeHelper.makeArrayData(5, "ratioYears", getItemRatioYears)
  }
}
function getItemAnalysis() {
  return {
    cashDividendPayouts: [{valuePerShare: 500, exrightYear: 2019, exrightMonth: 8}],
    cashDividendPlans: [{dividendYear: 2019, valuePerShare: 2000}],
    dividendPayoutRatio: getItemRatio(),
    dividendYield: getItemRatio(),
    dps: getItemRatio(),
    eps: getItemRatio(),
    organCode: "AAA",
    priceEarningRatio: getItemRatio()
  }
}
exports.GetAnalysis = function GetCheckup() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemAnalysis),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}