const index = {
  ORGAN_CODE: 'organCode',
  TICKER: 'ticker',
  COMPANY: 'company',
  REVENUE: 'revenue',
  REV: 'rev',
  PROFIT: 'profit',
  PROFIT_FORECAT: 'profitForecat',
  PERFORMANCE: 'performance',
  //div
  AN_DATE: 'items.anDate',
  EX_RIGHT_DATE: 'items.exRightDate',
  RECORD_DATE: 'items.recordDate',
  PAYOUT_DATE: 'items.payoutDate',
  EX_RATIO: 'items.exRatio',
  VALUE: 'items.value',
  DIV_YEAR: 'items.divYear',
  DIV_TYPE: 'items.divType',
  REFERENCE: 'items.reference',
  //sis
  ANNOUNCEMENT_DATE: 'items.announcementDate',
  EX_RIGHTS_DATE: 'items.exRightsDate',
  ISSUE_DATE: 'items.issueDate',
  LISTING_DATE: 'items.listingDate',
  ISSUE_METHOD: 'items.issueMethod',
  ISSUE_PERCEN: 'items.issuePercen',
  ISSUE_VOLUMN: 'items.issueVolumn',
  YEAR: 'items.year',
  STATUS: 'items.status',
  //ipo
  EXCHANGE: 'items.exchange',
  OFFERING_SHARES: 'items.offeringShares',
  IPO_RATIO: 'items.ipoRatio',
  PRICE: 'items.price',
  //agm
  TIME: 'items.time',
  DATE: 'items.date',
  EX_DIV_DATE: 'items.exDivDate',
  VENUE: 'items.venue',
  LOCATION: 'items.location',
  SOURCE: 'items.source',
};

export default {
  index,
  listKeyFilterEvent: ['ern', 'div', 'sis', 'ipo', 'agm'],

  listFilterEventByKey: {
    ern: { key: 'ern' },
    div: { key: 'div' },
    sis: { key: 'sis' },
    ipo: { key: 'ipo' },
    agm: { key: 'agm' },
  },

  listTitleTableDiv: {
    cash: 'CASH DIVIDEND',
    stock: 'STOCK DIVIDEND',
  },

  listTypeDivEvent: ['cashDividend', 'stockDividend'],

  listTypeDivEventByKey: {
    cash: { key: 'cashDividend' },
    stock: { key: 'stockDividend' },
  },

  marketCarlendarErnTable: {
    //ern
    TICKER: 'ticker',
    COMPANY: 'organName',
    REVENUE: 'revenue',
    REV: 'rev',
    PROFIT: 'profit',
    PROFIT_FORECAT: 'profit_forecat',
    PERFORMANCE: 'performance',
  },

  marketCarlendarDivCashTable: {
    TICKER: 'ticker',
    AN_DATE: 'publicDate',
    EX_RIGHT_DATE: 'exrightDate',
    RECORD_DATE: 'recordDate',
    PAYOUT_DATE: 'payoutDate',
    EX_RATIO: 'exerciseRate',
    VALUE: 'valuePerShare',
    DIV_YEAR: 'dividendYear',
    DIV_TYPE: 'dividendStageCode',
    PERFORMANCE: 'performance',
    REFERENCE: 'reference',
  },

  marketCarlendarDivStockTable: {
    TICKER: 'ticker',
    AN_DATE: 'publicDate',
    EX_RIGHT_DATE: 'exrightDate',
    RECORD_DATE: 'recordDate',
    PAYOUT_DATE: 'payoutDate',
    EX_RATIO: 'exerciseRate',
    DIV_YEAR: 'dividendYear',
    DIV_TYPE: 'dividendStageCode',
    PERFORMANCE: 'performance',
    REFERENCE: 'reference',
  },

  marketCarlendarSisTable: {
    TICKER: 'ticker',
    ANNOUNCEMENT_DATE: 'publicDate',
    EX_RIGHTS_DATE: 'exrightDate',
    ISSUE_DATE: 'issueDate',
    LISTING_DATE: 'listingDate',
    ISSUE_METHOD: 'issueMethodCode',
    ISSUE_PERCEN: 'exerciseRatio',
    ISSUE_VOLUMN: 'planVolumn',
    YEAR: 'issueYear',
    STATUS: 'issueStatusCode',
  },

  marketCarlendarIpoTable: {
    TICKER: 'ticker',
    COMPANY: 'organName',
    AN_DATE: 'publicDate',
    LISTING_DATE: 'listingDate',
    EXCHANGE: 'exchange',
    OFFERING_SHARES: 'offeringShare',
    IPO_RATIO: 'ipoRatio',
    PRICE: 'prices',
    REVIPO: 'revenue',
    PROFIT: 'profit',
  },

  marketCarlendarAgmTable: {
    TICKER: 'ticker',
    COMPANY: 'organName',
    DATE: 'publicDate',
    EX_DIV_DATE: 'exrightDate',
    VENUE: 'eventTitle',
    LOCATION: 'locationName',
    SOURCE: 'sourceUrl',
  },

  // marketCarlendarTable: {
  //   //ern
  //   TICKER: 'ticker',
  //   COMPANY: 'company',
  //   REVENUE: 'revenue(bn.)',
  //   REV: 'rev.(bn.)',
  //   PROFIT: 'profit(bn.)',
  //   PROFIT_FORECAT: 'profit(bn.)(forecat)',
  //   PERFORMANCE: 'performance',
  //   //div
  //   AN_DATE: 'an.date',
  //   EX_RIGHT_DATE: 'ex_right_date',
  //   RECORD_DATE: 'record_date',
  //   PAYOUT_DATE: 'payout_date',
  //   EX_RATIO: 'ex_ratio',
  //   VALUE: 'value',
  //   DIV_YEAR: 'div.year',
  //   DIV_TYPE: 'div.type',
  //   REFERENCE: 'reference',
  //   //sis
  //   ANNOUNCEMENT_DATE: 'announcement_date',
  //   EX_RIGHTS_DATE: 'ex_rights_date',
  //   ISSUE_DATE: 'issue_date',
  //   LISTING_DATE: 'listing_date',
  //   ISSUE_METHOD: 'issue_method',
  //   ISSUE_PERCEN: 'issue_percen',
  //   ISSUE_VOLUMN: 'issue_volumn',
  //   YEAR: 'year',
  //   STATUS: 'status',
  //   //ipo
  //   EXCHANGE: 'exchange',
  //   OFFERING_SHARES: 'offering_shares',
  //   IPO_RATIO: 'ipo_ratio',
  //   PRICE: 'price',
  //   //agm
  //   TIME: 'time',
  //   DATE: 'date',
  //   EX_DIV_DATE: 'ex_div_date',
  //   VENUE: 'venue',
  //   LOCATION: 'location',
  //   SOURCE: 'source',

  // },

  listHideColumnErn: [
    //div
    'an.date',
    'ex_right_date',
    'record_date',
    'payout_date',
    'ex_ratio',
    'value',
    'div.year',
    'div.type',
    'reference',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',
    'listing_date',
    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //ipo
    'exchange',
    'offering_shares',
    'ipo_ratio',
    'price',
    //agm
    'time',
    'date',
    'ex_div_date',
    'venue',
    'location',
    'source',
  ],

  listHideColumnDivTypeCash: [
    //ern
    'company',
    'revenue(bn.)',
    'rev.(bn.)',
    'profit(bn.)',
    'profit(bn.)(forecat)',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',
    'listing_date',
    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //ipo
    'exchange',
    'offering_shares',
    'ipo_ratio',
    'price',
    //agm
    'time',
    'date',
    'ex_div_date',
    'venue',
    'location',
    'source',
  ],

  listHideColumnDivTypeStock: [
    //div
    'value',
    //ern
    'company',
    'revenue(bn.)',
    'rev.(bn.)',
    'profit(bn.)',
    'profit(bn.)(forecat)',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',
    'listing_date',
    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //ipo
    'exchange',
    'offering_shares',
    'ipo_ratio',
    'price',
    //agm
    'time',
    'date',
    'ex_div_date',
    'venue',
    'location',
    'source',
  ],

  listHideColumnSis: [
    //ern
    'revenue(bn.)',
    'rev.(bn.)',
    'profit(bn.)',
    'profit(bn.)(forecat)',
    'performance',
    //div
    'an.date',
    'ex_right_date',
    'record_date',
    'payout_date',
    'ex_ratio',
    'value',
    'div.year',
    'div.type',
    'reference',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',
    'listing_date',
    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //agm
    'time',
    'date',
    'ex_div_date',
    'venue',
    'location',
    'source',
  ],

  listHideColumnIpo: [
    //ern
    'revenue(bn.)',
    'profit(bn.)(forecat)',
    'performance',
    //div
    'ex_right_date',
    'record_date',
    'payout_date',
    'ex_ratio',
    'value',
    'div.year',
    'div.type',
    'reference',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',

    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //agm
    'time',
    'date',
    'ex_div_date',
    'venue',
    'location',
    'source',
  ],

  listHideColumnAgm: [
    //ern
    'revenue(bn.)',
    'rev.(bn.)',
    'profit(bn.)',
    'profit(bn.)(forecat)',
    'performance',
    //div
    'an.date',
    'ex_right_date',
    'record_date',
    'payout_date',
    'ex_ratio',
    'value',
    'div.year',
    'div.type',
    'reference',
    //sis
    'announcement_date',
    'ex_rights_date',
    'issue_date',
    'listing_date',
    'issue_method',
    'issue_percen',
    'issue_volumn',
    'year',
    'status',
    //ipo
    'exchange',
    'offering_shares',
    'ipo_ratio',
    'price',
  ],

  //timeRangeFilter

  listTimeRangeErn: ['LastWeek', 'LastMonth', 'ThisWeek', 'ThisMonth'],

  listTimeRangeErnByKey: {
    LastWeek: { key: 'LastWeek', name: 'LAST WEEK' },
    LastMonth: { key: 'LastMonth', name: 'LAST MONTH' },
    ThisWeek: { key: 'ThisWeek', name: 'THIS WEEK' },
    ThisMonth: { key: 'ThisMonth', name: 'THIS MONTH' },
  },

  listTimeRange: [
    'LastWeek',
    'LastMonth',
    'ThisWeek',
    'ThisMonth',
    'NextWeek',
    'NextMonth',
  ],

  listTimeRangeByKey: {
    LastWeek: { key: 'LastWeek', name: 'LAST WEEK' },
    LastMonth: { key: 'LastMonth', name: 'LAST MONTH' },
    ThisWeek: { key: 'ThisWeek', name: 'THIS WEEK' },
    ThisMonth: { key: 'ThisMonth', name: 'THIS MONTH' },
    NextWeek: { key: 'NextWeek', name: 'NEXT WEEK' },
    NextMonth: { key: 'NextMonth', name: 'NEXT MONTH' },
  },

  defaultTimeRange: 'ThisWeek',
};
