import React, { Component } from 'react';
import './EconomyStyle.scss';
class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTooltip: false,
    };
  }

  hideTooltip = () => {
    this.setState({ displayTooltip: false });
  };
  showTooltip = () => {
    this.setState({ displayTooltip: true });
  };

  render() {
    let message = this.props.message;
    let messageFiin = this.props.messageFiin;
    let position = this.props.position;
    let checkDisplay = {
      display: message === null ? 'none' : 'block',
    };
    return (
      <span className="tooltip-watchlist" onMouseLeave={this.hideTooltip}>
        {this.state.displayTooltip && (
          <div
            className={`tooltip-bubble tooltip-${position}`}
            style={checkDisplay}
          >
            <div className="tooltip-message">
              {message ? 'Original Post: ' : ''}{' '}
              <a href={message} target="_blank" rel="noopener">
                {message ? message.substring(0, 15) : ''}
              </a>
              {message ? <br /> : ''}
              {messageFiin ? 'FiinGroup Review: ' : ''}
              <a href={messageFiin} target="_blank">
                {messageFiin ? messageFiin.substring(0, 12) : ''}
              </a>
            </div>
          </div>
        )}
        <span onMouseOver={this.showTooltip}>{this.props.children}</span>
      </span>
    );
  }
}

export default Tooltip;
