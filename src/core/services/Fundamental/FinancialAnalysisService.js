import financialAnalysisProxy from '../../proxies/fundamental/financialAnalysisProxy';
import ServiceBase from '../ServiceBase';


class FinancialAnalysisService extends ServiceBase {
  getZMFScore(params) {
    return this.applyMemoryCache('FinancialAnalysis.getZMFScore', params)(() => financialAnalysisProxy.getZMFScore(params));
  }

  getFinancialRatio(params) {
    return this.applyMemoryCache('FinancialAnalysis.getFinancialRatio', params)(() => financialAnalysisProxy.getFinancialRatio(params));
  }

  getFACheckup(params) {
    return this.applyMemoryCache('FinancialAnalysis.getFACheckup', params)(() => financialAnalysisProxy.getFACheckup(params));
  }
}

const financialAnalysisService = new FinancialAnalysisService();
export default financialAnalysisService;
