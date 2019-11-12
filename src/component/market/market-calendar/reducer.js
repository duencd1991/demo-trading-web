import _ from 'lodash';
import moment from 'moment';
import marketCalendarService from '../../../core/services/Market/MaketCalendar/WatchListService';
import corpotateService from '../../../core/services/Market/MaketCalendar/CorporateService';
import economyService from '../../../core/services/Market/MaketCalendar/EconomyService';
import CorporateConst from './corporate/Const';
import Const from './watchlist/Const';
import ConstEconomy from './economy/Const';
import {
  getDataFollowKeyByDot,
  searchTextInList,
} from './../../helpers/Common';
import reducerRegistry from './../../helpers/ReducerRegistry';
import masterService from '../../../core/services/Common/MasterService';
import ConstCommon from './../../common/Const';
import Interval from '../../helpers/IntervalCallApi';

const REDUCER_NAME = 'MARKET_CALENDAR:';
const FETCH_LIST_WATCH_LIST = `${REDUCER_NAME}FETCH_LIST_WATCH_LIST`;
const CHANGE_FILTER_EVENT = `${REDUCER_NAME}CHANGE_FILTER_EVENT`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const FETCH_LIST_CORPORATE = `${REDUCER_NAME}FETCH_LIST_CORPORATE`;
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const FETCH_LIST_WATCH_LIST_DROP = `${REDUCER_NAME}FETCH_LIST_WATCH_LIST_DROP`;
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;
const CHANGE_WATCH_LIST = `${REDUCER_NAME}CHANGE_WATCH_LIST`;
const CHANGE_GET_DATA = `${REDUCER_NAME}CHANGE_GET_DATA`;
const SET_DATE_RANGE_OPTION = `${REDUCER_NAME}SET_DATE_RANGE_OPTION`;
const SET_FILTER_NEW_VALUE = `${REDUCER_NAME}SET_FILTER_NEW_VALUE`;
const LOAD_MORE_WATCH_LIST = `${REDUCER_NAME}LOAD_MORE_WATCH_LIST`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const FETCH_LIST_TICKER = `${REDUCER_NAME}FETCH_LIST_TICKER`;
//const CHANGE_TEXT_SEARCH_BUTTON = `${REDUCER_NAME}CHANGE_TEXT_SEARCH_BUTTON`;
const FETCH_LIST_ORGANIZATION = `${REDUCER_NAME}FETCH_LIST_ORGANIZATION`;
const FILTER_LIST_SEARCH = `${REDUCER_NAME}FILTER_LIST_SEARCH`;
const SET_QUERY_NEW_VALUE = `${REDUCER_NAME}SET_QUERY_NEW_VALUE`;

const CHANGE_EVENT_TYPE = `${REDUCER_NAME}CHANGE_EVENT_TYPE`;
const FETCH_LIST_WATCH_LIST_DATE = `${REDUCER_NAME}FETCH_LIST_WATCH_LIST_DATE`;
const CHANGE_FLAG = `${REDUCER_NAME}CHANGE_FLAG`;
const LOAD_MORE_DIV_CORPORATE = `${REDUCER_NAME}LOAD_MORE_DIV_CORPORATE`;
const FETCH_DATA_CORPORATE = `${REDUCER_NAME}FETCH_DATA_CORPORATE`;
// economy
const FETCH_LIST_ECONOMY = `${REDUCER_NAME}FETCH_LIST_ECONOMY`;
const SET_FETCHING_ECO = `${REDUCER_NAME}SET_FETCHING_ECO`;
const SET_FILTER_ECONOMY_VALUE = `${REDUCER_NAME}SET_FILTER_ECONOMY_VALUE`;
const LIST_ECO_BY_CHECKBOX = `${REDUCER_NAME}LIST_ECO_BY_CHECKBOX`;
const SET_ACTIVE_DAY_IN_WEEK = `${REDUCER_NAME}SET_ACTIVE_DAY_IN_WEEK`;
const SET_PARAMS_ECO = `${REDUCER_NAME}SET_PARAMS_ECO`;
const LOAD_MORE_ECO = `${REDUCER_NAME}LOAD_MORE_ECO`;
const FETCH_DATA_ECO = `${REDUCER_NAME}FETCH_DATA_ECO`;
const SET_ACTIVE_DAY_IN_WEEK_CHANGE_TAB = `${REDUCER_NAME}SET_ACTIVE_DAY_IN_WEEK_CHANGE_TAB`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  REDUCER_NAME,
  reducer as default,
  // fetchListWatchList,
  changeFilterEvent,
  changeTimeRange,
  fetchListDataTable,
  changeTab,
  fetchListWatchListDropDown,
  changeGetData,
  setDateRangeOption,
  setFilterNewValue,
  changeCode,
  fetchListDataTableDefault,
  loadMoreWatchList,
  fetchListTicker,
  //changeTextSearchButton,
  filterListSearch,
  setQueryNewValue,
  changeEvenType,
  changeWatchListDropDown,
  fetchListWatchListDate,
  cancelIntervalFetchWatchList,
  intervalFetchWatchList,
  changeFlag,
  loadMoreCorporateDiv,
  fetchListOrganization,
  // Economy
  intercalFetchEconomy,
  cancelIntervalFetchEconomy,
  setActiveDayInWeek,
  loadMoreEco,
  setParamsEco,
  setActiveDayInWeekChangeTab,
};

// ===================start economy
function intercalFetchEconomy(item) {
  return (dispatch, getState) => {
    const store = getState();
    let params = {
      WeekOfYear: store[REDUCER_NAME].weekOfYear,
      Year: store[REDUCER_NAME].year,
      Page: item.page,
      PageSize: item.pageSize,
      KeyWord: store[REDUCER_NAME].keyWordEconomy
        ? store[REDUCER_NAME].keyWordEconomy
        : '',
    };
    // if (store[REDUCER_NAME].keyWordEconomy) {
    //   params = {
    //     KeyWord: store[REDUCER_NAME].keyWordEconomy,
    //   };
    // }
    Interval.fetch(
      'Economy',
      dispatch,
      function(source) {
        return economyService.getListEconomy(params, source);
      },
      function(response) {
        const { items = [] } = response.items === null ? [] : response;
        const newItems = items.map((item, index) => ({
          ...item,
          sortOrder: index + 1,
        }));
        dispatch({
          type: FETCH_LIST_ECONOMY,
          payload: {
            listEconomy: newItems,
            totalCount: response.totalCount,
            pageSize: ConstEconomy.pageSize,
          },
        });
      },
      1000 * 60 * 5,
    );
  };
}

function loadMoreEco(params) {
  return dispatch => {
    dispatch(setFetchingEco());
    economyService.getListEconomy(params).then(response => {
      dispatch(setFetchingEco(false));
      const { items = [] } = !response.items ? [] : response;
      if (!items) return;
      const newItems = items.map((item, index) => ({
        ...item,
        sortOrder: index + 1,
      }));
      dispatch({
        type: LOAD_MORE_ECO,
        payload: {
          listEconomy: newItems,
        },
      });
    });
    dispatch({
      type: FETCH_DATA_ECO,
      payload: {
        isFetchingEco: true,
      },
    });
  };
}

function cancelIntervalFetchEconomy() {
  return () => {
    Interval.cancel('Economy');
  };
}

function setActiveDayInWeek(params) {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_DAY_IN_WEEK,
      payload: {
        activeStatus: params.activeStatus,
        currentWeek: params.currentWeek,
        position: params.position,
        filterDate: params.filterDate,
      },
    });
  };
}

function setActiveDayInWeekChangeTab() {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_DAY_IN_WEEK_CHANGE_TAB,
      payload: {
        activeStatus: false,
      },
    });
  };
}

function setParamsEco(params) {
  return dispatch => {
    dispatch({
      type: SET_PARAMS_ECO,
      payload: {
        weekOfYear: params.weekOfYear,
        year: params.year,
        keyWord: params.keyWord,
        Page: ConstEconomy.page,
        PageSize: ConstEconomy.pageSize,
      },
    });
  };
}

//=========================end Economy

//Watchlist
function cancelIntervalFetchWatchList() {
  return () => {
    Interval.cancel('WatchList');
  };
}

function intervalFetchWatchList(
  eventType,
  watchlistType,
  watchListId,
  fromPublicDate,
  toPublicDate,
  fromExrightDate,
  toExrightDate,
  fromRecordDate,
  toRecordDate,
  fromExerciseDate,
  toExerciseDate,
) {
  return (dispatch, globalState) => {
    Interval.fetch(
      'WatchList',
      dispatch,
      function(source) {
        const params = { Page: 1, PageSize: 50 };
        if (eventType) params.Type = eventType;
        if (watchlistType) params.WatchlistType = watchlistType;
        if (watchListId) params.WatchListId = watchListId.toString();
        if (fromPublicDate) params.FromPublicDate = fromPublicDate;
        if (toPublicDate) params.ToPublicDate = toPublicDate;
        if (fromExrightDate) params.FromExrightDate = fromExrightDate;
        if (toExrightDate) params.ToExrightDate = toExrightDate;
        if (fromRecordDate) params.FromRecordDate = fromRecordDate;
        if (toRecordDate) params.ToRecordDate = toRecordDate;
        if (fromExerciseDate) params.FromExerciseDate = fromExerciseDate;
        if (toExerciseDate) params.ToExerciseDate = toExerciseDate;
        return marketCalendarService.getListWatchList(params, source);
      },
      function(response) {
        const { items = [] } = response.items === null ? [] : response;
        dispatch({
          type: FETCH_LIST_WATCH_LIST,
          payload: {
            lstWatchList: items,
            totalCount: response.totalCount,
            pageSize: 50,
          },
        });
      },
      1000 * 60 * 5,
    );
  };
}

function fetchListTicker() {
  return dispatch => {
    masterService.getListOrganization().then(response => {
      const { items: listTicker = [] } = response ? response : [];
      dispatch({
        type: FETCH_LIST_TICKER,
        payload: {
          listTicker,
        },
      });
    });
  };
}

function loadMoreWatchList(params) {
  return (dispatch, getState) => {
    const store = getState();
    const flag = store[REDUCER_NAME].checkFlag;
    const formatParams = formatedParams(params, flag);
    dispatch(setFetching());
    marketCalendarService.getListWatchList(formatParams).then(response => {
      dispatch(setFetching(false));
      const { items = [] } = response.items === null ? [] : response;
      if (!items) return;
      dispatch({
        type: LOAD_MORE_WATCH_LIST,
        payload: {
          listWatchListLoadMore: items || [],
          pageNumber: params.Page,
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

function changeEvenType(eventType) {
  return (dispatch, getState) => {
    const store = getState();
    const watchListId = store[REDUCER_NAME].watchListId;
    const watchlistType = store[REDUCER_NAME].watchlistType;
    dispatch({
      type: CHANGE_EVENT_TYPE,
      payload: {
        eventType,
        watchListId,
        watchlistType,
        checkFlag: 1,
      },
    });
    dispatch(intervalFetchWatchList(eventType, watchlistType, watchListId));
  };
}

function changeWatchListDropDown(watchlistType, watchListId) {
  return (dispatch, getState) => {
    const store = getState();
    let eventType = store[REDUCER_NAME].eventType;
    dispatch({
      type: CHANGE_WATCH_LIST,
      payload: {
        watchlistType,
        watchListId,
        eventType,
        checkFlag: 2,
      },
    });
  };
}

function fetchData(dispatch, currentTab) {
  if (currentTab === 1) {
  }
  if (currentTab === 2) {
    dispatch(intervalFetchWatchList());
  }
  if (currentTab === 3) {
  }
}

function changeGetData(
  fromPublicDate,
  toPublicDate,
  fromExrightDate,
  toExrightDate,
  fromRecordDate,
  toRecordDate,
  fromExerciseDate,
  toExerciseDate,
) {
  return (dispatch, globalState) => {
    const store = globalState();
    const watchListId = store[REDUCER_NAME].watchListId;
    const watchlistType = store[REDUCER_NAME].watchlistType;
    let eventType = store[REDUCER_NAME].eventType;
    dispatch({
      type: CHANGE_GET_DATA,
      payload: {
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
        checkFlag: 3,
      },
    });
    dispatch(
      intervalFetchWatchList(
        eventType,
        watchlistType,
        watchListId,
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
      ),
    );
  };
}

function setFetching(payload = true) {
  return {
    type: SET_FETCHING,
    payload,
  };
}
function setFetchingEco(payload = true) {
  return {
    type: SET_FETCHING_ECO,
    payload,
  };
}

const FLAGS = {
  EVENT_TYPE: 1,
  WATCH_LIST: 2,
  TO_DATE: 3,
};

function formatedParams(params, flag) {
  const formatParams = {
    Page: params.Page || 1,
    PageSize: params.PageSize || 50,
  };
  if (params.eventType) formatParams.Type = params.eventType;
  // if (flag === FLAGS.WATCH_LIST) {
  if (params.watchlistType) formatParams.WatchlistType = params.watchlistType;
  if (params.watchListId) formatParams.WatchListId = params.watchListId;
  // }
  if (flag === FLAGS.TO_DATE) {
    if (params.fromPublicDate)
      formatParams.FromPublicDate = params.fromPublicDate;
    if (params.toPublicDate) formatParams.ToPublicDate = params.toPublicDate;
    if (params.fromExrightDate)
      formatParams.FromExrightDate = params.fromExrightDate;
    if (params.toExrightDate) formatParams.ToExrightDate = params.toExrightDate;
    if (params.fromRecordDate)
      formatParams.FromRecordDate = params.fromRecordDate;
    if (params.toRecordDate) formatParams.ToRecordDate = params.toRecordDate;
    if (params.fromExerciseDate)
      formatParams.FromExerciseDate = params.fromExerciseDate;
    if (params.toExerciseDate)
      formatParams.ToExerciseDate = params.toExerciseDate;
  }

  return formatParams;
}

function fetchListWatchListDate(
  fromPublicDate,
  toPublicDate,
  fromExrightDate,
  toExrightDate,
  fromRecordDate,
  toRecordDate,
  fromExerciseDate,
  toExerciseDate,
) {
  return dispatch => {
    const params = { Page: 1, PageSize: 50 };
    if (fromPublicDate) params.FromPublicDate = fromPublicDate;
    if (toPublicDate) params.ToPublicDate = toPublicDate;
    if (fromExrightDate) params.FromExrightDate = fromExrightDate;
    if (toExrightDate) params.ToExrightDate = toExrightDate;
    if (fromRecordDate) params.FromRecordDate = fromRecordDate;
    if (toRecordDate) params.ToRecordDate = toRecordDate;
    if (fromExerciseDate) params.FromExerciseDate = fromExerciseDate;
    if (toExerciseDate) params.ToExerciseDate = toExerciseDate;
    marketCalendarService.getListWatchList(params).then(response => {
      const { items = [] } = response;
      dispatch({
        type: FETCH_LIST_WATCH_LIST_DATE,
        payload: {
          lstWatchList: items,
        },
      });
    });
  };
}

//search
function fetchListOrganization() {
  return dispatch => {
    masterService.getListOrganization().then(response => {
      const items = response.items || [];

      dispatch({
        type: FETCH_LIST_ORGANIZATION,
        payload: {
          data: items,
        },
      });
    });
  };
}

function filterListSearch(search) {
  return {
    type: FILTER_LIST_SEARCH,
    payload: {
      search,
    },
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
//close search

function fetchListDataTableDefault() {
  return (dispatch, getState) => {
    const timeRange = getState()[REDUCER_NAME].timeRangeFilter;
    const dateRangeOption = getState()[REDUCER_NAME].dateRangeOption;
    const ticker = getState()[REDUCER_NAME].ticker;

    const formatParams = formatedParamsCorporate(
      {},
      ticker,
      timeRange,
      dateRangeOption,
    );

    corpotateService.getListDataErnCorporate(formatParams).then(response => {
      let listData = response.items;
      dispatch({
        type: FETCH_LIST_CORPORATE,
        payload: {
          listDataCorporate: listData,
        },
      });
    });
  };
}

function formatedParamsCorporate(params, ticker, timeRange, dateRangeOption) {
  let { Page, PageSize } = params;
  let { OrganCode } = ticker || '';
  let { FromDate, ToDate } = dateRangeOption;

  const formatParams = {
    OrganCode: '',
    Page: 1,
    PageSize: 50,
  };
  if (OrganCode) formatParams.OrganCode = OrganCode;
  if (timeRange) formatParams.CalendarPeriod = timeRange;
  //if (dateRangeOption) formatParams.dateRangeOption = dateRangeOption;
  if (FromDate) formatParams.FromDate = FromDate;
  if (ToDate) formatParams.ToDate = ToDate;
  if (Page) formatParams.Page = Page;
  if (PageSize) formatParams.PageSize = PageSize;
  return formatParams;
}

function getFormatParamByFilterSearch({}, ticker, timeRange, dateRangeOption) {
  let params = {};
  if (ticker) {
    params = { OrganCode: ticker };
  } else {
    params = { OrganCode: '' };
  }
  return formatedParamsCorporate({}, params, timeRange, dateRangeOption);
}

function loadMoreCorporateDiv(params) {
  return (dispatch, getState) => {
    const timeRange = getState()[REDUCER_NAME].timeRangeFilter;
    const dateRangeOption = getState()[REDUCER_NAME].dateRangeOption;
    const ticker = getState()[REDUCER_NAME].ticker;

    const formatParams = formatedParamsCorporate(
      params,
      ticker,
      timeRange,
      dateRangeOption,
    );

    let listData = [];
    dispatch(setFetching());
    if (params.isCashDiv) {
      dispatch(setFetching());
      corpotateService
        .getListDataDivCashCorporate(formatParams)
        .then(response => {
          dispatch(setFetching(false));
          listData = response.items;
          dispatch({
            type: LOAD_MORE_DIV_CORPORATE,
            payload: {
              listCashDiv: listData || {},
              //listStockDiv: {}
            },
          });
        });
      dispatch({
        type: FETCH_DATA_CORPORATE,
        payload: {
          isFetchingCorporate: true,
        },
      });
    } else {
      corpotateService
        .getListDataDivStockCorporate(formatParams)
        .then(response => {
          dispatch(setFetching(false));
          listData = response.items;
          dispatch({
            type: LOAD_MORE_DIV_CORPORATE,
            payload: {
              //listCashDiv: {},
              listStockDiv: listData || {},
            },
          });
        });
      dispatch({
        type: FETCH_DATA_CORPORATE,
        payload: {
          isFetchingCorporateStock: true,
        },
      });
    }
  };
}

function fetchListDataTable(params) {
  return (dispatch, getState) => {
    const currentFilterEvents = getState()[REDUCER_NAME].currentFilterEvents;
    const timeRange = getState()[REDUCER_NAME].timeRangeFilter;
    const dateRangeOption = getState()[REDUCER_NAME].dateRangeOption;
    const ticker = getState()[REDUCER_NAME].ticker;

    let formatParams = getFormatParamByFilterSearch(
      {},
      ticker,
      timeRange,
      dateRangeOption,
    );
    let listData = [];

    console.log('formatParams : ', formatParams);

    switch (currentFilterEvents) {
      case CorporateConst.listFilterEventByKey.ern.key:
        corpotateService
          .getListDataErnCorporate(formatParams)
          .then(response => {
            listData = response.items || {};
            dispatch({
              type: FETCH_LIST_CORPORATE,
              payload: {
                listDataCorporate: listData,
              },
            });
          });
        break;

      case CorporateConst.listFilterEventByKey.div.key:
        const promises = [
          corpotateService.getListDataDivCashCorporate(formatParams),
          corpotateService.getListDataDivStockCorporate(formatParams),
        ];
        Promise.all(promises).then(([cash, stock]) => {
          dispatch({
            type: FETCH_LIST_CORPORATE,
            payload: {
              //listDataCorporate: listData,

              //list cash
              listDataCashDiv: cash || {},
              totalCountCash: cash.totalCount,

              //list stock
              listDataStockDiv: stock || {},
              totalCountStock: stock.totalCount,

              pageSize: 30,
            },
          });
        });

        break;
      case CorporateConst.listFilterEventByKey.sis.key:
        corpotateService
          .getListDataSisCorporate(formatParams)
          .then(response => {
            listData = response.items || {};
            dispatch({
              type: FETCH_LIST_CORPORATE,
              payload: {
                listDataCorporate: listData,
              },
            });
          });
        break;
      case CorporateConst.listFilterEventByKey.ipo.key:
        corpotateService
          .getListDataIpoCorporate(formatParams)
          .then(response => {
            listData = response.items || {};
            dispatch({
              type: FETCH_LIST_CORPORATE,
              payload: {
                listDataCorporate: listData,
              },
            });
          });
        break;
      case CorporateConst.listFilterEventByKey.agm.key:
        corpotateService
          .getListDataAgmCorporate(formatParams)
          .then(response => {
            listData = response.items || {};
            dispatch({
              type: FETCH_LIST_CORPORATE,
              payload: {
                listDataCorporate: listData,
              },
            });
          });
        break;
      default:
        break;
    }
  };
}

function changeFlag(checkFlag) {
  return dispatch => {
    dispatch({
      type: CHANGE_FLAG,
      payload: {
        checkFlag,
      },
    });
  };
}

function changeFilterEvent(key) {
  return (dispatch, getState) => {
    let textSearch = getState()[REDUCER_NAME].textSearch;
    if (textSearch) {
      textSearch = getState()[REDUCER_NAME].textSearch;
    } else {
      textSearch = '';
    }

    const currentFilterEvents = getState()[REDUCER_NAME].currentFilterEvents;
    if (key !== currentFilterEvents) {
      dispatch({
        type: CHANGE_FILTER_EVENT,
        payload: {
          key,
          textSearch,
        },
      });
      dispatch(fetchListDataTable());
    }
  };
}

function changeTimeRange(timeRange) {
  return (dispatch, getState) => {
    const timeRangeFilter = getState()[REDUCER_NAME].timeRangeFilter;
    let dateRangeOption = getState()[REDUCER_NAME].dateRangeOption;
    if (timeRange) {
      //if has timeRange
      dateRangeOption = {
        FromDate: null,
        ToDate: null,
      };
    }

    if (timeRange !== timeRangeFilter) {
      dispatch({
        type: CHANGE_TIME_RANGE,
        payload: {
          timeRange,
          dateRangeOption,
        },
      });
      dispatch(fetchListDataTable());
    }
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
    dispatch(changeTimeRange(null));
    dispatch(fetchListDataTable());
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

function changeCode(ticker) {
  return dispatch => {
    dispatch({
      type: CHANGE_CODE,
      payload: {
        code: ticker,
      },
    });
    dispatch(fetchListDataTable());
  };
}

function fetchListWatchListDropDown(Page = 1, PageSize = 50) {
  return dispatch => {
    marketCalendarService.getListWatchListDropDowm().then(response => {
      const { items = [] } = response;
      dispatch({
        type: FETCH_LIST_WATCH_LIST_DROP,
        payload: {
          lstWatchListdrop: items,
          watchListId: items ? items[0].watchListId : '',
          watchlistType: items ? items[0].typeCode : '',
        },
      });
    });
  };
}

function changeTab(currentTab) {
  return dispatch => {
    dispatch({
      type: CHANGE_TAB,
      payload: {
        currentTab,
      },
    });

    fetchData(dispatch, currentTab);
  };
}

const initialState = {
  lstTickerWatchListDrop: [],
  lstTickerWatchListDropByTicker: {},
  lstTickerWatchList: [],
  listWatchListByTicker: {},

  // search add
  listOrganCodeOrganization: [],
  listOrganizationByOrganCode: {},
  listOrganizationSearch: [],
  listOrganization: {},
  queryNews: null,

  //corporate
  currentFilterEvents: CorporateConst.listFilterEventByKey.ern.key,
  listCashDividend: [],
  listCashDividendByTicker: {},
  listStockDividend: [],
  listStockDividendByTicker: {},
  totalPageCash: 0,
  totalPageStock: 0,
  isFetchingCorporate: false,
  isFetchingCorporateStock: false,
  responseCash: [],
  responseStock: [],
  indexListAppendCash: 0,
  indexListAppendStock: 0,
  currenPageScrollCash: 1,
  currenPageScrollStock: 1,

  //timeRange
  timeRangeFilter: CorporateConst.defaultTimeRange,
  //data corporate
  listDataCorporate: [],
  listTickerTable: [],
  listDataByTicker: {},
  ticker: '',
  //textSearch: '',

  //calendar button
  dateRangeOption: {
    FromDate: null,
    ToDate: null,
  },

  //watchlist
  currentTab: 2,
  eventType: Const.defaultEvenType,
  watchlistType: null,
  watchListId: 0,
  fromPublicDate: null,
  toPublicDate: null,
  fromExrightDate: null,
  toExrightDate: null,
  fromRecordDate: null,
  toRecordDate: null,
  fromExerciseDate: null,
  toExerciseDate: null,
  lstTickerLoadMore: [],
  lstTickerLoadMoreByTicker: {},
  isFetching: false,
  totalPage: 10,
  checkFlag: 0,
  firstPage: 0,
  page: 1,
  listDataSearch: [],
  listDataSearchByTicker: {},
  //Economy
  listTickerEconomy: [],
  listTickerEconomyByTicker: {},
  activeStatus: false,
  currentWeek: 1,
  position: moment().weekday(),
  weekOfYear: moment().week(),
  year: moment().year(),
  keyWordEconomy: '',
  filterDate: moment()
    .day(moment().weekday())
    .format('dddd, MMMM DD, YYYY'), // default get date now
  totalPageEco: 10,
  isFetchingEco: false,
  component: {},
};

const appendId = (data, indexListAppend) => {
  if (!data.length) {
    return [{}, []];
  }

  if (indexListAppend && indexListAppend.length !== 0) {
    const { list, ids } = data.reduce(
      (result, item, index) => {
        indexListAppend += 1;
        return {
          ids: result.ids.concat(indexListAppend),
          list: {
            ...result.list,
            [indexListAppend]: item,
          },
        };
      },
      { list: {}, ids: [] },
    );
    return [list, ids];
  } else {
    const { list, ids } = data.reduce(
      (result, item, index) => {
        return {
          ids: result.ids.concat(index + 1),
          list: {
            ...result.list,
            [index + 1]: item,
          },
        };
      },
      { list: {}, ids: [] },
    );
    return [list, ids];
  }
};

function reducer(state = initialState, action) {
  let timeRangeFilter = '';

  switch (action.type) {
    case SET_QUERY_NEW_VALUE:
      const { queryNews } = action.payload;
      return {
        ...state,
        queryNews,
      };

    case FILTER_LIST_SEARCH:
      const search = _.trim(action.payload.search);
      const listOrganizationSearch = searchTextInList(
        Object.values(state.listOrganizationByOrganCode),
        ConstCommon.listOrganization.TICKER,
        search,
      );

      return { ...state, listOrganizationSearch };

    case FETCH_LIST_ORGANIZATION:
      const listOrganization = action.payload.data;
      const listOrganCodeOrganization = listOrganization.map(item =>
        getDataFollowKeyByDot(item, ConstCommon.listOrganization.ORGAN_CODE),
      );
      const listOrganizationByOrganCode = _.keyBy(
        listOrganization,
        ConstCommon.listOrganization.ORGAN_CODE,
      );

      return {
        ...state,
        listOrganCodeOrganization,
        listOrganizationByOrganCode,
        listOrganization,
      };

    case CHANGE_CODE:
      const organCode = action.payload.code;
      let infoTicker = state.listOrganization.find(
        item => item.organCode === organCode,
      );
      let textSearch = '';
      if (infoTicker) {
        textSearch = infoTicker.ticker;
      }
      return {
        ...state,
        ticker: organCode,
        textSearch,
      };
    case CHANGE_FILTER_EVENT:
      timeRangeFilter = { ...state }.timeRangeFilter;
      if (
        action.payload.key === CorporateConst.listFilterEventByKey.ipo.key ||
        action.payload.key === CorporateConst.listFilterEventByKey.agm.key
      ) {
        timeRangeFilter = CorporateConst.listTimeRangeByKey.ThisMonth.key;
      } else {
        timeRangeFilter = CorporateConst.listTimeRangeByKey.ThisWeek.key;
      }
      dateRangeOption = {
        FromDate: null,
        ToDate: null,
      };

      return {
        ...state,
        currentFilterEvents: action.payload.key,
        timeRangeFilter: timeRangeFilter,
        textSearch: action.payload.textSearch,
        dateRangeOption: dateRangeOption,
        //ticker : ''
      };

    case CHANGE_TIME_RANGE:
      timeRangeFilter = action.payload.timeRange;
      return {
        ...state,
        timeRangeFilter,
        dateRangeOption: action.payload.dateRangeOption,
      };

    case LOAD_MORE_DIV_CORPORATE:
      let { listCashDiv, listStockDiv } = action.payload;

      if (!listStockDiv) {
        if (listCashDiv) {
          const [listCashDividendByTicker, listCashDividend] = appendId(
            listCashDiv,
            state.indexListAppendCash,
          );
          return {
            ...state,
            listCashDividend: [...state.listCashDividend, ...listCashDividend],
            listCashDividendByTicker: {
              ...state.listCashDividendByTicker,
              ...listCashDividendByTicker,
            },
            indexListAppendCash:
              state.indexListAppendCash + listCashDividend.length,
            isFetchingCorporate: false,
            currenPageScrollCash: (state.currenPageScrollCash += 1),
          };
        }
      }

      if (!listCashDiv) {
        if (listStockDiv) {
          const [listStockDividendByTicker, listStockDividend] = appendId(
            listStockDiv,
            state.indexListAppendStock,
          );

          return {
            ...state,
            listStockDividend: [
              ...state.listStockDividend,
              ...listStockDividend,
            ],
            listStockDividendByTicker: {
              ...state.listStockDividendByTicker,
              ...listStockDividendByTicker,
            },
            indexListAppendStock:
              state.indexListAppendStock + listStockDividend.length,
            isFetchingCorporateStock: false,
            currenPageScrollStock: (state.currenPageScrollStock += 1),
          };
        }
      }

    case FETCH_DATA_CORPORATE:
      const { isFetchingCorporate, isFetchingCorporateStock } = action.payload;
      if (isFetchingCorporate) {
        return {
          ...state,
          isFetchingCorporate,
        };
      } else {
        return {
          ...state,
          isFetchingCorporateStock,
        };
      }

    case FETCH_LIST_CORPORATE:
      let data = action.payload.listDataCorporate;
      if (!data) {
        // if (typeof data === 'object' && !Array.isArray(data)) {
        //const [listCashDividendByTicker, listCashDividend] = appendId(data.cashDividend)
        const { totalCountCash, totalCountStock, pageSize } = action.payload;
        const totalPageCash = Math.ceil(totalCountCash / pageSize);
        const totalPageStock = Math.ceil(totalCountStock / pageSize);

        if (
          action.payload.listDataCashDiv.items &&
          action.payload.listDataStockDiv.items
        ) {
          const [listCashDividendByTicker, listCashDividend] = appendId(
            action.payload.listDataCashDiv.items,
          );
          const [listStockDividendByTicker, listStockDividend] = appendId(
            action.payload.listDataStockDiv.items,
          );

          let indexListAppendCash = 0;
          let indexListAppendStock = 0;
          if (listCashDividend) {
            indexListAppendCash = listCashDividend.length;
          }
          if (listStockDividend) {
            indexListAppendStock = listStockDividend.length;
          }

          return {
            ...state,
            listCashDividend,
            listCashDividendByTicker,

            totalPageCorporateDiv: action.payload.totalPageCorporateDiv,
            indexListAppendCash: indexListAppendCash,

            listStockDividend,
            listStockDividendByTicker,

            totalPageCorporateDivStock:
              action.payload.totalPageCorporateDivStock,
            indexListAppendStock: indexListAppendStock,

            totalPageCash: totalPageCash,
            totalPageStock: totalPageStock,

            currenPageScrollCash: 1,
            currenPageScrollStock: 1,
          };
        }
      }

      if (data) {
        const [listDataByTicker, listTickerTable] = appendId(data);

        return {
          ...state,
          listDataCorporate: data,
          listTickerTable: listTickerTable,
          listDataByTicker: listDataByTicker,
        };
      }

    case SET_DATE_RANGE_OPTION:
      const { FromDate, ToDate } = action.payload;
      let dateRangeOption = {
        ...state.dateRangeOption,
        FromDate,
        ToDate,
      };

      return {
        ...state,
        dateRangeOption,
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

    case FETCH_LIST_WATCH_LIST: {
      const { lstWatchList, totalCount, pageSize } = action.payload;
      if (Object.keys(state.listDataSearchByTicker).length > 0) {
        lstWatchList.map(item => ({
          ...item,
          organCode: state.listDataSearchByTicker[item.organCode].displayCode,
        }));
      }

      const totalPage = Math.ceil(totalCount / pageSize);
      const lstTickerWatchList = lstWatchList.map(
        item => item[Const.listId.eventId],
      );
      const listWatchListByTicker = _.keyBy(lstWatchList, Const.listId.eventId);
      return {
        ...state,
        lstTickerWatchList,
        listWatchListByTicker,
        totalPage,
        page: 1,
      };
    }

    case LOAD_MORE_WATCH_LIST: {
      const { listWatchListLoadMore, pageNumber } = action.payload;
      const lstTickerLoadMore = listWatchListLoadMore.map(item =>
        getDataFollowKeyByDot(item, Const.listId.eventId),
      );
      const lstTickerLoadMoreByTicker = _.keyBy(
        listWatchListLoadMore,
        Const.listId.eventId,
      );
      return {
        ...state,
        lstTickerWatchList: [...state.lstTickerWatchList, ...lstTickerLoadMore],
        listWatchListByTicker: {
          ...state.listWatchListByTicker,
          ...lstTickerLoadMoreByTicker,
        },
        isFetching: false,
        firstPage: 0,
        page: pageNumber,
      };
    }

    case FETCH_LIST_WATCH_LIST_DROP: {
      const { lstWatchListdrop, watchListId, watchlistType } = action.payload;
      let lstTickerWatchListDrop = [];
      let lstTickerWatchListDropByTicker = {};
      if (lstWatchListdrop) {
        lstTickerWatchListDrop = lstWatchListdrop.map(item =>
          getDataFollowKeyByDot(item, Const.listId.watchListId),
        );
        lstTickerWatchListDropByTicker = _.keyBy(
          lstWatchListdrop,
          Const.listId.watchListId,
        );
      }

      return {
        ...state,
        watchListId,
        watchlistType,
        lstTickerWatchListDrop,
        lstTickerWatchListDropByTicker,
      };
    }

    case CHANGE_EVENT_TYPE: {
      const { eventType, watchListId, watchlistType } = action.payload;

      return {
        ...state,
        eventType,
        watchListId,
        watchlistType,
        checkFlag: 1,
        firstPage: 1,
      };
    }

    case CHANGE_WATCH_LIST: {
      const { watchListId, watchlistType, eventType } = action.payload;

      return {
        ...state,
        watchlistType,
        watchListId,
        eventType,
        checkFlag: 2,
        firstPage: 1,
      };
    }

    case CHANGE_GET_DATA: {
      const {
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
      } = action.payload;

      return {
        ...state,
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
        checkFlag: 3,
        firstPage: 1,
      };
    }

    case FETCH_DATA:
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };

    case FETCH_DATA_ECO:
      const { isFetchingEco } = action.payload;
      return {
        ...state,
        isFetchingEco,
      };

    case CHANGE_FLAG:
      const { checkFlag } = action.payload;
      return {
        ...state,
        checkFlag,
      };

    case FETCH_LIST_WATCH_LIST_DATE: {
      const {
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
      } = action.payload;

      return {
        ...state,
        fromPublicDate,
        toPublicDate,
        fromExrightDate,
        toExrightDate,
        fromRecordDate,
        toRecordDate,
        fromExerciseDate,
        toExerciseDate,
      };
    }

    case FETCH_LIST_TICKER: {
      const { listTicker } = action.payload;
      let listDataSearch = [];
      let listDataSearchByTicker = {};
      if (listTicker) {
        listTicker.forEach(item => {
          listDataSearch.push({
            displayCode: getDataFollowKeyByDot(item, Const.ticker),
            code: getDataFollowKeyByDot(item, Const.organCode),
          });
        });

        listDataSearchByTicker = _.keyBy(listDataSearch, Const.typeCodeDefault);
      }

      return {
        ...state,
        listDataSearch,
        listDataSearchByTicker,
      };
    }

    // ecnomy
    case FETCH_LIST_ECONOMY: {
      const { listEconomy, totalCount } = action.payload;
      const totalPageEco = Math.ceil(totalCount / ConstEconomy.pageSize);
      const listTickerEconomy = listEconomy.map(item =>
        getDataFollowKeyByDot(item, ConstEconomy.ids.sortOrder),
      );
      const listTickerEconomyByTicker = _.keyBy(
        listEconomy,
        ConstEconomy.ids.sortOrder,
      );
      return {
        ...state,
        listTickerEconomy,
        listTickerEconomyByTicker,
        totalPageEco,
      };
    }

    case SET_FILTER_ECONOMY_VALUE: {
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
    }

    case SET_ACTIVE_DAY_IN_WEEK_CHANGE_TAB: {
      const { activeStatus } = action.payload;
      return {
        ...state,
        activeStatus,
      };
    }

    case LIST_ECO_BY_CHECKBOX: {
      const { listEcoNew } = action.payload;
      const listTickerEconomy = listEcoNew.map(item =>
        getDataFollowKeyByDot(item, ConstEconomy.ids.sortOrder),
      );
      const listTickerEconomyByTicker = _.keyBy(
        listEcoNew,
        ConstEconomy.ids.sortOrder,
      );
      return {
        ...state,
        listTickerEconomy,
        listTickerEconomyByTicker,
      };
    }

    case SET_ACTIVE_DAY_IN_WEEK: {
      const {
        activeStatus,
        currentWeek,
        position,
        filterDate,
      } = action.payload;
      return {
        ...state,
        activeStatus,
        currentWeek,
        position,
        filterDate,
      };
    }

    case SET_PARAMS_ECO: {
      const { weekOfYear, year, keyWord } = action.payload;
      return {
        ...state,
        weekOfYear,
        year,
        keyWordEconomy: keyWord,
      };
    }

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
