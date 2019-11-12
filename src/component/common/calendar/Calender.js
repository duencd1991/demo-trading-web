import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// import DateRangePicker from './DateRangePicker';
import DateRangePicker from './DateRangePicker';
import './date_overrides.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';

const I18N_NAME = 'common.lstLabelCalendar.';

const conditions = {
  startOrEndDate: 1,
  startAndEndDate: 2,
  backToPast: 3,
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate,
      focusedInput:
        props.startDate && props.endDate
          ? 'endDate'
          : props.startDate
          ? 'endDate'
          : 'startDate',
      startDatePlaceholderText: I18n.t(`${I18N_NAME}formatDate`),
      endDatePlaceholderText: I18n.t(`${I18N_NAME}formatDate`),
      checkStartDateInput: true,
      checkEndDateInput: true,
    };
  }

  returnButtonApply = status => {
    if (status) {
      return (
        <button
          className="apply btn-apply-cus apply-calendar"
          onClick={() => {
            this.props.handleDateApply(
              this.state.startDate,
              this.state.endDate,
            );
          }}
        >
          {I18n.t(`${I18N_NAME}apply`)}
        </button>
      );
    } else {
      return (
        <button className="apply btn-apply-cus apply-calendar disable">
          {I18n.t(`${I18N_NAME}apply`)}
        </button>
      );
    }
  };

  handleButtonApply = (condition, valueStartDate, valueEndDate) => {
    let check = true;
    if (condition === conditions.startOrEndDate) {
      if (this.state.checkStartDateInput !== check) {
        return this.returnButtonApply(!check);
      }

      if (this.state.checkEndDateInput !== check) {
        return this.returnButtonApply(!check);
      }
      return this.returnButtonApply(check);
    }

    if (condition === conditions.startAndEndDate) {
      if (
        this.state.checkStartDateInput !== check ||
        this.state.checkEndDateInput !== check
      ) {
        return this.returnButtonApply(!check);
      }
    }

    if (condition === conditions.backToPast) {
      if (
        this.state.checkStartDateInput !== check ||
        this.state.checkEndDateInput !== check
      ) {
        return this.returnButtonApply(!check);
      }
      if (
        !this.checkCompareDate(valueStartDate) ||
        !this.checkCompareDate(valueEndDate)
      ) {
        return this.returnButtonApply(!check);
      }
      return this.returnButtonApply(check);
    }

    return this.returnButtonApply(check);
  };

  checkFormatDate = valueDate => {
    return moment(valueDate).isValid();
  };

  checkCompareDate = valueDate => {
    let check = false;
    return new Date(valueDate).getTime() > new Date().getTime()
      ? check
      : !check;
  };

  handleDate = ({ startDate, endDate, startDateString, endDateString }) => {
    if (startDate === null && startDateString) {
      if (startDateString.length > 0) {
        this.setState({
          checkStartDateInput: false,
          startDate,
          endDate,
        });
      }
    } else {
      this.setState({
        checkStartDateInput: true,
        startDate,
        endDate,
      });
    }
    if (endDate === null && endDateString) {
      if (endDateString.length > 0)
        this.setState({
          checkEndDateInput: false,
          startDate,
          endDate,
        });
    } else {
      this.setState({
        checkEndDateInput: true,
        startDate,
        endDate,
      });
    }
  };

  render() {
    if (this.props.i18n.locale === 'en') {
      moment.locale('en');
    } else {
      moment.locale('vi-VN');
    }
    const { modifyStyle = {}, condition } = this.props;

    const { startDate, endDate } = this.state;

    return (
      <div className="Calendar-container" style={modifyStyle}>
        <div className="Calendar-wraper">
          <DateRangePicker
            showDefaultInputIcon={true}
            startDateId="startDate"
            endDateId="endDate"
            startDatePlaceholderText={this.state.startDatePlaceholderText}
            endDatePlaceholderText={this.state.endDatePlaceholderText}
            customInputIcon={<div>{I18n.t(`${I18N_NAME}from`)}</div>}
            customArrowIcon={<div>{I18n.t(`${I18N_NAME}to`)}</div>}
            startDate={this.state.startDate || null}
            endDate={this.state.endDate || null}
            onDatesChange={this.handleDate}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => {
              const stateFocusedInput = this.state.focusedInput;
              this.setState({
                focusedInput: focusedInput ? focusedInput : stateFocusedInput,
              });

              let rect = ReactDOM.findDOMNode(this);
              if (rect != null) {
                let rectParentStack = rect
                  .closest('.lm_stack')
                  .getBoundingClientRect();
                let rectCalender = rect.getBoundingClientRect();
                let parrentChild = this.props.parentRef
                  ? this.props.parentRef
                  : rect.parentElement;
                let rectParentChild = parrentChild.getBoundingClientRect();
                let right = 0;
                if (rectCalender.right > rectParentStack.right) {
                  right =
                    rectParentChild.right > rectParentStack.right
                      ? rectParentChild.right -
                        rectCalender.right -
                        rectParentChild.width +
                        rectCalender.width
                      : 0;
                  let xPosition = rectCalender.x;
                  if (xPosition < rectParentStack.left) {
                    right = rectParentStack.left - rectParentChild.left;
                    rect.style.right = right + 'px ';
                  } else if (rectCalender.right > rectParentStack.right) {
                    rect.style.right = right + 'px ';
                  } else if (rectParentStack.right > rectParentChild.right) {
                    // rect.style.left =  rectParentStack.left -  rectParentChild.right + 'px';
                    // rect.style.left = '0px';
                  } else {
                    rect.style.right = right + 'px ';
                  }
                } else {
                  let positionLeftCalendar =
                    rectParentChild.left + rectCalender.width;
                  if (rectCalender.left < 0) {
                    rect.style.left =
                      rectParentStack.left - rectParentChild.left + 'px';
                  } else if (positionLeftCalendar < rectParentStack.right) {
                    // rect.style.left = '0px ';
                  }
                }
              }
            }}
            keepOpenOnDateSelect
            //inputIconPosition={ICON_AFTER_POSITION}
            isOutsideRange={() => false}
            transitionDuration={0}
          />
          {this.handleButtonApply(condition, startDate, endDate)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ i18n }) => ({ i18n });

export default connect(mapStateToProps)(Calendar);
