import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopLosersProxy extends ProxyBase {

  getTopLosers(data) {
    return this.get('GetTopLosers', data);
  }
}

const topLosersProxy = new TopLosersProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topLosersProxy;
