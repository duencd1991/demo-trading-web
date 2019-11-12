import _ from 'lodash';
// TODO import snapShotService from '../../../../core/services/Fundamental/SnapShotService';
// TODO import summaryService from '../../../../core/services/Market/Watchlist/SummaryService';
// TODO import alertSystemService from '../../../../core/services/Tools/Alerts/AlertSystemService';
import reducerRegistry from '../../../helpers/ReducerRegistry';
import { cloneDeep } from 'lodash';

const REDUCER_NAME = 'TOOLTIP_MIX_TABLE';
const SET_UP_LIST_DATA = `${REDUCER_NAME}SET_UP_LIST_DATA`;
const FETCH_COMPANY_SCORE = `${REDUCER_NAME}FETCH_COMPANY_SCORE`;
const FETCH_DATA_CHART = `${REDUCER_NAME}FETCH_DATA_CHART`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
export {
  REDUCER_NAME,
  reducer as default,
  fectchInforCompanyScore,
  fetchChartImage,
  setLoading,
  setUpData,
};

const initialState = {
  score: {},
  arrPrice: [],
  listMultiComponent: [],
  images: {},
  isLoading: false,
};

function setLoading(isLoading = true, id) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading,
        id,
      },
    });
  };
}
function fetchChartImage(organCode, id) {
  return dispatch => {
    dispatch(setLoading(true, id));
    // alertSystemService
    //   .getAlertChartImage({ OrganCode: organCode })
    //   .then(response => {
    //     if (response && response.items) {
    //       dispatch({
    //         type: FETCH_DATA_CHART,
    //         payload: {
    //           images: response.items.length > 0 ? response.items[0] : '',
    //           componentId: id,
    //         },
    //       });
    //       dispatch(setLoading(false, id));
    //     }
    //   });
  };
}

function fectchInforCompanyScore(organCode, id) {
  const params = {
    OrganCode: organCode,
    Code: organCode,
  };
  return dispatch => {
    dispatch(setLoading(true, id));
    // snapShotService.getCompanyScore({ OrganCode: organCode }).then(res => {
    //   const { items = [] } = res ? res : [];
    //   const dataScore = items && items.length > 0 ? items[0] : {};
    //   summaryService
    //     .getTwoDaysSeries({
    //       OrganCode: organCode,
    //     })
    //     .then(data => {
    //       const itemPrices = data ? data.items : [];
    //       const arrPrice =
    //         itemPrices && itemPrices.length > 0 ? itemPrices[0] : null;
    //       dispatch({
    //         type: FETCH_COMPANY_SCORE,
    //         payload: {
    //           data: dataScore,
    //           arrPrice,
    //           componentId: id,
    //         },
    //       });
    //       dispatch(setLoading(false, id));
    //     });
    // });
  };
}
function setUpData(id) {
  return dispatch => {
    dispatch({
      type: SET_UP_LIST_DATA,
      payload: {
        id,
      },
    });
  };
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UP_LIST_DATA:
      const componentId = action.payload.id;

      return {
        ...state,
        [componentId]: {
          images: {},
          isLoading: true,
          score: {},
          arrPrice: [],
        },
      };
    case FETCH_DATA_CHART: {
      const { images, componentId } = action.payload;
      return {
        ...state,
        [componentId]: {
          ...state[componentId],
          images,
        },
      };
    }
    case SET_LOADING:
      const { isLoading, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          isLoading,
        },
      };
    case FETCH_COMPANY_SCORE: {
      const { data, componentId } = action.payload;
      let { arrPrice } = action.payload;
      arrPrice = arrPrice ? cloneDeep(arrPrice) : null;
      arrPrice = arrPrice ? [...arrPrice.previousDate, ...arrPrice.toDate] : [];
      return {
        ...state,
        [componentId]: {
          ...state[componentId],
          score: data,
          arrPrice: arrPrice,
        },
      };
    }
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
