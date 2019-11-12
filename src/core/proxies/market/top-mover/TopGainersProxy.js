import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopGainersProxy extends ProxyBase {

  getTopGainers(data) {
    return this.get('GetTopGainers', data);
  }
}

const topGainersProxy = new TopGainersProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topGainersProxy;
