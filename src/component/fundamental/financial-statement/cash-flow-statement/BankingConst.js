import { LEVELS } from '../Const';

export const mappingBanking = {
  netCashFromOperatingActivities: 'cfa18',
  netCashFlowsFromOperatingActivitiesBeforeBIT: 'cfb64',
  operatingProfitLossBeforeChangesInWorkingCapital: 'cfa9',
  interestAndSimilarReceipts: 'cfb75',
  interestAndSimilarPayments: 'cfb76',
  feesAndCommissionIncomeReceived: 'cfb77',
  netReceiptsFromDealingOfForeignCurrenciesGold: 'cfb78',
  netReceiptsFromDealingOfSecurities: 'cfb79',
  otherOperatingIncome: 'cfb80',
  receiptsFromDebtsWrittenOffOrPaidOffByRiskFund: 'cfb106',
  paymentsToEmployeesAndOtherOperatingExpenses: 'cfb81',
  paymentsForCorporateIncomeTax: 'cfa43',
  increaseDecreaseInCompulsoryReservesWithTheSBV: 'cfb48',
  increaseDecreaseInPlacementsWithAndLoansToOtherCreditInstitutions: 'cfb49',
  increaseDecreaseInTradingSecurities: 'cfb50',
  increaseDecreaseInDerivativesAndOtherFinancialAssets: 'cfb51',
  increaseDecreaseInLoansAndAdvancesToCustomers: 'cfb52',
  increaseDecreaseInInterestReceivable: 'cfb53',
  increaseDecreaseInProvisionForLoanLosses: 'cfb54',
  increaseDecreaseInOtherOperatingAssets: 'cfb55',
  increaseDecreaseInBorrowingsFromTheStateAndSbv: 'cfb56',
  increaseDecreaseInPlacementsAndBorrowingsFromOtherCreditInstitutions: 'cfb57',
  increaseDecreaseInDepositsFromCustomers: 'cfb58',
  increaseDecreaseInDerivativesAndOtherFinancialLiabilities: 'cfb59',
  increaseDecreaseInFundsReceivedFromGovInternationalAndOtherInstitutions:
    'cfb60',
  increaseDecreaseInValuablePapersIssued: 'cfb61',
  increaseDecreaseInAccruedInterestExpenses: 'cfb62',
  increaseDecreaseInOtherOperatingLiabilities: 'cfb63',
  corporateIncomeTaxPaid: 'cfa15',
  paymentFromReserves: 'cfb65',
  badDebtRecoveries: 'cfb66',

  netCashFromInvestingActivities: 'cfa26',
  purchasesOfFixedAssetsAndOtherLongTermAssets: 'cfa19',
  proceedsFromDisposalOfFixedAssets: 'cfa20',
  paymentsOnDisposalOfFixedAssets: 'cfb67',
  purchasesOfInvestmentProperties: 'cfb68',
  proceedsFromDisposalOfInvestmentProperties: 'cfb69',
  paymentsOnDisposalOfInvestmentProperties: 'cfb70',
  investmentsInOtherEntities: 'cfa23',
  proceedsFromDivestmentInOtherEntities: 'cfa24',
  dividendsAndInterestReceived: 'cfa25',

  netCashFromFinancingActivities: 'cfa34',
  proceedsFromIssueOfShares: 'cfa27',
  proceedsFromIssuanceOfConvertibleBonds: 'cfa71',
  paymentsForRedemptionOfConvertibleBonds: 'cfa72',
  dividendsPaid: 'cfa32',
  purchaseOfTreasuryShares: 'cfb73',
  proceedsFromSellingOfTreasuryShares: 'cfb74',

  netIncreaseDecreaseInCashAndCashEquivalents: 'cfa35',
  cashAndCashEquivalentsAtTheBeginningOfPeriod: 'cfa36',
  effectOfForeignExchangeDifferences: 'cfa37',
  cashAndCashEquivalentsAtTheEndOfPeriod: 'cfa38',
};

export const cashFlowStatementBankingRows = Object.keys(mappingBanking).map(
  key => {
    const defaultItem = {
      id: mappingBanking[key],
      i18nKey: key,
      level: LEVELS.PARENT,
    };

    if (
      [
        mappingBanking.netIncreaseDecreaseInCashAndCashEquivalents,
        mappingBanking.cashAndCashEquivalentsAtTheBeginningOfPeriod,
        mappingBanking.effectOfForeignExchangeDifferences,
        mappingBanking.cashAndCashEquivalentsAtTheEndOfPeriod,
      ].includes(mappingBanking[key])
    ) {
      return defaultItem;
    }

    if (mappingBanking[key] === mappingBanking.netCashFromOperatingActivities) {
      return {
        ...defaultItem,
        children: [
          mappingBanking.netCashFlowsFromOperatingActivitiesBeforeBIT,
          mappingBanking.corporateIncomeTaxPaid,
          mappingBanking.paymentFromReserves,
          mappingBanking.badDebtRecoveries,
        ],
      };
    }

    if (
      mappingBanking[key] ===
      mappingBanking.netCashFlowsFromOperatingActivitiesBeforeBIT
    ) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          mappingBanking.operatingProfitLossBeforeChangesInWorkingCapital,
          mappingBanking.increaseDecreaseInCompulsoryReservesWithTheSBV,
          mappingBanking.increaseDecreaseInPlacementsWithAndLoansToOtherCreditInstitutions,
          mappingBanking.increaseDecreaseInTradingSecurities,
          mappingBanking.increaseDecreaseInDerivativesAndOtherFinancialAssets,
          mappingBanking.increaseDecreaseInLoansAndAdvancesToCustomers,
          mappingBanking.increaseDecreaseInInterestReceivable,
          mappingBanking.increaseDecreaseInProvisionForLoanLosses,
          mappingBanking.increaseDecreaseInOtherOperatingAssets,
          mappingBanking.increaseDecreaseInBorrowingsFromTheStateAndSbv,
          mappingBanking.increaseDecreaseInPlacementsAndBorrowingsFromOtherCreditInstitutions,
          mappingBanking.increaseDecreaseInDepositsFromCustomers,
          mappingBanking.increaseDecreaseInDerivativesAndOtherFinancialLiabilities,
          mappingBanking.increaseDecreaseInFundsReceivedFromGovInternationalAndOtherInstitutions,
          mappingBanking.increaseDecreaseInValuablePapersIssued,
          mappingBanking.increaseDecreaseInAccruedInterestExpenses,
          mappingBanking.increaseDecreaseInOtherOperatingLiabilities,
        ],
      };
    }

    if (
      mappingBanking[key] ===
      mappingBanking.operatingProfitLossBeforeChangesInWorkingCapital
    ) {
      return {
        ...defaultItem,
        level: LEVELS.THREE,
        children: [
          mappingBanking.interestAndSimilarReceipts,
          mappingBanking.interestAndSimilarPayments,
          mappingBanking.feesAndCommissionIncomeReceived,
          mappingBanking.netReceiptsFromDealingOfForeignCurrenciesGold,
          mappingBanking.netReceiptsFromDealingOfSecurities,
          mappingBanking.otherOperatingIncome,
          mappingBanking.receiptsFromDebtsWrittenOffOrPaidOffByRiskFund,
          mappingBanking.paymentsToEmployeesAndOtherOperatingExpenses,
          mappingBanking.paymentsForCorporateIncomeTax,
        ],
      };
    }

    if (
      [
        mappingBanking.interestAndSimilarReceipts,
        mappingBanking.interestAndSimilarPayments,
        mappingBanking.feesAndCommissionIncomeReceived,
        mappingBanking.netReceiptsFromDealingOfForeignCurrenciesGold,
        mappingBanking.netReceiptsFromDealingOfSecurities,
        mappingBanking.otherOperatingIncome,
        mappingBanking.receiptsFromDebtsWrittenOffOrPaidOffByRiskFund,
        mappingBanking.paymentsToEmployeesAndOtherOperatingExpenses,
        mappingBanking.paymentsForCorporateIncomeTax,
      ].includes(mappingBanking[key])
    ) {
      return {
        ...defaultItem,
        level: LEVELS.FOUR,
      };
    }

    if (
      [
        mappingBanking.increaseDecreaseInCompulsoryReservesWithTheSBV,
        mappingBanking.increaseDecreaseInPlacementsWithAndLoansToOtherCreditInstitutions,
        mappingBanking.increaseDecreaseInTradingSecurities,
        mappingBanking.increaseDecreaseInDerivativesAndOtherFinancialAssets,
        mappingBanking.increaseDecreaseInLoansAndAdvancesToCustomers,
        mappingBanking.increaseDecreaseInInterestReceivable,
        mappingBanking.increaseDecreaseInProvisionForLoanLosses,
        mappingBanking.increaseDecreaseInOtherOperatingAssets,
        mappingBanking.increaseDecreaseInBorrowingsFromTheStateAndSbv,
        mappingBanking.increaseDecreaseInPlacementsAndBorrowingsFromOtherCreditInstitutions,
        mappingBanking.increaseDecreaseInDepositsFromCustomers,
        mappingBanking.increaseDecreaseInDerivativesAndOtherFinancialLiabilities,
        mappingBanking.increaseDecreaseInFundsReceivedFromGovInternationalAndOtherInstitutions,
        mappingBanking.increaseDecreaseInValuablePapersIssued,
        mappingBanking.increaseDecreaseInAccruedInterestExpenses,
        mappingBanking.increaseDecreaseInOtherOperatingLiabilities,
      ].includes(mappingBanking[key])
    ) {
      return {
        ...defaultItem,
        level: LEVELS.THREE,
      };
    }

    if (mappingBanking[key] === mappingBanking.netCashFromInvestingActivities) {
      return {
        ...defaultItem,
        children: [
          mappingBanking.purchasesOfFixedAssetsAndOtherLongTermAssets,
          mappingBanking.proceedsFromDisposalOfFixedAssets,
          mappingBanking.paymentsOnDisposalOfFixedAssets,
          mappingBanking.purchasesOfInvestmentProperties,
          mappingBanking.proceedsFromDisposalOfInvestmentProperties,
          mappingBanking.paymentsOnDisposalOfInvestmentProperties,
          mappingBanking.investmentsInOtherEntities,
          mappingBanking.proceedsFromDivestmentInOtherEntities,
          mappingBanking.dividendsAndInterestReceived,
        ],
      };
    }

    if (mappingBanking[key] === mappingBanking.netCashFromFinancingActivities) {
      return {
        ...defaultItem,
        children: [
          mappingBanking.proceedsFromIssueOfShares,
          mappingBanking.proceedsFromIssuanceOfConvertibleBonds,
          mappingBanking.paymentsForRedemptionOfConvertibleBonds,
          mappingBanking.dividendsPaid,
          mappingBanking.purchaseOfTreasuryShares,
          mappingBanking.proceedsFromSellingOfTreasuryShares,
        ],
      };
    }

    return {
      ...defaultItem,
      level: LEVELS.CHILD,
    };
  },
);
