import React from 'react';
import PropTypes from 'prop-types';
import TickerChart from './TickerChart';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withComponentId } from './../../../common/ComponentIdContext';
import { REDUCER_NAME, fetchListChart, changeTimeRange } from './../reducer';
import Loading from './../../../common/loading/Loading';
import { customDataChart } from './../../../helpers/Chart';
import { TimeRange } from './../../../common/chart';
import Const from './../Const';

class TickerChartWrap extends React.Component {
  state = {
    keyChart: 0,
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.width !== this.props.width ||
      nextProps.data !== this.props.data
    ) {
      this.setState({ keyChart: this.state.keyChart === 0 ? 1 : 0 });
    }
  }

  componentDidMount() {
    const {
      fetchListChart,
      componentId,
      currentSearch,
      timeRange,
    } = this.props;

    fetchListChart(currentSearch, timeRange, componentId);
  }

  changeTimeRange = timeRange => {
    const { changeTimeRange, currentSearch, componentId } = this.props;

    changeTimeRange(currentSearch, timeRange, componentId);
  };

  getFieldAreaChart = () => {
    const { timeRange } = this.props;

    return timeRange === Const.timeRange['1D'] ? 'matchPrice' : 'closePrice';
  };

  render() {
    const { data, width, timeRange } = this.props;
    const customData = customDataChart(data, timeRange, 'ticker');
    if (customData.length < 2) {
      return (
        <div className="position-relative h-100" style={{ paddingRight: 40 }}>
          <TimeRange
            listTimeRange={Const.timeRange}
            timeRange={timeRange}
            changeTimeRange={this.changeTimeRange}
          />
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <div style={{ paddingRight: 40 }}>
          <TimeRange
            listTimeRange={Const.timeRange}
            timeRange={timeRange}
            changeTimeRange={this.changeTimeRange}
          />
        </div>
        <TickerChart
          key={this.state.keyChart}
          data={customData}
          width={width / 2 - 16}
          ratio={window.devicePixelRatio}
          timeRange={timeRange}
          fieldAreaChart={this.getFieldAreaChart()}
          refPriceKey={'referencePrice'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    data: state[REDUCER_NAME].listMultiComponent[componentId].dataChartIndex,
    timeRange: state[REDUCER_NAME].listMultiComponent[componentId].timeRange,
    currentSearch:
      state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
  };
};

const mapDispatchToProps = {
  fetchListChart,
  changeTimeRange,
};

TickerChartWrap.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  currentSearch: PropTypes.object,
  timeRange: PropTypes.string,
};

TickerChartWrap.defaultProps = {
  data: [],
  width: 0,
  currentSearch: {},
  timeRange: '',
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TickerChartWrap);
