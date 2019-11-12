import ProxyBase from './../ProxyBase';
import ServiceProxyConfig from './../../../configs/ServiceProxyConfig';

class FinancialStatementProxy extends ProxyBase {
  getBalanceSheet(params) {
    return this.get('GetBalanceSheet', params);
  }

  getFinancialRatio(params) {
    return this.get('GetFinancialRatio', params);
  }

  getIncomeStatement(params) {
    return this.get('GetIncomeStatement', params);
  }

  getCashFlowStatement(params) {
    return this.get('GetCashFlow', params);
  }
}

const financialStatementProxy = new FinancialStatementProxy(ServiceProxyConfig.Fundamental.FinancialStatement.ServiceUrl);
export default financialStatementProxy;
