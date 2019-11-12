import {REDUCER_NAME, default as reducer} from './reducer';
import PriceData from './PriceData';

const priceDepthReducer = {[REDUCER_NAME]: reducer};

export {
  PriceData as default,
  priceDepthReducer,
}
