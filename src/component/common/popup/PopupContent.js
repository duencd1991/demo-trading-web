import React from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

class PopupContent extends React.Component {

  handleClickOutside = () => {
    const { isShow, confirm } = this.props;
    if (isShow) {
      confirm(false);
    }
  };

  render() {
    const {
      renderHeader,
      renderBody,
      renderFooter,
    } = this.props;

    return (
      <div className="popup-content">
        <div className="popup-header">
          {renderHeader()}
        </div>

        <div className="popup-body">
          {renderBody()}
        </div>
        <div className="popup-footer text-right">
          {renderFooter()}
        </div>
      </div>
    );
  }
}

PopupContent.propTypes = {
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
};

PopupContent.defaultProps = {
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

export default enhanceWithClickOutside(PopupContent);
