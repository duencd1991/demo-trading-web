import priceDepthProxy from '../../../proxies/prices/PriceDepthProxy';
import ServiceBase from '../../ServiceBase';

class PriceDepthService extends ServiceBase {
  getPriceDepth(params) {
    return this.applyMemoryCache('PriceDepthService.getPriceDepth', params)(() => priceDepthProxy.getPriceDepth(params));
  }
}

const priceDepthService = new PriceDepthService();
export default priceDepthService;
