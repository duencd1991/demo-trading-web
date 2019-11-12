import deceptiveProxy from '../../proxies/technical/DeceptiveProxy';
import ServiceBase from '../ServiceBase'

class DeceptiveService extends ServiceBase {

  getDataDeceptiveOverview(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptiveOverview", params)(() => deceptiveProxy.getOverview(params));
  }

  getDataDeceptiveAbnormality(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptiveAbnormality", params)(() => deceptiveProxy.getAbnormality(params));
  }

  getDataDeceptiveCancelled(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptiveCancelled", params)(() => deceptiveProxy.getCancelled(params));
  }

  getDataDeceptivePressing(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptivePressing", params)(() => deceptiveProxy.getPressing(params));
  }

  getDataDeceptiveAggressive(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptiveAggressive", params)(() => deceptiveProxy.getAggressive(params));
  }

  getDataDeceptiveClosing(params) {
    return this.applyMemoryCache("DeceptiveService.getDataDeceptiveClosing", params)(() => deceptiveProxy.getClosing(params));
  }
}

const deceptiveService = new DeceptiveService();
export default deceptiveService;
