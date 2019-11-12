import masterService from '../../../core/services/Common/MasterService';
import consensusAnalysisService from '../../../core/services/Fundamental/ConsensusAnalysisService';
import snapShotService from '../../../core/services/Fundamental/SnapShotService';
import priceDatService from '../../../core/services/Prices/PriceData/PriceDataService';
import { formatComGroupCode } from '../../helpers/Common';
import reducerRegistry from '../../helpers/ReducerRegistry';
import { DEFAULT_CODE, DEFAULT_CODE_NAME, DEFAULT_EXCHANGE } from './Const';

export const REDUCER_NAME = 'FUNDAMENTAL:CONSENSUS_ANALYSIS';

export const INIT_COMPONENT = `${REDUCER_NAME}_INIT_COMPONENT`;

export const UNMOUNT_COMPONENT = `${REDUCER_NAME}_UNMOUNT_COMPONENT`;

const FETCH_LIST_SEARCH_SUCCESS = `${REDUCER_NAME}_FETCH_LIST_SEARCH_SUCCESS`;

const FETCH_LATEST_PRICE_SUCCESS = `${REDUCER_NAME}_FETCH_LATEST_PRICE_SUCCESS`;

export const FETCH_DATA_SUCCESS = `${REDUCER_NAME}_FETCH_DATA_SUCCESS`;

const SET_CURRENT_SEARCH = `${REDUCER_NAME}_SET_CURRENT_SEARCH`;

const FETCH_COMPANY_SCORE_SUCCESS = `${REDUCER_NAME}_FETCH_COMPANY_SCORE_SUCCESS`;

const SET_LOADING = `${REDUCER_NAME}_SET_LOADING`;

export const initComponent = (id) => ({
  payload: id,
  type: INIT_COMPONENT,
});

export const unmountComponent = (id) => ({
  payload: id,
  type: UNMOUNT_COMPONENT,
});

export const setLoading = (id, bool = true) => ({
  type: SET_LOADING,
  payload: {
    id,
    isLoading: bool,
  }
});

export const fetchListSearch = () => dispatch => {
  masterService.getListOrganization().then(response => {
    const listSearch = response.items.map(item => ({
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

export const fetchLatestPrice = (params, id) => dispatch => {
  priceDatService.getLatestPrice(params).then(response => {
    const price = Array.isArray(response.items) ? response.items[0] : { priceInfo: {} };
    dispatch(fetchLatestPriceSuccess(price, id));
  });
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

export const fetchLatestPriceSuccess = (price, id) => ({
  type: FETCH_LATEST_PRICE_SUCCESS,
  payload: {
    id,
    price: price.priceInfo,
  },
});

export const fetchData = (params, id) => dispatch => {
  dispatch(setLoading(id));
  consensusAnalysisService.getConsensus(params).then(response => {
    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: {
        id,
        data: response.items && response.items[0] ? response.items[0] : [],
      },
    });
  });
};

export const setCurrentSearch = (payload, id) => ({
  type: SET_CURRENT_SEARCH,
  payload: {
    id,
    data: payload,
  },
});

const initialState = {
  listSearch: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_COMPONENT:
      return {
        ...state,
        [action.payload]: {
          currentSearch: {
            code: DEFAULT_CODE,
            displayCode: DEFAULT_CODE,
            codeName: DEFAULT_CODE_NAME,
            exchange: DEFAULT_EXCHANGE,
          },
          latestPrice: {},
          isLoading: true,
        }
      };
    case UNMOUNT_COMPONENT:
      const { [action.payload]: _, ...rest } = state;

      return rest;
    case FETCH_LIST_SEARCH_SUCCESS:
      return {
        ...state,
        listSearch: action.payload,
      };
    case FETCH_LATEST_PRICE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          latestPrice: action.payload.price,
        }
      };

    case FETCH_COMPANY_SCORE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          score: action.payload.score,
        }
      };
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          currentSearch: action.payload.data,
        }
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload.data,
          isLoading: false,
        }
      };
    case SET_LOADING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isLoading: true,
        }
      };
    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
