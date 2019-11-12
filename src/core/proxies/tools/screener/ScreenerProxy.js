import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class ScreenerProxy extends ProxyBase {
  getScreenerParameters(data) {
    return this.get('GetScreenerParameters', data);
  }

  getScreenerItems(data) {
    return this.post('GetScreenerItems', data);
  }

  getScreenerExport(data) {
    return this.post('getScreenerExport', data);
  }
}

const screenerProxy = new ScreenerProxy(
  ServiceProxyConfig.Tools.Screener.ServiceUrl,
);
export default screenerProxy;
