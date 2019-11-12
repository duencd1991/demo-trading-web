import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class SummaryProxy extends ProxyBase {
  getWatchListSummary(data, source) {
    return this.get('GetWatchListSummary', data, source);
  }

  getWatchListDerivative(data) {
    return this.get('getDerivatives', data);
  }

  getWatchListPutThrough(data) {
    return this.get('GetPutThrough', data);
  }

  getMyWatList(data) {
    return this.get('GetMyWatList', data);
  }

  getTwoDaysSeries(data, source) {
    return this.get('GetTwoDaysSeries', data, source);
  }

  getTickerSummary(data) {
    return this.get('GetTickerSummary', data);
  }
}

const summaryProxy = new SummaryProxy(
  ServiceProxyConfig.Market.WatchList.ServiceUrl,
);
export default summaryProxy;
