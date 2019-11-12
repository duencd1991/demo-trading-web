import reducerRegistry from '../../../helpers/ReducerRegistry';

const REDUCER_NAME = 'FIINTRADE_TA_STRATEGY';

export { REDUCER_NAME, reducer as default };

const initialState = {
  listDataTable: [],
  listDataTableById: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);
