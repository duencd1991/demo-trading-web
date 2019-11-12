import { getListAlertSystem } from '../../../../component/tools/alerts/system/Fake';
import ServiceBase from './../../ServiceBase';
import alertCommonProxy from '../../../proxies/tools/alerts/AlertSystemProxy';
import alertProxy from '../../../proxies/tools/alerts/AlertProxy';

export class AlertSystemService extends ServiceBase {
  getListAlertSystem(params, source) {
    return Promise.resolve(getListAlertSystem(params));
  }

  getAlertChartImage(params) {
    return this.applyMemoryCache(
      'AlertSystemService.getAlertChartImage',
      params,
    )(() => alertCommonProxy.getAlertChartImage(params));
  }
  getAlertGroups(params) {
    return this.applyMemoryCache('AlertSystemService.getAlertGroups', params)(
      () => alertProxy.getAlertGroups(params),
    );
  }
  subribeAlertGroups(params) {
    return this.applyMemoryCache(
      'AlertSystemService.subribeAlertGroups',
      params,
    )(() => alertProxy.subribeAlertGroups(params));
  }
  getNotificationList(params) {
    return this.applyMemoryCache(
      'AlertSystemService.getNotificationList',
      params,
    )(() => alertProxy.getNotificationList(params));
  }
  getPersonalAlertTypes(params) {
    return this.applyMemoryCache(
      'AlertSystemService.getPersonalAlertTypes',
      params,
    )(() => alertProxy.getPersonalAlertTypes(params));
  }
  addPersonalAlert(params) {
    return this.applyMemoryCache('AlertSystemService.addPersonalAlert', params)(
      () => alertProxy.addPersonalAlert(params),
    );
  }
}
const alertSystemService = new AlertSystemService();
export default alertSystemService;
