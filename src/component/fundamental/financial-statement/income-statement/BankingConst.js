import { THEMES } from '../../../../configs/LayoutConfig';
import { formatTextFloat } from '../../../helpers/Text';
import ConstChart from '../../../common/mixChart/Const';
import { LEVELS } from '../Const';

export const incomeStatementBankingMapping = {
  interestAndSimilarIncome: 'isb25',
  interestAndSimilarExpenses: 'isb26',

  netInterestIncome: 'isb27',

  netFeeAndCommissionIncome: 'isb30',
  feesAndCommissionIncome: 'isb28',
  feesAndCommissionExpenses: 'isb29',

  netGainLossFromForeignCurrencyAndGoldDealings: 'isb31',

  netGainLossFromTradingOfTradingSecurities: 'isb32',

  netGainLossFromDisposalOfInvestmentSecurities: 'isb33',

  netOtherIncomeExpenses: 'isb36',
  otherIncomes: 'isb34',
  otherExpenses: 'isb35',

  dividendsIncome: 'isb37',

  totalOperatingIncome: 'isb38',

  generalAndAdminExpenses: 'isb39',

  operatingProfitBeforeProvisionForCreditLosses: 'isb40',

  provisionForCreditLosses: 'isb41',

  profitBeforeTax: 'isa16',

  corporateIncomeTax: 'isa19',
  corporateIncomeTaxCurrent: 'isa17',
  corporateIncomeTaxDeferred: 'isa18',

  netProfitForTheYear: 'isa20',

  minorityInterest: 'isa21',

  attributableToParentCompany: 'isa22',

  basicEarningsPerShareForProfitAttributableToTheEquityHolders: 'isa23',
};

export const incomeStatementBankingRows = Object.keys(
  incomeStatementBankingMapping,
).map(key => {
  const defaultItem = {
    id: incomeStatementBankingMapping[key],
    i18nKey: key,
    level: LEVELS.PARENT,
  };

  if (
    incomeStatementBankingMapping[key] ===
    incomeStatementBankingMapping.netFeeAndCommissionIncome
  ) {
    return {
      ...defaultItem,
      children: [
        incomeStatementBankingMapping.feesAndCommissionIncome,
        incomeStatementBankingMapping.feesAndCommissionExpenses,
      ],
    };
  }

  if (
    incomeStatementBankingMapping[key] ===
    incomeStatementBankingMapping.netOtherIncomeExpenses
  ) {
    return {
      ...defaultItem,
      children: [
        incomeStatementBankingMapping.otherIncomes,
        incomeStatementBankingMapping.otherExpenses,
      ],
    };
  }

  if (
    incomeStatementBankingMapping[key] ===
    incomeStatementBankingMapping.corporateIncomeTax
  ) {
    return {
      ...defaultItem,
      children: [
        incomeStatementBankingMapping.corporateIncomeTaxCurrent,
        incomeStatementBankingMapping.corporateIncomeTaxDeferred,
      ],
    };
  }

  if (
    [
      incomeStatementBankingMapping.feesAndCommissionIncome,
      incomeStatementBankingMapping.feesAndCommissionExpenses,
      incomeStatementBankingMapping.otherIncomes,
      incomeStatementBankingMapping.otherExpenses,
      incomeStatementBankingMapping.corporateIncomeTaxCurrent,
      incomeStatementBankingMapping.corporateIncomeTaxDeferred,
    ].includes(incomeStatementBankingMapping[key])
  ) {
    return {
      ...defaultItem,
      level: LEVELS.CHILD,
    };
  }

  return defaultItem;
});

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
  COLUMN_FOUR_COLOR: '#f5d0c5',
  COLUMN_FIVE_COLOR: '#ee6352',
  COLOR_CIRCLE_MARKER_LINE: '#f5d0c5',
};

export const LIGHT_SETTINGS = {
  ...COMMON_SETTINGS,
  COLUMN_ONE_COLOR: '#3581b8',
  COLUMN_TWO_COLOR: '#00c6ba',
  COLUMN_THREE_COLOR: '#f8bc06',
  COLUMN_FOUR_COLOR: '#f5d0c5',
  COLUMN_FIVE_COLOR: '#ee6352',
  COLOR_CIRCLE_MARKER_LINE: '#f5d0c5',
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

const yExtents = [
  'netInterestIncome',
  'netFeeAndCommissionIncome',
  'operatingIncome',
  'provisionForCreditLoses',
  'netProfitAfterTax',
];
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
      yAccessor: [
        d => d.netInterestIncome,
        d => d.operatingIncome,
        d => d.netProfitAfterTax,
      ],
      fill: [COLUMN_ONE_COLOR, COLUMN_TWO_COLOR, COLUMN_THREE_COLOR],
    },
  ];
};

const typeCircleMarker = theme => ({
  r: 1,
  fill: (theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS).COLUMN_FOUR_COLOR,
  opacity: 1,
  strokeWidth: 0,
});

const provisionForCreditLosesCircleMarker = theme => ({
  r: 1,
  fill: (theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS).COLUMN_FIVE_COLOR,
  opacity: 1,
  strokeWidth: 0,
});

const seriesLineChart = theme => {
  const { COLUMN_FOUR_COLOR, COLUMN_FIVE_COLOR } =
    theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS;
  return [
    ConstChart.setConfigLineSeries(
      'netFeeAndCommissionIncome',
      COLUMN_FOUR_COLOR,
      ConstChart.CircleMarker,
      typeCircleMarker(theme),
    ),
    ConstChart.setConfigLineSeries(
      'provisionForCreditLoses',
      COLUMN_FIVE_COLOR,
      ConstChart.CircleMarker,
      provisionForCreditLosesCircleMarker(theme),
    ),
  ];
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

const YAxisRightChart = ConstChart.setConfigYAxis(
  'right',
  'right',
  {},
  titleYAxisRight(''),
);

const yExtentsRight = ['netFeeAndCommissionIncome', 'provisionForCreditLoses'];

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
