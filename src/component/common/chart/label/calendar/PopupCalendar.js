import React from 'react';
import Calender from './Calender';
import Toggle from './../Toggle';

class PopupCalendar extends React.Component {

  handleDateApply = (showHide) => (fromDate, toDate) => {
    const { changeDate } = this.props;

    changeDate(fromDate, toDate);
    showHide(false);
  };

  renderAction = (toggle) => {
    return (
      <a href="javascript:void(0)" className="btn btn-cus-nomal bg-b-color-3 ml-5" onClick={toggle}>
        <i className="icon-calendar"/>
      </a>
    );
  };

  renderPopup = (showHide, isShow) => {
    const { startDate, endDate } = this.props;

    return (
      isShow && (
        <Calender
          startDate={startDate}
          endDate={endDate}
          handleDateApply={this.handleDateApply(showHide)}
        />
      )
    );
  };

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', textAlign: 'right' }}>
        <div className="d-flex float-right Calendar-right">
          <Toggle
            renderAction={this.renderAction}
            renderPopup={this.renderPopup}
          />
        </div>
      </div>
    );
  }
}

export default PopupCalendar;
