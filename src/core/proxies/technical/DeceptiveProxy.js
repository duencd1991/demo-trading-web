import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class DeceptiveProxy extends ProxyBase {

  getOverview(data) {
    return this.get('getOverview', data);
  }

  getAbnormality(data) {
    return this.get('GetCEFLAbnormality', data);
  }

  getCancelled(data) {
    return this.get('GetCancelled', data);
  }

  getPressing(data) {
    return this.get('GetPressing', data);
  }

  getAggressive(data) {
    return this.get('GetAggressive', data);
  }

  getClosing(data) {
    return this.get('GetClosing', data);
  }
}

const deceptiveProxy = new DeceptiveProxy(ServiceProxyConfig.Technical.Deceptive);
export default deceptiveProxy;
