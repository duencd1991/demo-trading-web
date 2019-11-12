import React from 'react';
import { connect } from 'react-redux';
import { changeTimeRange, REDUCER_NAME } from './reducer';
import { I18n } from 'react-redux-i18n';
import Const from './Const';

class TimeRange extends React.Component {
  getClassName = key => {
    const { timeRange } = this.props;

    return `btn btn-cus-nomal bg-b-color-3 ${
      timeRange === Const.timeRange[key] ? 'active' : ''
    }`;
  };

  handleClick = key => () => {
    const { changeTimeRange } = this.props;

    changeTimeRange(Const.timeRange[key]);
  };

  render() {
    const timeRangeTitle = I18n.t('marketInDepthLiquidity.timeRange');

    return (
      <div className="tabs-right-top float-right mt-5 ml-20">
        <div className="btn-groupcus-line">
          {Object.keys(Const.timeRange).map(key => {
            return (
              <a
                key={key}
                href="javascript:void(0)"
                className={this.getClassName(key)}
                onClick={this.handleClick(key)}
              >
                {timeRangeTitle[key]}
              </a>
            );
          })}
        </div>
      </div>
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
