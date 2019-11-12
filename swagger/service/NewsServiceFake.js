'use strict';
var fakeHelper = require('./FakeHelper');

function getItemAggregatorNews() {
  return {
    categoryName: null,
    comGroupCode: null,
    contributor: null,
    createDate: "0001-01-01T00:00:00",
    index: null,
    isFavorite: false,
    newsCategoryCode: null,
    newsId: 3836205,
    newsShortContent: "Trước đề xuất đưa phát hành riêng lẻ trái phiếu doanh nghiệp của công ty không đại chúng quy định tại Luật Doanh nghiệp, mà không phải là Luật Chứng khoán, giới chuyên gia cho rằng, cần quy định theo hướng hài hòa giữa 2 luật để thuận lợi trong quản lý thị trường này.",
    newsSourceLink: "https://tinnhanhchungkhoan.vn/trai-phieu/quan-ly-trai-phieu-doanh-nghiep-can-hai-hoa-giua-cac-luat-298592.html",
    newsTitle: "Quản lý trái phiếu doanh nghiệp: Cần hài hòa giữa các luật",
    organCode: null,
    priceInfo: null,
    publicDate: "2019-10-10T11:15:50",
    sourceCode: "DTCK",
    ticker: null,
    trustAbility: null
  }
}
exports.GetAggregatorNews = function GetAggregatorNews() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemAggregatorNews),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}


function getItemAutoNews() {
  return {
    categoryName: "TA Strategy",
    comGroupCode: null,
    contributor: null,
    createDate: "2019-10-10T14:05:18.513",
    index: {
      ceiling: 0,
      closeIndex: 0,
      comGroupCode: "HNXIndex",
      floor: 0,
      foreignBuyValueDeal: 0,
      foreignBuyValueMatched: 1376278000,
      foreignBuyValueTotal: 0,
      foreignBuyVolumeDeal: 0,
      foreignBuyVolumeMatched: 189890,
      foreignBuyVolumeTotal: 0,
      foreignCurrentRoom: 0,
      foreignSellValueDeal: 0,
      foreignSellValueMatched: 21358110000,
      foreignSellValueTotal: 0,
      foreignSellVolumeDeal: 0,
      foreignSellVolumeMatched: 1123300,
      foreignSellVolumeTotal: 0,
      foreignTotalRoom: 0,
      highestIndex: 105.830925,
      indexChange: 0.806737,
      indexId: 0,
      indexValue: 105.426737,
      lowestIndex: 104.500292,
      marketStatus: "",
      matchValue: 0,
      matchVolume: 0,
      openIndex: 104.622448,
      percentIndexChange: 0.007711116421334353,
      referenceIndex: 104.62,
      status: 0,
      totalDealValue: 36775250000,
      totalDealVolume: 4826700,
      totalDownVolume: 0,
      totalMatchValue: 293896351000,
      totalMatchVolume: 18224229,
      totalNoChangeVolume: 0,
      totalStockDownPrice: 0,
      totalStockNoChangePrice: 0,
      totalStockOverCeiling: 0,
      totalStockUnderFloor: 0,
      totalStockUpPrice: 0,
      totalTrade: 170,
      totalUpVolume: 0,
      totalValue: 330624501000,
      totalVolume: 23049429,
      tradingDate: "2019-10-10T14:10:06",
      typeIndex: 0
    },
    isFavorite: false,
    newsCategoryCode: "FTTStra",
    newsId: 3836247,
    newsShortContent: null,
    newsSourceLink: null,
    newsTitle: "Vượt đường dài hạn MA100",
    organCode: "PVC",
    priceInfo: {
      averagePrice: 0,
      best1Bid: 0,
      best1BidVolume: 0,
      best1Offer: 0,
      best1OfferVolume: 0,
      ceilingPrice: 7300,
      closePrice: 0,
      comGroupCode: "HNXIndex",
      dealPrice: 0,
      dealValue: 0,
      dealVolume: 0,
      floorPrice: 6100,
      foreignBuyValueDeal: 0,
      foreignBuyValueMatched: 0,
      foreignBuyValueTotal: 0,
      foreignBuyVolumeDeal: 0,
      foreignBuyVolumeMatched: 0,
      foreignBuyVolumeTotal: 0,
      foreignCurrentRoom: 18260638,
      foreignSellValueDeal: 0,
      foreignSellValueMatched: 0,
      foreignSellValueTotal: 0,
      foreignSellVolumeDeal: 0,
      foreignSellVolumeMatched: 0,
      foreignSellVolumeTotal: 0,
      foreignTotalRoom: 0,
      highestPrice: 6900,
      lowestPrice: 6700,
      marketStatus: null,
      matchPrice: 6900,
      matchType: 0,
      matchValue: 0,
      matchVolume: 0,
      openPrice: 6700,
      organCode: "PVC",
      percentPriceChange: 0.029850746268656716,
      priceChange: 200,
      referenceDate: "2019-10-10T08:45:03.9565209+07:00",
      referencePrice: 6700,
      ticker: "PVC",
      totalBuyTradeVolume: 237200,
      totalDealValue: 0,
      totalDealVolume: 0,
      totalMatchValue: 1079380000,
      totalMatchVolume: 159800,
      totalSellTradeVolume: 481100,
      totalValue: 1079380000,
      totalVolume: 159800,
      tradingDate: "2019-10-10T14:10:16"
    },
    publicDate: "0001-01-01T00:00:00",
    sourceCode: null,
    ticker: "PVC",
    trustAbility: null
  }
}
exports.GetAutoNews = function GetAutoNews() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemAutoNews),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}

function getItemPremiumAnalysis() {
  return {
    categoryName: null,
    comGroupCode: null,
    contributor: null,
    createDate: "0001-01-01T00:00:00",
    index: null,
    isFavorite: false,
    newsCategoryCode: null,
    newsId: 3784135,
    newsShortContent: "Theo thông báo từ Sở giao dịch chứng khoán Hà Nội, 12,64 triệu cổ phiếu của CTCP Du lịch và Tiếp thị Giao thông Vận tải Việt Nam (Vietravel) sẽ được đưa vào giao dịch trên thị trường UPCoM với mã chứng khoán VTR từ ngày 27/9/2019.",
    newsSourceLink: null,
    newsTitle: "Viettravel có thể cất cánh hay không?",
    organCode: "VIETRA",
    priceInfo: null,
    publicDate: "2019-09-27T14:27:33",
    sourceCode: " FiinPro Data t",
    ticker: "VTR",
    trustAbility: null
  }
}
exports.GetPremiumAnalysis = function GetPremiumAnalysis() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemPremiumAnalysis),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}

function getItemMostRecent() {
  return {
    categoryName: null,
    comGroupCode: null,
    contributor: null,
    createDate: "0001-01-01T00:00:00",
    index: null,
    isFavorite: false,
    newsCategoryCode: null,
    newsId: 3534629,
    newsShortContent: "REE - Bluechip rẻ nhất thị trường phát tín hiệu vào sóng V lớn- (DVC đã khuyến nghị mua từ tháng 5 và bị om khá lâu quanh vùng 32 - 33)",
    newsSourceLink: "https://www.facebook.com/duong.vanchung.3/posts/2355031614562246",
    newsTitle: "REE - Bluechip rẻ nhất thị trường phát tín hiệu vào sóng V lớn",
    organCode: "REE",
    priceInfo: null,
    publicDate: "2019-07-30T17:19:31",
    sourceCode: "Dương Văn Chung",
    ticker: "REE",
    trustAbility: null
  }
}
exports.GetMostRecent = function GetMostRecent() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemMostRecent),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}

function getItemRumors() {
  return {
    categoryName: null,
    comGroupCode: null,
    contributor: null,
    createDate: "0001-01-01T00:00:00",
    index: null,
    isFavorite: false,
    newsCategoryCode: null,
    newsId: 3513572,
    newsShortContent: "Mới đây Bloomberg tiết lộ 2 đối tác tiềm năng đang đàm phán cho hợp đồng phân phối bảo hiểm độc quyền qua VCB là Prudentail và FWD. ",
    newsSourceLink: "http://f319.com/threads/bloomberg-tiet-lo-doi-tac-cua-vcb-phan-phoi-bao-hiem.1326763/",
    newsTitle: "VCB: Bloomberg tiết lộ đối tác của VCB phân phối bảo hiểm",
    organCode: "VCB",
    priceInfo: null,
    publicDate: "2019-07-25T16:21:29",
    sourceCode: "Bloomberg",
    ticker: "VCB",
    trustAbility: "High"
  }
}
exports.GetRumors = function GetRumors() {
  return {
    errors: null,
    ...fakeHelper.makeData(10, getItemRumors),
    packageId: null,
    page: 1,
    pageSize: 100,
    status: "Success",
    totalCount: 410572
  }
}