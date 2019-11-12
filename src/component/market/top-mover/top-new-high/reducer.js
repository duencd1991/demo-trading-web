import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Const from '../Const'
import Interval from '../../../../../src/component/helpers/IntervalCallApi'

const REDUCER_NAME = 'TOP_NEW_HIGH:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopNewHighTable,
  changeTimeRange,
  cancelFetchListTopNewHighTable,
  subscribeRealtimeTickTopNewHigh,
  fetchChartImage,
}

function cancelFetchListTopNewHighTable() {
  return () => {
    Interval.cancel('TopNewHigh')
  };
}

function fetchListTopNewHighTable(filter = 'All', timeRange = "ThreeMonths") {
  return (dispatch, globalState) => {
    Interval.fetch(
      'TopNewHigh',
      dispatch,
      function (source) {
        timeRange = globalState()[REDUCER_NAME].timeRange || timeRange;
        dispatch(setLoading(true));
        return topMoverService.getDataTopNewHighOverview({ ComGroupCode: filter, TimeRange: timeRange }, source)
      },
      function (response) {
        if (response) {
          const listDataTopNewHigh = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopNewHigh
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topNewHighInterval
    );

  };
}

function subscribeRealtimeTickTopNewHigh(data) {
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

function changeTimeRange(timeRange, code) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TIME_RANGE,
      payload: {
        timeRange,
      }
    });
    dispatch(fetchListTopNewHighTable(code, timeRange));
  };
}

function setLoading(isLoading) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  }
}

const initialState = {
  listDataTopNewHighTicker: [],
  listObjectDataTopNewHighByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopNewHighByTicker = _.keyBy(action.payload.listDataTopNewHigh, 'organCode');
      const listDataTopNewHighTicker = action.payload.listDataTopNewHigh.map(item => item.organCode);
      return { ...globalState, listDataTopNewHighTicker, listObjectDataTopNewHighByTicker };
    case CHANGE_TIME_RANGE:
      const timeRange = action.payload.timeRange;
      return { ...globalState, timeRange };
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataTopNewHighByTickerNew = { ...globalState.listObjectDataTopNewHighByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataTopNewHighByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataTopNewHighByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectDataTopNewHighByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectDataTopNewHighByTicker: listObjectDataTopNewHighByTickerNew };

    case UPDATE_CHART_IMAGE:
      return {
        ...globalState,
        images: {
          ...globalState.images,
          [action.payload.organCode]: action.payload.image,
        },
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...globalState,
        component: action.payload,
      };

    case SET_LOADING:
      return {
        ...globalState,
        isLoading: action.payload
      };

    default:
      return globalState;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
