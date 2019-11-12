import {REDUCER_NAME, default as reducer} from './reducer';
import WatchList from './WatchList';

const watchListReducer = {[REDUCER_NAME]: reducer};

export {
  WatchList as default,
  watchListReducer,
}
