import React from 'react';

import { scalePoint } from 'd3-scale';
import ChartCanvas from './../../../../common/chart/lib/chart-canvas/ChartCanvas';
import { Chart } from 'react-stockcharts';
import BarSeries from '../../../../common/chart/lib/bar-series/BarSeries';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import HoverTooltip from './../../../../common/chart/lib/tooltip/HoverTooltip';
import Const from '../../Const';
import { formatTextFloat } from '../../../../helpers/Text';
import { Label } from 'react-stockcharts/lib/annotation';
import { GroupedBarSeries } from 'react-stockcharts/lib/series';

import {
  ScatterSeries,
  CircleMarker,
  LineSeries,
} from 'react-stockcharts/lib/series';

const CHART_MIN_WIDTH = 0;
const MARGIN = { left: 60, right: 60, top: 0, bottom: 20 };
const colors = ['#3581b8', '#47ccc7', '#f1ffe7'];

function tooltipContent() {
  return ({ currentItem, xAccessor }) => {
    return {
      x: '',
      y: [
        {
          label: `${Const.assetQualityChartTitle.bank.npl} :`,
          value: ` ${currentItem.y}`,
        },
        {
          label: `${Const.assetQualityChartTitle.bank.ta} :`,
          value: ` ${formatTextFloat(currentItem.y1)}`,
        },
        {
          label: `${Const.assetQualityChartTitle.bank.tl} :`,
          value: ` ${formatTextFloat(currentItem.y2)}`,
        },
        {
          label: `${Const.assetQualityChartTitle.bank.tnpl} :`,
          value: ` ${formatTextFloat(currentItem.y3)}`,
        },
      ],
    };
  };
}

function tooltipCanvas(_ref, _isSynchronizingTooltip, _eventSynchTooltipName) {
  const LINE_SPACE = 4;

  return (_ref5, content, ctx, pointer, height, moreProps, _this) => {
    if (_isSynchronizingTooltip) {
      if (typeof _ref !== 'undefined') {
        _ref(moreProps, _eventSynchTooltipName, true);
      }
    }
    const X = 10;
    const Y = 0;
    var fontFamily = _ref5.fontFamily,
      fontSize = _ref5.fontSize,
      fontFill = _ref5.fontFill;
    var startY = 0;
    ctx.font = fontSize + 'px ' + fontFamily;
    for (var i = 0; i < content.y.length; i++) {
      var y = content.y[i];
      var textY = startY + fontSize * (i + 1) + (i + 1) * LINE_SPACE;
      ctx.fillStyle = y.stroke || fontFill;
      ctx.fillText(y.label, X, textY);
      ctx.fillStyle = fontFill;
      ctx.fillText(y.value, X + ctx.measureText(y.label).width, textY);
    }
  };
}
class GroupBarChartWithLine extends React.Component {
  render() {
    const {
      data,
      width = 350,
      ratio = window.devicePixelRatio,
      theme,
    } = this.props;

    const arrValueYs = data.map(item => {
      return Math.max(item.y1, item.y2, item.y3);
    });

    const linesColor = {
      dark: {
        square: '#9deaef',
        circle: '#f3ffe2',
        triangle: '#ee6352',
      },
      light: {
        square: '#2c73e8',
        circle: '#f8bc06',
        triangle: '#ee6352',
      },
    };

    return (
      <ChartCanvas
        ratio={ratio}
        width={width < CHART_MIN_WIDTH ? CHART_MIN_WIDTH : width - 20}
        height={width * 0.8}
        margin={MARGIN}
        seriesName="FAChart"
        xExtents={data => data.map(d => d.x)}
        data={data}
        xAccessor={d => d.x}
        xScale={scalePoint()}
        padding={1}
      >
        <Chart
          id={1}
          yExtents={d => [
            0,
            Math.max(...arrValueYs) + Math.max(...arrValueYs) / 10,
          ]}
        >
          <Label
            x={-MARGIN.left / 2 - 15}
            y={(width * 0.8 - MARGIN.top - MARGIN.bottom) / 2}
            rotate={-90}
            fill={theme === 'dark' ? '#ffffff' : '#1e242e'}
            fontSize={10}
            opacity={0.6}
            text={'Trillion VND'}
          />

          <Label
            x={width - MARGIN.left - MARGIN.right / 2 - 10}
            y={(width * 0.8 - MARGIN.top - MARGIN.bottom) / 2}
            rotate={90}
            fill={theme === 'dark' ? '#ffffff' : '#1e242e'}
            fontSize={10}
            opacity={0.6}
            text={'Times'}
          />

          <HoverTooltip
            bgOpacity={0.1}
            stroke={'#555555'}
            fill={'white'}
            opacity={1}
            tooltipContent={tooltipContent()}
            tooltipCanvas={tooltipCanvas()}
            fontSize={10}
          />

          <YAxis
            axisAt="left"
            orient="left"
            tickInterval={5}
            tickStroke={theme === 'dark' ? '#555555' : '#1e242e'}
            stroke="#555555"
            outerTickSize={0}
            showDomain={false}
            innerTickSize={
              theme === 'dark'
                ? -1 * (width - MARGIN.left - MARGIN.right - 20)
                : 0
            }
            fontSize={10}
            zoomEnabled={false}
          />

          <YAxis
            axisAt="left"
            orient="left"
            tickInterval={5}
            tickStroke={theme === 'dark' ? 'white' : '#1e242e'}
            innerTickSize={0}
            showDomain={false}
            zoomEnabled={false}
            fontSize={10}
          />

          <GroupedBarSeries
            yAccessor={[d => d.y1, d => d.y2, d => d.y3]}
            fill={(d, i) => colors[i]}
            spaceBetweenBar={2}
            opacity={1}
          />
        </Chart>
        <Chart id={2} yExtents={d => [0, d.y + d.y / 10]}>
          <LineSeries yAccessor={d => d.y} stroke="#f3ffe2" />
          <ScatterSeries
            yAccessor={d => d.y}
            marker={CircleMarker}
            markerProps={{
              r: 1,
              fill: linesColor[theme].circle,
              opacity: 1,
              strokeWidth: 2,
            }}
          />
          <LineSeries yAccessor={d => d.y} stroke="#f3ffe2" />
          <XAxis
            axisAt="bottom"
            orient="bottom"
            strokeWidth={0.5}
            showDomain={false}
            tickStroke={theme === 'dark' ? 'white' : '#1e242e'}
            innerTickSize={0}
            showDomain={theme !== 'dark'}
            fontSize={10}
            zoomEnabled={false}
          />
          <YAxis
            axisAt="right"
            orient="right"
            tickInterval={5}
            tickStroke={theme === 'dark' ? 'white' : '#1e242e'}
            stroke="#1e242e"
            innerTickSize={0}
            showDomain={false}
            fontSize={10}
            zoomEnabled={false}
          />
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default GroupBarChartWithLine;
