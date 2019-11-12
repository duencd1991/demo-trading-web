import ServiceBase from "../../ServiceBase";
import prospectProxy from './../../../proxies/market/market-in-depth/ProspectProxy';
// import { getListProSpect } from '../../../../component/market/market-in-depth/prospect/Fake';

class ProspectService extends ServiceBase {

  getListProSpect(params) {
    return this.applyMemoryCache("ProspectService.getListProSpect", params)(() => prospectProxy.getListProSpect(params));
    // return Promise.resolve(getListProSpect());
  }
}

const prospectService = new ProspectService();
export default prospectService;
