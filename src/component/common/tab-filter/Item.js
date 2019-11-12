import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div
        //style={{background: 'transparent' , width : 80}}
        className="tab-timer__item-two"
        onClick={this.props.changeTab}
      >
        {this.props.isActive ? (
          <a
            style={{ background: 'transparent' }}
            href="javascript:void(0)"
            onClick={this.props.changeTab}
            //className="tab-timer__link active"
            className="item-tab active"
          >
            {this.props.name}
          </a>
        ) : (
          <a
            style={{ background: 'transparent' }}
            href="javascript:void(0)"
            //className="tab-timer__link"
            className="item-tab"
          >
            {this.props.name}
          </a>
        )}
      </div>
    );
  }
}

export default Item;
