export default {
  watchListType: {
    COMPANY_GROUP: 'CompanyGroup',
    SECTOR: 'Sector',
  },

  watchList: {
    WATCH_LIST_ID: 'watchListId',
    TEXT: 'text',
    CODE: 'code',
    TYPE_CODE: 'typeCode',
  },

  unitType: {
    VND: { key: 'VND', text: 'VND' },
    BillionVND: { key: 'BillionVND', text: 'Bn. ' },
    MillionVND: { key: 'MillionVND', text: 'Mn. ' },
    ThousandVND: { key: 'ThousandVND', text: 'Td. ' },
    Unit: { key: 'Unit', text: '' },
    ThousandUnit: { key: 'ThousandUnit', text: 'Td. ' },
    Percentage: { key: 'Percentage', text: '%' },
    Stock: { key: 'Stock', text: 'Stock' },
    Rank: { key: 'Rank', text: 'Rank' },
  },

  paramType: {
    RANGE: 'Range',
    BOOLEAN: 'Boolean',
    VALUE: 'Value',
  },

  defaultWatchList: 'VNINDEX',

  defaultIcbCode: 'All',

  screenerInterval: 1000 * 60 * 0.5,

  itemPerPage: 30,
  listColumnEx: {
    TICKER: 'TICKER',
    SECTOR: 'SECTOR',
    RTD21: 'RTD21',
    RTD11: 'RTD11',
    RTD36: 'RTD36',
    AVERAGE_VOLUME_3MONTH: 'AVERAGE_VOLUME_3MONTH',
    // TICKER: 'TICKER',
    // SECTOR: 'SECTOR',
    // RTD21: 'P/E',
    // RTD11: 'MARKET CAP',
    // RTD36: 'DIVIDEND YIELD (%)',
    // AVERAGE_VOLUME_3MONTH: 'AVERAGE VOLUME 3M',
  },
};
