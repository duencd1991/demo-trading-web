import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class IndicatorsProxy extends ProxyBase {
  getListIndicatos(data, source) {
    return this.get('GetIndicators', data, source);
  }
}
const indicatorsProxy = new IndicatorsProxy(ServiceProxyConfig.Technical.Deceptive);
export default indicatorsProxy;

