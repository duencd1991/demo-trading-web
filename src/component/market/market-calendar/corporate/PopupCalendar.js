import React, { Component } from 'react';
import Calendar from './../../../common/calendar/Calender';
import onClickOutside from "react-click-outside";
import moment from 'moment';
import './CorporateStyle.scss';
import Toggle from './../../../common/Toggle';

class PopupCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      endDate: moment(new Date()),
    };
  }

  getMondayOfCurrentWeek = (date) => {
    date = new Date(date);
    const day = date.getDay();
    return date.getDate() - day + (day === 0 ? -6 : 1);
  };

  handleDatePicker = (showHide) => (startDate, endDate) => {
    let dateOfMonday = this.getMondayOfCurrentWeek(new Date());
    let curr = new Date();

    if (!startDate) {
      startDate = endDate;
    }

    if (!endDate) {
      endDate = startDate;
    }

    if (!startDate && !endDate) {
      startDate = new Date(curr.setDate(dateOfMonday));
      endDate = new Date(curr.setDate(dateOfMonday + 7));
    }

    const formatStartDate = startDate ? moment(startDate).format('MM/DD/YYYY') : null;
    const formatEndDate = endDate ? moment(endDate).format('MM/DD/YYYY') : null;
    this.props.setDateRangeOption(formatStartDate, formatEndDate);
    if (!startDate || !endDate) {
      this.props.fetchListNewsData({});
    }

    showHide(false);
  };

  renderAction = (toggle) => {
    const { timeRangeFilter } = this.props;

    return (
      <a onClick={toggle}
         className={`btn div-calendar bg-b-color-3 ml-5 calendar-btnsug ${timeRangeFilter ? '' : 'active'}`}>
        <i className="icon-calendar"/>
      </a>
    );
  };

  renderPopup = (showHide, isShow) => {
    return (
      isShow && <Calendar
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        handleDateApply={this.handleDatePicker(showHide)}
      />
    );
  };

  render() {
    return (
      <Toggle
        renderAction={this.renderAction}
        renderPopup={this.renderPopup}
        appendClassName={['d-flex']}
      />
    );
  }
}

export default onClickOutside(PopupCalendar);
