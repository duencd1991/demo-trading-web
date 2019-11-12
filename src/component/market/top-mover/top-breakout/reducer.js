import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Interval from '../../../../../src/component/helpers/IntervalCallApi';
import Const from '../Const';

const REDUCER_NAME = 'TOP_BREAKOUT:OVERVIEW:';
const FETCH_LIST_TOP_BREAKOUT_DATA = `${REDUCER_NAME}FETCH_LIST_TOP_BREAKOUT_DATA`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const CHANGE_RATE = `${REDUCER_NAME}CHANGE_RATE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopBreakoutData,
  changeTimeRange,
  changeRate,
  applyFilter,
  cancelFetchTopBreakoutTable,
  subscribeRealtimeTickTopBreakout,
  fetchChartImage,
};

function cancelFetchTopBreakoutTable() {
  return () => {
    Interval.cancel('TopBreakout')
  };
}

function fetchListTopBreakoutData(filter = 'All', timeRange = "OneWeek", rate = "OnePointTwo") {
  return (dispatch, globalState) => {
    Interval.fetch(
      "TopBreakout",
      dispatch,
      function () {
        timeRange = globalState()[REDUCER_NAME].timeRange || timeRange;
        rate = globalState()[REDUCER_NAME].rate || rate;
        dispatch(setLoading(true));
        return topMoverService.fetchListTopBreakoutData({ ComGroupCode: filter, TimeRange: timeRange, Rate: rate })
      },
      function (response) {
        if (response) {
          const listTopBreakoutData = response.items || [];
          dispatch({
            type: FETCH_LIST_TOP_BREAKOUT_DATA,
            payload: {
              listTopBreakoutData
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topBreakoutInterval
    );
  };
}

function subscribeRealtimeTickTopBreakout(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK,
    payload: {
      data
    }
  }
}

function fetchChartImage(organCode, theme) {
  return dispatch => {
    topMoverService.getTopVolumeChartImage({
      organCode,
      theme
    }).then(({ items }) => {
      dispatch({
        type: UPDATE_CHART_IMAGE,
        payload: {
          organCode,
          image: items ? items[0] : '',
        },
      })
    })
  }
}

function setLoading(isLoading) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  }
}

function changeTimeRange(timeRange) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TIME_RANGE,
      payload: {
        timeRange,
      }
    });
  }
}

function changeRate(rate) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_RATE,
      payload: {
        rate,
      }
    });
  }
}

function applyFilter(code) {
  return fetchListTopBreakoutData(code);
}


const initialState = {
  listTopBreakoutDataTicker: [],
  listObjectTopBreakoutDataByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_TOP_BREAKOUT_DATA:
      const listObjectTopBreakoutDataByTicker = _.keyBy(action.payload.listTopBreakoutData, 'organCode');
      const listTopBreakoutDataTicker = action.payload.listTopBreakoutData.map(item => item.organCode);
      return { ...globalState, listTopBreakoutDataTicker, listObjectTopBreakoutDataByTicker };
    case CHANGE_TIME_RANGE:
      const timeRange = action.payload.timeRange;
      return { ...globalState, timeRange }
    case CHANGE_RATE:
      const rate = action.payload.rate;
      return { ...globalState, rate }
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectTopBreakoutDataByTickerNew = { ...globalState.listObjectTopBreakoutDataByTicker };

      action.payload.data.forEach(item => {
        if (listObjectTopBreakoutDataByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectTopBreakoutDataByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectTopBreakoutDataByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectTopBreakoutDataByTicker: listObjectTopBreakoutDataByTickerNew };

    case UPDATE_CHART_IMAGE:
      return {
        ...globalState,
        images: {
          ...globalState.images,
          [action.payload.organCode]: action.payload.image,
        },
      };

    case SET_LOADING:
      return {
        ...globalState,
        isLoading: action.payload
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...globalState,
        component: action.payload
      };

    default:
      return globalState;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
