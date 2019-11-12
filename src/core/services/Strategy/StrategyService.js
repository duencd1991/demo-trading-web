import ServiceBase from '../../services/ServiceBase';
// import indicatorsProxy from '../../../core/proxies/technical/IndicatorsProxy';
// import lastPriceProxy from '../../../core/proxies/common/LastPriceProxy';
import { fetchOverview } from '../../../component/strategy/strategy/fiinTradeStrategy/Fake';
import { getItemValue } from '../../../component/strategy/strategy/fiinTradeStrategy/Fake';

class StrategyService extends ServiceBase {
  // getListIndicatos(params, source) {
  //   return this.applyMemoryCache('IndicatorsService.GetIndicators', params)(() => indicatorsProxy.getListIndicatos(params, source));
  // }
  // getLastPriceData(params, source) {
  //   return this.applyMemoryCache('IndicatorsService.GetLatestPrice', params)(() => lastPriceProxy.GetLatestPrice(params, source));
  // }

  fetchOverview(params, source) {
    // return this.applyMemoryCache('EconomyService.GetEconomy', params)(() => economyProxy.getListEconomy(params, source));
    return Promise.resolve(fetchOverview(params));
  }
  fetchValue(params, source) {
    // return this.applyMemoryCache('EconomyService.GetEconomy', params)(() => economyProxy.getListEconomy(params, source));
    return Promise.resolve(getItemValue(params));
  }
}

const strategyService = new StrategyService();
export default strategyService;
