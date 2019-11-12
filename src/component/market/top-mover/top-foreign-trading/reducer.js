import _ from 'lodash';
import topMoverService from '../../../../core/services/Market/TopMover/TopMoverService';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import Interval from '../../../../../src/component/helpers/IntervalCallApi';
import Const from '../Const';

const REDUCER_NAME = 'TOP_FOREIGN_TRADING:OVERVIEW:';
const FETCH_LIST_OVERVIEW_TABLE = `${REDUCER_NAME}FETCH_LIST_OVERVIEW_TABLE`;
const CHANGE_OPTION = `${REDUCER_NAME}CHANGE_OPTION`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const UPDATE_CHART_IMAGE = `${REDUCER_NAME}UPDATE_CHART_IMAGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListTopForeignTradeTable,
  cancelFetchListTopForeignTradeTable,
  subscribeRealtimeTickTopForeignTrade,
  fetchChartImage,
};

function cancelFetchListTopForeignTradeTable() {
  return () => {
    Interval.cancel('TopForeignTrade');
  };
}

function fetchListTopForeignTradeTable(filter = 'All', option = 'NetBuyVol') {
  return (dispatch, globalState) => {
    Interval.fetch(
      'TopForeignTrade',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return topMoverService.getDataTopForeignTrading({
          ComGroupCode: filter,
          Option: option,
        });
      },
      function(response) {
        if (response) {
          const listDataTopForeignTrade = response.items || [];

          dispatch({
            type: FETCH_LIST_OVERVIEW_TABLE,
            payload: {
              listDataTopForeignTrade,
              option,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.topForeignTradeInterval,
    );
  };
}

function setLoading(isLoading) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  };
}

function subscribeRealtimeTickTopForeignTrade(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK,
    payload: {
      data,
    },
  };
}

function fetchChartImage(organCode, theme) {
  return dispatch => {
    topMoverService
      .getTopVolumeChartImage({
        organCode,
        theme,
      })
      .then(({ items }) => {
        dispatch({
          type: UPDATE_CHART_IMAGE,
          payload: {
            organCode,
            image: items ? items[0] : '',
          },
        });
      });
  };
}

const initialState = {
  isLoading: false,
  listDataTopForeignTradeTicker: [],
  listObjectDataTopForeignTradeByTicker: {},
  images: {},
  component: {},
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_OVERVIEW_TABLE:
      const listObjectDataTopForeignTradeByTicker = _.keyBy(
        action.payload.listDataTopForeignTrade,
        'organCode',
      );
      const listDataTopForeignTradeTicker = action.payload.listDataTopForeignTrade.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDataTopForeignTradeTicker,
        listObjectDataTopForeignTradeByTicker,
        option: action.payload.option,
      };
    case SET_LOADING:
      return { ...globalState, isLoading: action.payload };
    case SUBSCRIBE_REALTIME_TICK:
      const listObjectDataTopForeignTradeByTickerNew = {
        ...globalState.listObjectDataTopForeignTradeByTicker,
      };

      action.payload.data.forEach(item => {
        if (listObjectDataTopForeignTradeByTickerNew[item.organCode]) {
          const tickerItem = {
            ...listObjectDataTopForeignTradeByTickerNew[item.organCode],
          };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day =
              item.percentPriceChange;
          }
          listObjectDataTopForeignTradeByTickerNew[item.organCode] = tickerItem;
        }
      });

      return {
        ...globalState,
        listObjectDataTopForeignTradeByTicker: listObjectDataTopForeignTradeByTickerNew,
      };

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

    default:
      return globalState;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
