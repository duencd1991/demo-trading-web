import { LEVELS, TYPES } from '../Const';

export const balanceSheetMapping = {
  totalAssets: 'bsa53',
  currentAssets: 'bsa1',

  cashAndCashEquivalents: 'bsa2',
  cash: 'bsa3',
  cashEquivalents: 'bsa4',

  shortTermInvestment: 'bsa5',
  shortTermInvestmentChild: 'bsa6',
  provisionForDiminution: 'bsa7',
  heldToMaturityInvestment: 'bsb108',

  accountReceivable: 'bsa8',
  tradeAccountReceivable: 'bsa9',
  prepaymentsToSuppliers: 'bsa10',
  interCompanyReceivables: 'bsa11',
  constructionContractInProgressReceivables: 'bsa12',
  shortTermLoansReceivables: 'bsa159',
  otherReceivables: 'bsa13',
  provisionForDoubtfulDebts: 'bsa14',
  shortageOfCurrentAssetsWaitingForSolution: 'bsI141',

  inventories: 'bsa15',
  inventoriesChild: 'bsa16',
  provisionForDeclineInInventories: 'bsa17',

  otherCurrentAssets: 'bsa18',
  shortTermPrepaidExpenses: 'bsa19',
  VATToBeClaimed: 'bsa20',
  otherTaxesReceivable: 'bsa21',
  governmentBondsPurchasedForResale: 'bsa160',
  otherCurrentAssetsChild: 'bsa22',

  longTermAssets: 'bsa23',

  longTermTradeReceivables: 'bsa24',
  longTermTradeReceivablesFromCustomers: 'bsa25',
  longTermPrepaymentsToSuppliers: 'bsa161',
  paidInCapitalInWhollyOwnedSubsidiaries: 'bss134',
  longTermInterCompanyReceivables: 'bsa26',
  longTermLoansReceivables: 'bsa162',
  otherLongTermReceivables: 'bsa27',
  provisionForDoubtfulLTReceivable: 'bsa28',

  fixedAssets: 'bsa29',
  tangibleFixedAssets: 'bsa30',
  tangibleFixedAssetsCost: 'bsa31',
  tangibleFixedAssetsAccumulatedDepreciation: 'bsa32',
  financeLeaseAssets: 'bsa33',
  financeLeaseAssetsCost: 'bsa34',
  financeLeaseAssetsAccumulatedDepreciation: 'bsa35',
  intangibleFixedAssets: 'bsa36',
  intangibleFixedAssetsCost: 'bsa37',
  intangibleFixedAssetsAccumulatedDepreciation: 'bsa38',

  investmentProperties: 'bsa40',
  investmentPropertiesCost: 'bsa41',
  investmentPropertiesAccumulatedDepreciation: 'bsa42',

  longTermIncompleteAssets: 'bsa163',
  longTermCostOfWorkInProgress: 'bsa164',
  constructionInProgress: 'bsa39',

  longTermInvestments: 'bsa43',
  investmentsInSubsidiaries: 'bsa44',
  investmentsInAssociates: 'bsa45',
  otherLongTermInvestments: 'bsa46',
  provisionForLongTermInvestments: 'bsa47',
  longTermInvestmentsHeldToMaturityInvestment: 'bsa165',

  otherLongTermAssets: 'bsa49',
  longTermPrepayments: 'bsa50',
  deferredIncomeTaxAssets: 'bsa51',
  longTermEquipmentAndMaterialAndSpareParts: 'bsa166',
  otherLongTermAssetsChild: 'bsa52',
  goodWill: 'bsa48',

  liabilities: 'bsa54',

  currentLiabilities: 'bsa55',
  tradeAccountsPayable: 'bsa57',
  advancesFromCustomers: 'bsa58',
  taxesAndOtherPayableToStateBudget: 'bsa59',
  payableToEmployees: 'bsa60',
  accruedExpenses: 'bsa61',
  interCompanyPayable: 'bsa62',
  constructionContractInProgressPayable: 'bsa63',
  shortTermUnrealizedRevenue: 'bsa167',
  otherPayable: 'bsa64',
  shortTermBorrowings: 'bsa56',
  provisionForSTLiabilities: 'bsa65',
  bonusAndWelfareFunds: 'bsa66',
  priceStabilizationFund: 'bsa168',
  currentLiabilitiesGovernmentBondsPurchasedForResale: 'bsa169',

  longTermLiabilities: 'bsa67',
  longTermTradePayable: 'bsa68',
  longTermAdvancesFromCustomers: 'bsa170',
  longTermAccruedExpenses: 'bsa171',
  intraCompanyPayablesForOperatingCapitalReceived: 'bsa172',
  longTermInterCompanyPayable: 'bsa69',
  unrealizedRevenue: 'bsa76',
  otherLongTermPayable: 'bsa70',
  longTermBorrowings: 'bsa71',
  convertibleBonds: 'bsa173',
  longTermLiabilitiesPreferredShares: 'bsb174',
  deferredIncomeTaxLiabilities: 'bsa72',
  provisionForSeveranceAllowances: 'bsa73',
  provisionForLongTermLiabilities: 'bsa74',
  technologyScienceDevelopmentFund: 'bsa77',

  shareholderEquity: 'bsa78',

  capitalAndReserves: 'bsa79',
  paidInCapital: 'bsa80',
  commonShares: 'bsa175',
  preferredShares: 'bsb120',
  sharePremium: 'bsa81',
  conversionOptionsOnConvertibleBonds: 'bsa176',
  ownerOtherCapital: 'bsa82',
  treasuryShares: 'bsa83',
  differencesUponAssetRevaluation: 'bsa84',
  foreignExchangeDifferences: 'bsa85',
  investmentAndDevelopmentFunds: 'bsa86',
  enterpriseArrangementFund: 'bsa91',
  financialReserveFunds: 'bsa87',
  otherFunds: 'bsa89',
  undistributedEarnings: 'bsa90',
  beginningAccumulatedUndistributedEarnings: 'bsa177',
  currentPeriodUndistributedEarnings: 'bsa178',
  capitalAndReservesMinorityInterests: 'bsa210',

  budgetSourcesAndFunds: 'bsa92',

  bonusAndWelfareFundsBefore2010: 'bsa93',
  budgetSourcesAndOtherFundsBefore2010: 'bsa94',
  fundsUsedForFixedAssetAcquisitions: 'bsa211',

  minorityInterest: 'bsa95',

  totalResources: 'bsa96',
};

export const balanceSheetMappingBanking = {
  totalAssets: 'bsa53',
  cashAndPreciousMetals: 'bsa2',
  balancesWithTheSBV: 'bsb97',
  placementsWithAndLoansToOtherCreditInstitutions: 'bsb98',

  tradingSecuritiesNet: 'bsb99',
  tradingSecurities: 'bsb100',
  lessProvisionForDiminutionInValueOfTradingSecurities: 'bsb101',

  derivativesAndOtherFinancialAssets: 'bsb102',
  loansAndAdvancesToCustomersNet: 'bsb103',
  loansAndAdvancesToCustomers: 'bsb104',
  lessProvisionForLossesOnLoansAndAdvancesToCustomers: 'bsb105',

  investmentSecurities: 'bsb106',
  availableForSalesSecurities: 'bsb107',
  heldToMaturitySecurities: 'bsb108',
  lessProvisionForDiminutionInValueOfInvestmentSecurities: 'bsb109',

  investmentInOtherEntitiesAndLongTermInvestments: 'bsa43',
  investmentInJointVentures: 'bsa44',
  investmentInAssociateCompanies: 'bsa45',
  otherLongTermInvestments: 'bsa46',
  provisionForLongTermInvestments: 'bsa47',

  fixedAssets: 'bsa29',
  tangibleFixedAssets: 'bsa30',
  financeLeasedAssets: 'bsa33',
  intangibleFixedAssets: 'bsa36',

  investmentProperties: 'bsa40',

  otherAssets: 'bsb110',

  liabilitiesAndShareholderEquity: 'bsa96',

  totalLiabilities: 'bsa54',
  dueToGovAndBorrowingsFromSBV: 'bsb111',
  depositsAndBorrowingsFromOtherCreditInstitutions: 'bsb112',
  depositsFromCustomers: 'bsb113',
  derivativesAndOtherFinancialLiabilities: 'bsb114',
  fundsReceivedFromGovInternationalAndOtherInstitutions: 'bsb115',
  convertibleBondsCDsAndOtherValuablePapersIssued: 'bsb116',
  otherLiabilities: 'bsb117',

  shareholderEquity: 'bsa78',
  capital: 'bsb118',
  charterCapital: 'bsa80',
  fundForBasicConstruction: 'bsb119',
  sharePremium: 'bsa81',
  treasuryShares: 'bsa83',
  preferredShares: 'bsb120',
  otherCapitals: 'bsa82',
  reserves: 'bsb121',
  differenceUponAssetsRevaluation: 'bsa84',
  foreignCurrencyDifferenceReserve: 'bsa85',
  retainedEarnings: 'bsa90',

  minorityInterest: 'bsa95',
};

export const balanceSheetRows = [
  {
    id: 'chart',
    type: TYPES.CHART,
    level: LEVELS.PARENT,
  },
].concat(
  Object.keys(balanceSheetMapping).map(key => {
    const defaultItem = {
      id: balanceSheetMapping[key],
      i18nKey: key,
      level: LEVELS.PARENT,
    };
    if (
      [
        balanceSheetMapping.totalAssets,
        balanceSheetMapping.currentAssets,
      ].includes(balanceSheetMapping[key])
    ) {
      return defaultItem;
    }

    if (
      balanceSheetMapping[key] === balanceSheetMapping.cashAndCashEquivalents
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.cash,
          balanceSheetMapping.cashEquivalents,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.shortTermInvestment) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.shortTermInvestmentChild,
          balanceSheetMapping.provisionForDiminution,
          balanceSheetMapping.heldToMaturityInvestment,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.accountReceivable) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.tradeAccountReceivable,
          balanceSheetMapping.prepaymentsToSuppliers,
          balanceSheetMapping.interCompanyReceivables,
          balanceSheetMapping.constructionContractInProgressReceivables,
          balanceSheetMapping.shortTermLoansReceivables,
          balanceSheetMapping.otherReceivables,
          balanceSheetMapping.provisionForDoubtfulDebts,
          balanceSheetMapping.shortageOfCurrentAssetsWaitingForSolution,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.inventories) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.inventoriesChild,
          balanceSheetMapping.provisionForDeclineInInventories,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.inventories) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.inventoriesChild,
          balanceSheetMapping.provisionForDeclineInInventories,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.otherCurrentAssets) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.shortTermPrepaidExpenses,
          balanceSheetMapping.VATToBeClaimed,
          balanceSheetMapping.otherTaxesReceivable,
          balanceSheetMapping.governmentBondsPurchasedForResale,
          balanceSheetMapping.otherCurrentAssetsChild,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.longTermAssets) {
      return defaultItem;
    }

    if (
      balanceSheetMapping[key] === balanceSheetMapping.longTermTradeReceivables
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.longTermTradeReceivablesFromCustomers,
          balanceSheetMapping.longTermPrepaymentsToSuppliers,
          balanceSheetMapping.paidInCapitalInWhollyOwnedSubsidiaries,
          balanceSheetMapping.longTermInterCompanyReceivables,
          balanceSheetMapping.longTermLoansReceivables,
          balanceSheetMapping.otherLongTermReceivables,
          balanceSheetMapping.provisionForDoubtfulLTReceivable,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.fixedAssets) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.tangibleFixedAssets,
          balanceSheetMapping.financeLeaseAssets,
          balanceSheetMapping.intangibleFixedAssets,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.tangibleFixedAssets) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMapping.tangibleFixedAssetsCost,
          balanceSheetMapping.tangibleFixedAssetsAccumulatedDepreciation,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.financeLeaseAssets) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMapping.financeLeaseAssetsCost,
          balanceSheetMapping.financeLeaseAssetsAccumulatedDepreciation,
        ],
      };
    }

    if (
      balanceSheetMapping[key] === balanceSheetMapping.intangibleFixedAssets
    ) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMapping.intangibleFixedAssetsCost,
          balanceSheetMapping.intangibleFixedAssetsAccumulatedDepreciation,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.investmentProperties) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.investmentPropertiesCost,
          balanceSheetMapping.investmentPropertiesAccumulatedDepreciation,
        ],
      };
    }

    if (
      balanceSheetMapping[key] === balanceSheetMapping.longTermIncompleteAssets
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.longTermCostOfWorkInProgress,
          balanceSheetMapping.constructionInProgress,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.longTermInvestments) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.investmentsInSubsidiaries,
          balanceSheetMapping.investmentsInAssociates,
          balanceSheetMapping.otherLongTermInvestments,
          balanceSheetMapping.provisionForLongTermInvestments,
          balanceSheetMapping.longTermInvestmentsHeldToMaturityInvestment,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.otherLongTermAssets) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.longTermPrepayments,
          balanceSheetMapping.deferredIncomeTaxAssets,
          balanceSheetMapping.longTermEquipmentAndMaterialAndSpareParts,
          balanceSheetMapping.otherLongTermAssetsChild,
          balanceSheetMapping.goodWill,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.totalAssets) {
      return defaultItem;
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.liabilities) {
      return defaultItem;
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.currentLiabilities) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.tradeAccountsPayable,
          balanceSheetMapping.advancesFromCustomers,
          balanceSheetMapping.taxesAndOtherPayableToStateBudget,
          balanceSheetMapping.payableToEmployees,
          balanceSheetMapping.accruedExpenses,
          balanceSheetMapping.interCompanyPayable,
          balanceSheetMapping.constructionContractInProgressPayable,
          balanceSheetMapping.shortTermUnrealizedRevenue,
          balanceSheetMapping.otherPayable,
          balanceSheetMapping.shortTermBorrowings,
          balanceSheetMapping.provisionForSTLiabilities,
          balanceSheetMapping.bonusAndWelfareFunds,
          balanceSheetMapping.priceStabilizationFund,
          balanceSheetMapping.currentLiabilitiesGovernmentBondsPurchasedForResale,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.longTermLiabilities) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.longTermTradePayable,
          balanceSheetMapping.longTermAdvancesFromCustomers,
          balanceSheetMapping.longTermAccruedExpenses,
          balanceSheetMapping.intraCompanyPayablesForOperatingCapitalReceived,
          balanceSheetMapping.longTermInterCompanyPayable,
          balanceSheetMapping.unrealizedRevenue,
          balanceSheetMapping.otherLongTermPayable,
          balanceSheetMapping.longTermBorrowings,
          balanceSheetMapping.convertibleBonds,
          balanceSheetMapping.longTermLiabilitiesPreferredShares,
          balanceSheetMapping.deferredIncomeTaxLiabilities,
          balanceSheetMapping.provisionForSeveranceAllowances,
          balanceSheetMapping.provisionForLongTermLiabilities,
          balanceSheetMapping.technologyScienceDevelopmentFund,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.ownerEquity) {
      return defaultItem;
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.capitalAndReserves) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.paidInCapital,
          balanceSheetMapping.sharePremium,
          balanceSheetMapping.conversionOptionsOnConvertibleBonds,
          balanceSheetMapping.ownerOtherCapital,
          balanceSheetMapping.treasuryShares,
          balanceSheetMapping.differencesUponAssetRevaluation,
          balanceSheetMapping.foreignExchangeDifferences,
          balanceSheetMapping.investmentAndDevelopmentFunds,
          balanceSheetMapping.enterpriseArrangementFund,
          balanceSheetMapping.financialReserveFunds,
          balanceSheetMapping.otherFunds,
          balanceSheetMapping.undistributedEarnings,
          balanceSheetMapping.capitalAndReservesMinorityInterests,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.paidInCapital) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMapping.commonShares,
          balanceSheetMapping.preferredShares,
        ],
      };
    }

    if (
      balanceSheetMapping[key] === balanceSheetMapping.undistributedEarnings
    ) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMapping.beginningAccumulatedUndistributedEarnings,
          balanceSheetMapping.currentPeriodUndistributedEarnings,
        ],
      };
    }

    if (
      balanceSheetMapping[key] ===
      balanceSheetMapping.budgetSourcesAndOtherFunds
    ) {
      return defaultItem;
    }

    if (
      balanceSheetMapping[key] ===
      balanceSheetMapping.bonusAndWelfareFundsBefore2010
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMapping.budgetSourcesAndOtherFundsBefore2010,
          balanceSheetMapping.fundsUsedForFixedAssetAcquisitions,
        ],
      };
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.minorityInterest) {
      return defaultItem;
    }

    if (balanceSheetMapping[key] === balanceSheetMapping.totalResources) {
      return defaultItem;
    }

    if (
      [
        balanceSheetMapping.tangibleFixedAssetsCost,
        balanceSheetMapping.tangibleFixedAssetsAccumulatedDepreciation,
        balanceSheetMapping.intangibleFixedAssetsCost,
        balanceSheetMapping.intangibleFixedAssetsAccumulatedDepreciation,
        balanceSheetMapping.financeLeaseAssetsCost,
        balanceSheetMapping.financeLeaseAssetsAccumulatedDepreciation,
        balanceSheetMapping.commonShares,
        balanceSheetMapping.preferredShares,
        balanceSheetMapping.beginningAccumulatedUndistributedEarnings,
        balanceSheetMapping.currentPeriodUndistributedEarnings,
      ].includes(balanceSheetMapping[key])
    ) {
      return {
        ...defaultItem,
        level: LEVELS.THREE,
      };
    }

    return {
      id: balanceSheetMapping[key],
      i18nKey: key,
      level: LEVELS.CHILD,
    };
  }),
);

export const balanceSheetBankingRows = [
  {
    id: 'chart',
    type: TYPES.CHART,
    level: LEVELS.PARENT,
  },
].concat(
  Object.keys(balanceSheetMappingBanking).map(key => {
    const defaultItem = {
      id: balanceSheetMappingBanking[key],
      i18nKey: key,
      level: LEVELS.PARENT,
    };
    if (
      [
        balanceSheetMappingBanking.totalAssets,
        balanceSheetMappingBanking.cashAndPreciousMetals,
        balanceSheetMappingBanking.balancesWithTheSBV,
        balanceSheetMappingBanking.placementsWithAndLoansToOtherCreditInstitutions,
        balanceSheetMappingBanking.derivativesAndOtherFinancialAssets,
        balanceSheetMappingBanking.investmentProperties,
        balanceSheetMappingBanking.otherAssets,
        balanceSheetMappingBanking.liabilitiesAndShareholderEquity,
        balanceSheetMappingBanking.minorityInterest,
      ].includes(balanceSheetMappingBanking[key])
    ) {
      return defaultItem;
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.tradingSecuritiesNet
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.tradingSecurities,
          balanceSheetMappingBanking.lessProvisionForDiminutionInValueOfTradingSecurities,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.loansAndAdvancesToCustomersNet
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.loansAndAdvancesToCustomers,
          balanceSheetMappingBanking.lessProvisionForLossesOnLoansAndAdvancesToCustomers,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.investmentSecurities
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.availableForSalesSecurities,
          balanceSheetMappingBanking.heldToMaturitySecurities,
          balanceSheetMappingBanking.lessProvisionForDiminutionInValueOfInvestmentSecurities,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.investmentInOtherEntitiesAndLongTermInvestments
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.investmentInJointVentures,
          balanceSheetMappingBanking.investmentInAssociateCompanies,
          balanceSheetMappingBanking.otherLongTermInvestments,
          balanceSheetMappingBanking.provisionForLongTermInvestments,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] === balanceSheetMappingBanking.fixedAssets
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.tangibleFixedAssets,
          balanceSheetMappingBanking.financeLeasedAssets,
          balanceSheetMappingBanking.intangibleFixedAssets,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.totalLiabilities
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.dueToGovAndBorrowingsFromSBV,
          balanceSheetMappingBanking.depositsAndBorrowingsFromOtherCreditInstitutions,
          balanceSheetMappingBanking.depositsFromCustomers,
          balanceSheetMappingBanking.derivativesAndOtherFinancialLiabilities,
          balanceSheetMappingBanking.fundsReceivedFromGovInternationalAndOtherInstitutions,
          balanceSheetMappingBanking.convertibleBondsCDsAndOtherValuablePapersIssued,
          balanceSheetMappingBanking.otherLiabilities,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] ===
      balanceSheetMappingBanking.shareholderEquity
    ) {
      return {
        ...defaultItem,
        children: [
          balanceSheetMappingBanking.capital,
          balanceSheetMappingBanking.reserves,
          balanceSheetMappingBanking.differenceUponAssetsRevaluation,
          balanceSheetMappingBanking.foreignCurrencyDifferenceReserve,
          balanceSheetMappingBanking.retainedEarnings,
        ],
      };
    }

    if (
      balanceSheetMappingBanking[key] === balanceSheetMappingBanking.capital
    ) {
      return {
        ...defaultItem,
        level: LEVELS.CHILD,
        children: [
          balanceSheetMappingBanking.charterCapital,
          balanceSheetMappingBanking.fundForBasicConstruction,
          balanceSheetMappingBanking.sharePremium,
          balanceSheetMappingBanking.treasuryShares,
          balanceSheetMappingBanking.preferredShares,
          balanceSheetMappingBanking.otherCapitals,
        ],
      };
    }

    if (
      [
        balanceSheetMappingBanking.charterCapital,
        balanceSheetMappingBanking.fundForBasicConstruction,
        balanceSheetMappingBanking.sharePremium,
        balanceSheetMappingBanking.treasuryShares,
        balanceSheetMappingBanking.preferredShares,
        balanceSheetMappingBanking.otherCapitals,
      ].includes(balanceSheetMappingBanking[key])
    ) {
      return {
        ...defaultItem,
        level: LEVELS.THREE,
      };
    }

    return {
      ...defaultItem,
      level: LEVELS.CHILD,
    };
  }),
);

export const balanceSheetChartTitles = [
  {
    key: 'currentAssets',
    color: '#e5efc1',
    i18nKey: 'financialStatement.chartTitle.currentAssets',
  },
  {
    key: 'tangibleFixedAssets',
    color: '#a2d5ab',
    i18nKey: 'financialStatement.chartTitle.tangibleFixedAssets',
  },
  {
    key: 'intangibleFixedAssets',
    color: '#3baea9',
    i18nKey: 'financialStatement.chartTitle.intangibleFixedAssets',
  },
  {
    key: 'otherAssets',
    color: '#358bbc',
    i18nKey: 'financialStatement.chartTitle.otherAssets',
  },
  {
    key: 'currentLiabilities',
    color: '#f8b195',
    i18nKey: 'financialStatement.chartTitle.currentLiabilities',
  },
  {
    key: 'longTermLiabilities',
    color: '#f27280',
    i18nKey: 'financialStatement.chartTitle.longTermLiabilities',
  },
  {
    key: 'shareholderEquity',
    color: '#b76880',
    i18nKey: 'financialStatement.chartTitle.shareholdersEquity',
  },
  {
    key: 'minorityInterest',
    color: '#6c5c7c',
    i18nKey: 'financialStatement.chartTitle.minorityInterest',
  },
];

export const balanceSheetChartBankingTitles = [
  {
    key: 'placementsLoanToCreditInstitutions',
    color: '#e5efc1',
    i18nKey: 'financialStatement.chartTitle.placementsLoanToCreditInstitutions',
  },
  {
    key: 'loansAdvancesToCustomers',
    color: '#a2d5ab',
    i18nKey: 'financialStatement.chartTitle.loansAdvancesToCustomers',
  },
  {
    key: 'investmentSecurities',
    color: '#3baea9',
    i18nKey: 'financialStatement.chartTitle.investmentSecurities',
  },
  {
    key: 'otherAssets',
    color: '#358bbc',
    i18nKey: 'financialStatement.chartTitle.otherAssets',
  },
  {
    key: 'depositsFromCustomers',
    color: '#f8b195',
    i18nKey: 'financialStatement.chartTitle.depositsFromCustomers',
  },
  {
    key: 'otherLiabilities',
    color: '#f27280',
    i18nKey: 'financialStatement.chartTitle.otherLiabilities',
  },
  {
    key: 'shareholdersEquity',
    color: '#b76880',
    i18nKey: 'financialStatement.chartTitle.shareholdersEquity',
  },
  {
    key: 'minorityInterest',
    color: '#6c5c7c',
    i18nKey: 'financialStatement.chartTitle.minorityInterest',
  },
];
