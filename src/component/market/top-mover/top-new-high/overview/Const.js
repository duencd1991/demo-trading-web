const listColumn = {
  TICKER: "ticker",
  SECTOR_NAME: "sectorName",
  PRICE: "price",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  OLD_HIGH: "oldHigh",
  VALUE: "value",
  VOLUME: "volume",
  RTD11: "financial.rtd11",
  RTD21: "financial.rtd21",
  RANKING: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
  CHANGE_PRICE: "priceChange",
};

const listHideColumn = [
  "financial.rtd11",
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
