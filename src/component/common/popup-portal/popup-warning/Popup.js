import React from 'react';
import '../Popup.scss';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup_inner">
        <span className="warn warning" />
        <span className="popup_inner_title">{this.props.text}</span>
        <span className="popup_inner_content">{this.props.textContent}</span>
      </div>
    );
  }
}

export default Popup;
