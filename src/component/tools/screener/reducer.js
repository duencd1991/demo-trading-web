import _, { keyBy } from 'lodash';
import screenerService from '../../../core/services/Tools/Screener/ScreenerService';
import reducerRegistry from '../../helpers/ReducerRegistry';
import userSettingService from './../../../core/services/Common/UserSettingService';
import masterService from './../../../core/services/Common/MasterService';
import ConstCommon from './../../common/Const';
import { getDataFollowKeyByDot } from './../../helpers/Common';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import ConstResult from './result/Const';
import { remove } from 'lodash';

// =============================================CONSTANTS=============================================================
const REDUCER_NAME = 'STOCK_SCREENER:';
const FETCH_GET_SCREENER_ITEMS_DATA = `${REDUCER_NAME}FETCH_GET_SCREENER_ITEMS_DATA`;
const CHANGE_WATCH_LIST = `${REDUCER_NAME}CHANGE_WATCH_LIST`;
const CHANGE_SECTOR = `${REDUCER_NAME}CHANGE_SECTOR`;
const CHANGE_CRITERIA = `${REDUCER_NAME}CHANGE_CRITERIA`;
const CHANGE_RANGE = `${REDUCER_NAME}CHANGE_RANGE`;
const LOAD_MORE_DATA = `${REDUCER_NAME}LOAD_MORE_DATA`;
const SUBSCRIBE_REALTIME_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_TICK`;
const FETCH_MY_WATCH_LIST = `${REDUCER_NAME}FETCH_MY_WATCH_LIST`;
const FETCH_USER_SCREENER = `${REDUCER_NAME}FETCH_USER_SCREENER`;
const FETCH_TOP_SCREENER = `${REDUCER_NAME}FETCH_TOP_SCREENER`;

const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const FETCH_SCREENER_PARAMETERS = `${REDUCER_NAME}FETCH_SCREENER_PARAMETERS`;

const TOGGLE_POPUP_SAVE = `${REDUCER_NAME}TOGGLE_POPUP_SAVE`;
const SHOW_MESSAGE_SAVE = `${REDUCER_NAME}SHOW_MESSAGE_SAVE`;

const CHANGE_SCREENER = `${REDUCER_NAME}CHANGE_SCREENER`;

const GET_INDUSTRY = `${REDUCER_NAME}GET_INDUSTRY`;

const DEFAULT_PAGE_LOAD = 1;

// =============================================EXPORT=============================================================
export {
  REDUCER_NAME,
  reducer as default,
  changeWatchList,
  subscribeRealtimeTick,
  fetchMyWatchList,
  changeSector,
  changeCriteria,
  getScreenerParameter,
  changeRange,
  getScreenerData,
  loadMoreData,
  getUserScreeners,
  saveScreener,
  getTopScreeners,
  togglePopupSave,
  togglePopupResponseSave,
  deleteScreener,
  updateScreener,
  changeScreener,
  fetchIndustryData,
};

function changeWatchList(watchListId) {
  return dispatch => {
    dispatch({
      type: CHANGE_WATCH_LIST,
      payload: {
        watchListId,
      },
    });
    dispatch(getScreenerData());
  };
}

function changeSector(sectorId) {
  return dispatch => {
    dispatch({
      type: CHANGE_SECTOR,
      payload: {
        sectorId,
      },
    });
    dispatch(getScreenerData());
  };
}

function changeCriteria(criteria) {
  return dispatch => {
    dispatch({
      type: CHANGE_CRITERIA,
      payload: {
        criteria,
      },
    });
  };
}

function changeRange(parameters) {
  return dispatch => {
    dispatch({
      type: CHANGE_RANGE,
      payload: {
        parameters,
      },
    });
  };
}

function loadMoreData(page) {
  return (dispatch, globalState) => {
    const comGroupCode =
      globalState()[REDUCER_NAME].comGroupCode || Const.defaultWatchList;
    const icbCode = globalState()[REDUCER_NAME].icbCode || Const.defaultIcbCode;
    const parameters = globalState()[REDUCER_NAME].parameters || [];
    dispatch(setLoading(true));
    screenerService
      .getScreenerItems({
        comGroupCode: comGroupCode,
        icbCode: icbCode,
        parameters: parameters,
        page: page,
        pageSize: Const.itemPerPage,
      })
      .then(({ items }) => {
        if (items) {
          const listScreenerDataMore = items || [];
          dispatch({
            type: LOAD_MORE_DATA,
            payload: {
              listScreenerDataMore,
              page,
            },
          });
          dispatch(setLoading(false));
        }
      });
  };
}

function subscribeRealtimeTick(data) {
  return {
    type: SUBSCRIBE_REALTIME_TICK,
    payload: {
      data,
    },
  };
}

function fetchMyWatchList() {
  return dispatch => {
    userSettingService.getUserWatchList().then(({ items }) => {
      if (items) {
        const { listCompany, listSector } = getUserWatchListByTypeCode(items);
        dispatch({
          type: FETCH_MY_WATCH_LIST,
          payload: {
            listCompany,
            listSector,
          },
        });
      }
    });
  };
}

function getScreenerParameter() {
  return dispatch => {
    screenerService.getScreenerParameters().then(({ items }) => {
      if (items) {
        dispatch({
          type: FETCH_SCREENER_PARAMETERS,
          payload: {
            items,
          },
        });
      }
    });
  };
}

function getScreenerData() {
  return (dispatch, globalState) => {
    const comGroupCode =
      globalState()[REDUCER_NAME].comGroupCode || Const.defaultWatchList;
    const icbCode = globalState()[REDUCER_NAME].icbCode || Const.defaultIcbCode;
    const parameters = globalState()[REDUCER_NAME].parameters || [];
    const page = DEFAULT_PAGE_LOAD;
    const listHideColumnNew = [...ConstResult.listHideColumn];
    let listShow = [];
    listHideColumnNew.forEach(c => {
      parameters.forEach(p => {
        if (
          p.code.toLowerCase() === c.substring(c.indexOf('.') + 1).toLowerCase()
        ) {
          listShow.push(c);
        }
      });
    });
    remove(listHideColumnNew, function(n) {
      return listShow.indexOf(n) > -1;
    });
    dispatch(setLoading(true));
    screenerService
      .getScreenerItems({
        comGroupCode: comGroupCode,
        icbCode: icbCode,
        parameters: parameters,
        page: page,
        pageSize: Const.itemPerPage,
      })
      .then(({ items, totalCount }) => {
        if (items) {
          const listScreenerData = items || [];
          const totalRecords = totalCount;
          const totalPage = Math.ceil(totalCount / Const.itemPerPage);
          dispatch({
            type: FETCH_GET_SCREENER_ITEMS_DATA,
            payload: {
              listScreenerData,
              totalRecords,
              totalPage,
              listHideColumn: listHideColumnNew,
            },
          });
        }
        dispatch(setLoading(false));
      });
  };
}

function getUserScreeners() {
  return dispatch => {
    userSettingService.getScreeners().then(({ items }) => {
      if (items) {
        dispatch({
          type: FETCH_USER_SCREENER,
          payload: {
            items,
          },
        });
      }
    });
  };
}

function getTopScreeners() {
  return dispatch => {
    userSettingService.getTopScreeners().then(({ items }) => {
      if (items) {
        dispatch({
          type: FETCH_TOP_SCREENER,
          payload: {
            items,
          },
        });
      }
    });
  };
}

function togglePopupSave(isShow, val) {
  return (dispatch, globalState) => {
    const activeScreener = globalState()[REDUCER_NAME].activeScreener;
    const parameters = globalState()[REDUCER_NAME].parameters;
    const name = globalState()[REDUCER_NAME].activeScreenerName;

    if (!parameters || parameters.length === 0) {
      const errors = [I18n.t('stockScreener.screenerMessage.errorEmptyParam')];
      dispatch({
        type: SHOW_MESSAGE_SAVE,
        payload: {
          isShowMessage: true,
          messages: errors,
        },
      });
    } else {
      if (!activeScreener) {
        if (isShow && val) {
          dispatch(saveScreener(val));
          dispatch({
            type: TOGGLE_POPUP_SAVE,
            payload: {
              isShow: false,
            },
          });
        } else {
          dispatch({
            type: TOGGLE_POPUP_SAVE,
            payload: {
              isShow,
            },
          });
        }
      } else {
        dispatch(updateScreener(activeScreener, name));
      }
    }
  };
}

function togglePopupResponseSave(isShow, errors) {
  return {
    type: SHOW_MESSAGE_SAVE,
    payload: {
      isShowMessage: isShow,
      messages: errors,
    },
  };
}

function saveScreener(name) {
  return (dispatch, globalState) => {
    const parameters = globalState()[REDUCER_NAME].parameters || [];
    const comGroupCode =
      globalState()[REDUCER_NAME].comGroupCode || Const.defaultWatchList;
    const icbCode = globalState()[REDUCER_NAME].icbCode || Const.defaultIcbCode;
    const criteria = globalState()[REDUCER_NAME].criteria;
    const objectSetting = { comGroupCode, icbCode, criteria, parameters };
    const string = JSON.stringify(objectSetting);
    userSettingService
      .createScreener({ name: name, settings: string })
      .then(res => {
        const data = res || {};

        switch (data.status) {
          case ConstCommon.RESPONSE_STATUS.FAILED:
            const { errors = [] } = data;
            dispatch({
              type: SHOW_MESSAGE_SAVE,
              payload: {
                isShowMessage: true,
                messages: errors,
              },
            });
            break;

          case ConstCommon.RESPONSE_STATUS.SUCCESS:
            dispatch(getUserScreeners());
            break;

          default:
            break;
        }
      });
  };
}

function deleteScreener(screenerId) {
  return dispatch => {
    userSettingService.deleteScreener({ screenerId: screenerId }).then(res => {
      const data = res || {};
      if (data.status === ConstCommon.RESPONSE_STATUS.SUCCESS) {
        dispatch(getUserScreeners());
      }
    });
  };
}

function updateScreener(screenerId, name) {
  return (dispatch, globalState) => {
    const parameters = globalState()[REDUCER_NAME].parameters || [];
    const comGroupCode =
      globalState()[REDUCER_NAME].comGroupCode || Const.defaultWatchList;
    const icbCode = globalState()[REDUCER_NAME].icbCode || Const.defaultIcbCode;
    const criteria = globalState()[REDUCER_NAME].criteria;
    const objectSetting = { comGroupCode, icbCode, criteria, parameters };
    const string = JSON.stringify(objectSetting);
    userSettingService
      .updateScreener({ screenerId: screenerId, name: name, settings: string })
      .then(res => {
        const data = res || {};
        if (data.status === ConstCommon.RESPONSE_STATUS.SUCCESS) {
          dispatch(getUserScreeners());
        } else if (data.status == ConstCommon.RESPONSE_STATUS.FAILED) {
          const { errors = [] } = data;
          dispatch({
            type: SHOW_MESSAGE_SAVE,
            payload: {
              isShowMessage: true,
              messages: errors,
            },
          });
        }
      });
  };
}

function changeScreener(screenerId, isTopScreener) {
  return (dispatch, globalState) => {
    let activeScreener = screenerId;
    let userScreener = globalState()[REDUCER_NAME].userScreener;
    let selectScreener = userScreener.find(
      s => s.screenerId === activeScreener,
    );
    if (isTopScreener === true) {
      userScreener = globalState()[REDUCER_NAME].topScreener;
      selectScreener = userScreener.find(s => s.screenerId === activeScreener);
      activeScreener = null;
    }
    if (selectScreener) {
      const settings = JSON.parse(selectScreener.settings);
      const { comGroupCode, icbCode, criteria, parameters } = settings;
      dispatch({
        type: CHANGE_SCREENER,
        payload: {
          activeScreener: activeScreener,
          activeScreenerName: selectScreener.name,
          comGroupCode,
          icbCode,
          parameters,
          criteria,
        },
      });
      dispatch(getScreenerData());
    }
  };
}

function getUserWatchListByTypeCode(listUserWatchList) {
  const result = {
    listCompany: [],
    listSector: [],
  };
  result.listSector.push({
    watchListId: 0,
    text: 'All Sectors',
    code: 'All',
    typeCode: 'Sector',
  });
  result.listCompany.push({
    watchListId: 0,
    text: 'All Exchanges',
    code: 'All',
    typeCode: 'CompanyGroup',
  });
  listUserWatchList.forEach(item => {
    if (item.typeCode === Const.watchListType.COMPANY_GROUP) {
      result.listCompany.push(item);
    }
    if (item.typeCode === Const.watchListType.SECTOR) {
      result.listSector.push(item);
    }
  });

  return result;
}

function fetchIndustryData() {
  return dispatch => {
    masterService.getAllIcbIndustry().then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_INDUSTRY,
        payload: {
          listSector: items && items.length ? items : [],
        },
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
  };
}

const initialState = {
  listScreenerDataTicker: [],
  listObjectScreenerDataByTicker: {},

  listWatchListId: [],
  defaultWatchList: '',
  isLoading: false,
  component: {},
  comGroupCode: '',
  icbCode: '',
  criteria: '',

  save: {
    isShow: false,
    messages: [],
  },
};

function reducer(globalState = initialState, action) {
  switch (action.type) {
    case TOGGLE_POPUP_SAVE: {
      return {
        ...globalState,
        save: {
          ...globalState.save,
          isShow: action.payload.isShow,
        },
      };
    }

    case SHOW_MESSAGE_SAVE: {
      const { isShowMessage, messages = [] } = action.payload;

      return {
        ...globalState,
        save: {
          ...globalState.save,
          isShowMessage,
          messages,
        },
      };
    }

    case FETCH_GET_SCREENER_ITEMS_DATA:
      const { totalRecords, totalPage } = action.payload;
      const listScreenerDataTicker = action.payload.listScreenerData.map(
        item => item.stockScreenerItem.organCode,
      );
      const listObjectScreenerDataByTicker = _.keyBy(
        action.payload.listScreenerData,
        'stockScreenerItem.organCode',
      );
      return {
        ...globalState,
        listScreenerDataTicker,
        listObjectScreenerDataByTicker,
        totalRecords,
        totalPage,
        page: DEFAULT_PAGE_LOAD,
        listHideColumn: action.payload.listHideColumn,
      };

    case CHANGE_WATCH_LIST:
      const comGroupCode = action.payload.watchListId;
      return { ...globalState, comGroupCode };

    case CHANGE_SECTOR:
      const icbCode = action.payload.sectorId;
      return { ...globalState, icbCode };

    case CHANGE_CRITERIA:
      const criteria = action.payload.criteria;
      return { ...globalState, criteria };

    case CHANGE_RANGE:
      const { parameters } = action.payload;
      return { ...globalState, parameters };

    case LOAD_MORE_DATA:
      const listScreenerDataTickerMore = action.payload.listScreenerDataMore.map(
        item => item.stockScreenerItem.organCode,
      );
      const listObjectScreenerDataByTickerMore = _.keyBy(
        action.payload.listScreenerDataMore,
        'stockScreenerItem.organCode',
      );

      return {
        ...globalState,
        listScreenerDataTicker: [
          ...globalState.listScreenerDataTicker,
          ...listScreenerDataTickerMore,
        ],
        listObjectScreenerDataByTicker: {
          ...globalState.listObjectScreenerDataByTicker,
          ...listObjectScreenerDataByTickerMore,
        },
        page: action.payload.page,
      };

    case SUBSCRIBE_REALTIME_TICK:
      const listObjectScreenerDataByTickerNew = {
        ...globalState.listObjectScreenerDataByTicker,
      };
      action.payload.data.forEach(item => {
        if (listObjectScreenerDataByTickerNew[item.organCode]) {
          const tickerItem = {
            ...listObjectScreenerDataByTickerNew[item.organCode],
          };

          if (tickerItem) {
            tickerItem.volume = item.totalMatchVolume;
            tickerItem.price = item.matchPrice;
            tickerItem.percentPriceChange = item.percentPriceChange;
            tickerItem.tradingDate = item.tradingDate;
            tickerItem.performance.percentPriceChange1Day =
              item.percentPriceChange;
          }
          listObjectScreenerDataByTickerNew[item.organCode] = tickerItem;
        }
      });
      return {
        ...globalState,
        listObjectScreenerDataByTicker: listObjectScreenerDataByTickerNew,
      };

    case FETCH_MY_WATCH_LIST:
      const { listCompany, listSector = [] } = action.payload;

      const listWatchList = listCompany ? [...listCompany] : [];

      const listWatchListId = listWatchList.map(item =>
        getDataFollowKeyByDot(item, Const.watchList.CODE),
      );

      const listWatchListByWatchListId = keyBy(
        listWatchList,
        Const.watchList.CODE,
      );

      const listIndustry = listSector.map(item =>
        getDataFollowKeyByDot(item, Const.watchList.CODE),
      );
      const listIndustryByKey = keyBy(listSector, Const.watchList.CODE);

      return {
        ...globalState,
        listWatchListId,
        listWatchListByWatchListId,
        listIndustry,
        listIndustryByKey,
      };

    case FETCH_SCREENER_PARAMETERS:
      return {
        ...globalState,
        listParam: action.payload.items,
      };

    case FETCH_USER_SCREENER:
      return {
        ...globalState,
        userScreener: action.payload.items,
      };

    case FETCH_TOP_SCREENER:
      return {
        ...globalState,
        topScreener: action.payload.items,
      };

    case SET_LOADING:
      return {
        ...globalState,
        isLoading: action.payload,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...globalState,
        component: action.payload,
      };

    case CHANGE_SCREENER:
      return {
        ...globalState,
        activeScreener: action.payload.activeScreener,
        comGroupCode: action.payload.comGroupCode,
        icbCode: action.payload.icbCode,
        parameters: action.payload.parameters,
        activeScreenerName: action.payload.activeScreenerName,
        criteria: action.payload.criteria,
      };
    case GET_INDUSTRY: {
      const { listSector } = action.payload;
      const icbLevelHardCode = 3;
      const listSectorSorted = listSector.filter(
        industry => industry.icbLevel === icbLevelHardCode,
      );
      return {
        ...globalState,
        listSector,
      };
    }

    default:
      return globalState;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
