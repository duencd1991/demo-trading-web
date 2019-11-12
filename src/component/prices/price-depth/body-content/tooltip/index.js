import React, { Component } from 'react';
import './index.scss';

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
  }

  hideTooltip = () => {
    this.setState({ displayTooltip: false })
  }
  showTooltip = () => {
    this.setState({ displayTooltip: true })
  }

  render() {
    let message = this.props.message
    let position = this.props.position
    let checkDisplay = {
      display: message === null ? 'none' : 'block'
    }
    return (
      <span className='tooltip-pricedepth' onMouseLeave={this.hideTooltip}>
        {this.state.displayTooltip &&
          <div className={`tooltip-bubble tooltip-${position}`} style = {checkDisplay}>

            <div className='tooltip-message'>{`Unlock with FiinTrade Premium`}</div>
          </div>
        }
        <span
          onMouseOver={this.showTooltip}
        >
          {this.props.children}
        </span>
      </span>
    )
  }
}

export default Tooltip;
