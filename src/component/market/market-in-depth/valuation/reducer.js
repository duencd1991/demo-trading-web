import valuationService from '../../../../core/services/Market/MarketInDepth/ValuationService';
import Const from './Const';
import masterService from '../../../../core/services/Common/MasterService';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import _ from 'lodash';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import moment from 'moment';
import { formatData } from './../../../helpers/Api';

const REDUCER_NAME = 'MARKET_IN_DEPTH:VALUATION:';
const FETCH_LIST_CHART = `${REDUCER_NAME}FETCH_LIST_CHART`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;
const CHANGE_RATE = `${REDUCER_NAME}CHANGE_RATE`;
const CHANGE_COM_GROUP_CODE = `${REDUCER_NAME}CHANGE_COM_GROUP_CODE`;
const FETCH_LIST_INDUSTRY = `${REDUCER_NAME}FETCH_LIST_INDUSTRY`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const CHANGE_DATE = `${REDUCER_NAME}CHANGE_DATE`;

export {
  reducer as default,
  REDUCER_NAME,
  fetchListChart,
  changeTimeRange,
  changeComGroupCode,
  changeRate,
  fetchListIndustry,
  changeDate,
};

function fetchListChart(startDate, endDate) {
  return (dispatch, getState) => {
    dispatch(setFetching(true));

    valuationService
      .getValuationSeries({
        Code: getState()[REDUCER_NAME].comGroupCode,
        TimeRange: getState()[REDUCER_NAME].timeRange,
        FromDate: startDate ? startDate.format('YYYY-MM-DD') : null,
        ToDate: endDate ? endDate.format('YYYY-MM-DD') : null,
      })
      .then(response => {
        const items = formatData(response);
        dispatch({
          type: FETCH_LIST_CHART,
          payload: {
            listData: items,
          },
        });
        dispatch(setFetching(false));
      });
  };
}

function changeTimeRange(timeRange) {
  return dispatch => {
    dispatch({
      type: CHANGE_TIME_RANGE,
      payload: {
        timeRange,
      },
    });
    dispatch(fetchListChart());
  };
}

function changeComGroupCode(comGroupCode) {
  return dispatch => {
    dispatch({
      type: CHANGE_COM_GROUP_CODE,
      payload: {
        comGroupCode,
      },
    });
    dispatch(fetchListChart());
  };
}

function changeRate(rate) {
  return {
    type: CHANGE_RATE,
    payload: {
      rate,
    },
  };
}

function fetchListIndustry() {
  return dispatch => {
    masterService.getAllIcbIndustry().then(response => {
      const items = formatData(response);

      dispatch({
        type: FETCH_LIST_INDUSTRY,
        payload: {
          items,
        },
      });
    });
  };
}

function setFetching(isFetching = false) {
  return {
    type: SET_FETCHING,
    payload: {
      isFetching,
    },
  };
}

function changeDate(startDate, endDate) {
  return dispatch => {
    dispatch({
      type: CHANGE_DATE,
      payload: {
        startDate,
        endDate,
      },
    });
    dispatch(fetchListChart(startDate, endDate));
  };
}

const initialState = {
  listDataChart: [],
  comGroupCode: Const.defaultComGroupCode,
  rate: Const.defaultRate,
  timeRange: Const.defaultTimeRange,
  startDate: moment().subtract(1, 'days'),
  endDate: moment(),

  listCodeIndustry: [], // icb(icb_level = 3) + index
  listIndustryByKey: {},

  isFetching: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_CHART:
      const listDataChart = action.payload.listData;

      return {
        ...state,
        listDataChart,
      };

    case CHANGE_TIME_RANGE:
      const { timeRange } = action.payload;

      return {
        ...state,
        timeRange,
      };

    case CHANGE_RATE:
      const { rate } = action.payload;

      return {
        ...state,
        rate,
      };

    case CHANGE_COM_GROUP_CODE:
      const { comGroupCode } = action.payload;

      return {
        ...state,
        comGroupCode,
      };

    case FETCH_LIST_INDUSTRY:
      const { items } = action.payload;

      const listIndustry = items.filter(
        item => item.icbLevel === Const.icbLevel,
      );
      const listCodeIndustry = listIndustry.map(item =>
        getDataFollowKeyByDot(item, Const.listColumnIndustry.ICB_CODE),
      );
      const listIndustryByKey = _.keyBy(
        listIndustry,
        Const.listColumnIndustry.ICB_CODE,
      );

      return {
        ...state,
        listCodeIndustry,
        listIndustryByKey,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };

    case CHANGE_DATE:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
