import {
  formatComGroupCode,
  getDataFollowKeyByDot,
} from './../../helpers/Common';
import reducerRegistry from './../../helpers/ReducerRegistry';
import TimeAndSaleService from '../../../core/services/Prices/TimeAndSale/TimeAndSaleService';
import masterService from '../../../core/services/Common/MasterService';
import priceDataService from './../../../core/services/Prices/PriceData/PriceDataService';
import Const from './Const';

const REDUCER_NAME = 'TIME_AND_SALE:';
const FETCH_DATA_TIME_AND_SALE = `${REDUCER_NAME}FETCH_DATA_TIME_AND_SALE`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const INIT_COMPONENT = `${REDUCER_NAME}INIT_COMPONENT`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const UNMOUNT_COMPONENT = `${REDUCER_NAME}UNMOUNT_COMPONENT`;
const CHANGE_CODE = `${REDUCER_NAME}CHANGE_CODE`;
const GET_TOP_CONTENT = `${REDUCER_NAME}GET_TOP_CONTENT`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;
const RESET_REALTIME_DATA = `${REDUCER_NAME}RESET_REALTIME_DATA`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;

export {
  REDUCER_NAME,
  reducer as default,
  fetchDataTimeAndSale,
  fetchListSearch,
  changeCode,
  fetchInfoTicker,
  subscribeRealtimeTick,
};

function setFetching(status = true, id) {
  return {
    type: SET_FETCHING,
    payload: {
      status,
      id,
    },
  };
}

function subscribeRealtimeTick(data, id) {
  return (dispatch, getState) => {
    const code = getState()[REDUCER_NAME].listMultiComponent[id].condition.code;

    const result = data.find(bidAsk => bidAsk.organCode === code);
    // console.log(result)
    // console.log(code)
    // console.log(data)
    dispatch({
      type: SUBSCRIBE_REALTIME_DATA_TICK,
      payload: {
        result,
        id,
        testCode: code,
      },
    });
  };
}

function fetchInfoTicker(id, defaultCode = '') {
  return (dispatch, getState) => {
    const code =
      defaultCode ||
      getState()[REDUCER_NAME].listMultiComponent[id].condition.code;
    priceDataService.getLatestPrice({ Code: code }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_TOP_CONTENT,
        payload: {
          topContent: items && items.length ? items[0] : {},
          id,
        },
      });
    });
  };
}

function changeCode(data, id, isFetchData = true) {
  const { isDerivatives = false, displayCode, code, codeName, exchange } = data;
  return dispatch => {
    dispatch({
      type: CHANGE_CODE,
      payload: {
        displayCode,
        code,
        companyName: codeName,
        isDerivatives,
        codeExchange: exchange,
        id,
      },
    });
    if (isFetchData) {
      dispatch(fetchDataTimeAndSale({ Code: data.code }, id));
      dispatch(fetchInfoTicker(id));
      dispatch({
        type: RESET_REALTIME_DATA,
        payload: {
          id,
        },
      });
    }
  };
}

function fetchDataTimeAndSale(params, id) {
  const formatParams = formatedParams(params);
  return dispatch => {
    dispatch(setFetching(true, id));
    TimeAndSaleService.getTimeAndSale(formatParams).then(response => {
      const { items = [] } = response;
      dispatch({
        type: FETCH_DATA_TIME_AND_SALE,
        payload: {
          timeAndSaleData: items && items.length ? items[0] : {},
          id,
        },
      });
      dispatch(setFetching(false, id));
    });
  };
}

function fetchListSearch() {
  return dispatch => {
    const promises = [
      masterService.getListOrganization(),
      masterService.getAllCompanyGroup(),
      masterService.getAllDerivatives(),
    ];
    Promise.all(promises).then(
      ([
        { items: listTicker = [] },
        { items: listIndex = [] },
        { items: listDerivatives = [] },
      ]) => {
        dispatch({
          type: FETCH_LIST_SEARCH,
          payload: {
            listTicker,
            listIndex,
            listDerivatives,
          },
        });
      },
    );
  };
}

function formatedParams(params) {
  const { Code } = params;
  return {
    Code: Code || 'AAA',
  };
}
const initialState = {
  listDataSearch: [],
  listMultiComponent: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UNMOUNT_COMPONENT:
      const delId = action.payload.id;
      const cloneListComponent = { ...state.listMultiComponent };
      const { [delId]: _, ...withoutDeleteKey } = cloneListComponent;
      return {
        ...state,
        listMultiComponent: withoutDeleteKey,
      };

    case FETCH_DATA_TIME_AND_SALE:
      const { timeAndSaleData, id } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [id]: {
            ...state.listMultiComponent[id],
            timeAndSaleData,
          },
        },
      };
    case CHANGE_SIZE_COMPONENT: {
      const { id: componentId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            component: action.payload,
          },
        },
      };
    }
    case INIT_COMPONENT:
      const dataId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            ...state.listMultiComponent[dataId],
            timeAndSaleData: {},
            condition: {
              displayCode: 'AAA',
              code: 'AAA',
              companyName: 'An Phat Plastic / VNINDEX',
              isDerivatives: false,
            },
            topContent: {},
            topContentRealTime: {},
            isFetching: false,
          },
        },
      };
    case FETCH_LIST_SEARCH:
      const { listTicker, listDerivatives } = action.payload;
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
        });
      });

      listDerivatives.forEach(item => {
        const code = getDataFollowKeyByDot(
          item,
          Const.listDerivatives.DERIVATIVE_CODE,
        );
        const codeName = getDataFollowKeyByDot(
          item,
          Const.listDerivatives.DERIVATIVE_NAME,
        );
        const exchange = formatComGroupCode(
          getDataFollowKeyByDot(item, Const.listDerivatives.COM_GROUP_CODE),
        );
        const isDerivatives = true;

        listDataSearch.push({
          displayCode: code,
          code,
          codeName,
          exchange,
          isDerivatives,
        });
      });

      return {
        ...state,
        listDataSearch,
      };
    case CHANGE_CODE:
      const {
        displayCode,
        code,
        id: componentId,
        companyName,
        isDerivatives,
        codeExchange,
      } = action.payload;
      let tickerNameAndExchange = '';
      if (codeExchange === Const.listIndexName.vnIndex) {
        tickerNameAndExchange = Const.listIndexExchange.hose;
      }
      if (codeExchange === Const.listIndexName.hnIndex) {
        tickerNameAndExchange = Const.listIndexExchange.hnx;
      }
      if (codeExchange === Const.listIndexName.upcomIndex) {
        tickerNameAndExchange = Const.listIndexExchange.upcom;
      }

      if (
        codeExchange !== Const.listIndexName.vnIndex ||
        codeExchange !== Const.listIndexName.hnIndex ||
        codeExchange !== Const.listIndexName.upcomIndex
      ) {
        tickerNameAndExchange = codeExchange;
      }

      let customCompanyName =
        companyName.length > 16
          ? `${companyName.substring(0, 16)}...`
          : companyName;

      const listMultiComponent = {
        ...state.listMultiComponent,
        [componentId]: {
          ...state.listMultiComponent[componentId],
          condition: {
            ...state.listMultiComponent[componentId].condition,
            displayCode,
            code,
            companyName: isDerivatives
              ? ''
              : `${customCompanyName} / ${tickerNameAndExchange.toUpperCase()}`,
            isDerivatives,
          },
        },
      };
      return {
        ...state,
        listMultiComponent,
      };
    case GET_TOP_CONTENT:
      const {
        topContent: { bidAskInfo, priceInfo },
        id: compoId,
      } = action.payload;
      // const {Best1Bid, Best1Offer} = BidAskInfo
      const Best1Bid = bidAskInfo ? bidAskInfo.best1Bid : null;
      const Best1Offer = bidAskInfo ? bidAskInfo.best1Offer : null;

      // const {OpenPrice, HighestPrice, LowestPrice, MatchPrice, PriceChange, PercentPriceChange, ReferencePrice} = PriceInfo
      const OpenPrice = priceInfo ? priceInfo.openPrice : null;
      const HighestPrice = priceInfo ? priceInfo.highestPrice : null;
      const LowestPrice = priceInfo ? priceInfo.lowestPrice : null;
      const MatchPrice = priceInfo ? priceInfo.matchPrice : null;
      const PriceChange = priceInfo ? priceInfo.priceChange : null;
      const PercentPriceChange = priceInfo
        ? priceInfo.percentPriceChange
        : null;
      const ReferencePrice = priceInfo ? priceInfo.referencePrice : null;

      const topContent = {
        Bid: Best1Bid,
        Ask: Best1Offer,
        OpenPrice,
        HighestPrice,
        LowestPrice,
        MatchPrice,
        PriceChange,
        PercentPriceChange,
        ReferencePrice,
      };

      const cloneListMultiComponent = {
        ...state.listMultiComponent,
        [compoId]: {
          ...state.listMultiComponent[compoId],
          topContent,
        },
      };
      return {
        ...state,
        listMultiComponent: cloneListMultiComponent,
      };
    case SUBSCRIBE_REALTIME_DATA_TICK:
      const { result: resultTick, id: updateTickId, Code } = action.payload;
      if (resultTick) {
        const {
          openPrice: OpenPrice,
          highestPrice: HighestPrice,
          lowestPrice: LowestPrice,
          matchPrice: MatchPrice,
          priceChange: PriceChange,
          percentPriceChange: PercentPriceChange,
          referencePrice: ReferencePrice,
          tradingDate: TradingDate,
          best1Bid: Best1Bid,
          best1Offer: Best1Offer,
        } = resultTick;

        const topContentRealTime = {
          OpenPrice,
          HighestPrice,
          LowestPrice,
          MatchPrice,
          PriceChange,
          PercentPriceChange,
          ReferencePrice,
          Bid: Best1Bid,
          Ask: Best1Offer,
          TradingDate,
        };
        const updateRealtimeTick = {
          ...state.listMultiComponent,
          [updateTickId]: {
            ...state.listMultiComponent[updateTickId],
            topContentRealTime,
            timeAndSaleData: {
              ...state.listMultiComponent[updateTickId].timeAndSaleData,
              matches: [
                ...[resultTick],
                ...state.listMultiComponent[updateTickId].timeAndSaleData
                  .matches,
              ],
            },
          },
        };

        return {
          ...state,
          listMultiComponent: updateRealtimeTick,
        };
      }

      return {
        ...state,
      };
    case RESET_REALTIME_DATA:
      const resetId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [resetId]: {
            ...state.listMultiComponent[resetId],
            topContentRealTime: {},
          },
        },
      };
    case SET_FETCHING:
      const { id: fetchingId, status } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [fetchingId]: {
            ...state.listMultiComponent[fetchingId],
            isFetching: status,
          },
        },
      };
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
