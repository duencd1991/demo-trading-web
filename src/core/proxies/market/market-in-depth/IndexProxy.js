import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class IndexProxy extends ProxyBase {
  getLatestIndices(data) {
    return this.get('GetLatestIndices', data);
  }

  getIndexSeries(data, source) {
    return this.get('GetIndexSeries', data, source);
  }
}

const indexProxy = new IndexProxy(
  ServiceProxyConfig.Market.MarketInDepth.ServiceUrl,
);
export default indexProxy;
