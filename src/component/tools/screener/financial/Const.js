import _ from 'lodash'
const listColumn = {
  TICKER: "stockScreenerItem.ticker",
  PRICE: "priceInfo.matchPrice",
  PERCENT_PRICE_CHANGE: "priceInfo.percentPriceChange",
  ISA3: "financial.isa3",
  ISA20: "financial.isa20",
  RTD14: "financial.rtd14",
  RTD7: "financial.rtd7",
  RTD21: "financial.rtd21",
  RTD25: "financial.rtd25",
  HIGH_PRICE: "priceInfo.ceilingPrice",
  LOW_PRICE: "priceInfo.floorPrice",
  REF_PRICE: "priceInfo.referencePrice",
  CHANGE_PRICE: "priceInfo.priceChange",
};

const listHideColumn = [
  "priceInfo.ceilingPrice",
  "priceInfo.floorPrice",
  "priceInfo.referencePrice",
  "priceInfo.priceChange"
];

export default {
  listColumn,
  listHideColumn,
}
