import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopValueProxy extends ProxyBase {

  getTopValue(data) {
    return this.get('GetTopValue', data);
  }
}

const topValueProxy = new TopValueProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topValueProxy;
