import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class OwnerShipProxy extends ProxyBase {

  getOwnerShipData(data){
    return this.get('GetOwnership', data)
  }

  getShareHolderTooltip(data){
    return this.get('GetShareHolderTooltip', data)
  }

  getBoDTooltip(data){
    return this.get('GetBoDTooltip', data)
  }

}

const ownerShipProxy = new OwnerShipProxy(ServiceProxyConfig.Fundamental.OwnerShip.ServiceUrl);
export default ownerShipProxy;
