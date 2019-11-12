import _ from 'lodash';
import Interval from '../../../../../src/component/helpers/IntervalCallApi';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Const from '../Const';

const REDUCER_NAME = 'TOP_VALUE:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopValueTable,
  cancelFetchListTopValueTable,
  subscribeRealtimeTickTopValue,
  fetchChartImage,
};

function cancelFetchListTopValueTable() {
  return () => {
    Interval.cancel('TopValue')
  };
}

function fetchListTopValueTable(filter = 'All') {
  return (dispatch) => {
    Interval.fetch(
      'TopValue',
      dispatch,
      function () {
        dispatch(setLoading(true));
        return topMoverService.getDataTopValueOverview({ ComGroupCode: filter })
      },
      function (response) {
        if (response) {
          const listDataTopValue = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopValue
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topValueInterval
    );
  };
}

function subscribeRealtimeTickTopValue(data) {
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

const initialState = {
  listDataTopValueTicker: [],
  listObjectDataTopValueByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopValueByTicker = _.keyBy(action.payload.listDataTopValue, 'organCode');
      const listDataTopValueTicker = action.payload.listDataTopValue.map(item => item.organCode);
      return { ...globalState, listDataTopValueTicker, listObjectDataTopValueByTicker };
    case SUBSCRIBE_REALTIME_TICK:

      const listObjectDataTopValueByTickerNew = { ...globalState.listObjectDataTopValueByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataTopValueByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataTopValueByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.value = item.totalMatchValue;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }

          listObjectDataTopValueByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectDataTopValueByTicker: listObjectDataTopValueByTickerNew };

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
