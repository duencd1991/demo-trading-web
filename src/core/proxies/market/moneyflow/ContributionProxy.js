import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ContributionProxy extends ProxyBase {
  getContribution(data, source) {
    return this.get('GetContribution', data, source);
  }
}

const contributionProxy = new ContributionProxy(ServiceProxyConfig.Market.MoneyFlow.ServiceUrl);
export default contributionProxy;
