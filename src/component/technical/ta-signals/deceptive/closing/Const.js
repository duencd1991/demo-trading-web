import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  VOLUME: "totalMatchVolume",
  VOLUME_AFTER_2PM: "volumeAfter2pm",
  VOLUME_BEFORE_2PM: "volumeBefore2pm",
  AVG_VOLUME_10D: "averageMatchVolume2Week",
  VOLUME_PREVIOUS: "volumePrevious",
  RANK: "ranking",
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

const filterExceedPercent = {
  1: '0.2',
  2: '0.4',
  3: '0.6',
  4: '0.8',
  5: '1',
}

const openTime = 14; //Data is available after 2pm
const startTime = 8; //Data is start new day at 8am

export default {
  listColumn,
  listHideColumn,
  filterAvgVolume,
  filterExceedPercent,
  openTime,
  startTime
}
