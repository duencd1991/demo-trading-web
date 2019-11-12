import reducerRegistry from './../../helpers/ReducerRegistry';
import financialAnalysisService from '../../../core/services/Fundamental/FinancialAnalysisService';
import snapShotService from '../../../core/services/Fundamental/SnapShotService';
import masterService from '../../../core/services/Common/MasterService';
import priceDataService from '../../../core/services/Prices/PriceData/PriceDataService';

import { formatTextFloat } from '../../helpers/Text';
import {
  formatComGroupCode,
  getDataFollowKeyByDot,
  checkIsBank,
} from './../../helpers/Common';

import Const from './Const';
import { fetchListDataCheckup } from './tab-content/FACheckup/helper';

const REDUCER_NAME = 'FINANCIAL_ANALYSIS:';
const SET_UP_LIST_DATA = `${REDUCER_NAME}SET_UP_LIST_DATA`;
const SET_FETCHING_FR = `${REDUCER_NAME}SET_FETCHING_FR`;
// FR => financial Ratio
const SET_FETCHING_ZMF = `${REDUCER_NAME}SET_FETCHING_ZMF`;
// ZMF => ZMF Score
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const FETCH_ZMF_SCORE = `${REDUCER_NAME}FETCH_ZMF_SCORE`;
const FETCH_FINANCIAL_RATIO = `${REDUCER_NAME}FETCH_FINANCIAL_RATIO`;
const FETCH_FA_CHECKUP = `${REDUCER_NAME}FETCH_FA_CHECKUP`;
const CHANGE_COLUMN_COMPARING_CHECKUP = `${REDUCER_NAME}CHANGE_COLUMN_COMPARING_CHECKUP`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const SET_CONDITION = `${REDUCER_NAME}SET_CONDITION`;
const RESET_CONDITION = `${REDUCER_NAME}RESET_CONDITION`;
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;
const GET_TOP_CONTENT = `${REDUCER_NAME}GET_TOP_CONTENT`;
const SUBSCRIBE_REAL_TIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REAL_TIME_DATA_TICK`;
const RESET_REAL_TIME_DATA = `${REDUCER_NAME}RESET_REAL_TIME_DATA`;
const GET_COMPANY_SCORE = `${REDUCER_NAME}GET_COMPANY_SCORE`;
const GET_INDUSTRY = `${REDUCER_NAME}GET_INDUSTRY`;
const DELETE_ID = `${REDUCER_NAME}DELETE_ID`;

export { REDUCER_NAME, reducer as default, changeColumnComparingCheckup };

export const setUpData = id => {
  return dispatch => {
    dispatch({
      type: SET_UP_LIST_DATA,
      payload: {
        id,
      },
    });
  };
};

export const setFetchingFR = (status = true, id) => dispatch => {
  dispatch({
    type: SET_FETCHING_FR,
    payload: {
      frStatus: status,
      frId: id,
    },
  });
};

export const setFetchingZMF = (status = true, id) => {
  return {
    type: SET_FETCHING_ZMF,
    payload: {
      zmfStatus: status,
      zmfId: id,
    },
  };
};

export const removeComponent = id => {
  return dispatch => {
    dispatch({
      type: DELETE_ID,
      payload: {
        id,
      },
    });
  };
};

export const subscribeRealTimeTick = (id, data, code) => {
  return dispatch => {
    const result = data.find(bidAsk => bidAsk.organCode === code);
    if (result) {
      dispatch({
        type: SUBSCRIBE_REAL_TIME_DATA_TICK,
        payload: {
          result,
          realTimeId: id,
        },
      });
    }
  };
};

export const fetchCompanyScore = (id, code) => {
  return dispatch => {
    snapShotService.getCompanyScore({ OrganCode: code }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_COMPANY_SCORE,
        payload: {
          companyScoreId: id,
          companyScore: items && items.length ? items[0] : {},
        },
      });
    });
  };
};

export const fetchIndustryData = () => {
  return dispatch => {
    masterService.getAllIcbIndustry().then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_INDUSTRY,
        payload: {
          listIndustry: items && items.length ? items : [],
        },
      });
    });
  };
};

export const fetchInfoTicker = (id, code) => {
  return dispatch => {
    priceDataService.getLatestPrice({ Code: code }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_TOP_CONTENT,
        payload: {
          topContentId: id,
          topContent: items && items.length ? items[0] : {},
        },
      });
    });
  };
};

export const fetchZMFScore = (id, params) => dispatch => {
  dispatch(setFetchingZMF(true, id));
  financialAnalysisService.getZMFScore(params).then(response => {
    const { items = [] } = response;
    dispatch({
      type: FETCH_ZMF_SCORE,
      payload: {
        ZMFDataId: id,
        ZMFScoreData: items && items.length ? items[0] : {},
      },
    });
  });
};

export const fetchFinancialRatio = (id, params) => dispatch => {
  dispatch(setFetchingFR(true, id));
  financialAnalysisService.getFinancialRatio(params).then(response => {
    const { items = [] } = response;
    dispatch({
      type: FETCH_FINANCIAL_RATIO,
      payload: {
        financialRatioDataId: id,
        financialRatioData: items && items.length ? items[0] : {},
      },
    });
  });
};

function changeColumnComparingCheckup(params, isBanking, componentId) {
  return {
    type: CHANGE_COLUMN_COMPARING_CHECKUP,
    payload: {
      changeColumnCompare: params,
      isBanking,
      componentId,
    },
  };
}

export const fetchFACheckup = (id, params, isBanking) => dispatch => {
  financialAnalysisService.getFACheckup(params).then(response => {
    if (response && response.items) {
      dispatch({
        type: FETCH_FA_CHECKUP,
        payload: {
          componentId: id,
          isBanking: isBanking,
          data: response.items.length > 0 ? response.items[0] : {},
        },
      });
    }
  });
};

export const setCondition = (id, value) => {
  const { code, displayCode, codeName, exchange, comTypeCode } = value;
  return (dispatch, getState) => {
    dispatch({
      type: SET_CONDITION,
      payload: {
        conditionId: id,
        value: code,
        displayCode,
        companyName: codeName,
        codeExchange: exchange,
        comTypeCode,
      },
    });

    dispatch(fetchInfoTicker(id, code));
    dispatch(fetchCompanyScore(id, code));
    const currentTab = getState()[REDUCER_NAME].currentTab;
    if (currentTab === 1) {
      dispatch(
        fetchFACheckup(id, { OrganCode: code }, checkIsBank(comTypeCode)),
      );
    }
    if (currentTab === 2) {
      dispatch(fetchFinancialRatio(id, { OrganCode: code }));
    }
    if (currentTab === 3) {
      dispatch(fetchZMFScore(id, { OrganCode: code }));
    }

    dispatch({
      type: RESET_REAL_TIME_DATA,
      payload: {
        reaTimeResetId: id,
      },
    });
  };
};

export const resetCondition = () => {
  return dispatch => {
    dispatch({
      type: RESET_CONDITION,
      payload: {},
    });
  };
};

export const changeTab = tabNumber => {
  return dispatch => {
    dispatch({
      type: CHANGE_TAB,
      payload: {
        tabNumber,
      },
    });
  };
};

export const fetchListSearch = () => {
  return dispatch => {
    const promises = [masterService.getListOrganization()];
    Promise.all(promises).then(([{ items: listTicker = [] }]) => {
      dispatch({
        type: FETCH_LIST_SEARCH,
        payload: {
          listTicker,
        },
      });
    });
  };
};

const initialState = {
  currentTab: 1,
  component: {},
  listDataSearch: [],
  listIndustry: {},
  listMultiComponent: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
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

    case SET_UP_LIST_DATA:
      const dataId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            ...state.listMultiComponent[dataId],
            faCheckupData: {
              listColumnTable: [],
              listFaCheckupByTicker: {},
              listTickerFACheckup: [],
              listLookupItems: [],
              yearReport: '',
              listDataCheckup: {},
            },
            ZMFScoreData: {},
            financialRatioData: {
              ratios: [],
            },
            topContent: {},
            topContentRealTime: {},
            companyScore: {},
            searchParams: {
              displayCode: 'AAA',
              code: 'AAA',
              companyName: 'An Phat Plastic / VNINDEX',
              isBanking: false,
            },
            isFetching: true,
          },
        },
      };

    case GET_INDUSTRY:
      const { listIndustry } = action.payload;
      const icbLevelHardCode = 3;
      const listIndustrySorted = listIndustry.filter(
        industry => industry.icbLevel === icbLevelHardCode,
      );
      return {
        ...state,
        listIndustry: listIndustrySorted,
      };

    case GET_COMPANY_SCORE:
      const { companyScore, companyScoreId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [companyScoreId]: {
            ...state.listMultiComponent[companyScoreId],
            companyScore,
          },
        },
      };

    case SUBSCRIBE_REAL_TIME_DATA_TICK:
      const { result, realTimeId } = action.payload;
      const topContentRealTime = {
        MatchPrice: getDataFollowKeyByDot(
          result,
          Const.realTimeData.MATCH_PRICE,
        ),
        PriceChange: getDataFollowKeyByDot(
          result,
          Const.realTimeData.PRICE_CHANGE,
        ),
        PercentPriceChange: getDataFollowKeyByDot(
          result,
          Const.realTimeData.PERCENT_PRICE_CHANGE,
        ),
        ReferencePrice: getDataFollowKeyByDot(
          result,
          Const.realTimeData.REFERENCE_PRICE,
        ),
        TradingDate: getDataFollowKeyByDot(
          result,
          Const.realTimeData.TRADING_DATE,
        ),
      };

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [realTimeId]: {
            ...state.listMultiComponent[realTimeId],
            topContentRealTime,
          },
        },
      };

    case RESET_REAL_TIME_DATA:
      const { reaTimeResetId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [reaTimeResetId]: {
            ...state.listMultiComponent[reaTimeResetId],
            topContentRealTime: {},
          },
        },
      };

    case CHANGE_TAB:
      const { tabNumber } = action.payload;
      return {
        ...state,
        currentTab: tabNumber,
      };

    case GET_TOP_CONTENT:
      const {
        topContent: { priceInfo },
        topContentId,
      } = action.payload;
      const MatchPrice = priceInfo ? priceInfo.matchPrice : null;
      const PriceChange = priceInfo ? priceInfo.priceChange : null;
      const PercentPriceChange = priceInfo
        ? priceInfo.percentPriceChange
        : null;
      const ReferencePrice = priceInfo ? priceInfo.referencePrice : null;

      const topContent = {
        MatchPrice,
        PriceChange,
        PercentPriceChange,
        ReferencePrice,
      };

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [topContentId]: {
            ...state.listMultiComponent[topContentId],
            topContent,
          },
        },
      };

    case FETCH_ZMF_SCORE:
      const {
        ZMFScoreData: { scorings = [] },
        ZMFDataId,
      } = action.payload;

      const zData = scorings
        .map(item => {
          return {
            y: item.yearReport,
            x: item.zScore,
            title: formatTextFloat(item.zScore),
          };
        })
        .sort((a, b) => a.y - b.y);

      const mData = scorings
        .map(item => {
          return {
            y: item.yearReport,
            x: item.mScore,
            title: formatTextFloat(item.mScore),
          };
        })
        .sort((a, b) => a.y - b.y);

      const fData = scorings
        .map(item => {
          return {
            y: item.yearReport,
            x: item.fScore,
            title: formatTextFloat(item.fScore),
          };
        })
        .sort((a, b) => a.y - b.y);

      const ZMFScoreData = {
        zData,
        mData,
        fData,
        isLoading: false,
      };

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [ZMFDataId]: {
            ...state.listMultiComponent[ZMFDataId],
            ZMFScoreData,
          },
        },
      };

    case SET_FETCHING_ZMF:
      const { zmfId, zmfStatus } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [zmfId]: {
            ...state.listMultiComponent[zmfId],
            ZMFScoreData: {
              ...state.listMultiComponent[zmfId].ZMFScoreData,
              isLoading: zmfStatus,
            },
          },
        },
      };

    case FETCH_FINANCIAL_RATIO:
      const { financialRatioDataId, financialRatioData } = action.payload;
      const fetchedData = {
        ...financialRatioData,
        isLoading: false,
      };
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [financialRatioDataId]: {
            ...state.listMultiComponent[financialRatioDataId],
            financialRatioData: fetchedData,
          },
        },
      };

    case SET_FETCHING_FR:
      const { frId, frStatus } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [frId]: {
            ...state.listMultiComponent[frId],
            financialRatioData: {
              ...state.listMultiComponent[frId].financialRatioData,
              isLoading: frStatus,
            },
          },
        },
      };

    case CHANGE_COLUMN_COMPARING_CHECKUP: {
      const { changeColumnCompare, isBanking, componentId } = action.payload;

      const positionCompareItem = changeColumnCompare.positionCompareItem;
      const tickerCheckedOld = changeColumnCompare.tickerCheckedOld;
      const tickerChecked = changeColumnCompare.tickerChecked;

      const { listDataCheckup } = {
        ...state.listMultiComponent[componentId].faCheckupData,
      };

      listDataCheckup.comparingCheckupItems.map((item, index) => {
        if (item.ticker === tickerCheckedOld && index === positionCompareItem) {
          const newCompareItem = listDataCheckup.lookupItems.find(
            newItem => newItem.ticker === tickerChecked,
          );
          listDataCheckup.comparingCheckupItems[index] = newCompareItem;
        }
      });

      const {
        listColumnTable,
        listFaCheckupByTicker,
        listTickerFACheckup,
        listLookupItems,
        yearReport,
      } = fetchListDataCheckup(listDataCheckup, isBanking);

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            faCheckupData: {
              ...state.listMultiComponent[componentId].faCheckupData,
              listColumnTable,
              listFaCheckupByTicker,
              listTickerFACheckup,
              listLookupItems,
              yearReport,
            },
          },
        },
      };
    }
    case FETCH_FA_CHECKUP:
      const { componentId, isBanking, data: listDataCheckup } = action.payload;
      const {
        listColumnTable,
        listFaCheckupByTicker,
        listTickerFACheckup,
        listLookupItems,
        yearReport,
      } = fetchListDataCheckup(listDataCheckup, isBanking);

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            faCheckupData: {
              ...state.listMultiComponent[componentId].faCheckupData,
              listColumnTable,
              listFaCheckupByTicker,
              listTickerFACheckup,
              listLookupItems,
              yearReport,
              listDataCheckup,
            },
          },
        },
      };
    case FETCH_LIST_SEARCH:
      const { listTicker } = action.payload;

      const listDataSearch = [];

      listTicker.forEach(item => {
        listDataSearch.push({
          displayCode: getDataFollowKeyByDot(item, Const.listTicker.TICKER),
          code: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_CODE),
          codeName: getDataFollowKeyByDot(
            item,
            Const.listTicker.ORGAN_SHORT_NAME,
          ),
          exchange: formatComGroupCode(
            getDataFollowKeyByDot(item, Const.listTicker.COM_GROUP_CODE),
          ),
          comTypeCode: getDataFollowKeyByDot(
            item,
            Const.listTicker.COM_TYPE_CODE,
          ),
        });
      });
      return {
        ...state,
        listDataSearch,
      };

    case SET_CONDITION:
      const {
        value,
        displayCode,
        companyName,
        codeExchange,
        conditionId,
        comTypeCode,
      } = action.payload;

      const customCompanyName =
        companyName.length > 16
          ? `${companyName.substring(0, 16)}...`
          : companyName;
      const searchParams = {
        code: value,
        displayCode,
        companyName: `${customCompanyName} / ${codeExchange}`,
        isBanking: checkIsBank(comTypeCode),
      };
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [conditionId]: {
            ...state.listMultiComponent[conditionId],
            searchParams,
          },
        },
      };

    case RESET_CONDITION:
      return {
        ...state,
        // searchParams: {},
      };
    case CHANGE_SIZE_COMPONENT:
      const { width, height } = action.payload;
      const componentSizeId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentSizeId]: {
            ...state.listMultiComponent[componentSizeId],
            component: {
              width,
              height,
            },
          },
        },
        component: action.payload,
      };
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
