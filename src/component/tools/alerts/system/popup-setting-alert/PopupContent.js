import React from 'react';
import './PopupSettingAlert.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import ScrollComponent from '../../../../common/ScrollComponent';
import ToggleSwitch from '../../../../common/toggle-switch/ToggleSwitch';
//TODO import Const from './Const';
import {
  REDUCER_NAME,
  toogleActive,
  // subribeAlertGroups,
} from '../../reducer';
import {
  REDUCER_NAME as REDUCER_NAME_NOTI_ALERTS,
  subribeAlertGroups,
} from '../../../../main-layout/header/right/alerts/reducer';
import Loading from '../../../../common/loading/Loading';
class PopupContent extends React.Component {
  componentDidMount() {}
  handleClick = e => {
    this.props.onClosePopup();
  };

  toogleActive = () => {
    const { toogleActive } = this.props;
    toogleActive(true);
  };
  changeActive = (index, isSubscribed) => {
    let { listAlertGroups } = this.props;
    listAlertGroups[index].subscribed = !isSubscribed;
  };
  subribeAlertGroups = () => {
    const { subribeAlertGroups } = this.props;
    subribeAlertGroups();
    this.handleClick();
  };
  renderButtonSave = () => {
    return (
      <>
        <button className="btn-setting-save" onClick={this.subribeAlertGroups}>
          {I18n.t('alertSystem.button.save')}
        </button>
        <button className="btn-setting-cancel" onClick={this.handleClick}>
          {I18n.t('alertSystem.button.cancel')}
        </button>
      </>
    );
  };
  renderPopupBodyContent = () => {
    const { listAlertGroups, isLoadingSetting } = this.props;
    return (
      <>
        <div className="popup-body-content">
          {isLoadingSetting ? (
            <Loading />
          ) : (
            <ScrollComponent>
              {listAlertGroups.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="d-flex align-items-baseline align-content-baseline pt-2 pb-1 pl-2 "
                  >
                    <ToggleSwitch
                      title={item.alertGroup}
                      isActive={item.subscribed}
                      handleToggle={() => this.changeActive(i, item.subscribed)}
                    />
                  </div>
                );
              })}
            </ScrollComponent>
          )}
        </div>
        <div className="btn-setting d-flex justify-content-end ">
          {isLoadingSetting ? '' : this.renderButtonSave()}
        </div>
      </>
    );
  };
  render() {
    return (
      <div className="popup-setting-alert float-right">
        <div className="popup-content">
          <div className="popup-header">
            <span className="popup-header-text">
              {I18n.t('alertSystem.titlePopup.setting')}
              <i className="icon-close-popup" onClick={this.handleClick} />
            </span>
          </div>
          <div className="popup-body">{this.renderPopupBodyContent()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  listAlertGroups: state[REDUCER_NAME_NOTI_ALERTS].listAlertGroups,
  isLoadingSetting: state[REDUCER_NAME].isLoadingSetting,
  theme: state.theme,
  i18n: state.i18n,
});

const mapDispatchToProps = {
  toogleActive,
  subribeAlertGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupContent);
