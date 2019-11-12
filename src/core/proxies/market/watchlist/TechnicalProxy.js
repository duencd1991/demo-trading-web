import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TechnicalProxy extends ProxyBase {

  getListTechnical(data, source) {
    return this.get('GetTechnical', data, source);
  }

  getTickerTechnical(data) {
    return this.get('GetTickerTechnical', data);
  }

}

const technicalProxy = new TechnicalProxy(ServiceProxyConfig.Market.WatchList.ServiceUrl);
export default technicalProxy;
