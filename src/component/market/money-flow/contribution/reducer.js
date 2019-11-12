import reducerRegistry from '../../../helpers/ReducerRegistry';
import contributionService from "../../../../core/services/Market/MoneyFlow/ContributionService";
import Const from './Const';
import registerCancelTokenAxios from './../../../helpers/RegisterCancelTokenAxios';

const REDUCER_NAME = 'MONEY_FLOW:CONTRIBUTION:';
const FETCH_DATA_CONTRIBUTION = `${REDUCER_NAME}FETCH_DATA_CONTRIBUTION`;
const SET_FETCHING = `${REDUCER_NAME}SET_FETCHING`;
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const CHANGE_TIME_RANGE = `${REDUCER_NAME}CHANGE_TIME_RANGE`;

export {
  REDUCER_NAME,
  reducer as default,
  fetchDataContribution,
  changeTimeRange,
  changeComGroupCode,
}

function fetchDataContribution(comGroupCode) {
  return (dispatch, getState) => {
    registerCancelTokenAxios.delete(REDUCER_NAME);

    dispatch(setFetching());

    const newComGroupCode = comGroupCode ? comGroupCode : getState()[REDUCER_NAME].comGroupCode;

    const source = registerCancelTokenAxios.register(REDUCER_NAME);
    contributionService.getContribution({ ComGroupCode: newComGroupCode }, source).then(response => {
      dispatch(setFetching(false));
      const items = response.items || [];

      const contributionData = items.length > 0 ? items[0] : {};
      dispatch({
        type: FETCH_DATA_CONTRIBUTION,
        payload: {
          contributionData,
          comGroupCode: newComGroupCode,
        }
      });
    });
  };
}

function setFetching(payload = true) {
  return {
    type: SET_FETCHING,
    payload,
  }
}

function changeTimeRange(timeRange) {
  return (dispatch, getState) => {
    const currentTimeRange = getState()[REDUCER_NAME].timeRange;
    if (currentTimeRange !== timeRange) {
      dispatch({
        type: CHANGE_TIME_RANGE,
        payload: {
          timeRange
        }
      });
    }
  }
}

function changeComGroupCode(comGroupCode) {
  return (dispatch, getState) => {
    const currentComGroupCode = getState()[REDUCER_NAME].comGroupCode;
    if (comGroupCode !== currentComGroupCode) {
      dispatch(fetchDataContribution(comGroupCode));
    }
  };
}

const initialState = {
  isFetching: false,
  contributionData: {},
  contributionDataByTimeRange: [],
  timeRange: Const.listTimeRange.CONTRIB_1DAY,
  component: {},
  comGroupCode: Const.listFilterByOrganCode.VNINDEX.key,
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case FETCH_DATA_CONTRIBUTION:
      const { contributionData, comGroupCode } = action.payload;

      return {
        ...state,
        contributionData,
        contributionDataFollowTimeRange: getContribution(contributionData, state.timeRange),
        comGroupCode,
      };

    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload
      };

    case CHANGE_TIME_RANGE:
      const { timeRange } = action.payload;

      return {
        ...state,
        timeRange: action.payload.timeRange,
        contributionDataFollowTimeRange: getContribution(state.contributionData, timeRange),
      };
    default:
      return state;
  }
}

function getContribution(contributionData, timeRange) {
  let contributionDataFollowTimeRange = [];
  if (contributionData[timeRange]) {
    contributionDataFollowTimeRange = [
      ...contributionData[timeRange][Const.TOP_GAINERS].sort((a, b) =>
        b[Const.listContribution.CONTRIBUTION] - a[Const.listContribution.CONTRIBUTION]
      ),
      ...contributionData[timeRange][Const.TOP_LOSERS].sort((a, b) =>
        b[Const.listContribution.CONTRIBUTION] - a[Const.listContribution.CONTRIBUTION]
      ),
    ];
  }
  return contributionDataFollowTimeRange;
}

reducerRegistry.register(REDUCER_NAME, reducer);
