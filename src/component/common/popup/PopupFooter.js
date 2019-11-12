import React from 'react';
import { Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';

class PopupFooter extends React.PureComponent {
  handleClick = isApply => () => {
    const { confirm } = this.props;

    confirm(isApply);
  };

  render() {
    const { enabledCancel, enabledApply } = this.props;

    return (
      <div className="popup-button mt-5">
        {enabledCancel && (
          <button
            className="btn btn-cancel mr-10"
            onClick={this.handleClick(false)}
          >
            <Translate value="common.CANCEL" />
          </button>
        )}
        {enabledApply && (
          <button className="btn btn-primary" onClick={this.handleClick(true)}>
            <Translate value="common.YES" />
          </button>
        )}
      </div>
    );
  }
}

PopupFooter.propTypes = {
  enabledCancel: PropTypes.bool.isRequired,
  enabledApply: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
};

PopupFooter.defaultProps = {
  enabledCancel: true,
  enabledApply: true,
  confirm: () => {},
};

export default PopupFooter;
