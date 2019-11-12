import ServiceBase from '../../ServiceBase';
import foreignProxy from '../../../proxies/market/moneyflow/ForeignProxy';

class ForeignService extends ServiceBase {
  getForeign(params, source) {
    return this.applyMemoryCache('ForeignService.getForeign', params)(() => foreignProxy.getForeign(params, source));
  }
}

const foreignService = new ForeignService();
export default foreignService;
