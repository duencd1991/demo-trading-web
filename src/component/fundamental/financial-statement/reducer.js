import masterService from '../../../core/services/Common/MasterService';
import snapShotService from '../../../core/services/Fundamental/SnapShotService';
import { checkIsBank, formatComGroupCode } from '../../helpers/Common';
import reducerRegistry from '../../helpers/ReducerRegistry';
import financialStatementService from '../../../core/services/Fundamental/FinancialStatementService';
import priceDatService from '../../../core/services/Prices/PriceData/PriceDataService';
import { DEFAULT_CODE, DEFAULT_CODE_NAME, DEFAULT_EXCHANGE } from './Const';
import {
  formatBalanceSheetData,
  formatCashFlowStatementData,
  formatIncomeStatementData,
} from './helper';

export const REDUCER_NAME = 'FUNDAMENTAL:FINANCIAL_STATEMENT';
const FETCH_BALANCE_SHEET_SUCCESS = `${REDUCER_NAME}_FETCH_BALANCE_SHEET_SUCCESS`;
const FETCH_LIST_SEARCH_SUCCESS = `${REDUCER_NAME}_FETCH_LIST_SEARCH_SUCCESS`;
const SET_CURRENT_SEARCH = `${REDUCER_NAME}_SET_CURRENT_SEARCH`;
const SET_BALANCE_SHEET_LOADING = `${REDUCER_NAME}_SET_BALANCE_SHEET_LOADING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const FETCH_LATEST_PRICE_SUCCESS = `${REDUCER_NAME}FETCH_LATEST_PRICE_SUCCESS`;

const FETCH_INCOME_STATEMENT_SUCCESS = `${REDUCER_NAME}_FETCH_INCOME_STATEMENT_SUCCESS`;
const SET_INCOME_STATEMENT_LOADING = `${REDUCER_NAME}_SET_INCOME_STATEMENT_LOADING`;

const FETCH_CASH_FLOW_STATEMENT_SUCCESS = `${REDUCER_NAME}_FETCH_CASH_FLOW_STATEMENT_SUCCESS`;
const SET_CASH_FLOW_STATEMENT_LOADING = `${REDUCER_NAME}_SET_CASH_FLOW_STATEMENT_LOADING`;

const SET_COMPONENT_DATA = `${REDUCER_NAME}_SET_COMPONENT_DATA`;
const UNMOUNT_COMPONENT = `${REDUCER_NAME}_UNMOUNT_COMPONENT`;

const FETCH_COMPANY_SCORE_SUCCESS = `${REDUCER_NAME}_FETCH_COMPANY_SCORE_SUCCESS`;

const isBanking = (getState, organCode) => {
  const ticker = getState()[REDUCER_NAME].listSearch.find(
    item => item.code === organCode,
  );

  return !!(ticker && checkIsBank(ticker.comTypeCode));
};

export const fetchCompanyScore = (params, id) => dispatch => {
  snapShotService.getCompanyScore(params).then(response => {
    dispatch({
      type: FETCH_COMPANY_SCORE_SUCCESS,
      payload: {
        id,
        score: response.items[0],
      },
    });
  });
};

export const fetchBalanceSheet = (params, id) => (dispatch, getState) => {
  dispatch(setBalanceSheetLoading(true, id));
  financialStatementService.getBalanceSheet(params).then(response => {
    dispatch(
      fetchBalanceSheetSuccess(
        response,
        id,
        isBanking(getState, params.OrganCode),
      ),
    );
  });
};

export const fetchListSearch = () => dispatch => {
  masterService.getListOrganization().then(({ items }) => {
    const listSearch = (items || []).map(item => ({
      displayCode: item.ticker,
      codeName: item.organShortName,
      exchange: formatComGroupCode(item.comGroupCode),
      code: item.organCode,
      isTicker: true,
      comTypeCode: item.comTypeCode,
    }));
    dispatch({
      type: FETCH_LIST_SEARCH_SUCCESS,
      payload: listSearch,
    });
  });
};

export const fetchBalanceSheetSuccess = (payload, id, isBanking) => ({
  type: FETCH_BALANCE_SHEET_SUCCESS,
  payload: {
    id,
    isBanking,
    data: payload,
  },
});

export const fetchLatestPrice = (params, id) => dispatch => {
  priceDatService.getLatestPrice(params).then(response => {
    const price = Array.isArray(response.items)
      ? response.items[0]
      : { priceInfo: {} };

    dispatch(fetchLatestPriceSuccess(price, id));
  });
};

export const fetchLatestPriceSuccess = (price, id) => ({
  type: FETCH_LATEST_PRICE_SUCCESS,
  payload: {
    id,
    price: price.priceInfo,
  },
});

export const fetchIncomeStatement = (params, id) => (dispatch, getState) => {
  dispatch(setIncomeStatementLoading(true, id));
  financialStatementService.getIncomeStatement(params).then(response => {
    dispatch({
      type: FETCH_INCOME_STATEMENT_SUCCESS,
      payload: {
        id,
        data: response,
        isBanking: isBanking(getState, params.OrganCode),
      },
    });
  });
};

export const setIncomeStatementLoading = (bool, id) => ({
  type: SET_INCOME_STATEMENT_LOADING,
  payload: {
    isLoading: bool,
    id,
  },
});

export const setCurrentSearch = (payload, id) => ({
  type: SET_CURRENT_SEARCH,
  payload: {
    id,
    data: payload,
  },
});

export const setBalanceSheetLoading = (bool, id) => ({
  type: SET_BALANCE_SHEET_LOADING,
  payload: {
    id,
    isLoading: bool,
  },
});

export const fetchCashFlowStatement = (params, id) => (dispatch, getState) => {
  dispatch(setCashFlowStatementLoading(true, id));
  financialStatementService.getCashFlowStatement(params).then(response => {
    dispatch({
      type: FETCH_CASH_FLOW_STATEMENT_SUCCESS,
      payload: {
        id,
        data: response,
        isBanking: isBanking(getState, params.OrganCode),
      },
    });
  });
};

export const setCashFlowStatementLoading = (bool, id) => ({
  type: SET_CASH_FLOW_STATEMENT_LOADING,
  payload: {
    isLoading: bool,
    id,
  },
});

export const setComponentData = id => ({
  type: SET_COMPONENT_DATA,
  payload: id,
});

export const unmountComponent = id => ({
  type: UNMOUNT_COMPONENT,
  payload: id,
});

const initialData = {
  isLoading: true,
  data: {
    quarterly: {
      ids: [],
      dataByIds: {},
      fields: [],
    },
    yearly: {
      ids: [],
      dataByIds: {},
      fields: [],
    },
    isBanking: false,
  },
};

const initComponentData = {
  currentSearch: {
    code: DEFAULT_CODE,
    displayCode: DEFAULT_CODE,
    codeName: DEFAULT_CODE_NAME,
    exchange: DEFAULT_EXCHANGE,
  },
  score: {},
  balanceSheet: initialData,
  cashFlowStatement: initialData,
  incomeStatement: initialData,
  latestPrice: {},
};

const initialState = {
  listSearch: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE_SHEET_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          balanceSheet: {
            ...state[action.payload.id].balanceSheet,
            isLoading: false,
            data: formatBalanceSheetData(
              action.payload.data.items ? action.payload.data.items[0] : [],
              action.payload.isBanking,
            ),
          },
        },
      };
    case SET_BALANCE_SHEET_LOADING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          balanceSheet: {
            ...state[action.payload.id].balanceSheet,
            isLoading: action.payload.isLoading,
          },
        },
      };
    case FETCH_INCOME_STATEMENT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          incomeStatement: {
            ...state[action.payload.id].incomeStatement,
            isLoading: false,
            data: formatIncomeStatementData(
              action.payload.data.items[0],
              action.payload.isBanking,
            ),
          },
        },
      };
    case FETCH_CASH_FLOW_STATEMENT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          cashFlowStatement: {
            ...state[action.payload.id].cashFlowStatement,
            isLoading: false,
            data: formatCashFlowStatementData(
              action.payload.data.items[0],
              action.payload.isBanking,
            ),
          },
        },
      };
    case SET_INCOME_STATEMENT_LOADING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          incomeStatement: {
            ...state[action.payload.id].incomeStatement,
            isLoading: action.payload.isLoading,
          },
        },
      };
    case SET_CASH_FLOW_STATEMENT_LOADING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          cashFlowStatement: {
            ...state[action.payload.id].cashFlowStatement,
            isLoading: action.payload.isLoading,
          },
        },
      };
    case FETCH_LIST_SEARCH_SUCCESS:
      return {
        ...state,
        listSearch: action.payload,
      };
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          currentSearch: action.payload.data,
        },
      };
    case CHANGE_SIZE_COMPONENT:
      const { width, height, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...(state[id] || {}),
          size: {
            width,
            height,
          },
        },
      };
    case FETCH_LATEST_PRICE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          latestPrice: action.payload.price,
        },
      };
    case FETCH_COMPANY_SCORE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          score: action.payload.score,
        },
      };
    case SET_COMPONENT_DATA:
      return {
        ...state,
        [action.payload]: {
          ...initComponentData,
          ...(state[action.payload] || {}),
        },
      };
    case UNMOUNT_COMPONENT:
      const { [action.payload]: _, ...rest } = state;

      return rest;
    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
