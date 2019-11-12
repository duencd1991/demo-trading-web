import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ProprietaryProxy extends ProxyBase {
  getProprietary(data, source) {
    return this.get('GetProprietary', data, source);
  }
}

const proprietaryProxy = new ProprietaryProxy(ServiceProxyConfig.Market.MoneyFlow.ServiceUrl);
export default proprietaryProxy;
