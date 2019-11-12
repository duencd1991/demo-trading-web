import reducerRegistry from '../../helpers/ReducerRegistry';
import Const from './Const';
import masterService from './../../../core/services/Common/MasterService';
import {
  formatComGroupCode,
  getDataFollowKeyByDot,
} from './../../helpers/Common';
import priceDataService from './../../../core/services/Prices/PriceData/PriceDataService';
import ownerShipService from '../../../core/services/Fundamental/OwnerShip';
import snapShotService from '../../../core/services/Fundamental/SnapShotService';

const REDUCER_NAME = 'OWNER_SHIP:';
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;
const FETCH_INFO_TICKER = `${REDUCER_NAME}FETCH_INFO_TICKER`;
const FETCH_LIST_DATA_OWNERSHIP = `${REDUCER_NAME}FETCH_LIST_DATA_OWNERSHIP`;
const FETCH_SHARE_HOLDER_TOOLTIP = `${REDUCER_NAME}FETCH_SHARE_HOLDER_TOOLTIP`;
const FETCH_BOD_TOOLTIP = `${REDUCER_NAME}FETCH_BOD_TOOLTIP`;
const GET_COMPANY_SCORE = `${REDUCER_NAME}GET_COMPANY_SCORE`;
const SET_UP_LIST_DATA = `${REDUCER_NAME}SET_UP_LIST_DATA`;
const DELETE_ID = `${REDUCER_NAME}DELETE_ID`;

export {
  REDUCER_NAME,
  reducer as default,
  changeCode,
  fetchListSearch,
  subscribeRealtimeTick,
  fetchInfoTicker,
  fetchListDataOwnership,
  fetchInfoBoDTooltip,
  fetchInfoShareHolderTooltip,
  fetchCompanyScore,
  setUpData,
  deleteId,
};

//realtime
function subscribeRealtimeTick(data, id) {
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      result: data,
      id,
    },
  };
}

//multi component
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

function deleteId(id) {
  return dispatch => {
    dispatch({
      type: DELETE_ID,
      payload: {
        id,
      },
    });
  };
}

function changeCode(code, id) {
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
        conditionId: id,
      },
    });
    dispatch(fetchInfoTicker(id));
    dispatch(fetchListDataOwnership(id));
    dispatch(fetchCompanyScore(id));
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

function fetchInfoTicker(id) {
  return (dispatch, getState) => {
    const currentSearch = getState()[REDUCER_NAME].listMultiComponent[id]
      .currentSearch;
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
          inforTickerId: id,
        },
      });
    });
  };
}

function fetchCompanyScore(id) {
  return (dispatch, getState) => {
    const code = getState()[REDUCER_NAME].listMultiComponent[id].currentSearch
      .code;
    snapShotService.getCompanyScore({ OrganCode: code }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_COMPANY_SCORE,
        payload: {
          companyScore: items && items.length ? items[0] : {},
          companyScroreId: id,
        },
      });
    });
  };
}

function fetchListDataOwnership(id) {
  return (dispatch, getState) => {
    const code = getState()[REDUCER_NAME].listMultiComponent[id].currentSearch
      .code;
    ownerShipService.getOwnerShipData({ OrganCode: code }).then(response => {
      dispatch({
        type: FETCH_LIST_DATA_OWNERSHIP,
        payload: {
          response,
          componentId: id,
        },
      });
    });
  };
}

function fetchInfoShareHolderTooltip(code, id) {
  return dispatch => {
    ownerShipService
      .getInfoShareHolderTooltip({ Code: code })
      .then(response => {
        dispatch({
          type: FETCH_SHARE_HOLDER_TOOLTIP,
          payload: {
            shareHolderTooltipInfo: response,
            infoShareHolderTooltipId: id,
          },
        });
      });
  };
}

function fetchInfoBoDTooltip(code, personId, componentId) {
  return dispatch => {
    ownerShipService
      .getInfoBoDTooltip({ OrganCode: code, PersonId: personId })
      .then(response => {
        dispatch({
          type: FETCH_BOD_TOOLTIP,
          payload: {
            bodTooltipInfo: response,
            infoBodTooltipId: componentId,
          },
        });
      });
  };
}

const initialState = {
  listDataSearch: [],
  listMultiComponent: {},
};

const appendId = (data, indexListAppend) => {
  if (!data) {
    return [];
  }

  if (indexListAppend && indexListAppend.length !== 0) {
    const { list, ids } = data.reduce(
      (result, item, index) => {
        indexListAppend += 1;
        return {
          ids: result.ids.concat(indexListAppend),
          list: {
            ...result.list,
            [indexListAppend]: item,
          },
        };
      },
      { list: {}, ids: [] },
    );
    return [list, ids];
  } else {
    const { list, ids } = data.reduce(
      (result, item, index) => {
        return {
          ids: result.ids.concat(index + 1),
          list: {
            ...result.list,
            [index + 1]: item,
          },
        };
      },
      { list: {}, ids: [] },
    );
    return [list, ids];
  }
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
      const { result: resultTick, id: updateTickId } = action.payload;
      if (resultTick) {
        return {
          ...state,
          listMultiComponent: {
            ...state.listMultiComponent,
            [updateTickId]: {
              ...state.listMultiComponent[updateTickId],
              indexSumaryRealTime: resultTick,
            },
          },
        };
      }
      return state;

    case GET_COMPANY_SCORE:
      const { companyScore, companyScroreId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [companyScroreId]: {
            ...state.listMultiComponent[companyScroreId],
            companyScore,
          },
        },
        //companyScore
      };

    case FETCH_LIST_DATA_OWNERSHIP:
      const { response, componentId } = action.payload;
      let listBoardOfDirectorById = {};
      let listBoardOfDirectorId = [];
      let listMajorShareHolderById = {};
      let listMajorShareHolderId = [];
      let overViewChartData = [];
      let majorOwnerShipChartData = [];

      if (response.items) {
        [listBoardOfDirectorById, listBoardOfDirectorId] = appendId(
          response.items[0].boardOfDirectors,
        );
        [listMajorShareHolderById, listMajorShareHolderId] = appendId(
          response.items[0].majorShareHolders,
        );
        overViewChartData = response.items[0].overviewChartData;
        majorOwnerShipChartData = response.items[0].majorOwnershipsChartData;
      }

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            listBoardOfDirectorById,
            listBoardOfDirectorId,
            listMajorShareHolderById,
            listMajorShareHolderId,
            overViewChartData,
            majorOwnerShipChartData,
            listBoardOfDirectors: response.items[0].boardOfDirectors,
            listMajorShareHolders: response.items[0].majorShareHolders,
          },
        },
      };

    case FETCH_BOD_TOOLTIP:
      const { bodTooltipInfo, infoBodTooltipId } = action.payload;
      bodTooltipInfo.items.map(item => {
        item.index = Math.random()
          .toString(36)
          .substring(2, 15); // unique key to map data tooltip
      });
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [infoBodTooltipId]: {
            ...state.listMultiComponent[infoBodTooltipId],
            bodTooltipInfo: bodTooltipInfo.items,
          },
        },
      };

    case FETCH_SHARE_HOLDER_TOOLTIP:
      const {
        shareHolderTooltipInfo,
        infoShareHolderTooltipId,
      } = action.payload;

      let arrayDataTooltip = shareHolderTooltipInfo.items;
      let listFilterData = state.listDataSearch;

      arrayDataTooltip.map(item => {
        listFilterData.find(ticker => {
          if (ticker.code === item.organCode) {
            item.organCode = ticker.displayCode;
            item.nameAndExchange = transformExchangeTicker(
              ticker.codeName,
              ticker.exchange,
            );
          }
        });
      });

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [infoShareHolderTooltipId]: {
            ...state.listMultiComponent[infoShareHolderTooltipId],
            shareHolderTooltipInfo: arrayDataTooltip,
          },
        },
      };

    case FETCH_INFO_TICKER:
      const { infoTicker, inforTickerId } = action.payload;
      let indexSumary = {};
      if (Object.keys(infoTicker).length) {
        indexSumary = infoTicker.priceInfo || {};
      }
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [inforTickerId]: {
            ...state.listMultiComponent[inforTickerId],
            indexSumary: { ...indexSumary },
          },
        },
      };

    case CHANGE_CODE:
      const { isTicker } = action.payload;
      let tickerNameAndExchange = '';
      let exchange = '';

      if (isTicker) {
        if (action.payload.codeExchange === Const.listIndexName.vnIndex) {
          exchange = Const.listIndexExchange.hose;
        }
        if (action.payload.codeExchange === Const.listIndexName.hnIndex) {
          exchange = Const.listIndexExchange.hnx;
        }
        if (action.payload.codeExchange === Const.listIndexName.upcomIndex) {
          exchange = Const.listIndexExchange.upcom;
        }

        if (
          action.payload.codeExchange !== Const.listIndexName.vnIndex ||
          action.payload.codeExchange !== Const.listIndexName.hnIndex ||
          action.payload.codeExchange !== Const.listIndexName.upcomIndex
        ) {
          exchange = action.payload.codeExchange;
        }

        tickerNameAndExchange = action.payload.codeName + ' / ' + exchange;
      }

      const { conditionId } = action.payload;

      const clone = {
        ...state.listMultiComponent,
        [conditionId]: {
          ...state.listMultiComponent[conditionId],
          currentSearch: {
            displayCode: action.payload.displayCode,
            code: action.payload.code,
            tickerNameAndExchange: tickerNameAndExchange,
          },
        },
      };

      return {
        ...state,
        listMultiComponent: clone,
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
    case SET_UP_LIST_DATA:
      const dataId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            currentSearch: {
              code: 'HPG',
              displayCode: 'HPG',
              tickerNameAndExchange: 'Hoa Phat Group / HOSE',
            },

            indexSumary: {},
            indexSumaryRealTime: {},
            companyScore: {},

            boardOfDirectors: [],
            listBoardOfDirectorId: [],
            listBoardOfDirectorById: {},

            majorShareHolder: [],
            listMajorShareHolderId: [],
            listMajorShareHolderById: {},

            overViewChartData: [],
            majorOwnerShipChartData: [],

            bodTooltipInfo: [],
            shareHolderTooltipInfo: [],

            listBoardOfDirectors: {},
            listMajorShareHolders: {},
          },
        },
      };
    case DELETE_ID:
      const delId = action.payload.id;
      const cloneListComponent = { ...state.listMultiComponent };
      const {
        [delId]: {},
        ...withoutDeleteKey
      } = cloneListComponent;
      return {
        ...state,
        listMultiComponent: withoutDeleteKey,
      };
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
