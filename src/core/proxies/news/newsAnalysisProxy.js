import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class NewsAnalysisProxy extends ProxyBase {
  getAggregatorNews(params) {
    return this.get('GetAggregatorNews', params);
  }
  getAutoNews(params) {
    return this.get('GetAutoNews', params);
  }
  getPremiumAnalysis(params) {
    return this.get('GetPremiumAnalysis', params);
  }
  getMostRecent(params) {
    return this.get('GetMostRecent', params);
  }
  getContributor(params) {
    return this.get('GetContributor', params);
  }
  getMostPopular(params) {
    return this.get('GetMostPopular', params);
  }
  getRumors(params) {
    return this.get('GetRumors', params);
  }
  getNewsByExpert(params) {
    return this.get('GetNewsByExpert', params);
  }
}

const newsAnalysisProxy = new NewsAnalysisProxy(
  ServiceProxyConfig.News.ServiceUrl,
);
export default newsAnalysisProxy;
