import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class HeatMapProxy extends ProxyBase {
  getHeatMap(data, source) {
    return this.get('GetHeatMap', data, source);
  }
}

const heatMapProxy = new HeatMapProxy(ServiceProxyConfig.Market.HeatMap.ServiceUrl);
export default heatMapProxy;
