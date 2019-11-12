import _ from 'lodash';
import { makeData } from './../../../helpers/Fake';

export { getListAlertSystem };

const fakeItemRowData = [
  {
    time: '09:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '09:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '09:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '09:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '09:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:50:01',
    ticker: 'SSI',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'SSI',
    active: true,
  },
  {
    time: '08:49:02',
    ticker: 'PVD',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'PVD',
    active: true,
  },
  {
    time: '09:48:02',
    ticker: 'BID',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'BID',
    active: false,
  },
  {
    time: '09:46:02',
    ticker: 'VCB',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'VCB',
    active: true,
  },
  {
    time: '09:45:02',
    ticker: 'NLG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'NLG',
    active: true,
  },
  {
    time: '09:44:02',
    ticker: 'VNS',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'VNS',
    active: true,
  },
  {
    time: '09:43:02',
    ticker: 'HVN',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'VNAIR',
    active: true,
  },
  {
    time: '09:40:02',
    ticker: 'VCB',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'VCB',
    active: true,
  },
  {
    time: '09:30:02',
    ticker: 'NLG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'NLG',
    active: true,
  },
  {
    time: '09:20:02',
    ticker: 'VNS',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'VNS',
    active: true,
  },
  {
    time: '09:10:02',
    ticker: 'ACV',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'ACV',
    active: true,
  },
  {
    time: '08:00:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:50:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:40:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:30:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:20:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
  {
    time: '08:10:02',
    ticker: 'HPG',
    alert:
      'Volume of canceling orders above 30% of average liquidity test test test test test',
    organCode: 'HPG',
    active: true,
  },
];

function getItemAlertSystem() {
  return {
    time: _.random(1, 5),
    ticker: _.random(20000, 100000, true),
    alert: _.random(1, 5),
  };
}

function getListAlertSystem() {
  // return makeData(30, getItemAlertSystem);
  return fakeItemRowData;
}
