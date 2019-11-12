import ConstChart from '../../common/mixChart/Const';
import { formatPercent, formatTextFloat } from '../../helpers/Text';
import { yExtentsCharts } from '../../helpers/Chart';
const SETTINGS = {
  HEIGHT: 200,
  WIDTH: 500,
  MARGIN: { left: 80, right: 80, top: 0, bottom: 30 },
  TEXT_COLOR: '#ffffff',
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
  BIG_SIZE: 20,
  CORLOR_BAR: '#47ccc7',
  CORLOR_CIRCLEMARKERLINE: '#f5d0c5',
  CORLOR_GROUP: '#1d97ef',
  KEY_CHART: 1,
  MIN_WIDTH: 500,
};

// start config chartPE

// config legend chart
const listLegendChartPE = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'cashDividend.priceEarnings',
    SETTINGS.CORLOR_BAR,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'cashDividend.dyLegend',
    SETTINGS.CORLOR_CIRCLEMARKERLINE,
  ),
];

// config canvas
const xAccessor = d => {
  return d.yearReport;
};
const xExtents = 'yearReport';
const margin = { left: 80, right: 80, top: 10, bottom: 30 };
const titleChartPE = {
  title: 'cashDividend.titlePE',
};

// config barChart
const HoverTooltipChartPE = ConstChart.hoverTooltipFunc(null, null, null, [
  ConstChart.setContentTooltip(
    '',
    'cashDividend.pe',
    d => formatTextFloat(d.ratioValue),
    '#000',
  ),
  ConstChart.setContentTooltip(
    '',
    'cashDividend.dy',
    d => formatPercent(d.ratioValueYield),
    '#000',
  ),
]);

const yExtents = ['ratioValue'];

const yGrid = {
  innerTickSize:
    -1 * (SETTINGS.WIDTH - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right),
  tickStrokeDasharray: 'Solid',
  tickStrokeOpacity: 0.2,
  tickStrokeWidth: 2,
};

const titleYAxisLeft = text => {
  return {
    x: -(SETTINGS.MARGIN.left / 2),
    y:
      SETTINGS.MARGIN.top +
      (SETTINGS.HEIGHT - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom) / 2,
    text: text,
  };
};
const titleYAxisRight = text => {
  return {
    x: SETTINGS.WIDTH - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right / 2,
    y:
      SETTINGS.MARGIN.top +
      (SETTINGS.HEIGHT - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom) / 2,
    text: text,
    rotate: 90,
  };
};

const YAxisLeftChartPE = ConstChart.setConfigYAxis(
  'left',
  'left',
  yGrid,
  titleYAxisLeft('cashDividend.titleLeftPE'),
);
const XAxis = { axisAt: 'bottom', orient: 'bottom' };
const seriesBarChartPE = [
  ConstChart.setConfigBarSeries(
    'ratioValue',
    SETTINGS.CORLOR_BAR,
    SETTINGS.CORLOR_BAR,
  ),
];
// end config barChart

// start config lineChart

const yExtentsRight = ['ratioValueYield'];
const YAxisRightChartPE = ConstChart.setConfigYAxis(
  'right',
  'right',
  {},
  titleYAxisRight('cashDividend.titleRightPE'),
);
const typeCircleMarker = {
  r: 1,
  fill: SETTINGS.CORLOR_CIRCLEMARKERLINE,
  opacity: 1,
  strokeWidth: 0,
};
const seriesLineChartPE = [
  ConstChart.setConfigLineSeries(
    'ratioValueYield',
    SETTINGS.CORLOR_CIRCLEMARKERLINE,
    ConstChart.CircleMarker,
    typeCircleMarker,
  ),
];

const chartPEItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartPE,
    yExtents,
    YAxisLeftChartPE,
    XAxis,
    seriesBarChartPE,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRight,
    YAxisRightChartPE,
    null,
    seriesLineChartPE,
  ),
];

const configChartPE = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartPE,
  titleChartPE,
  chartPEItems,
  null,
  null,
);

// titleLeftPE: 'P/E Ratio',
// titleRightPE: 'Div. Yield(%)',
// titleLeftDE: 'Earning & Div. (VND)',
// titleRightDE: 'Div. Payout Ratio(%)',

//end Chart PE

//start chartDE

// config legend chart
const listLegendChartDE = [
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'cashDividend.EPS',
    SETTINGS.CORLOR_GROUP,
  ),
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'cashDividend.DPS',
    SETTINGS.CORLOR_BAR,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'cashDividend.dividendPayout',
    SETTINGS.CORLOR_CIRCLEMARKERLINE,
  ),
];

// config canvas
const xAccessorDE = d => {
  return d.yearReport;
};
const xExtentsDE = 'yearReport';
const marginDE = { left: 110, right: 80, top: 10, bottom: 30 };
const titleChartDE = {
  title: 'cashDividend.titleDE',
};

// config groupChart
const HoverTooltipChartDE = ConstChart.hoverTooltipFunc(null, null, null, [
  ConstChart.setContentTooltip(
    '',
    'cashDividend.EPSTooltip',
    d => formatTextFloat(d.ratioValue),
    '#000',
  ),
  ConstChart.setContentTooltip(
    '',
    'cashDividend.DPSTooltip',
    d => formatTextFloat(d.dpsValue),
    '#000',
  ),
  ConstChart.setContentTooltip(
    '',
    'cashDividend.dividendPayoutTooltip',
    d => formatPercent(d.dividendPayoutValue) + '%',
    '#000',
  ),
]);

const yExtentsDE = ['ratioValue', 'dpsValue'];
const YAxisLeftChartDE = ConstChart.setConfigYAxis(
  'left',
  'left',
  yGrid,
  titleYAxisLeft('cashDividend.titleLeftDE'),
);
const YAxisRightChartDE = ConstChart.setConfigYAxis(
  'right',
  'right',
  {},
  titleYAxisRight('cashDividend.titleRightDE'),
);
const seriesGroupChart = [
  {
    type: ConstChart.GROUPCHART,
    yAccessor: [d => d.ratioValue, d => d.dpsValue],
    fill: [SETTINGS.CORLOR_GROUP, SETTINGS.CORLOR_BAR],
    spaceBetweenBar: 5,
  },
];

const yExtentsRightDE = ['dividendPayoutValue'];

const seriesLineChartDE = [
  ConstChart.setConfigLineSeries(
    'dividendPayoutValue',
    SETTINGS.CORLOR_CIRCLEMARKERLINE,
    ConstChart.CircleMarker,
    typeCircleMarker,
  ),
];

const chartDEItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartDE,
    yExtentsDE,
    YAxisLeftChartDE,
    XAxis,
    seriesGroupChart,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightDE,
    YAxisRightChartDE,
    null,
    seriesLineChartDE,
  ),
];

const configChartDE = ConstChart.configChartFunc(
  xAccessorDE,
  xExtentsDE,
  marginDE,
  SETTINGS.HEIGHT,
  listLegendChartDE,
  titleChartDE,
  chartDEItems,
);

const listColumn = {
  year: 'year',
  jan: 'jan',
  feb: 'feb',
  mar: 'mar',
  apr: 'apr',
  may: 'may',
  jun: 'jun',
  jul: 'jul',
  aug: 'aug',
  sep: 'sep',
  oct: 'oct',
  nov: 'nov',
  dec: 'dec',
  total: 'total',
  yield: 'yield',
};

const listColumnEx = {
  YEAR: 'year',
  JAN: 'jan',
  FEB: 'feb',
  MAR: 'mar',
  APR: 'apr',
  MAY: 'may',
  JUN: 'jun',
  JUL: 'jul',
  AUG: 'aug',
  SEP: 'sep',
  OCT: 'oct',
  NOV: 'nov',
  DEC: 'dec',
  TOTAL: 'total',
  YIELD: 'yield',
};

export default {
  configChartPE,
  configChartDE,
  SETTINGS,
  codeDefault: 'AAA',
  displayDefault: 'AAA',
  companyDefault: 'An Phat Bioplastics / HOSE',
  typeCodeDefault: 'code',
  listTicker: {
    ORGAN_CODE: 'organCode',
    TICKER: 'ticker',
    ORGAN_SHORT_NAME: 'organShortName',
    COM_GROUP_CODE: 'comGroupCode',
  },
  yearReport: 'yearReport',
  exrightYear: 'exrightYear',
  listColumn,
  listColumnEx,
  numberOfColumns: 2,
};
