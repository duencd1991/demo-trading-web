import _ from 'lodash';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import priceVolumeService from '../../../../core/services/Technical/PriceVolumeService';
import Const from '../../ta-signals/price-volume/Const'
import Interval from '../../../helpers/IntervalCallApi'

const REDUCER_NAME = 'PRICE_VOLUME:';
const FETCH_LOAD_LIST_PRICE_VOLUME = `${REDUCER_NAME}FETCH_LOAD_LIST_PRICE_VOLUME`;
const CHANGE_PRICE_VOLUME_LIST = `${REDUCER_NAME}CHANGE_PRICE_VOLUME_LIST`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const FETCH_DATA = `${REDUCER_NAME}FETCH_DATA`;
const LOAD_MORE_PRICE_VOLUME = `${REDUCER_NAME}LOAD_MORE_PRICE_VOLUME`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

export {
  REDUCER_NAME,
  reducer as default,
  changeFeatureDropDown,
  cancelIntervalFetchPriceVolume,
  intervalFetchPriceVolume,
  loadMorePriceVolume
}

const initialState = {
  listTickerPriceVolume: [],
  listPriceVolumeByTicker: {},
  code: Const.defaultCode,
  indexData: {},
  id: '',
  featureType: Const.defaultOption,
  isLoading: false,
  priceVolumeId: 0,
  totalPage: 10,
  checkFlag: 0,
  firstPage: 0,
  lstTickerLoadMore: [],
  lstTickerLoadMoreByTicker: {},
  component: {},
};

function changeFeatureDropDown(featureType) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PRICE_VOLUME_LIST,
      payload: {
        featureType,
      }
    });
    dispatch(intervalFetchPriceVolume(featureType));
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

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOAD_LIST_PRICE_VOLUME: {
      const { listPriceVolume } = action.payload;
      let id = 0;
      listPriceVolume.map(items => {
        items.idPriceVolume = id++;
      })
      const listPriceVolumeByTicker = _.keyBy(listPriceVolume, Const.organCode);
      const listTickerPriceVolume = listPriceVolume.map(item =>item.organCode);
      return {
        ...state,
        listTickerPriceVolume,
        listPriceVolumeByTicker,
        priceVolumeId: id
      };
    }
    case CHANGE_PRICE_VOLUME_LIST: {
      const featureType = action.payload.featureType
      return { ...state, featureType }
    }
    case SET_LOADING: {
      return { ...state, isLoading: action.payload }
    }
    case FETCH_DATA: {
      return { ...state, isLoading: action.payload }
    }
    case LOAD_MORE_PRICE_VOLUME: {
      const { listWatchListLoadMore, priceVolumeId } = action.payload;
      let id = priceVolumeId;
      listWatchListLoadMore.map(items => {
        items.idPriceVolume = id++;
      })
      const lstTickerLoadMore = listWatchListLoadMore.map(item =>item.organCode);
      const lstTickerLoadMoreByTicker = _.keyBy(listWatchListLoadMore, Const.organCode);
      return {
        ...state,
        listTickerPriceVolume: [
          ...state.listTickerPriceVolume,
          ...lstTickerLoadMore,
        ],

        listPriceVolumeByTicker: {
          ...state.listPriceVolumeByTicker,
          ...lstTickerLoadMoreByTicker,
        },
        isFetching: false,
        priceVolumeId: id,
        firstPage: 0
      };
    }

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload
      };

    default:
      return state;
  }
}

function cancelIntervalFetchPriceVolume() {
  return () => {
    Interval.cancel('PriceVolume')
  };
}

function intervalFetchPriceVolume(featureType) {

  return (dispatch, globalState) => {
    dispatch(setLoading(true));
    Interval.fetch(
      'PriceVolume',
      dispatch,
      function (source) {
        const params = {PriceVolumeAnalysis:featureType, Page: 1, PageSize: Const.maxRowData };
        if (featureType) params.PriceVolumeAnalysis = featureType;
        return priceVolumeService.getListPriceVolume(params, source);
      },
      function (response) {
        const { items = [] } = response.items === null ? [] : response;
        dispatch({
          type: FETCH_LOAD_LIST_PRICE_VOLUME,
          payload: {
            listPriceVolume: items
          }
        });
        dispatch(setLoading(false));
      },
      1000 * 60 * 5
    );
  };
}

function formatedParams(params) {
  const formatParams = {
    Page: params.priceVolumeId || 1,
    PageSize: params.PageSize || Const.maxRowData,
  };
  if (params.featureType) formatParams.featureType = params.featureType;


  return formatParams
}

function loadMorePriceVolume(params) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const formatParams = formatedParams(params);
    const priceVolumeId = params.priceVolumeId;
    priceVolumeService.getListPriceVolume(formatParams).then(response => {
      const { items = [] } = response.items === null ? [] : response;
      if (!items) return;
      dispatch({
        type: LOAD_MORE_PRICE_VOLUME,
        payload: {
          listWatchListLoadMore: items || [],
          priceVolumeId
        }
      });
      dispatch(setLoading(false));
    });
    dispatch({
      type: FETCH_DATA,
      payload: true
    })
  };
}

reducerRegistry.register(REDUCER_NAME, reducer);
