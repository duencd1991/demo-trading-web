import _ from 'lodash';
import Interval from '../../../../../src/component/helpers/IntervalCallApi';
import { default as topMoverService } from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Const from '../Const';

const REDUCER_NAME = 'TOP_VOLUME:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListOverviewTable,
  cancelFetchListOverviewTable,
  subscribeRealtimeTickTopVolume,
  fetchChartImage,
};

function cancelFetchListOverviewTable() {
  return () => {
    Interval.cancel('TopVolume')
  };
}

function fetchListOverviewTable(filter = 'All') {
  return (dispatch) => {
    Interval.fetch(
      "TopVolume",
      dispatch,
      function () {
        dispatch(setLoading(true));
        return topMoverService.getDataTopVolumeOverview({ ComGroupCode: filter })
      },
      function (response) {
        if (response) {
          const listDataOverview = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataOverview
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topNewHighInterval
    );
  };
}

function subscribeRealtimeTickTopVolume(data) {
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
  listDataOverviewTicker: [],
  listObjectDataOverviewByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataOverviewByTicker = _.keyBy(action.payload.listDataOverview, 'organCode');
      const listDataOverviewTicker = action.payload.listDataOverview.map(item => item.organCode);
      return { ...globalState, listDataOverviewTicker, listObjectDataOverviewByTicker };

    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataOverviewByTickerNew = { ...globalState.listObjectDataOverviewByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataOverviewByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataOverviewByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectDataOverviewByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectDataOverviewByTicker: listObjectDataOverviewByTickerNew };

    case UPDATE_CHART_IMAGE:
      return {
        ...globalState,
        images: { ...globalState.images, [action.payload.organCode]: action.payload.image }
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
