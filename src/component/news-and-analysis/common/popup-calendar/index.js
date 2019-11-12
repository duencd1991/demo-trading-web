import React, { Component } from 'react';
import Calendar from '../../../common/calendar/Calender';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';

import { REDUCER_NAME, setAPIParams } from '../../reducer';

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
    const { setAPIParams, currentTab, currentChildTab } = this.props;
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
      return setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { FromDate: null, ToDate: null },
      );
    }

    const fromDate = moment(formatStartDate).format(FORMAT_DATE);
    const toDate = moment(formatEndDate).format(FORMAT_DATE);

    setAPIParams(
      { parentTab: currentTab, childTab: currentChildTab },
      { FromDate: fromDate, ToDate: toDate },
    );
  };

  render() {
    const { isDateSelected } = this.props;
    return (
      <div>
        <a
          onClick={this.clickCalendar}
          className={`btn btn-cus-nomal bg-b-color-3 ml-5 calendar-btnsug ${
            isDateSelected ? 'active' : ''
          }`}
        >
          <i className="icon-calendar" />
        </a>
        {this.state.checkShowCalendar && (
          <Calendar
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            handleDateApply={this.handleDatePicker}
            modifyStyle={{ right: 0 }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: state[REDUCER_NAME].currentTab,
  currentChildTab: state[REDUCER_NAME].currentChildTab,
});

const mapDispatchToProps = {
  setAPIParams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(PopupCalendar));
