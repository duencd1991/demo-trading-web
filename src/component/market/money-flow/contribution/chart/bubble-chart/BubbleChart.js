import { set } from 'd3-collection';
//TODO import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { format } from 'd3-format';
import { extent } from 'd3-array';

import React from 'react';
import ChartCanvas from '../../../../../common/chart/lib/chart-canvas/ChartCanvas';
import { Chart } from 'react-stockcharts';
import { CircleMarker, ScatterSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import Const from '../../Const';
import HoverTooltip from '../../../../../common/chart/lib/tooltip/HoverTooltip';
import iconGreen from '../icon-green.svg';
import iconRed from '../icon-red.svg';
import {
  formatTextFloat,
  formatPercent,
  formatPrice,
  formatValueBillion,
  formatVolume,
} from '../../../../../helpers/Text';
import { getMinMaxData } from './../../../../../helpers/Chart';

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _react2 = _interopRequireDefault(React);

var _utils = require('react-stockcharts/lib/utils/index');

const MARGIN = { left: 50, right: 20, top: 20, bottom: 30 };
const RATE_SHARP_FONT = 0.7;
const MIN_VISIBLE_FONT_SIZE = 10;
const RATE_ZOOM = 3;
const FONT_FAMILY = 'Arial';
const MAX_RADIUS = 20; //px
const MIN_RADIUS = 3; //px

const COLOR_GREEN = '#009d5b';
const COLOR_RED = '#f11a09';
const COLOR_BLACK = '#000000';
const COLOR_WHITE = '#ffffff';

const COLOR_TEXT_DARK = '#ffffff';
const COLOR_TEXT_LIGHT = '#1f2023';
const COLOR_GRID = '#555555';

CircleMarker.drawOnCanvas = function(props, point, ctx) {
  var stroke = props.stroke,
    fill = props.fill,
    opacity = props.opacity,
    strokeWidth = props.strokeWidth;

  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth;

  if (fill !== 'none') {
    ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
  }

  CircleMarker.drawOnCanvasWithNoStateChange(props, point, ctx);
};

CircleMarker.drawOnCanvasWithNoStateChange = function(props, point, ctx) {
  var getFont = fontSize => {
    return fontSize + 'px ' + FONT_FAMILY;
  };

  var r = props.r;

  var radius = (0, _utils.functor)(r)(point.datum);
  var newRadius = radius * RATE_ZOOM;
  var diameter = 2 * newRadius;
  ctx.moveTo(point.x, point.y);
  ctx.beginPath();
  ctx.arc(point.x, point.y, newRadius, 0, 2 * Math.PI, false);
  // ctx.stroke();
  ctx.fill();

  var fontSize = newRadius * RATE_SHARP_FONT;

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.font = getFont(fontSize);
  var textWidth = ctx.measureText(point.datum[Const.listContribution.TICKER])
    .width;

  while (textWidth > diameter) {
    if (fontSize < MIN_VISIBLE_FONT_SIZE) {
      return;
    }

    ctx.font = getFont(--fontSize);
    textWidth = ctx.measureText(point.datum[Const.listContribution.TICKER])
      .width;
  }

  ctx.fillText(
    point.datum[Const.listContribution.TICKER],
    point.x - textWidth / 2,
    point.y + fontSize / 2,
  );
  ctx.stroke();
  ctx.fill();
};

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);
    this.imgGreen = new Image();
    this.imgGreen.src = iconGreen;
    this.imgRed = new Image();
    this.imgRed.src = iconRed;
  }

  getXAccessor = d => {
    const dAverageVolume = d[Const.listContribution.AVERAGE_VOLUME_1WEEK];
    const dTotalVolume = d[Const.listContribution.TOTAL_MATCH_VOLUME];

    if (dAverageVolume === 0) {
      return 0;
    }
    return dTotalVolume / dAverageVolume;
  };

  formatData = unsortedData => {
    return unsortedData.slice().sort((a, b) => {
      const aTotalVolume = a[Const.listContribution.TOTAL_MATCH_VOLUME];
      const aAverageVolume = a[Const.listContribution.AVERAGE_VOLUME_1WEEK];
      const bTotalVolume = b[Const.listContribution.TOTAL_MATCH_VOLUME];
      const bAverageVolume = b[Const.listContribution.AVERAGE_VOLUME_1WEEK];
      const aValue = aTotalVolume / aAverageVolume;
      const bValue = bTotalVolume / bAverageVolume;

      if (aAverageVolume === 0) {
        return -bValue;
      }
      if (bAverageVolume === 0) {
        return aValue;
      }
      return aValue - bValue;
    });
  };

  getXMinMAxPadding = (data, width) => {
    const minData = data[0];
    const minAverageVolume =
      minData[Const.listContribution.AVERAGE_VOLUME_1WEEK];
    const minTotalVolume = minData[Const.listContribution.TOTAL_MATCH_VOLUME];

    const xMin = minAverageVolume !== 0 ? minTotalVolume / minAverageVolume : 0;

    const maxData = data[data.length - 1]; // todo: data always length > 1
    const maxAverageVolume =
      maxData[Const.listContribution.AVERAGE_VOLUME_1WEEK];
    const maxTotalVolume = maxData[Const.listContribution.TOTAL_MATCH_VOLUME];

    const xMax = maxAverageVolume !== 0 ? maxTotalVolume / maxAverageVolume : 0;

    const padding =
      (RATE_ZOOM * MAX_RADIUS * (xMax - xMin)) /
      (width - MARGIN.left - MARGIN.right - 2 * RATE_ZOOM * MAX_RADIUS);
    const xMaxPadding = xMax + padding;
    const xMinPadding = xMin - padding;

    return {
      xMinPadding,
      xMaxPadding,
    };
  };

  getYMinMAxPadding = (data, height) => {
    const { max: yMax, min: yMin } = getMinMaxData(
      data,
      Const.listContribution.CONTRIBUTION,
    );

    const padding =
      (RATE_ZOOM * MAX_RADIUS * (yMax - yMin)) /
      (height - MARGIN.top - MARGIN.bottom - 2 * RATE_ZOOM * MAX_RADIUS);
    const yMaxPadding = yMax + padding;
    const yMinPadding = yMin - padding;

    return {
      yMinPadding,
      yMaxPadding,
    };
  };

  getRadius = data => d => {
    const r = scaleLinear()
      .range([MIN_RADIUS, MAX_RADIUS])
      .domain(extent(data, d => d[Const.listContribution.MARKET_CAP]));

    return r(d[Const.listContribution.MARKET_CAP]);
  };

  getFill = data => {
    //TODO const f = scaleOrdinal(schemeCategory10).domain(
      const f = scaleOrdinal().domain(
      set(data.map(d => d[Const.listContribution.TICKER])),
    );

    return d => f(d[Const.listContribution.TICKER]);
  };

  render() {
    const { data: unsortedData, width, height, ratio, theme } = this.props;

    const data = this.formatData(unsortedData);

    const gridWidth = width - MARGIN.left - MARGIN.right;

    const COLOR_TEXT = theme === 'dark' ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;

    return (
      <ChartCanvas
        seriesName="Bubble"
        ratio={ratio}
        width={width}
        height={height}
        margin={MARGIN}
        data={data}
        xAccessor={this.getXAccessor}
        xScale={scaleLinear()}
        xExtents={Object.values(this.getXMinMAxPadding(data, width))}
        panEvent={false}
      >
        <Chart
          id={1}
          yExtents={Object.values(this.getYMinMAxPadding(data, height))}
          yMousePointerRectWidth={45}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            tickFormat={format('0.2f')}
            innerTickSize={0}
            tickStroke={COLOR_TEXT}
            stroke={COLOR_GRID}
            outerTickSize={0}
            showTicks={true}
            tickPadding={5}
            tickInterval={10}
            showDomain={false}
            zoomEnabled={false}
          />
          <YAxis
            axisAt="left"
            orient="left"
            tickStroke={COLOR_GRID}
            tickStrokeOpacity={0.5}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            showTickLabel={false}
            innerTickSize={-1 * gridWidth}
          />

          <YAxis
            axisAt="left"
            orient="left"
            tickStroke={COLOR_TEXT}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            innerTickSize={0}
          />
          <ScatterSeries
            yAccessor={d => d[Const.listContribution.CONTRIBUTION]}
            marker={CircleMarker}
            fill={this.getFill(data)}
            markerProps={{
              r: this.getRadius(data),
              fill: d =>
                d[Const.listContribution.CONTRIBUTION] > 0
                  ? '#00de8b'
                  : '#eb505a',
              opacity: 0.75,
              strokeWidth: 0,
            }}
          />

          <HoverTooltip
            triangleSize={10}
            bgOpacity={0.1}
            bgFixedSize={{ width: 200, height: 120 }}
            fill={COLOR_WHITE}
            stroke={COLOR_WHITE}
            opacity={1}
            yAccessor={d => d[Const.listContribution.CONTRIBUTION]}
            tooltipContent={tooltipContent([])}
            tooltipCanvas={(_ref5, content, ctx) => {
              const X = 10;
              const Y = 10;

              var fontFamily = _ref5.fontFamily,
                fontSize = _ref5.fontSize,
                fontFill = _ref5.fontFill;

              const fontSizeLarge = 20;

              var startY = Y + fontSizeLarge * 0.9;
              ctx.font = 'bold ' + fontSizeLarge + 'px ' + fontFamily;
              ctx.fillStyle = fontFill;
              ctx.textAlign = 'left';
              ctx.fillText(content.x, X, startY);

              for (var i = 0; i < content.y.length; i++) {
                if (i === 0) {
                  var y = content.y[i];
                  const colorCode = y.value1 >= 0 ? COLOR_GREEN : COLOR_RED;

                  ctx.font = fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSizeLarge * (i + 1);
                  ctx.fillStyle = y.stroke || fontFill;
                  ctx.fillText(y.label, X, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = fontFill;
                  ctx.fillText(': ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(': ').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value1, startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(y.value1).width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(' ~ ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' ~ ').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value2 + '%', startXText, textY);
                }
                if (i === 1) {
                  var y = content.y[i];
                  const colorCode = y.value2 >= 0 ? COLOR_GREEN : COLOR_RED;

                  ctx.font = fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSizeLarge * (i + 1);
                  ctx.fillStyle = y.stroke || fontFill;
                  ctx.fillText(y.label, X, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = fontFill;
                  ctx.fillText(': ', startXText, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(': ').width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(y.value1, startXText, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(y.value1).width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(' (', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' (').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value2, startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(y.value2).width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(' ~ ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' ~ ').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value3 + '%', startXText, textY);

                  startXText += ctx.measureText(y.value3 + '%').width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(')', startXText, textY);
                }

                if (i === 2) {
                  var y = content.y[i];

                  ctx.font = fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSizeLarge * (i + 1);
                  ctx.fillStyle = y.stroke || fontFill;
                  ctx.fillText(y.label, X, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = fontFill;
                  ctx.fillText(': ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(': ').width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(y.value1, startXText, textY);
                }

                if (i === 3) {
                  var y = content.y[i];

                  ctx.font = fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSizeLarge * (i + 1);
                  ctx.fillStyle = y.stroke || fontFill;
                  ctx.fillText(y.label, X, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = fontFill;
                  ctx.fillText(': ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(': ').width;
                  ctx.fillStyle = COLOR_BLACK;
                  ctx.fillText(y.value1, startXText, textY);
                }
              }

              const img =
                content.color === 'Green' ? this.imgGreen : this.imgRed;

              ctx.font = 'bold ' + 20 + 'px ' + fontFamily;
              const iconStartX = ctx.measureText(content.x).width + 13;
              const iconStartY = 0;
              ctx.moveTo(0, startY);
              ctx.drawImage(img, iconStartX, iconStartY, 20, 30);

              ctx.font = 12 + 'px ' + fontFamily;
              ctx.textAlign = 'center';
              ctx.fillStyle = 'black';
              ctx.fillText(content.rank, iconStartX + 10, iconStartY + 18);
            }}
            fontSize={13}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

function tooltipContent() {
  return ({ currentItem, xAccessor }) => {
    return {
      x: currentItem[Const.listContribution.TICKER],
      y: [
        {
          label: 'Contribution',
          value1: formatTextFloat(
            currentItem[Const.listContribution.CONTRIBUTION],
          ),
          value2: formatPercent(
            currentItem[Const.listContribution.CONTRIBUTION_PERCENT],
          ),
        },
        {
          label: 'Matched',
          value1: formatPrice(currentItem[Const.listContribution.MATCH_PRICE]),
          value2: formatPrice(currentItem[Const.listContribution.PRICE_CHANGE]),
          value3: formatPercent(
            currentItem[Const.listContribution.PERCENT_PRICE_CHANGE],
          ),
        },
        {
          label: 'Volume',
          value1: formatTextFloat(
            formatVolume(
              currentItem[Const.listContribution.TOTAL_MATCH_VOLUME],
            ),
          ),
        },
        {
          label: 'Value',
          value1: `${formatTextFloat(
            formatValueBillion(
              currentItem[Const.listContribution.TOTAL_MATCH_VALUE],
            ),
          )} Bn.`,
        },
      ],
      rank: currentItem[Const.listContribution.RANK],
      color:
        currentItem[Const.listContribution.CONTRIBUTION_PERCENT] >= 0
          ? 'Green'
          : 'Red',
    };
  };
}

export default BubbleChart;
