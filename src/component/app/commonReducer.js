import masterService from '../../core/services/Common/MasterService';
import { formatData, getListIdAndListObjById } from './../helpers/Api';
import _ from 'lodash';

export const REDUCER_NAME = 'COMMON:';
const CHANGE_COUNT_COMPONENT = `${REDUCER_NAME}CHANGE_COUNT_COMPONENT`;
const GET_TIME_OFFSET_SUCCESS = `${REDUCER_NAME}GET_TIME_OFFSET_SUCCESS`;
const SET_TIME_TO_OPEN_MARKET = `${REDUCER_NAME}SET_TIME_TO_OPEN_MARKET`;
const SET_ORGANIZATION = `${REDUCER_NAME}SET_ORGANIZATION`;
const SET_COMPANY_GROUP = `${REDUCER_NAME}SET_COMPANY_GROUP`;
const SET_INDUSTRY = `${REDUCER_NAME}SET_INDUSTRY`;
const SET_DERIVATIVE = `${REDUCER_NAME}SET_DERIVATIVE`;
const SET_ECONOMY = `${REDUCER_NAME}SET_ECONOMY`;

export const changeCountComponent = (nameComponent, count) => {
  return {
    type: CHANGE_COUNT_COMPONENT,
    payload: {
      nameComponent,
      count,
    },
  };
};

export const getTimeOffset = () => dispatch => {
  masterService.getTimeOffset().then(diff => {
    dispatch({
      type: GET_TIME_OFFSET_SUCCESS,
      payload: diff,
    });
  });
};

export const countDownSecondsToOpenMarket = () => (dispatch, getState) => {
  if (getState()[REDUCER_NAME].secondsToOpenMarket === 0) {
    return;
  }
  const interval = setInterval(() => {
    const secondsToOpenMarket = getState()[REDUCER_NAME].secondsToOpenMarket;
    const seconds = secondsToOpenMarket - 1;
    if (seconds === 0) {
      clearInterval(interval);
    }
    dispatch({
      type: SET_TIME_TO_OPEN_MARKET,
      payload: seconds,
    });
  }, 1000);
};

const getSecondsToOpenMarket = () => {
  const startCountTime = new Date();
  startCountTime.setHours(8, 30, 0, 0);
  const openTime = new Date();
  openTime.setHours(8, 45, 0, 0);
  const now = new Date();

  if (now < startCountTime || now > openTime) {
    return 0;
  }

  return Math.ceil((openTime.getTime() - now.getTime()) / 1000);
};

export const fetchOrganization = () => dispatch => {
  masterService.getListOrganization().then(data => {
    const listOrganizationSearch = formatData(data);
    const { listId, listObjById } = getListIdAndListObjById(
      listOrganizationSearch,
      'organCode',
    );
    const { listId: _, listObjById: listObjByTicker } = getListIdAndListObjById(
      listOrganizationSearch,
      'ticker',
    );

    dispatch({
      type: SET_ORGANIZATION,
      payload: {
        listOrganizationSearch,
        listOrganCodeOrganization: listId,
        listOrganizationByOrganCode: listObjById,
        listOrganizationByTicker: listObjByTicker,
      },
    });
  });
};

export const fetchCompanyGroup = () => dispatch => {
  masterService.getAllCompanyGroup().then(data => {
    const listCompanyGroup = formatData(data);
    const { listId, listObjById } = getListIdAndListObjById(
      listCompanyGroup,
      'comGroupCode',
    );

    dispatch({
      type: SET_COMPANY_GROUP,
      payload: {
        listCompanyGroup,
        listComGroupCodeCompanyGroup: listId,
        listCompanyGroupByComGroupCode: listObjById,
      },
    });
  });
};

export const fetchIndustry = () => dispatch => {
  masterService.getAllIcbIndustry().then(data => {
    const listIndustry = formatDataIndustry(formatData(data));
    const listIndustryByIcbLevel = _.groupBy(formatData(data), 'icbLevel');
    const { listId, listObjById } = getListIdAndListObjById(
      listIndustry,
      'icbCode',
    );

    dispatch({
      type: SET_INDUSTRY,
      payload: {
        listIndustry,
        listIndustryByIcbLevel,
        listIcbCodeIndustry: listId,
        listIndustryByIcbCode: listObjById,
      },
    });
  });
};

export const fetchDerivative = () => dispatch => {
  masterService.getAllDerivatives().then(data => {
    const listDerivative = formatData(data);
    const { listId, listObjById } = getListIdAndListObjById(
      listDerivative,
      'derivativeCode',
    );

    dispatch({
      type: SET_DERIVATIVE,
      payload: {
        listDerivative,
        listDerivativeCodeDerivative: listId,
        listDerivativeByDerivativeCode: listObjById,
      },
    });
  });
};

export const fetchEconomy = () => dispatch => {
  masterService.getAllChartEconomy().then(data => {
    const listEconomy = formatData(data);
    const { listId, listObjById } = getListIdAndListObjById(
      listEconomy,
      'code',
    );

    dispatch({
      type: SET_ECONOMY,
      payload: {
        listEconomy,
        listEconomyCodeEconomy: listId,
        listEconomyByEconomyCode: listObjById,
      },
    });
  });
};

const initialState = {
  countListComponent: {},
  timeOffset: null,
  secondsToOpenMarket: getSecondsToOpenMarket(),

  listOrganCodeOrganization: [],
  listOrganizationSearch: [],
  listOrganizationByOrganCode: {},
  listOrganizationByTicker: {},

  listCompanyGroup: [],
  listComGroupCodeCompanyGroup: [],
  listCompanyGroupByComGroupCode: {},

  listIndustry: [],
  listIcbCodeIndustry: [],
  listIndustryByIcbCode: {},

  listDerivative: [],
  listDerivativeCodeDerivative: [],
  listDerivativeByDerivativeCode: {},

  listEconomy: [],
  listEconomyCodeEconomy: [],
  listEconomyByEconomyCode: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNT_COMPONENT:
      const { nameComponent, count } = action.payload;

      return {
        ...state,
        countListComponent: {
          ...state.countListComponent,
          [nameComponent]: state.countListComponent[nameComponent]
            ? state.countListComponent[nameComponent] + count
            : count,
        },
      };

    case GET_TIME_OFFSET_SUCCESS:
      return {
        ...state,
        timeOffset: action.payload,
      };
    case SET_TIME_TO_OPEN_MARKET:
      return {
        ...state,
        secondsToOpenMarket: action.payload,
      };
    case SET_ORGANIZATION:
    case SET_COMPANY_GROUP:
    case SET_INDUSTRY:
    case SET_DERIVATIVE:
    case SET_ECONOMY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

function formatDataIndustry(data, icbLevel = 3) {
  return data.filter(item => {
    return item.icbLevel === icbLevel;
  });
}
