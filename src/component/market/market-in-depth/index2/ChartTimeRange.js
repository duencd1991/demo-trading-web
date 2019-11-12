import React from 'react';
import { connect } from 'react-redux';
import Const from './Const';
import { changeTimeRange, REDUCER_NAME } from './reducer';
import { TimeRange } from './../../../common/chart';

const mapStateToProps = state => {
  return {
    timeRange: state[REDUCER_NAME].timeRange,
  };
};

const mapDispatchToProps = {
  changeTimeRange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChartTimeRange);

function ChartTimeRange({ timeRange, changeTimeRange }) {
  return (
    <TimeRange
      listTimeRange={Const.timeRange}
      timeRange={timeRange}
      changeTimeRange={changeTimeRange}
    />
  );
}
