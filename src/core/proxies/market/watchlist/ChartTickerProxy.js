import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ChartTickerProxy extends ProxyBase {
  getTickerSeries(data, source) {
    return this.get('GetTickerSeries', data, source);
  }
}

const chartTickerProxy = new ChartTickerProxy(
  ServiceProxyConfig.Market.WatchList.ServiceUrl,
);
export default chartTickerProxy;
