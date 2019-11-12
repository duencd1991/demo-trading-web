import {REDUCER_NAME, default as reducer} from './reducer';
import TimeAndSale from './TimeAndSale';

const timeAndScaleReducer = {[REDUCER_NAME]: reducer};

export {
  TimeAndSale as default,
  timeAndScaleReducer,
}
