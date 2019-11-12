import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  AVG_VOLUME_10D: "averageMatchVolume2Week",
  PRESSING_VOL_BUY: "bidVolume",
  BID: "bid",
  PRESSING_VOL_SELL: "offerVolume",
  ASK: "offer",
  RANK: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
];

const filterAvgVolume = {
  1: '10000',
  2: '50000',
  3: '100000',
  4: '300000',
  5: '500000',
}

const filterProportion = {
  1: '0.1',
  2: '0.3',
  3: '0.5',
  4: '0.7',
}

const filterOrder = {
  1: {text: 'Buy', quote: "tasignals.pressingContent.filter_1"},
  2: {text: 'Sell', quote: "tasignals.pressingContent.filter_2"},
  3: {text: 'Both', quote: "tasignals.pressingContent.fitler_3"},
}

export default {
  listColumn,
  listHideColumn,
  filterAvgVolume,
  filterOrder,
  filterProportion
}
