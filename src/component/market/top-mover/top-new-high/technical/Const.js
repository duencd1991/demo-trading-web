const listColumn = {
  TICKER: "ticker",
  VOLUME: "volume",
  PRICE: "price",
  PERCENT_PRICE_CHANGE : "percentPriceChange",
  SMA20: "technical.sma20",
  SMA50: "technical.sma50",
  SMA100: "technical.sma100",
  RSI: "technical.rsi",
  CANDLE_STICK: "",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
  CHANGE_PRICE: "priceChange",
  OPEN_PRICE : "o",
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
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange",
  "o",
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
