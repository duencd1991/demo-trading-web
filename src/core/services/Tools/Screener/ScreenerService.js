import screenerProxy from '../../../proxies/tools/screener/ScreenerProxy';
import ServiceBase from '../../ServiceBase';

class ScreenerService extends ServiceBase {
  getScreenerParameters(params) {
    return this.applyMemoryCache(
      'ScreenerService.getScreenerParameters',
      params,
    )(() => screenerProxy.getScreenerParameters(params));
  }

  getScreenerItems(params) {
    return this.applyMemoryCache('ScreenerService.getScreenerItems', params)(
      () => screenerProxy.getScreenerItems(params),
    );
  }

  getScreenerExport(params) {
    return this.applyMemoryCache('ScreenerService.getScreenerExport', params)(
      () => screenerProxy.getScreenerExport(params),
    );
  }
}

const screenerService = new ScreenerService();
export default screenerService;
