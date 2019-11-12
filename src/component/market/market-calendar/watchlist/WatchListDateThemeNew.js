import React, { Component } from 'react';
import Calendar from '../../../common/calendar/Calender';
// import onClickOutside from 'react-click-outside';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';
import '../watchlist/WatchListDateNewStyle.scss';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
class WatchListDateNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkShowCalendar: false,
      nameFrom: props.nameFrom,
      to: 'to',
      keyId: props.keyId,
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

  showCalendar = e => {
    e.preventDefault();
    const checkShowCalendar = !this.state.checkShowCalendar;
    this.setState({ checkShowCalendar });
  };

  handleDateApply = (startDate, endDate) => {
    const itemDate = {
      keyId: this.props.keyId,
      startDate:
        startDate !== '' && startDate
          ? moment(startDate).format('MM/DD/YYYY')
          : null,
      endDate:
        endDate !== '' && endDate ? moment(endDate).format('MM/DD/YYYY') : null,
    };
    this.props.handleDateChange(itemDate);
    const checkShowCalendar = !this.state.checkShowCalendar;
    this.setState({
      ...this.state,
      checkShowCalendar,
      startDate: startDate ? startDate : '',
      endDate: endDate ? endDate : '',
    });
  };

  render() {
    const { startDate, endDate, nameFrom } = this.props;
    console.log(startDate, 'watchlist');
    return (
      <div className="watchlist-date">
        <div className="parent">
          <div className="wide">
            <label className="text-label">
              {I18n.t(`watchlistCalendar.${nameFrom}`) + '   '}
            </label>
            <div>
              <a
                onClick={this.showCalendar}
                ref={c => (this.buttonCalendar = c)}
                className="btn div-calendar bg-b-color-3 calendar-btnsug"
              >
                <i className="icon-calendar" />
                {startDate ? startDate : I18n.t(`watchlistCalendar.startDate`)}
                {'-'}
                {endDate ? endDate : I18n.t(`watchlistCalendar.endDate`)}
                <i className="icon-caret" />
              </a>
              {this.state.checkShowCalendar && (
                <Calendar
                  parentRef={this.buttonCalendar}
                  startDate={startDate ? moment(startDate) : null}
                  endDate={endDate ? moment(endDate) : null}
                  handleDateApply={this.handleDateApply}
                  condition={1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(
  enhanceWithClickOutside(WatchListDateNew),
);
