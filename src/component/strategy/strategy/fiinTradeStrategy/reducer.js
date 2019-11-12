import strategyService from '../../../../core/services/Strategy/StrategyService';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import Const from './Const';
import { keyBy } from 'lodash';
import moment from 'moment';

// ================================================== CONSTANTS ========================================================
const REDUCER_NAME = 'FIINTRADE_STRATEGY';
const FETCH_OVERVIEW = `${REDUCER_NAME}FETCH_OVERVIEW`;
const FETCH_VALUE = `${REDUCER_NAME}FETCH_VALUE`;
const SET_TYPE_RANKING = `${REDUCER_NAME}SET_TYPE_RANKING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

// =================================================== EXPORT ==========================================================
export {
  REDUCER_NAME,
  reducer as default,
  fetchOverview,
  fetchValue,
  setTypeRanking,
};

// =================================================== ACTIONS =========================================================
//==========Start OverView======
function fetchOverview(params) {
  return dispatch => {
    strategyService.fetchOverview(params).then(response => {
      const { items: listData = [] } = response ? response.items : [];
      console.log(response.items, 'asdasdasdasd');
      dispatch({
        type: FETCH_OVERVIEW,
        payload: {
          listData: response.items,
        },
      });
    });
  };
}
//==========End OverView======

//==========Start Value=======
function deduplicate(arr) {
  let isExist = (arr, x) => {
    for (let i = 0; i < arr.length; i++) {
      if (
        moment(arr[i].month).format('YYYY') === moment(x.month).format('YYYY')
      )
        return true;
    }
    return false;
  };

  let ans = [];
  arr.forEach(element => {
    if (!isExist(ans, element)) ans.push(element);
  });
  return ans;
}

function getTickValues(list) {
  list.sort(function(a, b) {
    return new Date(a.month) - new Date(b.month);
  });
  let ans = deduplicate(list);
  return ans;
}

function setTypeRanking(type) {
  return dispatch => {
    dispatch({
      type: SET_TYPE_RANKING,
      payload: {
        typeRanking: type,
      },
    });
  };
}

function fetchValue(params) {
  return dispatch => {
    strategyService.fetchValue(params).then(response => {
      const { items: listData = [] } = response ? response : [];
      const listTick = getTickValues(response.arrChart);
      console.log(listTick, 'listTick');
      dispatch({
        type: FETCH_VALUE,
        payload: {
          listData: response.table,
          listChart: response.arrChart,
          listTick,
          listDataRanking: response.tableRanking,
          listDataIndustry: response.listIndustry,
          listDataGroup: response.listGroup,
        },
      });
    });
  };
}

// ================================================== REDUCE ===========================================================
const initialState = {
  listOverview: [],
  listOverviewByTicker: {},
  listValue: [],
  listValueByIndex: {},
  listValueRanking: [],
  listValueRankingByTicker: {},
  listTickValue: [],
  listFormatTick: [],
  listChart: [],
  listIndustry: [],
  listGroup: [],
  typeRanking: 'industry',
  component: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OVERVIEW: {
      const { listData } = action.payload;
      const listOverview = listData.map(item =>
        getDataFollowKeyByDot(item, Const.organCode),
      );
      const listOverviewByTicker = keyBy(listData, Const.organCode);
      return {
        ...state,
        listOverview,
        listOverviewByTicker,
      };
    }
    case FETCH_VALUE: {
      const {
        listData,
        listChart,
        listTick,
        listDataRanking,
        listDataIndustry,
        listDataGroup,
      } = action.payload;
      const listTableNew = listData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      const listValue = listTableNew.map(item =>
        getDataFollowKeyByDot(item, Const.id),
      );
      const listValueByIndex = keyBy(listTableNew, Const.id);
      const listYear = listTick.map(item =>
        getDataFollowKeyByDot(item, Const.month),
      );
      const listValueRanking = listDataRanking.map(item =>
        getDataFollowKeyByDot(item, Const.ticker),
      );
      const listValueRankingByTicker = keyBy(listDataRanking, Const.ticker);

      const listIndustry = listDataIndustry;
      const listGroup = listDataGroup;
      console.log(listDataIndustry, 'listDataIndustry');
      return {
        ...state,
        listValue,
        listValueByIndex,
        listTickValue: listYear,
        listChart,
        listValueRanking,
        listValueRankingByTicker,
        listIndustry,
        listGroup,
      };
    }

    case SET_TYPE_RANKING: {
      const { typeRanking } = action.payload;
      return {
        ...state,
        typeRanking,
      };
    }

    case CHANGE_SIZE_COMPONENT: {
      return {
        ...state,
        component: action.payload,
      };
    }

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
