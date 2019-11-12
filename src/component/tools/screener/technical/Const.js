const listColumn = {
  TICKER: "stockScreenerItem.ticker",
  VOLUME: "priceInfo.totalMatchVolume",
  PRICE: "priceInfo.matchPrice",
  PERCENT_PRICE_CHANGE : "priceInfo.percentPriceChange",
  SMA20: "technical.sma20",
  SMA50: "technical.sma50",
  SMA100: "technical.sma100",
  RSI: "technical.rsi",
  CANDLE_STICK: "",
  HIGH_PRICE: "priceInfo.ceilingPrice",
  LOW_PRICE: "priceInfo.floorPrice",
  REF_PRICE: "priceInfo.referencePrice",
  CHANGE_PRICE: "priceInfo.priceChange",
  OPEN_PRICE : "priceInfo.openPrice",
  H1 : "technical.h1",
  H2 : "technical.h2",
  L1 : "technical.l1",
  L2 : "technical.l2",
  O1 : "technical.o1",
  O2 : "technical.o2",
  C1 : "technical.c1",
  C2 : "technical.c2",
  SMA20Past4 : "technical.sma20Past4"
};

const listHideColumn = [
  "priceInfo.ceilingPrice",
  "priceInfo.floorPrice",
  "priceInfo.referencePrice",
  "priceInfo.priceChange",
  "priceInfo.openPrice",
  "technical.h1",
  "technical.h2",
  "technical.l1",
  "technical.l2",
  "technical.o1",
  "technical.o2",
  "technical.c1",
  "technical.c2",
  "technical.sma20Past4"
];

export default {
  listColumn,
  listHideColumn,
}
