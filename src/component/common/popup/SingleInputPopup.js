import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import PopupHeader from './PopupHeader';
import PopupFooter from './PopupFooter';

class SingleInputPopup extends React.Component {
  inputRef = React.createRef();

  renderHeader = () => {
    const { title } = this.props;

    return <PopupHeader title={title} />;
  };

  renderBody = () => {
    const { placeHolder } = this.props;

    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder={placeHolder}
          ref={this.inputRef}
        />
        <button className="btn-cancel-search" type="button">
          <i className="icon-cancel" onClick={this.clearInput} />
        </button>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <PopupFooter
        confirm={this.handleConfirm}
        enabledApply={true}
        enabledCancel={true}
      />
    );
  };

  clearInput = () => {
    this.inputRef.current.value = '';
  };

  handleConfirm = isApply => {
    const { confirm } = this.props;

    const inputVal = this.inputRef.current ? this.inputRef.current.value : '';

    this.clearInput();

    return confirm(isApply, inputVal);
  };

  render() {
    const { isShow } = this.props;

    return (
      <Popup
        isShow={isShow}
        confirm={this.handleConfirm}
        renderHeader={this.renderHeader}
        renderBody={this.renderBody}
        renderFooter={this.renderFooter}
      />
    );
  }
}

SingleInputPopup.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
};

SingleInputPopup.defaultProps = {
  title: '',
  placeHolder: '',
  isShow: false,
  confirm: () => {},
};

export default SingleInputPopup;
