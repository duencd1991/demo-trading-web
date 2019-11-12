const listColumn = {
  TICKER: "ticker",
  PRICE: "price",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  ISA3: "financial.isa3",
  ISA20: "financial.isa20",
  RTD14: "financial.rtd14",
  RTD7: "financial.rtd7",
  RTD21: "financial.rtd21",
  RTD25: "financial.rtd25",
  CHANGE_PRICE: "priceChange",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
};

const listHideColumn = [
  "priceChange",
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
];

export default {
  listColumn,
  listHideColumn,
}
