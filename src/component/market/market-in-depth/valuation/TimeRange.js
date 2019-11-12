import React from 'react';
import { connect } from 'react-redux';
import Const from './Const';
import { changeTimeRange, REDUCER_NAME } from './reducer';
import { I18n } from 'react-redux-i18n';
import Calendar from './Calendar';

class TimeRange extends React.Component {
  getClassName = key => {
    const { timeRange } = this.props;

    return `btn btn-cus-nomal bg-b-color-3 ${
      key === timeRange ? 'active' : ''
    }`;
  };

  handleClick = key => () => {
    const { changeTimeRange } = this.props;

    changeTimeRange(key);
  };

  render() {
    return (
      <>
        <div className="btn-groupcus-line">
          {Const.listTimeRange.map(key => {
            const tabText = I18n.t(
              `marketInDepthValuation.tab.${
                Const.listTimeRangeByKey[key].name
              }`,
            );

            return (
              <a
                key={key}
                href="javascript:void(0)"
                className={this.getClassName(key)}
                onClick={this.handleClick(key)}
              >
                {tabText}
              </a>
            );
          })}
        </div>
        <Calendar />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    timeRange: state[REDUCER_NAME].timeRange,
  };
};

const mapDispatchToProps = {
  changeTimeRange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeRange);
