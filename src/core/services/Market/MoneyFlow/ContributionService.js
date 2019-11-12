import ServiceBase from '../../ServiceBase';
import contributionProxy from '../../../proxies/market/moneyflow/ContributionProxy';

class ContributionService extends ServiceBase {
  getContribution(params, source) {
    return this.applyMemoryCache('ContributionService.getContribution', params)(() => contributionProxy.getContribution(params, source));
  }
}

const contributionService = new ContributionService();
export default contributionService;
