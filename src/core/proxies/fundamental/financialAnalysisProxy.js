import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class FinancialAnalysisProxy extends ProxyBase {
  getZMFScore(params) {
    return this.get('GetZMFScore', params);
  }

  getFinancialRatio(params) {
    return this.get('GetFinancialRatio', params);
  }

  getFACheckup(params) {
    return this.get('GetCheckup', params);
  }
}

const financialAnalysisProxy = new FinancialAnalysisProxy(ServiceProxyConfig.Fundamental.FinancialAnalysis.ServiceUrl);
export default financialAnalysisProxy;
