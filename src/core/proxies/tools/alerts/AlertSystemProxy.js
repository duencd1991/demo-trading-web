import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class AlertCommonProxy extends ProxyBase {

  getAlertChartImage(data) {
    return this.get('Get6MonthsCandleStickChartImage', data);
  }
}

const alertCommonProxy = new AlertCommonProxy(ServiceProxyConfig.Tools.Alerts.ServiceChart);
export default alertCommonProxy;
