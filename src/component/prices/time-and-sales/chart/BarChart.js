import { scaleLinear, scaleOrdinal, scalePoint } from  "d3-scale";
//import { scaleLinear, scaleOrdinal, scalePoint } from 'd3-scale';
import { set } from 'd3-collection';
import { max } from 'd3-array';
import {schemeCategory10} from 'd3-scale-chromatic';
import React from 'react';
import ChartCanvas from './../../../common/chart/lib/chart-canvas/ChartCanvas';
import { Chart } from 'react-stockcharts';
import StackedBarSeries from '../../../common/chart/lib/bar-series/BarSeries';

import { XAxis } from 'react-stockcharts/lib/axes';
import Label from './../../../common/chart/lib/label/Label';
import { formatTextFloat } from '../../../helpers/Text';

const GREY = '#555555';
const GREEN = '#37a77d';
const RED = '#e84855';
const BLUE = '#359ee4';
const ORANGE = '#ffc859';

const BAR_WIDTH = 16;

const SETTINGS = {
  MARGIN: { left: 60, right: 70, top: 0, bottom: 30 },
};

class HorizontalStackedBarChart extends React.Component {
  getHeight = () => {
    const { height } = this.props;

    return height - SETTINGS.MARGIN.bottom - SETTINGS.MARGIN.top;
  };

  getYTick = (item, index) => {
    const height = this.getHeight();
    const x = 10;
    const { data } = this.props;
    const numItems = data.length;
    if (data.length === 1) {
      //if chart have only 1 bar y = height/2
      const y = height / 2 + 10 / 2;
      return { x, y, datum: item };
    }
    const arr = [...Array(numItems)].map((_, index) => numItems - (index + 1));
    const pxPerItem = BAR_WIDTH;
    const padding = (height - 20 - numItems * BAR_WIDTH) / (numItems - 1);
    // -20 padding top + bottom of chart (not margin)
    // fix x left chart side
    const y = Math.round(
      12 + arr[index] * padding + pxPerItem * (arr[index] + 0.5),
    );

    return { x, y, datum: item };
  };

  render() {
    const { data, ratio, width, middleValue, labelColor, height } = this.props;
    const arrColour = [GREEN, RED, BLUE];
    //const f = scaleOrdinal(schemeCategory10).domain(arrColour);
    const f = scaleOrdinal(arrColour);
    const fill = (d, i) => f(i);
    const listYTick = data.map((item, index) => this.getYTick(item, index));
    const MIDDLE_VALUE = 0 || middleValue;

    return (
      <div>
        <ChartCanvas
          margin={SETTINGS.MARGIN}
          ratio={ratio}
          width={width}
          height={height}
          padding={1}
          seriesName="data"
          xExtents={data => [0, max(data, d => d.x1 + d.x2 + d.x3 + d.x4)]}
          data={data}
          xScale={scaleLinear()}
          panEvent={false}
          zoomEvent={false}
        >
          <Chart
            id={1}
            yExtents={data.map(d => d.y)}
            yScale={scalePoint()}
            padding={0.6}
          >
            {listYTick.map((d, index) => {
              return (
                <Label
                  fontWeight={600}
                  key={index}
                  x={-30}
                  y={d.y}
                  fill={() => {
                    if (d.datum.y === MIDDLE_VALUE) return ORANGE;
                    if (d.datum.y > MIDDLE_VALUE) return GREEN;
                    return RED;
                  }}
                  fontSize={10}
                  text={`${formatTextFloat(d.datum.y)}`}
                />
              );
            })}

            <XAxis // draw x label
              axisAt="bottom"
              orient="bottom"
              strokeWidth={1}
              tickStroke={labelColor}
              tickStrokeOpacity={0.2}
              opacity={0.2}
              innerTickSize={-1 * this.getHeight()}
              zoomEnabled={false}
              ticks={5}
            />

            <XAxis // draw grid line
              axisAt="bottom"
              orient="bottom"
              stroke={GREY}
              strokeWidth={1}
              tickStroke={GREY}
              tickStrokeOpacity={0.6}
              showTickLabel={false}
              innerTickSize={-1 * this.getHeight()}
              zoomEnabled={false}
              ticks={5}
            />

            <StackedBarSeries
              yAccessor={d => d.y}
              xAccessor={[d => d.x1, d => d.x2, d => d.x3]}
              fill={fill}
              swapScales
              stroke={false}
              opacity={1}
              labelColor={labelColor}
              width={BAR_WIDTH}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

export default HorizontalStackedBarChart;
