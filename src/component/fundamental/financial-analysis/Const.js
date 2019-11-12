const listTab = {
  FACheckup: 'FA Checkup',
  financialRatio: 'Financial Ratio',
  ZMFScore: 'ZMF Score',
};

const listTicker = {
  ORGAN_CODE: 'organCode',
  TICKER: 'ticker',
  ORGAN_SHORT_NAME: 'organShortName',
  COM_GROUP_CODE: 'comGroupCode',
  COM_TYPE_CODE: 'comTypeCode',
};

const listIndexName = {
  vnIndex: 'VNINDEX',
  hnIndex: 'HNXINDEX',
  upcomIndex: 'UPCOMINDEX',
};

const listIndexExchange = {
  hose: 'HOSE',
  hnx: 'HNX',
  upcom: 'UPCOM',
};

const industry = {
  //non-bank
  mc: 'rsd11',
  os: 'rsd3',
  eps: 'rsd14',
  pe: 'rsd21',
  pb: 'rsd25',
  ps: 'rsd26',
  pcf: 'rsd28',
  bvps: 'rsd7',
  ee: 'rsd30',

  rg: 'rsq78',
  eg: 'rsq81',
  npg: 'rsq83',
  roe: 'rsq12',
  roa: 'rsq14',
  roic: 'rsq23',
  gpm: 'rsq25',
  npm: 'rsq29',

  cur: 'rsq3',
  car: 'rsq1',
  fl: 'rsq71',
  ic: 'rsq101',

  dso: 'rsq16',
  dpo: 'rsq20',
  dio: 'rsq18',
  at: 'rsq31',

  dy: 'rsd20',
  dpy: 'rsd50',

  //bank
  dg: 'rsq51',
  lg: 'rsq50',
  niig: 'rsq67',
  npg: 'rsq83',
  roe: 'rsq12',
  roa: 'rsq14',
  nim: 'rsq44',
  cir: 'rsq118',
  nn: 'rsq47',
  yoea: 'rsq45',
  acof: 'rsq46',

  eli: 'rsq54',
  elo: 'rsq55',
  ea: 'rsq56',
  ldr: 'rsq123',

  npl: 'rsq58',
  llrn: 'rsq59',
  llrl: 'rsq60',
  pol: 'rsq61',
};

const FATable = {
  bank: {
    vr: {
      mc: 'rtd11',
      os: 'rtd3',
      eps: 'rtd14',
      pe: 'rtd21',
      pb: 'rtd25',
      bvps: 'rtd7',
    },
    pr: {
      dg: 'rtq51',
      lg: 'rtq50',
      niig: 'rtq67',
      npg: 'rtq83',
      roe: 'rtq12',
      roa: 'rtq14',
      nim: 'rtq44',
      cir: 'rtq118',
      nn: 'rtq47',
      yoea: 'rtq45',
      acof: 'rtq46',
    },
    car: {
      eli: 'rtq54',
      elo: 'rtq55',
      ea: 'rtq56',
      ldr: 'rtq123',
    },
    aqr: {
      npl: 'rtq58',
      llrn: 'rtq59',
      llrl: 'rtq60',
      pol: 'rtq61',
    },
    d: {
      dy: 'rtd20',
      dpy: 'rtd50',
    },
  },
  nonBank: {
    vr: {
      mc: 'rtd11',
      os: 'rtd3',
      eps: 'rtd14',
      pe: 'rtd21',
      pb: 'rtd25',
      ps: 'rtd26',
      pcf: 'rtd28',
      bvps: 'rtd7',
      ee: 'rtd30',
    },
    pr: {
      rg: 'rtq78',
      eg: 'rtq81',
      npg: 'rtq83',
      roe: 'rtq12',
      roa: 'rtq14',
      roic: 'rtq23',
      gpm: 'rtq25',
      npm: 'rtq29',
    },
    lr: {
      cur: 'rtq3',
      car: 'rtq1',
      fl: 'rtq71',
      ic: 'rtq101',
    },
    or: {
      dso: 'rtq16',
      dpo: 'rtq20',
      dio: 'rtq18',
      at: 'rtq31',
    },
    d: {
      dy: 'rtd20',
      dpy: 'rtd50',
    },
  },
};

const specialTtmKeysSwap = {
  // rtd11: 'ryd11',
  // rtd3: 'ryd3',
  // rtd14: 'ryd14',
  // rtd21: 'ryd21',
  // rtd25: 'ryd25',
  // rtd26: 'ryd26',
  // rtd28: 'ryd28',
  // rtd7: 'ryd7',
  // rtd30: 'ryd30',
  rtd11: 'rtd11',
  rtd3: 'rtd3',
  rtd14: 'rtd14',
  rtd21: 'rtd21',
  rtd25: 'rtd25',
  rtd26: 'rtd26',
  rtd28: 'rtd28',
  rtd7: 'rtd7',
  rtd30: 'rtd30',
};

const assetQualityChart = {
  bank: {
    ta: 'bsa53',
    tl: 'bsb103',
    tnpl: 'rtq69',
    npl: 'rtq58',
  },
};

const assetQualityChartTitle = {
  bank: {
    ta: 'Total Assets',
    tl: 'Total Loans',
    tnpl: 'Total Non-performing Loan',
    npl: 'NPL',
  },
};

const dupontChart = {
  bank: null,
  nonBank: {
    roe: 'rtq12',
    npm: 'rtq29',
    fl: 'rtq71',
    tat: 'rtq31',
  },
};

const dupontChartTitle = {
  bank: null,
  nonBank: {
    roe: 'ROE',
    npm: 'Net Profit Margin',
    fl: 'Financial Leverage',
    tat: 'Total Asset Turnover',
  },
};

const profitabilityChart = {
  bank: {
    roe: 'rtq12',
    roa: 'rtq14',
    nim: 'rtq44',
    cir: 'rtq118',
  },
  nonBank: {
    roe: 'rtq12',
    roa: 'rtq14',
    gpm: 'rtq25',
    npm: 'rtq29',
  },
  industry: {
    roe: 'rsq12',
    roa: 'rsq14',
    nim: 'rsq44',
    gpm: 'rsq25',
    npm: 'rsq29',
    cir: 'rsq118',
  },
};

const profitabilityTitle = {
  bank: {
    roe: '%ROE',
    roa: '%ROA',
    nim: '%NIM',
    cir: '%CIR',
  },
  nonBank: {
    roe: '%ROE',
    roa: '%ROA',
    npm: 'NPM',
    gpm: 'GPM',
  },
};

const profitabilityTooltip = {
  bank: {
    roe: '%ROE',
    roa: '%ROA',
    nim: '%NIM',
    cir: '%CIR',
  },
  nonBank: {
    roe: '%ROE',
    roa: '%ROA',
    npm: 'Net Profit Margin',
    gpm: 'Gross Profit Margin',
  },
};

const realTimeData = {
  MATCH_PRICE: 'matchPrice',
  PRICE_CHANGE: 'priceChange',
  PERCENT_PRICE_CHANGE: 'percentPriceChange',
  OPEN_PRICE: 'openPrice',
  HIGHEST_PRICE: 'highestPrice',
  LOWEST_PRICE: 'lowestPrice',
  REFERENCE_PRICE: 'referencePrice',
  TRADING_DATE: 'tradingDate',
};

export default {
  listTab,
  listTicker,
  listIndexName,
  listIndexExchange,
  dupontChart,
  profitabilityChart,
  profitabilityTitle,
  FATable,
  industry,
  realTimeData,
  dupontChartTitle,
  profitabilityTooltip,
  specialTtmKeysSwap,
  assetQualityChart,
  assetQualityChartTitle,
};
