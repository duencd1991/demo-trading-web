import ServiceBase from '../../ServiceBase';
import economyProxy from '../../../proxies/market/market-calendar/EconomyProxy';
// import {getListEconomy} from "../../../../component/market/market-calendar/economy/Fake";

class EconomyService extends ServiceBase {

  getListEconomy(params, source) {
    return this.applyMemoryCache('EconomyService.GetEconomy', params)(() => economyProxy.getListEconomy(params, source));
    // return Promise.resolve(getListEconomy(params));
  }
}

const economyService = new EconomyService();
export default economyService;
