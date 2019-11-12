import ServiceBase from "../../ServiceBase";
import {
  getDataFilterByYearAndKey,
  getMarketAnomalyData,
  getMarketAnomalyDataTableFilter
} from "../../../../component/market/market-in-depth/market-anomaly/Fake";
import marketAnomalyProxy from './../../../proxies/market/market-in-depth/MarketAnomalyProxy';

class MarketAnomalyService extends ServiceBase {

  getMarketAnomalyData(params) {
    return Promise.resolve(getMarketAnomalyData(params));
  }

  getListAnomaly(params) {
    return this.applyMemoryCache("MarketAnomalyService.getListAnomaly", params)(() => marketAnomalyProxy.getListAnomaly(params));
  }

  getMarketAnomalyDataTableFilter(params) {
    return Promise.resolve(getMarketAnomalyDataTableFilter(params));
  }

  getDataFilterByYearAndKey(year, key) {
    return Promise.resolve(getDataFilterByYearAndKey(year, key));
  }

}

const marketAnomalyService = new MarketAnomalyService();
export default marketAnomalyService;
