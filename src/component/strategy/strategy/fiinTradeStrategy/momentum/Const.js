import ConstChart from '../../../../common/mixChart/Const';
import { formatTextFloat } from '../../../../helpers/Text';

const SETTINGS = {
  HEIGHT: 200,
  WIDTH: 500,
  MARGIN: { left: 80, right: 80, top: 0, bottom: 30 },
  TEXT_COLOR: '#ffffff',
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
  BIG_SIZE: 20,
  CORLOR_INVESTMENT: '#2965cc',
  CORLOR_VNINDEX: '#f3ffe2',
  CORLOR_VNINDEX_LIGHT: '#f8bc06',
  KEY_CHART: 1,
  MIN_WIDTH: 500,
};

// start config chartMomentum

//config legend chart
const listLegendChartMomentum = [
  ConstChart.setLegendConfig(
    ConstChart.Line,
    'strategy.titleLegendChartMomentum',
    SETTINGS.CORLOR_INVESTMENT,
  ),
  ConstChart.setLegendConfig(
    ConstChart.Line,
    'strategy.vnIndex',
    SETTINGS.CORLOR_VNINDEX,
  ),
];

const listLegendChartLight = [
  ConstChart.setLegendConfig(
    ConstChart.Line,
    'strategy.titleLegendChartMomentum',
    SETTINGS.CORLOR_INVESTMENT,
  ),
  ConstChart.setLegendConfig(
    ConstChart.Line,
    'strategy.vnIndex',
    SETTINGS.CORLOR_VNINDEX_LIGHT,
  ),
];

// config canvas
const xAccessor = d => {
  return d.month;
};
const xExtents = 'month';
const margin = { left: 80, right: 80, top: 10, bottom: 30 };
const titleChartMomentum = {
  title: 'strategy.titleChart',
  underTitle: 'strategy.value.calculated',
  isCheck: true,
};

// config barChart
const HoverTooltipChartMomentum = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'strategy.tooltipMomentum',
      d => formatTextFloat(d.value),
      '#000',
    ),
    ConstChart.setContentTooltip(
      '',
      'strategy.tooltipVnIndex',
      d => formatTextFloat(d.valueIndex),
      '#000',
    ),
  ],
);

const yExtents = ['y'];

const yGrid = {
  innerTickSize:
    -1 * (SETTINGS.WIDTH - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right),
  tickStrokeDasharray: 'Solid',
  tickStrokeOpacity: 0.2,
  tickStrokeWidth: 1,
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

const YAxisLeftChartMomentum = ConstChart.setConfigYAxis(
  'left',
  'left',
  yGrid,
  titleYAxisLeft('strategy.million'),
);
const XAxis = { axisAt: 'bottom', orient: 'bottom' };

// start config lineChart

const seriesLineChartMomentum = [
  ConstChart.setConfigLineSeries(
    'value',
    SETTINGS.CORLOR_INVESTMENT,
    null,
    null,
  ),
];
const seriesLineIndex = [
  ConstChart.setConfigLineSeries(
    'valueIndex',
    SETTINGS.CORLOR_VNINDEX,
    null,
    null,
  ),
];

const seriesLineIndexLight = [
  ConstChart.setConfigLineSeries(
    'valueIndex',
    SETTINGS.CORLOR_VNINDEX_LIGHT,
    null,
    null,
  ),
];

const chartMomentumItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartMomentum,
    yExtents,
    YAxisLeftChartMomentum,
    XAxis,
    seriesLineChartMomentum,
  ),
  ConstChart.setConfigChartItem(
    HoverTooltipChartMomentum,
    yExtents,
    YAxisLeftChartMomentum,
    XAxis,
    seriesLineIndex,
  ),
];
const chartMomentumItemsLight = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartMomentum,
    yExtents,
    YAxisLeftChartMomentum,
    XAxis,
    seriesLineChartMomentum,
  ),
  ConstChart.setConfigChartItem(
    HoverTooltipChartMomentum,
    yExtents,
    YAxisLeftChartMomentum,
    XAxis,
    seriesLineIndexLight,
  ),
];

const configChart = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartMomentum,
  titleChartMomentum,
  chartMomentumItems,
  null,
  null,
);

const configChartLight = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartLight,
  titleChartMomentum,
  chartMomentumItemsLight,
  null,
  null,
);

//end Chart Momentum

//start chartDE

export default {
  configChart,
  configChartLight,
  value: {
    timeRange: 'TIME RANGE',
    stockePicks: 'STOCK PICKS',
    vnIndex: 'VN_INDEX',
  },
  industry: 'industry',
  group: 'group',
};
