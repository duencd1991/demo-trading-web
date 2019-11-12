export default {
  watchListType: {
    COMPANY_GROUP: 'CompanyGroup',
    CUSTOM: 'Custom',
  },

  watchList: {
    WATCH_LIST_ID: 'watchListId',
    TEXT: 'text',
    CODE: 'code',
    TYPE_CODE: 'typeCode',
  },

  defaultWatchList: 'VN30',
  overviewDeceptiveInterval: 1000*60*0.5,
  abnormalityDeceptiveInterval: 1000*60*0.5,
  cancelledDeceptiveInterval: 1000*60*0.5,
  pressingDeceptiveInterval: 1000*60*0.5,
  aggressiveDeceptiveInterval: 1000*60*0.5,
  closingDeceptiveInterval: 1000*60*0.5,

  itemPerPage: 50,
}
