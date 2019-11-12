import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class TimeAndSaleProxy extends ProxyBase {
  getTimeAndSale(data) {
    return this.get('GetTimeAndSales', data);
  }
}

const timeAndSaleProxy = new TimeAndSaleProxy(ServiceProxyConfig.Prices.TimeAndSaleUrl);
export default timeAndSaleProxy;
