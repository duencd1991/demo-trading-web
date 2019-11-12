import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class MarketAnomalyProxy extends ProxyBase {

  getListAnomaly(data) {
    return this.get('GetMarketAnomaly', data);
  }

}

const marketAnomalyProxy = new MarketAnomalyProxy(ServiceProxyConfig.Market.MarketInDepth.ServiceUrl);
export default marketAnomalyProxy;
