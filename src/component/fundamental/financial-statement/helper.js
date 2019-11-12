import {
  balanceSheetBankingRows,
  balanceSheetChartBankingTitles,
  balanceSheetChartTitles,
  balanceSheetMapping,
  balanceSheetMappingBanking,
  balanceSheetRows,
} from './balance-sheeet/Const';
import { cashFlowStatementBankingRows } from './cash-flow-statement/BankingConst';
import { cashFlowStatementRows } from './cash-flow-statement/Const';
import { TYPES } from './Const';
import { incomeStatementBankingRows } from './income-statement/BankingConst';
import {
  incomeStatementMapping,
  incomeStatementRows,
} from './income-statement/Const';

const getKey = item => `${item.quarterReport}_${item.yearReport}`;

const getNonBankingData = item => {
  const otherAssets =
    item[balanceSheetMapping.totalAssets] -
    item[balanceSheetMapping.currentAssets] -
    item[balanceSheetMapping.tangibleFixedAssets] -
    item[balanceSheetMapping.intangibleFixedAssets];

  return {
    [getKey(item)]: {
      otherAssets,
      currentAssets: item[balanceSheetMapping.currentAssets],
      tangibleFixedAssets: item[balanceSheetMapping.tangibleFixedAssets],
      intangibleFixedAssets: item[balanceSheetMapping.intangibleFixedAssets],
      currentLiabilities: item[balanceSheetMapping.currentLiabilities],
      longTermLiabilities: item[balanceSheetMapping.longTermLiabilities],
      shareholderEquity: item[balanceSheetMapping.shareholderEquity],
      minorityInterest: item[balanceSheetMapping.minorityInterest],
    },
  };
};

const getBankingData = item => {
  const otherAssets =
    item[balanceSheetMappingBanking.totalAssets] -
    item[
      balanceSheetMappingBanking.placementsWithAndLoansToOtherCreditInstitutions
    ] -
    item[balanceSheetMappingBanking.loansAndAdvancesToCustomersNet] -
    item[balanceSheetMappingBanking.investmentSecurities];

  const otherLiabilities =
    item[balanceSheetMappingBanking.totalLiabilities] -
    item[balanceSheetMappingBanking.depositsFromCustomers];

  return {
    [getKey(item)]: {
      otherAssets,
      otherLiabilities,
      placementsLoanToCreditInstitutions:
        item[
          balanceSheetMappingBanking
            .placementsWithAndLoansToOtherCreditInstitutions
        ],
      loansAdvancesToCustomers:
        item[balanceSheetMappingBanking.loansAndAdvancesToCustomersNet],
      investmentSecurities:
        item[balanceSheetMappingBanking.investmentSecurities],
      depositsFromCustomers:
        item[balanceSheetMappingBanking.depositsFromCustomers],
      shareholdersEquity: item[balanceSheetMappingBanking.shareholderEquity],
      minorityInterest: item[balanceSheetMappingBanking.minorityInterest],
    },
  };
};

const getChartData = (row, data, isBanking) => {
  if (!data.length) {
    return {
      ...row,
      titles: isBanking
        ? balanceSheetChartBankingTitles
        : balanceSheetChartTitles,
    };
  }

  const extraData = data.reduce(
    (result, item) => ({
      ...result,
      ...(isBanking ? getBankingData(item) : getNonBankingData(item)),
      titles: isBanking
        ? balanceSheetChartBankingTitles
        : balanceSheetChartTitles,
    }),
    {},
  );

  return { ...row, ...extraData };
};

const formatBalanceSheetItem = (data, isBanking, ignoreIds = []) => {
  const rows = isBanking ? balanceSheetBankingRows : balanceSheetRows;
  const formattedData = rows.reduce(
    (final, row) => {
      const ids = ignoreIds.includes(row.id)
        ? final.ids
        : final.ids.concat(row.id);
      if (row.type === TYPES.CHART) {
        return {
          ...final,
          ids,
          dataByIds: {
            [row.id]: getChartData(row, data, isBanking),
          },
        };
      }
      const extraField = data.reduce((result, item) => {
        return {
          ...result,
          [getKey(item)]: item[row.id],
        };
      }, {});

      return {
        ...final,
        ids,
        dataByIds: {
          ...final.dataByIds,
          [row.id]: { ...row, ...extraField },
        },
      };
    },
    {
      ids: [],
      dataByIds: {},
    },
  );

  return {
    ...formattedData,
    fields: getDynamicField(data),
  };
};

const getCurrentQuarter = () => {
  const now = new Date();
  const year = now.getFullYear();
  const quarter = Math.ceil(now.getMonth() / 3);

  return {
    quarter,
    year,
    key: `${quarter}_${year}`,
  };
};

const getField = (quarter, year) => ({
  quarter,
  year,
  key: `${quarter}_${year}`,
});

const fillField = data => {
  const yearlyQuarter = 5;
  const isYearly = data[0].quarterReport === yearlyQuarter;
  const first = data[0];
  const last = data[data.length - 1];
  if (isYearly) {
    const fields = [];
    for (let i = last.yearReport; i <= first.yearReport; i++) {
      fields.push(getField(yearlyQuarter, i));
    }

    return fields;
  }

  const fields = [];
  for (let i = last.yearReport; i <= first.yearReport; i++) {
    let end = 4;
    let start = 1;
    if (i === first.yearReport) {
      end = first.quarterReport;
    }
    if (i === last.yearReport) {
      start = last.quarterReport;
    }
    for (let j = start; j <= end; j++) {
      fields.push(getField(j, i));
    }
  }

  return fields;
};

export const getDynamicField = data => {
  if (data.length === 0) {
    return [getCurrentQuarter()];
  }

  if (data.length === 1) {
    return [
      {
        quarter: data[0].quarterReport,
        year: data[0].yearReport,
        key: getKey(data[0]),
      },
    ];
  }

  return fillField(data);
};

export const formatBalanceSheetData = (data, isBanking) => {
  return Object.keys(data).reduce((result, key) => {
    return {
      ...result,
      isBanking,
      [key]: formatBalanceSheetItem(data[key], isBanking, [
        balanceSheetMapping.shareholderEquity,
      ]),
    };
  }, {});
};

export const formatItem = (data, rows, ignoreIds = []) => {
  const formattedData = rows.reduce(
    (result, row) => {
      const ids = ignoreIds.includes(row.id)
        ? result.ids
        : result.ids.concat(row.id);
      const extraField = data.reduce((result, item) => {
        return {
          ...result,
          [getKey(item)]: item[row.id],
        };
      }, {});

      return {
        ...result,
        ids,
        dataByIds: {
          ...result.dataByIds,
          [row.id]: { ...row, ...extraField },
        },
      };
    },
    {
      ids: [],
      dataByIds: {},
    },
  );

  return {
    ...formattedData,
    fields: getDynamicField(data),
  };
};

export const formatIncomeStatementData = (data, isBanking) =>
  Object.keys(data).reduce(
    (result, key) => ({
      ...result,
      isBanking,
      [key]: formatItem(
        data[key],
        isBanking ? incomeStatementBankingRows : incomeStatementRows,
        [incomeStatementMapping.netProfitMargin],
      ),
    }),
    {},
  );

export const formatCashFlowStatementData = (data, isBanking) =>
  Object.keys(data).reduce(
    (result, key) => ({
      ...result,
      isBanking,
      [key]: formatItem(
        data[key],
        isBanking ? cashFlowStatementBankingRows : cashFlowStatementRows,
      ),
    }),
    {},
  );
