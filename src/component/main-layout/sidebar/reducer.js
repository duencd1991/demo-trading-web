import reducerRegistry from '../../helpers/ReducerRegistry';
import LayoutHelper from '../../helpers/Layout';
import { exportToPdf } from './../../helpers/Export';
import userSettingService from './../../../core/services/Common/UserSettingService';
import { formatData } from './../../helpers/Api';
import { nameSaveStateDefault } from './../../../configs/LayoutConfig';
import { cloneDeep } from 'lodash';
import Const from './Const';

const REDUCER_NAME = `MAIN_LAYOUT:SIDEBAR:`;
const TOGGLE_SAVE_LAYOUT_POPUP = `${REDUCER_NAME}TOGGLE_SAVE_LAYOUT_POPUP`;
const SHOW_HIDE_SAVE_LAYOUT_POPUP = `${REDUCER_NAME}SHOW_HIDE_SAVE_LAYOUT_POPUP`;
const FETCH_LIST_WORKSPACE = `${REDUCER_NAME}FETCH_LIST_WORKSPACE`;
const SET_LOADING_WORKSPACE = `${REDUCER_NAME}SET_LOADING_WORKSPACE`;
const APPEND_WORKSPACE = `${REDUCER_NAME}APPEND_WORKSPACE`;
const REMOVE_WORKSPACE = `${REDUCER_NAME}REMOVE_WORKSPACE`;
const TOGGLE_CONFIRM_REMOVE_WORKSPACE = `${REDUCER_NAME}TOGGLE_CONFIRM_REMOVE_WORKSPACE`;
const SHOW_CONFIRM_REMOVE_WORKSPACE = `${REDUCER_NAME}SHOW_CONFIRM_REMOVE_WORKSPACE`;

export {
  reducer as default,
  REDUCER_NAME,
  toggleSaveLayoutPopup,
  actionSaveLayoutPopup,
  fetchDataWorkspace,
  setLoading,
  deleteWorkspace,
  confirmRemoveWorkspace,
  showConfirmRemoveWorkspace,
};

function toggleSaveLayoutPopup() {
  return {
    type: TOGGLE_SAVE_LAYOUT_POPUP,
  };
}

function fetchDataWorkspace() {
  return dispatch => {
    dispatch(setLoading(SET_LOADING_WORKSPACE, true));
    userSettingService.getWorkspace().then(response => {
      const listWorkspace = formatData(response);
      dispatch(setLoading(SET_LOADING_WORKSPACE, false));
      dispatch({
        type: FETCH_LIST_WORKSPACE,
        payload: getWorkspaceByTypeCode(listWorkspace),
      });
    });
  };
}

function actionSaveLayoutPopup(isApply, name) {
  return dispatch => {
    if (isApply) {
      dispatch({
        type: SHOW_HIDE_SAVE_LAYOUT_POPUP,
        payload: {
          isShowPopup: false,
        },
      });

      exportToPdf(
        'goldenLayout',
        name,
        null,
        null,
        base64Png => {
          const config = LayoutHelper.getStateFromConfig({});
          LayoutHelper.saveState(nameSaveStateDefault, config);

          const params = {
            name,
            workspace: config,
            thumbnails: base64Png,
            description: 'test',
            isActive: true,
          };

          userSettingService.newWorkspace(params).then(response => {
            if (response && response.result) {
              dispatch(
                appendWorkspace({
                  ...params,
                  workspaceId: response.result,
                  typeCode: Const.TYPE_WORKSPACE.USER,
                }),
              );
            }
          });
        },
        0.25,
      );
    } else {
      dispatch({
        type: SHOW_HIDE_SAVE_LAYOUT_POPUP,
        payload: {
          isShowPopup: false,
        },
      });
    }
  };
}

function appendWorkspace(workspace) {
  return {
    type: APPEND_WORKSPACE,
    payload: {
      workspace,
    },
  };
}

function deleteWorkspace(workSpaceId) {
  return dispatch => {
    userSettingService.deleteWorkspace({ workSpaceId }).then(response => {
      dispatch(removeWorkspace(workSpaceId));
    });
  };
}

function removeWorkspace(workspaceId) {
  return {
    type: REMOVE_WORKSPACE,
    payload: {
      workspaceId,
    },
  };
}

function setLoading(type, isLoading) {
  return {
    type,
    payload: {
      isLoading,
    },
  };
}

function confirmRemoveWorkspace(isApply) {
  return (dispatch, getState) => {
    if (isApply) {
      const workspaceId = getState()[REDUCER_NAME].saveLayout.removeWorkSpaceId;
      dispatch(deleteWorkspace(workspaceId));
    }
    dispatch(toggleConfirmRemoveWorkspace(false));
  };
}

function showConfirmRemoveWorkspace(workspaceId) {
  return {
    type: SHOW_CONFIRM_REMOVE_WORKSPACE,
    payload: {
      workspaceId,
    },
  };
}

function toggleConfirmRemoveWorkspace(isShow) {
  return {
    type: TOGGLE_CONFIRM_REMOVE_WORKSPACE,
    payload: {
      isShow,
    },
  };
}

const initialState = {
  saveLayout: {
    isShowPopup: false,
    listWorkspaceUser: [],
    listWorkspaceSystem: [],
    isLoading: false,
    isShowConfirmRemoveWorkspace: false,
    removeWorkSpaceId: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_REMOVE_WORKSPACE:
      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          removeWorkSpaceId: action.payload.workspaceId,
          isShowConfirmRemoveWorkspace: true,
        },
      };
    case TOGGLE_CONFIRM_REMOVE_WORKSPACE:
      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          isShowConfirmRemoveWorkspace: action.payload.isShow,
        },
      };
    case TOGGLE_SAVE_LAYOUT_POPUP:
      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          isShowPopup: !state.saveLayout.isShowPopup,
        },
      };

    case SHOW_HIDE_SAVE_LAYOUT_POPUP:
    case FETCH_LIST_WORKSPACE:
    case SET_LOADING_WORKSPACE:
      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          ...action.payload,
        },
      };

    case APPEND_WORKSPACE:
      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          listWorkspaceUser: [
            ...cloneDeep(state.saveLayout.listWorkspaceUser),
            action.payload.workspace,
          ],
        },
      };

    case REMOVE_WORKSPACE:
      const listWorkspaceUser = cloneDeep(
        state.saveLayout.listWorkspaceUser,
      ).filter(item => {
        return item.workspaceId !== action.payload.workspaceId;
      });

      return {
        ...state,
        saveLayout: {
          ...state.saveLayout,
          listWorkspaceUser,
        },
      };

    default:
      return state;
  }
}

reducerRegistry.register(REDUCER_NAME, reducer);

function getWorkspaceByTypeCode(data) {
  const listWorkspaceUser = [];
  const listWorkspaceSystem = [];

  data.forEach(item => {
    if (item.typeCode === Const.TYPE_WORKSPACE.SYSTEM) {
      listWorkspaceSystem.push(item);
    }
    if (item.typeCode === Const.TYPE_WORKSPACE.USER) {
      listWorkspaceUser.push(item);
    }
  });

  return {
    listWorkspaceSystem,
    listWorkspaceUser,
  };
}
