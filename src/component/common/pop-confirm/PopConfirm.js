import React, { PureComponent } from 'react';
import './pop-confirm.scss';
import PropTypes from 'prop-types';

class PopConfirm extends PureComponent {
  state = {
    isShowConfirm: false,
    top: 0,
    left: 0,
  };

  childRef = React.createRef();
  confirmRef = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.onOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onOutsideClick);
  }

  onClickOk = () => {
    const { onOk } = this.props;
    this.hideConfirm();
    onOk();
  };

  onClickCancel = () => {
    const { onCancel } = this.props;
    this.hideConfirm();
    onCancel();
  };

  hideConfirm = () => {
    this.setState({
      isShowConfirm: false,
    });
  };

  onOutsideClick = e => {
    const { isShowConfirm } = this.state;
    if (!this.confirmRef.current.contains(e.target) && isShowConfirm) {
      this.hideConfirm();
    }
  };

  getContentPosition = () => {
    const { top, left, width } = this.childRef.current.getBoundingClientRect();
    const {
      height,
      width: confirmWidth,
    } = this.confirmRef.current.getBoundingClientRect();
    const diff = Math.abs(width - confirmWidth);

    return {
      top: top - height - 6,
      left: left + diff / 2,
    };
  };

  showConfirm = e => {
    e.preventDefault();
    e.stopPropagation();
    const { top, left } = this.getContentPosition();
    this.setState({
      top,
      left,
      isShowConfirm: true,
    });
  };

  render() {
    const { isShowConfirm, top, left } = this.state;
    const {
      children,
      okText,
      cancelText,
      message,
      onOk,
      onCancel,
    } = this.props;
    return (
      <div className="pop-confirm d-inline-block position-relative">
        <div
          ref={this.childRef}
          className="d-inline-block"
          onClick={this.showConfirm}
        >
          {children}
        </div>

        <div
          ref={this.confirmRef}
          className="pop-confirm-content"
          style={{
            top: isShowConfirm ? top : 9999,
            left: isShowConfirm ? left : 9999,
          }}
        >
          <div className="pop-confirm-content-inner">
            <div className="message">{message}</div>
            <button onClick={this.onClickCancel} className="btn mr-5">
              {cancelText}
            </button>
            <button onClick={this.onClickOk} className="btn">
              {okText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

PopConfirm.propTypes = {
  children: PropTypes.node.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  message: PropTypes.string,
};

PopConfirm.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
  okText: 'Ok',
  cancelText: 'Cancel',
  message: 'Are you sure ???',
};

export default PopConfirm;
