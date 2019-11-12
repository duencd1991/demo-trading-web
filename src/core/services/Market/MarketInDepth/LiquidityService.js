import ServiceBase from "../../ServiceBase";
import liquidityProxy from '../../../proxies/market/market-in-depth/LiquidityProxy';

class LiquidityService extends ServiceBase {

  getLiquiditySeries(params) {
    return this.applyMemoryCache("LiquidityService.getLiquiditySeries", params)(() => liquidityProxy.getLiquiditySeries(params));
  }

}

const liquidityService = new LiquidityService();
export default liquidityService;
