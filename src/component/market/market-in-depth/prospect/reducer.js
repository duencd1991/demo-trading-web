import prospectService from '../../../../core/services/Market/MarketInDepth/ProspectService';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import Const from '../index2/Const';

const REDUCER_NAME = 'MARKET_IN_DEPTH:PROSPECT:';
const FETCH_DATA_PROSPECT = `${REDUCER_NAME}FETCH_DATA_PROSPECT`;
const SUBSCRIBE_REALTIME_CHANNEL = `${REDUCER_NAME}SUBSCRIBE_REALTIME_CHANNEL`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export { reducer as default, REDUCER_NAME, fetchListProspect, subscribeRealtimeTickListProspect };

function fetchListProspect(comGroupCode) {
  return (dispatch, getState) => {
    // prospect screen only show VNINDEX
    const newComGroupCode = comGroupCode ? comGroupCode : getState()[REDUCER_NAME].comGroupCode;

    prospectService.getListProSpect({ ComGroupCode: newComGroupCode }).then(response => {
      const listProspectData = response.items || [];
      dispatch({
        type: FETCH_DATA_PROSPECT,
        payload: {
          listProspectData
        }
      });
    });
  };
}

function subscribeRealtimeTickListProspect(data) {
  return {
    type: SUBSCRIBE_REALTIME_CHANNEL,
    payload: {
      data
    }
  };
}

const initialState = {
  listProspectData: {},
  getIndexTickerProspect: [],
  comGroupCode: Const.DEFAULT_INDEX,
  component: {},
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_PROSPECT:
      return {
        ...globalState,
        listProspectData: action.payload.listProspectData[0]
      };
    case SUBSCRIBE_REALTIME_CHANNEL:
      const { data } = action.payload;
      const listProspect = data.find(item => item.comGroupCode === globalState.comGroupCode);
      if (!listProspect) {
        return globalState;
      }

      return {
        ...globalState,
        listProspectData: {
          ...globalState.listProspectData,
          series: listProspect,
        },
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...globalState,
        component: action.payload,
      };
    default:
      return globalState;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
