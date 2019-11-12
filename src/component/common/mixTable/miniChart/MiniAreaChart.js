import { scalePoint } from 'd3-scale';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Chart, ChartCanvas } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { getMinMaxData } from '../../../helpers/Chart';
import {
  createVerticalLinearGradient,
  hexToRGBA,
} from 'react-stockcharts/lib/utils';
import './miniChart.scss';

class MiniAreaChart extends PureComponent {
  getRandomData = () => {
    return [...Array(5)].map((_, index) => ({
      x: index,
      y: Math.floor(Math.random() * 500),
    }));
  };

  render() {
    const { fill } = this.props;
    const canvasGradient = createVerticalLinearGradient([
      { stop: 0, color: hexToRGBA('#c79f3f', 1) },
      { stop: 1, color: hexToRGBA('#514e4e', 1) },
    ]);
    const dataChart = this.getRandomData();
    return (
      <div className="mini-area-chart-wrapper">
        <ChartCanvas
          seriesName="miniAreaChart"
          ratio={window.devicePixelRatio}
          width={30}
          height={10}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          xExtents={list => list.map(d => d.x)}
          data={dataChart}
          displayXAccessor={d => d.x}
          xAccessor={d => d.x}
          xScale={scalePoint()}
          pointsPerPxThreshold={10}
          minPointsPerPxThreshold={10}
          maintainPointsPerPixelOnResize={false}
          panEvent={false}
          zoomEvent={false}
          clamp={false}
        >
          <Chart id={2} yExtents={d => d.y}>
            <AreaSeries
              fill={'rgb(250, 204, 92)'}
              yAccessor={d => d.y}
              strokeWidth={1}
              opacity={1}
              baseAt={scale => scale(0)}
              stroke={fill}
              canvasGradient={canvasGradient}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

MiniAreaChart.propTypes = {
  data: PropTypes.array,
  seriesName: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
};

MiniAreaChart.defaultProps = {
  data: [],
  seriesName: 'miniBarChart',
  width: 30,
  height: 10,
  fill: '#facc5c',
};

export default MiniAreaChart;
