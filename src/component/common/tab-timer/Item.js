import React, { Component } from "react";

class Item extends Component {
  render() {
    return (
      <li className="tab-timer__item" onClick={this.props.changeTab}>
        {this.props.isActive ? (
          <a
            href="javascript:void(0)"
            onClick={this.props.changeTab}
            className="tab-timer__link active"
          >
            {this.props.name}
          </a>
        ) : (
          <a href="javascript:void(0)" className="tab-timer__link">
            {this.props.name}
          </a>
        )}
      </li>
    );
  }
}

export default Item;
