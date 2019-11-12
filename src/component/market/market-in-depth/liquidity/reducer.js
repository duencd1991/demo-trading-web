import reducerRegistry from './../../../helpers/ReducerRegistry';
import liquidityService from './../../../../core/services/Market/MarketInDepth/LiquidityService';
import indexService from './../../../../core/services/Market/MarketInDepth/IndexService';
import Const from './Const';
import { executeRealtimeData } from '../../../helpers/Chart';

const REDUCER_NAME = 'MARKET_IN_DEPTH:LIQUIDITY:';
const FETCH_LIST_DATA = `${REDUCER_NAME}FETCH_LIST_DATA`;
const FETCH_LIST_LIQUIDITY = `${REDUCER_NAME}FETCH_LIST_LIQUIDITY`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SUBSCRIBE_REALTIME_DATA = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListData,
  changeTimeRange,
  changeComGroupCode,
  subscribeRealtimeData,
};

function fetchListData(comGroupCode, timeRange) {
  return (dispatch, getState) => {
    const newComGroupCode = comGroupCode
      ? comGroupCode
      : getState()[REDUCER_NAME].comGroupCode;
    const newTimeRange = timeRange
      ? timeRange
      : getState()[REDUCER_NAME].timeRange;

    liquidityService
      .getLiquiditySeries({
        ComGroupCode: newComGroupCode,
        TimeRange: newTimeRange,
      })
      .then(response => {
        const listLiquidity = response.items || [];

        indexService
          .getIndexSeries({
            ComGroupCode: newComGroupCode,
            TimeRange: Const.timeRange.ONE_DAY,
          })
          .then(response => {
            const listIndex = response.items || [];

            dispatch({
              type: FETCH_LIST_DATA,
              payload: {
                listIndex,
                listLiquidity,
                comGroupCode: newComGroupCode,
                timeRange: newTimeRange,
              },
            });
          });
      });
  };
}

function fetchListLiquidity(comGroupCode, timeRange) {
  return (dispatch, getState) => {
    const newComGroupCode = comGroupCode
      ? comGroupCode
      : getState()[REDUCER_NAME].comGroupCode;
    const newTimeRange = timeRange
      ? timeRange
      : getState()[REDUCER_NAME].timeRange;

    liquidityService
      .getLiquiditySeries({
        ComGroupCode: newComGroupCode,
        TimeRange: newTimeRange,
      })
      .then(response => {
        const listLiquidity = response.items || [];

        dispatch({
          type: FETCH_LIST_LIQUIDITY,
          payload: {
            listLiquidity,
            comGroupCode: newComGroupCode,
            timeRange: newTimeRange,
          },
        });
      });
  };
}

function changeTimeRange(timeRange) {
  return dispatch => {
    dispatch(fetchListLiquidity(null, timeRange));
  };
}

function changeComGroupCode(comGroupCode) {
  return dispatch => {
    dispatch(fetchListData(comGroupCode));
  };
}

function subscribeRealtimeData(data) {
  return {
    type: SUBSCRIBE_REALTIME_DATA,
    payload: {
      data,
    },
  };
}

const initialState = {
  comGroupCode: Const.defaultComGroupCode,
  timeRange: Const.timeRange.FIVE_DAYS,
  listIndex: [],
  listLiquidity: [],
  component: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_LIST_LIQUIDITY:
      return {
        ...state,
        ...action.payload,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case SUBSCRIBE_REALTIME_DATA:
      const { data } = action.payload;

      const listIndex = executeRealtimeData(
        data,
        state,
        'comGroupCode',
        'listIndex',
      );
      if (listIndex) {
        return { ...state, listIndex };
      }

      return state;
    default:
      return state;
  }
} 

reducerRegistry.register(REDUCER_NAME, reducer);
