import {REDUCER_NAME, default as reducer} from './reducer';
import Valuation from './Valuation';

const valuationReducer = {[REDUCER_NAME]: reducer};

export {
  Valuation as default,
  valuationReducer,
}
