import ServiceBase from "../../ServiceBase";
// import {
//   getListErnCorporate,
//   getListDivCorporate,
//   getListSisCorporate,
//   getListIpoCorporate,
//   getListAgmCorporate
// } from "../../../../component/market/market-calendar/corporate/Fake";
import corporateProxy from './../../../proxies/market/market-calendar/CorporateProxy';

class CorporateService extends ServiceBase {

  getListDataErnCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getListDataErnCorporate', formatParams)(() => corporateProxy.getCorporateEaring(formatParams));
    //return Promise.resolve(getListErnCorporate(formatParams));
  }

  getListDataDivCashCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getListDataDivCashCorporate', formatParams)(() => corporateProxy.getCorporateCashDividend(formatParams));
    //return Promise.resolve(getListDivCorporate(formatParams));
  }

  getListDataDivStockCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getListDataDivStockCorporate', formatParams)(() => corporateProxy.getCorporateStockDividend(formatParams));
    //return Promise.resolve(getListDivCorporate(formatParams));
  }

  getListDataSisCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getCorporateShareIssuance', formatParams)(() => corporateProxy.getCorporateShareIssuance(formatParams));
    //return Promise.resolve(getListSisCorporate(formatParams));
  }

  getListDataIpoCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getCorporateIPO', formatParams)(() => corporateProxy.getCorporateIPO(formatParams));
    //return Promise.resolve(getListIpoCorporate(formatParams));
  }

  getListDataAgmCorporate(formatParams) {
    return this.applyMemoryCache('CorporateService.getCorporateAGM', formatParams)(() => corporateProxy.getCorporateAGM(formatParams));
    //return Promise.resolve(getListAgmCorporate(formatParams));
  }

}

const corporateService = new CorporateService();
export default corporateService;
