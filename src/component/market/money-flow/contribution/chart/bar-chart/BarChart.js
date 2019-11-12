import React from 'react';
import { scalePoint } from 'd3-scale';
import { Chart } from 'react-stockcharts';
import BarSeries from '../../../../../common/chart/lib/bar-series/BarSeries';
import { YAxis } from 'react-stockcharts/lib/axes';
import Const from '../../Const';
import { I18n } from 'react-redux-i18n';
import HoverTooltip from '../../../../../common/chart/lib/tooltip/HoverTooltip';
import ChartCanvas from '../../../../../common/chart/lib/chart-canvas/ChartCanvas';
import {
  formatTextFloat,
  formatPercent,
  formatPrice,
  formatValueBillion,
  formatVolume,
} from '../../../../../helpers/Text';
import iconGreen from '../icon-green.svg';
import iconRed from '../icon-red.svg';
import { connect } from 'react-redux';

const COMMON = {
  HEIGHT: 300,
  MARGIN: { left: 50, right: 20, top: 20, bottom: 20 },
  COLOR_GREEN_TEXT: '#009d5b',
  COLOR_GREEN_CHART: '#009d5b',
  COLOR_RED_TEXT: '#e94235',
  COLOR_RED_CHART: '#e63946',
  COLOR_DARK_BLUE: '#1e242e',
  COLOR_GRAY: '#555555',
  COLOR_BLACK: '#000000',
  COLOR_WHITE: '#ffffff',
  COLOR_GRID: '#555555',

  SM_SIZE: 10,
  MD_SIZE: 12,
  LG_SIZE: 14,
  BIG_SIZE: 20,

  Y_EXTENTS_PADDING: 1, // padding max/min value of y extend
};

const SETTING_DARK = {
  ...COMMON,
  TEXT_COLOR: '#ffffff',
};

const SETTING_LIGHT = {
  ...COMMON,
  TEXT_COLOR: '#1f2023',
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.imgGreen = new Image();
    this.imgGreen.src = iconGreen;
    this.imgRed = new Image();
    this.imgRed.src = iconRed;
  }

  getYExtents = SETTINGS => d => {
    return [
      -d[Const.listContribution.CONTRIBUTION] * SETTINGS.Y_EXTENTS_PADDING,
      d[Const.listContribution.CONTRIBUTION] * SETTINGS.Y_EXTENTS_PADDING,
    ];
  };

  render() {
    const { data, width, height, ratio, theme } = this.props;
    const SETTINGS = theme === 'dark' ? SETTING_DARK : SETTING_LIGHT;
    const gridWidth = width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right;
    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={SETTINGS.MARGIN}
        seriesName="Bar chart"
        xExtents={list => list.map(d => d[Const.listContribution.TICKER])}
        data={data}
        xAccessor={d => d[Const.listContribution.TICKER]}
        xScale={scalePoint()}
        padding={1}
      >
        <Chart id={1} yExtents={this.getYExtents(SETTINGS)}>
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickStroke={SETTINGS.COLOR_GRID}
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
            ticks={5}
            tickStroke={SETTINGS.TEXT_COLOR}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            innerTickSize={0}
          />
        </Chart>
        <Chart id={2} yExtents={this.getYExtents(SETTINGS)}>
          <BarSeries
            heightChart={height - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom}
            widthChart={width}
            minWidthHideLabel={800}
            yAccessor={d => d[Const.listContribution.CONTRIBUTION]}
            fill={d =>
              d[Const.listContribution.CONTRIBUTION] > 0
                ? SETTINGS.COLOR_GREEN_CHART
                : SETTINGS.COLOR_RED_CHART
            }
            opacity={1}
            clip={true}
            baseAt={(xScale, yScale, d) => yScale(0)}
            textColor={SETTINGS.TEXT_COLOR}
          />
          <HoverTooltip
            bgOpacity={0.1}
            bgFixedSize={{ width: 200, height: 120 }}
            fill={SETTINGS.COLOR_WHITE}
            stroke={SETTINGS.COLOR_GRAY}
            opacity={1}
            yAccessor={d => d[Const.listContribution.CONTRIBUTION]}
            triangleSize={10}
            tooltipContent={tooltipContent()}
            tooltipCanvas={(_ref5, content, ctx) => {
              const X = 10;
              const Y = 10;

              var fontFamily = _ref5.fontFamily,
                fontSize = _ref5.fontSize,
                fontFill = _ref5.fontFill;

              const fontSizeLarge = SETTINGS.BIG_SIZE;

              var startY = Y + fontSizeLarge * 0.9;
              ctx.font = 'bold ' + fontSizeLarge + 'px ' + fontFamily;
              ctx.fillStyle = fontFill;
              ctx.textAlign = 'left';
              ctx.fillText(content.x, X, startY);

              for (var i = 0; i < content.y.length; i++) {
                if (i === 0) {
                  var y = content.y[i];
                  const colorCode =
                    y.value1 >= 0
                      ? SETTINGS.COLOR_GREEN_TEXT
                      : SETTINGS.COLOR_RED_TEXT;

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
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
                  ctx.fillText(' ~ ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' ~ ').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value2 + '%', startXText, textY);
                }
                if (i === 1) {
                  var y = content.y[i];
                  const colorCode =
                    y.value2 >= 0
                      ? SETTINGS.COLOR_GREEN_TEXT
                      : SETTINGS.COLOR_RED_TEXT;

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
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
                  ctx.fillText(y.value1, startXText, textY);

                  ctx.font = fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(y.value1).width;
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
                  ctx.fillText(' (', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' (').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value2, startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(y.value2).width;
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
                  ctx.fillText(' ~ ', startXText, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  startXText += ctx.measureText(' ~ ').width;
                  ctx.fillStyle = colorCode;
                  ctx.fillText(y.value3 + '%', startXText, textY);

                  startXText += ctx.measureText(y.value3 + '%').width;
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
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
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
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
                  ctx.fillStyle = SETTINGS.COLOR_BLACK;
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
            fontSize={SETTINGS.MD_SIZE}
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
          label: I18n.t('moneyFlowContribution.CONTRIBUTION'),
          value1: formatTextFloat(
            currentItem[Const.listContribution.CONTRIBUTION],
          ),
          value2: formatPercent(
            currentItem[Const.listContribution.CONTRIBUTION_PERCENT],
          ),
        },
        {
          label: I18n.t('moneyFlowContribution.MATCHED'),
          value1: formatPrice(currentItem[Const.listContribution.MATCH_PRICE]),
          value2: formatPrice(currentItem[Const.listContribution.PRICE_CHANGE]),
          value3: formatPercent(
            currentItem[Const.listContribution.PERCENT_PRICE_CHANGE],
          ),
        },
        {
          label: I18n.t('moneyFlowContribution.VOLUME'),
          value1: formatTextFloat(
            formatVolume(
              currentItem[Const.listContribution.TOTAL_MATCH_VOLUME],
            ),
          ),
        },
        {
          label: I18n.t('moneyFlowContribution.VALUE'),
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

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(BarChart);
