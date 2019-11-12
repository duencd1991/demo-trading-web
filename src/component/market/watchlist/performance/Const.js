const listColumn = {
  COM_GROUP_CODE: 'ticker',
  MATCH_PRICE: 'priceInfo.matchPrice',
  PERCENT_PRICE_CHANGE: 'performance.percentPriceChange1Day',
  PERCENT_PRICE_CHANGE_1WEEK: 'performance.percentPriceChange1Week',
  PERCENT_PRICE_CHANGE_1MONTH: 'performance.percentPriceChange1Month',
  PERCENT_PRICE_CHANGE_3MONTH: 'performance.percentPriceChange3Month',
  PERCENT_PRICE_CHANGE_6MONTH: 'performance.percentPriceChange6Month',
  PERCENT_PRICE_CHANGE_9MONTH: 'performance.percentPriceChange9Month',
  PERCENT_PRICE_CHANGE_1YEAR: 'performance.percentPriceChange1Year',
  PERCENT_PRICE_CHANGE_YTD: 'performance.percentPriceChangeYTD',
};

const listIgnoreColumn = {
  TRADING_DATE: 'priceInfo.tradingDate',
};

export default {
  listColumn,
  listIgnoreColumn,
  ORGAN_CODE: 'organCode',
}
