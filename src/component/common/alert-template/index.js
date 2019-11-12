import './index.scss';
import React, { Component } from 'react';

class AlertTemplate extends Component {
  render() {
    var myArray = ['bg-lg-blue', 'bg-lg-red', 'bg-lg-yellow'];
    const { style, options, message, close } = this.props;
    var delay = 500;
    return (
      <div className="alert-wrapper" style={{ transitionDelay: `${delay}ms` }}>
        <div
          className={`alert-img bg-lg-blue ${
            myArray[Math.floor(Math.random() * myArray.length)]
          }`}
        >
          {message.ticker}
        </div>
        <div className="alert-message">
          <div className="message-title">
            <div className="title mr-5">{message.title}</div>
            <div className="time-tag ml-5">{message.timer}</div>
          </div>
          <div className="message-content">{message.message}</div>
        </div>
        <div className="close-button" onClick={close}>
          x
        </div>
      </div>
    );
  }
}

export default AlertTemplate;
