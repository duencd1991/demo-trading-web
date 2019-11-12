import ServiceBase from '../../services/ServiceBase';
import priceVolumeProxy from '../../../core/proxies/technical/PriceVolumeProxy';
//TODO import { getListPriceVolume } from "../../../component/technical/ta-signals/price-volume/Fake";

class PriceVolumeService extends ServiceBase {
  getListPriceVolume(params, source) {
    return this.applyMemoryCache('PriceVolumeService.GetPriceVolumeAnalysis', params)(() => priceVolumeProxy.getListPriceVolume(params, source));
  }
}
const priceVolumeService = new PriceVolumeService();
export default priceVolumeService;
