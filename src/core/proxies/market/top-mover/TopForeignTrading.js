import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class TopForeignTrading extends ProxyBase {

  getTopForeignTrading(data) {
    return this.get('GetTopForeignTrading', data);
  }
}

const getTopForeignTrading = new TopForeignTrading(ServiceProxyConfig.TopMover.ServiceUrl);
export default getTopForeignTrading;
