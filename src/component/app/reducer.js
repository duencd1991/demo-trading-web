import { combineReducers } from 'redux';
import reducerRegistry from './../helpers/ReducerRegistry';
import { i18nReducer } from 'react-redux-i18n';
import { THEMES } from './../../configs/LayoutConfig';
import { getLanguage } from './../helpers/Language';

import commonReducer, {
  REDUCER_NAME as COMMON_REDUCER_NAME,
} from './commonReducer';

const CHANGE_THEME = 'CHANGE_THEME';
const SET_USER_INFO = 'SET_USER_INFO';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
const TOGGLE_INTRO = 'TOGGLE_INTRO';

export const changeTheme = payload => ({ type: CHANGE_THEME, payload });

export const changeLanguage = payload => ({ type: CHANGE_LANGUAGE, payload });

export const setUserInfo = payload => ({ type: SET_USER_INFO, payload });

export const toggleModal = payload => ({ type: TOGGLE_MODAL, payload });

export const toggleIntro = payload => ({ type: TOGGLE_INTRO, payload });

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const themeReducer = (state = THEMES.DARK, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
};

const languageReducer = (state = getLanguage(), action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

const introReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_INTRO:
      return action.payload;
    default:
      return state;
  }
};

reducerRegistry.register('i18n', i18nReducer);
reducerRegistry.register('theme', themeReducer);
reducerRegistry.register('language', languageReducer);
reducerRegistry.register('userInfo', userReducer);
reducerRegistry.register('isShowModal', modalReducer);
reducerRegistry.register('isShowIntro', introReducer);
reducerRegistry.register([COMMON_REDUCER_NAME], commonReducer);

export default combineReducers({
  ...reducerRegistry.getReducers(),
});
