'use strict';
var fakeHelper = require('./FakeHelper');
var _ = require('lodash');

function getItemscreenerParam() {
  return {
    code: "Popular",
    name: "Phổ biến",
    parameters: [{
      code: "ClosePrice",
      name: "Giá",
      selectedValue: [200, 255300],
      type: "Range",
      unit: "ThousandVND",
      valueRange: [200, 255300]
    }]
  }
}
exports.GetScreenerParameters = function GetScreenerParameters() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemscreenerParam),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}