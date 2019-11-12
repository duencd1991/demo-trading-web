import snapShotService from '../../../core/services/Fundamental/SnapShotService';
import reducerRegistry from '../../helpers/ReducerRegistry';
import masterService from './../../../core/services/Common/MasterService';
import {
  formatPercent,
  formatValueBillion,
  formatValueTrillion,
} from '../../helpers/Text';
import priceDatService from '../../../core/services/Prices/PriceData/PriceDataService';
import Const from './Const';
import { checkIsBank, formatComGroupCode } from '../../helpers/Common';
import { I18n } from 'react-redux-i18n';
import { cloneDeep } from 'lodash';
import request from '../../helpers/Request';
import chartTickerService from '../../../core/services/Market/Watchlist/ChartTickerService';

const REDUCER_NAME = 'FA_SNAPSHOT:';
const SET_UP_DATA = `${REDUCER_NAME}SET_UP_DATA`;
const FETCH_DATA_SNAPSHOT_SUCCESS = `${REDUCER_NAME}FETCH_DATA_SNAPSHOT`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const SET_CURRENT_SEARCH = `${REDUCER_NAME}_SET_CURRENT_SEARCH`;
const FETCH_LATEST_PRICE_SUCCESS = `${REDUCER_NAME}FETCH_LATEST_PRICE_SUCCESS`;
const FETCH_LIST_TICKER = `${REDUCER_NAME}FETCH_LIST_TICKER`;
const SET_LOADING = `${REDUCER_NAME}SET_LOADING`;
const FETCH_COMPANY_SCORE = `${REDUCER_NAME}FETCH_COMPANY_SCORE`;
const CHANGE_FILTER = `${REDUCER_NAME}CHANGE_FILTER`;
const FETCH_LIST_CHART = `${REDUCER_NAME}FETCH_LIST_CHART`;

const _format = require('string-format');
_format.extend(String.prototype, {});
const maxLengthData = 5;
const formatCategory = I18n.t('snapShot.formatCategory');

export {
  REDUCER_NAME,
  reducer as default,
  changeCurrentSearch,
  setUpData,
  fetchCompanyScore,
  changeFilter,
  fetchListChart,
  changeTimeRange,
  subscribeRealtimePrice,
};

function setUpData(componentId, currentSearch) {
  return {
    type: SET_UP_DATA,
    payload: {
      componentId,
      currentSearch,
    },
  };
}

function changeFilter(timeFilter, componentId) {
  return {
    type: CHANGE_FILTER,
    payload: {
      componentId,
      timeFilter,
    },
  };
}

function changeCurrentSearch(payload, id) {
  return (dispatch, getState) => {
    dispatch(fetchDataSnapshotSearch(payload, id));
    dispatch(fetchCompanyScore(payload.code, id));

    const timeRange = getState()[REDUCER_NAME].listMultiComponent[id].timeRange;
    dispatch(fetchListChart(payload, timeRange, id));
  };
}

export const fetchListTicker = () => dispatch => {
  masterService.getListOrganization().then(response => {
    let listSearch = cloneDeep(response.items) || [];
    if (listSearch) {
      listSearch = listSearch.map(item => ({
        displayCode: item.ticker,
        codeName: item.organShortName,
        isBank: checkIsBank(item.comTypeCode),
        exchange: formatComGroupCode(item.comGroupCode),
        code: item.organCode,
        isTicker: true,
      }));
    }

    dispatch({
      type: FETCH_LIST_TICKER,
      payload: listSearch,
    });
  });
};

export const setLoading = (bool = true) => ({
  type: SET_LOADING,
  payload: bool,
});

function formatDataChart(data, isBank) {
  data.map((dataItems, index) => {
    const dataArrQuarterly = dataItems.quarterly;
    dataArrQuarterly.map((dataQuarterly, index) => {
      const dataPrevYear = dataArrQuarterly.filter(
        e =>
          e.year === dataQuarterly.year - 1 &&
          e.quarter === dataQuarterly.quarter,
      );
      caculateDataItem(dataQuarterly, dataPrevYear, isBank);
      dataQuarterly.category = _format(
        formatCategory,
        dataQuarterly.quarter,
        dataQuarterly.year.toString().substr(2),
      );
    });
    dataItems.yearly.map((dataYearly, index) => {
      dataYearly.category = dataYearly.year;
      const dataPrevYear = dataItems.yearly.filter(
        e => e.year === dataYearly.year - 1,
      );
      caculateDataItem(dataYearly, dataPrevYear, isBank);
    });
    // get nearest 5  quarterly or yearly
    orderAndSpliceArray(dataItems.quarterly);
    orderAndSpliceArray(dataItems.yearly);
  });
  return data;
}

function fetchLatestPriceSuccess(latestPrice, currentSearch, componentId) {
  return {
    type: FETCH_LATEST_PRICE_SUCCESS,
    payload: {
      latestPrice,
      currentSearch,
      componentId,
    },
  };
}

export const fetchLatestPrice = (currentSearch, componentId) => dispatch => {
  const params = {
    OrganCode: currentSearch.code,
    Code: currentSearch.code,
  };
  priceDatService.getLatestPrice(params).then(response => {
    const items = response ? response.items : [];
    const latestPrice = items && items.length > 0 ? items[0].priceInfo : {};

    dispatch(fetchLatestPriceSuccess(latestPrice, currentSearch, componentId));
  });
};

export const fetchDataSnapshotSearch = (currentSearch, componentId) => {
  return dispatch => {
    setLoading();
    snapShotService
      .getDataSnapshot({ OrganCode: currentSearch.code })
      .then(response => {
        const listDataSnapShot = cloneDeep(response.items) || [];

        dispatch({
          type: FETCH_DATA_SNAPSHOT_SUCCESS,
          payload: {
            listDataSnapShot,
            componentId,
            currentSearch,
          },
        });
      });
  };
};

function caculateDataItem(arrData, arrDataPrev, isBank) {
  if (arrDataPrev.length > 0) {
    arrData.netProfitGrowth = caculateGrowth(
      arrData,
      arrDataPrev[0],
      1,
      'isa22',
    );
    arrData.totalAssetGrowth = caculateGrowth(
      arrData,
      arrDataPrev[0],
      1,
      'bsa53',
    );
    arrData.loansGrowth = caculateGrowth(
      arrData,
      arrDataPrev[0],
      2,
      'bsa104',
      'bsb98',
    );
    arrData.depositGrowth = caculateGrowth(
      arrData,
      arrDataPrev[0],
      2,
      'bsb113',
      'bsb98',
    );
  } else {
    arrData.netProfitGrowth = formatPercent(0);
    arrData.totalAssetGrowth = formatPercent(0);
    arrData.loansGrowth = formatPercent(0);
    arrData.depositGrowth = formatPercent(0);
  }
  arrData.loans = formatValueTrillion(arrData.bsa104 + arrData.bsb98);
  arrData.deposit = formatValueTrillion(arrData.bsb113 + arrData.bsb98);

  let lstKeyFormatBillion = [
    'isa1',
    'cfa18',
    'isa22',
    'cfa26',
    'cfa34',
    'bsa1',
    'bsa23',
    'bsa54',
    'bsa78',
  ];
  let lstKeyFormatThounsandBillion = ['isa27', 'bsa53', 'nob44'];
  if (isBank) {
    lstKeyFormatBillion = [
      'isa1',
      'cfa18',
      'cfa26',
      'cfa34',
      'bsa1',
      'bsa23',
      'bsa54',
      'bsa78',
    ];
    lstKeyFormatThounsandBillion = ['isa27', 'isa22', 'bsa53', 'nob44'];
  }
  const lstKeyFormatPercent = [
    'rtq25',
    'rtq1',
    'rtq2',
    'rtqt3',
    'bsa80',
    'rtq44',
    'rtq137',
  ];
  lstKeyFormatBillion.map(function(item) {
    arrData[item] = arrData[item]
      ? formatValueBillion(arrData[item])
      : arrData[item];
  });
  lstKeyFormatThounsandBillion.map(function(item) {
    arrData[item] = arrData[item]
      ? formatValueTrillion(arrData[item])
      : arrData[item];
  });

  lstKeyFormatPercent.map(function(item) {
    arrData[item] = arrData[item]
      ? formatPercent(arrData[item])
      : arrData[item];
  });
}

function caculateGrowth(item, itemPrev, type, keyName, keyName2) {
  if (type === 1) {
    return formatPercent(
      formatValueTrillion(item[keyName]) / itemPrev[keyName],
    );
  } else {
    return formatPercent(
      (item[keyName] + item[keyName2]) /
        (itemPrev[keyName] + itemPrev[keyName2]),
    );
  }
}

function orderAndSpliceArray(arr) {
  arr.sort((a, b) => {
    return b.year - a.year;
  });
  arr.splice(maxLengthData);

  arr.sort((a, b) => {
    return a.year - b.year;
  });
}

function fetchCompanyScore(organCode, componentId) {
  return dispatch => {
    snapShotService.getCompanyScore({ OrganCode: organCode }).then(res => {
      const { items = [] } = res ? res : [];
      const data = items.length > 0 ? items[0] : {};

      dispatch({
        type: FETCH_COMPANY_SCORE,
        payload: {
          componentId,
          data,
        },
      });
    });
  };
}

function fetchListChart(currentSearch, timeRange, componentId) {
  return dispatch => {
    request.fetchApi(
      params =>
        chartTickerService.getTickerSeries({
          OrganCode: currentSearch.code,
          TimeRange: timeRange,
          ...params,
        }),
      data => {
        dispatch({
          type: FETCH_LIST_CHART,
          payload: {
            data,
            componentId,
            timeRange,
          },
        });
      },
    );
  };
}

function changeTimeRange(currentSearch, timeRange, componentId) {
  return dispatch => {
    dispatch(fetchListChart(currentSearch, timeRange, componentId));
  };
}

function subscribeRealtimePrice(data, componentId) {
  return (dispatch, getState) => {
    const currentSearch = getState()[REDUCER_NAME].listMultiComponent[
      componentId
    ].currentSearch;
    const price = data.find(item => item.organCode === currentSearch.code);

    if (price) {
      dispatch(fetchLatestPriceSuccess(price, currentSearch, componentId));
    }
  };
}

const initialState = {
  listMultiComponent: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UP_DATA: {
      const { componentId, currentSearch } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            data: [],
            currentSearch: currentSearch || {
              code: Const.DEFAULT_CODE,
              displayCode: Const.DEFAULT_CODE,
              codeName: Const.DEFAULT_CODE_NAME,
              isBank: false,
              exchange: Const.DEFAULT_EXCHANGE,
            },
            latestPrice: {},
            listSearch: [],
            score: {},
            timeFilter: 2,
            dataChartIndex: [],
            timeRange: Const.timeRange['1Y'],
          },
        },
      };
    }
    case FETCH_DATA_SNAPSHOT_SUCCESS: {
      const { listDataSnapShot, componentId, currentSearch } = action.payload;
      const dataChart = formatDataChart(listDataSnapShot, currentSearch.isBank);

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            data: dataChart,
            currentSearch,
          },
        },
      };
    }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_LIST_TICKER:
      return {
        ...state,
        listSearch: action.payload,
      };
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: action.payload,
      };
    case FETCH_LATEST_PRICE_SUCCESS: {
      const { latestPrice, componentId } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            latestPrice,
          },
        },
      };
    }
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
    case CHANGE_FILTER: {
      const { timeFilter, componentId } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            timeFilter,
          },
        },
      };
    }
    case FETCH_COMPANY_SCORE: {
      const { componentId, data } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            score: data,
          },
        },
      };
    }
    case FETCH_LIST_CHART: {
      const { componentId, data, timeRange } = action.payload;

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            dataChartIndex: data,
            timeRange,
          },
        },
      };
    }
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
