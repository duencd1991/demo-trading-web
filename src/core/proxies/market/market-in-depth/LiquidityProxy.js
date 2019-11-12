import ProxyBase from '../../ProxyBase';
import ServiceProxyConfig from '../../../../configs/ServiceProxyConfig';

class LiquidityProxy extends ProxyBase {

  getLiquiditySeries(data) {
    return this.get('GetLiquiditySeries', data);
  }

}

const liquidityProxy = new LiquidityProxy(ServiceProxyConfig.Market.MarketInDepth.ServiceUrl);
export default liquidityProxy;
