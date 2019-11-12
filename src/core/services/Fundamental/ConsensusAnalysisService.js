import consensusAnalysisProxy from '../../proxies/fundamental/ConsensusAnalysisProxy';
import ServiceBase from './../ServiceBase';

export class ConsensusAnalysisService extends ServiceBase {
  getConsensus(params) {
    return this.applyMemoryCache('ConsensusAnalysisService.GetConsensus', params)(
      () => consensusAnalysisProxy.GetConsensus(params)
    );
  }
}

const consensusAnalysisService = new ConsensusAnalysisService();
export default consensusAnalysisService;
