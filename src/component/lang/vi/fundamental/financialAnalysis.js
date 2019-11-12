export default {
  tabs: {
    fc: 'FA Checkup',
    fr: 'Financial Ratio',
    zmf: 'ZMF-Score',
  },

  tableParentCaption: {
    vr: 'Valuation Ratio_V',
    pr: 'Profitability Ratio_V',
    gr: 'Growth Ratio_V',
    lr: 'Liquidity Ratio_V',
    or: 'Operating Ratio_V',
    cr: 'Credit Risk Ratio_V',
    d: 'Dividend_V',
    car: 'Capital Adequacy Ratio_V',
    aqr: 'Asset Quality Ratio_V',
  },

  tableChildCaption: {
    //non-bank
    mc: 'Market Cap. (Bn. VND)_V',
    os: 'Outstanding Shares (Mil.)_V',
    eps: 'EPS (VND)_V',
    pe: 'P/E_V',
    pb: 'P/B_V',
    ps: 'P/S_V',
    pcf: 'P/Cash Flow_V',
    bvps: 'BVPS_V',
    ee: 'EV/EBITDA_V',

    rg: 'Revenue Growth_V',
    eg: 'EBIT Growth_V',
    npg: 'Net Profit Growth_V',
    roe: 'ROE%_V',
    roa: 'ROA%_V',
    roic: 'ROIC',
    gpm: 'Gross Profit Margin_V',
    npm: 'Net Profit Margin_V',

    cur: 'Current Ratio_V',
    car: 'Cash Ratio_V',
    fl: 'Financial Leverage_V',
    ic: 'Interest Coverage_V',

    dso: 'Days Sales Outstanding_V',
    dpo: 'Days Payable Outstanding_V',
    dio: 'Days Inventory Outstanding_V',
    at: 'Asset Turnover_V',

    dy: 'Dividend Yield_V',
    dpy: 'Dividend Payout Yield_V',

    //bank
    dg: 'Deposit growth_V',
    lg: 'Loans growth_V',
    niig: 'Net Interest Income growth_V',
    npg: 'Net Profit Growth_V',
    nim: 'NIM %_V',
    cir: 'Cost-to-Income (CIR)_V',
    nn: 'Non-interest income/ Net Interest Income_V',
    yoea: 'Average Yield on Earning Assets (YOEA)_V',
    acof: 'Average Cost of Financing (COF)_V',

    eli: 'Equity/Liabilities_V',
    elo: 'Equity/Loans_V',
    ea: 'Equity/Assets_V',
    ldr: 'Loans/Deposit Ratio (LDR)_V',

    npl: 'NPL',
    llrn: 'Loan-loss reserves/NPLs_V',
    llrl: 'Loan-loss reserves/Loans_V',
    pol: 'Provision/Outstanding Loans_V',

    // mc: 'Vốn hóa thị trường (Marcap)',
    // os: 'Số CP Lưu hành',
    // eps: 'EPS cơ bản',
    // epsg: 'Tốc độ tăng trưởng EPS',
    // peg: 'PEG',
    // pe: 'P/E cơ bản',
    // ped: 'P/E pha loãng',
    // pb: 'Hệ số Giá Cổ phiếu/Trị giá Sổ sách (P/B)',
    // ps: 'Hệ số Giá Cổ phiếu/Doanh số trên cổ phiếu (P/S)',
    // ptb: 'Hệ số Giá/Trị giá Sổ sách TSHH (P/Tangible Book)',
    // pcf: 'Hệ số giá/Dòng tiền (P/Cash Flow)',
    // ee: 'Giá trị Doanh nghiệp/EBITDA',
    // dg: 'Tăng trưởng huy động vốn',
    // cg: 'Tăng trưởng tín dụng',
    // ag: 'Tăng trưởng Tài sản',
    // eqg: 'Tăng trưởng vốn',
    // roe: 'ROE %',
    // roa: 'ROA %',
    // nim: 'Biên lãi suất ròng',
    // nn: 'Thu nhập ngoài lãi/Thu nhập từ lãi',
    // cir: 'Tỷ lệ chi phí / Thu nhập',
    // lta: 'Tỷ suất dư nợ/ Tổng tài sản',
    // ltd: 'Tỷ suất dư nợ/ Tiền gửi',
    // npl: 'Tỷ lệ nợ xấu',
    // ppl: 'Trích lập dự phòng/ Dư nợ cho vay',
    // rg: 'Tốc độ tăng trưởng doanh số thuần',
    // ebg: 'Tốc độ tăng trưởng EBIT',
    // cur: 'Tỷ suất thanh toán hiện thời',
    // car: 'Tỷ suất thanh toán tiền mặt',
    // ic: 'Hệ số thanh toán lãi vay',
    // dso: 'Thời gian trung bình thu tiền khách hàng',
    // dpo: 'Thời gian trung bình thanh toán cho nhà cung cấp',
    // dio: 'Thời gian trung bình xử lý HTK',
    // dy: 'Tỷ suất cổ tức',
    // dpy: 'Hệ số thanh toán cổ tức',
    // bvps: 'Giá trị sổ sách/CP (BV)',
    // roic: 'ROIC',
    // gpm: 'GPM',
    // fl: 'Tổng TS/ Tổng VCSH',
    // at: 'Hệ số vòng quay TS',
  },

  profitabilityTitle: {
    bank: {
      roe: 'ROE %',
      roa: 'ROA %',
      nim: 'NIM %',
      cir: 'CIR %',
    },
    nonBank: {
      roe: 'ROE',
      roa: 'ROA',
      gpm: 'Gross Profit Margin',
      npm: 'Net Profit Margin',
    },
  },

  lstTab: {
    faCheckup: 'FA Checkup_v',
    financialRatio: 'Financial Ratio_v',
    zmfScore: 'ZMF-Score_v',
  },

  faCheckupHeader: {
    checkupItem: '%{checkupItem}',
    comparingCheckupItemOne: '%{comparingCheckupItemOne}',
    comparingCheckupItemTwo: '%{comparingCheckupItemTwo}',
    ticker: 'item',
  },

  faCheckupFooter: {
    excellent: 'Excellent_v',
    good: 'Good_v',
    neutral: 'Neutral_v',
    beAlert: 'Be Alert_v',
    watchOut: 'Watch Out_v',
  },

  listIconKey: {
    FA_Equity_Issurance: 'FA_Equity Issurance',
    FA_Revenue_Growth: 'FA_Revenue Growth',
    FA_Gross_Margin: 'FA_Gross Margin',
    FA_Profit_Growth: 'FA_Profit Growth',
    FA_CFO: 'FA_CFO',
    FA_Financial_strength: 'FA_Financial strength',
    FA_Debt: 'FA_Debt',
    FA_capital_structure: 'FA_capital structure',
    FA_ROE: 'FA_ROE',
    FA_Financial_Plan: 'FA_Financial Plan',
  },
  columnOneTable: {
    RAPID_EQUITY_ISSUANCE: 'Phát hành tăng vốn',
    REVENUE_GROWTH: 'Tăng trưởng doanh thu',
    GROSS_PROFIT_MARGIN: 'Biên lợi nhuận gộp',
    PROFIT_GROWTH: 'Tăng trưởng lợi nhuận',
    CFO_QUALITY: 'Chất lượng dòng tiền',
    OPERATION_EFFICIENCY: 'Khả năng thanh toán',
    DEBT_PRESSURE: 'Gánh nặng nợ',
    CAPITAL_STRUCTURE: 'Cơ cấu vốn',
    ROE: 'ROE',
    FINANCIAL_PLANNING: 'Kế hoạch kinh doanh',
    DEPOSIT_GROWTH: 'Tăng trưởng tiền gửi',
    CREDIT_GROWTH: 'Tăng trưởng tín dụng',
    PROFIT_ABILITY: 'Khả năng sinh lời',
    ASSET_QUALITY: 'Chất lượng tài sản',
  },
};