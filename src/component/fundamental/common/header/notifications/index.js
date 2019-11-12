import React from 'react';
import './index.scss';

const TYPE_1 = 'Strictly Controlled Group';
const TYPE_2 = 'Suspended from Trading Group';
const TYPE_3 = 'Warning Group';

class Notifications extends React.Component {
  getType = () => {
    return TYPE_1;
  };

  render() {
    const {
      data: { controlStatusCode, controlStatusName },
    } = this.props;

    return (
      <div className="notifications-wrapper">
        {controlStatusCode && controlStatusCode !== -1 && (
          <>
            <div className="box">WATCH OUT</div>
            <div className="notice-content">
              <div className="d-flex">
                Has been listed in the{' '}
                <div className="important-content ml-2">{` ${controlStatusName} Group `}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

Notifications.defaultProps = {
  data: {
    controlStatusCode: -1,
    controlStatusName: 'Group_Name',
  },
};

export default Notifications;
