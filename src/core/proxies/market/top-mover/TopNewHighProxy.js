import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopNewHighProxy extends ProxyBase {

  getTopNewHigh(data, source) {
    return this.get('GetTopNewHigh', data, source);
  }
}

const topNewHighProxy = new TopNewHighProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default topNewHighProxy;
