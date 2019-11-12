import React from 'react';
import { ConfirmPopup } from './../../../common/popup';
import { connect } from 'react-redux';
import { REDUCER_NAME, togglePopupResponseSave } from './../reducer';
import { I18n } from 'react-redux-i18n';
const WarningIcon = require('../../../../assets/images/svg/fundamental/warning-title.svg');

class Response extends React.Component {
  render() {
    const { messages, confirm, isShowMessage } = this.props;

    return (
      <div className="custom-modal">
        <ConfirmPopup
          warningIcon={WarningIcon}
          title={I18n.t('stockScreener.screenerMessage.warningTitle')}
          messages={messages}
          isShow={isShowMessage}
          enabledApply={false}
          enabledCancel={false}
          confirm={confirm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state[REDUCER_NAME].save.messages,
    isShowMessage: state[REDUCER_NAME].save.isShowMessage,
  };
};

const mapDispatchToProps = {
  confirm: togglePopupResponseSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Response);
