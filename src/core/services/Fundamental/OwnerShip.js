import ownerShipProxy from '../../proxies/fundamental/OwnerShipProxy';
import ServiceBase from '../ServiceBase';

class OwnerShipService extends ServiceBase {
  getOwnerShipData(params) {
    return this.applyMemoryCache('OwnerShipService.getOwnerShipData', params)(() => ownerShipProxy.getOwnerShipData(params));
  }

  getInfoShareHolderTooltip(params) {
    return this.applyMemoryCache('OwnerShipService.getShareHolderTooltip', params)(() => ownerShipProxy.getShareHolderTooltip(params));
  }

  getInfoBoDTooltip(params) {
    return this.applyMemoryCache('OwnerShipService.getBoDTooltip', params)(() => ownerShipProxy.getBoDTooltip(params));
  }

  // getLatestPrice(params) {
  //   return this.applyMemoryCache('PriceDataService.GetLatestPrice', params)(() => priceDataProxy.getLatestPrice(params));
  // }
}

const ownerShipService = new OwnerShipService();
export default ownerShipService;
