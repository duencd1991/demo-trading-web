import React from 'react';
import '../Popup.scss';
import PropTypes from 'prop-types';
import Popup from './Popup';
import PopupPortal from '../PopupPortal';

class PopupRemove extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {}
  togglePopup = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };
  onOverlayClicked() {
    if (this.props.onOverlayClicked) {
      this.setState({ show: false });
    }
  }
  render() {
    const { parentRef, title, textContent } = this.props;
    return (
      <div>
        <i onClick={this.togglePopup} className="icon-bin-delete" />
        <PopupPortal active={this.state.show} parentRef={parentRef}>
          <div
            className="popup-warning"
            onClick={() => this.onOverlayClicked()}
          />
          <Popup
            title={title}
            textContent={textContent}
            handleClickClose={this.togglePopup}
          />
        </PopupPortal>
      </div>
    );
  }
}

PopupRemove.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  parentRef: PropTypes.object.isRequired,
};

PopupRemove.defaultProps = {
  title: '',
  placeHolder: '',
  isShow: false,
  confirm: () => {},
  parentRef: document.body,
};

export default PopupRemove;
