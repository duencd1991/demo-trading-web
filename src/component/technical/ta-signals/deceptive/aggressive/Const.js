import _ from 'lodash'
const listColumn = {
  TICKER: "ticker",
  PRICE: "matchPrice",
  VOLUME: "totalMatchVolume",
  VOLUME_BU_SD: "",
  AVG_VOLUME: "averageMatchVolume2Week",
  TOTAL_VOLUME_BU: "totalVolumeBuyUp",
  TOTAL_VOLUME_SD: "totalVolumeSellDown",
  HIGH_PRICE: "ceilingPrice",
  LOW_PRICE: "floorPrice",
  REF_PRICE: "referencePrice",
  RANK: "rank",
};

const listHideColumn = [
  "ceilingPrice",
  "floorPrice",
  "referencePrice",
];

const filterAvgVolume = {
  1: '10000',
  2: '50000',
  3: '100000',
  4: '300000',
  5: '500000',
}

const filterOrderType= {
  1: {text:"MoreThan", quote: "> "},
  2: {text:"LessThan", quote: "< "}
}

const filterTotalBuSd= {
  1: "0.3",
  2: "0.6",
  3: "1.0",
  4: "1.5",
  5: "2.0",
}

export default {
  listColumn,
  listHideColumn,
  filterAvgVolume,
  filterOrderType,
  filterTotalBuSd
}
