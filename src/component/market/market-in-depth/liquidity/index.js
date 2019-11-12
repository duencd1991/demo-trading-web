import {REDUCER_NAME, default as reducer} from './reducer';
import Liquidity from './Liquidity';

const liquidityReducer = {[REDUCER_NAME]: reducer};

export {
  Liquidity as default,
  liquidityReducer,
}
