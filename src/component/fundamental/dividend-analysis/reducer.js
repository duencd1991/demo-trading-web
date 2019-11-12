import dividendAnalysisService from '../../../core/services/Fundamental/DividendAnalysisService';
import reducerRegistry from '../../helpers/ReducerRegistry';
import masterService from './../../../core/services/Common/MasterService';
import Const from './Const';
import { getDataFollowKeyByDot } from './../../helpers/Common';
import ConstCommon from '../../common/Const';
import { keyBy } from 'lodash';
import moment from 'moment';
import { formatPercent } from '../../helpers/Text';
import snapShotService from './../../../core/services/Fundamental/SnapShotService';

// ================================================== CONSTANTS ========================================================
const REDUCER_NAME = 'FUNDAMENTAL:FA_DIVIDEND_ANALYSIS:';
const FETCH_ANALYSIS = `${REDUCER_NAME}FETCH_ANALYSIS`;
const FETCH_LIST_TICKER = `${REDUCER_NAME}FETCH_LIST_TICKER`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const FETCH_COMPANY_SCORE = `${REDUCER_NAME}FETCH_COMPANY_SCORE`;
const INIT_COMPONENT = `${REDUCER_NAME}INIT_COMPONENT`;
const UNMOUNT_COMPONENT = `${REDUCER_NAME}UNMOUNT_COMPONENT`;
const FETCH_LAST_PRICE_DATA = `${REDUCER_NAME}FETCH_LAST_PRICE_DATA`;
const SUBSCRIBE_REALTIME_DATA_TICK = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_TICK`;

// =================================================== EXPORT ==========================================================
export {
  REDUCER_NAME,
  reducer as default,
  fetchAnalysis,
  changeCode,
  fetchListTicker,
  fetchCompanyScore,
  subscribeRealtimeTick,
  fetchLastprice,
};

// =================================================== ACTIONS =========================================================
function changeCode(code, id) {
  return dispatch => {
    dispatch(fetchLastprice(code, id));
    dispatch(fetchAnalysis(code, id));
  };
}

function fetchAnalysis(code, id) {
  const params = {
    OrganCode: code,
    Code: code,
  };

  return dispatch => {
    dividendAnalysisService.GetAnalysis(params).then(response => {
      const { items: listAnalysis = [] } = response ? response : [];

      dispatch({
        type: FETCH_ANALYSIS,
        payload: {
          listAnalysis,
          dataId: id,
          code,
        },
      });
    });
  };
}

function fetchListTicker() {
  return dispatch => {
    masterService.getListOrganization().then(response => {
      const { items: listTicker = [] } = response ? response : [];
      dispatch({
        type: FETCH_LIST_TICKER,
        payload: {
          listTicker,
        },
      });
    });
  };
}

function fetchLastprice(code, id) {
  const params = {
    OrganCode: code,
    Code: code,
  };
  return dispatch => {
    dividendAnalysisService.getLastPriceData(params).then(response => {
      const { items = [] } = response ? response : [];
      const indexData = items ? items[0].priceInfo : {};
      dispatch({
        type: FETCH_LAST_PRICE_DATA,
        payload: {
          indexData,
          componentId: id,
          code,
        },
      });
    });
  };
}

function fetchCompanyScore(organCode, componentId) {
  return dispatch => {
    snapShotService.getCompanyScore({ OrganCode: organCode }).then(res => {
      const { items = [] } = res ? res : [];
      const data = items ? items[0] : {};

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

function subscribeRealtimeTick(data, componentId) {
  return {
    type: SUBSCRIBE_REALTIME_DATA_TICK,
    payload: {
      data,
      componentId,
    },
  };
}

// ================================================== REDUCE ===========================================================
const initialState = {
  listMultiComponent: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_COMPONENT:
      const dataId = action.payload.id;

      return {
        ...state,
        listDataSearch: [],
        listDataSearchByTicker: {},
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            ...state.listMultiComponent[dataId],
            score: {},
            condition: {},
            dataChartPE: [],
            dataChartDE: [],
            listDataDividendTable: [],
            dataDividendTableByYear: {},
          },
        },
      };

    case UNMOUNT_COMPONENT: {
      const delId = action.payload.id;
      const cloneListComponent = { ...state.listMultiComponent };
      const { [delId]: _, ...withoutDeleteKey } = cloneListComponent;

      return {
        ...state,
        listMultiComponent: withoutDeleteKey,
      };
    }

    case FETCH_LIST_TICKER: {
      const { listTicker } = action.payload;
      const listDataSearch = [];
      if (listTicker) {
        listTicker.forEach(item => {
          listDataSearch.push({
            displayCode: getDataFollowKeyByDot(item, Const.listTicker.TICKER),
            code: getDataFollowKeyByDot(item, Const.listTicker.ORGAN_CODE),
            codeName: getDataFollowKeyByDot(
              item,
              Const.listTicker.ORGAN_SHORT_NAME,
            ),
            exchange:
              ConstCommon.listExchange[
                getDataFollowKeyByDot(item, Const.listTicker.COM_GROUP_CODE)
              ],
          });
        });
      }

      const listDataSearchByTicker = keyBy(
        listDataSearch,
        Const.typeCodeDefault,
      );

      return {
        ...state,
        listDataSearch,
        listDataSearchByTicker,
      };
    }

    case FETCH_ANALYSIS: {
      const { listAnalysis, dataId, code } = action.payload;

      //data chart PE
      const dataObj = listAnalysis ? listAnalysis[0] : {};

      const dividendYield = dataObj.dividendYield
        ? dataObj.dividendYield.ratioYears
        : [];
      const dividendYieldByYear = keyBy(dividendYield, Const.yearReport);

      const priceEarningRatio = dataObj.priceEarningRatio
        ? dataObj.priceEarningRatio.ratioYears
        : [];
      const dataChartPE = priceEarningRatio
        .map(item => ({
          ...item,
          ratioValueYield: dividendYieldByYear[item.yearReport].ratioValue,
        }))
        .sort((a, b) => a.yearReport - b.yearReport)
        .slice(6, priceEarningRatio.length);

      //data chart DE
      const dividendPayoutRatio = dataObj.dividendPayoutRatio
        ? dataObj.dividendPayoutRatio.ratioYears
        : [];
      const dividendYieldPayoutByYear = keyBy(
        dividendPayoutRatio,
        Const.yearReport,
      );

      const dps = dataObj.dps ? dataObj.dps.ratioYears : [];
      const dpsByYear = keyBy(dps, Const.yearReport);

      const eps = dataObj.eps ? dataObj.eps.ratioYears : [];
      const dataChartDE = eps
        .map(item => ({
          ...item,
          dividendPayoutValue:
            dividendYieldPayoutByYear[item.yearReport].ratioValue,
          dpsValue: dpsByYear[item.yearReport].ratioValue,
        }))
        .sort((a, b) => a.yearReport - b.yearReport)
        .slice(6, eps.length);

      //data table
      const cashDividendPayouts = dataObj.cashDividendPayouts || [];
      const cashDividendPlans = dataObj.cashDividendPlans || [];
      const currentYear = moment().year();
      const currentMonth = moment().month() + 1;

      if (cashDividendPayouts.length > 0) {
        const checkCurrentYear = cashDividendPayouts.find(
          item => item.exrightYear === currentYear,
        );
        if (!checkCurrentYear) {
          cashDividendPayouts.push({
            exrightMonth: '',
            exrightYear: currentYear,
            valuePerShare: '',
          });
        }
      }

      const formatCashDividendPayouts = cashDividendPayouts => {
        const payouts = {};
        const monthCount = [];
        cashDividendPayouts.forEach(item => {
          const exRightYear = {
            total:
              (payouts[item.exrightYear] && payouts[item.exrightYear].total
                ? payouts[item.exrightYear].total
                : 0) + +item.valuePerShare,
            yield: !dividendYieldByYear[item.exrightYear]
              ? ''
              : formatPercent(dividendYieldByYear[item.exrightYear].ratioValue),
            year: item.exrightYear,
          };

          if (item.exrightMonth) {
            payouts[item.exrightYear] = {
              ...payouts[item.exrightYear],
              ...exRightYear,
              [item.exrightMonth]: {
                value: item.valuePerShare,
                isRed: false,
              },
            };
          } else {
            payouts[item.exrightYear] = {
              ...exRightYear,
            };
          }
          // check position red color of month in current year
          const monthIndex = monthCount.findIndex(
            it => it.month === item.exrightMonth,
          );
          if (monthIndex !== -1) {
            monthCount[monthIndex].count += 1;
          } else {
            monthCount.push({
              month: item.exrightMonth,
              count: 1,
            });
          }
        });

        return {
          payouts,
          monthCount,
        };
      };

      const getCurrentYear = () => new Date().getFullYear();

      const getNearestMonth = (monthCount, cashDividendPlan, payouts) => {
        const sortedMonthCount = monthCount.sort((a, b) => b.count - a.count);
        const [max] = sortedMonthCount;
        const maxs = monthCount.filter(it => it.count === max.count);
        let chooseMonth = 0;
        if (maxs.length === 1) {
          let x = max.month > currentMonth ? max.month : currentMonth + 1;
          for (let m = x; m <= 12; m++) {
            if (!payouts[currentYear][m]) {
              chooseMonth = m;
              break;
            }
          }
          return {
            month: chooseMonth,
            value: cashDividendPlan.valuePerShare - payouts[currentYear].total,
          };
        }

        let nearestIndex = 0;
        for (let j = 0; j < maxs.length; j++) {
          if (
            maxs[nearestIndex].month &&
            maxs[nearestIndex].month - currentMonth >
              maxs[j].month - currentMonth
          ) {
            nearestIndex = j;
            continue;
          }
        }

        let t =
          maxs[nearestIndex].month > currentMonth
            ? maxs[nearestIndex].month
            : currentMonth + 1;
        for (let k = t; k <= 12; k++) {
          if (!payouts[currentYear][k]) {
            chooseMonth = k;
            break;
          }
        }

        return {
          month: chooseMonth,
          value: cashDividendPlan.valuePerShare - payouts[currentYear].total,
        };
      };

      const getRedMonth = (cashDividendPayouts, cashDividendPlans) => {
        const currentYear = getCurrentYear();
        const { payouts, monthCount } = formatCashDividendPayouts(
          cashDividendPayouts,
        );
        const cashDividendPlan = cashDividendPlans.find(
          item => item.dividendYear === currentYear,
        );
        if (!cashDividendPlan) {
          return null;
        }

        if (cashDividendPlan.valuePerShare <= payouts[currentYear].total) {
          return null;
        }

        return getNearestMonth(monthCount, cashDividendPlan, payouts);
      };

      let dataDividendTableByYear = {};

      const listDataDividendTable = cashDividendPayouts
        .map(item => getDataFollowKeyByDot(item, Const.exrightYear))
        .filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        })
        .sort((a, b) => b - a);

      const { payouts } = formatCashDividendPayouts(cashDividendPayouts);
      if (getRedMonth(cashDividendPayouts, cashDividendPlans) !== null) {
        const redMonth = getRedMonth(cashDividendPayouts, cashDividendPlans);
        dataDividendTableByYear = Object.keys(payouts).reduce(
          (result, item) => {
            if (!item) {
              return result;
            }
            if (+item === currentYear) {
              return {
                ...result,
                [item]: {
                  ...payouts[item],
                  [redMonth.month]: {
                    value: redMonth.value,
                    isRed: true,
                  },
                  total:
                    payouts[item].total === 0
                      ? redMonth.value
                      : payouts[item].total + redMonth.value,
                },
              };
            }

            return {
              ...result,
              [item]: payouts[item],
            };
          },
          {},
        );
      }
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [dataId]: {
            ...state.listMultiComponent[dataId],
            analysisData: listAnalysis,
            dataChartPE,
            dataChartDE,
            listDataDividendTable,
            dataDividendTableByYear:
              Object.keys(dataDividendTableByYear).length > 0
                ? dataDividendTableByYear
                : payouts,
            code,
          },
        },
      };
    }

    case CHANGE_SIZE_COMPONENT:
      const { id } = action.payload;
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [id]: {
            ...state.listMultiComponent[id],
            component: action.payload,
          },
        },
      };

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

    case FETCH_LAST_PRICE_DATA: {
      const { indexData, componentId, code } = action.payload;
      const listDataSearchByTicker = state.listDataSearchByTicker;
      const displayCode =
        Object.keys(listDataSearchByTicker).length === 0
          ? Const.displayDefault
          : listDataSearchByTicker[code].displayCode;

      const companyName =
        Object.keys(listDataSearchByTicker).length === 0
          ? Const.companyDefault
          : listDataSearchByTicker[code].codeName +
            ' / ' +
            listDataSearchByTicker[code].exchange;
      const condition = {
        code,
        displayCode,
        companyName,
        indexData,
        dataRealtime: undefined,
      };

      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            condition,
            code,
          },
        },
      };
    }

    case SUBSCRIBE_REALTIME_DATA_TICK: {
      const { data, componentId } = action.payload;
      const dataRealtime = data.find(
        item => item.organCode === state.listMultiComponent[componentId].code,
      );
      return {
        ...state,
        listMultiComponent: {
          ...state.listMultiComponent,
          [componentId]: {
            ...state.listMultiComponent[componentId],
            condition: {
              ...state.listMultiComponent[componentId].condition,
              dataRealtime: dataRealtime,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
