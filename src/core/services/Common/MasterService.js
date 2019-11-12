import ServiceBase from '../ServiceBase';
import masterProxy from '../../proxies/common/MasterProxy';

class MasterService extends ServiceBase {
  // List ticker
  getListOrganization(params) {
    return this.applyMemoryCache('MasterService.getListOrganization', params)(
      () => masterProxy.getListOrganization(params),
    );
  }

  // List Index
  getAllCompanyGroup(params) {
    return this.applyMemoryCache('MasterService.getAllCompanyGroup', params)(
      () => masterProxy.getAllCompanyGroup(params),
    );
  }

  // icb: icbLevel=3
  getAllIcbIndustry(params) {
    return this.applyMemoryCache('MasterService.getAllIcbIndustry', params)(
      () => masterProxy.getAllIcbIndustry(params),
    );
  }

  // ListDerivatives
  getAllDerivatives(params) {
    return this.applyMemoryCache('MasterService.getAllDerivatives', params)(
      () => masterProxy.getAllDerivatives(params),
    );
  }

  // ListEconomy
  getAllChartEconomy(params) {
    return this.applyMemoryCache('MasterService.getAllChartEconomy', params)(
      () => masterProxy.getAllChartEconomy(params),
    );
  }

  //combine list
  getOranizationAndComGroup() {
    const promises = [this.getListOrganization(), this.getAllCompanyGroup()];

    return Promise.all(promises).then(
      ([{ items: listTicker = [] }, { items: listIndex = [] }]) => [
        listTicker,
        listIndex,
      ],
    );
  }

  getTimeOffset() {
    const params = { clientTime: new Date() };
    return this.applyMemoryCache('MasterService.getTimeOffset', params)(() =>
      masterProxy.getTimeOffset(params),
    );
  }
}

const masterService = new MasterService();
export default masterService;
