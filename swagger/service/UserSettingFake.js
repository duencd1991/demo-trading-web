'use strict';
var fakeHelper = require('./FakeHelper');

function getItemTopScreeners() {
  return {
    name: "Hạng cao với chiến lược Growth",
    screenerId: 346,
    // settings: {
    //   comGroupCode: "All",
    //   icbCode: "All",
    //   criteria: "FiinTradeIndicators",
    //   parameters: [
    //     {
    //       name: "FiinTrade Rank",
    //       code:"IcbRank",
    //       type:"Range",
    //       selectedValue:[1,3],
    //       valueRange:[1,355],
    //       unit:"Rank"
    //     },
    //     {
    //       name:"Growth (FiinTrade Score)",
    //       code:"Growth",
    //       type:"Value",
    //       selectedValue:["A"],
    //       valueRange:["A","B","C","D","F"],
    //       unit:"Unit"
    //       }
    //     ]
    // },
    settings: `{"comGroupCode":"All","icbCode":"All","criteria":"FiinTradeIndicators","parameters":[{"name":"FiinTrade Rank","code":"IcbRank","type":"Range","selectedValue":[1,3],"valueRange":[1,355],"unit":"Rank"},{"name":"Growth (FiinTrade Score)","code":"Growth","type":"Value","selectedValue":["A"],"valueRange":["A","B","C","D","F"],"unit":"Unit"}]}`,
    userId: 0
  }
}
exports.getTopScreeners = function getTopScreeners() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemTopScreeners),
    packageId: "cf037cde-ebc7-4fec-b2f6-29c1374bee74",
    page: 0,
    pageSize: 0,
    status: "Apart",
    totalCount: 0
  }
}
