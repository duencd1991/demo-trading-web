import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopBreakoutProxy extends ProxyBase {

  getTopBreakout(data) {
    return this.get('GetTopBreakout', data);
  }
}

const topBreakoutProxy = new TopBreakoutProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topBreakoutProxy;
