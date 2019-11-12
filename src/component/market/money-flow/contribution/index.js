import {REDUCER_NAME, default as reducer} from './reducer';
import Contribution from './Contribution';

const contributionReducer = {[REDUCER_NAME]: reducer};

export {
  Contribution as default,
  contributionReducer,
}
