import React from 'react';
import { scalePoint } from 'd3-scale';
import { Chart } from 'react-stockcharts';
import BarSeries from '../../../../common/mixChart/bar-series/BarSeries';
import { XAxis } from 'react-stockcharts/lib/axes';
import { format } from 'd3-format';
import { PriceCoordinate } from 'react-stockcharts/lib/coordinates';
import { fitWidth } from 'react-stockcharts/lib/helper';

import PropTypes from 'prop-types';
import Const from '../Const';

import HoverTooltip from '../../../../common/chart/lib/tooltip/HoverTooltip';
import ChartCanvas from '../../../../common/chart/lib/chart-canvas/ChartCanvas';
import { formatTextFloat } from './../../../../helpers/Text';

var _utils = require('react-stockcharts/lib/utils/index');

class BarChart extends React.Component {
  render() {
    const { data: unsortedData, ratio } = this.props;
    const {
      barKey_xExtents,
      barKey_xAccessor,
      Chart_yExtents,
      fillCondition,
      fillConditionHover,
      labelX,
      labelXHightLight,
      labelXHightLightColor,
      chartName,
    } = this.props;

    const { barWidth, barHeight } = this.props;
    const { chartWidth, chartHeight, marginLeft, marginRight } = this.props;

    if (chartWidth > 0) {
      const data = unsortedData.slice();

      let baseAtPixel =
        (chartHeight -
          (Const.anomalyChart.MARGIN_TOP + Const.anomalyChart.MARGIN_BOTTOM)) /
        2;

      const xScale = scalePoint();
      return (
        <ChartCanvas
          ratio={ratio}
          width={chartWidth}
          height={chartHeight}
          margin={{
            left: marginLeft,
            right: marginRight,
            top: Const.anomalyChart.MARGIN_TOP,
            bottom: Const.anomalyChart.MARGIN_BOTTOM,
          }}
          seriesName={chartName}
          xExtents={barKey_xExtents}
          data={data}
          xScale={xScale}
          padding={1}
          xAccessor={barKey_xAccessor}
          displayXAccessor={barKey_xAccessor}
        >
          <Chart id={1} yExtents={Chart_yExtents}>
            <PriceCoordinate
              at="right"
              orient="right"
              price={0}
              stroke="#7f7979"
              dx={2}
              yAxisPad={10}
              lineStroke="#7f7979"
              lineOpacity={1}
              fontSize={12}
              opacity={0}
              strokeOpacity={0}
              snapX={false}
              rectWidth={0}
              textFill=""
              displayFormat={format('0.2f')}
            />
            <XAxis
              axisAt="bottom"
              orient="bottom"
              opacity={0}
              tickStrokeOpacity={0}
              innerTickSize={0}
              tickStroke="#666a71"
              fontSize="10"
              tickFormat={labelX}
            />
            <XAxis
              axisAt="bottom"
              orient="bottom"
              opacity={0}
              tickStrokeOpacity={0}
              innerTickSize={0}
              tickStroke={labelXHightLightColor}
              fontSize="10"
              tickFormat={labelXHightLight}
            />
            <BarSeries
              yAccessor={barHeight}
              fill={fillCondition}
              fillHover={fillConditionHover}
              opacity={1}
              baseAt={baseAtPixel}
              width={barWidth}
              highlightOnHover={true}
            />

            <HoverTooltip
              bgOpacity={0.1}
              fill={'#ffffff'}
              stroke="#555555"
              opacity={1}
              yAccessor={barHeight}
              tooltipContent={tooltipContent([])}
              tooltipCanvas={(_ref5, content, ctx) => {
                const X = 10;
                const Y = 5;

                var fontFamily = _ref5.fontFamily,
                  fontSize = _ref5.fontSize,
                  fontFill = _ref5.fontFill;

                var startY = Y;
                for (var i = 0; i < content.y.length; i++) {
                  var y = content.y[i];
                  var textY = startY + fontSize;
                  ctx.fillStyle = fontFill;
                  ctx.fillText(y.label + ': ', X, textY);

                  let startXText = X + ctx.measureText(y.label + ': ').width;

                  ctx.fillText(y.value, startXText, textY);
                }
              }}
              fontSize={10}
            />
          </Chart>
        </ChartCanvas>
      );
    }
    return null;
  }
}

function tooltipContent() {
  return ({ currentItem, xAccessor }) => {
    return {
      y: [
        {
          label: currentItem.time_tooltip,
          value: formatTextFloat(currentItem.y * 100) + '%',
        },
      ],
    };
  };
}

BarChart.propTypes = {
  ratio: PropTypes.number,

  chartName: PropTypes.string.isRequired,
  chartWidth: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  fillCondition: PropTypes.func.isRequired,
  labelX: PropTypes.func.isRequired,
  labelXHightLight: PropTypes.func.isRequired,
  barKey_xExtents: PropTypes.func.isRequired,
  barKey_xAccessor: PropTypes.func.isRequired,
  Chart_yExtents: PropTypes.func.isRequired,
  barWidth: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
  chartHeight: PropTypes.number.isRequired,
  barHeight: PropTypes.func.isRequired,
};

BarChart.defaultProps = {};

BarChart = fitWidth(BarChart);

export default BarChart;
