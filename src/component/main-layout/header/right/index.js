import React from 'react';
import AccountInfo from './AccountInfo';
import Notification from './alerts/Notification';
import Help from './Help';
import Language from './Language';
import Logout from './Logout';
import TimeAndMode from './TimeAndMode';
import './index.scss';
import NotifiAlert from './alerts/NotifiAlert';

export default function() {
  return (
    <div className="main-layout-top-right-wrap">
      <div className="top-right float-right">
        <AccountInfo />
        <Notification />
        <NotifiAlert />
        <Help />
        <Language />
        <Logout />
      </div>
      <TimeAndMode />
    </div>
  );
}
