import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
  countDownSecondsToOpenMarket,
  fetchEconomy,
  getTimeOffset,
} from './commonReducer';
import reducers from './reducer';
import thunk from 'redux-thunk';
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n';
import i18n from '../lang/i18n';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  fetchOrganization,
  fetchCompanyGroup,
  fetchIndustry,
  fetchDerivative,
} from './commonReducer';
import reducerRegistry from '../helpers/ReducerRegistry';
import { getLanguage } from './../helpers/Language';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combineReducers(reducers));
});

syncTranslationWithStore(store);
store.dispatch(setLocale(getLanguage()));
store.dispatch(countDownSecondsToOpenMarket(i18n));
store.dispatch(loadTranslations(i18n));
store.dispatch(getTimeOffset());
store.dispatch(fetchOrganization());
store.dispatch(fetchCompanyGroup());
store.dispatch(fetchIndustry());
store.dispatch(fetchDerivative());
store.dispatch(fetchEconomy());

export default store;
