import React from 'react';
import BubbleChartWrap from './bubble-chart/BubbleChartWrap';
import BarChartWrap from './bar-chart/BarChartWrap';
import { connect } from 'react-redux';
import { fetchDataContribution, REDUCER_NAME } from '../reducer';
import ChartHead from './ChartHead';
import Loading from './../../../../common/loading/Loading';
import LabelLeftRight from '../../../../common/chart/label/LabelLeftRight';
import BarChart from './bar-chart/BarChart';
import LabelFooter from './bubble-chart/LabelFooter';

const MIN_WIDTH = 600;
const CHART_HEIGHT = 300;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBarChart: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataContribution());
  }

  toggleShowBarChart = () => {
    this.setState({
      isShowBarChart: !this.state.isShowBarChart,
    });
  };

  getWidth = component => {
    return Math.max(component.width - 40, MIN_WIDTH);
  };

  render() {
    const { data, component, isFetching } = this.props;
    const { isShowBarChart } = this.state;

    if (isFetching || !data || data.length < 1) {
      return (
        <div className="position-relative" style={{ height: CHART_HEIGHT }}>
          <Loading />
        </div>
      );
    }

    return (
      <div
        className="money-flow-chart stock-chart"
        style={{ width: this.getWidth(component) }}
      >
        <ChartHead
          toggleShowBarChart={this.toggleShowBarChart}
          isShowBarChart={isShowBarChart}
        />
        <div className="position-relative pl-10 pr-10">
          <LabelLeftRight text={'moneyFlowContribution.LABEL_CHART_LEFT'} />
          <div>
            {isShowBarChart ? (
              <BarChartWrap
                data={data}
                ratio={window.devicePixelRatio}
                width={this.getWidth(component)}
                height={CHART_HEIGHT}
              />
            ) : (
              <BubbleChartWrap
                data={data}
                ratio={window.devicePixelRatio}
                width={this.getWidth(component)}
                height={CHART_HEIGHT}
              />
            )}
          </div>
        </div>
        <div style={{ height: 30 }}>{isShowBarChart || <LabelFooter />}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    data: state[REDUCER_NAME].contributionDataFollowTimeRange,
    component: state[REDUCER_NAME].component,
    isFetching: state[REDUCER_NAME].isFetching,
  };
};

export default connect(mapStateToProps)(Chart);
