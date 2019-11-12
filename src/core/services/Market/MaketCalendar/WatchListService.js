import ServiceBase from '../../ServiceBase';
import watchListProxy from '../../../proxies/market/market-calendar/WatchListProxy';
import userProxy from '../../../proxies/common/UserSettingProxy';

class WatchListService extends ServiceBase {

  getListWatchList(params, source) {
    return this.applyMemoryCache('WatchListService.GetMarketCalendarWatchList', params)(() => watchListProxy.getListWatchList(params, source));
  }

  getListWatchListDropDowm(params) {
    return this.applyMemoryCache('WatchListService.GetUserWatchList', params)(() => userProxy.getUserWatchList(params));
  }

}


const watchListService = new WatchListService();
export default watchListService;
