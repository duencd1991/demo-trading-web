import ServiceBase from "../../ServiceBase";
import valuationProxy from '../../../proxies/market/market-in-depth/ValuationProxy';
import { getDataChart } from '../../../../component/market/market-in-depth/valuation/Fake';

class ValuationService extends ServiceBase {

  getValuationSeries(params) {
    // return Promise.resolve(getDataChart());
    return this.applyMemoryCache("MarketService.getValuationSeries", params)(() => valuationProxy.getValuationSeries(params));
  }

}

const valuationService = new ValuationService();
export default valuationService;
