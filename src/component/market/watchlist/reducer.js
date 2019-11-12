import { includes, keyBy, omit, cloneDeep } from 'lodash';
import ConstSummary from './summary/Const';
import ConstNews from './news/Const';
import ConstTechnical from './technical/Const';
import Const from './Const';
import ConstCommon from './../../common/Const';
import summaryService from '../../../core/services/Market/Watchlist/SummaryService';
import technicalService from '../../../core/services/Market/Watchlist/TechnicalService';
import newsService from '../../../core/services/Market/Watchlist/NewsService';
import {
  getDataFollowKeyByDot,
  setDataFollowKeyByDot,
} from './../../helpers/Common';
import reducerRegistry from './../../helpers/ReducerRegistry';
import request from './../../helpers/Request';
import Interval from '../../../component/helpers/IntervalCallApi';
import chartService from '../../../core/services/Market/Watchlist/ChartService';
import registerCancelTokenAxios from './../../helpers/RegisterCancelTokenAxios';
import userSettingService from './../../../core/services/Common/UserSettingService';
import { formatData, getListIdAndListObjById } from './../../helpers/Api';

const REDUCER_NAME = 'WATCH_LIST:';
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;
const FETCH_LIST_SUMMARY = `${REDUCER_NAME}FETCH_LIST_SUMMARY`;
const CHANGE_CURRENT_DATA = `${REDUCER_NAME}CHANGE_CURRENT_DATA`;
const FETCH_LIST_DERIVATIVE = `${REDUCER_NAME}FETCH_LIST_DERIVATIVE`;
const UPDATE_LIST_DERIVATIVE = `${REDUCER_NAME}UPDATE_LIST_DERIVATIVE`;
const FETCH_LIST_PUT_THROUGH = `${REDUCER_NAME}FETCH_LIST_PUT_THROUGH`;
const CREATE_WATCH_LIST = `${REDUCER_NAME}CREATE_WATCH_LIST`;
const FETCH_MY_WATCH_LIST = `${REDUCER_NAME}FETCH_MY_WATCH_LIST`;
const CHANGE_WATCH_LIST_ID = `${REDUCER_NAME}CHANGE_WATCH_LIST_ID`;
const FETCH_DATA_TECHNICAL = `${REDUCER_NAME}FETCH_DATA_TECHNICAL`;
const FETCH_LIST_NEWS = `${REDUCER_NAME}FETCH_LIST_NEWS`;
const LOAD_MORE_NEWS = `${REDUCER_NAME}LOAD_MORE_NEWS`;
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const CHANGE_TREND_INDEX = `${REDUCER_NAME}CHANGE_TREND_INDEX`;
const RENDER_PERFORMANCE_CHART = `${REDUCER_NAME}RENDER_PERFORMANCE_CHART`;
const UPDATE_MY_INDEX = `${REDUCER_NAME}UPDATE_MY_INDEX`;
const DELETE_MY_INDEX = `${REDUCER_NAME}DELETE_MY_INDEX`;
const CHANGE_LIST_HIDE_COLUMN_INDEX = `${REDUCER_NAME}CHANGE_LIST_HIDE_COLUMN_INDEX`;
const TOGGLE_NEW_FAVORITE = `${REDUCER_NAME}TOGGLE_NEW_FAVORITE`;
const SET_FILTER_NEW_VALUE = `${REDUCER_NAME}SET_FILTER_NEW_VALUE`;
const SET_QUERY_NEW_VALUE = `${REDUCER_NAME}SET_QUERY_NEW_VALUE`;
const SET_DATE_RANGE_OPTION = `${REDUCER_NAME}SET_DATE_RANGE_OPTION`;
const SUBSCRIBE_REALTIME_DATA = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA`;
const ADD_TICKER = `${REDUCER_NAME}ADD_TICKER`;
const ADD_TICKER_TECHNICAL = `${REDUCER_NAME}ADD_TICKER_TECHNICAL`;
const DELETE_TICKER = `${REDUCER_NAME}DELETE_TICKER`;
const HOVER_ROW = `${REDUCER_NAME}HOVER_ROW`;

const RESIZE_COLUMN_TABLE = `${REDUCER_NAME}RESIZE_COLUMN_TABLE`;
const FETCH_DATA_PERFORMANCE_REALTIME = `${REDUCER_NAME}FETCH_DATA_PERFORMANCE_REALTIME`;

const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const INITIAL_DATA_TECHNICAL = `${REDUCER_NAME}INITIAL_DATA_TECHNICAL`;
const INITIAL_DATA_SUMMARY = `${REDUCER_NAME}INITIAL_DATA_SUMMARY`;

const TOGGLE_VIEW_CHART = `${REDUCER_NAME}TOGGLE_VIEW_CHART`;
const FETCH_DATA_CHART = `${REDUCER_NAME}FETCH_DATA_CHART`;
const INITIAL_LIST_DATA_CHART = `${REDUCER_NAME}INITIAL_LIST_DATA_CHART`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const TOGGLE_CONFIRM_POPUP_DELETE = `${REDUCER_NAME}TOGGLE_CONFIRM_POPUP_DELETE`;
const TOGGLE_CONFIRM_POPUP_CREATE_WL = `${REDUCER_NAME}TOGGLE_CONFIRM_POPUP_CREATE_WL`;

const MAX_LIST_IDS_LENGTH = 300;

export {
  REDUCER_NAME,
  reducer as default,
  changeTab,
  fetchListSummary,
  fetchListDerivative,
  changeIndex,
  changeDerivative,
  changePutThrough,
  fetchListPutThrough,
  createWatchList,
  fetchMyWatchList,
  fetchListTechnicalData,
  fetchListNewsData,
  changeTrendIndex,
  renderPerformanceChart,
  updateMyIndex,
  deleteMyIndex,
  changeListHideColumnIndex,
  toggleNewFavorite,
  setFilterNewValue,
  setDateRangeOption,
  setQueryNewValue,
  loadMoreNews,
  notifyResizeColumnTable,
  subscribeRealtimeTickData,
  intervalFetchDataPerformanceChart,
  clearIntervalFetchDataPerformanceChart,
  toggleViewChart,
  updateWatchList,
  deleteTicker,
  fetchChartImage,
  confirmDeleteTicker,
  toggleConfirmPopupDelete,
  toggleConfirmPopupCreateWatchList,
  changeIdHover,
  updateListDerivative,
};

function clearIntervalFetchDataPerformanceChart(organCode) {
  return () => {
    Interval.cancel(organCode);
  };
}

function intervalFetchDataPerformanceChart(organCode, func) {
  return dispatch => {
    Interval.fetch(
      organCode,
      dispatch,
      function(source) {
        return summaryService.getTwoDaysSeries(
          { OrganCode: organCode },
          source,
        );
      },
      function(response) {
        func(response);
      },
      ConstSummary.performanceChart.INTERVAL_GET_DATA,
    );
  };
}

function changeTab(currentTab) {
  return (dispatch, getState) => {
    const watchListId = getState()[REDUCER_NAME].watchListId;

    dispatch({
      type: CHANGE_TAB,
      payload: {
        currentTab,
      },
    });

    // if (!includes([2, 5], currentTab)) {
    fetchData(dispatch, currentTab, watchListId);
    // }
  };
}

function changeWatchListId(watchListId) {
  return {
    type: CHANGE_WATCH_LIST_ID,
    payload: {
      watchListId,
    },
  };
}

function getWatchListType(watchListId, getState) {
  const currentMyIndex = getState()[REDUCER_NAME].currentMyIndex;
  const currentDefaultIndex = getState()[REDUCER_NAME].currentDefaultIndex;
  const currentIndustry = getState()[REDUCER_NAME].currentIndustry;

  // eslint-disable-next-line default-case
  switch (watchListId) {
    case currentMyIndex:
      return Const.watchListType.CUSTOM;
    case currentDefaultIndex:
      return Const.watchListType.COMPANY_GROUP;
    case currentIndustry:
      return Const.watchListType.SECTOR;
  }
}

function fetchListSummary(watchListId) {
  return (dispatch, getState) => {
    dispatch(setFetching());
    dispatch({
      type: INITIAL_DATA_SUMMARY,
    });
    const watchListType = getWatchListType(watchListId, getState);

    request.fetchApi(
      params => {
        const source = registerCancelTokenAxios.register(REDUCER_NAME);
        return summaryService.getWatchListSummary(
          {
            ...params,
            WatchListId: watchListId,
            WatchListType: watchListType,
          },
          source,
        );
      },
      data => {
        if (data) {
          hideFetching(getState, dispatch);

          dispatch({
            type: FETCH_LIST_SUMMARY,
            payload: {
              listSummary: data,
            },
          });
          dispatch({
            type: INITIAL_LIST_DATA_CHART,
          });
        }
      },
      () => {
        dispatch(setFetching(false));
      },
      () => {
        dispatch(setFetching(false));
      },
    );
  };
}

function fetchListDerivative(derivativeId) {
  return dispatch => {
    dispatch(setFetching());
    summaryService.getWatchListDerivative().then(response => {
      const items = response.items || [];
      dispatch(setFetching(false));
      dispatch({
        type: FETCH_LIST_DERIVATIVE,
        payload: {
          derivativeId,
          listDerivative: items,
        },
      });
    });
  };
}

function updateListDerivative(payload) {
  return {
    payload,
    type: UPDATE_LIST_DERIVATIVE,
  };
}

function fetchListPutThrough(putThroughId) {
  return dispatch => {
    dispatch(setFetching());
    summaryService.getWatchListPutThrough().then(response => {
      const items = formatData(response);
      const data = items.length > 0 ? items[0] : {};

      const { hose = [], hnx = [], upcom = [] } = data;

      const {
        listId: listIdPutThroughHose,
        listObjById: listPutThroughHoseById,
      } = getListIdAndListObjById(hose);

      const {
        listId: listIdPutThroughHnx,
        listObjById: listPutThroughHnxById,
      } = getListIdAndListObjById(hnx);

      const {
        listId: listIdPutThroughUpcom,
        listObjById: listPutThroughUpcomById,
      } = getListIdAndListObjById(upcom);

      dispatch(setFetching(false));
      dispatch({
        type: FETCH_LIST_PUT_THROUGH,
        payload: {
          putThroughId,
          listIdPutThroughHnx,
          listIdPutThroughHose,
          listIdPutThroughUpcom,
          listPutThroughHnxById,
          listPutThroughHoseById,
          listPutThroughUpcomById,
        },
      });
    });
  };
}

function changeIndex(watchListId, oldWatchListId) {
  return (dispatch, getState) => {
    const currentTab = getState()[REDUCER_NAME].currentTab;

    dispatch(changeCurrentData(oldWatchListId, watchListId));

    fetchData(dispatch, currentTab, watchListId);
  };
}

function changeCurrentData(oldWatchListId, watchListId) {
  return {
    type: CHANGE_CURRENT_DATA,
    payload: {
      oldWatchListId,
      watchListId,
    },
  };
}

function changeDerivative(derivativeId) {
  return dispatch => {
    registerCancelTokenAxios.delete(REDUCER_NAME);
    dispatch(fetchListDerivative(derivativeId));
  };
}

function changePutThrough(putThroughId) {
  return dispatch => {
    registerCancelTokenAxios.delete(REDUCER_NAME);
    dispatch(fetchListPutThrough(putThroughId));
  };
}

function createWatchList(watchListName) {
  // todo: call api create new watchlist
  return dispatch => {
    userSettingService
      .newWatchList({
        [ConstSummary.listUserWatchList.TEXT]: watchListName,
        organCodes: [],
      })
      .then(res => {
        if (res.status === ConstCommon.RESPONSE_STATUS.FAILED) {
          dispatch(toggleConfirmPopupCreateWatchList(true, res.errors));
        }
        if (res.status === ConstCommon.RESPONSE_STATUS.SUCCESS) {
          const watchListId = res.result;
          dispatch({
            type: CREATE_WATCH_LIST,
            payload: {
              watchListId,
              watchListName,
            },
          });
        }
      });
  };
}

function fetchMyWatchList() {
  return dispatch => {
    userSettingService.getUserWatchList().then(({ items }) => {
      if (items) {
        const {
          listCompany,
          listSector,
          listCustom,
        } = getUserWatchListByTypeCode(items);

        let currentDefaultIndex = '';
        listCompany.forEach(item => {
          if (
            item[ConstSummary.listUserWatchList.CODE] ===
            ConstSummary.currentDefaultIndex
          ) {
            currentDefaultIndex =
              item[ConstSummary.listUserWatchList.WATCH_LIST_ID];
          }
        });

        dispatch({
          type: FETCH_MY_WATCH_LIST,
          payload: {
            listCompany,
            listSector,
            listCustom,
            currentDefaultIndex,
          },
        });
        fetchData(dispatch, 1, currentDefaultIndex);
      }
    });
  };
}

function fetchListTechnicalData(watchListId) {
  return (dispatch, getState) => {
    dispatch(setFetching());
    dispatch({
      type: INITIAL_DATA_TECHNICAL,
    });
    request.fetchApi(
      params => {
        const source = registerCancelTokenAxios.register(REDUCER_NAME);
        return technicalService.getListTechnical(
          {
            ...params,
            WatchListId: watchListId,
            Type: getWatchListType(watchListId, getState),
          },
          source,
        );
      },
      data => {
        hideFetching(getState, dispatch);

        dispatch({
          type: FETCH_DATA_TECHNICAL,
          payload: {
            listTechnicalData: data,
          },
        });
      },
      () => {
        dispatch(setFetching(false));
      },
      () => {
        dispatch(setFetching(false));
      },
    );
  };
}

function fetchListNewsData(params, watchListId) {
  return (dispatch, getState) => {
    const newWatchListId = watchListId
      ? watchListId
      : getState()[REDUCER_NAME].watchListId;
    const watchListType = getWatchListType(newWatchListId, getState);

    const formatParams = formatedParams(params);

    dispatch(setFetching());
    const source = registerCancelTokenAxios.register(REDUCER_NAME);
    newsService
      .getListWatchListNews(
        {
          ...formatParams,
          WatchListId: newWatchListId,
          WatchListType: watchListType,
        },
        source,
      )
      .then(response => {
        dispatch(setFetching(false));
        const { items = [], totalCount, pageSize } = response;
        dispatch({
          type: FETCH_LIST_NEWS,
          payload: {
            listWatchListNews: items || [],
            totalCount,
            pageSize,
          },
        });
      });
  };
}

function loadMoreNews(params, watchListId) {
  const formatParams = formatedParams(params);
  return (dispatch, getState) => {
    const newWatchListId = watchListId
      ? watchListId
      : getState()[REDUCER_NAME].watchListId;
    const watchListType = getWatchListType(newWatchListId, getState);

    dispatch(setFetching());
    const source = registerCancelTokenAxios.register(REDUCER_NAME);
    newsService
      .getListWatchListNews(
        {
          ...formatParams,
          WatchListId: newWatchListId,
          WatchListType: watchListType,
        },
        source,
      )
      .then(response => {
        dispatch(setFetching(false));
        const { items = [], totalCount, pageSize } = response;
        if (!items) return;
        dispatch({
          type: LOAD_MORE_NEWS,
          payload: {
            listWatchListNewsLoadMore: items || [],
            totalCount,
            pageSize,
          },
        });
      });
    dispatch({
      type: FETCH_DATA,
      payload: {
        isFetching: true,
      },
    });
  };
}

function formatedParams(params) {
  let { Page, PageSize, KeyWord, FromDate, ToDate, WatchListId } = params;
  const formatParams = {
    Page: Page || 1,
    PageSize: PageSize || 100,
  };
  if (KeyWord) formatParams.KeyWord = KeyWord;
  if (FromDate) formatParams.FromDate = FromDate;
  if (ToDate) formatParams.ToDate = ToDate;
  if (WatchListId) formatParams.WatchListId = WatchListId;

  return formatParams;
}

function changeTrendIndex(typeTrend) {
  return {
    type: CHANGE_TREND_INDEX,
    payload: {
      typeTrend,
    },
  };
}

function renderPerformanceChart(performanceChartWidth, performanceChartHeight) {
  return {
    type: RENDER_PERFORMANCE_CHART,
    payload: {
      isDoneRender: true,
      performanceChartWidth,
      performanceChartHeight,
    },
  };
}

function updateMyIndex(key, name) {
  return dispatch => {
    // todo save update name my index to server
    userSettingService
      .renameWatchList({
        [ConstSummary.listUserWatchList.WATCH_LIST_ID]: key,
        [ConstSummary.listUserWatchList.TEXT]: name,
      })
      .then(res => {
        // todo check success or failed
        dispatch({
          type: UPDATE_MY_INDEX,
          payload: {
            key,
            name,
          },
        });
      });
  };
}

function deleteMyIndex(key) {
  return (dispatch, getState) => {
    // todo delete my index to server
    userSettingService
      .deleteWatchList({ [ConstSummary.listUserWatchList.WATCH_LIST_ID]: key })
      .then(res => {
        const currentTab = getState()[REDUCER_NAME].currentTab;
        let currentMyIndex = getState()[REDUCER_NAME].currentMyIndex;
        let listMyIndex = getState()[REDUCER_NAME].listMyIndex;
        let watchListId = getState()[REDUCER_NAME].watchListId;
        let listMyIndexByKey = getState()[REDUCER_NAME].listMyIndexByKey;
        const watchListIdDefault = getState()[REDUCER_NAME].watchListIdDefault;

        listMyIndexByKey = omit(listMyIndexByKey, key);
        listMyIndex = listMyIndex.filter(item => {
          return item !== key;
        });

        if (currentMyIndex === key) {
          if (listMyIndex.length === 0) {
            if (watchListId === key) {
              watchListId = watchListIdDefault;
              currentMyIndex = ConstSummary.currentMyIndex;
              fetchData(dispatch, currentTab, watchListId);
            }
          } else {
            currentMyIndex = listMyIndex[0];
            if (watchListId === key) {
              watchListId = currentMyIndex;
              fetchData(dispatch, currentTab, watchListId);
            }
          }
        }

        dispatch({
          type: DELETE_MY_INDEX,
          payload: {
            currentMyIndex,
            watchListId,
            listMyIndex,
            listMyIndexByKey,
          },
        });
      });
  };
}

function changeListHideColumnIndex(listHideColumnIndex) {
  return {
    type: CHANGE_LIST_HIDE_COLUMN_INDEX,
    payload: {
      listHideColumnIndex,
    },
  };
}

function toggleNewFavorite(key, value) {
  return (dispatch, getState) => {
    const mainKey = getState()[REDUCER_NAME].KEY_LOCAL_STORAGE;
    let listIds = JSON.parse(localStorage.getItem(mainKey)) || [];

    if (listIds.length === MAX_LIST_IDS_LENGTH) {
      listIds.shift();
    }

    if (!value) {
      listIds.push(key);
    } else {
      listIds = listIds.filter(item => {
        return item !== key;
      });
    }

    localStorage.setItem(mainKey, JSON.stringify(listIds));

    dispatch({
      type: TOGGLE_NEW_FAVORITE,
      payload: {
        newIndex: key,
        value,
      },
    });
  };
}

function setFilterNewValue(filterKey, filterValue) {
  return dispatch => {
    dispatch({
      type: SET_FILTER_NEW_VALUE,
      payload: {
        filterKey,
        filterValue,
      },
    });
  };
}

function setDateRangeOption(FromDate, ToDate) {
  return dispatch => {
    dispatch({
      type: SET_DATE_RANGE_OPTION,
      payload: {
        FromDate,
        ToDate,
      },
    });
  };
}

function setQueryNewValue(queryNews) {
  return dispatch => {
    dispatch({
      type: SET_QUERY_NEW_VALUE,
      payload: {
        queryNews,
      },
    });
  };
}

function notifyResizeColumnTable() {
  initialState.count++;
  return {
    type: RESIZE_COLUMN_TABLE,
    payload: {
      count: initialState.count,
    },
  };
}

function setFetching(payload = true) {
  return {
    type: SET_FETCHING,
    payload,
  };
}

function subscribeRealtimeTickData(data_) {
  const data = checkDataToDisplayNull(data_, true);
  return {
    type: SUBSCRIBE_REALTIME_DATA,
    payload: {
      data,
    },
  };
}

function toggleViewChart() {
  return {
    type: TOGGLE_VIEW_CHART,
  };
}

function fetchChartImage(organCode, theme) {
  return dispatch => {
    const source = registerCancelTokenAxios.register(REDUCER_NAME);
    chartService
      .get6MonthsCandleStickChartImage({ organCode, theme }, source)
      .then(response => {
        if (response && response.items) {
          const item = response.items.length > 0 ? response.items[0] : '';

          dispatch({
            type: FETCH_DATA_CHART,
            payload: {
              organCode,
              item,
            },
          });
        }
      });
  };
}

function changeIdHover(organCode) {
  return {
    type: HOVER_ROW,
    payload: {
      organCode,
    },
  };
}

function updateWatchList(organCode) {
  return (dispatch, getState) => {
    const currentTab = getState()[REDUCER_NAME].currentTab;
    const watchListId = getState()[REDUCER_NAME].watchListId;
    const listTickerSummaryTable = getState()[REDUCER_NAME]
      .listTickerSummaryTable;
    const listTickerTechnical = getState()[REDUCER_NAME].listTickerTechnical;

    const organCodes =
      currentTab === 4
        ? [...listTickerTechnical, organCode]
        : [...listTickerSummaryTable, organCode];

    userSettingService
      .updateWatchList({ watchListId, organCodes })
      .then(res => {
        if (currentTab === 4) {
          technicalService
            .getTickerTechnical({ organCode: organCode })
            .then(res => {
              if (res.status === ConstCommon.RESPONSE_STATUS.SUCCESS) {
                const items = res ? res.items : [];
                const data = items.length > 0 ? items[0] : {};

                dispatch(addTickerTechnical(data, organCode));
              }
            });
        } else {
          summaryService
            .getTickerSummary({ OrganCode: organCode })
            .then(({ items }) => {
              if (items) {
                const ticker = items.length > 0 ? items[0] : {};
                dispatch(addTicker(ticker, organCode));
              }
            });
        }
      });
  };
}

function addTickerTechnical(data, organCode) {
  return {
    type: ADD_TICKER_TECHNICAL,
    payload: {
      data,
      organCode,
    },
  };
}

function addTicker(ticker, organCode) {
  return {
    type: ADD_TICKER,
    payload: {
      ticker,
      organCode,
    },
  };
}

function deleteTicker(organCode) {
  return (dispatch, getState) => {
    const watchListId = getState()[REDUCER_NAME].watchListId;
    const listTickerSummaryTable = getState()[REDUCER_NAME]
      .listTickerSummaryTable;
    const organCodes = listTickerSummaryTable.filter(
      item => item !== organCode,
    );

    userSettingService
      .updateWatchList({ watchListId, organCodes })
      .then(res => {
        dispatch({
          type: DELETE_TICKER,
          payload: {
            organCode,
          },
        });
      });
  };
}

function toggleConfirmPopupDelete(showConfirmPopupDelete, organCode) {
  return {
    type: TOGGLE_CONFIRM_POPUP_DELETE,
    payload: {
      organCode,
      showConfirmPopupDelete,
    },
  };
}

function confirmDeleteTicker(isApply, organCode) {
  return dispatch => {
    if (isApply) {
      dispatch(deleteTicker(organCode));
    } else {
      dispatch(toggleConfirmPopupDelete(false, ''));
    }
  };
}

function toggleConfirmPopupCreateWatchList(isShowPopup, messages = []) {
  return {
    type: TOGGLE_CONFIRM_POPUP_CREATE_WL,
    payload: {
      messages,
      isShowPopup,
    },
  };
}

const initialState = {
  // search add
  KEY_LOCAL_STORAGE: 'listFavoriteNewIds',
  // tab
  currentTab: 1,
  // currentTab: 3,
  // table index
  listTickerSummaryTable: [],
  listSummaryTableByTicker: {},
  listHideColumnIndex: ConstSummary.listHideColumnIndex,
  // table derivative
  listTickerDerivativeTable: [],
  listDerivativeTableByTicker: {},
  // table put through bid
  listIdPutThroughHnx: [],
  listIdPutThroughHose: [],
  listIdPutThroughUpcom: [],
  listPutThroughHnxById: {},
  listPutThroughHoseById: {},
  listPutThroughUpcomById: {},
  // filter
  currentMyIndex: '',
  currentDefaultIndex: '',
  currentIndustry: '',
  currentDerivative: ConstSummary.currentDerivative,
  currentPutThrough: ConstSummary.currentPutThrough,

  listMyIndex: [],
  listDefaultIndex: [],
  listIndustry: [],
  listDerivative: ConstSummary.listDerivative,
  listPutThrough: ConstSummary.listPutThrough,

  listMyIndexByKey: {},
  listDefaultIndexByKey: {},
  listIndustryByKey: {},
  listDerivativeByKey: ConstSummary.listDerivativeByKey,
  listPutThroughByKey: ConstSummary.listPutThroughByKey,

  watchListId: '',
  watchListIdDefault: '',

  listTickerTechnical: [],
  listTechnicalByTicker: {},

  listTickerNews: [],
  listNewsByTicker: {},
  filterOption: {
    filterKey: null,
    filterValue: null,
  },
  dateRangeOption: {
    FromDate: null,
    ToDate: null,
  },
  totalPage: null,
  queryNews: null,
  isFetching: false,
  isChecked: false,

  typeTrendIndex: ConstSummary.index.AVERAGE_PRICE_DAILY,
  count: 0,
  data: null,
  countPerformanceChart: 0,

  viewChart: false,
  images: {},
  component: {},

  organCodeHover: '',

  showConfirmPopupDelete: false,
  organCodeDelete: '',

  createWl: {
    isShowPopup: false,
    messages: [],
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TAB:
      const currentTab = action.payload.currentTab;
      const resetDateRangeOption = {
        FromDate: null,
        ToDate: null,
      };

      return { ...state, currentTab, dateRangeOption: resetDateRangeOption };
    case CHANGE_CURRENT_DATA: {
      const { oldWatchListId, watchListId } = action.payload;
      switch (oldWatchListId) {
        case state.currentMyIndex:
          return { ...state, currentMyIndex: watchListId };
        case state.currentDefaultIndex:
          return { ...state, currentDefaultIndex: watchListId };
        case state.currentIndustry:
          return { ...state, currentIndustry: watchListId };
        case state.currentDerivative:
          return { ...state, currentDerivative: watchListId };
        case state.currentPutThrough:
          return { ...state, currentPutThrough: watchListId };
        default:
          return state;
      }
    }

    case DELETE_TICKER: {
      const { organCode } = action.payload;

      const newListSummaryTableByTicker = { ...state.listSummaryTableByTicker };
      delete newListSummaryTableByTicker[organCode];
      const newListTickerSummaryTable = [
        ...state.listTickerSummaryTable,
      ].filter(item => item !== organCode);

      return {
        ...state,
        listSummaryTableByTicker: newListSummaryTableByTicker,
        listTickerSummaryTable: newListTickerSummaryTable,
        showConfirmPopupDelete: false,
        organCodeDelete: '',
      };
    }

    case ADD_TICKER_TECHNICAL: {
      const { organCode, data } = action.payload;

      return {
        ...state,
        organCodeHover: organCode,
        listTickerTechnical: addOrganCodeToList(organCode, [
          ...state.listTickerTechnical,
        ]),
        listTechnicalByTicker: {
          ...state.listTechnicalByTicker,
          [organCode]: data,
        },
      };
    }

    case ADD_TICKER: {
      const { ticker, organCode } = action.payload;
      return {
        ...state,
        organCodeHover: organCode,
        listSummaryTableByTicker: {
          ...state.listSummaryTableByTicker,
          [getDataFollowKeyByDot(
            ticker,
            ConstSummary.index.ORGAN_CODE,
          )]: ticker,
        },
        listTickerSummaryTable: addOrganCodeToList(
          getDataFollowKeyByDot(ticker, ConstSummary.index.ORGAN_CODE),
          [...state.listTickerSummaryTable],
        ),
      };
    }

    case INITIAL_DATA_SUMMARY:
      return {
        ...state,
        listSummaryTableByTicker: {},
        listTickerSummaryTable: [],
      };

    case FETCH_LIST_SUMMARY:
      const listSummary = checkDataToDisplayNull(action.payload.listSummary);

      const listTickerSummaryTable = listSummary.map(item =>
        getDataFollowKeyByDot(item, ConstSummary.index.ORGAN_CODE),
      );
      const listSummaryTableByTicker = keyBy(
        listSummary,
        ConstSummary.index.ORGAN_CODE,
      );

      return {
        ...state,
        listSummaryTableByTicker: {
          ...state.listSummaryTableByTicker,
          ...listSummaryTableByTicker,
        },
        listTickerSummaryTable: [
          ...state.listTickerSummaryTable,
          ...listTickerSummaryTable,
        ],
      };

    case FETCH_LIST_DERIVATIVE: {
      const { listDerivative, derivativeId } = action.payload;

      const listTickerDerivativeTable = listDerivative.map(item =>
        getDataFollowKeyByDot(item, ConstSummary.derivative.DERIVATIVE_CODE),
      );
      const listDerivativeTableByTicker = keyBy(
        listDerivative,
        ConstSummary.derivative.DERIVATIVE_CODE,
      );

      return {
        ...state,
        listDerivativeTableByTicker,
        listTickerDerivativeTable,
        currentDerivative: derivativeId,
        watchListId: derivativeId,
      };
    }

    case UPDATE_LIST_DERIVATIVE:
      return {
        ...state,
        listDerivativeTableByTicker: {
          ...state.listDerivativeTableByTicker,
          ...action.payload,
        },
      };

    case FETCH_LIST_PUT_THROUGH: {
      const {
        putThroughId,
        listIdPutThroughHnx,
        listIdPutThroughHose,
        listIdPutThroughUpcom,
        listPutThroughHnxById,
        listPutThroughHoseById,
        listPutThroughUpcomById,
      } = action.payload;

      return {
        ...state,
        listIdPutThroughHnx,
        listIdPutThroughHose,
        listIdPutThroughUpcom,
        listPutThroughHnxById,
        listPutThroughHoseById,
        listPutThroughUpcomById,
        currentPutThrough: putThroughId,
        watchListId: putThroughId,
      };
    }

    case CREATE_WATCH_LIST:
      const {
        watchListId: newWatchListId,
        watchListName: newWatchListName,
      } = action.payload;
      return {
        ...state,
        watchListId: newWatchListId,
        currentMyIndex: newWatchListId,
        listTickerSummaryTable: [],
        listSummaryTableByTicker: {},

        listTickerTechnical: [],
        listTechnicalByTicker: {},

        listMyIndex: [...state.listMyIndex, newWatchListId],
        listMyIndexByKey: {
          ...state.listMyIndexByKey,
          [newWatchListId]: {
            [ConstSummary.listUserWatchList.WATCH_LIST_ID]: newWatchListId,
            [ConstSummary.listUserWatchList.TEXT]: newWatchListName,
          },
        },
      };

    case FETCH_MY_WATCH_LIST:
      const {
        listCustom,
        listCompany,
        listSector,
        currentDefaultIndex,
      } = action.payload;
      const listMyIndex = listCustom.map(item =>
        getDataFollowKeyByDot(
          item,
          ConstSummary.listUserWatchList.WATCH_LIST_ID,
        ),
      );
      const listMyIndexByKey = keyBy(
        listCustom,
        ConstSummary.listUserWatchList.WATCH_LIST_ID,
      );
      listMyIndexByKey['MyWatchList'] = {
        [ConstSummary.listUserWatchList.WATCH_LIST_ID]: 'MyWatchList',
        text: 'My WatchList',
      };
      const currentMyIndex = 'MyWatchList';

      const listDefaultIndex = listCompany.map(item =>
        getDataFollowKeyByDot(
          item,
          ConstSummary.listUserWatchList.WATCH_LIST_ID,
        ),
      );
      const listDefaultIndexByKey = keyBy(
        listCompany,
        ConstSummary.listUserWatchList.WATCH_LIST_ID,
      );

      const listIndustry = listSector.map(item =>
        getDataFollowKeyByDot(
          item,
          ConstSummary.listUserWatchList.WATCH_LIST_ID,
        ),
      );
      const listIndustryByKey = keyBy(
        listSector,
        ConstSummary.listUserWatchList.WATCH_LIST_ID,
      );
      listIndustryByKey['Sector'] = {
        [ConstSummary.listUserWatchList.WATCH_LIST_ID]: 'Sector',
        text: 'Sector',
      };
      const currentIndustry = 'Sector';

      return {
        ...state,
        listMyIndex,
        listMyIndexByKey,
        currentMyIndex,

        listDefaultIndex,
        listDefaultIndexByKey,
        currentDefaultIndex,

        listIndustry,
        listIndustryByKey,
        currentIndustry,

        watchListId: currentDefaultIndex,
        watchListIdDefault: currentDefaultIndex,
      };

    case CHANGE_WATCH_LIST_ID:
      return { ...state, watchListId: action.payload.watchListId };

    case FETCH_DATA_TECHNICAL:
      const listTechnicalData = action.payload.listTechnicalData;
      const listTickerTechnical = listTechnicalData.map(item =>
        getDataFollowKeyByDot(item, ConstTechnical.listColumnTable.TICKER),
      );
      const listTechnicalByTicker = {};
      listTechnicalData.forEach((item, index) => {
        let text = ConstTechnical.MOVING_AVERAGE;
        if (index % 3 === 1) {
          text = ConstTechnical.INDICATORS;
        }
        if (index % 3 === 2) {
          text = ConstTechnical.SUMMARY;
        }

        listTechnicalByTicker[item[ConstTechnical.listColumnTable.TICKER]] = {
          ...item,
          [ConstTechnical.listColumnTableVisibility.TYPE]: text,
        };
      });

      return {
        ...state,
        listTickerTechnical: [
          ...state.listTickerTechnical,
          ...listTickerTechnical,
        ],
        listTechnicalByTicker: {
          ...state.listTechnicalByTicker,
          ...listTechnicalByTicker,
        },
      };

    case FETCH_LIST_NEWS: {
      const { listWatchListNews, totalCount, pageSize } = action.payload;
      const totalPage = Math.ceil(totalCount / pageSize);
      const listTickerNews = listWatchListNews.map(item =>
        getDataFollowKeyByDot(item, ConstNews.listColumn.NEWS_ID),
      );
      const listNewsByTicker = keyBy(
        listWatchListNews,
        ConstNews.listColumn.NEWS_ID,
      );

      return {
        ...state,
        listTickerNews,
        listNewsByTicker,
        totalPage,
      };
    }

    case LOAD_MORE_NEWS:
      const {
        listWatchListNewsLoadMore,
        totalCount,
        pageSize,
      } = action.payload;
      const listTickerNewsLoadMore = listWatchListNewsLoadMore.map(item =>
        getDataFollowKeyByDot(item, ConstNews.listColumn.NEWS_ID),
      );
      const listNewsByTickerLoadMore = keyBy(
        listWatchListNewsLoadMore,
        ConstNews.listColumn.NEWS_ID,
      );
      const totalPage = Math.ceil(totalCount / pageSize);
      return {
        ...state,
        listTickerNews: [...state.listTickerNews, ...listTickerNewsLoadMore],
        listNewsByTicker: {
          ...state.listNewsByTicker,
          ...listNewsByTickerLoadMore,
        },
        isFetching: false,
        totalPage,
      };

    case FETCH_DATA:
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };

    case CHANGE_TREND_INDEX:
      const { typeTrend } = action.payload;

      return {
        ...state,
        typeTrendIndex: typeTrend,
      };
    case RENDER_PERFORMANCE_CHART:
      const isDoneRender = action.payload.isDoneRender;
      const performanceChartWidth = action.payload.performanceChartWidth;
      const performanceChartHeight = action.payload.performanceChartHeight;

      return {
        ...state,
        isDoneRender,
        performanceChartWidth,
        performanceChartHeight,
      };
    case UPDATE_MY_INDEX:
      const { key, name } = action.payload;
      const tmpListMyIndexByKey = { ...state.listMyIndexByKey };
      tmpListMyIndexByKey[key][ConstSummary.listUserWatchList.TEXT] = name;

      return { ...state, listMyIndexByKey: tmpListMyIndexByKey };

    case DELETE_MY_INDEX:
      return {
        ...state,
        currentMyIndex: action.payload.currentMyIndex,
        watchListId: action.payload.watchListId,
        listMyIndex: action.payload.listMyIndex,
        listMyIndexByKey: action.payload.listMyIndexByKey,
      };

    case CHANGE_LIST_HIDE_COLUMN_INDEX:
      const { listHideColumnIndex } = action.payload;

      return { ...state, listHideColumnIndex: [...listHideColumnIndex] };
    case TOGGLE_NEW_FAVORITE:
      const { newIndex, value } = action.payload;
      return {
        ...state,
        listNewsByTicker: {
          ...state.listNewsByTicker,
          [newIndex]: {
            ...state.listNewsByTicker[newIndex],
            isFavorite: !value,
          },
        },
      };
    case SET_FILTER_NEW_VALUE:
      const { filterKey, filterValue } = action.payload;
      const filterOption = {
        ...state.filterValue,
        filterKey,
        filterValue,
      };
      return {
        ...state,
        filterOption,
      };
    case SET_DATE_RANGE_OPTION:
      const { FromDate, ToDate } = action.payload;
      const dateRangeOption = {
        ...state.dateRangeOption,
        FromDate,
        ToDate,
      };
      return {
        ...state,
        dateRangeOption,
      };
    case SET_QUERY_NEW_VALUE:
      const { queryNews } = action.payload;
      return {
        ...state,
        queryNews,
      };

    case RESIZE_COLUMN_TABLE:
      const { count } = action.payload;

      return { ...state, count };

    case FETCH_DATA_PERFORMANCE_REALTIME:
      const { data, countPerformanceChart } = action.payload;

      return { ...state, data, countPerformanceChart };

    case SUBSCRIBE_REALTIME_DATA:
      action.payload.data.forEach(item => {
        if (state.listSummaryTableByTicker[item.organCode]) {
          state.listSummaryTableByTicker[item.organCode] = {
            ...state.listSummaryTableByTicker[item.organCode],
            priceInfo: item,
            performance: {
              ...state.listSummaryTableByTicker[item.organCode].performance,
              percentPriceChange1Day: item.percentPriceChange,
            },
          };
        }
      });

      return { ...state };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };

    case INITIAL_DATA_TECHNICAL:
      return {
        ...state,
        listTickerTechnical: [],
        listTechnicalByTicker: {},
      };

    case TOGGLE_VIEW_CHART:
      return {
        ...state,
        viewChart: !state.viewChart,
      };

    case FETCH_DATA_CHART:
      const { item: imageSrc, organCode: imageCode } = action.payload;
      return {
        ...state,
        images: { ...state.images, [imageCode]: imageSrc },
      };

    case INITIAL_LIST_DATA_CHART:
      return {
        ...state,
        images: {},
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case HOVER_ROW:
      return {
        ...state,
        organCodeHover: action.payload.organCode,
      };

    case TOGGLE_CONFIRM_POPUP_DELETE:
      return {
        ...state,
        showConfirmPopupDelete: action.payload.showConfirmPopupDelete,
        organCodeDelete: action.payload.organCode,
      };

    case TOGGLE_CONFIRM_POPUP_CREATE_WL:
      return {
        ...state,
        createWl: {
          isShowPopup: action.payload.isShowPopup,
          messages: action.payload.messages,
        },
      };

    default:
      return state;
  }
}

function fetchData(dispatch, currentTab, watchListId) {
  registerCancelTokenAxios.delete(REDUCER_NAME);

  dispatch(changeWatchListId(watchListId));
  if (currentTab === 1) {
    dispatch(fetchListSummary(watchListId));
  }
  if (currentTab === 2) {
    dispatch(fetchListSummary(watchListId));
  }
  if (currentTab === 3) {
    dispatch(fetchListNewsData({}, watchListId));
  }
  if (currentTab === 4) {
    dispatch(fetchListTechnicalData(watchListId));
  }
  if (currentTab === 5) {
    dispatch(fetchListSummary(watchListId));
  }
}

//reducerRegistry.register(REDUCER_NAME, reducer);
reducerRegistry.register(REDUCER_NAME, reducer);

function getUserWatchListByTypeCode(listUserWatchList) {
  const result = {
    listCustom: [],
    listCompany: [],
    listSector: [],
  };
  listUserWatchList.forEach(item => {
    if (item.typeCode === Const.watchListType.CUSTOM) {
      result.listCustom.push(item);
    }
    if (item.typeCode === Const.watchListType.SECTOR) {
      result.listSector.push(item);
    }
    if (item.typeCode === Const.watchListType.COMPANY_GROUP) {
      result.listCompany.push(item);
    }
  });

  return result;
}

function addOrganCodeToList(organCode, list) {
  if (!includes(list, organCode)) {
    list.push(organCode);
  }
  return list;
}

function hideFetching(getState, dispatch) {
  const currentMyIndex = getState()[REDUCER_NAME].currentMyIndex;
  const watchListId = getState()[REDUCER_NAME].watchListId;
  if (watchListId !== currentMyIndex) {
    dispatch(setFetching(false));
  }
}

function checkDataToDisplayNull(listSummary, dataRealTime = false) {
  const listColumn = dataRealTime
    ? getDataKeyRealTime(
        ConstSummary.listDisplayNullWhenTotalVolumeEqualZeroInSummary,
      )
    : ConstSummary.listDisplayNullWhenTotalVolumeEqualZeroInSummary;
  listSummary.map(item => {
    const volume = getDataFollowKeyByDot(item, listColumn.TOTAL_MATCH_VOLUME);
    if (!volume) {
      Object.values(listColumn).map(strKey => {
        setDataFollowKeyByDot(item, strKey, null);
      });
    }
  });

  return listSummary;
}

// get only last part after the dot.
// e.g. priceInfo.matchPrice => matchPrice
function getDataKeyRealTime(listDataKey) {
  let dataKeys = cloneDeep(listDataKey);
  Object.keys(dataKeys).map(key => {
    const temp = dataKeys[key].split('.');
    dataKeys[key] = temp[temp.length - 1];
  });
  return dataKeys;
}
