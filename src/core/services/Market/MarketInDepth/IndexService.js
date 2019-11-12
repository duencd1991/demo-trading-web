import ServiceBase from '../../ServiceBase';
import indexProxy from '../../../proxies/market/market-in-depth/IndexProxy';
//TODO import { getListDataChart } from '../../../../component/market/market-in-depth/index2/Fake';

class IndexService extends ServiceBase {
  getLatestIndices(params) {
    return this.applyMemoryCache('MarketService.getComGroupList', params)(() =>
      indexProxy.getLatestIndices(params),
    );
  }

  getIndexSeries(params, source) {
    // return Promise.resolve(getListDataChart());
    return this.applyMemoryCache(
      'ExchangeRealtimeService.getTodayIndexSeries',
      params,
    )(() => indexProxy.getIndexSeries(params, source));
  }
}

const indexService = new IndexService();
export default indexService;
