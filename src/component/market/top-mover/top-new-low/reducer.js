import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Interval from '../../../../../src/component/helpers/IntervalCallApi'
import Const from '../Const'

const REDUCER_NAME = 'TOP_NEW_LOW:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopNewLowTable,
  changeTimeRange,
  cancelFetchListTopNewLowTable,
  subscribeRealtimeTickTopNewLow,
  fetchChartImage,
}

function cancelFetchListTopNewLowTable() {
  return () => {
    Interval.cancel("TopNewLow")
  };
}

function fetchListTopNewLowTable(filter = 'All', timeRange = "ThreeMonths") {
  return (dispatch, globalState) => {
    Interval.fetch(
      "TopNewLow",
      dispatch,
      function () {
        timeRange = globalState()[REDUCER_NAME].timeRange || timeRange;
        dispatch(setLoading(true));
        return topMoverService.getDataTopNewLowOverview({ ComGroupCode: filter, TimeRange: timeRange })
      },
      function (response) {
        if (response) {
          const listDataTopNewLow = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopNewLow
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topNewLowInterval
    );
  };
}

function changeTimeRange(timeRange, code, allExchanges) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TIME_RANGE,
      payload: {
        timeRange,
      }
    });
    dispatch(fetchListTopNewLowTable(code, timeRange, allExchanges))
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

function subscribeRealtimeTickTopNewLow(data) {
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

const initialState = {
  listDataTopNewLowTicker: [],
  listObjectDataTopNewLowByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopNewLowByTicker = _.keyBy(action.payload.listDataTopNewLow, 'organCode');
      const listDataTopNewLowTicker = action.payload.listDataTopNewLow.map(item => item.organCode);
      return { ...globalState, listDataTopNewLowTicker, listObjectDataTopNewLowByTicker };
    case CHANGE_TIME_RANGE:
      const timeRange = action.payload.timeRange;
      return { ...globalState, timeRange };
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataTopNewLowByTickerNew = { ...globalState.listObjectDataTopNewLowByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataTopNewLowByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataTopNewLowByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectDataTopNewLowByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectDataTopNewLowByTicker: listObjectDataTopNewLowByTickerNew };

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
