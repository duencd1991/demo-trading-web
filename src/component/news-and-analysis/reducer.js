import reducerRegistry from '../helpers/ReducerRegistry';
import newsAnalysisService from '../../core/services/News/NewsAnalysisService';
import Const from '../news-and-analysis/Const';

const REDUCER_NAME = 'NEW_AND_ANALYSIS:';
const CHANGE_SIZE_COMPONENT = `${REDUCER_NAME}CHANGE_SIZE_COMPONENT`;
const CHANGE_TAB = `${REDUCER_NAME}CHANGE_TAB`;

const GET_AGGREGATOR_NEWS = `${REDUCER_NAME}GET_AGGREGATOR_NEWS`;
const SET_FETCHING_NA = `${REDUCER_NAME}SET_FETCHING_NA`;

const GET_AUTO_NEWS = `${REDUCER_NAME}GET_AUTO_NEWS`;
const SET_FETCHING_AN = `${REDUCER_NAME}SET_AUTO_NEWS`;

const GET_PREMIUM_ANALYSIS = `${REDUCER_NAME}GET_PREMIUM_ANALYSIS`;
const SET_FETCHING_PA = `${REDUCER_NAME}SET_FETCHING_PA`;

const GET_MOST_RECENT = `${REDUCER_NAME}GET_MOST_RECENT`;
const SET_FETCHING_MR = `${REDUCER_NAME}SET_FETCHING_MR`;

const GET_MOST_POPULAR = `${REDUCER_NAME}GET_MOST_POPULAR`;
const SET_FETCHING_MP = `${REDUCER_NAME}SET_FETCHING_MP`;

const GET_RUMORS = `${REDUCER_NAME}GET_RUMORS`;
const SET_FETCHING_R = `${REDUCER_NAME}SET_FETCHING_R`;

const GET_CONTRIBUTOR = `${REDUCER_NAME}GET_CONTRIBUTOR`;
const SET_FETCHING_C = `${REDUCER_NAME}SET_FETCHING_C`;

const GET_NEWS_BY_EXPERT = `${REDUCER_NAME}GET_NEWS_BY_EXPERT`;

const SET_FETCHING_EXPERT_NEWS = `${REDUCER_NAME}SET_FETCHING_EXPERT_NEWS`;

const SET_NEWS_BY_EXPERT_DATA = `${REDUCER_NAME}SET_NEWS_BY_EXPERT_DATA`;

const SET_FILTER_CONDITION = `${REDUCER_NAME}SET_FILTER_CONDITION`;

const SET_TRUST_CONDITION = `${REDUCER_NAME}SET_TRUST_CONDITION`;

const SET_API_PARAMS = `${REDUCER_NAME}SET_API_PARAMS`;

const TOGGLE_NEW_FAVORITE = `${REDUCER_NAME}TOGGLE_NEW_FAVORITE`;

const TOGGLE_FAVORITE_FILTER = `${REDUCER_NAME}TOGGLE_FAVORITE_FILTER`;

export { REDUCER_NAME, reducer as default };

const MAX_LIST_IDS_LENGTH = 100;

export const toggleFavoriteFilter = storeData => dispatch => {
  dispatch({
    type: TOGGLE_FAVORITE_FILTER,
    payload: {
      storeData,
    },
  });
};

export const setTrustCondition = (arrCondition = []) => (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_TRUST_CONDITION,
    payload: {
      arrCondition,
    },
  });
};

export const toggleNewFavorite = (
  newId,
  isFavorite,
  currentTab = { parentTab: 1, childTab: 0 },
) => (dispatch, getState) => {
  const { parentTab, childTab } = currentTab;
  const storeName =
    parentTab !== 4
      ? getState()[REDUCER_NAME].storesName[parentTab]
      : getState()[REDUCER_NAME].storesName[parentTab][childTab];
  let listIds = JSON.parse(localStorage.getItem(storeName)) || [];

  if (listIds.length === MAX_LIST_IDS_LENGTH) {
    listIds.shift();
  }

  if (!isFavorite) {
    listIds.push(newId);
  } else {
    listIds = listIds.filter(item => {
      return item !== newId;
    });
  }
  localStorage.setItem(storeName, JSON.stringify(listIds));

  dispatch({
    type: TOGGLE_NEW_FAVORITE,
    payload: {
      newIndex: newId,
      value: isFavorite,
      tabData:
        parentTab !== 4
          ? Const.TAB_MAPPING[parentTab]
          : Const.TAB_MAPPING[parentTab][childTab],
    },
  });
};

export const setAPIParams = (
  tab = { parentTab: 1, childTab: 0 },
  apiParams = {},
) => dispatch => {
  const { parentTab, childTab } = tab;
  let pageParams =
    parentTab !== 4
      ? Const.TAB_MAPPING[parentTab]
      : Const.TAB_MAPPING[parentTab][childTab];
  dispatch({
    type: SET_API_PARAMS,
    payload: {
      pageParams,
      apiParams,
    },
  });

  if (parentTab === 1) {
    dispatch(fetchAggregatorNews());
  }

  if (parentTab === 2) {
    dispatch(fetchAutoNews());
  }

  if (parentTab === 3) {
    dispatch(fetchPremiumAnalysis());
  }

  if (parentTab === 4) {
    if (childTab === 1) dispatch(fetchMostRecent());
    if (childTab === 2) dispatch(fetchMostPopular());
    if (childTab === 3) dispatch(fetchContributor());
    if (childTab === 4) dispatch();
  }

  if (parentTab === 5) {
    dispatch(fetchRumors());
  }
};

export const setFilterCondition = (
  tab = { parentTab: 1, childTab: 0 },
  condition = {},
) => dispatch => {
  const { parentTab, childTab } = tab;
  let page =
    parentTab !== 4
      ? Const.TAB_MAPPING[parentTab]
      : Const.TAB_MAPPING[parentTab][childTab];
  dispatch({
    type: SET_FILTER_CONDITION,
    payload: {
      page,
      condition,
    },
  });
};

export const changeTab = (tabType, tabNumber) => dispatch => {
  dispatch({
    type: CHANGE_TAB,
    payload: {
      tabNumber,
      tabType,
    },
  });
};

export const setFetchingNA = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_NA,
    payload: {
      naStatus: status,
    },
  });
};

export const fetchAggregatorNews = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingNA());
    const apiParams = getState()[REDUCER_NAME].aggregatorNewsData.apiParams;
    newsAnalysisService.getAggregatorNews(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_AGGREGATOR_NEWS,
        payload: {
          naData: items && items.length ? items : [],
          totalPageNA: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingAN = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_AN,
    payload: {
      anStatus: status,
    },
  });
};

export const fetchAutoNews = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingAN());
    const apiParams = getState()[REDUCER_NAME].autoNewsData.apiParams;
    newsAnalysisService.getAutoNews(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_AUTO_NEWS,
        payload: {
          anData: items && items.length ? items : [],
          totalPageAN: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingPA = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_PA,
    payload: {
      paStatus: status,
    },
  });
};

export const fetchPremiumAnalysis = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingPA());
    const apiParams = getState()[REDUCER_NAME].premiumAnalysisData.apiParams;
    newsAnalysisService.getPremiumAnalysis(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_PREMIUM_ANALYSIS,
        payload: {
          paData: items && items.length ? items : [],
          totalPagePA: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingC = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_C,
    payload: {
      cStatus: status,
    },
  });
};

export const fetchContributor = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingC());
    const apiParams = getState()[REDUCER_NAME].contributorsData.apiParams;
    newsAnalysisService.getContributor(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_CONTRIBUTOR,
        payload: {
          cData: items && items.length ? items : [],
          totalPageC: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingExpertNews = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_EXPERT_NEWS,
    payload: {
      enStatus: status,
    },
  });
};

export const getNewsByExpert = ExpertId => {
  return dispatch => {
    dispatch(setFetchingExpertNews());
    newsAnalysisService.getNewsByExpert({ ExpertId }).then(response => {
      const { items = [] } = response;
      dispatch({
        type: GET_NEWS_BY_EXPERT,
        payload: {
          ExpertId,
          listNewsByExpert: items,
        },
      });
    });
  };
};

export const setNewsByExpertData = (newKey, newValue) => {
  return dispatch => {
    dispatch({
      type: SET_NEWS_BY_EXPERT_DATA,
      payload: {
        newKey,
        newValue,
      },
    });
  };
};

export const setFetchingMR = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_MR,
    payload: {
      mrStatus: status,
    },
  });
};

export const fetchMostRecent = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingMR());
    const apiParams = getState()[REDUCER_NAME].mostRecentData.apiParams;
    newsAnalysisService.getMostRecent(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_MOST_RECENT,
        payload: {
          mrData: items && items.length ? items : [],
          totalPageMR: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingMP = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_MP,
    payload: {
      mpStatus: status,
    },
  });
};

export const fetchMostPopular = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingMP());
    const apiParams = getState()[REDUCER_NAME].mostPopularData.apiParams;
    newsAnalysisService.getMostPopular(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_MOST_POPULAR,
        payload: {
          mpData: items && items.length ? items : [],
          totalPageMP: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

export const setFetchingR = (status = true) => dispatch => {
  dispatch({
    type: SET_FETCHING_R,
    payload: {
      rStatus: status,
    },
  });
};

export const fetchRumors = () => {
  return (dispatch, getState) => {
    dispatch(setFetchingR());
    const apiParams = getState()[REDUCER_NAME].rumorsData.apiParams;
    newsAnalysisService.getRumors(apiParams).then(response => {
      const { items = [], totalCount = 0 } = response;
      dispatch({
        type: GET_RUMORS,
        payload: {
          rData: items && items.length ? items : [],
          totalPageR: Math.ceil(totalCount / apiParams.PageSize),
        },
      });
    });
  };
};

const initialState = {
  currentTab: 1,
  currentChildTab: 1,
  // currentTab: 4,
  // currentChildTab: 4,
  component: {},
  storesName: {
    1: 'NA_STORE',
    2: 'AN_STORE',
    3: 'PA_STORE',
    4: {
      1: 'MR_STORE',
      2: 'MP_STORE',
      3: 'C_STORE',
    },
    5: 'R_STORE',
  },
  aggregatorNewsData: {
    storeName: 'NA_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  autoNewsData: {
    storeName: 'AN_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  premiumAnalysisData: {
    storeName: 'PA_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  mostRecentData: {
    storeName: 'MR_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  mostPopularData: {
    storeName: 'MP_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  contributorsData: {
    storeName: 'C_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
    currentExpert: {
      isLoading: true,
      expertId: null,
      newId: null,
      expertData: [],
    },
  },
  favoriteData: {
    totalPage: 1,
    data: [],
    isLoading: true,
    filterCondition: {},
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
  rumorsData: {
    storeName: 'R_STORE',
    isShortByFavorite: false,
    totalPage: null,
    data: [],
    isLoading: true,
    filterCondition: ['High', 'Medium', 'Low'],
    apiParams: {
      Page: 1,
      PageSize: 100,
      FromDate: null,
      ToDate: null,
      KeyWord: null,
    },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE_FILTER:
      const { storeData } = action.payload;
      const previousStatus = state[storeData].isShortByFavorite;
      return {
        ...state,
        [storeData]: {
          ...state[storeData],
          isShortByFavorite: !previousStatus,
        },
      };
    case SET_TRUST_CONDITION:
      const { arrCondition } = action.payload;
      return {
        ...state,
        rumorsData: {
          ...state.rumorsData,
          filterCondition: arrCondition,
        },
      };

    case TOGGLE_NEW_FAVORITE:
      const { newIndex, value, tabData } = action.payload;
      const newPosition = [...state[tabData].data].findIndex(
        item => item.newsId === newIndex,
      );
      return {
        ...state,
        [tabData]: {
          ...state[tabData],
          data: [
            ...state[tabData].data.slice(0, newPosition),
            {
              ...state[tabData].data[newPosition],
              isFavorite: !value,
            },
            ...state[tabData].data.slice(newPosition + 1),
          ],
        },
      };

    case SET_API_PARAMS:
      const { apiParams, pageParams } = action.payload;
      return {
        ...state,
        [pageParams]: {
          ...state[pageParams],
          apiParams: {
            ...state[pageParams].apiParams,
            ...apiParams,
          },
        },
      };

    case SET_FILTER_CONDITION:
      const { page, condition } = action.payload;

      let cloneFilterCondition = {
        ...state[page].filterCondition,
        [condition.key]: condition.value,
      };

      for (var propName in cloneFilterCondition) {
        if (
          cloneFilterCondition[propName] === null ||
          cloneFilterCondition[propName] === undefined
        ) {
          delete cloneFilterCondition[propName];
        }
      }

      return {
        ...state,
        [page]: {
          ...state[page],
          filterCondition: cloneFilterCondition,
        },
      };
    case CHANGE_TAB:
      const { tabNumber, tabType } = action.payload;
      return {
        ...state,
        [tabType]: tabNumber,
      };
    case CHANGE_SIZE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };
    case GET_AGGREGATOR_NEWS:
      const { naData, totalPageNA } = action.payload;
      return {
        ...state,
        aggregatorNewsData: {
          ...state.aggregatorNewsData,
          data: naData,
          isLoading: false,
          totalPage: totalPageNA,
        },
      };
    case SET_FETCHING_NA:
      const { naStatus } = action.payload;
      return {
        ...state,
        aggregatorNewsData: {
          ...state.aggregatorNewsData,
          isLoading: naStatus,
        },
      };
    case GET_AUTO_NEWS:
      const { anData, totalPageAN } = action.payload;
      return {
        ...state,
        autoNewsData: {
          ...state.autoNewsData,
          data: anData,
          isLoading: false,
          totalPage: totalPageAN,
        },
      };
    case SET_FETCHING_AN:
      const { anStatus } = action.payload;
      return {
        ...state,
        autoNewsData: {
          ...state.autoNewsData,
          isLoading: anStatus,
        },
      };
    case GET_PREMIUM_ANALYSIS:
      const { paData, totalPagePA } = action.payload;
      return {
        ...state,
        premiumAnalysisData: {
          ...state.premiumAnalysisData,
          data: paData,
          isLoading: false,
          totalPage: totalPagePA,
        },
      };
    case SET_FETCHING_PA:
      const { paStatus } = action.payload;
      return {
        ...state,
        premiumAnalysisData: {
          ...state.premiumAnalysisData,
          isLoading: paStatus,
        },
      };
    case GET_CONTRIBUTOR:
      const { cData, totalPageC } = action.payload;
      return {
        ...state,
        contributorsData: {
          ...state.contributorsData,
          data: cData,
          isLoading: false,
          totalPage: totalPageC,
        },
      };
    case SET_FETCHING_EXPERT_NEWS:
      const { enStatus } = action.payload;
      return {
        ...state,
        contributorsData: {
          ...state.contributorsData,
          currentExpert: {
            ...state.contributorsData.currentExpert,
            isLoading: enStatus,
          },
        },
      };
    case GET_NEWS_BY_EXPERT:
      const { ExpertId, listNewsByExpert } = action.payload;
      return {
        ...state,
        contributorsData: {
          ...state.contributorsData,
          currentExpert: {
            ...state.contributorsData.currentExpert,
            expertId: ExpertId,
            expertData: listNewsByExpert,
          },
        },
      };
    case SET_NEWS_BY_EXPERT_DATA:
      const { newKey, newValue } = action.payload;
      let settingObj = {};
      if (newKey === 'expertId') {
        settingObj = {
          [newKey]: newValue,
          newId: null,
        };
      } else {
        settingObj = {
          [newKey]: newValue,
        };
      }
      const currentExpertClone = {
        ...state.contributorsData.currentExpert,
        ...settingObj,
      };
      return {
        ...state,
        contributorsData: {
          ...state.contributorsData,
          currentExpert: currentExpertClone,
        },
      };
    case SET_FETCHING_C:
      const { cStatus } = action.payload;
      return {
        ...state,
        contributorsData: {
          ...state.contributorsData,
          isLoading: cStatus,
        },
      };

    case GET_MOST_RECENT:
      const { mrData, totalPageMR } = action.payload;
      return {
        ...state,
        mostRecentData: {
          ...state.mostRecentData,
          data: mrData,
          isLoading: false,
          totalPage: totalPageMR,
        },
      };
    case SET_FETCHING_MR:
      const { mrStatus } = action.payload;
      return {
        ...state,
        mostRecentData: {
          ...state.mostRecentData,
          isLoading: mrStatus,
        },
      };

    case GET_MOST_POPULAR:
      const { mpData, totalPageMP } = action.payload;
      return {
        ...state,
        mostPopularData: {
          ...state.mostPopularData,
          data: mpData,
          isLoading: false,
          totalPage: totalPageMP,
        },
      };
    case SET_FETCHING_MP:
      const { mpStatus } = action.payload;
      return {
        ...state,
        mostPopularData: {
          ...state.mostPopularData,
          isLoading: mpStatus,
        },
      };

    case GET_RUMORS:
      const { rData, totalPageR } = action.payload;
      return {
        ...state,
        rumorsData: {
          ...state.rumorsData,
          data: rData,
          isLoading: false,
          totalPage: totalPageR,
        },
      };

    case SET_FETCHING_R:
      const { rStatus } = action.payload;
      return {
        ...state,
        rumorsData: {
          ...state.rumorsData,
          isLoading: rStatus,
        },
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
