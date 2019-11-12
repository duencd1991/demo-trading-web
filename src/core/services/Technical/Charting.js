import chartingProxy from '../../proxies/technical/Charting';
import ServiceBase from '../ServiceBase';

class ChartingService extends ServiceBase {
  getTradingViewData(params) {
    return chartingProxy.getTradingViewData(params);
  }

  getStockEvents(params) {
    return chartingProxy.getStockEvents(params);
  }

  saveTemplate(data) {
    return chartingProxy.saveTemplate(data);
  }

  getTemplate() {
    return this.applyMemoryCache('Charting_GetTemplate')(() =>
      chartingProxy.getTemplate(),
    );
  }
}

const chartingService = new ChartingService();
export default chartingService;
