import ServiceBase from "../../ServiceBase";
import chartProxy from '../../../proxies/market/watchlist/ChartProxy';

class ChartService extends ServiceBase {

  get6MonthsCandleStickChartImage(params, source) {
    return this.applyMemoryCache("ChartService.get6MonthsCandleStickChartImage", params)(() => chartProxy.get6MonthsCandleStickChartImage(params, source));
  }
}

const chartService = new ChartService();
export default chartService;
