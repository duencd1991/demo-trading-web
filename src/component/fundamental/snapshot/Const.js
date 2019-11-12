import ConstChart from '../../common/mixChart/Const';
import { formatTextFloat } from '../../helpers/Text';
import moment from 'moment';
import { format } from 'd3-format';

const SETTINGS = {
  HEIGHT: 250,
  WIDTH: 400,
  MARGIN: { left: 80, right: 80, top: 0, bottom: 20 },
  TEXT_COLOR: '#ffffff',
  TEXT_COLOR_TOOLTIP: '#000',
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
  BIG_SIZE: 20,
  CHART_INDEX: {
    COLOR: '#47c3ff',
    HEIGHT: 300,
  },
  CHART_RATE: {
    COLOR: '#facc5c',
    HEIGHT: 300,
  },
  KEY_CHART: 1,
  MIN_WIDTH: 500,
  timeMap: {
    QUARTERLY: 'timeTab.quarterly',
    YEARLY: 'timeTab.yearly',
  },
  formatBillion: 'formatBillion',
  formatMilliion: 'formatMilliion',
  formatTextFloat: 'formatTextFloat',
  formatTextFloat0: 'formatTextFloat0',
  formatPercent: 'formatPercent',
  isYRange: 'isYRange',
};
const marginsExport = {
  top: 80,
  bottom: 16,
  left: 20,
  leftChild: 32,
};

const exportConfigs = {
  page: {
    width: 928,
    height: 1306,
  },
  listPromise: {
    data: [
      {
        isId: false,
        className: '.headerAndFooterPdf',
        config: {
          x: 0,
          y: 0,
          width: 928,
          height: 1306,
        },
      },
    ],
  },
  listConfigs: {
    height: 866,
    top: 80,
    data: [
      {
        isId: true,
        idName: '#search-score',
        config: {
          x: marginsExport.left,
          y: marginsExport.bottom,
          width: 455,
          height: 60,
        },
      },
      {
        isId: false,
        className: '.fa-top-content .notifications-wrapper',
        config: {
          x: 491,
          y: marginsExport.bottom,
          width: 241,
          height: 60,
        },
      },
      {
        isId: false,
        className: '.snapShotTable-Chart',
        config: {
          x: marginsExport.leftChild,
          y: marginsExport.bottom + 92,
          width: 500,
          height: 180,
        },
      },
      {
        isId: false,
        className: '.snapShotTable-Infor',
        config: {
          x: 548,
          y: marginsExport.bottom + 92,
          width: 349,
          height: 180,
        },
      },
      {
        isId: false,
        className: '.snapShot-titleFinancialPer',
        config: {
          x: marginsExport.leftChild,
          y: marginsExport.bottom + 307,
          width: 509,
          height: 15,
        },
      },
      {
        isId: false,
        className: '.snapShot-FinancialPer-tab',
        config: {
          x: 727,
          y: marginsExport.bottom + 307,
          width: 160,
          height: 42,
        },
      },
      {
        isId: false,
        isMultiChild: true,
        numberChildInRow: 3,
        className: '.mix-chart',
        config: {
          x: marginsExport.leftChild,
          y: marginsExport.bottom + 341,
          width: 252,
          height: 216,
          paddingBetweenChild: 50,
        },
      },
    ],
  },

  listRoundRect: [
    {
      strokeColor: '#969696',
      radius: 10,
      x: 16,
      y: 172,
      width: 896,
      height: 733,
      isFill: false,
      isStroke: true,
    },
  ],
  listLines: [
    {
      strokeColor: '#969696',
      x1: 16,
      y1: 391,
      x2: 912,
      y2: 391,
    },
  ],
};

const xAccessor = d => {
  return d.category;
};
const xExtents = 'category';
const margin = { left: 80, right: 80, top: 10, bottom: 30 };
const eventSynchTooltipName = 'snapshot_' + moment().unix();
const yGrid = {
  innerTickSize:
    -1 * (SETTINGS.WIDTH - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right),
  tickStrokeDasharray: 'Solid',
  tickStrokeOpacity: 0.2,
  tickStrokeWidth: 2,
};
const colorSeries = {
  barChart: {
    fillColor: '#1d97ef',
    fillColorHover: '#f1ffe7',
    fillColorHoverLight: '#2b457d',
  },
  stackBarChart: {
    fillColor1: '#0060a6',
    fillColor2: '#1d97ef',
    fillColor3: '#47c3ff',
    hover: {
      fillColor1: '#f88634',
      fillColor2: '#facc5c',
      fillColor3: '#f1ffe7',
    },
    hoverLightMode: {
      fillColor1: '#2b457d',
      fillColor2: '#2c73e8',
      fillColor3: '#a2c2f7',
    },
  },
  lineChart: {
    squareFillColor: '#9deaef',
    triangleFillColor: '#ee6352',
    circleFillColor: '#f5d0c5',
  },
  lineChartLight: {
    squareFillColor: '#00c6ba',
    triangleFillColor: '#ee6352',
    circleFillColor: '#ffb7a2',
  },
};
const XAxis = {
  axisAt: 'bottom',
  orient: 'bottom',
};
const typeTriangleMarker = {
  width: 8,
  stroke: colorSeries.lineChart.triangleFillColor,
  fill: colorSeries.lineChart.triangleFillColor,
  fillLight: colorSeries.lineChartLight.triangleFillColor,
  opacity: 1,
  strokeWidth: 0,
};
const typeSquareMarker = {
  width: 6,
  stroke: colorSeries.lineChart.squareFillColor,
  fillLight: colorSeries.lineChartLight.squareFillColor,
  fill: colorSeries.lineChart.squareFillColor,
  opacity: 1,
  strokeWidth: 0,
};
const typeCircleMarker = {
  r: 1,
  fill: colorSeries.lineChart.circleFillColor,
  fillLight: colorSeries.lineChartLight.circleFillColor,
  opacity: 1,
  strokeWidth: 0,
};

const titleYAxisLeft = text => {
  return {
    x: -55,
    y:
      SETTINGS.MARGIN.top +
      (SETTINGS.HEIGHT - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom) / 2,
    text: text,
  };
};
const titleYAxisRight = text => {
  return {
    x: SETTINGS.WIDTH - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right * 0.6,
    y:
      SETTINGS.MARGIN.top +
      (SETTINGS.HEIGHT - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom) / 2,
    rotate: 90,
    text: text,
  };
};

//#region configChartRevenue
const titleChartRevenue = { title: 'snapShot.chartNonBank.chartRevenue.title' };
const YAxisChartRevenue = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartRevenue.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartRevenue = ConstChart.hoverTooltipFunc(null, null, null, [
  ConstChart.setContentTooltip(
    '',
    'snapShot.chartNonBank.chartRevenue.tooltipRevenue',
    d => [d.category, formatTextFloat(d.isa1)],
    SETTINGS.TEXT_COLOR_TOOLTIP,
  ),
  ConstChart.setContentTooltip(
    '',
    'snapShot.chartNonBank.chartProfit.tooltipGrossProfit',
    d => [d.category, formatTextFloat(d.rtq25)],
    SETTINGS.TEXT_COLOR_TOOLTIP,
  ),
]);
const seriesChartRevenue = [
  ConstChart.setConfigBarSeries(
    'isa1',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const yExtentsChartRevenue = ['isa1'];
const listLegendChartRevenue = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartNonBank.chartRevenue.legendRevenue',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartNonBank.chartProfit.legendGrossProfit',
    colorSeries.lineChart.circleFillColor,
  ),
];

const yExtentsRightChartRevenue = ['rtq25'];
const YAxisRightChartRevenue = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartNonBank.chartProfit.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartRevenue = [
  ConstChart.setConfigLineSeries(
    'rtq25',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];

const chartsRevenueItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartRevenue,
    yExtentsChartRevenue,
    YAxisChartRevenue,
    XAxis,
    seriesChartRevenue,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartRevenue,
    YAxisRightChartRevenue,
    null,
    seriesRightChartRevenue,
  ),
];

const configChartRevenue = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartRevenue,
  titleChartRevenue,
  chartsRevenueItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartRevenue

//#region configChartProfitability
const yExtentsLeftChartProfitability = ['isa22'];
const titleChartProfitability = {
  title: 'snapShot.chartNonBank.chartProfit.title',
};
const YAxisLeftChartProfitability = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartProfit.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartProfitability = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartProfit.tooltipProfitAfterTax',
      d => [d.category, formatTextFloat(d.isa22)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartProfit.tooltipGrossProfit',
      d => [d.category, formatTextFloat(d.rtq25)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);
const seriesLeftChartProfitability = [
  ConstChart.setConfigBarSeries(
    'isa22',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];

const yExtentsRightChartProfitability = ['rtq25'];
const YAxisRightChartProfitability = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartNonBank.chartProfit.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartProfitability = [
  ConstChart.setConfigLineSeries(
    'rtq25',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartProfitability = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartNonBank.chartProfit.legendProfitAfterTax',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartNonBank.chartProfit.legendGrossProfit',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsProfitabilityItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartProfitability,
    yExtentsLeftChartProfitability,
    YAxisLeftChartProfitability,
    XAxis,
    seriesLeftChartProfitability,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartProfitability,
    YAxisRightChartProfitability,
    null,
    seriesRightChartProfitability,
  ),
];

const configChartProfitability = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartProfitability,
  titleChartProfitability,
  chartsProfitabilityItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartProfitability

//#region configChartCashFlow
const titleChartCashFlow = {
  title: 'snapShot.chartNonBank.chartCashFlow.title',
};
const YAxisChartCashFlow = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartCashFlow.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartCashFlow = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartCashFlow.tooltipCFO',
      d => [d.category, formatTextFloat(d.cfa18)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartCashFlow.tooltipNCFF',
      d => [d.category, formatTextFloat(d.cfa26)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartCashFlow.tooltipNCFI',
      d => [d.category, formatTextFloat(d.cfa34)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);

const seriesChartCashFlow = [
  {
    type: ConstChart.StackedBarSeries,
    yAccessor: [d => d.cfa18, d => d.cfa26, d => d.cfa34],
    arrayColor: [
      colorSeries.stackBarChart.fillColor1,
      colorSeries.stackBarChart.fillColor2,
      colorSeries.stackBarChart.fillColor3,
    ],
    arrayColorHover: [
      colorSeries.stackBarChart.hover.fillColor1,
      colorSeries.stackBarChart.hover.fillColor2,
      colorSeries.stackBarChart.hover.fillColor3,
    ],
    arrayColorHoverLight: [
      colorSeries.stackBarChart.hoverLightMode.fillColor1,
      colorSeries.stackBarChart.hoverLightMode.fillColor2,
      colorSeries.stackBarChart.hoverLightMode.fillColor3,
    ],
    highlightOnHover: true,
  },
];
const yExtentsChartCashFlow = ['cfa18', 'cfa26', 'cfa34'];

const listLegendChartCashFlow = [
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartCashFlow.legendCFO',
    colorSeries.stackBarChart.fillColor1,
  ),
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartCashFlow.legendNCFF',
    colorSeries.stackBarChart.fillColor2,
  ),
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartCashFlow.legendNCFI',
    colorSeries.stackBarChart.fillColor3,
  ),
];
const chartsCashFlowItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartCashFlow,
    yExtentsChartCashFlow,
    YAxisChartCashFlow,
    XAxis,
    seriesChartCashFlow,
    true,
  ),
];

const configChartCashFlow = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartCashFlow,
  titleChartCashFlow,
  chartsCashFlowItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartCashFlow
//#region configchartLiquidityRatio
const titleChartLiquidityRatio = {
  title: 'snapShot.chartNonBank.chartLiquidityRatio.title',
};
const YAxisChartLiquidityRatio = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartLiquidityRatio.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartLiquidityRatio = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartLiquidityRatio.tooltipCurrentRatio',
      d => [d.category, formatTextFloat(d.rtqt3)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartLiquidityRatio.tooltipQuickRatio',
      d => [d.category, formatTextFloat(d.rtq2)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartLiquidityRatio.tooltipCashRatio',
      d => [d.category, formatTextFloat(d.rtqt3)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);
const seriesChartLiquidityRatio = [
  ConstChart.setConfigLineSeries(
    'rtqt3',
    colorSeries.lineChart.squareFillColor,
    ConstChart.SquareMarker,
    typeSquareMarker,
    2,
    colorSeries.lineChartLight.squareFillColor,
    true,
  ),
  ConstChart.setConfigLineSeries(
    'rtq2',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
  ConstChart.setConfigLineSeries(
    'rtqt3',
    colorSeries.lineChart.circleFillColor,
    ConstChart.TriangleMarker,
    typeTriangleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const yExtentsChartLiquidityRatio = ['rtqt3', 'rtq2', 'rtqt3'];
const listLegendChartLiquidityRatio = [
  ConstChart.setLegendConfig(
    ConstChart.SQUAREMARKERLINE,
    'snapShot.chartNonBank.chartLiquidityRatio.legendCurrentRatio',
    colorSeries.lineChart.squareFillColor,
    colorSeries.lineChartLight.squareFillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartNonBank.chartLiquidityRatio.legendQuickRatio',
    colorSeries.lineChart.circleFillColor,
    colorSeries.lineChartLight.circleFillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.TRIANGLEMARKERLINE,
    'snapShot.chartNonBank.chartLiquidityRatio.legendCashRatio',
    colorSeries.lineChart.triangleFillColor,
    colorSeries.lineChartLight.triangleFillColor,
  ),
];
const chartsLiquidityRatioItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartLiquidityRatio,
    yExtentsChartLiquidityRatio,
    YAxisChartLiquidityRatio,
    XAxis,
    seriesChartLiquidityRatio,
  ),
];

const configChartLiquidityRatio = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartLiquidityRatio,
  titleChartLiquidityRatio,
  chartsLiquidityRatioItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartLiquidityRatio

//#region configChartTotal Asset
const titleChartTotalAsset = {
  title: 'snapShot.chartNonBank.chartTotalAssset.title',
};
const YAxisChartTotalAsset = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartTotalAssset.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartTotalAsset = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartTotalAssset.tooltipShortTermAsset',
      d => [d.category, formatTextFloat(d.bsa1)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartTotalAssset.tooltipLongTermAsset',
      d => [d.category, formatTextFloat(d.bsa23)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);

const seriesChartTotalAsset = [
  {
    type: ConstChart.StackedBarSeries,
    yAccessor: [d => d.bsa1, d => d.bsa23],
    arrayColor: [
      colorSeries.stackBarChart.fillColor1,
      colorSeries.stackBarChart.fillColor2,
    ],
    arrayColorHover: [
      colorSeries.stackBarChart.hover.fillColor2,
      colorSeries.stackBarChart.hover.fillColor3,
    ],
    arrayColorHoverLight: [
      colorSeries.stackBarChart.hoverLightMode.fillColor1,
      colorSeries.stackBarChart.hoverLightMode.fillColor2,
    ],
    highlightOnHover: true,
  },
];

const yExtentsChartTotalAsset = ['bsa1', 'bsa23'];

const listLegendChartTotalAsset = [
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartTotalAssset.legendShortTermAsset',
    colorSeries.stackBarChart.fillColor1,
  ),
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartTotalAssset.legendLongTermAsset',
    colorSeries.stackBarChart.fillColor2,
  ),
];
const chartsTotalAssetItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartTotalAsset,
    yExtentsChartTotalAsset,
    YAxisChartTotalAsset,
    XAxis,
    seriesChartTotalAsset,
    true,
  ),
];

const configChartTotalAsset = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartTotalAsset,
  titleChartTotalAsset,
  chartsTotalAssetItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartTotalAsset

//#region configChartTotalLiability
const yExtentsLeftChartTotalLiability = ['bsa54', 'bsa78'];
const titleChartTotalLiability = {
  title: 'snapShot.chartNonBank.chartTotalLiability.title',
};
const YAxisLeftChartTotalLiability = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartNonBank.chartTotalLiability.yAxis1Title'),
  ),
  tickFormat: format('.2s'),
};
const HoverTooltipChartTotalLiability = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartTotalLiability.tooltipLiabilities',
      d => [d.category, formatTextFloat(d.bsa54)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartNonBank.chartTotalLiability.tooltipEquityOwner',
      d => [d.category, formatTextFloat(d.bsa78)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);
const seriesLeftChartTotalLiability = [
  {
    type: ConstChart.StackedBarSeries,
    yAccessor: [d => d.bsa54, d => d.bsa78],
    arrayColor: [
      colorSeries.stackBarChart.fillColor1,
      colorSeries.stackBarChart.fillColor2,
    ],
    arrayColorHover: [
      colorSeries.stackBarChart.hover.fillColor2,
      colorSeries.stackBarChart.hover.fillColor3,
    ],
    arrayColorHoverLight: [
      colorSeries.stackBarChart.hoverLightMode.fillColor1,
      colorSeries.stackBarChart.hoverLightMode.fillColor2,
    ],
    highlightOnHover: true,
  },
];

const listLegendChartTotalLiability = [
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartTotalLiability.legendLiabilities',
    colorSeries.stackBarChart.fillColor1,
  ),
  ConstChart.setLegendConfig(
    ConstChart.GROUPCHART,
    'snapShot.chartNonBank.chartTotalLiability.legendEquityOwner',
    colorSeries.stackBarChart.fillColor2,
  ),
];
const chartsTotalLiabilityItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartTotalLiability,
    yExtentsLeftChartTotalLiability,
    YAxisLeftChartTotalLiability,
    XAxis,
    seriesLeftChartTotalLiability,
    true,
  ),
];
const configChartTotalLiability = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartTotalLiability,
  titleChartTotalLiability,
  chartsTotalLiabilityItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartTotalLiability

//#region configChartNetInterestIncome
const yExtentsLeftChartNetInterestIncome = ['isa27'];
const titleChartNetInterestIncome = {
  title: 'snapShot.chartBank.chartNetInterestIncome.title',
};
const YAxisLeftChartNetInterestIncome = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartNetInterestIncome.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const HoverTooltipChartNetInterestIncome = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartNetInterestIncome.tooltipNII',
      d => [d.category, formatTextFloat(d.isa27)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartNetInterestIncome.tooltipNIM',
      d => [d.category, formatTextFloat(d.rtq44)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);
const seriesLeftChartNetInterestIncome = [
  ConstChart.setConfigBarSeries(
    'isa27',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];

const yExtentsRightChartNetInterestIncome = ['rtq44'];
const YAxisRightChartNetInterestIncome = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartNetInterestIncome.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartNetInterestIncome = [
  ConstChart.setConfigLineSeries(
    'rtq44',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartNetInterestIncome = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartNetInterestIncome.legendNII',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartNetInterestIncome.legendNIM',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsNetInterestIncomeItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartNetInterestIncome,
    yExtentsLeftChartNetInterestIncome,
    YAxisLeftChartNetInterestIncome,
    XAxis,
    seriesLeftChartNetInterestIncome,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartNetInterestIncome,
    YAxisRightChartNetInterestIncome,
    null,
    seriesRightChartNetInterestIncome,
  ),
];

const configChartNetInterestIncome = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartNetInterestIncome,
  titleChartNetInterestIncome,
  chartsNetInterestIncomeItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartNetInterestIncome

//#region configChartNetProfit
const yExtentsLeftChartNetProfit = ['isa22'];
const titleChartNetProfit = {
  title: 'snapShot.chartBank.chartNetProfit.title',
};
const YAxisLeftChartNetProfit = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartNetProfit.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesLeftChartNetProfit = [
  ConstChart.setConfigBarSeries(
    'isa22',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const HoverTooltipChartNetProfit = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartNetProfit.tooltipNetProfit',
      d => [d.category, formatTextFloat(d.isa22)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartNetProfit.tooltipGrowth',
      d => [d.category, formatTextFloat(d.netProfitGrowth)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);

const yExtentsRightChartNetProfit = ['netProfitGrowth'];
const YAxisRightChartNetProfit = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartNetProfit.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartNetProfit = [
  ConstChart.setConfigLineSeries(
    'netProfitGrowth',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartNetProfit = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartNetProfit.legendNetProfit',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartNetProfit.legendGrowth',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsNetProfitItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartNetProfit,
    yExtentsLeftChartNetProfit,
    YAxisLeftChartNetProfit,
    XAxis,
    seriesLeftChartNetProfit,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartNetProfit,
    YAxisRightChartNetProfit,
    null,
    seriesRightChartNetProfit,
  ),
];

const configChartNetProfit = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartNetProfit,
  titleChartNetProfit,
  chartsNetProfitItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartNetProfit

//#region configChartBankTotalAsset
const yExtentsLeftChartBankTotalAsset = ['bsa53'];
const titleChartBankTotalAsset = {
  title: 'snapShot.chartBank.chartBankTotalAsset.title',
};
const YAxisLeftChartBankTotalAsset = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartBankTotalAsset.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesLeftChartBankTotalAsset = [
  ConstChart.setConfigBarSeries(
    'bsa53',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const HoverTooltipChartBankTotalAsset = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartBankTotalAsset.tooltipTotalAsset',
      d => [d.category, formatTextFloat(d.bsa53)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartBankTotalAsset.tooltipGrowth',
      d => [d.category, formatTextFloat(d.totalAssetGrowth)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);

const yExtentsRightChartBankTotalAsset = ['totalAssetGrowth'];
const YAxisRightChartBankTotalAsset = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartBankTotalAsset.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartBankTotalAsset = [
  ConstChart.setConfigLineSeries(
    'totalAssetGrowth',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartBankTotalAsset = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartBankTotalAsset.legendTotalAsset',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartBankTotalAsset.legendGrowth',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsBankTotalAssetItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartBankTotalAsset,
    yExtentsLeftChartBankTotalAsset,
    YAxisLeftChartBankTotalAsset,
    XAxis,
    seriesLeftChartBankTotalAsset,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartBankTotalAsset,
    YAxisRightChartBankTotalAsset,
    null,
    seriesRightChartBankTotalAsset,
  ),
];

const configChartBankTotalAsset = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartBankTotalAsset,
  titleChartBankTotalAsset,
  chartsBankTotalAssetItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartBankTotalAsset

//#region configChartBadDebt
const yExtentsLeftChartBadDebt = ['nob44'];
const titleChartBadDebt = { title: 'snapShot.chartBank.chartBadDebt.title' };
const YAxisLeftChartBadDebt = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartBadDebt.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesLeftChartBadDebt = [
  ConstChart.setConfigBarSeries(
    'nob44',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const HoverTooltipChartBadDebt = ConstChart.hoverTooltipFunc(null, null, null, [
  ConstChart.setContentTooltip(
    '',
    'snapShot.chartBank.chartBadDebt.tooltipBadDebtValue',
    d => [d.category, formatTextFloat(d.nob44)],
    SETTINGS.TEXT_COLOR_TOOLTIP,
  ),
  ConstChart.setContentTooltip(
    '',
    'snapShot.chartBank.chartBadDebt.tooltipBadDebtRatio',
    d => [d.category, formatTextFloat(d.rtq137)],
    SETTINGS.TEXT_COLOR_TOOLTIP,
  ),
]);

const yExtentsRightChartBadDebt = ['rtq137'];
const YAxisRightChartBadDebt = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartBadDebt.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartBadDebt = [
  ConstChart.setConfigLineSeries(
    'rtq137',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartBadDebt = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartBadDebt.legendBadDebtValue',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartBadDebt.legendBadDebtRatio',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsBadDebtItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartBadDebt,
    yExtentsLeftChartBadDebt,
    YAxisLeftChartBadDebt,
    XAxis,
    seriesLeftChartBadDebt,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartBadDebt,
    YAxisRightChartBadDebt,
    null,
    seriesRightChartBadDebt,
  ),
];

const configChartBadDebt = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartBadDebt,
  titleChartBadDebt,
  chartsBadDebtItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartBadDebt

//#region configChartTotalCredit
const yExtentsLeftChartTotalCredit = ['loans'];
const titleChartTotalCredit = {
  title: 'snapShot.chartBank.chartTotalCredit.title',
};
const YAxisLeftChartTotalCredit = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartTotalCredit.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesLeftChartTotalCredit = [
  ConstChart.setConfigBarSeries(
    'loans',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const HoverTooltipChartTotalCredit = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartTotalCredit.tooltipLoans',
      d => [d.category, formatTextFloat(d.loans)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartTotalCredit.tooltipGrowth',
      d => [d.category, formatTextFloat(d.loansGrowth)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);

const yExtentsRightChartTotalCredit = ['loansGrowth'];
const YAxisRightChartTotalCredit = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartTotalCredit.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartTotalCredit = [
  ConstChart.setConfigLineSeries(
    'loansGrowth',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartTotalCredit = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartTotalCredit.legendLoans',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartTotalCredit.legendGrowth',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsTotalCreditItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartTotalCredit,
    yExtentsLeftChartTotalCredit,
    YAxisLeftChartTotalCredit,
    XAxis,
    seriesLeftChartTotalCredit,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartTotalCredit,
    YAxisRightChartTotalCredit,
    null,
    seriesRightChartTotalCredit,
  ),
];

const configChartTotalCredit = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartTotalCredit,
  titleChartTotalCredit,
  chartsTotalCreditItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartTotalCredit

//#region configChartTotalDeposit
const yExtentsLeftChartTotalDeposit = ['deposit'];
const titleChartTotalDeposit = {
  title: 'snapShot.chartBank.chartTotalDeposit.title',
};
const YAxisLeftChartTotalDeposit = {
  ...ConstChart.setConfigYAxis(
    'left',
    'left',
    yGrid,
    titleYAxisLeft('snapShot.chartBank.chartTotalDeposit.yAxis1Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesLeftChartTotalDeposit = [
  ConstChart.setConfigBarSeries(
    'deposit',
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColor,
    colorSeries.barChart.fillColorHover,
    colorSeries.barChart.fillColorHoverLight,
    true,
  ),
];
const HoverTooltipChartTotalDeposit = ConstChart.hoverTooltipFunc(
  null,
  null,
  null,
  [
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartTotalDeposit.tooltipDeposit',
      d => [d.category, formatTextFloat(d.deposit)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
    ConstChart.setContentTooltip(
      '',
      'snapShot.chartBank.chartTotalDeposit.tooltipGrowth',
      d => [d.category, formatTextFloat(d.depositGrowth)],
      SETTINGS.TEXT_COLOR_TOOLTIP,
    ),
  ],
);
const yExtentsRightChartTotalDeposit = ['depositGrowth'];
const YAxisRightChartTotalDeposit = {
  ...ConstChart.setConfigYAxis(
    'right',
    'right',
    {},
    titleYAxisRight('snapShot.chartBank.chartTotalDeposit.yAxis2Title'),
  ),
  tickFormat: format('.2r'),
};
const seriesRightChartTotalDeposit = [
  ConstChart.setConfigLineSeries(
    'depositGrowth',
    colorSeries.lineChart.circleFillColor,
    ConstChart.CircleMarker,
    typeCircleMarker,
    2,
    colorSeries.lineChartLight.circleFillColor,
    true,
  ),
];
const listLegendChartTotalDeposit = [
  ConstChart.setLegendConfig(
    ConstChart.BARCHART,
    'snapShot.chartBank.chartTotalDeposit.legendDeposit',
    colorSeries.barChart.fillColor,
  ),
  ConstChart.setLegendConfig(
    ConstChart.CIRCLEMARKERLINE,
    'snapShot.chartBank.chartTotalDeposit.legendGrowth',
    colorSeries.lineChart.circleFillColor,
  ),
];
const chartsTotalDepositItems = [
  ConstChart.setConfigChartItem(
    HoverTooltipChartTotalDeposit,
    yExtentsLeftChartTotalDeposit,
    YAxisLeftChartTotalDeposit,
    XAxis,
    seriesLeftChartTotalDeposit,
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRightChartTotalDeposit,
    YAxisRightChartTotalDeposit,
    null,
    seriesRightChartTotalDeposit,
  ),
];

const configChartTotalDeposit = ConstChart.configChartFunc(
  xAccessor,
  xExtents,
  margin,
  SETTINGS.HEIGHT,
  listLegendChartTotalDeposit,
  titleChartTotalDeposit,
  chartsTotalDepositItems,
  true,
  eventSynchTooltipName,
);
//#endregion configChartTotalDeposit

const listItemInforLeftBank = [
  {
    name: 'snapShot.tableInfor.chartBank.marketCap',
    key: 'rtd11',
    unit: 'snapShot.tableInfor.unitBillion',
    type: SETTINGS.formatBillion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.AvgDailyVol',
    key: 'averageMatchVolume1Month',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.LastestDiv',
    key: 'valuePerShare',
    unit: '',
    type: '',
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.OutShare',
    key: 'outstandingShare',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.PE',
    key: 'rtd21',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.PB',
    key: 'rtd25',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.EPS',
    key: 'rtd14',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.EPSForward',
    key: 'rtd53',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
];
const listItemInforRightBank = [
  {
    name: 'snapShot.tableInfor.chartBank.FreeFloat',
    key: 'freeFloat',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.StateHoldings',
    key: 'statePercentage',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.ForeignHoldings',
    key: 'foreignerPercentage',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.MajorHoldings',
    key: 'majorHoldings',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.ROE',
    key: 'rtq12',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.ROA',
    key: 'rtq14',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.YRange',
    key: 'lowestPrice1Year',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: true,
    key2: 'highestPrice1Year',
  },
  { name: 'snapShot.tableInfor.chartBank.CEO', key: 'ceo', unit: '', type: '' },
];

const listItemInforRightNonBank = [
  {
    name: 'snapShot.tableInfor.chartNonBank.stateHolding',
    key: 'statePercentage',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.ForeignHoldings',
    key: 'foreignerPercentage',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.MajorHoldings',
    key: 'majorHoldings',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.ROE',
    key: 'rtq12',
    unit: 'snapShot.tableInfor.unitPercent',
    type: SETTINGS.formatPercent,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.DE',
    key: 'rtq10',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.YRange',
    key: 'lowestPrice1Year',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: true,
    key2: 'highestPrice1Year',
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.Competitors',
    key: 'competitors',
    unit: '',
    type: '',
  },
  {
    name: 'snapShot.tableInfor.chartNonBank.CEO',
    key: 'ceo',
    unit: '',
    type: '',
  },
];
const listItemInforLeftNonBank = [
  {
    name: 'snapShot.tableInfor.chartBank.marketCap',
    key: 'rtd11',
    unit: 'snapShot.tableInfor.unitBillion',
    type: SETTINGS.formatBillion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.AvgDailyVol',
    key: 'averageMatchVolume1Month',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.LastestDiv',
    key: 'valuePerShare',
    unit: '',
    type: '',
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.FreeFloat',
    key: 'freeFloat',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.OutShare',
    key: 'outstandingShare',
    unit: 'snapShot.tableInfor.unitMillion',
    type: SETTINGS.formatMilliion,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.PE',
    key: 'rtd21',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.EPS',
    key: 'rtd14',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
  {
    name: 'snapShot.tableInfor.chartBank.EPSForward',
    key: 'rtd53',
    unit: '',
    type: SETTINGS.formatTextFloat,
    isYRange: false,
  },
];
const listItemBank = {
  listItemInforLeft: listItemInforLeftBank,
  listItemInforRight: listItemInforRightBank,
};
const listItemNonBank = {
  listItemInforLeft: listItemInforLeftNonBank,
  listItemInforRight: listItemInforRightNonBank,
};

const listBarChartNonBanking = [
  { configChart: configChartRevenue },
  { configChart: configChartProfitability },
  { configChart: configChartCashFlow },
  { configChart: configChartLiquidityRatio },
  { configChart: configChartTotalAsset },
  { configChart: configChartTotalLiability },
];
const listBarChartBanking = [
  { configChart: configChartNetInterestIncome },
  { configChart: configChartNetProfit },
  { configChart: configChartBankTotalAsset },
  { configChart: configChartBadDebt },
  { configChart: configChartTotalCredit },
  { configChart: configChartTotalDeposit },
];
const listBarChart = {
  listBarChartNonBanking: listBarChartNonBanking,
  listBarChartBanking: listBarChartBanking,
};

const timeRange = {
  '1D': 'OneDay', // ONE_DAY
  '1W': 'OneWeek', // ONE_WEEK
  '1M': 'OneMonth', // ONE_MONTH
  '3M': 'ThreeMonths', // THREE_MONTHS
  '6M': 'SixMonths', // SIX_MONTHS
  YTD: 'YearToDate', // YEAR_To_DATE
  '1Y': 'OneYear', // ONE_YEAR
  '3Y': 'ThreeYears', // THREE_YEARS
  '5Y': 'FiveYears', // FIVE_YEARS
  // 'REALTIME': 0, // REALTIME
};

export default {
  listBarChart,
  listItemBank,
  listItemNonBank,
  exportConfigs,
  SETTINGS,
  DEFAULT_CODE: 'AAA',
  DEFAULT_CODE_NAME: 'An Phat Plastic',
  DEFAULT_EXCHANGE: 'HOSE',
  timeRange,
};
