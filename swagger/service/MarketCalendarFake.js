'use strict';

var fakeHelper = require('./FakeHelper');

function getItemEconomy() {
  return {
    eventTitle: "Công bố sơ bộ_Nhập khẩu hàng hóa của doanh nghiệp có vốn đầu tư trực tiếp nước ngoài (FDI) tháng 09/2019",
    forecastValue: 0,
    issueDateFrom: "2019-10-18T00:00:00",
    levelName: "Nomal",
    newsId: 0,
    newsSourceLink: null,
    previousValue: 0,
    recentValue: 0,
    sourceUrl: null,
    unitCode: null
  }
}
exports.GetEconomy = function GetEconomy() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemEconomy),
    packageId: null,
    page: 1,
    pageSize: 0,
    status: "Success",
    totalCount: 9
  }
}

function getItemCalendarWatchList() {
  return {
    eventId: 1,
    eventListCode: "LIS",
    eventTitle: "MWG - Niêm yết bổ sung 50.000 cổ phiếu",
    exerciseDate: "2019-10-11T00:00:00",
    exrightDate: null,
    organCode: "MWG",
    publicDate: "2019-10-04T16:49:01.183",
    recordDate: null,
    sourceUrl: "http://fiinpro.com/News/Detail/3815144?lang=vi-VN",
    ticker: "MWG"
  }
}
exports.GetCalendarWatchList = function GetCalendarWatchList() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemCalendarWatchList),
    packageId: null,
    page: 1,
    pageSize: 50,
    status: "Success",
    totalCount: 3947
  }
}

function getItemCorporateEarning() {
  return {
    lengthReport: 3,
    organCode: "BRC",
    organShortName: "Cao su Bến Thành",
    profit: 4796233334,
    profitForeCast: 20848235988.4785,
    publicDate: "2019-10-09T00:00:00",
    revenue: 77399674671,
    revenueForeCast: 260506788137.646,
    ticker: "BRC",
    yearReport: 2019
  }
}
exports.GetCorporateEarning = function GetCorporateEarning() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemCorporateEarning),
    packageId: null,
    page: 1,
    pageSize: 50,
    status: "Success",
    totalCount: 4
  }
}