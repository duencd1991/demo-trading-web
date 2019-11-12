import React from 'react';
import PopupCalendar from './../../../common/calendar/PopupCalendar';
import { connect } from 'react-redux';
import { changeDate, REDUCER_NAME } from './reducer';

const mapStateToProps = state => {
  return {
    startDate: state[REDUCER_NAME].startDate,
    endDate: state[REDUCER_NAME].endDate,
  };
};

const mapDispatchToProps = {
  changeDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupCalendar);
