import React from 'react';
import PropTypes from 'prop-types';
import PopupContent from './PopupContent';
import './popup.scss';

class Popup extends React.Component {

  getClassName = () => {
    const { isShow } = this.props;

    return isShow
      ? "popup-wrap show"
      : "popup-wrap";
  };

  render() {
    const {
      isShow,
      confirm,
      renderHeader,
      renderBody,
      renderFooter,
    } = this.props;

    return (
      <div className={this.getClassName()}>
        <div className="popup">
          <PopupContent
            isShow={isShow}
            confirm={confirm}
            renderHeader={renderHeader}
            renderBody={renderBody}
            renderFooter={renderFooter}
          />
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  isShow: false,
  confirm: () => {
  },
  renderHeader: () => {
  },
  renderBody: () => {
  },
  renderFooter: () => {
  },
};

export default Popup;
