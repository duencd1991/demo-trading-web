import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  REDUCER_NAME,
  renderPerformanceChart,
  intervalFetchDataPerformanceChart,
  clearIntervalFetchDataPerformanceChart
} from '../reducer';
import CONST from './Const';
import PerformanceChart from '../../../common/performance-chart/PerformanceChart';

const CHART_WIDTH = 100;
const CHART_HEIGHT = 15;

const mapStateToProps = (state) => {
  return {
    count: state[REDUCER_NAME].count,
  };
};

class PerformanceChartWrap extends React.Component {

  count = 0;
  currentCount = 0;

  constructor(props) {
    super(props);
    this.state = {
      dataYesterday: [],
      dataToday: [],
    };
  }

  componentDidMount() {
    const { dispatch, ticker } = this.props;
    dispatch(intervalFetchDataPerformanceChart(ticker, data => {
        if (data.items === null || data.items.length === 0) {
          return;
        }

        let dataYesterday = data.items[0].previousDate;
        let dataToday = data.items[0].toDate;

        if (this.divElement && this.divElement.parentNode) {
          this.getWidthHeight(this.divElement.parentNode.clientWidth);
        }

        this.count++;
        this.setState({
          dataYesterday,
          dataToday
        });
      })
    );
  }

  componentWillUnmount() {
    const { dispatch, ticker } = this.props;
    dispatch(clearIntervalFetchDataPerformanceChart(ticker));
  }

  shouldComponentUpdate() {
    if (this.divElement
      && this.divElement.parentNode
      && ((this.chartWidth !== this.divElement.parentNode.clientWidth)
        || this.count !== this.currentCount)) {
      this.currentCount = this.count;
      this.divElement && this.getWidthHeight(this.divElement.parentNode.clientWidth);
      this.chartWidth = this.divElement.parentNode.clientWidth;

      this.countPerformanceChart = this.props.countPerformanceChart;

      return true;
    }
    return false;
  }

  render() {
    if (this.state == null || this.state.dataYesterday == null) {
      return <div ref={(divElement) => this.divElement = divElement} />;
    }

    let dataYesterday = this.state.dataYesterday;
    let dataToday = this.state.dataToday;

    if (!(dataYesterday && (dataYesterday instanceof Array) && dataYesterday.length > 1)) {
      return <div ref={(divElement) => this.divElement = divElement} />;
    }

    return (
      <div ref={(divElement) => this.divElement = divElement}>
        <PerformanceChart
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          dataYesterday={dataYesterday}
          dataToday={dataToday}
          attributeName={CONST.performanceChart.VALUE_ATTRIBUTE_NAME}
          topLineColor={CONST.performanceChart.TOP_LINE_COLOR}
          bottomLineColor={CONST.performanceChart.BOTTOM_LINE_COLOR}
          twoDayWidthEqual={true}
        />
      </div>
    );
  }

  getWidthHeight = (performanceChartWidth) => {
    if (performanceChartWidth > 0) {
      this.props.dispatch(renderPerformanceChart(performanceChartWidth, CONST.performanceChart.CHART_HEIGHT));
    }
  };
}

PerformanceChartWrap.propTypes = {
  ticker: PropTypes.string.isRequired
};

PerformanceChartWrap.defaultProps = {
  ticker: 'VNM'
};

export default connect(mapStateToProps)(PerformanceChartWrap);
