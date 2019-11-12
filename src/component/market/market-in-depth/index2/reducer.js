import Const from './Const';
import indexService from '../../../../core/services/Market/MarketInDepth/IndexService';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import { executeRealtimeData } from './../../../helpers/Chart';
import request from './../../../helpers/Request';
import { formatData, getListIdAndListObjById } from './../../../helpers/Api';
import registerCancelTokenAxios from './../../../helpers/RegisterCancelTokenAxios';
import { cloneDeep } from 'lodash';

const REDUCER_NAME = 'MARKET_IN_DEPTH:INDEX:';
const CLICK_ROW_TABLE = `${REDUCER_NAME}CLICK_ROW_TABLE`;
const SUBSCRIBE_REALTIME_DATA = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA`;
const FETCH_LIST_TABLE = `${REDUCER_NAME}FETCH_LIST_TABLE`;
const FETCH_LIST_CHART = `${REDUCER_NAME}FETCH_LIST_CHART`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;

export {
  reducer as default,
  REDUCER_NAME,
  clickRowTable,
  subscribeRealtimeData,
  fetchListTable,
  fetchListChart,
  changeTimeRange,
  setLoading,
};

function clickRowTable(comGroupCode) {
  return dispatch => {
    dispatch(fetchListChart(comGroupCode));
    dispatch({
      type: CLICK_ROW_TABLE,
      payload: {
        comGroupCode,
      },
    });
  };
}

function fetchListTable(pageSize, status) {
  return dispatch => {
    indexService.getLatestIndices({ pageSize, status }).then(response => {
      const items = formatData(response);

      if (items.length > 0) {
        const {
          listId: listComGroupCodeTable,
          listObjById: listTableByComGroupCode,
        } = getListIdAndListObjById(
          items,
          Const.listColumnTable.COM_GROUP_CODE,
        );

        const { comGroupCode } = items[0];

        dispatch({
          type: FETCH_LIST_TABLE,
          payload: {
            listComGroupCodeTable,
            listTableByComGroupCode,
            comGroupCode,
          },
        });

        dispatch(fetchListChart(comGroupCode));
      }
    });
  };
}

function subscribeRealtimeData(data) {
  return {
    type: SUBSCRIBE_REALTIME_DATA,
    payload: {
      data,
    },
  };
}

function fetchListChart(comGroupCode, timeRange) {
  return (dispatch, getState) => {
    const newTimeRange = timeRange || getState()[REDUCER_NAME].timeRange;
    const newComGroupCode = comGroupCode || getState()[REDUCER_NAME].timeRange;

    dispatch(setLoading(true));
    registerCancelTokenAxios.delete(REDUCER_NAME);

    request.fetchApi(
      params => {
        const source = registerCancelTokenAxios.register(REDUCER_NAME);
        return indexService.getIndexSeries(
          {
            ComGroupCode: newComGroupCode,
            TimeRange: newTimeRange,
            ...params,
          },
          source,
        );
      },
      data => {
        dispatch(setLoading());
        dispatch({
          type: FETCH_LIST_CHART,
          payload: {
            listChart: data,
            timeRange: newTimeRange,
            comGroupCode: newComGroupCode,
          },
        });
      },
    );
  };
}

function changeTimeRange(timeRange) {
  return (dispatch, getState) => {
    dispatch(fetchListChart(getState()[REDUCER_NAME].comGroupCode, timeRange));
  };
}

function setLoading(isLoading = false) {
  return {
    type: SET_LOADING,
    payload: {
      isLoading,
    },
  };
}

const initialState = {
  comGroupCode: '',
  listComGroupCodeTable: [],
  listTableByComGroupCode: {},
  listChart: [],
  timeRange: Const.timeRange['1D'],
  isLoading: false,
  component: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
    case CLICK_ROW_TABLE:
    case FETCH_LIST_TABLE:
    case FETCH_LIST_CHART:
    case CHANGE_TIME_RANGE:
      return {
        ...state,
        ...action.payload,
      };

    case SUBSCRIBE_REALTIME_DATA:
      const { data } = action.payload;

      const listTableByComGroupCode = cloneDeep(state.listTableByComGroupCode);

      data.forEach(item => {
        if (listTableByComGroupCode[item.comGroupCode]) {
          listTableByComGroupCode[item.comGroupCode] = item;
        }
      });

      if (state.timeRange === Const.timeRange['1D']) {
        const listDataChart = executeRealtimeData(
          data,
          state,
          'comGroupCode',
          'listChart',
        );
        if (listDataChart) {
          return {
            ...state,
            listChart: listDataChart,
            listTableByComGroupCode,
          };
        }
      }

      return {
        ...state,
        listTableByComGroupCode,
      };

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
