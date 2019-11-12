import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopNewLowProxy extends ProxyBase {

  getTopNewLow(data) {
    return this.get('GetTopNewLow', data);
  }
}

const topNewLowProxy = new TopNewLowProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topNewLowProxy;
