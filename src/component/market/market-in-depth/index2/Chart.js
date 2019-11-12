import React from 'react';
import ChartContent from './ChartContent';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import ChartTimeRange from './ChartTimeRange';
import Loading from './../../../common/loading/Loading';
import { customDataChart } from './../../../helpers/Chart';
import { getUnique } from './../../../helpers/Common';

const MIN_WIDTH = 700;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyChart: getUnique(),
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.component !== nextProps.component ||
      this.props.data !== nextProps.data
    ) {
      this.setState({ keyChart: getUnique() });
    }
  }

  renderWithLoading = width => {
    return (
      <div
        className="position-relative"
        style={{
          width,
          height: 270,
          padding: '0 35px 0 5px',
        }}
      >
        <ChartTimeRange />
        <Loading />
      </div>
    );
  };

  renderWithData = (width, data) => {
    const { timeRange } = this.props;
    const { keyChart } = this.state;

    return (
      <>
        <div style={{ width, padding: '0 35px 0 5px' }}>
          <ChartTimeRange />
        </div>
        <ChartContent
          key={keyChart}
          data={data}
          width={width}
          ratio={window.devicePixelRatio}
          timeRange={timeRange}
        />
      </>
    );
  };

  getContent = data => {
    const { component, isLoading } = this.props;

    const width = Math.max(component.width, MIN_WIDTH);
    const offsetWidth = 240;

    return data && data.length > 1 && !isLoading
      ? this.renderWithData(width - offsetWidth, data)
      : this.renderWithLoading(width - offsetWidth);
  };

  render() {
    const { timeRange, data } = this.props;

    const customData = customDataChart(data, timeRange);

    return this.getContent(customData);
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state[REDUCER_NAME].isLoading,
    data: state[REDUCER_NAME].listChart,
    component: state[REDUCER_NAME].component,
    timeRange: state[REDUCER_NAME].timeRange,
  };
};

export default connect(mapStateToProps)(Chart);
