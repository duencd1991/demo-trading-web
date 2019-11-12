const listColumn = {
  TICKER: "ticker",
  SECTOR_NAME: "sectorName",
  PRICE: "price",
  PERCENT_PRICE_CHANGE: "percentPriceChange",
  VOLUME: "volume",
  FOREIGN_BUY_VOL: "foreignBuyVolumeMatched",
  FOREIGN_BUY_VALUE: "foreignBuyValueMatched",
  FOREIGN_SELL_VOL: "foreignSellVolumeMatched",
  FOREIGN_SELL_VALUE: "foreignSellValueMatched",
  RTD21: "financial.rtd21",
  RANKING: "rank",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
  CHANGE_PRICE: "priceChange",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange",
  "foreignBuyVolumeMatched",
  "foreignBuyValueMatched",
  "foreignSellVolumeMatched",
  "foreignSellValueMatched"
];

export default {
  listColumn,
  listHideColumn,
}
