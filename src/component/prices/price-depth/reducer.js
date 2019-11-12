import reducerRegistry from './../../helpers/ReducerRegistry';
import priceDepthService from '../../../core/services/Prices/PriceDepth/PriceDepthService';
import masterService from '../../../core/services/Common/MasterService';

import {
  formatComGroupCode,
  getDataFollowKeyByDot,
} from '../../helpers/Common';
import Const from './Const';

const REDUCER_NAME = 'PRICE_DEPTH_:';
const FETCH_DATA_PRICE_DEPTH = `${REDUCER_NAME}FETCH_DATA_PRICE_DEPTH`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const SET_CONDITION = `${REDUCER_NAME}SET_CONDITION`;
const INIT_COMPONENT = `${REDUCER_NAME}INIT_COMPONENT`;
const FETCH_LIST_SEARCH = `${REDUCER_NAME}FETCH_LIST_SEARCH`;
const SUBSCRIBE_REALTIME_DATA_BIDASK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_BIDASK`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;
const UNMOUNT_COMPONENT = `${REDUCER_NAME}UNMOUNT_COMPONENT`;
const RESET_REALTIME_DATA = `${REDUCER_NAME}RESET_REALTIME_DATA`;

export {
  REDUCER_NAME,
  reducer as default,
  fetchDataPriceDepth,
  setCondition,
  fetchListSearch,
  subscribeRealtimeBidAsk,
  subscribeRealtimeTick,
};

function subscribeRealtimeTick(data, code, id) {
  const result = data.find(bidAsk => bidAsk.organCode === code);

  // fake realtime code

  // console.log(result)
  // const randomNumber = Math.floor(Math.random() * Math.floor(100))
  // const fakeResult = {
  //     "stockId":18241339,
  //     "organCode":"AAA",
  //     "ticker":"AAA",
  //     // "tradingDate":"2019-04-10T14:28:40",
  //     "tradingDate": randomNumber,
  //     "ceilingPrice":33500,
  //     "floorPrice":27500,
  //     "referencePrice":30500  + randomNumber,
  //     "referenceDate":"2019-04-10T09:00:27.703",
  //     "openPrice":30300 + randomNumber,
  //     "closePrice":0,
  //     "matchPrice":30300  + randomNumber,
  //     "priceChange":-200,
  //     "percentPriceChange":-0.006557377,
  //     "highestPrice":30500,
  //     "lowestPrice":30200  + randomNumber,
  //     "averagePrice":0,
  //     "matchVolume":2000,
  //     "matchValue":60600000,
  //     "totalMatchVolume":814174,
  //     "totalMatchValue":24762096900,
  //     "totalDealVolume":0,
  //     "totalDealValue":0,
  //     "totalVolume":814174,
  //     "totalValue":24762096900,
  //     "foreignBuyValueMatched":0,
  //     "foreignBuyVolumeMatched":0,
  //     "foreignSellValueMatched":0,
  //     "foreignSellVolumeMatched":0,
  //     "foreignBuyValueDeal":0,
  //     "foreignBuyVolumeDeal":0,
  //     "foreignSellValueDeal":0,
  //     "foreignSellVolumeDeal":0,
  //     "foreignBuyValueTotal":0,
  //     "foreignBuyVolumeTotal":0,
  //     "foreignSellValueTotal":0,
  //     "foreignSellVolumeTotal":0,
  //     "foreignTotalRoom":0,
  //     "foreignCurrentRoom":0,
  //     "dealVolume":0,
  //     "dealValue":0,
  //     "dealPrice":0,
  //     "best1Bid":0,
  //     "best1BidVolume":0,
  //     "best1Offer":0,
  //     "best1OfferVolume":0,
  //     "matchType":0
  // }
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      // result: fakeResult,
      result,
      id,
    },
  };
}

function subscribeRealtimeBidAsk(data, code, id) {
  const result = data.find(bidAsk => bidAsk.organCode === code);
  return {
    type: SUBSCRIBE_REALTIME_DATA_BIDASK,
    payload: {
      result,
      id,
    },
  };
}

function setCondition(value, id) {
  const { isDerivatives = false, code, displayCode } = value;
  return dispatch => {
    dispatch({
      type: SET_CONDITION,
      payload: {
        value: code,
        displayCode,
        conditionId: id,
        companyName: value.codeName,
        codeExchange: value.exchange,
        isDerivatives,
      },
    });

    dispatch({
      type: RESET_REALTIME_DATA,
      payload: {
        value: value.code,
        id,
      },
    });
  };
}

function fetchDataPriceDepth(params, id) {
  const formatParams = formattedParams(params);
  return dispatch => {
    dispatch(setFetching());
    priceDepthService.getPriceDepth(formatParams).then(response => {
      dispatch(setFetching(false));
      const { items } = response;
      dispatch({
        type: FETCH_DATA_PRICE_DEPTH,
        payload: {
          priceDepthData: items && items.length ? items[0] : {},
          componentId: id,
        },
      });
    });
  };
}

function formattedParams(params) {
  let { code } = params;
  return {
    Code: code || 'AAA',
  };
}

function setFetching(payload = true) {
  return {
    type: SET_FETCHING,
    payload,
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

const initialState = {
  isFetching: false,
  listMultiComponent: {},
  listMultiCondition: {},
  listDataSearch: [],
  code: Const.defaultCode,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case FETCH_DATA_PRICE_DEPTH:
      const { priceDepthData, componentId } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            priceDepthData: { ...priceDepthData },
          },
        },
      };
    case UNMOUNT_COMPONENT:
      const delId = action.payload.id;
      const cloneListComponent = { ...state.listMultiComponent };
      const { [delId]: _, ...withoutDeleteKey } = cloneListComponent;
      return {
        ...state,
        listMultiComponent: withoutDeleteKey,
      };
    case SET_CONDITION:
      const {
        value,
        displayCode,
        conditionId,
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

      const clone = {
        ...state.listMultiCondition,
        [conditionId]: {
          ...state.listMultiCondition[conditionId],
          condition: {
            ...state.listMultiCondition[conditionId].condition,
            code: value,
            displayCode,
            companyName: isDerivatives
              ? ''
              : `${customCompanyName} / ${tickerNameAndExchange}`,
            isDerivatives,
          },
        },
      };
      return {
        ...state,
        listMultiCondition: clone,
      };
    case INIT_COMPONENT:
      const dataId = action.payload.id;
      return {
        ...state,
        listMultiCondition: {
          ...state.listMultiCondition,
          [dataId]: {
            condition: {
              code: Const.defaultCode,
              displayCode: Const.defaultCode,
              companyName: `${Const.defaultCodeName} / VNINDEX`,
              isDerivatives: false,
            },
          },
        },
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            isFetching: false,
            priceDepthData: {},
            realTimeData: {},
          },
        },
      };

    case FETCH_LIST_SEARCH:
      const { listTicker, listDerivatives } = action.payload;
      const listDataSearch = [];

      listTicker &&
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

      listDerivatives &&
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
    case SUBSCRIBE_REALTIME_DATA_BIDASK:
      const { result, id } = action.payload;
      if (result) {
        const LIST_10_DATA = Const.realTimeData.LIST_10_DATA.map((_, index) => {
          return {
            BID: getDataFollowKeyByDot(
              result,
              Const.realTimeData.LIST_10_DATA[index].BID,
            ),
            BID_VOLUME: getDataFollowKeyByDot(
              result,
              Const.realTimeData.LIST_10_DATA[index].BID_VOLUME,
            ),
            ASK: getDataFollowKeyByDot(
              result,
              Const.realTimeData.LIST_10_DATA[index].ASK,
            ),
            ASK_VOLUME: getDataFollowKeyByDot(
              result,
              Const.realTimeData.LIST_10_DATA[index].ASK_VOLUME,
            ),
          };
        });

        return {
          ...state,
          listMultiComponent: {
            ...state.listMultiComponent,
            [id]: {
              ...state.listMultiComponent[id],
              realTimeData: {
                ...state.listMultiComponent[id].realTimeData,
                LIST_10_DATA,
                symbolInformation: {
                  ...state.listMultiComponent[id].realTimeData
                    .symbolInformation,
                  BID: getDataFollowKeyByDot(result, Const.realTimeData.BID),
                  ASK: getDataFollowKeyByDot(result, Const.realTimeData.ASK),
                },
              },
            },
          },
        };
      }
    case SUBSCRIBE_REALTIME_DATA_TICK:
      const rs = action.payload.result;
      const cId = action.payload.id;
      if (rs) {
        const indexInfo = {
          MatchPrice: getDataFollowKeyByDot(rs, Const.realTimeData.MATCH_PRICE),
          PriceChange: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.PRICE_CHANGE,
          ),
          PercentPriceChange: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.PERCENT_PRICE_CHANGE,
          ),
          OPEN_PRICE: getDataFollowKeyByDot(rs, Const.realTimeData.OPEN_PRICE),
          HIGHEST_PRICE: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.HIGHEST_PRICE,
          ),
          LOWEST_PRICE: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.LOWEST_PRICE,
          ),
          ReferencePrice: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.REFERENCE_PRICE,
          ),
          TradingDate: getDataFollowKeyByDot(
            rs,
            Const.realTimeData.TRADING_DATE,
          ),
        };

        return {
          ...state,
          listMultiComponent: {
            ...state.listMultiComponent,
            [cId]: {
              ...state.listMultiComponent[cId],
              realTimeData: {
                ...state.listMultiComponent[cId].realTimeData,
                symbolInformation: {
                  ...state.listMultiComponent[cId].realTimeData
                    .symbolInformation,
                  ...indexInfo,
                },
              },
            },
          },
        };
      }
      return state;
    case RESET_REALTIME_DATA:
      const resetId = action.payload.id;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [resetId]: {
            ...state.listMultiComponent[resetId],
            realTimeData: {},
          },
        },
      };
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
