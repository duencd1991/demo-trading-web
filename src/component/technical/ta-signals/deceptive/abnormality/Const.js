import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  VOLUME: "totalMatchVolume",
  AVG_VOLUME: "averageMatchVolume2Week",
  VOLUME_CE_UNMATCHED: "volumeCEUnmatched",
  VOLUME_CE_FL_UNMATCHED: "",
  VOLUME_FL_UNMATCHED: "volumeFLUnmatched",
  RATIO: "ratio",
  SESSION: "session",
  PREV_SESSION: "previouseSession",
  RANK: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange",
  "volumeCEUnmatched",
  "volumeFLUnmatched"
];

const filterAbnormalityType = {
  1: {text:"CeilingBuy", quote: "tasignals.abnormalityContent.filter_quote_1"},
  2: {text:"FloorSell", quote: "tasignals.abnormalityContent.filter_quote_2"}
}

const filterAvgVolume = {
  1: '10000',
  2: '50000',
  3: '100000',
  4: '300000',
  5: '500000',
}

const filterRate = {
  1: '1',
  2: '1.5',
  3: '2',
  4: '2.5',
  5: '3',
}

export default {
  listColumn,
  listHideColumn,
  filterAbnormalityType,
  filterAvgVolume,
  filterRate
}
