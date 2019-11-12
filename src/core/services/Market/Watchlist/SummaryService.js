import ServiceBase from '../../ServiceBase';
import summaryProxy from '../../../proxies/market/watchlist/SummaryProxy';
import {
  getListSummary,
  getListDerivative,
  getListPutThrough,
  getMyWatList,
  getTwoDaysSeries,
} from '../../../../component/market/watchlist/summary/Fake';

class SummaryService extends ServiceBase {
  getWatchListSummary(params, source) {
    return this.getData(() => summaryProxy.getWatchListSummary(params, source));
    // return this.applyMemoryCache("SummaryService.getWatchListSummary", params)(() => summaryProxy.getWatchListSummary(params, source));
  }

  getWatchListDerivative(params) {
    // return Promise.resolve(getListDerivative());
    return this.applyMemoryCache('SummaryService.getDerivatives', params)(() =>
      summaryProxy.getWatchListDerivative(params),
    );
  }

  getWatchListPutThrough(params) {
    // return Promise.resolve(getListPutThrough());
    return this.applyMemoryCache(
      'SummaryService.getWatchListPutThrough',
      params,
    )(() => summaryProxy.getWatchListPutThrough(params));
  }

  getMyWatchList(params) {
    return Promise.resolve(getMyWatList());
    // return this.applyMemoryCache('SummaryService.getMyWatList', params)(() =>
    //   summaryProxy.getMyWatList(params),
    // );
  }

  getTwoDaysSeries(params, source) {
    // return Promise.resolve(getTwoDaysSeries(params));
    return this.applyMemoryCache(
      'SummaryService.getPerformanceChartData',
      params,
    )(() => summaryProxy.getTwoDaysSeries(params, source));
  }

  getTickerSummary(params) {
    return this.applyMemoryCache('SummaryService.getTickerSummary', params)(
      () => summaryProxy.getTickerSummary(params),
    );
  }
}

const summaryService = new SummaryService();
export default summaryService;
