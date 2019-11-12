const listColumn = {
  item: 'item',
  checkupItem: 'checkupItem',
  comparingCheckupItemOne: 'comparingCheckupItemOne',
  comparingCheckupItemTwo: 'comparingCheckupItemTwo',
  lookupItems: 'lookupItems',
};
const listHideColumn = ['lookupItems'];

const listIconKeyEN = {
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
};

const listIconKeyVI = {
  FA_Equity_Issurance: 'FA_Phát hành tăng vốn',
  FA_Revenue_Growth: 'FA_Tăng trưởng doanh thu',
  FA_Gross_Margin: 'FA_Biên lợi nhuận gộp',
  FA_Profit_Growth: 'FA_Tăng trưởng lợi nhuận',
  FA_CFO: 'FA_Chất lượng dòng tiền',
  FA_Financial_strength: 'FA_Khả năng thanh toán',
  FA_Debt: 'FA_Gánh nặng nợ',
  FA_capital_structure: 'FA_Cơ cấu vốn',
  FA_ROE: 'FA_ROE',
  FA_Financial_Plan: 'FA_Kế hoạch kinh doanh',
};

const keyIcons = [
  'FA_Equity_Issurance',
  'FA_Revenue_Growth',
  'FA_Gross_Margin',
  'FA_Profit_Growth',
  'FA_CFO',
  'FA_Financial_strength',
  'FA_Debt',
  'FA_capital_structure',
  'FA_ROE',
  'FA_Financial_Plan',
];

export default {
  listColumn,
  listHideColumn,
  listIconKeyEN,
  listIconKeyVI,
  keyIcons,
  idFaCheckup: 'idFaCheckup',
  defaultOption: 'VolPriceIncrease',
  maxRowData: 50,
};
