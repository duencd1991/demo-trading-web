import ServiceBase from '../../services/ServiceBase';
import snapshotProxy from '../../proxies/fundamental/SnapshotProxy';

class SnapShotService extends ServiceBase {

  getDataSnapshot(params, source) {
    return this.applyMemoryCache('GetSnapshot', params)(() => snapshotProxy.getSnapshot(params));
  }

  getCompanyScore(params) {
    return this.applyMemoryCache('GetCompanyScore', params)(() => snapshotProxy.getCompanyScore(params));
  }
}

const snapShotService = new SnapShotService();
export default snapShotService;
