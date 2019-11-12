import userSettingService from '../../../core/services/Common/UserSettingService';
import reducerRegistry from '../../helpers/ReducerRegistry';

export const REDUCER_NAME = 'TECHNICAL:CHARTING';

const CREATE_TEMPLATE_SUCCESS = `${REDUCER_NAME}_CREATE_TEMPLATE_SUCCESS`;
const UPDATE_TEMPLATE_SUCCESS = `${REDUCER_NAME}_UPDATE_TEMPLATE_SUCCESS`;
const FETCH_TEMPLATE_SUCCESS = `${REDUCER_NAME}_FETCH_TEMPLATE_SUCCESS`;
const DELETE_TEMPLATE_SUCCESS = `${REDUCER_NAME}_DELETE_TEMPLATE_SUCCESS`;
const CHANGE_CURRENT_TEMPLATE_ID = `${REDUCER_NAME}_CHANGE_CURRENT_TEMPLATE_ID`;

export const changeCurrentTemplateId = id => ({
  type: CHANGE_CURRENT_TEMPLATE_ID,
  payload: id,
});

export const fetchTemplateRequest = () => dispatch => {
  userSettingService.getChartLayouts({}).then(({ items }) => {
    dispatch({
      type: FETCH_TEMPLATE_SUCCESS,
      payload: items,
    });
  });
};

export const createTemplateRequest = data => dispatch => {
  userSettingService.createChartLayout(data).then(({ result }) => {
    dispatch({
      type: CREATE_TEMPLATE_SUCCESS,
      payload: {
        ...data,
        chartLayoutId: result,
      },
    });
  });
};

export const updateTemplateRequest = data => dispatch => {
  userSettingService.updateChartLayout(data).then(() => {
    dispatch({
      type: UPDATE_TEMPLATE_SUCCESS,
      payload: data,
    });
  });
};

export const deleteTemplateRequest = data => dispatch => {
  userSettingService.deleteChartLayout(data).then(() => {
    dispatch({
      type: DELETE_TEMPLATE_SUCCESS,
      payload: data.layoutId,
    });
  });
};

const initialState = {
  templates: [],
  isLoading: false,
  currentTemplateId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.concat(action.payload),
        currentTemplateId: action.payload.chartLayoutId,
      };
    case FETCH_TEMPLATE_SUCCESS:
      const templates = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        templates,
      };
    case CHANGE_CURRENT_TEMPLATE_ID:
      return {
        ...state,
        currentTemplateId: action.payload,
      };
    case UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.map(template => {
          if (template.chartLayoutId === action.payload.layoutId) {
            return {
              ...template,
              ...action.payload,
            };
          }

          return template;
        }),
      };
    case DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.filter(
          item => item.chartLayoutId !== action.payload,
        ),
      };
    default:
      return state;
  }
};

reducerRegistry.register(REDUCER_NAME, reducer);
