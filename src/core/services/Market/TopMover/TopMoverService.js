import topBreakoutProxy from '../../../proxies/market/top-mover/TopBreakout';
import topGainers from '../../../proxies/market/top-mover/TopGainersProxy';
import topLosers from '../../../proxies/market/top-mover/TopLosersProxy';
import topNewHigh from '../../../proxies/market/top-mover/TopNewHighProxy';
import topNewLow from '../../../proxies/market/top-mover/TopNewLowProxy';
import topForeignTrading from '../../../proxies/market/top-mover/TopForeignTrading';
import topValueProxy from '../../../proxies/market/top-mover/TopValueProxy';
import overviewProxy from '../../../proxies/market/top-mover/TopVolumeProxy';
import topVolumeChartProxy from '../../../proxies/market/top-mover/TopVolumeProxy';
import topMoverChartProxy from '../../../proxies/market/top-mover/TopMoverChartProxy';
import ServiceBase from '../../ServiceBase';

class TopVolumeService extends ServiceBase {

  getDataTopVolumeOverview(params) {
    // return Promise.resolve(getDataTopVolumeOverview());
    return this.applyMemoryCache("TopVolumeService.getDataTopVolumeOverview", params)(() => overviewProxy.getTopVolume(params));
  }

  fetchListTopBreakoutData(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopBreakout", params)(() => topBreakoutProxy.getTopBreakout(params));
  }

  getDataTopValueOverview(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopValue", params)(() => topValueProxy.getTopValue(params));
  }

  getDataTopGainersOverview(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopGainers", params)(() => topGainers.getTopGainers(params));
  }

  getDataTopLosersOverview(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopLosers", params)(() => topLosers.getTopLosers(params));
  }

  getDataTopNewHighOverview(params, source) {
    return this.applyMemoryCache("TopVolumeService.getDataTopNewHigh", params)(() => topNewHigh.getTopNewHigh(params, source));
  }

  getDataTopNewLowOverview(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopNewLow", params)(() => topNewLow.getTopNewLow(params));
  }

  getDataTopForeignTrading(params) {
    return this.applyMemoryCache("TopVolumeService.getDataTopForeignTrading", params)(() => topForeignTrading.getTopForeignTrading(params));
  }

  getTopVolumeChartImage(params) {
    return this.applyMemoryCache("TopVolumeService.getTopVolumeChartImage", params)(() => topMoverChartProxy.getTopVolumeChartImage(params));
  }
}

const topVolumeService = new TopVolumeService();
export default topVolumeService;
