import axios from 'axios';
import foreignService from '../../../core/services/Market/MoneyFlow/ForeignService';
import proprietaryService from '../../../core/services/Market/MoneyFlow/ProprietaryService';
import reducerRegistry from '../../helpers/ReducerRegistry';
import Const from './Const';

export const REDUCER_NAME = 'MONEY_FLOW';

const FETCH_PROPRIETARY_SUCCESS = `${REDUCER_NAME}_FETCH_PROPRIETARY_SUCCESS`;
const SET_PROPRIETARY_LOADING = `${REDUCER_NAME}_SET_PROPRIETARY_LOADING`;

const FETCH_FOREIGN_SUCCESS = `${REDUCER_NAME}_FETCH_FOREIGN_SUCCESS`;
const SET_FOREIGN_LOADING = `${REDUCER_NAME}_SET_FOREIGN_LOADING`;

const CHANGE_COM_GROUP_CODE = `${REDUCER_NAME}CHANGE_COM_GROUP_CODE`;

const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;

const SET_REALTIME_DATA = `${REDUCER_NAME}SET_REALTIME_DATA`;

export const setRealtimeData = data => ({
  type: SET_REALTIME_DATA,
  payload: data,
});

const setProprietaryLoading = (payload = true) => ({
  type: SET_PROPRIETARY_LOADING,
  payload,
});

export const fetchProprietary = payload => dispatch => {
  const source = axios.CancelToken.source();
  dispatch(setProprietaryLoading());
  proprietaryService.getProprietary(payload, source).then(response => {
    if (!response) {
      return;
    }
    dispatch(
      fetchProprietarySuccess({
        data: response.items ? response.items[0] : [],
      }),
    );
  });

  return source;
};

export const fetchProprietarySuccess = ({ data }) => ({
  type: FETCH_PROPRIETARY_SUCCESS,
  payload: data,
});

const setForeignLoading = (payload = true) => ({
  type: SET_FOREIGN_LOADING,
  payload,
});

export const fetchForeign = payload => dispatch => {
  const source = axios.CancelToken.source();
  dispatch(setForeignLoading());
  foreignService.getForeign(payload, source).then(response => {
    if (!response) {
      return;
    }
    dispatch(
      fetchForeignSuccess({
        data: response.items ? response.items[0] : [],
      }),
    );
  });

  return source;
};

export const fetchForeignSuccess = ({ data }) => ({
  type: FETCH_FOREIGN_SUCCESS,
  payload: data,
});

export function changeComGroupCode(comGroupCode) {
  return (dispatch, getState) => {
    const currentComGroupCode = getState()[REDUCER_NAME].comGroupCode;
    if (comGroupCode !== currentComGroupCode) {
      dispatch({
        type: CHANGE_COM_GROUP_CODE,
        payload: {
          comGroupCode,
        },
      });
    }
  };
}

const initialState = {
  proprietary: {
    isLoading: true,
    data: {},
  },
  foreign: {
    isLoading: true,
    data: {},
  },
  realtimeData: {},
  comGroupCode: Const.listFilterByOrganCode.VNINDEX.key,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPRIETARY_SUCCESS:
      return {
        ...state,
        proprietary: {
          data: action.payload,
          isLoading: false,
        },
      };
    case SET_PROPRIETARY_LOADING:
      return {
        ...state,
        proprietary: {
          ...state.proprietary,
          isLoading: action.payload,
        },
      };
    case FETCH_FOREIGN_SUCCESS:
      return {
        ...state,
        foreign: {
          data: action.payload,
          isLoading: false,
        },
      };
    case SET_FOREIGN_LOADING:
      return {
        ...state,
        foreign: {
          ...state.foreign,
          isLoading: action.payload,
        },
      };
    case CHANGE_COM_GROUP_CODE:
      return {
        ...state,
        comGroupCode: action.payload.comGroupCode,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case SET_REALTIME_DATA:
      const realtimeData = action.payload.reduce((data, ticker) => {
        return {
          [ticker.organCode]: ticker,
          ...data,
        };
      }, {});

      return {
        ...state,
        realtimeData,
      };

    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
