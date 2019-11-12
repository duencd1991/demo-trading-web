import { THEMES } from '../../../../configs/LayoutConfig';
import { formatTextFloat } from '../../../helpers/Text';
import ConstChart from '../../../common/mixChart/Const';
import { LEVELS } from '../Const';

export const mapping = {
  netCashInflowsFromOperatingActivities: 'cfa18',
  operatingProfitLossBeforeChangesInWorkingCapital: 'cfa9',
  netProfitBeforeTax: 'cfa1',
  depreciationAndAmortisation: 'cfa2',
  amortisationOfGoodwill: 'cfa103',
  provisions: 'cfa3',
  unrealisedForeignExchangeGainLoss: 'cfa4',
  profitLossFromLiquidatingFixedAssets: 'cfa5',
  profitLossFromInvestingActivities: 'cfa6',
  interestExpense: 'cfa7',
  interestIncomeAndDividend: 'cfa8',
  otherAdjustments: 'cfa104',
  increaseDecreaseInReceivables: 'cfa10',
  increaseDecreaseInventories: 'cfa11',
  increaseDecreasePayable: 'cfa12',
  increaseDecreasePrepaidExpenses: 'cfa13',
  increaseDecreaseTradingSecurities: 'cfa105',
  interestPaid: 'cfa14',
  corporateIncomeTaxPaid: 'cfa15',
  otherReceiptsFromOperatingActivities: 'cfa16',
  otherPaymentsOnOperatingActivities: 'cfa17',

  netCashInflowsOutflowsFromInvestingActivities: 'cfa26',
  purchasesOfFixedAssetsAndOtherLongTermAssets: 'cfa19',
  proceedsFromDisposalOfFixedAssets: 'cfa20',
  loansGrantedPurchasesOfDebtInstruments: 'cfa21',
  collectionOfLoansProceedsFromSalesOfDebtsInstruments: 'cfa22',
  investmentsInOtherEntities: 'cfa23',
  proceedsFromDivestmentInOtherEntities: 'cfa24',
  dividendsAndInterestReceived: 'cfa25',

  netCashInflowsOutflowsFromFinancingActivities: 'cfa34',
  proceedsFromIssueOfShares: 'cfa27',
  paymentsForShareReturnsAndRepurchases: 'cfa28',
  proceedsFromBorrowings: 'cfa29',
  repaymentOfBorrowings: 'cfa30',
  financeLeasePrincipalPayments: 'cfa31',
  dividendsPaid: 'cfa32',
  interestsDividendsProfitsReceived: 'cfa33',

  netIncreaseInCashAndCashEquivalents: 'cfa35',
  cashAndCashEquivalentsAtTheBeginningOPeriod: 'cfa36',
  effectOfForeignExchangeDifferences: 'cfa37',
  cashAndCashEquivalentsAtTheEndOfPeriod: 'cfa38',
};

export const cashFlowStatementRows = Object.keys(mapping).map(key => {
  const defaultItem = {
    id: mapping[key],
    i18nKey: key,
    level: LEVELS.PARENT,
  };

  if (mapping[key] === mapping.netCashInflowsFromOperatingActivities) {
    return {
      ...defaultItem,
      children: [
        mapping.operatingProfitLossBeforeChangesInWorkingCapital,
        mapping.increaseDecreaseInReceivables,
        mapping.increaseDecreaseInventories,
        mapping.increaseDecreasePayable,
        mapping.increaseDecreasePrepaidExpenses,
        mapping.increaseDecreaseTradingSecurities,
        mapping.interestPaid,
        mapping.corporateIncomeTaxPaid,
        mapping.otherReceiptsFromOperatingActivities,
        mapping.otherPaymentsOnOperatingActivities,
      ],
    };
  }

  if (
    mapping[key] === mapping.operatingProfitLossBeforeChangesInWorkingCapital
  ) {
    return {
      ...defaultItem,
      level: LEVELS.CHILD,
      children: [
        mapping.netProfitBeforeTax,
        mapping.depreciationAndAmortisation,
        mapping.amortisationOfGoodwill,
        mapping.provisions,
        mapping.unrealisedForeignExchangeGainLoss,
        mapping.profitLossFromLiquidatingFixedAssets,
        mapping.profitLossFromInvestingActivities,
        mapping.interestExpense,
        mapping.interestIncomeAndDividend,
        mapping.otherAdjustments,
      ],
    };
  }

  if (
    [
      mapping.netProfitBeforeTax,
      mapping.depreciationAndAmortisation,
      mapping.amortisationOfGoodwill,
      mapping.provisions,
      mapping.unrealisedForeignExchangeGainLoss,
      mapping.profitLossFromLiquidatingFixedAssets,
      mapping.profitLossFromInvestingActivities,
      mapping.interestExpense,
      mapping.interestIncomeAndDividend,
      mapping.otherAdjustments,
    ].includes(mapping[key])
  ) {
    return {
      ...defaultItem,
      level: LEVELS.THREE,
    };
  }

  if (mapping[key] === mapping.netCashInflowsOutflowsFromInvestingActivities) {
    return {
      ...defaultItem,
      children: [
        mapping.purchasesOfFixedAssetsAndOtherLongTermAssets,
        mapping.proceedsFromDisposalOfFixedAssets,
        mapping.loansGrantedPurchasesOfDebtInstruments,
        mapping.collectionOfLoansProceedsFromSalesOfDebtsInstruments,
        mapping.investmentsInOtherEntities,
        mapping.proceedsFromDivestmentInOtherEntities,
        mapping.dividendsAndInterestReceived,
      ],
    };
  }

  if (mapping[key] === mapping.netCashInflowsOutflowsFromFinancingActivities) {
    return {
      ...defaultItem,
      children: [
        mapping.proceedsFromIssueOfShares,
        mapping.paymentsForShareReturnsAndRepurchases,
        mapping.proceedsFromBorrowings,
        mapping.repaymentOfBorrowings,
        mapping.financeLeasePrincipalPayments,
        mapping.dividendsPaid,
        mapping.interestsDividendsProfitsReceived,
      ],
    };
  }

  if (
    [
      mapping.netIncreaseInCashAndCashEquivalents,
      mapping.cashAndCashEquivalentsAtTheBeginningOPeriod,
      mapping.effectOfForeignExchangeDifferences,
      mapping.cashAndCashEquivalentsAtTheEndOfPeriod,
    ].includes(mapping[key])
  ) {
    return defaultItem;
  }

  return {
    ...defaultItem,
    level: LEVELS.CHILD,
  };
});

const COMMON_SETTINGS = {
  HEIGHT: 120,
  WIDTH: 500,
  MARGIN: { left: 200, right: 80, top: 0, bottom: 30 },
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
const margin = { left: 80, right: 80, top: 10, bottom: 30 };

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

const yExtents = ['CFFromOperating', 'CFFromInvesting', 'CFFromFinancing'];
const YAxisLeftChart = ConstChart.setConfigYAxis(
  'left',
  'left',
  yGrid,
  titleYAxisLeft('financialStatement.yAxisLeftChartTitle'),
);

const XAxis = { axisAt: 'bottom', orient: 'bottom' };

const seriesGroupChart = theme => {
  const { COLUMN_ONE_COLOR, COLUMN_TWO_COLOR, COLUMN_THREE_COLOR } =
    theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS;
  return [
    {
      type: ConstChart.GROUPCHART,
      yAccessor: [
        d => d.CFFromOperating,
        d => d.CFFromInvesting,
        d => d.CFFromFinancing,
      ],
      fill: [COLUMN_ONE_COLOR, COLUMN_TWO_COLOR, COLUMN_THREE_COLOR],
    },
  ];
};

const yExtentsRight = ['cashEquivalentsEnding'];

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

const typeCircleMarker = {
  r: 1,
  fill: SETTINGS.COLOR_CIRCLE_MARKER_LINE,
  opacity: 1,
  strokeWidth: 0,
};

const seriesLineChart = theme => [
  ConstChart.setConfigLineSeries(
    'cashEquivalentsEnding',
    (theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS)
      .COLOR_CIRCLE_MARKER_LINE,
    ConstChart.CircleMarker,
    typeCircleMarker,
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
    margin,
    SETTINGS.HEIGHT,
    listLegendChart,
    title,
    getChartItems(tooltips, theme),
  );
