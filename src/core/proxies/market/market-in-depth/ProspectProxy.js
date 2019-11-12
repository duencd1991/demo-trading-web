import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ProspectProxy extends ProxyBase {

  getListProSpect(data) {
    return this.get('GetProspect', data);
  }
}

const prospectProxy = new ProspectProxy(ServiceProxyConfig.Market.MarketInDepth.ServiceUrl);
export default prospectProxy;
