import ProxyBase from '../ProxyBase';
import ServiceProxyConfig from '../../../configs/ServiceProxyConfig';

class UserSettingProxy extends ProxyBase {
  getUserSettings(data) {
    return this.get('GetUserSettings', data);
  }

  getUserWatchList(data) {
    return this.get('GetUserWatchList', data);
  }

  newWatchList(data) {
    return this.post('NewWatchList', data);
  }

  deleteWatchList(data) {
    return this.post('DeleteWatchList', data);
  }

  updateWatchList(data) {
    return this.post('UpdateWatchList', data);
  }

  renameWatchList(data) {
    return this.post('RenameWatchList', data);
  }

  newWorkspace(data) {
    return this.post('NewWorkspace', data);
  }

  getWorkspace(data) {
    return this.get('GetWorkspace', data);
  }

  updateWorkspace(data) {
    return this.post('UpdateWorkspace', data);
  }

  deleteWorkspace(data) {
    return this.post('DeleteWorkspace', data);
  }

  getScreeners(data) {
    return this.get('GetScreeners', data);
  }

  getTopScreeners(data) {
    return this.get('getTopScreeners', data);
  }

  createScreener(data) {
    return this.post('CreateScreener', data);
  }

  deleteScreener(data) {
    return this.post('DeleteScreener', data);
  }

  updateScreener(data) {
    return this.post('UpdateScreener', data);
  }

  createChartLayout(data) {
    return this.post('CreateChartlayout', data);
  }

  updateChartLayout(data) {
    return this.post('UpdateChartLayout', data);
  }

  getChartLayouts(params) {
    return this.get('GetChartLayouts', params);
  }

  deleteChartLayout(params) {
    return this.post('DeleteChartLayout', params);
  }

  getChartLayoutShareInfo(params) {
    return this.post('GetChartLayoutShareInfo', params);
  }

  getSharedChartLayout(params) {
    return this.get('GetSharedChartLayout', params);
  }
}

const userSettingProxy = new UserSettingProxy(
  ServiceProxyConfig.Common.UserSetting.ServiceUrl,
);
export default userSettingProxy;
