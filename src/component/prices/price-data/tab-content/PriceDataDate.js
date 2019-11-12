import React, { Component } from 'react';
import Calendar from '../../../common/calendar/Calender';
import onClickOutside from 'react-click-outside';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';

class PriceDataDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkShowCalendar: false,
      //nameFrom: props.nameFrom,
      // to: I18n.t(`${I18N_NAME}to`),
    };
  }

  handleClickOutside = evt => {
    if (this.state.checkShowCalendar) {
      this.setState({
        ...this.state,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        checkShowCalendar: false,
      });
    }
  };

  showCalendar = () => {
    const checkShowCalendar = !this.state.checkShowCalendar;
    this.setState({ ...this.state, checkShowCalendar });
  };

  handleDateApply = (startDate, endDate) => {
    const itemDate = {
      startDate:
        startDate !== '' && startDate !== null
          ? moment(startDate).format('MM/DD/YYYY')
          : null,
      endDate:
        endDate !== '' && endDate !== null
          ? moment(endDate).format('MM/DD/YYYY')
          : null,
    };
    this.props.handleDateChange(itemDate);
    const checkShowCalendar = !this.state.checkShowCalendar;
    this.setState({
      checkShowCalendar,
      startDate: startDate !== null ? startDate : '',
      endDate: endDate !== null ? endDate : '',
    });
  };

  render() {
    const { startDate, endDate, nameFrom } = this.props;
    let to = I18n.t('common.lstLabelCalendar.to');
    return (
      <div className="price-data-date ">
        <div className="parent">
          <div className="wide ml-10 position-relative">
            <label className=" d-flex align-items-center justify-content-center">
              {nameFrom}
            </label>
            <div className="narrow" onClick={this.showCalendar}>
              {startDate}
              <span className="place-date">
                <i className="icon-caret" />
              </span>
              {this.state.checkShowCalendar && (
                <Calendar
                  startDate={
                    startDate !== null ? this.state.startDate : startDate
                  }
                  endDate={endDate !== null ? this.state.endDate : endDate}
                  handleDateApply={this.handleDateApply}
                />
              )}
            </div>
          </div>
          <div className="wide-to">
            <label
              className="d-flex align-items-center justify-content-center"
              style={{ width: '20px' }}
            >
              {to}
            </label>
            <div className="narrow-to" onClick={this.showCalendar}>
              {endDate}
              <span className="place-date">
                <i className="icon-caret" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(PriceDataDate);
