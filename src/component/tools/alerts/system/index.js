import React from 'react';
import './index.scss';
import AlertSystemTable from './Table';
import PopupSettingAlert from './PopupSettingAlert';
import SearchBox from '../common/SearchBox';
class AlertSystem extends React.Component {
  render() {
    const { parentRef } = this.props;
    return (
      <div className="tab-content">
        <div className="d-flex w-100 ml-0 mb-10 mr-0 justify-content-between ">
          <SearchBox />
          <PopupSettingAlert parentRef={parentRef} />
        </div>
        <AlertSystemTable />
      </div>
    );
  }
}

export default AlertSystem;
