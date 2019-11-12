import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Const from '../Const'
import Interval from '../../../../../src/component/helpers/IntervalCallApi'

const REDUCER_NAME = 'TOP_LOSERS:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopLosersTable,
  cancelFetchListTopLosersTable,
  subscribeRealtimeTickTopLosers,
  fetchChartImage,
}

function cancelFetchListTopLosersTable() {
  return () => {
    Interval.cancel("TopLosers")
  };
}

function fetchListTopLosersTable(filter = 'All') {
  return (dispatch) => {
    Interval.fetch(
      "TopLosers",
      dispatch,
      function () {
        dispatch(setLoading(true));
        return topMoverService.getDataTopLosersOverview({ ComGroupCode: filter })
      },
      function (response) {
        if (response) {
          const listDataTopLosers = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopLosers
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topLosersInterval
    );
  };
}

function subscribeRealtimeTickTopLosers(data) {
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
  listDataTopLosersTicker: [],
  listObjectDataTopLosersByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopLosersByTicker = _.keyBy(action.payload.listDataTopLosers, 'organCode');
      const listDataTopLosersTicker = action.payload.listDataTopLosers.map(item => item.organCode);
      return { ...globalState, listDataTopLosersTicker, listObjectDataTopLosersByTicker };
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataTopLosersByTickerNew = { ...globalState.listObjectDataTopLosersByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataTopLosersByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataTopLosersByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectDataTopLosersByTickerNew[item.organCode] = tickerItem;
        }
      });
      return { ...globalState, listObjectDataTopLosersByTicker: listObjectDataTopLosersByTickerNew };

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
