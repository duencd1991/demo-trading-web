const listColumn = {
  TICKER: "ticker",
  SECTOR_NAME: "sectorName",
  VALUE: "value",
  PRICE: "price",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  RTD11: "financial.rtd11",
  RTD21: "financial.rtd21",
  VOLUME: "volume",
  RANKING: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
  CHANGE_PRICE: "priceChange",
};

const listHideColumn = [
  "financial.rtd21",
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange",
];

export default {
  listColumn,
  listHideColumn,
}
