import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class TimeRange extends Component {
  handleClick = timeRange => () => {
    const { changeTimeRange } = this.props;

    changeTimeRange(timeRange);
  };

  render() {
    const { listTimeRange, timeRange } = this.props;
    return (
      <div className="index2-time-range-wrapper">
        <div className="bar-header">
          {Object.keys(listTimeRange).map(key => {
            // if (TIME_RANGE[key] === TIME_RANGE.REALTIME) {
            //   return <div onClick={() => props.changeTimeRange(TIME_RANGE[key])} key={key} className="bar-header-item">
            //     <span className="bar-header-text"><i className="icon-calendar"/></span>
            //   </div>
            // }

            return (
              <div
                onClick={this.handleClick(listTimeRange[key])}
                key={key}
                className="bar-header-item"
              >
                {listTimeRange[key] === timeRange ? (
                  <span className="bar-header-text">{key}</span>
                ) : (
                  <span>{key}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

TimeRange.propTypes = {
  listTimeRange: PropTypes.object,
  timeRange: PropTypes.string,
  changeTimeRange: PropTypes.func,
};

TimeRange.defaultProps = {
  listTimeRange: [],
  timeRange: '',
  changeTimeRange: () => {},
};

export default TimeRange;
