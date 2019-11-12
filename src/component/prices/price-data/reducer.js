import reducerRegistry from '../../helpers/ReducerRegistry';
import Const from './Const';
import priceDataService from './../../../core/services/Prices/PriceData/PriceDataService';
import masterService from './../../../core/services/Common/MasterService';
import {
  formatComGroupCode,
  getDataFollowKeyByDot,
} from '../../helpers/Common';

const REDUCER_NAME = 'PRICE_DATA:';
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const FETCH_LIST_PRICE_DATA = `${REDUCER_NAME}FETCH_LIST_PRICE_DATA`;
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const FETCH_INFO_TICKER = `${REDUCER_NAME}FETCH_INFO_TICKER`;
const CHANGE_DATE_RANGE = `${REDUCER_NAME}CHANGE_DATE_RANGE`;
const LOAD_MORE_OVERVIEW = `${REDUCER_NAME}LOAD_MORE_OVERVIEW`;
const FETCH_DATA_OVERVIEW = `${REDUCER_NAME}FETCH_DATA_OVERVIEW`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const INIT_COMPONENT = `${REDUCER_NAME}INIT_COMPONENT`;
const UNMOUNT_COMPONENT = `${REDUCER_NAME}UNMOUNT_COMPONENT`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;
const EXPORT_DATA = `${REDUCER_NAME}EXPORT_DATA`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  REDUCER_NAME,
  reducer as default,
  changeTimeRange,
  fetchListDataTable,
  changeCode,
  fetchListSearch,
  fetchInfoTicker,
  changeDateRange,
  loadMoreOverviewTable,
  subscribeRealtimeTick,
  exportData,
};

//realtime
function subscribeRealtimeTick(data, id) {
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      result: data,
      id,
    },
  };
}

//search box
function changeCode(code, id) {
  return dispatch => {
    dispatch({
      type: CHANGE_CODE,
      payload: {
        displayCode: code.displayCode,
        code: code.code,
        codeName: code.codeName,
        codeExchange: code.exchange,
        isTicker: code.isTicker,
        conditionId: id,
      },
    });
    dispatch(fetchInfoTicker(id));
    dispatch(fetchListDataTable(id));
  };
}

function fetchListSearch() {
  return dispatch => {
    masterService
      .getOranizationAndComGroup()
      .then(([listTicker, listIndex]) => {
        dispatch({
          type: FETCH_LIST_SEARCH,
          payload: {
            listTicker,
            listIndex,
          },
        });
      });
  };
}

function changeTimeRange(timeRange, id) {
  return (dispatch, getState) => {
    const timeRangeFilter = getState()[REDUCER_NAME].listMultiComponent[id]
      .timeRangeFilter;
    let dateRangeOption = getState()[REDUCER_NAME].listMultiComponent[id]
      .dateRangeOption;

    if (timeRange !== timeRangeFilter) {
      dispatch({
        type: CHANGE_TIME_RANGE,
        payload: {
          timeRange,
          dateRangeOption,
          timeRangeId: id,
        },
      });
      dispatch(fetchListDataTable(id));
    }
  };
}

function changeDateRange(datePicker, id) {
  return dispatch => {
    dispatch({
      type: CHANGE_DATE_RANGE,
      payload: {
        FromDate: datePicker.from,
        ToDate: datePicker.to,
        dateRangeId: id,
      },
    });

    dispatch(fetchListDataTable(id));
  };
}

function setFetching(payload = true) {
  return {
    type: SET_FETCHING,
    payload,
  };
}

function loadMoreOverviewTable(params, id) {
  return (dispatch, getState) => {
    const timeRangeFilter = getState()[REDUCER_NAME].listMultiComponent[id]
      .timeRangeFilter;
    const dateRangeOption = getState()[REDUCER_NAME].listMultiComponent[id]
      .dateRangeOption;

    const formatParams = formatedParams(
      params,
      timeRangeFilter,
      dateRangeOption,
    );

    let listData = [];
    let formatListData = [];
    dispatch(setFetching());
    priceDataService.getPriceData(formatParams).then(response => {
      dispatch(setFetching(false));
      listData = response.items || [];
      formatListData = formatPriceDataCallApi(listData);

      dispatch({
        type: LOAD_MORE_OVERVIEW,
        payload: {
          listDataLoadMore: formatListData,
          loadMoreId: id,
        },
      });
    });
    dispatch({
      type: FETCH_DATA_OVERVIEW,
      payload: {
        isFetching: true,
        fetchDataId: id,
      },
    });
  };
}

function fetchInfoTicker(id) {
  return (dispatch, getState) => {
    const listMultiComponent = getState()[REDUCER_NAME].listMultiComponent;
    const code = listMultiComponent[id].currentSearch.code;
    priceDataService.getLatestPrice({ Code: code }).then(response => {
      let tickerInfomation = {};
      if (response.items) {
        tickerInfomation = response.items[0];
      }

      dispatch({
        type: FETCH_INFO_TICKER,
        payload: {
          infoTicker: tickerInfomation,
          componentId: id,
        },
      });
    });
  };
}

function fetchListDataTable(id) {
  return (dispatch, getState) => {
    const code = getState()[REDUCER_NAME].listMultiComponent[id].currentSearch
      .code;
    const timeRangeFilter = getState()[REDUCER_NAME].listMultiComponent[id]
      .timeRangeFilter;
    const dateRangeOption = getState()[REDUCER_NAME].listMultiComponent[id]
      .dateRangeOption;

    let formatParams = formatedParams(
      { Code: code },
      timeRangeFilter,
      dateRangeOption,
    );
    priceDataService.getPriceData(formatParams).then(response => {
      let listData = response.items || [];
      let formatListData = formatPriceDataCallApi(listData);
      dispatch({
        type: FETCH_LIST_PRICE_DATA,
        payload: {
          listData: formatListData,
          totalCount: response.totalCount,
          pageSize: 30,
          dataTableId: id,
        },
      });
    });
  };
}

function exportData(params, id, dateRange) {
  return (dispatch, getState) => {
    const timeRangeFilter = getState()[REDUCER_NAME].timeRangeFilter;

    const formatParams = formatedParams(params, timeRangeFilter, dateRange);
    priceDataService.getPriceData(formatParams).then(response => {
      let listData = response.items || [];
      dispatch({
        type: EXPORT_DATA,
        payload: {
          listDataExport: listData || {},
          ExportId: id,
        },
      });
    });
  };
}

function formatedParams(params, timeRange, dateRangeOption) {
  let { Code, Page, PageSize } = params || '';
  let { FromDate, ToDate } = dateRangeOption || '';
  const formatParams = {
    Code: 'VNINDEX',
    Frequently: 'Daily',
    Page: 1,
    PageSize: 60,
  };
  if (Code) formatParams.Code = Code;
  if (Page) formatParams.Page = Page;
  if (PageSize) formatParams.PageSize = PageSize;
  if (timeRange) formatParams.Frequently = timeRange;
  if (FromDate) formatParams.From = FromDate;
  if (ToDate) formatParams.To = ToDate;
  return formatParams;
}

function formatPriceDataCallApi(listData) {
  let formatListData = listData;
  formatListData.map((item, idx) => {
    item.averageValue =
      getDataFollowKeyByDot(item, Const.priceDataTableOverview.MATCHED_VALUE) /
      getDataFollowKeyByDot(item, Const.priceDataTableOverview.MATCHED_VOLUME);
    item.netVol =
      getDataFollowKeyByDot(item, Const.priceDataTableForeign.BUY_ORDER_VOL) -
      getDataFollowKeyByDot(item, Const.priceDataTableForeign.SELL_ORDER_VOL);
    item.netValue =
      getDataFollowKeyByDot(item, Const.priceDataTableForeign.BUY_ORDER_VALUE) -
      getDataFollowKeyByDot(item, Const.priceDataTableForeign.SELL_ORDER_VALUE);
    item.netVolProprietary =
      getDataFollowKeyByDot(item, Const.priceDataTableProprietary.BUY_VOL) -
      getDataFollowKeyByDot(item, Const.priceDataTableProprietary.SELL_VOL);
    item.netValueProprietary =
      getDataFollowKeyByDot(item, Const.priceDataTableProprietary.BUY_VALUE) -
      getDataFollowKeyByDot(item, Const.priceDataTableProprietary.SELL_VALUE);
    item.buyOrderAvgVol =
      getDataFollowKeyByDot(item, Const.priceDataTableOrderStatistic.BUY_VOL) /
      getDataFollowKeyByDot(
        item,
        Const.priceDataTableOrderStatistic.NR_OF_BUY_ORDER,
      );
    item.sellOrderAvgVol =
      getDataFollowKeyByDot(item, Const.priceDataTableOrderStatistic.SELL_VOL) /
      getDataFollowKeyByDot(
        item,
        Const.priceDataTableOrderStatistic.NR_OF_SELL_ORDER,
      );
    item.netVolOrderStatistic =
      getDataFollowKeyByDot(item, Const.priceDataTableOrderStatistic.BUY_VOL) -
      getDataFollowKeyByDot(item, Const.priceDataTableOrderStatistic.SELL_VOL);
  });
  return formatListData;
}

const initialState = {
  //timeRange
  timeRangeFilter: Const.defaultTimeRange,
  //timeRange dropdown
  dateRangeOption: {
    FromDate: null,
    ToDate: null,
  },

  //multi component
  listMultiComponent: {},
  defaultCurrenPageScroll: 1,
  listDataSearch: [],
};

const appendId = (data, indexListAppend) => {
  if (!data) {
    return [];
  }

  if (indexListAppend) {
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
  let listPriceDataById, listPriceDataId;
  switch (action.type) {
    case SUBSCRIBE_REALTIME_DATA_TICK:
      const { result: resultTick, id: updateTickId } = action.payload;
      if (resultTick) {
        return {
          ...state,
          listMultiComponent: {
            ...state.listMultiComponent,
            [updateTickId]: {
              ...state.listMultiComponent[updateTickId],
              indexSumaryRealTime: resultTick,
            },
          },
        };
      }

      return state;
    case FETCH_DATA_OVERVIEW:
      const { isFetching, fetchDataId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [fetchDataId]: {
            ...state.listMultiComponent[fetchDataId],
            isFetching,
          },
        },
      };

    case LOAD_MORE_OVERVIEW:
      const { listDataLoadMore, loadMoreId } = action.payload;
      [listPriceDataById, listPriceDataId] = appendId(
        listDataLoadMore,
        state.listMultiComponent[loadMoreId].indexListAppend,
      );

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [loadMoreId]: {
            ...state.listMultiComponent[loadMoreId],
            listPriceDataById: {
              ...state.listMultiComponent[loadMoreId].listPriceDataById,
              ...listPriceDataById,
            },

            listPriceDataId: [
              ...state.listMultiComponent[loadMoreId].listPriceDataId,
              ...listPriceDataId,
            ],

            listData: [
              ...state.listMultiComponent[loadMoreId].listData,
              ...listDataLoadMore,
            ],

            indexListAppend:
              state.listMultiComponent[loadMoreId].indexListAppend +
              listPriceDataId.length,
            isFetching: false,
            currenPageScroll: (state.listMultiComponent[
              loadMoreId
            ].currenPageScroll += 1),
          },
        },
      };

    case CHANGE_DATE_RANGE:
      const { FromDate, ToDate, dateRangeId } = action.payload;
      let dateRangeOption = {
        ...state.listMultiComponent[dateRangeId].dateRangeOption,
        FromDate,
        ToDate,
      };

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dateRangeId]: {
            ...state.listMultiComponent[dateRangeId],
            dateRangeOption,
          },
        },
      };
    case CHANGE_TIME_RANGE:
      let isDailyView = false;
      if (action.payload.timeRange === Const.listTimeRangeByKey.Daily.key) {
        isDailyView = true;
      }

      const { timeRangeId } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [timeRangeId]: {
            ...state.listMultiComponent[timeRangeId],
            timeRangeFilter: action.payload.timeRange,
            dateRangeOption: action.payload.dateRangeOption,
            isDailyView: isDailyView,
          },
        },
      };

    case FETCH_LIST_PRICE_DATA:
      let { listData, dataTableId } = action.payload;
      [listPriceDataById, listPriceDataId] = appendId(listData);

      const { totalCount, pageSize } = action.payload;
      const totalPage = Math.ceil(totalCount / pageSize);
      const indexListAppend = listPriceDataId.length;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataTableId]: {
            ...state.listMultiComponent[dataTableId],
            listData,
            listPriceDataId,
            listPriceDataById,
            totalPage,
            indexListAppend,
            currenPageScroll: state.defaultCurrenPageScroll,
            totalCount,
          },
        },
      };

    case FETCH_INFO_TICKER:
      const { infoTicker } = action.payload;
      let indexSumary = {};
      let indexInfor = {};
      if (Object.keys(infoTicker).length) {
        indexSumary = infoTicker.priceInfo || {};
        indexInfor = infoTicker.bidAskInfo || {};
      }
      const { componentId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            indexSumary: { ...indexSumary },
            indexInfor: { ...indexInfor },
          },
        },
      };

    case CHANGE_CODE:
      const { isTicker } = action.payload;
      let tickerNameAndExchange = '';
      let exchange = '';

      if (isTicker) {
        if (action.payload.codeExchange === Const.listIndexName.vnIndex) {
          exchange = Const.listIndexExchange.hose;
        }
        if (action.payload.codeExchange === Const.listIndexName.hnIndex) {
          exchange = Const.listIndexExchange.hnx;
        }
        if (action.payload.codeExchange === Const.listIndexName.upcomIndex) {
          exchange = Const.listIndexExchange.upcom;
        }

        if (
          action.payload.codeExchange !== Const.listIndexName.vnIndex ||
          action.payload.codeExchange !== Const.listIndexName.hnIndex ||
          action.payload.codeExchange !== Const.listIndexName.upcomIndex
        ) {
          exchange = action.payload.codeExchange;
        }

        let customCompanyName =
          action.payload.codeName.length > 16
            ? `${action.payload.codeName.substring(0, 16)}...`
            : action.payload.codeName;
        tickerNameAndExchange = customCompanyName + ' / ' + exchange;
      }

      const { conditionId } = action.payload;

      const clone = {
        ...state.listMultiComponent,
        [conditionId]: {
          ...state.listMultiComponent[conditionId],
          currentSearch: {
            displayCode: action.payload.displayCode,
            code: action.payload.code,
            tickerNameAndExchange: tickerNameAndExchange,
          },
        },
      };

      return {
        ...state,
        listMultiComponent: clone,
      };

    case FETCH_LIST_SEARCH:
      const { listTicker, listIndex } = action.payload;
      const listDataSearch = [];
      if (listTicker && listIndex) {
        listTicker.forEach(item => {
          listDataSearch.push({
            displayCode: getDataFollowKeyByDot(item, Const.listTicker.TICKER),
            codeName: getDataFollowKeyByDot(
              item,
              Const.listTicker.ORGAN_SHORT_NAME,
            ),
            exchange: formatComGroupCode(
              getDataFollowKeyByDot(item, Const.listTicker.COM_GROUP_CODE),
            ),
            code: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_CODE),
            isTicker: true,
          });
        });

        listIndex.forEach(item => {
          listDataSearch.push({
            displayCode: getDataFollowKeyByDot(
              item,
              Const.listIndex.COM_GROUP_CODE,
            ),
            codeName: item[Const.listIndex.COM_GROUP_NAME]
              ? getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_NAME)
              : getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_CODE),
            exchange: formatComGroupCode(
              getDataFollowKeyByDot(
                item,
                Const.listIndex.PARENT_COM_GROUP_CODE,
              ),
            ),
            code: getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_CODE),
            isTicker: false,
          });
        });
      }
      return {
        ...state,
        listDataSearch,
      };

    case INIT_COMPONENT:
      const dataId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            isDailyView: true,
            isFetching: false,
            listDataSearch: [],
            currentSearch: {
              code: 'VNINDEX',
              displayCode: 'VNINDEX',
              tickerNameAndExchange: 'Hoa Phat Group / HOSE',
            },
            indexSumary: {},
            indexInfor: {},
            indexSumaryRealTime: {},
            indexInforRealTime: {},
            timeRangeFilter: Const.defaultTimeRange,
            totalPage: 0,
            indexListAppend: 0,
            currenPageScroll: 1,
            dateRangeOption: {
              FromDate: null,
              ToDate: null,
            },
            listData: [],
            totalCount: 0,
          },
        },
      };

    case UNMOUNT_COMPONENT:
      const delId = action.payload.id;
      const cloneListComponent = { ...state.listMultiComponent };
      const { [delId]: _, ...withoutDeleteKey } = cloneListComponent;
      return {
        ...state,
        listMultiComponent: withoutDeleteKey,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [action.payload.id]: {
            ...state.listMultiComponent[action.payload.id],
            component: action.payload,
          },
        },
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
