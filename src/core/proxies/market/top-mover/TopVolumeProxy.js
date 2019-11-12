import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class OverviewProxy extends ProxyBase {

  getTopVolume(data) {
    return this.get('GetTopVolume', data);
  }

  getTopVolumeChartImage(data) {
    return this.get('Get6MonthsCandleStickChartImage', data);
  }
}

const overviewProxy = new OverviewProxy(ServiceProxyConfig.TopMover.ServiceUrl);
export default overviewProxy;
