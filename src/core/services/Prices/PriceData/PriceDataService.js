import priceDataProxy from '../../../proxies/prices/PriceDataProxy';
import ServiceBase from '../../ServiceBase';

class PriceDataService extends ServiceBase {
  getPriceData(params) {
    return this.applyMemoryCache('PriceDataService.getPriceData', params)(() => priceDataProxy.getPriceData(params));
  }

  getLatestPrice(params) {
    return this.applyMemoryCache('PriceDataService.GetLatestPrice', params)(() => priceDataProxy.getLatestPrice(params));
  }
}

const priceDataService = new PriceDataService();
export default priceDataService;
