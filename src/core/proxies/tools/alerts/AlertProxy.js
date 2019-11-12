import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class AlertProxy extends ProxyBase {
  getAlertGroups(data) {
    return this.get('Alert/GetAlertGroups', data);
  }
  subribeAlertGroups(data) {
    return this.post('Alert/SubribeAlertGroups', data);
  }
  getNotificationList(data) {
    return this.get('Alert/GetNotificationList', data);
  }
  getPersonalAlertTypes(data) {
    return this.get('PersonalAlert/GetPersonalAlertTypes', data);
  }
  addPersonalAlert(data) {
    return this.post('PersonalAlert/AddPersonalAlert', data);
  }
}

const alertCommonProxy = new AlertProxy(
  ServiceProxyConfig.Tools.Alerts.ServiceUrl,
);
export default alertCommonProxy;
