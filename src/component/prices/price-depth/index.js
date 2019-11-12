import {REDUCER_NAME, default as reducer} from './reducer';
import PriceDepth from './PriceDepth';

const priceDepthReducer = {[REDUCER_NAME]: reducer};

export {
  PriceDepth as default,
  priceDepthReducer,
}
