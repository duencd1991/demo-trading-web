import React from 'react';
import '../Popup.scss';
import PropTypes from 'prop-types';
import Popup from './Popup';
import PopupPortal from '../PopupPortal';

class PopupWarning extends React.Component {
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
    }
  }
  render() {
    const { parentRef, text, textContent } = this.props;
    return (
      <div>
        <PopupPortal active={this.state.show} parentRef={parentRef}>
          <div
            className="popup-warning"
            onClick={() => this.onOverlayClicked()}
          />
          <Popup text={text} textContent={textContent} />
        </PopupPortal>
      </div>
    );
  }
}

PopupWarning.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  parentRef: PropTypes.object.isRequired,
};

PopupWarning.defaultProps = {
  title: '',
  placeHolder: '',
  isShow: false,
  confirm: () => {},
  parentRef: document.body,
};

export default PopupWarning;
