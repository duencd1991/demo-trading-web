import React, { Component } from 'react';
import Calendar from '../../common/calendar/Calender';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';

const FORMAT_DATE = 'YYYY-MM-DD';

class PopupCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkShowCalendar: false,
      startDate: moment(new Date()).subtract(1, 'days'),
      endDate: moment(new Date()),
    };
  }

  handleClickOutside = evt => {
    if (this.state.checkShowCalendar) {
      this.setState({ ...this.state, checkShowCalendar: false });
    }
  };

  clickCalendar = e => {
    this.setState(prevState => {
      return { checkShowCalendar: !prevState.checkShowCalendar };
    });
  };

  handleDatePicker = (startDate, endDate) => {
    const checkShowCalendar = !this.state.checkShowCalendar;
    let formatStartDate = null;
    let formatEndDate = null;

    if (!startDate || !endDate) {
      if (startDate) {
        formatStartDate = startDate;
        formatEndDate = startDate;
      }

      if (endDate) {
        formatStartDate = endDate;
        formatEndDate = endDate;
      }
      // if startDate or endDate null set other equal each not null value
    }

    if (startDate && endDate) {
      formatStartDate = startDate;
      formatEndDate = endDate;
      // if startDate and endDate not null
    }

    this.setState({
      ...this.state,
      startDate: formatStartDate,
      endDate: formatEndDate,
      checkShowCalendar,
    });

    if (!startDate && !endDate) {
      return this.props.fetchListNewsData({});
      // if startDate and endDate null return default list
    }

    const fromDate = moment(formatStartDate).format(FORMAT_DATE);
    const toDate = moment(formatEndDate).format(FORMAT_DATE);

    this.props.setDateRangeOption(fromDate, toDate);
    this.props.fetchListNewsData({ FromDate: fromDate, ToDate: toDate });
  };

  render() {
    const { isDateSelected } = this.props;
    return (
      <div>
        <a
          onClick={this.clickCalendar}
          ref={c => (this.buttonCalendar = c)}
          className={`btn btn-cus-nomal bg-b-color-3 ml-5 calendar-btnsug ${
            isDateSelected ? 'active' : ''
          }`}
        >
          <i className="icon-calendar" />
          {this.state.checkShowCalendar && (
            <Calendar
              parentRef={this.buttonCalendar}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              handleDateApply={this.handleDatePicker}
            />
          )}
        </a>
      </div>
    );
  }
}

export default enhanceWithClickOutside(PopupCalendar);
