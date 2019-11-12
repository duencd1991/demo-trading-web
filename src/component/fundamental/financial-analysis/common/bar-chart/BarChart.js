import React from 'react';

import { max, min } from 'd3-array';
import { scaleLinear, scalePoint } from 'd3-scale';

import { ChartCanvas, Chart } from 'react-stockcharts';
import BarSeries from '../../../../common/chart/lib/bar-series/BarSeries';
import { XAxis } from 'react-stockcharts/lib/axes';
import Label from '../../../../common/chart/lib/label/Label';

const GREY = '#555555';
const FIX_HEIGHT = 200;

class HorizontalBarChart extends React.Component {
  getYTick = (item, index) => {
    const { data } = this.props;
    const height = FIX_HEIGHT - 20 - 20 - 5 * 2;
    const numItems = data.length;
    const arr = [...Array(numItems)].map((_, index) => numItems - (index + 1));
    const numPadding = numItems - 1;
    const pxPerItem = (height - numPadding * 5) / numItems;
    const textY = pxPerItem / 2;
    const y = Math.round(
      textY + (arr[index] + 1) * 5 + pxPerItem * arr[index] + 5,
    );
    return { y, datum: item };
  };

  render() {
    const {
      data,
      width,
      ratio = window.devicePixelRatio,
      theme,
      labelColor,
    } = this.props;

    const fill = this.props.fill;
    const listYTick = data.map((item, index) => this.getYTick(item, index));
    return (
      <ChartCanvas
        ratio={ratio}
        width={width - 20}
        height={FIX_HEIGHT}
        //width - 20 for margin inside chart each 10px each right left side
        margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
        seriesName="ZMF"
        padding={1}
        xExtents={data => [
          min(data, d => d.x) >= 0 ? 0 : min(data, d => d.x),
          max(data, d => d.x) <= 0 ? 0 : max(data, d => d.x),
        ]}
        // calc min max of bar chart cause value can be negative
        data={data}
        xScale={scaleLinear()}
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
                x={min(data, d => d.x) - 30}
                y={d.y}
                fill={() => {
                  const colorFillByTheme =
                    theme === 'dark' ? 'white' : '#1f2023';
                  return colorFillByTheme;
                }}
                fontSize={10}
                fontWeight={600}
                text={`${d.datum.y}`}
              />
            );
          })}

          <XAxis
            axisAt="bottom"
            orient="bottom"
            tickStroke={theme === 'dark' ? 'white' : '#1f2023'}
            ticks={6}
            innerTickSize={0}
            zoomEnabled={false}
            showDomain={false}
          />

          <XAxis
            axisAt="bottom"
            orient="bottom"
            stroke={theme === 'dark' ? '#555555' : '#1f2023'}
            showTickLabel={false}
            opacity="0.2"
            ticks={6}
            innerTickSize={0}
            zoomEnabled={false}
          />

          <XAxis
            axisAt="bottom"
            orient="bottom"
            stroke={GREY}
            strokeWidth={0.5}
            tickStroke={GREY}
            showTickLabel={false}
            innerTickSize={-1 * (width - 70)}
            strokeWidth={0.5}
            ticks={6}
            opacity="0.2"
            zoomEnabled={false}
          />
          <BarSeries
            fill={fill}
            yAccessor={d => d.y}
            xAccessor={d => d.x}
            swapScales
            opacity={1}
            baseAt={(xScale, yScale, d) => yScale(0)}
            isLabelInside
            width={20}
            labelColor={labelColor}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default HorizontalBarChart;
