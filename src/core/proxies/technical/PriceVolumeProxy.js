import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class PriceVolumeProxy extends ProxyBase {
  getListPriceVolume(data, source) {
    return this.get('GetPriceVolumeAnalysis', data, source);
  }
}
const priceVolumeProxy = new PriceVolumeProxy(ServiceProxyConfig.Technical.Deceptive);
export default priceVolumeProxy;

