import { connect } from 'react-redux';
import {
  REDUCER_NAME,
  changeTimeRange,
  setDateRangeOption,
  setFilterNewValue,
} from './../reducer';
//TODO import { I18n } from 'react-redux-i18n';
import Const from './Const';
import React from 'react';
//TODO import Tab from '../../../common/tab-timer';
import PopupCalendar from './PopupCalendar';
//TODO import './../index.scss';

class FilterTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilted: false,
      startDate: null,
      endDate: null,
    };
  }

  render() {
    function format(inputDate) {
      var date = new Date(inputDate);
      if (!isNaN(date.getTime())) {
        return (
          date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
        );
      }
    }

    const dateRange = dateRangeOption => {
      console.log('dateRangeOption :', dateRangeOption);
      if (dateRangeOption.FromDate && dateRangeOption.ToDate) {
        return (
          <div
            className="time-range-carlendar"
            style={{ marginBottom: 15, marginTop: -5 }}
          >
            <span className="text-carlendar-filter mb-10">
              Time Range : <a style={{ color: 'gray' }}>From</a>{' '}
              {format(dateRangeOption.FromDate)}{' '}
              <a style={{ color: 'gray' }}> To </a>{' '}
              {format(dateRangeOption.ToDate)}
            </span>
          </div>
        );
      } else {
        return (
          <span className="text-carlendar-filter">
            <a />
          </span>
        );
      }
    };
    //calendar
    const { setDateRangeOption, changeTimeRange } = this.props;
    const {
      timeRangeFilter,
      currentFilterEvents,
      dateRangeOption,
    } = this.props;

    let listTimeRange = Const.listTimeRange;
    let listTimeRangeByKey = Const.listTimeRangeByKey;

    if (currentFilterEvents === Const.listFilterEventByKey.ern.key) {
      listTimeRange = Const.listTimeRangeErn;
      listTimeRangeByKey = Const.listTimeRangeErnByKey;
    }

    return (
      <>
        <div className="filter-time-range d-flex" style={{ marginBottom: 10 }}>
          <div className="d-flex">
            <div className="btn-groupcus-line d-flex">
              {listTimeRange.map(key => {
                const className =
                  key === timeRangeFilter
                    ? 'btn btn-cus-nomal bg-b-color-3 active'
                    : 'btn btn-cus-nomal bg-b-color-3';
                return (
                  <a
                    href="#"
                    className={className}
                    key={key}
                    onClick={() => {
                      changeTimeRange(key);
                    }}
                  >
                    {listTimeRangeByKey[key].name}
                  </a>
                );
              })}
            </div>
            <PopupCalendar
              timeRangeFilter={timeRangeFilter}
              setDateRangeOption={setDateRangeOption}
            />
          </div>
        </div>

        {dateRange(dateRangeOption)}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeRangeFilter: state[REDUCER_NAME].timeRangeFilter,
    currentFilterEvents: state[REDUCER_NAME].currentFilterEvents,
    dateRangeOption: state[REDUCER_NAME].dateRangeOption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTimeRange: key => dispatch(changeTimeRange(key)),
    setDateRangeOption: (fromDate, toDate) =>
      dispatch(setDateRangeOption(fromDate, toDate)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterTime);
