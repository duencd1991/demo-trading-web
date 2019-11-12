import ServiceBase from '../../ServiceBase';
import technicalProxy from "../../../proxies/market/watchlist/TechnicalProxy";

class TechnicalService extends ServiceBase {

  getListTechnical(params, source) {
    // return Promise.resolve(getListTechnical());
    return this.getData(() => technicalProxy.getListTechnical(params, source));
    // return this.applyMemoryCache('TechnicalService.getListTechnical', params)(() => technicalProxy.getListTechnical(params, source));
  }

  getTickerTechnical(params) {
    return this.applyMemoryCache('TechnicalService.getTickerTechnical', params)(() => technicalProxy.getTickerTechnical(params));
  }

}

const technicalService = new TechnicalService();
export default technicalService;
