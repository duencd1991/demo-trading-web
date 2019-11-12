import { THEMES } from '../../../../configs/LayoutConfig';
import { formatTextFloat } from '../../../helpers/Text';
import ConstChart from '../../../common/mixChart/Const';
import { LEVELS } from '../Const';

export const incomeStatementMapping = {
  sales: 'isa1',
  salesDeductions: 'isa2',
  netSales: 'isa3',
  costOfSales: 'isa4',
  grossProfit: 'isa5',
  financialIncome: 'isa6',
  financialExpenses: 'isa7',
  ofWhichInterestExpenses: 'isa8',
  GainLossFromJointVenturesFrom2015: 'isa15',
  sellingExpenses: 'isa9',
  generalAndAdminExpenses: 'isa10',

  operatingProfitLoss: 'isa11',

  netOtherIncomeExpenses: 'isa14',
  otherIncomes: 'isa12',
  otherExpenses: 'isa13',

  incomeFromInvestmentsInOtherEntities: 'isa102',

  netAccountingProfitLossBeforeTax: 'isa16',

  corporateIncomeTaxExpenses: 'isa19',
  corporateIncomeTaxCurrent: 'isa17',
  corporateIncomeTaxDeferred: 'isa18',

  netProfitLossAfterTax: 'isa20',
  minorityInterests: 'isa21',
  attributableToParentCompany: 'isa22',
  EPSBasis: 'isa23',
  EPSDiluted: 'isa24',
  netProfitMargin: 'rtq29',
};

export const incomeStatementRows = Object.keys(incomeStatementMapping).map(
  key => {
    const defaultItem = {
      id: incomeStatementMapping[key],
      i18nKey: key,
      level: LEVELS.PARENT,
    };

    if (
      incomeStatementMapping[key] === incomeStatementMapping.financialExpenses
    ) {
      return {
        ...defaultItem,
        children: [incomeStatementMapping.ofWhichInterestExpenses],
      };
    }

    if (
      incomeStatementMapping[key] === incomeStatementMapping.financialExpenses
    ) {
      return {
        ...defaultItem,
        children: [incomeStatementMapping.ofWhichInterestExpenses],
      };
    }

    if (
      incomeStatementMapping[key] ===
      incomeStatementMapping.netOtherIncomeExpenses
    ) {
      return {
        ...defaultItem,
        children: [
          incomeStatementMapping.otherIncomes,
          incomeStatementMapping.otherExpenses,
        ],
      };
    }

    if (
      incomeStatementMapping[key] ===
      incomeStatementMapping.corporateIncomeTaxExpenses
    ) {
      return {
        ...defaultItem,
        children: [
          incomeStatementMapping.corporateIncomeTaxCurrent,
          incomeStatementMapping.corporateIncomeTaxDeferred,
        ],
      };
    }

    if (
      [
        incomeStatementMapping.ofWhichInterestExpenses,
        incomeStatementMapping.otherExpenses,
        incomeStatementMapping.otherIncomes,
        incomeStatementMapping.corporateIncomeTaxCurrent,
        incomeStatementMapping.corporateIncomeTaxDeferred,
      ].includes(incomeStatementMapping[key])
    ) {
      return {
        id: incomeStatementMapping[key],
        i18nKey: key,
        level: LEVELS.CHILD,
      };
    }

    return defaultItem;
  },
);

const COMMON_SETTINGS = {
  HEIGHT: 120,
  WIDTH: 500,
  MARGIN: { left: 80, right: 80, top: 10, bottom: 30 },
  TEXT_COLOR: '#ffffff',
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
  BIG_SIZE: 20,
  KEY_CHART: 1,
  MIN_WIDTH: 500,
};

export const SETTINGS = {
  ...COMMON_SETTINGS,
  COLUMN_ONE_COLOR: '#3581b8',
  COLUMN_TWO_COLOR: '#47ccc7',
  COLUMN_THREE_COLOR: '#f1ffe7',
  COLOR_CIRCLE_MARKER_LINE: '#f5d0c5',
};

export const LIGHT_SETTINGS = {
  ...COMMON_SETTINGS,
  COLUMN_ONE_COLOR: '#3581b8',
  COLUMN_TWO_COLOR: '#00c6ba',
  COLUMN_THREE_COLOR: '#f8bc06',
  COLOR_CIRCLE_MARKER_LINE: '#ff7d56',
};

const xAccessor = d => d.time;
const xExtents = 'time';

const getHoverTooltipChart = tooltips =>
  ConstChart.hoverTooltipFunc(
    null,
    null,
    null,
    tooltips.map(tooltip => {
      return ConstChart.setContentTooltip(
        '',
        tooltip.i18nKey,
        d => {
          return { tooltipValue: formatTextFloat(d[tooltip.key]) };
        },
        '#000',
        true,
      );
    }),
  );

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

const yExtents = ['revenue', 'operatingProfit', 'netProfit'];
const YAxisLeftChart = ConstChart.setConfigYAxis(
  'left',
  'left',
  yGrid,
  titleYAxisLeft(''),
);

const XAxis = { axisAt: 'bottom', orient: 'bottom' };

const seriesGroupChart = theme => {
  const { COLUMN_ONE_COLOR, COLUMN_TWO_COLOR, COLUMN_THREE_COLOR } =
    theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS;
  return [
    {
      type: ConstChart.GROUPCHART,
      yAccessor: [d => d.revenue, d => d.operatingProfit, d => d.netProfit],
      fill: [COLUMN_ONE_COLOR, COLUMN_TWO_COLOR, COLUMN_THREE_COLOR],
    },
  ];
};

const yExtentsRight = ['netProfitMargin'];

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

const YAxisRightChart = {
  ...ConstChart.setConfigYAxis('right', 'right', {}, titleYAxisRight('')),
  tickFormat: d => `${formatTextFloat(d, 0)}%`,
};

const typeCircleMarker = theme => ({
  r: 1,
  fill:
    theme === THEMES.DARK
      ? SETTINGS.COLOR_CIRCLE_MARKER_LINE
      : LIGHT_SETTINGS.COLOR_CIRCLE_MARKER_LINE,
  opacity: 1,
  strokeWidth: 0,
});

const seriesLineChart = theme => [
  ConstChart.setConfigLineSeries(
    'netProfitMargin',
    theme === THEMES.DARK
      ? SETTINGS.COLOR_CIRCLE_MARKER_LINE
      : LIGHT_SETTINGS.COLOR_CIRCLE_MARKER_LINE,
    ConstChart.CircleMarker,
    typeCircleMarker(theme),
  ),
];

const getChartItems = (tooltips, theme) => [
  ConstChart.setConfigChartItem(
    getHoverTooltipChart(tooltips),
    yExtents,
    YAxisLeftChart,
    XAxis,
    seriesGroupChart(theme),
  ),
  ConstChart.setConfigChartItem(
    null,
    yExtentsRight,
    YAxisRightChart,
    null,
    seriesLineChart(theme),
  ),
];

export const generateChartConfig = ({
  title,
  tooltips,
  listLegendChart,
  theme,
}) =>
  ConstChart.configChartFunc(
    xAccessor,
    xExtents,
    SETTINGS.MARGIN,
    SETTINGS.HEIGHT,
    listLegendChart,
    title,
    getChartItems(tooltips, theme),
  );
