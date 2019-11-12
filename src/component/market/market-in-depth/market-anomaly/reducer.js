import marketAnomalyService from '../../../../core/services/Market/MarketInDepth/MarketAnomalyService';
import masterService from './../../../../core/services/Common/MasterService';
import Const from './Const';
import _ from 'lodash';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import reducerRegistry from '../../../helpers/ReducerRegistry';

const REDUCER_NAME = 'MARKET_IN_DEPTH:MARKET_ANOMALY:';
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const TOGGLE_CHART_AND_TABLE = `${REDUCER_NAME}TOGGLE_CHART_AND_TABLE`;
const FETCH_LIST_DATA = `${REDUCER_NAME}FETCH_LIST_DATA`;
const CHANGE_FILTER_DATE_TIME = `${REDUCER_NAME}CHANGE_FILTER_DATE_TIME`;
const CHANGE_FILTER_YEAR = `${REDUCER_NAME}CHANGE_FILTER_YEAR`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  REDUCER_NAME,
  reducer as default,
  fetchData,
  changeFilterDatetime,
  fetchListDataTable,
  toggleChartAndTable,
  changeFilterYear,
  fetchListSearch,
  changeCode,
};

function fetchData() {
  return dispatch => {
    marketAnomalyService.getMarketAnomalyData().then(response => {
      dispatch({
        type: FETCH_DATA,
        payload: {
          listData: response,
        },
      });

      window.dispatchEvent(new Event('resize'));
    });
  };
}

function fetchListDataTable() {
  return (dispatch, getState) => {
    const organCode = getState()[REDUCER_NAME].currentSearch.organCode;
    const timeRange = getState()[REDUCER_NAME].currentYear;

    marketAnomalyService
      .getListAnomaly({ Code: organCode, TimeRange: timeRange })
      .then(response => {
        const items = response.items || [];
        const listDataTable = items.length > 0 ? items[0].anomalyItems : [];

        // can ignore anomalyItems in items[0]
        const indexData = items.length > 0 ? items[0] : {};

        dispatch({
          type: FETCH_LIST_DATA,
          payload: {
            listDataTable,
            indexData,
          },
        });
      });
  };
}

function toggleChartAndTable(isTable) {
  return {
    type: TOGGLE_CHART_AND_TABLE,
    payload: {
      isTable,
    },
  };
}

function changeFilterDatetime(key) {
  return {
    type: CHANGE_FILTER_DATE_TIME,
    payload: {
      key,
    },
  };
}

function changeFilterYear(key) {
  return dispatch => {
    dispatch({
      type: CHANGE_FILTER_YEAR,
      payload: {
        key,
      },
    });
    dispatch(fetchListDataTable());
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

function changeCode(data) {
  return dispatch => {
    dispatch({
      type: CHANGE_CODE,
      payload: {
        currentSearch: {
          ticker: data.ticker,
          organCode: data.organCode,
          codeName: data.codeName,
          codeExchange: data.exchange,
          isTicker: data.isTicker,
        },
      },
    });
    dispatch(fetchListDataTable());
  };
}

function formatComGroupCode(comGroupCode) {
  let formatComGroupCode = comGroupCode;
  switch (comGroupCode) {
    case Const.listIndexName.vnIndex:
      formatComGroupCode = Const.listIndexExchange.hose;
      break;
    case Const.listIndexName.hnIndex:
      formatComGroupCode = Const.listIndexExchange.hnx;
      break;
    case Const.listIndexName.upcomIndex:
      formatComGroupCode = Const.listIndexExchange.upcom;
      break;

    default:
      break;
  }
  return formatComGroupCode;
}

const initialState = {
  listData: [],
  averageData: [],
  listYearTable: [],
  listDataTableByYear: {},
  indexData: {},
  isTable: false, // false is chart
  currentFilterDatetime: Const.listFilterDateTimeByKey.day.key,
  currentYear: Const.listFilterYearByKey.FiveYears.key,
  currentSearch: {
    ticker: Const.defaultCode,
    organCode: Const.defaultCode,
  },
  listDataSearch: [],
  tickerNameAndExchange: '',
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      const listData = action.payload.listData;
      return { ...globalState, listData };

    case FETCH_LIST_DATA:
      const { listDataTable } = action.payload;

      const yearAverageFromServer = listDataTable.find(
        data => data[Const.listColumn.YEAR] === Const.yearAverageFromServer,
      );
      if (yearAverageFromServer) {
        yearAverageFromServer[Const.listColumn.YEAR] = Const.average;
        listDataTable.shift();
        listDataTable.push(yearAverageFromServer);
      }

      const listYearTable = listDataTable.map(item =>
        getDataFollowKeyByDot(item, Const.listColumn.YEAR),
      );

      const listDataTableByYear = _.keyBy(listDataTable, Const.listColumn.YEAR);
      const averageData = { ...listDataTable[listDataTable.length - 1] };

      return {
        ...globalState,
        listYearTable,
        listDataTableByYear,
        indexData: action.payload.indexData,
        averageData,
      };

    case CHANGE_FILTER_DATE_TIME:
      return {
        ...globalState,
        currentFilterDatetime: action.payload.key,
      };

    case TOGGLE_CHART_AND_TABLE:
      const { isTable } = action.payload;

      return {
        ...globalState,
        isTable,
      };

    case CHANGE_FILTER_YEAR:
      return {
        ...globalState,
        currentYear: action.payload.key,
      };

    case CHANGE_CODE:
      const { isTicker, codeName, codeExchange } = action.payload.currentSearch;

      let tickerNameAndExchange = '';
      let exchange = '';
      if (isTicker) {
        if (codeExchange === Const.listIndexName.vnIndex) {
          exchange = Const.listIndexExchange.hose;
        }
        if (codeExchange === Const.listIndexName.hnIndex) {
          exchange = Const.listIndexExchange.hnx;
        }
        if (codeExchange === Const.listIndexName.upcomIndex) {
          exchange = Const.listIndexExchange.upcom;
        }

        if (
          codeExchange !== Const.listIndexName.vnIndex ||
          codeExchange !== Const.listIndexName.hnIndex ||
          codeExchange !== Const.listIndexName.upcomIndex
        ) {
          exchange = codeExchange;
        }

        let customCodeName =
          codeName.length > 16 ? `${codeName.substring(0, 16)}...` : codeName;
        tickerNameAndExchange = customCodeName + ' / ' + exchange;
      }

      return {
        ...globalState,
        currentSearch: action.payload.currentSearch,
        tickerNameAndExchange: tickerNameAndExchange,
      };

    case FETCH_LIST_SEARCH:
      const { listTicker, listIndex } = action.payload;
      const listDataSearch = [];

      listTicker.forEach(item => {
        listDataSearch.push({
          ticker: getDataFollowKeyByDot(item, Const.listTicker.TICKER),
          organCode: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_CODE),
          codeName: getDataFollowKeyByDot(
            item,
            Const.listTicker.ORGAN_SHORT_NAME,
          ),
          exchange: formatComGroupCode(
            getDataFollowKeyByDot(item, Const.listTicker.COM_GROUP_CODE),
          ),
          isTicker: true,
        });
      });

      listIndex.forEach(item => {
        //const organCode = getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_CODE);
        listDataSearch.push({
          ticker: getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_CODE),
          organCode: getDataFollowKeyByDot(
            item,
            Const.listIndex.COM_GROUP_CODE,
          ),
          codeName: getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_NAME),
          exchange: formatComGroupCode(
            getDataFollowKeyByDot(item, Const.listIndex.PARENT_COM_GROUP_CODE),
          ),
          isTicker: false,
        });
      });

      return {
        ...globalState,
        listDataSearch,
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
