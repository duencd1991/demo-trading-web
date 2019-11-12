import ServiceBase from '../../services/ServiceBase';
import indicatorsProxy from '../../../core/proxies/technical/IndicatorsProxy';
import lastPriceProxy from '../../../core/proxies/common/LastPriceProxy';
//TODO import {getListTechnical} from "../../../component/technical/ta-signals/indicators/Fake";
//TODO import {getItemIndicators} from "../../../component/technical/ta-signals/indicators/Fake";

class IndicatorsService extends ServiceBase {

  getListIndicatos(params, source) {
    return this.applyMemoryCache('IndicatorsService.GetIndicators', params)(() => indicatorsProxy.getListIndicatos(params, source));
  }
  getLastPriceData(params, source) {
    return this.applyMemoryCache('IndicatorsService.GetLatestPrice', params)(() => lastPriceProxy.GetLatestPrice(params, source));
  }

  // getItemIndicators(params, source) {
  //   // return this.applyMemoryCache('EconomyService.GetEconomy', params)(() => economyProxy.getListEconomy(params, source));
  //   return Promise.resolve(getItemIndicators(params));
  // }
}

const indicatorsService = new IndicatorsService();
export default indicatorsService;
