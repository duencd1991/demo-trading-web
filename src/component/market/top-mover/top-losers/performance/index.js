import Performance from './Performance';
import {default as reducer, REDUCER_NAME} from '../reducer';

const topPerformanceReducer = {[REDUCER_NAME]: reducer};

export {
  Performance as default,
  topPerformanceReducer,
}
