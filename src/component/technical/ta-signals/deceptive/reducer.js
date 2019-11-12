import _, { keyBy } from 'lodash';
import Interval from '../../../../../src/component/helpers/IntervalCallApi';
import deceptiveService from '../../../../core/services/Technical/DeceptiveServices';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import userSettingService from './../../../../core/services/Common/UserSettingService';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import Const from './Const';
import { REDUCER_NAME as WL_REDUCER_NAME } from '../../../market/watchlist/reducer';
import { getDefaultWatchList } from '../../../helpers/GetDefaultWatchList';

const REDUCER_NAME = 'DECEPTIVE:';
const FETCH_LIST_DECEPTIVE_DATA = `${REDUCER_NAME}FETCH_LIST_DECEPTIVE_DATA`;
const FETCH_LIST_ABNORMALITY_DATA = `${REDUCER_NAME}FETCH_LIST_ABNORMALITY_DATA`;
const FETCH_LIST_CANCELLED_DATA = `${REDUCER_NAME}FETCH_LIST_CANCELLED_DATA`;
const FETCH_LIST_PRESSING_DATA = `${REDUCER_NAME}FETCH_LIST_PRESSING_DATA`;
const FETCH_LIST_AGGRESSIVE_DATA = `${REDUCER_NAME}FETCH_LIST_AGGRESSIVE_DATA`;
const FETCH_LIST_CLOSING_DATA = `${REDUCER_NAME}FETCH_LIST_CLOSING_DATA`;
const CHANGE_WATCH_LIST = `${REDUCER_NAME}CHANGE_WATCH_LIST`;
const SUBSCRIBE_REALTIME_TICK_OVERVIEW = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_OVERVIEW`;
const SUBSCRIBE_REALTIME_TICK_ABNORMALITY = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_ABNORMALITY`;
const SUBSCRIBE_REALTIME_TICK_CANCELLED = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_CANCELLED`;
const SUBSCRIBE_REALTIME_TICK_PRESSING = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_PRESSING`;
const SUBSCRIBE_REALTIME_TICK_AGGRESSIVE = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_AGGRESSIVE`;
const SUBSCRIBE_REALTIME_TICK_CLOSING = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK_CLOSING`;
const FETCH_MY_WATCH_LIST = `${REDUCER_NAME}FETCH_MY_WATCH_LIST`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  REDUCER_NAME,
  reducer as default,
  fetchListDeceptiveData,
  changeWatchList,
  subscribeRealtimeTickDeceptive,
  subscribeRealtimeTickAbnormality,
  subscribeRealtimeTickCancelled,
  subscribeRealtimeTickPressing,
  subscribeRealtimeTickAggressive,
  subscribeRealtimeTickClosing,
  fetchMyWatchList,
  cancelListDeceptiveData,
  fetchDataAbnormality,
  cancelfetchDataAbnormality,
  fetchDataCancelled,
  cancelfetchDataCancelled,
  fetchDataPressing,
  cancelfetchDataPressing,
  fetchDataAggressive,
  cancelfetchDataAggressive,
  fetchDataClosing,
  cancelfetchDataClosing,
  cancelfetchDataOverview,
};

function cancelListDeceptiveData() {
  return () => {
    Interval.cancel('OverviewDeceptive');
  };
}

function fetchListDeceptiveData(watchList) {
  return (dispatch, globalState) => {
    Interval.fetch(
      'OverviewDeceptive',
      dispatch,
      function() {
        watchList = watchList
          ? watchList
          : globalState()[REDUCER_NAME].watchListId || watchList;
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptiveOverview({
          WatchListId: watchList,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptive = response.items || [];
          const totalPage = listDataDeceptive.length
            ? Math.ceil(listDataDeceptive.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_DECEPTIVE_DATA,
            payload: {
              listDataDeceptive,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.overviewDeceptiveInterval,
    );
  };
}

function cancelfetchDataOverview() {
  return () => {
    Interval.cancel('OverviewDeceptive');
  };
}

function fetchDataAbnormality(currentType, currentAvgVolume, currentRate) {
  return dispatch => {
    Interval.fetch(
      'AbnormalityDeceptive',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptiveAbnormality({
          AbnormalityType: currentType,
          AverageVolume10D: currentAvgVolume,
          RateOfUnmatched: currentRate,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptiveAbnormality = response.items || [];
          const totalPage = listDataDeceptiveAbnormality.length
            ? Math.ceil(listDataDeceptiveAbnormality.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_ABNORMALITY_DATA,
            payload: {
              listDataDeceptiveAbnormality,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.abnormalityDeceptiveInterval,
    );
  };
}

function cancelfetchDataAbnormality() {
  return () => {
    Interval.cancel('AbnormalityDeceptive');
  };
}

function fetchDataCancelled(currentAvgVolume) {
  return dispatch => {
    Interval.fetch(
      'CancelledDeceptive',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptiveCancelled({
          AverageVolume10D: currentAvgVolume,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptiveCancelled = response.items || [];
          const totalPage = listDataDeceptiveCancelled.length
            ? Math.ceil(listDataDeceptiveCancelled.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_CANCELLED_DATA,
            payload: {
              listDataDeceptiveCancelled,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.cancelledDeceptiveInterval,
    );
  };
}

function cancelfetchDataCancelled() {
  return () => {
    Interval.cancel('CancelledDeceptive');
  };
}

function fetchDataPressing(currentAvgVolume, orderType, proportion) {
  return dispatch => {
    Interval.fetch(
      'PressingDeceptive',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptivePressing({
          AverageVolume10D: currentAvgVolume,
          OrderType: orderType,
          Proportion: proportion,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptivePressing = response.items || [];
          const totalPage = listDataDeceptivePressing.length
            ? Math.ceil(listDataDeceptivePressing.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_PRESSING_DATA,
            payload: {
              listDataDeceptivePressing,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.pressingDeceptiveInterval,
    );
  };
}

function cancelfetchDataPressing() {
  return () => {
    Interval.cancel('PressingDeceptive');
  };
}

function fetchDataClosing(currentAvgVolume, exceedingPercentage) {
  return dispatch => {
    Interval.fetch(
      'ClosingDeceptive',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptiveClosing({
          AverageVolume10D: currentAvgVolume,
          ExceedingPercentage: exceedingPercentage,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptiveClosing = response.items || [];
          const totalPage = listDataDeceptiveClosing.length
            ? Math.ceil(listDataDeceptiveClosing.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_CLOSING_DATA,
            payload: {
              listDataDeceptiveClosing,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.closingDeceptiveInterval,
    );
  };
}

function cancelfetchDataClosing() {
  return () => {
    Interval.cancel('ClosingDeceptive');
  };
}

function fetchDataAggressive(currentAvgVolume, totalVolumeBuSd, orderType) {
  return dispatch => {
    Interval.fetch(
      'AggressiveDeceptive',
      dispatch,
      function() {
        dispatch(setLoading(true));
        return deceptiveService.getDataDeceptiveAggressive({
          AverageVolume10D: currentAvgVolume,
          TotalVolumeBuSd: totalVolumeBuSd,
          OrderType: orderType,
        });
      },
      function(response) {
        if (response) {
          const listDataDeceptiveAggressive = response.items || [];
          const totalPage = listDataDeceptiveAggressive.length
            ? Math.ceil(listDataDeceptiveAggressive.length / Const.itemPerPage)
            : 0;
          dispatch({
            type: FETCH_LIST_AGGRESSIVE_DATA,
            payload: {
              listDataDeceptiveAggressive,
              totalPage,
            },
          });
          dispatch(setLoading(false));
        }
      },
      Const.aggressiveDeceptiveInterval,
    );
  };
}

function cancelfetchDataAggressive() {
  return () => {
    Interval.cancel('AggressiveDeceptive');
  };
}

function changeWatchList(watchListId) {
  return dispatch => {
    dispatch({
      type: CHANGE_WATCH_LIST,
      payload: {
        watchListId,
      },
    });
    dispatch(fetchListDeceptiveData(watchListId));
  };
}

function subscribeRealtimeTickDeceptive(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_OVERVIEW,
    payload: {
      data,
    },
  };
}

function subscribeRealtimeTickAbnormality(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_ABNORMALITY,
    payload: {
      data,
    },
  };
}

function subscribeRealtimeTickCancelled(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_CANCELLED,
    payload: {
      data,
    },
  };
}

function subscribeRealtimeTickPressing(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_PRESSING,
    payload: {
      data,
    },
  };
}

function subscribeRealtimeTickAggressive(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_AGGRESSIVE,
    payload: {
      data,
    },
  };
}

function subscribeRealtimeTickClosing(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK_CLOSING,
    payload: {
      data,
    },
  };
}

function fetchMyWatchList() {
  return (dispatch, globalState) => {
    userSettingService.getUserWatchList().then(({ items }) => {
      if (items) {
        const { listCompany, listCustom } = getUserWatchListByTypeCode(items);
        const watchListId = getDefaultWatchList(
          globalState()[WL_REDUCER_NAME].watchListId,
        );
        dispatch(fetchListDeceptiveData(watchListId));
        dispatch({
          type: FETCH_MY_WATCH_LIST,
          payload: {
            listCompany,
            listCustom,
            watchListId,
          },
        });
      }
    });
  };
}

function getUserWatchListByTypeCode(listUserWatchList) {
  const result = {
    listCustom: [],
    listCompany: [],
  };
  listUserWatchList.forEach(item => {
    if (item.typeCode === Const.watchListType.CUSTOM) {
      result.listCustom.push(item);
    }
    if (item.typeCode === Const.watchListType.COMPANY_GROUP) {
      result.listCompany.push(item);
    }
  });

  return result;
}

function setLoading(isLoading) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  };
}

const initialState = {
  listDeceptiveDataTicker: [],
  listObjectDeceptiveDataByTicker: {},

  listDeceptiveAbnormalityDataTicker: [],
  listObjectDeceptiveAbnormalityDataByTicker: {},

  listDeceptiveCancelledDataTicker: [],
  listObjectDeceptiveCancelledDataByTicker: {},

  listDeceptivePressingDataTicker: [],
  listObjectDeceptivePressingDataByTicker: {},

  listDeceptiveAggressiveDataTicker: [],
  listObjectDeceptiveAggressiveDataByTicker: {},

  listDeceptiveClosingDataTicker: [],
  listObjectDeceptiveClosingDataByTicker: {},

  listWatchListId: [],
  listWatchListByWatchListId: {},
  defaultWatchList: null,
  isLoading: false,
  component: {},
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_DECEPTIVE_DATA:
      const listObjectDeceptiveDataByTicker = _.keyBy(
        action.payload.listDataDeceptive,
        'organCode',
      );
      const listDeceptiveDataTicker = action.payload.listDataDeceptive.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptiveDataTicker,
        listObjectDeceptiveDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case FETCH_LIST_ABNORMALITY_DATA:
      const listObjectDeceptiveAbnormalityDataByTicker = _.keyBy(
        action.payload.listDataDeceptiveAbnormality,
        'organCode',
      );
      const listDeceptiveAbnormalityDataTicker = action.payload.listDataDeceptiveAbnormality.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptiveAbnormalityDataTicker,
        listObjectDeceptiveAbnormalityDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case FETCH_LIST_CANCELLED_DATA:
      const listObjectDeceptiveCancelledDataByTicker = _.keyBy(
        action.payload.listDataDeceptiveCancelled,
        'organCode',
      );
      const listDeceptiveCancelledDataTicker = action.payload.listDataDeceptiveCancelled.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptiveCancelledDataTicker,
        listObjectDeceptiveCancelledDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case FETCH_LIST_PRESSING_DATA:
      const listObjectDeceptivePressingDataByTicker = _.keyBy(
        action.payload.listDataDeceptivePressing,
        'organCode',
      );
      const listDeceptivePressingDataTicker = action.payload.listDataDeceptivePressing.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptivePressingDataTicker,
        listObjectDeceptivePressingDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case FETCH_LIST_AGGRESSIVE_DATA:
      const listObjectDeceptiveAggressiveDataByTicker = _.keyBy(
        action.payload.listDataDeceptiveAggressive,
        'organCode',
      );
      const listDeceptiveAggressiveDataTicker = action.payload.listDataDeceptiveAggressive.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptiveAggressiveDataTicker,
        listObjectDeceptiveAggressiveDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case FETCH_LIST_CLOSING_DATA:
      const listObjectDeceptiveClosingDataByTicker = _.keyBy(
        action.payload.listDataDeceptiveClosing,
        'organCode',
      );
      const listDeceptiveClosingDataTicker = action.payload.listDataDeceptiveClosing.map(
        item => item.organCode,
      );
      return {
        ...globalState,
        listDeceptiveClosingDataTicker,
        listObjectDeceptiveClosingDataByTicker,
        totalPage: action.payload.totalPage,
      };
    case CHANGE_WATCH_LIST:
      const watchListId = action.payload.watchListId;
      return { ...globalState, watchListId };
    case SUBSCRIBE_REALTIME_TICK_OVERVIEW:
      return executeRealtime(
        globalState,
        'listObjectDeceptiveDataByTicker',
        action.payload.data,
      );
    case SUBSCRIBE_REALTIME_TICK_ABNORMALITY:
      return executeRealtime(
        globalState,
        'listObjectDeceptiveAbnormalityDataByTicker',
        action.payload.data,
      );
    case SUBSCRIBE_REALTIME_TICK_CANCELLED:
      return executeRealtime(
        globalState,
        'listObjectDeceptiveCancelledDataByTicker',
        action.payload.data,
      );
    case SUBSCRIBE_REALTIME_TICK_AGGRESSIVE:
      return executeRealtime(
        globalState,
        'listObjectDeceptiveAggressiveDataByTicker',
        action.payload.data,
      );
    case SUBSCRIBE_REALTIME_TICK_PRESSING:
      return executeRealtime(
        globalState,
        'listObjectDeceptivePressingDataByTicker',
        action.payload.data,
      );
    case SUBSCRIBE_REALTIME_TICK_CLOSING:
      return executeRealtime(
        globalState,
        'listObjectDeceptiveClosingDataByTicker',
        action.payload.data,
      );

    case FETCH_MY_WATCH_LIST:
      const { listCustom, listCompany } = action.payload;

      const listWatchList = [...listCustom, ...listCompany];

      const listWatchListId = listWatchList.map(item =>
        getDataFollowKeyByDot(item, Const.watchList.WATCH_LIST_ID),
      );

      const listWatchListByWatchListId = keyBy(
        listWatchList,
        Const.watchList.WATCH_LIST_ID,
      );

      // const defaultWatchList = listCompany.filter(
      //   item => item[Const.watchList.TEXT] === Const.defaultWatchList
      // );
      // const defaultWatchListId =
      //   defaultWatchList[0][Const.watchList.WATCH_LIST_ID];

      return {
        ...globalState,
        listWatchListId,
        listWatchListByWatchListId,
        // defaultWatchListId,
        watchListId: action.payload.watchListId,
      };

    case SET_LOADING:
      return {
        ...globalState,
        isLoading: action.payload,
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

function executeRealtime(globalState, key, data) {
  const listObjectDeceptiveDataByTickerNew = { ...globalState[key] };

  data.forEach(item => {
    if (listObjectDeceptiveDataByTickerNew[item.organCode]) {
      const tickerItem = {
        ...listObjectDeceptiveDataByTickerNew[item.organCode],
      };

      if (tickerItem) {
        tickerItem.totalMatchedVolume = item.totalMatchVolume;
        tickerItem.totalMatchVolume = item.totalMatchVolume;
        tickerItem.matchPrice = item.matchPrice;
        tickerItem.percentPriceChange = item.percentPriceChange;
        tickerItem.tradingDate = item.tradingDate;
      }
      listObjectDeceptiveDataByTickerNew[item.organCode] = tickerItem;
    }
  });

  return { ...globalState, [key]: listObjectDeceptiveDataByTickerNew };
}
