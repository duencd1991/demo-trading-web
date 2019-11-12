import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class PriceDepthProxy extends ProxyBase {
  getPriceDepth(data) {
    return this.get('GetPriceDepth', data);
  }
}

const priceDepthProxy = new PriceDepthProxy(ServiceProxyConfig.Prices.PriceDepthUrl);
export default priceDepthProxy;
