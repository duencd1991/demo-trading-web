import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class PriceDataProxy extends ProxyBase {
  getPriceData(data) {
    return this.get('GetPriceData', data);
  }

  getLatestPrice(data){
    return this.get('GetLatestPrice',data);
  }
}

const priceDataProxy = new PriceDataProxy(ServiceProxyConfig.Prices.PriceDataUrl);
export default priceDataProxy;
