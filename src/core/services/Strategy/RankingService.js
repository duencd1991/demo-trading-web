import ServiceBase from '../../services/ServiceBase';
import strategyProxy from '../../proxies/strategy/StrategyProxy';
// import { getListRanking } from "../../../component/strategy/ranking/Fake";
class RankingService extends ServiceBase {
  getDataRanking(params, source) {
    return this.applyMemoryCache('getRanking', params)(() =>
      strategyProxy.getRanking(params),
    );
  }
  getAllScore(params, source) {
    return this.applyMemoryCache('getAllScore', params)(() =>
      strategyProxy.getAllScore(params),
    );
  }
}

const rankingService = new RankingService();
export default rankingService;
