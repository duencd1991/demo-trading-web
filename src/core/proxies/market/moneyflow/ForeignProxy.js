import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ProprietaryProxy extends ProxyBase {
  getForeign(data, source) {
    return this.get('GetForeign', data, source);
  }
}

const foreignProxy = new ProprietaryProxy(ServiceProxyConfig.Market.MoneyFlow.ServiceUrl);
export default foreignProxy;
