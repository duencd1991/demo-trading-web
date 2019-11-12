import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import { REDUCER_NAME as REDUCER_NAME_NOTI_ALERTS } from '../../../main-layout/header/right/alerts/reducer';
import { I18n } from 'react-redux-i18n';
import PopupSettingAl from './popup-setting-alert/PopupSettingAlert';
class PopupSettingAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
      isclickSetting: false,
    };
  }
  togglePopup = () => {
    this.setState({ ...this.state, isShowPopup: !this.state.isShowPopup });
  };
  render() {
    const { parentRef } = this.props;

    return (
      <div className="setting-alert setting-alert">
        <i onClick={this.togglePopup} className="icon-settings fs-11" />
        {this.state.isShowPopup && (
          <PopupSettingAl
            text={I18n.t('stRanking.popup.warning.title')}
            isShow={this.state.isShowPopup}
            onOverlayClicked={true}
            handerClick={this.togglePopup}
            textContent={I18n.t('stRanking.popup.warning.content')}
            parentRef={parentRef ? parentRef.current : null}
          />
        )}
      </div>
    );
  }
}

PopupSettingAlert.propTypes = {};

const mapStateToProps = state => ({
  component: state[REDUCER_NAME].component,
  listAlertGroups: state[REDUCER_NAME_NOTI_ALERTS].listAlertGroups,
  theme: state.theme,
  i18n: state.i18n,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupSettingAlert);
