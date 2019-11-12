import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class LastPriceProxy extends ProxyBase {
  GetLatestPrice(data, source) {
    return this.get('GetLatestPrice', data, source);
  }
}
const lastPriceProxy = new LastPriceProxy(ServiceProxyConfig.Prices.PriceDataUrl);
export default lastPriceProxy;

