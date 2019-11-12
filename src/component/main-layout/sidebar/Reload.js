import React from 'react';
import LayoutHelper from './../../helpers/Layout';

class Reload extends React.Component {
  handleClick = () => {
    LayoutHelper.reload();
  };

  render() {
    return (
      <li>
        <a href="javascript:void(0)" onClick={this.handleClick}>
          <i className="icon-refresh" />
        </a>
      </li>
    );
  }
}

export default Reload;
