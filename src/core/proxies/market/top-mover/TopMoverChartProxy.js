import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopMoverChartProxy extends ProxyBase {

  getTopVolumeChartImage(data) {
    return this.get('Get6MonthsCandleStickChartImage', data);
  }
}

const topMoverChartProxy = new TopMoverChartProxy(ServiceProxyConfig.TopMover.ServiceChart);
export default topMoverChartProxy;
