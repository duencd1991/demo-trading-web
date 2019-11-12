import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class MasterProxy extends ProxyBase {
  getListOrganization(data) {
    return this.get('GetListOrganization', data);
  }

  getAllCompanyGroup(data) {
    return this.get('GetAllCompanyGroup', data);
  }

  getAllIcbIndustry(data) {
    return this.get('GetAllIcbIndustry', data);
  }

  getAllDerivatives(data) {
    return this.get('GetAllDerivatives', data);
  }

  getAllChartEconomy(data) {
    return this.get('GetAllChartEconomy', data);
  }

  getTimeOffset(data) {
    return this.get('GetTimeOffset', data);
  }
}

const masterProxy = new MasterProxy(
  ServiceProxyConfig.Common.Master.ServiceUrl,
);
export default masterProxy;
