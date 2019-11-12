import React from 'react';
import { Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  LineSeries,
  MouseCoordinateX,
} from '../../../common/chart';
import moment from 'moment';
import Const from './Const';
import { formatTextFloat } from './../../../helpers/Text';
import { connect } from 'react-redux';
import HoverTooltip from '../../../common/chart/lib/tooltip/HoverTooltip';
import { tickIntervalFunction, yExtentsCharts } from './../../../helpers/Chart';

const COMMON_SETTINGS = {
  MARGIN: { left: 40, right: 40, top: 0, bottom: 30 },
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
};

const SETTINGS_DARK = {
  TEXT_COLOR: '#ffffff',
  CHART_INDEX: {
    COLOR: '#47c3ff',
  },
  CHART_RATE: {
    COLOR: '#facc5c',
  },
  ...COMMON_SETTINGS,
};

const SETTINGS_LIGHT = {
  TEXT_COLOR: '#1f2023',
  CHART_INDEX: {
    COLOR: '#2c73e8',
  },
  CHART_RATE: {
    COLOR: '#f8bc06',
  },
  ...COMMON_SETTINGS,
};

class ChartContent extends React.Component {
  tooltipContent = (codeName, rateTitle, rateKey) => {
    return ({ currentItem, xAccessor }) => {
      return {
        y: [
          {
            label: codeName + ': ',
            value: formatTextFloat(currentItem.value),
          },
          {
            label: rateTitle + ': ',
            value: formatTextFloat(currentItem[rateKey]),
          },
        ],
      };
    };
  };

  render() {
    const { width, height, ratio, data, rate, codeName, theme } = this.props;
    const SETTINGS = theme === 'dark' ? SETTINGS_DARK : SETTINGS_LIGHT;
    const gridWidth = width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right;

    const chartHeight = height - 50;

    return (
      <ChartCanvas
        width={width}
        height={height}
        data={data}
        ratio={ratio}
        margin={SETTINGS.MARGIN}
      >
        <Chart
          id={0}
          yExtents={yExtentsCharts(data, ['value'], 4, false, false)}
          height={chartHeight}
          origin={(w, h) => [0, h - chartHeight]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            tickInterval={4}
            tickStroke="#555555"
            tickStrokeOpacity={0.5}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            showTickLabel={false}
            innerTickSize={-1 * gridWidth}
            tickIntervalFunction={tickIntervalFunction}
          />

          <YAxis
            axisAt="left"
            orient="left"
            tickInterval={4}
            tickStroke={SETTINGS.TEXT_COLOR}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            innerTickSize={0}
            tickIntervalFunction={tickIntervalFunction}
          />

          <LineSeries
            yAccessor={d => d.value}
            stroke={SETTINGS.CHART_INDEX.COLOR}
          />

          <XAxis
            tickPadding={10}
            axisAt="bottom"
            orient="bottom"
            opacity={0}
            innerTickSize={0}
            tickStroke={SETTINGS.TEXT_COLOR}
            ticks={2}
            zoomEnabled={false}
            tickFormat={d => {
              const tradingDate = moment(data[d].tradingDate);
              return tradingDate.format('MM/DD/YYYY').toString();
            }}
          />
          <CurrentCoordinate yAccessor={d => d.value} />
          <HoverTooltip
            bgOpacity={0.1}
            fill={'#ffffff'}
            stroke={'#555555'}
            opacity={1}
            yAccessor={d => d.value}
            fontSize={14}
            tooltipContent={this.tooltipContent(
              codeName,
              Const.listRateByKey[rate].name,
              rate,
            )}
            tooltipCanvas={(_ref5, content, ctx) => {
              const X = 10;
              const Y = 7;
              const LINE_SPACE = 3;

              var fontFamily = _ref5.fontFamily,
                fontSize = _ref5.fontSize,
                fontFill = _ref5.fontFill;

              var startY = Y;

              for (var i = 0; i < content.y.length; i++) {
                if (i === 0) {
                  var y = content.y[i];

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSize * (i + 1);
                  ctx.fillStyle = '#2a78d1';
                  ctx.fillText(y.label, X, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = '#2e2e2e';
                  ctx.fillText(y.value, startXText, textY);
                }
                if (i === 1) {
                  var y = content.y[i];

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  var textY = startY + fontSize * (i + 1) + LINE_SPACE;
                  ctx.fillStyle = '#ffaa00';
                  ctx.fillText(y.label, X, textY);

                  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                  let startXText = X + ctx.measureText(y.label).width;
                  ctx.fillStyle = '#2e2e2e';
                  ctx.fillText(y.value, startXText, textY);
                }
              }
            }}
          />
        </Chart>
        <Chart
          id={1}
          yExtents={d => d[rate]}
          height={chartHeight}
          origin={(w, h) => [0, h - chartHeight]}
        >
          <LineSeries
            yAccessor={d => d[rate]}
            stroke={SETTINGS.CHART_RATE.COLOR}
          />

          <YAxis
            axisAt="right"
            orient="right"
            tickInterval={4}
            tickStroke={SETTINGS.TEXT_COLOR}
            opacity={0}
            zoomEnabled={false}
            innerTickSize={0}
            tickIntervalFunction={tickIntervalFunction}
          />
          <CurrentCoordinate
            yAccessor={d => d[rate]}
            color="rgba(250, 204, 92, 0.15)"
          />
          <MouseCoordinateX timeFormat="%m/%d/%Y" />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

export default connect(mapStateToProps)(ChartContent);
