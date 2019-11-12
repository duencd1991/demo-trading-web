import { scalePoint } from 'd3-scale';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries } from 'react-stockcharts/lib/series';
import { THEMES } from '../../../../../configs/LayoutConfig';
import NoDataMiniBarChart from './NoDataMiniBarChart';

class MiniBarChart extends React.PureComponent {
  isNoData = () => {
    const { data } = this.props;

    return data.every(item => !item.y);
  };

  getData = () => {
    const { data } = this.props;

    return [...Array(5)].map((_, index) => {
      if (data[index]) {
        return data[index];
      }

      return {
        x: index,
        y: 0,
      };
    });
  };

  isAllPositive = () => {
    const { data } = this.props;

    return data.every(item => item.y >= 0);
  };

  isAllNegative = () => {
    const { data } = this.props;

    return data.every(item => item.y <= 0);
  };

  getFillColor = () => {
    const { theme } = this.props;

    return theme === THEMES.DARK ? '#acf0f2' : '#2c73e8';
  };

  render() {
    const { theme } = this.props;
    if (this.isNoData()) {
      return <NoDataMiniBarChart className={theme} />;
    }

    return (
      <div className="mini-bar-chart-wrapper">
        <ChartCanvas
          seriesName="miniBarChart"
          ratio={window.devicePixelRatio}
          width={30}
          height={10}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          xExtents={list => list.map(d => d.x)}
          data={this.getData()}
          xAccessor={d => d.x}
          displayXAccessor={d => d.x}
          xScale={scalePoint()}
          padding={1}
        >
          <Chart id={1} yExtents={d => [0, d.y]}>
            <BarSeries
              baseAt={(xScale, yScale, d) => yScale(0)}
              opacity={1}
              fill={this.getFillColor()}
              yAccessor={d => d.y}
            />
          </Chart>
        </ChartCanvas>
        {this.isAllPositive() && <div className="bottom-line" />}
        {this.isAllNegative() && <div className="top-line" />}
      </div>
    );
  }
}

MiniBarChart.propTypes = {
  data: PropTypes.array,
  seriesName: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

MiniBarChart.defaultProps = {
  data: [],
  seriesName: 'miniBarChart',
  width: 25,
  height: 10,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(MiniBarChart);
