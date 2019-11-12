import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';

class Item extends Component {
  render() {
    const { changeTab, name, isActive } = this.props;

    return (
      <li className="nav-item m-tabs__item" onClick={changeTab}>
        <a
          href="javascript:void(0)"
          className={`nav-link m-tabs__link ${isActive && 'active'}`}
          style={{ height: 'auto', lineHeight: 'unset' }}
        >
          <Translate value={name} />
        </a>
      </li>
    );
  }
}

export default Item;
