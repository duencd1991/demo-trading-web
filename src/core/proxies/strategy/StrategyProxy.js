import ProxyBase from './../ProxyBase';
import ServiceProxyConfig from './../../../configs/ServiceProxyConfig';

class StrategyProxy extends ProxyBase {
  getRanking(params) {
    return this.get('GetRanking', params);
  }
  getAllScore(params) {
    return this.get('GetAllScore', params);
  }
}

const strategyProxy = new StrategyProxy(
  ServiceProxyConfig.Stategy.Ranking.ServiceUrl,
);
export default strategyProxy;
