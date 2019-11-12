import Performance from './Performance';
import {default as reducer, REDUCER_NAME} from '../reducer';

const topVolumePerformanceReducer = {[REDUCER_NAME]: reducer};

export {
  Performance as default,
  topVolumePerformanceReducer,
}
