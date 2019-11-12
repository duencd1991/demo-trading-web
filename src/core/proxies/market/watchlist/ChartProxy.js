import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ChartProxy extends ProxyBase {

  get6MonthsCandleStickChartImage(data, source) {
    return this.get('Get6MonthsCandleStickChartImage', data, source);
  }

}

const chartProxy = new ChartProxy(ServiceProxyConfig.Market.Chart.ServiceUrl);
export default chartProxy;
