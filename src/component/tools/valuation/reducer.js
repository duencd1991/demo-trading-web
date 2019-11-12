import reducerRegistry from '../../helpers/ReducerRegistry';
import masterService from './../../../core/services/Common/MasterService';
import {
  formatComGroupCode,
  getDataFollowKeyByDot,
} from './../../helpers/Common';
import priceDataService from './../../../core/services/Prices/PriceData/PriceDataService';
import snapShotService from '../../../core/services/Fundamental/SnapShotService';
import Const from './Const';

const REDUCER_NAME = 'VALUATION:';
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;
const FETCH_INFO_TICKER = `${REDUCER_NAME}FETCH_INFO_TICKER`;
const GET_COMPANY_SCORE = `${REDUCER_NAME}GET_COMPANY_SCORE`;
const CHANGE_YEAR_DROPDOW = `${REDUCER_NAME}CHANGE_YEAR_DROPDOW`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const CHANGE_AVERAGE_PE = `${REDUCER_NAME}CHANGE_AVERAGE_PE`;

export {
  REDUCER_NAME,
  reducer as default,
  subscribeRealtimeTick,
  changeCode,
  fetchListSearch,
  fetchInfoTicker,
  fetchCompanyScore,
  changeYearDropdow,
  getAveragePE,
};

//realtime
function subscribeRealtimeTick(data) {
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      result: data,
    },
  };
}

//search
function changeCode(code) {
  console.log('code : ', code);
  return dispatch => {
    dispatch({
      type: CHANGE_CODE,
      payload: {
        displayCode: code.displayCode,
        code: code.code,
        codeName: code.codeName,
        codeExchange: code.exchange,
        isTicker: code.isTicker,
      },
    });
    dispatch(fetchInfoTicker());
    dispatch(fetchCompanyScore());
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

function fetchInfoTicker() {
  return (dispatch, getState) => {
    const currentSearch = getState()[REDUCER_NAME].currentSearch;
    const code = currentSearch.code;
    priceDataService.getLatestPrice({ Code: code }).then(response => {
      let tickerInfomation = {};
      if (response.items) {
        tickerInfomation = response.items[0];
      }
      dispatch({
        type: FETCH_INFO_TICKER,
        payload: {
          infoTicker: tickerInfomation,
        },
      });
    });
  };
}

function fetchCompanyScore() {
  return (dispatch, getState) => {
    const code = getState()[REDUCER_NAME].currentSearch.code;
    snapShotService.getCompanyScore({ OrganCode: code }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_COMPANY_SCORE,
        payload: {
          companyScore: items && items.length ? items[0] : {},
        },
      });
    });
  };
}

function changeYearDropdow(year) {
  return dispatch => {
    dispatch({
      type: CHANGE_YEAR_DROPDOW,
      payload: {
        year,
      },
    });
  };
}

function getAveragePE(value) {
  return dispatch => {
    dispatch({
      type: CHANGE_AVERAGE_PE,
      payload: {
        value,
      },
    });
  };
}

const initialState = {
  listDataSearch: [],
  currentSearch: {
    code: 'HPG',
    displayCode: 'HPG',
    tickerNameAndExchange: 'Hoa Phat Group / HOSE',
  },
  indexSumary: {},
  indexSumaryRealTime: {},
  companyScore: {},
  yearDropDow: Const.defaultYearSelect,
  component: {},
  averagePE: null,
};

function transformExchangeTicker(codeName, exchange) {
  let exchangeTransform = '';
  if (exchange === Const.listIndexName.vnIndex) {
    exchangeTransform = Const.listIndexExchange.hose;
  }
  if (exchange === Const.listIndexName.hnIndex) {
    exchangeTransform = Const.listIndexExchange.hnx;
  }
  if (exchange === Const.listIndexName.upcomIndex) {
    exchangeTransform = Const.listIndexExchange.upcom;
  }

  if (
    exchange !== Const.listIndexName.vnIndex ||
    exchange !== Const.listIndexName.hnIndex ||
    exchange !== Const.listIndexName.upcomIndex
  ) {
    exchangeTransform = exchange;
  }

  let tickerNameAndExchange = codeName + ' / ' + exchangeTransform;
  return tickerNameAndExchange;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_REALTIME_DATA_TICK:
      const { result: resultTick } = action.payload;
      if (resultTick) {
        return {
          ...state,
          indexSumaryRealTime: resultTick,
        };
      }
      return state;

    case GET_COMPANY_SCORE:
      const { companyScore } = action.payload;
      return {
        ...state,
        companyScore,
      };

    case FETCH_INFO_TICKER:
      const { infoTicker } = action.payload;
      let indexSumary = {};
      if (Object.keys(infoTicker).length) {
        indexSumary = infoTicker.priceInfo || {};
      }
      return {
        ...state,
        indexSumary: { ...indexSumary },
      };

    case CHANGE_CODE:
      const { isTicker } = action.payload;
      let tickerNameAndExchange = '';
      if (isTicker) {
        tickerNameAndExchange = transformExchangeTicker(
          action.payload.codeName,
          action.payload.codeExchange,
        );
      }

      return {
        ...state,
        currentSearch: {
          displayCode: action.payload.displayCode,
          code: action.payload.code,
          tickerNameAndExchange: tickerNameAndExchange,
        },
      };

    case FETCH_LIST_SEARCH:
      const { listTicker, listIndex } = action.payload;
      const listDataSearch = [];

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
          codeName: getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_NAME),
          exchange: getDataFollowKeyByDot(
            item,
            Const.listIndex.PARENT_COM_GROUP_CODE,
          ),
          code: getDataFollowKeyByDot(item, Const.listIndex.COM_GROUP_CODE),
          isTicker: false,
        });
      });

      return {
        ...state,
        listDataSearch,
      };

    case CHANGE_YEAR_DROPDOW:
      const { year } = action.payload;
      return {
        ...state,
        yearDropDow: year,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case CHANGE_AVERAGE_PE:
      return {
        ...state,
        averagePE: action.payload.value,
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
