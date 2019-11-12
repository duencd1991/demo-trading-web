import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import AlertPersonalTable from './Table';
import { I18n } from 'react-redux-i18n';
import {
  REDUCER_NAME,
  toogleEditSetting,
  fetchListPersonalAlertTypes,
} from '../reducer';
import EditTicker from './edit-ticker/EditTicker';

class AlertPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowEditSetting: props.isShowEditSetting,
    };
  }
  componentDidMount = () => {
    const { fetchListPersonalAlertTypes } = this.props;
    fetchListPersonalAlertTypes();
  };
  showEditSetting = () => {
    const { isShowEditSetting, toogleEditSetting } = this.props;
    toogleEditSetting(isShowEditSetting);
  };

  render() {
    const { isShowEditSetting, parentRef } = this.props;
    if (!isShowEditSetting) {
      return (
        <div className="alert-personal">
          <div className="btn-add-setting">
            <button
              className="float-right btn btn-cus bg-b-color-3 dropdown-toggle"
              title={I18n.t('watchListSummary.createNewWatchlistIcon')}
              type="button"
              onClick={this.showEditSetting}
              aria-expanded="false"
            >
              <i className="icon-plus-s fs-11" />
            </button>
          </div>
          <div className="tab-pane active" role="tabpanel">
            <AlertPersonalTable
              handleModify={this.showEditSetting}
              parentRef={parentRef}
            />
          </div>
        </div>
      );
    } else {
      return <EditTicker handleShowEdit={this.showEditSetting} />;
    }
  }
}

const mapStateToProps = state => {
  return {
    isShowEditSetting: state[REDUCER_NAME].isShowEditSetting,
  };
};

const mapDispatchToProps = { toogleEditSetting, fetchListPersonalAlertTypes };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertPersonal);
