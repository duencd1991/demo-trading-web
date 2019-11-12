import React from 'react';
import './PopupSettingAlert.scss';
import PropTypes from 'prop-types';
import PopupContent from './PopupContent';
import PopupPortal from '../../../../common/popup-portal/PopupPortal';

class PopupSettingAlert extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: true });
  }

  onOverlayClicked() {
    if (this.props.onOverlayClicked) {
      this.setState({ show: false });
      if (this.props.handerClick) {
        this.props.handerClick();
      }
    }
  }
  render() {
    const { parentRef, text, textContent, listAlertGroups } = this.props;
    return (
      <PopupPortal active={this.state.show} parentRef={parentRef}>
        <div
          className="popup-warning"
          onClick={() => this.onOverlayClicked()}
        />
        <PopupContent
          text={text}
          textContent={textContent}
          onClosePopup={() => this.onOverlayClicked()}
        />
      </PopupPortal>
    );
  }
}

PopupSettingAlert.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  parentRef: PropTypes.object.isRequired,
};

PopupSettingAlert.defaultProps = {
  title: '',
  placeHolder: '',
  isShow: false,
  parentRef: document.body,
};

export default PopupSettingAlert;
