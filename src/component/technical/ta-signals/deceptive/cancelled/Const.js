import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  VOLUME: "totalMatchedVolume",
  NR_CO: "totalCancelledOrder",
  VOL_CO: "totalCancelledOrderVolume",
  NR_CO_BUY: "cancelledBuyOrder",
  VOL_CO_BUY: "cancelledBuyOrderVolume",
  NR_CO_SELL: "cancelledSellOrder",
  VOL_SELL: "cancelledSellOrderVolume",
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

export default {
  listColumn,
  listHideColumn,
  filterAvgVolume,
}
