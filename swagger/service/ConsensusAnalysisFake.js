'use strict';
var fakeHelper = require('./FakeHelper');
var _ = require('lodash');

function getItemConsensus() {
  return {
    organCode: "AAA",
    recommendationHistories: [{
      recommendations: [{
        localRecommendationTypeName: "Mua",
        numOfReport: 0,
        publicDate: null,
        recommendationTypeCode: "BUY",
        reportDate: null
      }],
      reportDate: "2017-10-01T00:00:00",
    }],
    recommendations: [{
      localRecommendationTypeName: "Mua",
      numOfReport: 52,
      publicDate: "2019-09-12T00:00:00",
      recommendationTypeCode: "BUY",
      reportDate: "2019-09-12T00:00:00"
    }],
    targetPrice: {
      averagePrice: 20316,
      closePrice: 14800,
      closePriceAdjusted: 14800,
      highestPrice: 28100,
      lowestPrice: 17040
    },
    targetPriceHistories: [{
      actualPrice: 30000,
      numOfRating: 4,
      reportDate: "2017-11-08T00:00:00",
      targetPrice: 37100
    }]
  }
}
exports.GetConsensus = function GetCheckup() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemConsensus),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}