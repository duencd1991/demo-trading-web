import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class IndexProxy extends ProxyBase {

  getValuationSeries(data) {
    return this.get('GetValuationSeries', data);
  }

}

const indexProxy = new IndexProxy(ServiceProxyConfig.Market.MarketInDepth.ServiceUrl);
export default indexProxy;
