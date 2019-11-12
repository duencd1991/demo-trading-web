import ServiceBase from '../../ServiceBase';
import proprietaryProxy from '../../../proxies/market/moneyflow/ProprietaryProxy';

class ProprietaryService extends ServiceBase {
  getProprietary(params, source) {
    return this.applyMemoryCache('ProprietaryService.getProprietary', params)(() => proprietaryProxy.getProprietary(params, source));
  }
}

const proprietaryService = new ProprietaryService();
export default proprietaryService;
