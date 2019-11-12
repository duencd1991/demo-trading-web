import { scalePoint } from 'd3-scale';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ChartCanvas from './../../../common/chart/lib/chart-canvas/ChartCanvas';
import { Chart } from 'react-stockcharts';
import { LineSeries } from 'react-stockcharts/lib/series';
import { getMinMaxData } from '../../../helpers/Chart';
import './miniChart.scss';

class MiniLineChart extends PureComponent {
  render() {
    const { keyXAccessor, keyYAccessor, dataChart, width, height } = this.props;
    if (dataChart.length === 0) return null;
    return (
      <div className="line-chart ">
        <ChartCanvas
          seriesName="MiniLineChart"
          ratio={window.devicePixelRatio}
          width={width}
          height={height}
          xScale={scalePoint()}
          margin={{ left: 2, right: 2, top: 2, bottom: 2 }}
          xExtents={list => list.map(d => d[keyXAccessor])}
          data={dataChart}
          displayXAccessor={d => d[keyXAccessor]}
          xAccessor={d => d[keyXAccessor]}
          pointsPerPxThreshold={10}
          minPointsPerPxThreshold={10}
          maintainPointsPerPixelOnResize={false}
          panEvent={false}
          zoomEvent={false}
          clamp={false}
        >
          <Chart id={1} yExtents={getMinMaxData(dataChart, 'matchPrice')}>
            <LineSeries
              yAccessor={d => d[keyYAccessor]}
              strokeWidth={1}
              opacity={1}
              baseAt={scale => scale(0)}
              stroke={'#ffffff'}
              strokeDasharray={'Solid'}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

MiniLineChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

MiniLineChart.defaultProps = {
  data: [],
  width: 25,
  height: 10,
};

export default MiniLineChart;
