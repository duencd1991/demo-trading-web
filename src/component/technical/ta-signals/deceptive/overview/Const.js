import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  CHANGE_PRICE: "priceChange",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  VOLUME: "totalMatchedVolume",
  CE_FL: "ceFl",
  CANCELED: "cancelled",
  PRESSING: "pressing",
  AGGRESSIVE: "aggressive",
  CLOSING: "closing",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange"
];

export default {
  listColumn,
  listHideColumn,
}
