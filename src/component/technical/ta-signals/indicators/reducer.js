import _ from 'lodash';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import indicatorsService from '../../../../core/services/Technical/IndicatorsService';
import Const from '../../ta-signals/indicators/Const'
import ConstCommon from './../../../common/Const';
import masterService from './../../../../core/services/Common/MasterService';

const REDUCER_NAME = 'TA_SIGNALS:';
const FETCH_LOAD_LIST_INDICATORS = `${REDUCER_NAME}FETCH_LOAD_LIST_INDICATORS`;
const FETCH_ITEM_INDICATORS = `${REDUCER_NAME}FETCH_ITEM_INDICATORS`;
const FETCH_LAST_PRICE_DATA = `${REDUCER_NAME}FETCH_LAST_PRICE_DATA`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;


export {
  REDUCER_NAME,
  reducer as default,
  fetchListIndicators,
  fetchItemIndicators,
  setCode,
  fetchLastPrice,
  setLoading,
  subscribeRealtimeTick
}

const initialState = {
  listTickerIndicators: [],
  listTickerIndicatorsByTicker: {},
  itemTickerIndicatorsByTicker: {},
  indexData: [],
  indexDataById: {},
  indexDataByIdRealTime: {},
  isLoading: false,
  listDataSearch: [],
  listDataSearchByTicker: {},
  resetItem: [{
    organCode: '',
    matchPrice: null,
    daily: null,
    hourly: null,
    quarterly: null,
    weekly: null
  }],
  component: {},
};

function subscribeRealtimeTick(data) {
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      data,
    }
  };
}

function fetchLastPrice(code, id) {
  return (dispatch) => {
    const params = {
      Code: code
    }
    indicatorsService.getLastPriceData(params).then(response => {
      const items = response ? response.items : [];

      const indexData = items && items.length > 0 ? items[0].priceInfo : {};

      dispatch({
        type: FETCH_LAST_PRICE_DATA,
        payload: {
          indexData,
          id
        }
      });
    });
  };
}

function setLoading(isLoading) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  }
}

function fetchListIndicators() {
  return (dispatch) => {
    dispatch(setLoading(true));
    indicatorsService.getListIndicatos().then(response => {

      const listIndicators = response.items || [];

      masterService.getListOrganization().then((response) => {

        const listTicker = response.items || [];
          dispatch({
            type: FETCH_LOAD_LIST_INDICATORS,
            payload: {
              listIndicators,
              listTicker,
            }
          });
        });
      });
    dispatch(setLoading(false))
  };
}

function fetchItemIndicators(code, idNew) {
  return (dispatch, getState) => {
    const params = {
      OrganCode: code.code,
      Code: code.code
    }
    const store = getState();
    const resetDataItem = store[REDUCER_NAME].resetItem;
    indicatorsService.getListIndicatos(params).then(response => {
      const items = response ? response.items : [];
      const newItems = items ? items : [];

      indicatorsService.getLastPriceData(params).then(response => {
        const items = response ? response.items : [];

        const indexData = items && items.length > 0 ? items[0].priceInfo : {};

        dispatch({
          type: FETCH_ITEM_INDICATORS,
          payload: {
            indexData,
            listIndicatorNews: newItems.length === 0 ? resetDataItem : newItems,
            idNew,
            codeNew: code.code
          }
        });
      });
    });
  };
}

function setCode(code, id) {
  return (dispatch) => {
    dispatch(fetchItemIndicators(code, id));
  };
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOAD_LIST_INDICATORS: {
      const { listIndicators, listTicker } = action.payload;
      const listDataSearch = [];
      listTicker.forEach(item => {
        listDataSearch.push({
          displayCode: getDataFollowKeyByDot(item, Const.listTicker.TICKER),
          code: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_CODE),
          codeName: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_SHORT_NAME),
          exchange: ConstCommon.listExchange[getDataFollowKeyByDot(item, Const.listTicker.COM_GROUP_CODE)],
        });
      });

      const listDataSearchByTicker = _.keyBy(listDataSearch, Const.code)
      // add id for list data indicators
      const newListIndicators = listIndicators.map((item, index) => ({
        ...item,
        id: index + 1,
        displayCode: listDataSearchByTicker[item.organCode].displayCode,
        companyName: listDataSearchByTicker[item.organCode].codeName +' / '+ listDataSearchByTicker[item.organCode].exchange
      }));

      const listTickerIndicators = newListIndicators.map(item => getDataFollowKeyByDot(item, Const.idIndicators));
      const listTickerIndicatorsByTicker = _.keyBy(newListIndicators, Const.idIndicators)

      return {
        ...state,
        listTickerIndicators,
        listTickerIndicatorsByTicker,
        listDataSearch,
        listDataSearchByTicker
      };
    }
    case FETCH_ITEM_INDICATORS: {
      const { listIndicatorNews, idNew, codeNew , indexData} = action.payload;
      const displayCode = state.listDataSearchByTicker[codeNew].displayCode;
      const companyName = state.listDataSearchByTicker[codeNew].codeName +' / '+ state.listDataSearchByTicker[codeNew].exchange
      return {
        ...state,
        listTickerIndicatorsByTicker: {
          ...state.listTickerIndicatorsByTicker,
          [idNew]: {
            ...listIndicatorNews[0],
            // add id for list data indicators
            id: idNew,
            organCode: codeNew,
            displayCode,
            companyName
          }
        },
        indexDataById: {
          ...state.indexDataById,
          [idNew]: {
            idNew,
            ...indexData,
          },
        }
      };
    }
    case FETCH_LAST_PRICE_DATA: {
      const { indexData, id } = action.payload;
      return {
        ...state,
        indexData: [
          ...state.indexData,
          id,
        ],
        indexDataById: {
          ...state.indexDataById,
          [id]: indexData,
        }
      }
    }

    case SUBSCRIBE_REALTIME_DATA_TICK: {
      const { data } = action.payload;
      const isUpdateState = Object.keys(state.indexDataById).some(id => {
        return data.some(item => item.organCode === state.indexDataById[id].organCode)
      })
      if (!isUpdateState) {
        return state
      }
      const indexDataById = Object.keys(state.indexDataById).reduce((result, id) => {
        const dataRealtime = data.find(item => item.organCode === state.indexDataById[id].organCode)
        if (dataRealtime) {
          return {
            ...result,
            [id]: {
              ...state.indexDataById[id],
              ...dataRealtime
            },
          }
        }

        return {
          ...result,
          [id]: state.indexDataById[id],
        }
      }, {})
      return {
        ...state,
        indexDataById,
      }
    }

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
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

reducerRegistry.register(REDUCER_NAME, reducer);
