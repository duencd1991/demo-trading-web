import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import PopupHeader from './PopupHeader';
import PopupFooter from './PopupFooter';
import { connect } from 'react-redux';

class ConfirmPopup extends React.Component {
  renderHeader = () => {
    const { title, warningIcon } = this.props;

    return <PopupHeader title={title} warningIcon={warningIcon} />;
  };

  renderBody = () => {
    const { messages } = this.props;
    return messages.map((message, index) => {
      return <div key={index}>{message}</div>;
    });
  };

  renderFooter = () => {
    const { confirm, enabledApply, enabledCancel } = this.props;

    return (
      <PopupFooter
        confirm={confirm}
        enabledApply={enabledApply}
        enabledCancel={enabledCancel}
      />
    );
  };

  render() {
    const { isShow, confirm } = this.props;

    return (
      <Popup
        isShow={isShow}
        confirm={confirm}
        renderHeader={this.renderHeader}
        renderBody={this.renderBody}
        renderFooter={this.renderFooter}
      />
    );
  }
}

ConfirmPopup.propTypes = {
  title: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  enabledApply: PropTypes.bool,
  enabledCancel: PropTypes.bool,
  warningIcon: PropTypes.string,
};

ConfirmPopup.defaultProps = {
  title: '',
  messages: [],
  isShow: false,
  confirm: () => {},
  enabledApply: true,
  enabledCancel: true,
  warningIcon: '',
};

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(ConfirmPopup);
