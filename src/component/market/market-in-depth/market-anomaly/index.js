import {REDUCER_NAME, default as reducer} from './reducer';
import MarketAnomaly from './MarketAnomaly';

const marketAnomalyReducer = {[REDUCER_NAME]: reducer};

export {
  MarketAnomaly as default,
  marketAnomalyReducer,
}
