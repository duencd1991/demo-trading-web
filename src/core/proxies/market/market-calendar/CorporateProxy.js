import ProxyBase from './../../ProxyBase';
import ServiceProxyConfig from './../../../../configs/ServiceProxyConfig';

class CorporateProxy extends ProxyBase {

  getCorporateEaring(data) {
    return this.get('GetCorporateEarning', data);
  }

  getCorporateCashDividend(data){
    return this.get('GetCorporateCashDividend', data);
  }

  getCorporateStockDividend(data){
    return this.get('GetCorporateStockDividend', data);
  }

  getCorporateShareIssuance(data){
    return this.get('GetCorporateShareIssuance', data);
  }

  getCorporateIPO(data){
    return this.get('GetCorporateIPO',data)
  }

  getCorporateAGM(data){
    return this.get('GetCorporateAGM',data)
  }
}

const corporateProxy = new CorporateProxy(ServiceProxyConfig.Market.MarketCalendar.ServiceUrl);
export default corporateProxy;
