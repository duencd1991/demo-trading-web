import React, { Component } from 'react';
import { SelectCom } from './select-com';
import Setting from './Setting';
import { SaveLayout } from './save-layout';
import Workspace from './Workspace';
import Reload from './Reload';
import Alert from './Alert';
import Excel from './Excel';

class SideBar extends Component {
  render() {
    return (
      <div className="sideleft-section">
        <ul>
          <SelectCom {...this.props} />
          <Workspace />
          <SaveLayout />
          <Reload />
          <Excel />
          <Setting />
          <Alert />
        </ul>
      </div>
    );
  }
}

export default SideBar;
