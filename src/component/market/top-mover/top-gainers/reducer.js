import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from "../../../helpers/ReducerRegistry";
import Interval from '../../../../../src/component/helpers/IntervalCallApi'
import Const from '../Const'

const REDUCER_NAME = 'TOP_GAINERS:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const FETCH_CHART_IMAGE = `${REDUCER_NAME}FETCH_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopGainerTable,
  cancelFetchListTopGainerTable,
  subscribeRealtimeTickTopGainers,
  fetchChartImage,
};

function cancelFetchListTopGainerTable() {
  return () => {
    Interval.cancel("TopGainers")
  };
}

function fetchListTopGainerTable(filter = 'All') {
  return (dispatch) => {
    Interval.fetch(
      "TopGainers",
      dispatch,
      function () {
        dispatch(setLoading(true));
        return topMoverService.getDataTopGainersOverview({ ComGroupCode: filter })
      },
      function (response) {
        if (response) {
          const listDataTopGainers = response.items || [];
          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopGainers
            }
          });
          dispatch(setLoading(false));
        }
      },
      Const.topGainersInterval
    );
  };
}

function subscribeRealtimeTickTopGainers(data) {
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
  listDataTopGainersTicker: [],
  listObjectDataTopGainersByTicker: {},
  images: {},
  component: {},
  isLoading: false,
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopGainersByTicker = _.keyBy(action.payload.listDataTopGainers, 'organCode');
      const listDataTopGainersTicker = action.payload.listDataTopGainers.map(item => item.organCode);
      return { ...globalState, listDataTopGainersTicker, listObjectDataTopGainersByTicker };
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataTopGainersByTickerNew = { ...globalState.listObjectDataTopGainersByTicker };

      action.payload.data.forEach(item => {
        if (listObjectDataTopGainersByTickerNew[item.organCode]) {
          const tickerItem = { ...listObjectDataTopGainersByTickerNew[item.organCode] };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day = item.percentPriceChange
          }
          listObjectDataTopGainersByTickerNew[item.organCode] = tickerItem;
        }
      });

      return { ...globalState, listObjectDataTopGainersByTicker: listObjectDataTopGainersByTickerNew };
      case FETCH_CHART_IMAGE:
      const dataChartImage = action.payload.dataChartImage;
      return { ...globalState, dataChartImage };

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
