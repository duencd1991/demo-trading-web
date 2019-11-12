import reducerRegistry from '../../../../helpers/ReducerRegistry';
import indexService from '../../../../../core/services/Market/MarketInDepth/IndexService';
import { keyBy } from 'lodash';
import Const from './Const';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
export const REDUCER_NAME = 'MAIN_LAYOUT:NOTIFI_MAQUEE';
export const SUBSCRIBE_REALTIME_DATA = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA`;
export const FETCH_LIST_TABLE = `${REDUCER_NAME}FETCH_LIST_TABLE`;
const initialState = {
  listTableByComGroupCode: [],
};
export const fetchListTable = (pageSize, status) => {
  return dispatch => {
    indexService.getLatestIndices({ pageSize, status }).then(response => {
      const items = response.items || [];
      dispatch({
        type: FETCH_LIST_TABLE,
        payload: {
          listData: items,
        },
      });
    });
  };
};

export const subscribeRealtimeData = data => {
  return {
    type: SUBSCRIBE_REALTIME_DATA,
    payload: {
      data,
    },
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_REALTIME_DATA:
      const { data } = action.payload;
      data.forEach(item => {
        if (state.listTableByComGroupCode[item.comGroupCode]) {
          state.listTableByComGroupCode[item.comGroupCode] = item;
        }
      });
      return { ...state };

    case FETCH_LIST_TABLE:
      const listTableByComGroupCode = keyBy(
        action.payload.listData,
        Const.listColumnTable.COM_GROUP_CODE,
      );
      const listComGroupCodeTable = action.payload.listData.map(item =>
        getDataFollowKeyByDot(item, Const.listColumnTable.COM_GROUP_CODE),
      );

      return {
        ...state,
        listTableByComGroupCode,
        listComGroupCodeTable,
      };

    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
