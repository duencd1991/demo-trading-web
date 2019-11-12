import ServiceBase from '../ServiceBase';
// import {getDataFakePE} from "../../../component/fundamental/dividend-analysis/Fake";
import dividendAnalysisProxy from '../../proxies/fundamental/DividendAnalaysisProxy';
import lastPriceProxy from '../../proxies/common/LastPriceProxy';

class DividendAnalysisService extends ServiceBase {

  GetAnalysis(params, source) {
    return this.applyMemoryCache('DividendAnalysisService.GetAnalysis', params)(() => dividendAnalysisProxy.GetAnalysis(params, source));
    // return Promise.resolve(getDataFakePE(params));
  }

  getLastPriceData(params, source) {
    return this.applyMemoryCache('DividendAnalysisService.GetLatestPrice', params)(() => lastPriceProxy.GetLatestPrice(params, source));
  }
}

const dividendAnalysisService = new DividendAnalysisService();
export default dividendAnalysisService;
