import _ from 'lodash';
import reducerRegistry from '../../helpers/ReducerRegistry';
import Interval from '../../helpers/IntervalCallApi';
import Const from './Const';
import alertSystemService from '../../../core/services/Tools/Alerts/AlertSystemService';
import { getDataFollowKeyByDot } from '../../helpers/Common';
import { getLanguage } from '../../helpers/Language';
//TODO import ConstCondition from './common/Const';

const REDUCER_NAME = 'TOOL_ALERT';
const FETCH_LOAD_LIST_ALERT_SYSTEM = `${REDUCER_NAME}FETCH_LOAD_LIST_ALERT_SYSTEM`;
const CHANGE_ALERT_SYSTEM_LIST = `${REDUCER_NAME}CHANGE_ALERT_SYSTEM_LIST`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const LOAD_MORE_ALERT_SYSTEM = `${REDUCER_NAME}LOAD_MORE_ALERT_SYSTEM`;
const SEARCH_ALERT_SYSTEM = `${REDUCER_NAME}SEARCH_ALERT_SYSTEM`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const FETCH_DATA_CHART = `${REDUCER_NAME}FETCH_DATA_CHART`;
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;
const CHANGE_ACTIVE = `${REDUCER_NAME}CHANGE_ACTIVE`;
const CHANGE_CONDITION_TYPE = `${REDUCER_NAME}CHANGE_CONDITION_TYPE`;
const TOOGLE_EDIT_SETTING = `${REDUCER_NAME}TOOGLE_EDIT_SETTING`;
const GET_ITEM_SEARCH = `${REDUCER_NAME}GET_ITEM_SEARCH`;
const SET_LOADING_SETTING = `${REDUCER_NAME}SET_LOADING_SETTING`;
const FETCH_LIST_PERSONAL_ALERT_TYPES = `${REDUCER_NAME}FETCH_LIST_PERSONAL_ALERT_TYPES`;
const ADD_PERSONAL_ALERT = `${REDUCER_NAME}ADD_PERSONAL_ALERT`;
export {
  REDUCER_NAME,
  reducer as default,
  fetchAlertSystem,
  loadMoreAlertSystem,
  fetchChartImage,
  changeTabContent,
  toogleActive,
  changeConditionType,
  toogleEditSetting,
  clickItemSearch,
  fetchListPersonalAlertTypes,
  addPersonalAlert,
};

const initialState = {
  listTickerAlertSystem: [],
  listAlertSystemByTicker: {},
  code: Const.defaultCode,
  indexData: {},
  id: '',
  featureType: Const.defaultOption,
  isLoading: false,
  isLoadingSetting: false,
  alertSystemId: 0,
  totalPage: 10,
  checkFlag: 0,
  firstPage: 0,
  listConditionsByKey: {},
  listConditionIds: [],
  listCriteriaByKey: {},
  listCriteriasId: [],
  listAlertSystemLoadMore: [],
  lstTickerLoadMoreByTicker: {},
  listAlertGroups: [],
  component: {},
  conditionType: null,
  criteriaType: null,
  currentTab: 1,
  currentItemSearch: {},
  page: 1,
  images: {},
  isShowPopupSetting: false,
  isShowEditSetting: false,
  organCode: '',
};
const toogleActive = payload => ({ type: CHANGE_ACTIVE, payload });
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
function toogleEditSetting(param) {
  return dispatch => {
    dispatch({
      type: TOOGLE_EDIT_SETTING,
      payload: !param,
    });
  };
}
function addPersonalAlert() {
  return (dispatch, getState) => {
    const store = getState();
    const criteriaType = store[REDUCER_NAME].criteriaType;
    let currentItemSearch = store[REDUCER_NAME].currentItemSearch;
    let organCode = currentItemSearch ? currentItemSearch.organCode : '';
    const param = {
      alertCode: criteriaType,
      organCode: organCode,
    };
    //dispatch(setLoadingPopupSetting(true));
    alertSystemService.addPersonalAlert(param).then(response => {
      // dispatch(setLoadingPopupSetting(false));
      const { items } = response;
      dispatch({
        type: ADD_PERSONAL_ALERT,
        payload: {
          items: items,
        },
      });
    });
  };
}
function fetchListPersonalAlertTypes() {
  return (dispatch, globalState) => {
    // dispatch(setLoadingPopupSetting(true));
    alertSystemService.getPersonalAlertTypes('').then(response => {
      // dispatch(setLoadingPopupSetting(false));
      const { items } = response;
      dispatch({
        type: FETCH_LIST_PERSONAL_ALERT_TYPES,
        payload: {
          listPersonalAlertTypes: items && items.length ? items : [],
        },
      });
    });
  };
}
function fetchAlertSystem(organCode) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const formatParams = formatedParams({ OrganCode: organCode });
    alertSystemService.getNotificationList(formatParams).then(response => {
      const { items = [] } = response === null ? [] : response;
      const { totalCount = 0 } = response === null ? 0 : response;
      const totalPage = calcTotalPage(totalCount);
      dispatch({
        type: FETCH_LOAD_LIST_ALERT_SYSTEM,
        payload: {
          listAlertSystem: items,
          totalPage,
        },
      });
      dispatch(setLoading(false));
    });
  };
}
//#region drop down condition
function changeConditionType(conditionType) {
  return (dispatch, getState) => {
    const store = getState();
    const listConditionsByKey = store[REDUCER_NAME].listConditionsByKey;
    const listConditionIds = store[REDUCER_NAME].listConditionIds;
    dispatch({
      type: CHANGE_CONDITION_TYPE,
      payload: {
        conditionType,
        listConditionsByKey,
        listConditionIds,
      },
    });
  };
}

//#endregion
//#region function util

function formatedParams(params) {
  params = params || {};
  const formatParams = {
    Page: params.Page || 1,
    PageSize: Const.pageSize,
  };
  if (params.OrganCode) formatParams.OrganCode = params.OrganCode;

  return formatParams;
}
const calcTotalPage = totalCount => {
  const totalPage = Math.ceil(totalCount / Const.pageSize);
  return totalPage || 0;
};
//#endregion
function setLoadingPopupSetting(isLoadingSetting) {
  return dispatch => {
    dispatch({
      type: SET_LOADING_SETTING,
      payload: isLoadingSetting,
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
function clickItemSearch(item) {
  const currentItemSearch = item || {};
  const organCode = item ? item.organCode || '' : '';
  return {
    type: GET_ITEM_SEARCH,
    payload: {
      organCode,
      currentItemSearch,
    },
  };
}
function loadMoreAlertSystem(params) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const store = getState();
    const listTickerAlertSystem = store[REDUCER_NAME].listTickerAlertSystem;
    const formatParams = formatedParams(params);
    const page = formatParams.Page;
    const alertSystemId = params.alertSystemId;
    alertSystemService.getNotificationList(formatParams).then(response => {
      const { items = [] } = response === null ? [] : response;
      const { totalCount = 0 } = response === null ? 0 : response;
      const totalPage = calcTotalPage(totalCount);
      dispatch({
        type: LOAD_MORE_ALERT_SYSTEM,
        payload: {
          listAlertSystemLoadMore: items || [],
          alertSystemId,
          listTickerAlertSystem,
          page,
          totalPage,
        },
      });
      dispatch(setLoading(false));
    });
  };
}

function fetchChartImage(organCode) {
  return dispatch => {
    alertSystemService
      .getAlertChartImage({ OrganCode: organCode })
      .then(response => {
        if (response && response.items) {
          dispatch({
            type: FETCH_DATA_CHART,
            payload: {
              images: response.items.length > 0 ? response.items[0] : '',
            },
          });
        }
      });
  };
}
const getListRemoveDuplicate = (lstTicker, listAlertSystemLoadMore) => {
  const lstDuplicate = _.filter(lstTicker, (val, i, iteratee) =>
    _.includes(iteratee, val, i + 1),
  );
  listAlertSystemLoadMore = _.filter(
    listAlertSystemLoadMore,
    el => !_.includes(lstDuplicate, el.notificationId),
  );
  const lstTickerLoadMoreByTicker = _.keyBy(
    listAlertSystemLoadMore,
    Const.idAlertSystem,
  );
  return lstTickerLoadMoreByTicker;
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOAD_LIST_ALERT_SYSTEM: {
      const { listAlertSystem, totalPage } = action.payload;

      const listAlertSystemByTicker = _.keyBy(
        listAlertSystem,
        Const.idAlertSystem,
      );
      const listTickerAlertSystem = listAlertSystem.map(item =>
        getDataFollowKeyByDot(item, Const.idAlertSystem),
      );
      return {
        ...state,
        listTickerAlertSystem,
        listAlertSystemByTicker,
        alertSystemId: _.last(listTickerAlertSystem),
        page: 1,
        totalPage,
      };
    }
    case LOAD_MORE_ALERT_SYSTEM: {
      let {
        listAlertSystemLoadMore,
        totalPage,
        listTickerAlertSystem,
        page,
      } = action.payload;
      const lstTickerLoadMore = listAlertSystemLoadMore.map(item =>
        getDataFollowKeyByDot(item, Const.idAlertSystem),
      );
      const lstTicker = [...listTickerAlertSystem, ...lstTickerLoadMore];
      const lstTickerLoadMoreByTicker = getListRemoveDuplicate(
        lstTicker,
        listAlertSystemLoadMore,
      );
      return {
        ...state,
        listTickerAlertSystem: _.uniq(lstTicker),

        listAlertSystemByTicker: {
          ...state.listAlertSystemByTicker,
          ...lstTickerLoadMoreByTicker,
        },
        alertSystemId: _.last(lstTickerLoadMore),
        firstPage: 0,
        listAlertSystemLoadMore,
        page,
        totalPage,
      };
    }
    case FETCH_LIST_PERSONAL_ALERT_TYPES: {
      const { listPersonalAlertTypes } = action.payload;
      const listConditionIds = listPersonalAlertTypes.map(item =>
        getDataFollowKeyByDot(item, Const.personalAlertCode),
      );

      let listConditionsByKey = _.keyBy(
        listPersonalAlertTypes,
        Const.personalAlertCode,
      );
      return {
        ...state,
        listConditionsByKey: listConditionsByKey,
        listConditionIds: listConditionIds,
      };
    }
    case ADD_PERSONAL_ALERT: {
      return {
        ...state,
        items: action.payload,
        isShowEditSetting: false,
      };
    }
    case GET_ITEM_SEARCH: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case TOOGLE_EDIT_SETTING: {
      return {
        ...state,
        isShowEditSetting: action.payload,
      };
    }
    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case CHANGE_CONDITION_TYPE: {
      let {
        conditionType,
        listConditionsByKey,
        listConditionIds,
      } = action.payload;
      conditionType = conditionType || _.head(listConditionIds);
      let listCriteriaByKey = _.keyBy(
        listConditionsByKey[conditionType].alertDefinitions,
        Const.alertDefinitions,
      );
      let listCriteriasId = Object.keys(listCriteriaByKey);
      let criteriaType = _.head(listCriteriasId);
      return {
        ...state,
        conditionType,
        listCriteriaByKey: listCriteriaByKey,
        listCriteriasId: listCriteriasId,
        criteriaType,
      };
    }
    case CHANGE_ACTIVE:
      return action.payload;

    case CHANGE_TAB: {
      const { tab } = action.payload;
      return {
        ...state,
        organCode: '',
        currentTab: tab,
        isShowEditSetting: false,
      };
    }
    case CHANGE_ALERT_SYSTEM_LIST: {
      const featureType = action.payload.featureType;
      return { ...state, featureType };
    }
    case SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case SET_LOADING_SETTING: {
      return { ...state, isLoadingSetting: action.payload };
    }
    case FETCH_DATA: {
      return { ...state, isLoading: action.payload };
    }
    case FETCH_DATA_CHART: {
      return {
        ...state,
        images: action.payload,
      };
    }

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
