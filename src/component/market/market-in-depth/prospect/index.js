import Prospect from './Prospect';
import { REDUCER_NAME, default as reducer } from './reducer';

const marketInDepthProspectReducer = { [REDUCER_NAME]: reducer };

export {
  Prospect as default,
  marketInDepthProspectReducer
}
