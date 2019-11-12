export const indexs = {
  all: 1,
  vnIndex: 2,
  hnxIndex: 3,
  upComIndex: 4,
  vn30: 5,
  hnx30: 6,
};

export const indexMapFilter = {
  [indexs.all]: 'All',
  [indexs.vnIndex]: 'VNINDEX',
  [indexs.hnxIndex]: 'HNXIndex',
  [indexs.upComIndex]: 'UpcomIndex',
  [indexs.vn30]: 'VN30',
  [indexs.hnx30]: 'HNX30',
};

export default {
  listTimeRange: [
    // 'Realtime',
    // 'OneDay',
    // 'OneWeek',
    // 'TwoWeeks',
    // 'ThreeWeeks',
    // 'OneMonth',
    // 'TwoMonths',
    'ThreeMonths',
    'SixMonths',
    // 'YearToDate',
    'OneYear',
    // 'ThreeYears',
    // 'FiveYears',
    // 'TenYears',
    // 'AllTime',
  ],
  listTimeRangeByKey: {
    ThreeMonths: { key: 'ThreeMonths', name: '3 MONTHS' },
    SixMonths: { key: 'SixMonths', name: '6 MONTHS' },
    OneYear: { key: 'OneYear', name: 'THIS YEAR' },
  },

  defaultTimeRange: 'ThreeMonths',
  topMoverInterval: 1000 * 60 * 0.5,
  topBreakoutInterval: 1000 * 60 * 0.5,
  topForeignTradeInterval: 1000 * 60 * 0.5,
  topGainersInterval: 1000 * 60 * 0.5,
  topLosersInterval: 1000 * 60 * 0.5,
  topNewHighInterval: 1000 * 60 * 0.5,
  topNewLowInterval: 1000 * 60 * 0.5,
  topValueInterval: 1000 * 60 * 0.5,
  topVolumeInterval: 1000 * 60 * 0.5,
};
