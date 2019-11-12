'use strict';
var fakeHelper = require('./FakeHelper');

function getItem() {
  return {
    bsI141: 253130500,
    bsS134: 0,
    bsa1: 5566536029038,
    bsa2: 271392032211,
    bsa3: 168132532211,
    bsa4: 103259500000,
    bsa5: 1096424484079,
    bsa6: 0,
    bsa7: 0,
    bsa8: 2903327855891,
    bsa9: 1302033537210,
    bsa10: 912663107595,
    bsa11: 0,
    bsa12: 0,
    bsa13: 190932498086,
    bsa14: 0,
    bsa15: 1126772362258,
    bsa16: 1127872132637,
    bsa17: -1099770379,
    bsa18: 168619294599,
    bsa19: 35023152927,
    bsa20: 130119852539,
    bsa21: 3476289133,
    bsa22: 0,
    bsa23: 2784771683883,
    bsa24: 20936778548,
    bsa25: 0,
    bsa26: 0,
    bsa27: 20936778548,
    bsa28: 0,
    bsa29: 2144952044113,
    bsa30: 2061490503434,
    bsa31: 2918996858194,
    bsa32: -857506354760,
    bsa33: 0,
    bsa34: 0,
    bsa35: 0,
    bsa36: 83461540679,
    bsa37: 94825808865,
    bsa38: -11364268186,
    bsa39: 0,
    bsa40: 95658391772,
    bsa41: 95807104290,
    bsa42: -148712518,
    bsa43: 43180000000,
    bsa44: 0,
    bsa45: 4800000000,
    bsa46: 0,
    bsa47: 0,
    bsa48: 0,
    bsa49: 163218545702,
    bsa50: 162293980769,
    bsa51: 924564933,
    bsa52: 0,
    bsa53: 8351307712921,
    bsa54: 5129086342647,
    bsa55: 3454979121357,
    bsa56: 2629631283217,
    bsa57: 635433910651,
    bsa58: 36648061601,
    bsa59: 54801796060,
    bsa60: 17509915550,
    bsa61: 33734679325,
    bsa62: 0,
    bsa63: 0,
    bsa64: 4021200243,
    bsa65: 0,
    bsa66: 6611634054,
    bsa67: 1674107221290,
    bsa68: 0,
    bsa69: 0,
    bsa70: 1655818739,
    bsa71: 1561978272487,
    bsa72: 23445246337,
    bsa73: 0,
    bsa74: 0,
    bsa76: 87027883727,
    bsa77: 0,
    bsa78: 3222221370274,
    bsa79: 3222221370274,
    bsa80: 1711999760000,
    bsa81: 532112689329,
    bsa82: 0,
    bsa83: 0,
    bsa84: 0,
    bsa85: -585951213,
    bsa86: 67258859051,
    bsa87: 0,
    bsa89: 13177404323,
    bsa90: 573556482848,
    bsa91: 0,
    bsa92: 0,
    bsa93: 0,
    bsa94: 0,
    bsa95: 0,
    bsa96: 8351307712921,
    bsa159: 497445582500,
    bsa160: 0,
    bsa161: 0,
    bsa162: 0,
    bsa163: 316825923748,
    bsa164: 0,
    bsa165: 38380000000,
    bsa166: 0,
    bsa167: 36586640656,
    bsa168: 0,
    bsa169: 0,
    bsa170: 0,
    bsa171: 0,
    bsa172: 0,
    bsa173: 0,
    bsa175: 1711999760000,
    bsa176: 0,
    bsa177: 227819971018,
    bsa178: 345736511830,
    bsa210: 324702125936,
    bsa211: 0,
    bsb97: 0,
    bsb98: 0,
    bsb99: 0,
    bsb100: 0,
    bsb101: 0,
    bsb102: 0,
    bsb103: 0,
    bsb104: 0,
    bsb105: 0,
    bsb106: 0,
    bsb107: 0,
    bsb108: 1096424484079,
    bsb109: 0,
    bsb110: 0,
    bsb111: 0,
    bsb112: 0,
    bsb113: 0,
    bsb114: 0,
    bsb115: 0,
    bsb116: 0,
    bsb117: 0,
    bsb118: 0,
    bsb119: 0,
    bsb120: 0,
    bsb121: 0,
    bsb174: null,
    otherAssetBank: 8351307712921,
    otherAssetNonBank: 639819639770,
    otherLiabilties: 5129086342647,
    quarterReport: 2,
    yearReport: 2019
  }
}
function getItemBalanceSheet() {
  return {
    ...fakeHelper.makeArrayData(1, "quarterly", getItem),
    ...fakeHelper.makeArrayData(1, "yearly", getItem)
  }
}
exports.GetBalanceSheet = function GetBalanceSheet() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemBalanceSheet),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}


function getItemIncome() {
  return {
    isa1: 2438667426222,
    isa2: -8633028459,
    isa3: 2430034397763,
    isa4: -2138619937880,
    isa5: 291414459883,
    isa6: 40394208201,
    isa7: -82288903731,
    isa8: -70292067113,
    isa9: -53853853069,
    isa10: -34954472795,
    isa11: 160711438489,
    isa12: 1545544420,
    isa13: -1141168616,
    isa14: 404375804,
    isa15: 0,
    isa16: 161115814293,
    isa17: -10749983616,
    isa18: -9905581615,
    isa19: -20655565231,
    isa20: 140460249062,
    isa21: 8761205672,
    isa22: 131699043390,
    isa23: 0,
    isa24: 0,
    isa102: 0,
    isb25: 0,
    isb26: 0,
    isb27: 0,
    isb28: 0,
    isb29: 0,
    isb30: 0,
    isb31: 0,
    isb32: 0,
    isb33: 0,
    isb34: 0,
    isb35: 0,
    isb36: 0,
    isb37: 0,
    isb38: 0,
    isb39: 0,
    isb40: 0,
    isb41: 0,
    isi51: 0,
    isi52: 0,
    isi53: 0,
    isi54: 0,
    isi55: 0,
    isi56: 0,
    isi57: 0,
    isi58: 0,
    isi59: 0,
    isi60: 0,
    isi61: 0,
    isi62: 0,
    isi63: 0,
    isi64: 0,
    isi65: 0,
    isi66: 0,
    isi67: 0,
    isi68: 0,
    isi69: 0,
    isi70: 0,
    isi71: 0,
    isi72: 0,
    isi73: 0,
    isi74: 0,
    isi75: 0,
    isi76: 0,
    isi77: 0,
    isi78: 0,
    isi79: 0,
    isi80: 0,
    isi81: 0,
    isi82: 0,
    isi83: 0,
    isi84: 0,
    isi85: 0,
    isi86: 0,
    isi87: 0,
    isi88: 0,
    isi89: 0,
    isi90: 0,
    isi91: 0,
    isi92: 0,
    isi93: 0,
    isi94: 0,
    isi95: 0,
    isi96: 0,
    isi97: 0,
    isi98: 0,
    isi99: 0,
    isi100: 0,
    isi101: 0,
    isi103: 0,
    isi104: 0,
    isi105: 0,
    isi106: 0,
    isi107: 0,
    isi108: 0,
    isi109: 0,
    isi110: 0,
    isi111: 0,
    isi112: 0,
    isi113: 0,
    isi114: 0,
    isi168: 0,
    isi169: 0,
    isi170: 0,
    isi171: 0,
    isi172: 0,
    isi173: 0,
    organCode: "AAA",
    quarterReport: 2,
    rtq29: 0.049325181,
    yearReport: 2019
  }
}
function getItemIncomeStatement() {
  return {
    ...fakeHelper.makeArrayData(1, "quarterly", getItemIncome),
    ...fakeHelper.makeArrayData(1, "yearly", getItemIncome)
  }
}
exports.GetIncomeStatement = function GetIncomeStatement() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemIncomeStatement),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}

function getItemCash() {
  return {
    cfa1: 161115814293,
    cfa2: 62646642950,
    cfa3: 1099770379,
    cfa4: 8324404521,
    cfa5: 0,
    cfa6: -33597700799,
    cfa7: 78838332261,
    cfa8: 0,
    cfa9: 278427263605,
    cfa10: -160789159433,
    cfa11: -451643010620,
    cfa12: 562918347171,
    cfa13: -18951026433,
    cfa14: -73029078537,
    cfa15: -6522990516,
    cfa16: -12000000000,
    cfa17: -34454226221,
    cfa18: 83956119016,
    cfa19: -249525769880,
    cfa20: 1449703273,
    cfa21: -751586664767,
    cfa22: 396227077080,
    cfa23: 75200000000,
    cfa24: 21000000000,
    cfa25: -5771457421,
    cfa26: -513007111715,
    cfa27: 0,
    cfa28: 0,
    cfa29: 2237245357301,
    cfa30: -2018879546722,
    cfa31: 0,
    cfa32: -780175000,
    cfa33: 0,
    cfa34: 217585635579,
    cfa35: -211465357120,
    cfa36: 482425462169,
    cfa37: 431927162,
    cfa38: 271392032211,
    cfa43: 0,
    cfa103: 0,
    cfa104: 0,
    cfa105: 0,
    cfb48: 0,
    cfb49: 0,
    cfb50: 0,
    cfb51: 0,
    cfb52: 0,
    cfb53: 0,
    cfb54: 0,
    cfb55: 0,
    cfb56: 0,
    cfb57: 0,
    cfb58: 0,
    cfb59: 0,
    cfb60: 0,
    cfb61: 0,
    cfb62: 0,
    cfb63: 0,
    cfb64: 0,
    cfb65: 0,
    cfb66: 0,
    cfb67: 0,
    cfb68: 0,
    cfb69: 0,
    cfb70: 0,
    cfb71: 0,
    cfb72: 0,
    cfb73: 0,
    cfb74: 0,
    cfb75: 0,
    cfb76: 0,
    cfb77: 0,
    cfb78: 0,
    cfb79: 0,
    cfb80: 0,
    cfb81: 0,
    cfb106: 0,
    organCode: "AAA",
    quarterReport: 2,
    yearReport: 2019
  }
}
function getItemCashFlow() {
  return {
    ...fakeHelper.makeArrayData(1, "quarterly", getItemCash),
    ...fakeHelper.makeArrayData(1, "yearly", getItemCash)
  }
}
exports.GetCashFlow = function GetCashFlow() {
  return {
    errors: null,
    ...fakeHelper.makeData(1, getItemCashFlow),
    packageId: null,
    page: 1,
    pageSize: 1,
    status: "Success",
    totalCount: 1
  }
}
