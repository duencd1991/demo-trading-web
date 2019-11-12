'use strict';
var fakeHelper = require('./FakeHelper');
var _ = require('lodash');

function getItemNotif() {
  return {
    alertCode: "Closing",
    alertType: "Technical",
    createDate: "2019-10-10T14:52:11.9",
    message: "Báo cáo tài chính hợp nhất Q3-2019",
    newsId: null,
    notificationId: 78628,
    organCode: "VEAM",
    referenceId: "1fd1f481-11cc-481b-b603-2c367f6975fd",
    status: 0,
    ticker: "VEA",
    tradingDate: null
  }
}
exports.GetNotificationList = function GetNotificationList() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemNotif),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}

function getItemSystemAlert() {
  return {
    alertCode: "RevenueBreakoutQuarterly",
    alertGroupCode: "Notification.Fundamental",
    alertGroupName: "Cơ bản",
    alertId: 1,
    alertName: "Bứt phá doanh thu (quý)",
    groupSubscribed: true,
    subscribed: true
  }
}
exports.GetAllSystemAlerts = function GetAllSystemAlerts() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemSystemAlert),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}

function getItemPersonalAlert() {
  return {
    alertDefinitions: [{code: "CrossUpMa20", groupCode: "Notification.CROSSMA", name: "Cross up MA20"}],
    code: "Notification.CROSSMA",
    description: "Cross MA Line",
    name: "Cross MA Line"
  }
}
exports.GetPersonalAlertTypes = function GetPersonalAlertTypes() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemPersonalAlert),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 10
  }
}