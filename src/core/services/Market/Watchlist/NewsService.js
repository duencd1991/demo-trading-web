import ServiceBase from '../../ServiceBase';
import newsProxy from './../../../proxies/market/watchlist/NewsProxy';
//TODO import { getListTable } from '../../../../component/market/watchlist/news/Fake';

class NewsService extends ServiceBase {

  getListWatchListNews(params, source) {
    // return Promise.resolve(getListTable());
    return this.getData(() => newsProxy.getListWatchListNews(params, source));
    // return this.applyMemoryCache('NewsService.getListWatchListNews', params)(() => newsProxy.getListWatchListNews(params));
  }

}

const newsService = new NewsService();
export default newsService;
