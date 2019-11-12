import React from 'react';
import Toggle from './../../common/Toggle';
import { connect } from 'react-redux';
import {
  REDUCER_NAME,
  fetchDataWorkspace,
  deleteWorkspace,
  confirmRemoveWorkspace,
  showConfirmRemoveWorkspace,
} from './reducer';
import { getUnique } from './../../helpers/Common';
import { Responsive } from './../../common/responsive';
import Loading from './../../common/loading/Loading';
import Link from './../../common/tab';
import ScrollComponent from './../../common/ScrollComponent';
import LayoutHelper from './../../helpers/Layout';
import { nameSaveStateDefault } from './../../../configs/LayoutConfig';
import Const from './Const';
import { ConfirmPopup } from './../../common/popup';
import { I18n } from 'react-redux-i18n';
import './workspace.scss';

class Workspace extends React.Component {
  componentDidMount() {
    const { fetchDataWorkspace } = this.props;

    fetchDataWorkspace();
  }

  renderAction = toggle => {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="javascript:void(0)" aria-haspopup="true" aria-expanded="false" onClick={toggle}>
        <i id="workspace-tutorial" className="icon-slide" />
      </a>
    );
  };

  handleDeleteWorkspace = workspaceId => () => {
    const { showConfirmRemoveWorkspace } = this.props;
    showConfirmRemoveWorkspace(workspaceId);
  };

  handleApplyWorkspace = (workspace, showHide) => () => {
    var ws = JSON.parse(workspace);
    LayoutHelper.reload(ws);
    LayoutHelper.saveState(nameSaveStateDefault, workspace);
    showHide(false);
  };

  renderEdit = () => {
    return (
      <span
        className="ml-5 mr-5"
        style={{
          cursor: 'pointer',
        }}
      >
        <i className="icon-pencil-edit fs-12 text-stock-chart" />
      </span>
    );
  };

  renderDelete = workspaceId => {
    return (
      <span
        onClick={this.handleDeleteWorkspace(workspaceId)}
        style={{
          cursor: 'pointer',
        }}
      >
        <i className="icon-bin-delete fs-12 text-stock-chart" />
      </span>
    );
  };

  renderBottomImage = (type, name, workspaceId) => {
    return (
      <div className="text-center">
        <span>{name}</span>
        {/*<input*/}
        {/*className="text-input"*/}
        {/*type="text"*/}
        {/*onChange={() => {}}*/}
        {/*ref={this.inputEditRef}*/}
        {/*defaultValue={name}*/}
        {/*/>*/}
        {type === Const.TYPE_WORKSPACE.USER && (
          <>
            {this.renderEdit()} {this.renderDelete(workspaceId)}
          </>
        )}
      </div>
    );
  };

  renderGroup = (type, data, title, showHide, width = 640) => {
    return (
      <div>
        <div className="top-nav">
          <Link isLineLinkLeft={true} currentTab={1} listTab={title} />
        </div>
        <div className="list" style={{ width }}>
          <Responsive
            component={{ width }}
            margin={10}
            SM_SIZE={256}
            XS_SIZE={128}
          >
            {data.map(({ thumbnails, name, workspaceId, workspace }, index) => {
              return width => (
                <div>
                  <div style={{ minHeight: 128, backgroundColor: '#555555' }}>
                    <img
                      onClick={this.handleApplyWorkspace(workspace, showHide)}
                      width={width}
                      key={getUnique() + index}
                      src={thumbnails}
                      alt=""
                      style={{
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  {this.renderBottomImage(type, name, workspaceId)}
                </div>
              );
            })}
          </Responsive>
        </div>
      </div>
    );
  };

  renderPopup = (showHide, isShow) => {
    const {
      listWorkspaceUser,
      listWorkspaceSystem,
      isLoading,
      confirmRemoveWorkspace,
      isShowConfirmRemoveWorkspace,
    } = this.props;

    return (
      <div
        className={`dropdown-menu sidebar-drop ${isShow ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton"
        style={{
          position: 'absolute',
          willChange: 'transform',
          top: '0px',
          left: '0px',
          transform: 'translate3d(5px, 40px, 0px)',
        }}
      >
        <ConfirmPopup
          title={I18n.t('message.remove_title', { name: 'workspace' })}
          isShow={isShowConfirmRemoveWorkspace}
          messages={[I18n.t('message.remove_message', { name: 'workspace' })]}
          confirm={confirmRemoveWorkspace}
        />
        <ScrollComponent appendStyle={{ maxHeight: 300 }}>
          <div className="group-list drop-100">
            <div className="pl-20 pr-20 position-relative">
              {isLoading && <Loading />}
              {this.renderGroup(
                Const.TYPE_WORKSPACE.SYSTEM,
                listWorkspaceSystem,
                'layout.workspace.recommendedForYou',
                showHide,
              )}
              {this.renderGroup(
                Const.TYPE_WORKSPACE.USER,
                listWorkspaceUser,
                'layout.workspace.workspaces',
                showHide,
              )}
            </div>
          </div>
        </ScrollComponent>
      </div>
    );
  };

  render() {
    return (
      <li className="workspace-wrap">
        <div className="side-dropdown right setting-header">
          <div className="dropdown">
            <Toggle
              renderAction={this.renderAction}
              renderPopup={this.renderPopup}
            />
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    listWorkspaceSystem: state[REDUCER_NAME].saveLayout.listWorkspaceSystem,
    listWorkspaceUser: state[REDUCER_NAME].saveLayout.listWorkspaceUser,
    isLoading: state[REDUCER_NAME].saveLayout.isLoading,
    isShowConfirmRemoveWorkspace:
      state[REDUCER_NAME].saveLayout.isShowConfirmRemoveWorkspace,
  };
};

const mapDispatchToProps = {
  fetchDataWorkspace,
  deleteWorkspace,
  confirmRemoveWorkspace,
  showConfirmRemoveWorkspace,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);
