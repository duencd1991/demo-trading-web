import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class EconomyProxy extends ProxyBase {
  getListEconomy(data, source) {
    return this.get('GetEconomy', data, source);
  }
}
const economyProxy = new EconomyProxy(ServiceProxyConfig.Market.MarketCalendar.ServiceUrl);
export default economyProxy;

