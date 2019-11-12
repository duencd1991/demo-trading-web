import newsAnalysisProxy from '../../proxies/news/newsAnalysisProxy';
import ServiceBase from '../ServiceBase';

class NewsAnalysisService extends ServiceBase {
  getAggregatorNews(params) {
    return this.applyMemoryCache('NewsAnalysis.getAggregatorNews', params)(() =>
      newsAnalysisProxy.getAggregatorNews(params),
    );
  }
  getAutoNews(params) {
    return this.applyMemoryCache('NewsAnalysis.getAutoNews', params)(() =>
      newsAnalysisProxy.getAutoNews(params),
    );
  }
  getPremiumAnalysis(params) {
    return this.applyMemoryCache('NewsAnalysis.getPremiumAnalysis', params)(
      () => newsAnalysisProxy.getPremiumAnalysis(params),
    );
  }
  getMostRecent(params) {
    return this.applyMemoryCache('NewsAnalysis.getMostRecent', params)(() =>
      newsAnalysisProxy.getMostRecent(params),
    );
  }
  getContributor(params) {
    return this.applyMemoryCache('NewsAnalysis.getContributor', params)(() =>
      newsAnalysisProxy.getContributor(params),
    );
  }
  getMostPopular(params) {
    return this.applyMemoryCache('NewsAnalysis.getMostPopular', params)(() =>
      newsAnalysisProxy.getMostPopular(params),
    );
  }
  getRumors(params) {
    return this.applyMemoryCache('NewsAnalysis.getRumors', params)(() =>
      newsAnalysisProxy.getRumors(params),
    );
  }
  getNewsByExpert(params) {
    return this.applyMemoryCache('NewsAnalysis.getNewsByExpert', params)(() =>
      newsAnalysisProxy.getNewsByExpert(params),
    );
  }
}

const newsAnalysisService = new NewsAnalysisService();
export default newsAnalysisService;
