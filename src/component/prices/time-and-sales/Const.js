const listColumn = {
  time: 'tradingDate', // hh:mm
  type: 'matchType',
  lastPrice: 'matchPrice',
  change: 'priceChange',
  percent1Dchange: 'percentPriceChange',
  lastVolume: 'matchVolume',
  totalVolume: 'totalMatchVolume',
  ceilingPrice: 'ceilingPrice',
  floorPrice: 'floorPrice',
  referencePrice: 'referencePrice',
  // tradingDate: 'tradingDate'
};

const defaultSelected = {
  organCode: 'AAA',
  companyName: 'An Phat Plastic'
}

const listHideColumn = [
  'ceilingPrice',
  'floorPrice',
  'referencePrice',
]

const listTicker = {
  ORGAN_CODE: 'organCode',
  TICKER: 'ticker',
  ORGAN_SHORT_NAME: 'organShortName',
  COM_GROUP_CODE: 'comGroupCode',
}

const listDerivatives = {
  DERIVATIVE_CODE: 'derivativeCode',
  DERIVATIVE_NAME: 'derivativeName',
  COM_GROUP_CODE: 'comGroupCode',
}

const chartData = {
  price: 'price',
  buyUpVolume: 'buyUpVolume',
  naVolume: 'naVolume',
  sellDownVolume: 'sellDownVolume'
}

const listIndex = {
  COM_GROUP_CODE: 'comGroupCode',
  COM_GROUP_NAME: 'comGroupName',
}

const typeList = {
  bu: 'BU',
  sd: 'SD',
}

const listIndexName = {
  vnIndex: 'VNINDEX',
  hnIndex: 'HNXINDEX',
  upcomIndex: 'UPCOMINDEX',
}

const listIndexExchange = {
  hose: 'HOSE',
  hnx: 'HNX',
  upcom: 'UPCOM',
}

export default {
  listColumn,
  listHideColumn,
  chartData,
  listTicker,
  listIndex,
  typeList,
  defaultSelected,
  listDerivatives,
  listIndexName,
  listIndexExchange,
}
