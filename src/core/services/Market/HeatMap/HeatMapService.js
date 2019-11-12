import heatMapProxy from '../../../proxies/market/HeatMapProxy';
import ServiceBase from '../../ServiceBase';

class HeatMapService extends ServiceBase {

  getHeatMap(params, source) {
    return this.applyMemoryCache('HeatMapService.getHeatMap', params)(() => heatMapProxy.getHeatMap(params, source));
  }
}

const heatMapService = new HeatMapService();
export default heatMapService;
