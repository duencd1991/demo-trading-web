import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class NewsProxy extends ProxyBase {
  getListWatchListNews(data, source) {
    return this.get('GetWatchListNews', data, source);
  }
}

const newsProxy = new NewsProxy(ServiceProxyConfig.Market.WatchList.ServiceUrl);
export default newsProxy;
