const listColumn = {
  ticker: 'organCode',
  price: 'matchPrice',
  ref_price: 'referencePrice',
  high_price: 'ceilingPrice',
  low_price: 'floorPrice',
  volume: 'totalMatchVolume',
  volume_expected: 'volumeExpected',
  nrOfDay: 'nrOfDay',
  lastClose: 'lastClose',
  lastVol: 'lastVolume',
  RSI: 'rsI14',
  ranking: 'ranking',
}
const listFeatureType = [
  'VolumeIncreaseAndPriceIncrease',
  'VolumeIncreaseAndPriceDecrease',
  'PriceIncrease',
  'PriceDecrease',
  'VolumeIncrease'
]
const listFeatureTypeByKey = {
  VolumeIncreaseAndPriceIncrease: { key: 'VolumeIncreaseAndPriceIncrease', name: 'tasignals.listOfFeature.VolPriceIncrease' },
  VolumeIncreaseAndPriceDecrease: { key: 'VolumeIncreaseAndPriceDecrease', name: 'tasignals.listOfFeature.VolIncPriceDecr' },
  PriceIncrease: { key: 'PriceIncrease', name: 'tasignals.listOfFeature.PriceIncrease' },
  PriceDecrease: { key: 'PriceDecrease', name: 'tasignals.listOfFeature.PriceDecr' },
  VolumeIncrease: { key: 'VolumeIncrease', name: 'tasignals.listOfFeature.VolIncrease' }
}
const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
  "priceChange"
];
export default {
  listColumn,
  organCode : 'organCode',
  idPriceVolume: 'idPriceVolume',
  defaultOption: 'VolumeIncreaseAndPriceIncrease',
  listFeatureType,
  listFeatureTypeByKey,
  listHideColumn,
  maxRowData: 10
}