import _ from 'lodash';
import { makeData } from '../../../helpers/Fake';
import Const from './Const';

export {
  getMarketAnomalyData,
  getMarketAnomalyDataTableFilter,
  getDataFilterByYearAndKey
}

const weekLabels = [
  'M',
  'T',
  'W',
  'T',
  'F',
];
const monthLabels = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];
const trimesterLabels = [
  'Q1',
  'Q2',
  'Q3',
  'Q4'
];

function getDataWeek(index) {
  return {
    time_text: weekLabels[index],
    y: _.round(_.random(-10, 10, true), 2),
    time: index
  }
}

function getDataMonth(index) {
  return {
    id: index,
    time_text: monthLabels[index],
    y: _.round(_.random(-10, 10, true), 2),
    time: index
  }
}

function getDataTrimester(index) {
  return {
    id: index,
    time_text: trimesterLabels[index],
    y: _.round(_.random(-10, 10, true), 2),
    time: index
  }
}

function getMarketAnomalyData() {
  return {
    week: makeData(weekLabels.length, getDataWeek),
    month: makeData(monthLabels.length, getDataMonth),
    trimester: makeData(trimesterLabels.length, getDataTrimester),
  }
}

const ticketLabels = [
  'VN-Index',
  'HNX-Index',
  'UPCoM-Index',
];

const companyNameLabels = [
  'VN',
  'HNX',
  'UpCoM',
]

const indexLabels = [
  'VNI',
  'HNX',
  'upcom-index',
]

function getTableDataByWeek() {

  return {
    ticketLabels: ticketLabels [_.random(0, 2)],
    companyNameLabels: companyNameLabels[_.random(0, 2)],
    indexLabels: indexLabels[_.random(0, 2)],
    year: _.random(2009, 2018),
    monday: _.random(-0.1, 0.1, true),
    tuesday: _.random(-0.1, 0.1, true),
    wednesday: _.random(-0.1, 0.1, true),
    thusday: _.random(-0.1, 0.1, true),
    friday: _.random(-0.1, 0.1, true)
  }
}

function getTableDataByMonth() {

  return {
    year: _.random(2009, 2018),
    yanuary: _.random(-0.1, 0.1, true),
    february: _.random(-0.1, 0.1, true),
    march: _.random(-0.1, 0.1, true),
    april: _.random(-0.1, 0.1, true),
    may: _.random(-0.1, 0.1, true),
    june: _.random(-0.1, 0.1, true),
    july: _.random(-0.1, 0.1, true),
    august: _.random(-0.1, 0.1, true),
    september: _.random(-0.1, 0.1, true),
    october: _.random(-0.1, 0.1, true),
    november: _.random(-0.1, 0.1, true),
    december: _.random(-0.1, 0.1, true)
  }
}

function getTableDataByQuarter() {
  return {
    year: _.random(2009, 2018),
    quarterOne: _.random(-0.1, 0.1, true),
    quarterTwo: _.random(-0.1, 0.1, true),
    quarterThree: _.random(-0.1, 0.1, true),
    quarterFour: _.random(-0.1, 0.1, true),
  }
}

function getListTicketData() {
  return {
    comGroupCode: ticketLabels[_.random(0, 2)],
    indexValue: _.random(1000, 2000, true),
    indexChange: _.random(-0.10, 0.10, true),
    percentIndexChange: _.random(-0.10, 0.10, true)
  }
}

function getMarketAnomalyDataTableFilter(param) {
  switch (param) {
    case Const.typeFilterTable.day:
      return makeData(5, getTableDataByWeek);
    case Const.typeFilterTable.month:
      return makeData(5, getTableDataByMonth);
    case Const.typeFilterTable.quarter:
      return makeData(5, getTableDataByQuarter);
    default:
      break;
  }
}

function getDataFilterByYearAndKey(year, key) {
  switch (key) {
    case Const.typeFilterTable.day:
      if (year === Const.typeFilterYear.RECENT_YEARS_5) {
        return makeData(5, getTableDataByWeek);
      } else if (year === Const.typeFilterYear.RECENT_YEARS_10) {
        return makeData(10, getTableDataByWeek);
      } else {
        return makeData(5, getTableDataByWeek);
      }
    case Const.typeFilterTable.month:
      if (year === Const.typeFilterYear.RECENT_YEARS_5) {
        return makeData(5, getTableDataByMonth);
      } else if (year === Const.typeFilterYear.RECENT_YEARS_10) {
        return makeData(10, getTableDataByMonth);
      } else {
        return makeData(5, getTableDataByMonth);
      }
    case Const.typeFilterTable.quarter:
      if (year === Const.typeFilterYear.RECENT_YEARS_5) {
        return makeData(5, getTableDataByQuarter);
      } else if (year === Const.typeFilterYear.RECENT_YEARS_10) {
        return makeData(10, getTableDataByQuarter);
      } else {
        return makeData(5, getTableDataByQuarter);
      }
    default:
      break;
  }
}
