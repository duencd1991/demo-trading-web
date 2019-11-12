import ProxyBase from './../ProxyBase';
import ServiceProxyConfig from './../../../configs/ServiceProxyConfig';

class SnapshotProxy extends ProxyBase {
  getSnapshot(params) {
    return this.get('GetSnapshot', params);
  }

  getCompanyScore(params) {
    return this.get('GetCompanyScore', params);    
  }

}

const snapshotProxy = new SnapshotProxy(ServiceProxyConfig.Fundamental.Snapshot.ServiceUrl);
export default snapshotProxy;
