import Const from './Const';
import { keyBy, includes } from 'lodash';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';

export { fetchListDataCheckup };

function fetchListDataCheckup(listDataCheckup, isBanking) {
  let iconRapidEquityIssuance = 'icon-rapid-equity-issuance';
  let iconRevenueGrowth = 'icon-revenue-growth';
  let iconGrossProfitMargin = 'icon-gross-profit-margin';
  let iconProfitGrowth = 'icon-profit-growth';
  let iconCFOQuality = 'icon-cfo-quality';
  let iconOperationEfficiency = 'icon-operation-efficiency';
  let iconDebtPressure = 'icon-debt-pressure';
  let iconCapitalStructure = 'icon-capital-structure';
  let iconROE = 'icon-roe';
  let iconFinancialPlanning = 'icon-financial-planning';
  let newFaCheckupData = [];
  if (!isBanking) {
    newFaCheckupData = [
      {
        [Const.idFaCheckup]: 0,
        keyEN: Const.listIconKeyEN.FA_Equity_Issurance,
        keyVI: Const.listIconKeyVI.FA_Equity_Issurance,
        icon: iconRapidEquityIssuance,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.RAPID_EQUITY_ISSUANCE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 1,
        keyEN: Const.listIconKeyEN.FA_Revenue_Growth,
        keyVI: Const.listIconKeyVI.FA_Revenue_Growth,
        icon: iconRevenueGrowth,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.REVENUE_GROWTH',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 2,
        keyEN: Const.listIconKeyEN.FA_Gross_Margin,
        keyVI: Const.listIconKeyVI.FA_Gross_Margin,
        icon: iconGrossProfitMargin,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.GROSS_PROFIT_MARGIN',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 3,
        keyEN: Const.listIconKeyEN.FA_Profit_Growth,
        keyVI: Const.listIconKeyVI.FA_Profit_Growth,
        icon: iconProfitGrowth,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.PROFIT_GROWTH',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 4,
        keyEN: Const.listIconKeyEN.FA_CFO,
        keyVI: Const.listIconKeyVI.FA_CFO,
        icon: iconCFOQuality,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.CFO_QUALITY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 5,
        keyEN: Const.listIconKeyEN.FA_Financial_strength,
        keyVI: Const.listIconKeyVI.FA_Financial_strength,
        icon: iconOperationEfficiency,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.OPERATION_EFFICIENCY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 6,
        keyEN: Const.listIconKeyEN.FA_Debt,
        keyVI: Const.listIconKeyVI.FA_Debt,
        icon: iconDebtPressure,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.DEBT_PRESSURE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 7,
        keyEN: Const.listIconKeyEN.FA_capital_structure,
        keyVI: Const.listIconKeyVI.FA_capital_structure,
        icon: iconCapitalStructure,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.CAPITAL_STRUCTURE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 8,
        keyEN: Const.listIconKeyEN.FA_ROE,
        keyVI: Const.listIconKeyVI.FA_ROE,
        icon: iconROE,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.ROE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 9,
        keyEN: Const.listIconKeyEN.FA_Financial_Plan,
        keyVI: Const.listIconKeyVI.FA_Financial_Plan,
        icon: iconFinancialPlanning,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.FINANCIAL_PLANNING',
        rateResult: '',
      },
    ];
  } else {
    newFaCheckupData = [
      {
        [Const.idFaCheckup]: 0,
        keyEN: Const.listIconKeyEN.FA_Equity_Issurance,
        keyVI: Const.listIconKeyVI.FA_Equity_Issurance,
        icon: iconRapidEquityIssuance,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.DEPOSIT_GROWTH',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 1,
        keyEN: Const.listIconKeyEN.FA_Revenue_Growth,
        keyVI: Const.listIconKeyVI.FA_Revenue_Growth,
        icon: iconRevenueGrowth,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.CREDIT_GROWTH',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 2,
        keyEN: Const.listIconKeyEN.FA_Gross_Margin,
        keyVI: Const.listIconKeyVI.FA_Gross_Margin,
        icon: iconGrossProfitMargin,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.PROFIT_ABILITY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 3,
        keyEN: Const.listIconKeyEN.FA_Profit_Growth,
        keyVI: Const.listIconKeyVI.FA_Profit_Growth,
        icon: iconProfitGrowth,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.ASSET_QUALITY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 4,
        keyEN: Const.listIconKeyEN.FA_CFO,
        keyVI: Const.listIconKeyVI.FA_CFO,
        icon: iconCFOQuality,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.CFO_QUALITY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 5,
        keyEN: Const.listIconKeyEN.FA_Financial_strength,
        keyVI: Const.listIconKeyVI.FA_Financial_strength,
        icon: iconOperationEfficiency,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.OPERATION_EFFICIENCY',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 6,
        keyEN: Const.listIconKeyEN.FA_Debt,
        keyVI: Const.listIconKeyVI.FA_Debt,
        icon: iconDebtPressure,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.DEBT_PRESSURE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 7,
        keyEN: Const.listIconKeyEN.FA_capital_structure,
        keyVI: Const.listIconKeyVI.FA_capital_structure,
        icon: iconCapitalStructure,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.CAPITAL_STRUCTURE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 8,
        keyEN: Const.listIconKeyEN.FA_ROE,
        keyVI: Const.listIconKeyVI.FA_ROE,
        icon: iconROE,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.ROE',
        rateResult: '',
      },
      {
        [Const.idFaCheckup]: 9,
        keyEN: Const.listIconKeyEN.FA_Financial_Plan,
        keyVI: Const.listIconKeyVI.FA_Financial_Plan,
        icon: iconFinancialPlanning,
        rateComment: '',
        rateIndicatorName: '',
        rateValue: '',
        item: 'financialAnalysis.columnOneTable.FINANCIAL_PLANNING',
        rateResult: '',
      },
    ];
  }

  const listColumnTable = getListColumnTable(listDataCheckup);

  formatDataCheckup(listDataCheckup, newFaCheckupData);

  const listLookupItems = getListLookupItems(listDataCheckup);

  const listFaCheckupByTicker = keyBy(newFaCheckupData, Const.idFaCheckup);
  const listTickerFACheckup = newFaCheckupData.map(item => {
    return getDataFollowKeyByDot(item, Const.idFaCheckup);
  });

  const yearReport = checkYearReport(listDataCheckup);

  return {
    listColumnTable,
    listFaCheckupByTicker,
    listTickerFACheckup,
    listLookupItems,
    yearReport,
  };
}

function getListColumnTable(data) {
  if (data) {
    let listColumnTable = {};
    const { checkupItem, comparingCheckupItems } = data;

    if (checkupItem && comparingCheckupItems) {
      const combineData = [checkupItem, ...comparingCheckupItems];

      const listTicker = combineData.map(item => item.ticker);
      listColumnTable['item'] = 'item';
      listTicker.forEach((ticker, index) => {
        if (index === 0) {
          listColumnTable['checkupItem'] = ticker;
        } else if (index === 1) {
          listColumnTable['comparingCheckupItemOne'] = ticker;
        } else if (index === 2) {
          listColumnTable['comparingCheckupItemTwo'] = ticker;
        }
      });

      return listColumnTable;
    }
  }
  return null;
}

function formatDataCheckup(data, newFaCheckupData) {
  if (data) {
    const { checkupItem, comparingCheckupItems } = data;
    if (checkupItem && comparingCheckupItems) {
      const combineData = [checkupItem, ...comparingCheckupItems];

      newFaCheckupData.forEach(item => {
        combineData.forEach(item2 => {
          const { checkupInfors, ticker } = item2;

          const { rateResult } = getCheckupInfo(checkupInfors, item);
          item[ticker] = rateResult;
        });

        const { checkupInfors } = checkupItem;
        const { rateComment, rateValue, rateIndicatorName } = getCheckupInfo(
          checkupInfors,
          item,
        );

        item.rateComment = rateComment;
        item.rateValue = rateValue;
        item.rateIndicatorName = rateIndicatorName;
      });
    }
  }
}

function getCheckupInfo(checkupInfors, itemCheckupResult) {
  let result = {};
  checkupInfors.forEach(item => {
    const { keyEN, keyVI } = itemCheckupResult;

    if (includes([keyEN, keyVI], item.rateIndicatorName)) {
      result = item;
    }
  });

  return result;
}

function getListLookupItems(data) {
  let result = [];
  let idLookupItem = 1;

  const { lookupItems } = data;

  if (lookupItems) {
    lookupItems.forEach(({ ticker, organCode, organShortName }) => {
      result.push({
        key: idLookupItem++,
        ticker,
        organCode,
        organShortName,
      });
    });
  }

  return result;
}

function checkYearReport(listDataCheckup) {
  const { checkupItem } = listDataCheckup;

  if (checkupItem) {
    const { yearReport, lengthReport } = checkupItem;

    return lengthReport === 5
      ? yearReport
      : 'Q' + lengthReport + ' ' + yearReport;
  }
  return null;
}
