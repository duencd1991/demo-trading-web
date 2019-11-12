import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class WatchListProxy extends ProxyBase {
  getListWatchList(data, source) {
    return this.get('GetCalendarWatchList', data, source);
  }
}

const watchListProxy = new WatchListProxy(ServiceProxyConfig.Market.MarketCalendar.ServiceUrl);
export default watchListProxy;
