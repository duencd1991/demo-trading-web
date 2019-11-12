import ServiceBase from '../ServiceBase';
import userSettingProxy from '../../proxies/common/UserSettingProxy';

class UserSettingService extends ServiceBase {
  getUserSettings(params) {
    return this.applyMemoryCache('UserSettingService.getUserSettings', params)(
      () => userSettingProxy.getUserSettings(params),
    );
  }

  getUserWatchList(params) {
    //return this.getData(() => userSettingProxy.getUserWatchList(params));
    return this.applyMemoryCache('UserSettingService.getUserWatchList', params)(() => userSettingProxy.getUserWatchList(params));
  }

  newWatchList(params) {
    //return this.getData(() => userSettingProxy.newWatchList(params));
     return this.applyMemoryCache('UserSettingService.newWatchList', params)(
       () => userSettingProxy.newWatchList(params),
     );
  }

  renameWatchList(params) {
    //return this.getData(() => userSettingProxy.renameWatchList(params));
    return this.applyMemoryCache('UserSettingService.renameWatchList', params)(
       () => userSettingProxy.renameWatchList(params),
    );
  }

  updateWatchList(params) {
    //return this.getData(() => userSettingProxy.updateWatchList(params));
    return this.applyMemoryCache('UserSettingService.updateWatchList', params)(
       () => userSettingProxy.updateWatchList(params),
    );
  }

  deleteWatchList(params) {
    //return this.getData(() => userSettingProxy.deleteWatchList(params));
    return this.applyMemoryCache('UserSettingService.deleteWatchList', params)(
       () => userSettingProxy.deleteWatchList(params),
    );
  }

  newWorkspace(params) {
    return this.applyMemoryCache('UserSettingService.newWorkspace', params)(
      () => userSettingProxy.newWorkspace(params),
    );
  }

  getWorkspace(params) {
    return this.applyMemoryCache('UserSettingService.getWorkspace', params)(
      () => userSettingProxy.getWorkspace(params),
    );
  }

  updateWorkspace(params) {
    return this.applyMemoryCache('UserSettingService.updateWorkspace', params)(
      () => userSettingProxy.updateWorkspace(params),
    );
  }

  deleteWorkspace(params) {
    return this.applyMemoryCache('UserSettingService.deleteWorkspace', params)(
      () => userSettingProxy.deleteWorkspace(params),
    );
  }

  getScreeners(params) {
    return this.getData(() => userSettingProxy.getScreeners(params));
  }

  getTopScreeners(params) {
    return this.applyMemoryCache('UserSettingService.getTopScreeners', params)(
      () => userSettingProxy.getTopScreeners(params),
    );
  }

  createScreener(params) {
    return this.getData(() => userSettingProxy.createScreener(params));
  }

  deleteScreener(params) {
    return this.getData(() => userSettingProxy.deleteScreener(params));
  }

  updateScreener(params) {
    return this.getData(() => userSettingProxy.updateScreener(params));
  }

  getChartLayouts(params) {
    return this.applyMemoryCache('UserSettingService.getChartLayouts', params)(
      () => userSettingProxy.getChartLayouts(params),
    );
  }

  createChartLayout(data) {
    return this.applyMemoryCache('UserSettingService.CreateChartLayout', data)(
      () => userSettingProxy.createChartLayout(data),
    );
  }

  updateChartLayout(data) {
    return this.applyMemoryCache('UserSettingService.UpdateChartLayout', data)(
      () => userSettingProxy.updateChartLayout(data),
    );
  }

  deleteChartLayout(data) {
    return this.applyMemoryCache('UserSettingService.DeleteChartLayout', data)(
      () => userSettingProxy.deleteChartLayout(data),
    );
  }

  getChartLayoutShareInfo(data) {
    return this.applyMemoryCache(
      'UserSettingService.GetChartLayoutShareInfo',
      data,
    )(() => userSettingProxy.getChartLayoutShareInfo(data));
  }

  getSharedChartLayout(data) {
    return this.applyMemoryCache(
      'UserSettingService.GetSharedChartLayout',
      data,
    )(() => userSettingProxy.getSharedChartLayout(data));
  }
}

const userSettingService = new UserSettingService();
export default userSettingService;
