const listColumn = {
  TICKER: "ticker",
  PRICE: "price",
  CHANGE_PRICE: "priceChange",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  VOLUME: "volume",
  AVG_VOLUME: "averageMatchVolume",
  RTD11: "financial.rtd11",
  RANKING: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
];

export default {
  listColumn,
  listHideColumn,
}
