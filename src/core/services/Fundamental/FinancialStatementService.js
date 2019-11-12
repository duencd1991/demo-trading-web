import financialStatementProxy from '../../proxies/fundamental/FinancialStatementProxy';
import ServiceBase from '../../services/ServiceBase';

class FinancialStatementService extends ServiceBase {
  getBalanceSheet(params) {
    return this.applyMemoryCache('FinancialStatement.GetBalanceSheet', params)(() => financialStatementProxy.getBalanceSheet(params));
  }

  getIncomeStatement(params) {
    return this.applyMemoryCache('FinancialStatement.GetIncomeStatement', params)(() => financialStatementProxy.getIncomeStatement(params));
  }

  getCashFlowStatement(params) {
    return this.applyMemoryCache('FinancialStatement.GetCashFlowStatement', params)(() => financialStatementProxy.getCashFlowStatement(params));
  }
}

const financialStatementService = new FinancialStatementService();
export default financialStatementService;
