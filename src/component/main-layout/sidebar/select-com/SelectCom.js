import React from 'react';
import './select-com.scss';
import { Search } from './search';
import Toggle from './../../../common/Toggle';

class SelectCom extends React.Component {
  renderAction = toggle => {
    return (
      <a href="javascript:void(0)" onClick={toggle}>
        <i id="menu-tutorial" className="icon-application" />
      </a>
    );
  };

  getClassName = isShow => {
    return `dropdown-menu sidebar-drop ${isShow ? 'show' : ''}`;
  };

  renderPopup = (showHide, isShow) => {
    return (
      <div
        className={this.getClassName(isShow)}
        style={{
          height: 'calc(100vh - 85px)',
          position: 'absolute',
          willChange: 'transform',
          top: '0px',
          left: '0px',
          transform: 'translate3d(5px, 40px, 0px)',
        }}
      >
        <Search showHide={showHide} {...this.props} />
      </div>
    );
  };

  render() {
    return (
      <li className="select-com-wrap">
        <div className="side-dropdown right setting-header">
          <div className="dropdown">
            <Toggle
              renderAction={this.renderAction}
              renderPopup={this.renderPopup}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default SelectCom;
