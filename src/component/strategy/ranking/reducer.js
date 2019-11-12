import _ from 'lodash';
import { getDataFollowKeyByDot } from '../../helpers/Common';
import { cloneDeep, keyBy } from 'lodash';
import reducerRegistry from '../../helpers/ReducerRegistry';
import rankingService from '../../../core/services/Strategy/RankingService';
import masterService from '../../../core/services/Common/MasterService';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../app/commonReducer';
import Const from './Const';
import Interval from '../../helpers/IntervalCallApi';
const REDUCER_NAME = 'ST_RANKING';
const FETCH_LOAD_LIST_RANKING = `${REDUCER_NAME}FETCH_LOAD_LIST_RANKING`;
const CHANGE_RANKING_LIST = `${REDUCER_NAME}CHANGE_RANKING_LIST`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const HOVER_ROW = `${REDUCER_NAME}HOVER_ROW`;
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;
const LOAD_MORE_RANKINGS = `${REDUCER_NAME}LOAD_MORE_RANKINGS`;
const LOAD_MORE_ALL_SCORE = `${REDUCER_NAME}LOAD_MORE_ALL_SCORE`;
const FETCH_LOAD_LIST_ALL_SCORE = `${REDUCER_NAME}FETCH_LOAD_LIST_ALL_SCORE`;
export {
  REDUCER_NAME,
  reducer as default,
  changeIndustryDropDown,
  cancelIntervalFetchRanking,
  intervalFetchRanking,
  changeIdHover,
  changeTabContent,
  loadMoreRanking,
  intervalFetchAllScore,
  loadMoreAllScore,
};

const initialState = {
  lstTickerIndustryDrop: [],
  lstTickerIndustryDropByTicker: [],
  listTickerRanking: [],
  listRankingLoadMore: [],
  listRankingByTicker: {},
  listTickerAllScore: [],
  listAllScoreLoadMore: [],
  listAllScoreByTicker: {},
  code: Const.defaultCode,
  indexData: {},
  id: '',
  currentDefaultIndex: '',
  listDefaultIndex: [],
  listDefaultIndexByKey: {},
  industryId: Const.industryId,
  industryType: Const.defaultOption,
  isLoading: false,
  RankingId: 0,
  totalPage: 10,
  checkFlag: 0,
  firstPage: 0,
  organCodeHover: '',
  currentTab: 1,
  component: {},
  page: 1,
};
function changeIndustryDropDown(value) {
  return dispatch => {
    dispatch({
      type: CHANGE_RANKING_LIST,
      payload: {
        industryId: value,
      },
    });
    dispatch(intervalFetchRanking(value));
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
function loadMoreRanking(params) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const store = getState();
    const listTickerRanking = store[REDUCER_NAME].listTickerRanking;
    const formatParams = formatedParams(params);
    const page = formatParams.Page;
    const rankingId = params.rankingId;
    rankingService.getDataRanking(formatParams).then(response => {
      let { items = [] } = response === null ? [] : response || [];
      const { totalCount = 0 } = response === null ? 0 : response || [];
      const totalPage = calcTotalPage(totalCount);
      fetchDataRanking(dispatch, getState, items);
      dispatch({
        type: LOAD_MORE_RANKINGS,
        payload: {
          listRankingLoadMore: items,
          rankingId,
          page,
          totalPage,
          listTickerRanking,
        },
      });
      dispatch(setLoading(false));
    });
  };
}
function fetchDataRanking(dispatch, getState, items) {
  const store = getState();
  const listFilterData = store[COMMON_REDUCER_NAME].listOrganizationSearch;
  items = _.map(items, item => {
    let itemDetail = _.filter(
      listFilterData,
      x => x.organCode === item.organCode,
    );
    if (!_.isEmpty(itemDetail)) {
      item.nameAndExchange = itemDetail[0].comGroupCode
        ? Const.lstExchange[itemDetail[0].comGroupCode.toUpperCase()]
        : '';
    }
    return item;
  });
}
function intervalFetchRanking(Code = Const.industryId) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const formatParams = formatedParams({ Code: Code });
    rankingService.getDataRanking(formatParams).then(response => {
      let { items = [] } = response === null ? [] : response || [];
      const { totalCount = 0 } = response === null ? 0 : response || [];
      const totalPage = calcTotalPage(totalCount);
      fetchDataRanking(dispatch, getState, items);
      dispatch({
        type: FETCH_LOAD_LIST_RANKING,
        payload: {
          listRanking: items,
          totalPage,
        },
      });
      dispatch(setLoading(false));
    });
  };
}

function loadMoreAllScore(params) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const store = getState();
    const listTickerAllScore = store[REDUCER_NAME].listTickerAllScore;
    const formatParams = formatedParams(params, false);
    const page = formatParams.Page;
    const scoreId = params.scoreId;
    rankingService.getAllScore(formatParams).then(response => {
      let { items = [] } = response === null ? [] : response || [];
      const { totalCount = 0 } = response === null ? 0 : response || [];
      const totalPage = calcTotalPage(totalCount);
      // fetchDataRanking(dispatch, getState, items);
      dispatch({
        type: LOAD_MORE_ALL_SCORE,
        payload: {
          listAllScoreLoadMore: items,
          scoreId,
          page,
          totalPage,
          listTickerAllScore,
        },
      });
      dispatch(setLoading(false));
    });
  };
}
function fetchDataAllScore(dispatch, getState, items) {
  const store = getState();
  const listFilterData = store[COMMON_REDUCER_NAME].listOrganizationSearch;
  items = _.map(items, item => {
    let itemDetail = _.filter(
      listFilterData,
      x => x.organCode === item.organCode,
    );
    if (!_.isEmpty(itemDetail)) {
      item.nameAndExchange = itemDetail[0].comGroupCode
        ? Const.lstExchange[itemDetail[0].comGroupCode.toUpperCase()]
        : '';
    }
    return item;
  });
}
function intervalFetchAllScore(Code = Const.industryId) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const formatParams = formatedParams({ Code: Code }, false);
    rankingService.getAllScore(formatParams).then(response => {
      let { items = [] } = response === null ? [] : response || [];
      const { totalCount = 0 } = response === null ? 0 : response || [];
      const totalPage = calcTotalPage(totalCount);
      items = items ? items : [];
      console.log(items, ' items');
      //fetchDataAllScore(dispatch, getState, items);
      dispatch({
        type: FETCH_LOAD_LIST_ALL_SCORE,
        payload: {
          listAllScore: items || [],
          totalPage,
        },
      });
      dispatch(setLoading(false));
    });
  };
}
function changeTabContent(currentTab) {
  const tab = currentTab;
  return dispatch => {
    dispatch({
      type: CHANGE_TAB,
      payload: {
        tab,
      },
    });
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
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOAD_LIST_RANKING: {
      const { listRanking } = action.payload;
      let id = 0;
      listRanking.map(items => {
        items.idRanking = id++;
      });
      const listRankingByTicker = keyBy(listRanking, Const.listColumn.ticker);
      const listTickerRanking = listRanking.map(item =>
        getDataFollowKeyByDot(item, Const.listColumn.ticker),
      );
      return {
        ...state,
        listTickerRanking,
        listRankingByTicker,
        RankingId: id,
        isLoading: false,
        page: 1,
      };
    }
    case LOAD_MORE_RANKINGS: {
      let {
        listRankingLoadMore,
        totalPage,
        listTickerRanking,
        page,
      } = action.payload;
      const lstTickerLoadMore = listRankingLoadMore.map(item =>
        getDataFollowKeyByDot(item, Const.listColumn.ticker),
      );
      const lstTicker = [...listTickerRanking, ...lstTickerLoadMore];
      const lstTickerLoadMoreByTicker = getListRemoveDuplicate(
        lstTicker,
        listRankingLoadMore,
        Const.listColumn.ticker,
      );
      return {
        ...state,
        listTickerRanking: _.uniq(lstTicker),

        listRankingByTicker: {
          ...state.listRankingByTicker,
          ...lstTickerLoadMoreByTicker,
        },
        rankingId: _.last(lstTickerLoadMore),
        firstPage: 0,
        listRankingLoadMore,
        page,
        totalPage,
      };
    }
    case LOAD_MORE_ALL_SCORE: {
      let {
        listAllScoreLoadMore,
        totalPage,
        listTickerAllScore,
        page,
      } = action.payload;
      const lstTickerLoadMore = listAllScoreLoadMore.map(item =>
        getDataFollowKeyByDot(item, Const.listColumn.ticker),
      );
      const lstTicker = [...listTickerAllScore, ...lstTickerLoadMore];
      const lstTickerLoadMoreByTicker = getListRemoveDuplicate(
        lstTicker,
        listAllScoreLoadMore,
        Const.listColumn.ticker,
      );
      return {
        ...state,
        listTickerRanking: _.uniq(lstTicker),

        listRankingByTicker: {
          ...state.listAllScoreByTicker,
          ...lstTickerLoadMoreByTicker,
        },
        rankingId: _.last(lstTickerLoadMore),
        firstPage: 0,
        listAllScoreLoadMore,
        page,
        totalPage,
      };
    }
    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case CHANGE_TAB: {
      const { tab } = action.payload;
      return {
        ...state,
        organCodeHover: '',
        currentTab: tab,
      };
    }

    case CHANGE_RANKING_LIST: {
      const { industryId } = action.payload;

      return {
        ...state,
        industryId,
        checkFlag: 2,
      };
    }
    case HOVER_ROW: {
      return {
        ...state,
        organCodeHover: action.payload.organCode,
      };
    }

    case SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case FETCH_DATA: {
      return { ...state, isLoading: action.payload };
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
const getListRemoveDuplicate = (lstTicker, listLoadMore, keyCol) => {
  const lstDuplicate = _.filter(lstTicker, (val, i, iteratee) =>
    _.includes(iteratee, val, i + 1),
  );
  listLoadMore = _.filter(
    listLoadMore,
    el => !_.includes(lstDuplicate, el.notificationId),
  );
  const listLoadMoreByTicker = _.keyBy(listLoadMore, keyCol);
  return listLoadMoreByTicker;
};
function cancelIntervalFetchRanking() {
  return () => {
    Interval.cancel('STRanking');
  };
}
function formatedParams(params, isRanking = true) {
  params = params || {};
  const formatParams = {
    Page: params.Page || 1,
    PageSize: Const.pageSize,
  };
  if (isRanking) {
    if (params.Code) formatParams.Code = params.Code;
  }

  return formatParams;
}
const calcTotalPage = totalCount => {
  const totalPage = Math.ceil(totalCount / Const.pageSize);
  return totalPage || 0;
};

reducerRegistry.register(REDUCER_NAME, reducer);
