import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class DividendAnalaysisProxy extends ProxyBase {
  GetAnalysis(data, source) {
    return this.get('GetAnalysis', data, source);
  }
}

const dividendAnalaysisProxy = new DividendAnalaysisProxy(ServiceProxyConfig.Fundamental.CashDividendAnalysis.ServiceUrl);
export default dividendAnalaysisProxy;
