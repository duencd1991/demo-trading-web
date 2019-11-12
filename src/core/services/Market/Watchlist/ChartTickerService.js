import ServiceBase from '../../ServiceBase';
import chartTickerProxy from '../../../proxies/market/watchlist/ChartTickerProxy';

class ChartTickerService extends ServiceBase {
  getTickerSeries(params, source) {
    return this.applyMemoryCache('ChartTickerService.getTickerSeries', params)(
      () => chartTickerProxy.getTickerSeries(params, source),
    );
  }
}

const chartTickerService = new ChartTickerService();
export default chartTickerService;
