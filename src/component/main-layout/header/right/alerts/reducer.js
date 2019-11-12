import reducerRegistry from '../../../../helpers/ReducerRegistry';
import alertSystemService from '../../../../../core/services/Tools/Alerts/AlertSystemService';
import _, { keyBy } from 'lodash';
import { getLanguage } from '../../../../helpers/Language';
//TODO import Const from './Const';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import { languages } from '../../../../../configs/LanguageConfig';
export const REDUCER_NAME = 'MAIN_LAYOUT:NOTIFI_ALERTS';
export const SUBSCRIBE_REALTIME_DATA_ALERT = `${REDUCER_NAME}SUBSCRIBE_REALTIME_DATA_ALERT`;
export const FETCH_LIST_ALERT_GROUPS = `${REDUCER_NAME}FETCH_LIST_ALERT_GROUPS`;
const initialState = {
  lstAlertGroupChanel: [],
  lstAlertGroupChanelUnSubscribed: [],
  listAlertGroups: [],
};
function subcriedAlertGroups(dispatch, listAlertGroups) {
  const lang = getLanguage();
  const suffix = '_' + lang;
  const lstAlertGroupChanel = _.map(
    _.filter(listAlertGroups, value => value.subscribed),
    cond => cond.alertGroup + suffix,
  );
  let lstAlertGroupChanelUnSubscribed = _.map(
    _.filter(listAlertGroups, value => !value.subscribed),
    cond => cond.alertGroup + suffix,
  );
  _.map(_.keys(languages), langItem => {
    if (langItem !== lang) {
      const arrayUnSubcribed = _.map(
        listAlertGroups,
        cond => cond.alertGroup + '_' + langItem,
      );
      lstAlertGroupChanelUnSubscribed = [
        ...lstAlertGroupChanelUnSubscribed,
        ...arrayUnSubcribed,
      ];
    }
  });
  dispatch({
    type: FETCH_LIST_ALERT_GROUPS,
    payload: {
      lstAlertGroupChanel: lstAlertGroupChanel,
      lstAlertGroupChanelUnSubscribed,
      listAlertGroups: _.cloneDeep(listAlertGroups),
    },
  });
}
export const fetchListAlertGroups = () => {
  return (dispatch, globalState) => {
    alertSystemService.getAlertGroups('').then(response => {
      const { items } = response === null ? [] : response;
      subcriedAlertGroups(dispatch, items);
    });
  };
};

export const subribeAlertGroups = () => {
  return (dispatch, getState) => {
    const store = getState();
    const listAlertGroups = store[REDUCER_NAME].listAlertGroups;

    const listAlertGroupsActive = _.map(
      _.filter(listAlertGroups, ['subscribed', true]),
      'alertGroup',
    );
    const param = {
      alertGroups: listAlertGroupsActive,
    };
    // dispatch(setLoadingPopupSetting(true));
    alertSystemService.subribeAlertGroups(param).then(response => {
      // dispatch(setLoadingPopupSetting(false));
      const { items } = response;
      subcriedAlertGroups(dispatch, listAlertGroups);
    });
  };
};
export const subscribeRealtimeData = data => {
  return {
    type: SUBSCRIBE_REALTIME_DATA_ALERT,
    payload: {
      data,
    },
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_REALTIME_DATA_ALERT:
      const { data } = action.payload;
      return { ...state, alertData: data };
    case FETCH_LIST_ALERT_GROUPS: {
      const {
        lstAlertGroupChanel,
        lstAlertGroupChanelUnSubscribed,
        listAlertGroups,
      } = action.payload;
      return {
        ...state,
        lstAlertGroupChanel,
        lstAlertGroupChanelUnSubscribed,
        listAlertGroups,
      };
    }
    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
