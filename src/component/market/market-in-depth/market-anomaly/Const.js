export default {
  anomalyChart: {
    MIN_BAR_WIDTH: 18, //px
    MARGIN_TOP: 30, //px
    MARGIN_BOTTOM: 30, //px
    MARGINS: {
      marginOuter: 1,
      marginInner: 1,
    },
    CHART_CONFIG: [
      {
        barNumber: 5,
        bar: 1,
        paddingBar: 0.25,
      },
      {
        barNumber: 12,
        bar: 1,
        paddingBar: 0.25,
      },
      {
        barNumber: 4,
        bar: 1,
        paddingBar: 0.25,
      },
    ],
    CHART_TYPE: {
      WEEK: {
        index: 0,
      },
      MONTH: {
        index: 1,
      },
      TRIMESTER: {
        index: 2,
      },
    },
  },

  defaultCode: 'VNINDEX',
  average: 'Average',
  yearAverageFromServer: 0,

  typeFilterYear: {
    ALL_TIME: 'all',
    RECENT_YEARS_5: 5,
    RECENT_YEARS_10: 10,
  },

  listKeyFilterYear: ['FiveYears', 'TenYears', 'AllTime'],
  listFilterYearByKey: {
    AllTime: { key: 'AllTime', title: 'marketInDepthAnomaly.allTime' },
    FiveYears: { key: 'FiveYears', title: 'marketInDepthAnomaly.recentYear5' },
    TenYears: { key: 'TenYears', title: 'marketInDepthAnomaly.recentYear10' },
  },

  listKeyFilterDateTime: ['day', 'month', 'quarter'],
  listFilterDateTimeByKey: {
    day: { key: 'day' },
    month: { key: 'month' },
    quarter: { key: 'quarter' },
  },

  listColumn: {
    YEAR: 'year',
    MONDAY: 'mon',
    TUESDAY: 'tue',
    WEDNESDAY: 'wed',
    THURSDAY: 'thu',
    FRIDAY: 'fri',
    JANUARY: 'jan',
    FEBRUARY: 'feb',
    MARCH: 'mar',
    APRIL: 'apr',
    MAY: 'may',
    JUNE: 'jun',
    JULY: 'jul',
    AUGUST: 'aug',
    SEPTEMBER: 'sep',
    OCTOBER: 'oct',
    NOVEMBER: 'nov',
    DECEMBER: 'dec',
    QUARTER_ONE: 'i',
    QUARTER_TWO: 'ii',
    QUARTER_THREE: 'iii',
    QUARTER_FOUR: 'iv',
  },

  listHideColumnWeekTable: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
    'i',
    'ii',
    'iii',
    'iv',
  ],

  listHideColumnMonthTable: [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'i',
    'ii',
    'iii',
    'iv',
  ],

  listHideColumnQuarterTable: [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ],

  indexData: {
    VALUE: 'value',
    VALUE_CHANGE: 'valueChange',
    PERCENT_VALUE_CHANGE: 'percentValueChange',
  },

  dataWeek: [
    { time_text: 'M', time_tooltip: 'Monday', time: 0, key: 'mon' },
    { time_text: 'T', time_tooltip: 'Tuesday', time: 1, key: 'tue' },
    { time_text: 'W', time_tooltip: 'Wednesday', time: 2, key: 'wed' },
    { time_text: 'T', time_tooltip: 'Thursday', time: 3, key: 'thu' },
    { time_text: 'F', time_tooltip: 'Friday', time: 4, key: 'fri' },
  ],
  dataMonth: [
    { time_text: 'JAN', time_tooltip: 'January', time: 0, key: 'jan' },
    { time_text: 'FEB', time_tooltip: 'February', time: 1, key: 'feb' },
    { time_text: 'MAR', time_tooltip: 'March', time: 2, key: 'mar' },
    { time_text: 'APR', time_tooltip: 'April', time: 3, key: 'apr' },
    { time_text: 'MAY', time_tooltip: 'May', time: 4, key: 'may' },
    { time_text: 'JUN', time_tooltip: 'June', time: 5, key: 'jun' },
    { time_text: 'JUL', time_tooltip: 'July', time: 6, key: 'jul' },
    { time_text: 'AUG', time_tooltip: 'August', time: 7, key: 'aug' },
    { time_text: 'SEP', time_tooltip: 'September', time: 8, key: 'sep' },
    { time_text: 'OCT', time_tooltip: 'October', time: 9, key: 'oct' },
    { time_text: 'NOV', time_tooltip: 'November', time: 10, key: 'nov' },
    { time_text: 'DEC', time_tooltip: 'December', time: 11, key: 'dec' },
  ],
  dataTrimester: [
    { time_text: 'Q1', time_tooltip: 'Quarter 1', time: 0, key: 'i' },
    { time_text: 'Q2', time_tooltip: 'Quarter 2', time: 1, key: 'ii' },
    { time_text: 'Q3', time_tooltip: 'Quarter 3', time: 2, key: 'iii' },
    { time_text: 'Q4', time_tooltip: 'Quarter 4', time: 3, key: 'iv' },
  ],

  listTicker: {
    ORGAN_CODE: 'organCode',
    TICKER: 'ticker',
    ORGAN_SHORT_NAME: 'organShortName',
    COM_GROUP_CODE: 'comGroupCode',
  },

  listIndex: {
    COM_GROUP_CODE: 'comGroupCode',
    COM_GROUP_NAME: 'comGroupName',
    PARENT_COM_GROUP_CODE: 'parentComGroupCode',
  },

  listIndexName: {
    vnIndex: 'VNINDEX',
    hnIndex: 'HNXIndex',
    upcomIndex: 'UpcomIndex',
  },

  listIndexExchange: {
    hose: 'HOSE',
    hnx: 'HNX',
    upcom: 'UPCOM',
  },
};
