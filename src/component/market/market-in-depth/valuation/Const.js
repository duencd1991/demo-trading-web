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
    'NineMonths',
    // 'YearToDate',
    'OneYear',
    'ThreeYears',
    // 'FiveYears',
    // 'TenYears',
    'AllTime',
  ],
  listTimeRangeByKey: {
    ThreeMonths: { key: 'ThreeMonths', name: '_3_months' },
    SixMonths: { key: 'SixMonths', name: '_6_months' },
    NineMonths: { key: 'NineMonths', name: '_9_months' },
    OneYear: { key: 'OneYear', name: 'this_year' },
    ThreeYears: { key: 'ThreeYears', name: 'three_years' },
    AllTime: { key: 'AllTime', name: 'all_time' },
  },
  defaultTimeRange: 'SixMonths',
  /**
   * key: Code
   * value: title
   */
  listComGroupCode: ['VNINDEX', 'HNXINDEX', 'UPCOMINDEX', 'VN30', 'HNX30'],
  listComGroupCodeByKey: {
    VNINDEX: { icbCode: 'VNINDEX', icbName: 'VN-INDEX' },
    HNXINDEX: { icbCode: 'HNXINDEX', icbName: 'HNX-INDEX' },
    UPCOMINDEX: { icbCode: 'UPCOMINDEX', icbName: 'UPCOM-INDEX' },
    VN30: { icbCode: 'VN30', icbName: 'VN30' },
    HNX30: { icbCode: 'HNX30', icbName: 'HNX30' },
  },
  defaultComGroupCode: 'VNINDEX',

  icbLevel: 3, // get list industry condition icbLevel=3
  listColumnIndustry: {
    ICB_CODE: 'icbCode',
    ICB_NAME: 'icbName',
    PARENT_ICB_CODE: 'parentIcbCode',
    FRIENDLY_NAME: 'friendlyName',
    ICB_LEVEL: 'icbLevel',
    ICB_ORDER: 'icbOrder',
    SECTOR_PROFILE: 'sectorProfile',
    STATUS: 'status',
    CREATE_DATE: 'createDate',
    UPDATE_DATE: 'updateDate',
    ICB_CODE_PATH: 'icbCodePath',
    ICB_NAME_PATH: 'icbNamePath',
    INDUSTRY_ID: 'industryID',
    PARENT_INDUSTRY_ID: 'parentIndustryID',
    ICB_SHORT_NAME: 'icbShortName',
  },
  /**
   * key: Code
   * value: title
   */
  listRate: [
    'r21',
    'r25',
    // 'r26',
    // 'r27',
  ],
  listRateByKey: {
    r21: { key: 'r21', name: 'P/E' },
    r25: { key: 'r25', name: 'P/B' },
    // r26: { key: 'r26', name: 'P/S' },
    // r27: { key: 'r27', name: 'P/Tangible Book' },
  },
  defaultRate: 'r21', // key in listR
};
