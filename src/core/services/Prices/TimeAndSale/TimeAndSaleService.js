import TimeAndSaleProxy from '../../../proxies/prices/TimeAndSaleProxy';
import ServiceBase from '../../ServiceBase';

class TimeAndSaleService extends ServiceBase {
  getTimeAndSale(params) {
    return this.applyMemoryCache('TimeAndSaleService.getTimeAndSale', params)(() => TimeAndSaleProxy.getTimeAndSale(params));
  }
}

const timeAndSaleService = new TimeAndSaleService();
export default timeAndSaleService;
