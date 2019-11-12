import reducerRegistry from '../helpers/ReducerRegistry';

export const REDUCER_NAME = 'MAIN_LAYOUT';

export const SET_DRAG_POPUP = `${REDUCER_NAME}_SET_DRAG_POPUP`;
export const setDragPopup = payload => ({
  type: SET_DRAG_POPUP,
  payload,
});

const initialState = {
  dragPopup: {
    isShow: false,
    componentName: '',
    content: '',
    tooltip: '',
    title: '',
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAG_POPUP:
      return {
        ...state,
        dragPopup: {
          ...state.dragPopup,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
