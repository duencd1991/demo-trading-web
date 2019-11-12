import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class ConsensusAnalysisProxy extends ProxyBase {
  GetConsensus(params) {
    return this.get('GetConsensus', params);
  }
}

const consensusAnalysisProxy = new ConsensusAnalysisProxy(ServiceProxyConfig.Fundamental.ConsensusAnalysis.ServiceUrl);
export default consensusAnalysisProxy;
