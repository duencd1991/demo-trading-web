import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class ChartingProxy extends ProxyBase {
  getTradingViewData(params) {
    return this.get('GetStockChartData', params);
  }

  getStockEvents(params) {
    return this.get('GetStockEvents', params);
  }

  saveTemplate(data) {
    return this.post('templates', data);
  }

  getTemplate() {
    return this.get('templates');
  }
}

const chartingProxy = new ChartingProxy(ServiceProxyConfig.Technical.Charting);
export default chartingProxy;
