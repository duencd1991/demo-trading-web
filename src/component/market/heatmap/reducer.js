import heatMapService from '../../../core/services/Market/HeatMap/HeatMapService';
import summaryService from '../../../core/services/Market/Watchlist/SummaryService';
import reducerRegistry from '../../helpers/ReducerRegistry';
import axios from 'axios';

export const REDUCER_NAME = 'HEAT_MAP';
const FETCH_HEAT_MAP_SUCCESS = `${REDUCER_NAME}_FETCH_HEAT_MAP_SUCCESS`;
const SET_TOP_TEN = `${REDUCER_NAME}_SET_TOP_TEN`;
const FETCH_PERFORMANCE_CHART_DATA_SUCCESS = `${REDUCER_NAME}_FETCH_PERFORMANCE_CHART_DATA_SUCCESS`;
const SET_LOADING = `${REDUCER_NAME}_SET_LOADING`;
const SET_CHART_DATA_LOADING = `${REDUCER_NAME}_SET_CHART_DATA_LOADING`;

export const fetchHeatMap = payload => dispatch => {
  dispatch(setLoading());
  const source = axios.CancelToken.source();
  heatMapService.getHeatMap(payload, source).then(response => {
    if (!response || !Array.isArray(response.items)) {
      return;
    }
    const topTens = response.items[0].sectors.reduce((result, sector) => {
      return [
        ...result,
        ...sector.tickers,
      ];
    }, []);
    dispatch(fetchHeatMapSuccess({
      data: response.items[0].sectors,
    }));
    dispatch(setTopTen(topTens));
  });

  return source;
};

export const fetchPerformanceChartData = ({ organCode }) => dispatch => {
  dispatch(setChartDataLoading({
    [organCode]: true,
  }));
  summaryService.getTwoDaysSeries({
    OrganCode: organCode,
  }).then(data => {
    if (!data.items) {
      dispatch(fetchPerformanceChartDataSuccess({
        [organCode]: {
          previousDate: [],
          toDate: [],
        },
      }));
      return;
    }
    const { previousDate, toDate } = data.items[0];
    dispatch(fetchPerformanceChartDataSuccess({
      [organCode]: {
        previousDate,
        toDate,
      },
    }));
    dispatch(setChartDataLoading({
      [organCode]: false,
    }));
  });
};

export const fetchHeatMapSuccess = payload => ({ type: FETCH_HEAT_MAP_SUCCESS, payload });
export const setTopTen = payload => ({ type: SET_TOP_TEN, payload });
export const fetchPerformanceChartDataSuccess = payload => ({
  type: FETCH_PERFORMANCE_CHART_DATA_SUCCESS,
  payload
});

const setLoading = (payload = true) => ({ type: SET_LOADING, payload });
const setChartDataLoading = (payload) => ({ type: SET_CHART_DATA_LOADING, payload });


const initialState = {
  isLoading: false,
  sectors: [],
  topTen: {},
  chartData: {},
  chartDataLoading: {},
};

const heatMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEAT_MAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectors: action.payload.data,
      };
    case SET_TOP_TEN:
      const tickers = action.payload.reduce((result, ticker) => {
        return {
          ...result,
          [ticker.organCode]: {
            ...state.topTen[ticker.organCode],
            ...ticker,
          },
        };
      }, {});
      return {
        ...state,
        topTen: {
          ...state.topTen,
          ...tickers,
        }
      };

    case FETCH_PERFORMANCE_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartData: {
          ...state.chartData,
          ...action.payload,
        }
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_CHART_DATA_LOADING:
      return {
        ...state,
        chartDataLoading: {
          ...state.chartDataLoading,
          ...action.payload,
        }
      };
    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, heatMapReducer);
