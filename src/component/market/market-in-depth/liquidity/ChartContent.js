import React from 'react';
import {
  AreaChart,
  BarChart,
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  PriceCoordinate,
} from '../../../common/chart';
import { Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import moment from 'moment';
import {
  formatTextFloat,
  formatValueBillion,
  formatValue,
} from './../../../helpers/Text';
import HoverTooltip from '../../../common/chart/lib/tooltip/HoverTooltip';
import { Label } from 'react-stockcharts/lib/annotation';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import {
  getMinMaxData,
  getTickValues,
  tickIntervalFunction,
  getYExtentsChart,
} from './../../../helpers/Chart';

const SETTINGS = {
  //NOTE: change HEIGHT when change bellow info
  MARGIN: { left: 80, right: 80, top: 30, bottom: 30 },
  BAR_HEIGHT: 50,
  UPPER_AREA_HEIGHT: 150,
  LOWER_AREA_HEIGHT: 160,
  // HEIGHT = {MARGIN.top + MARGIN.bottom + UPPER_AREA_HEIGHT + LOWER_AREA_HEIGHT + padding}
  HEIGHT: 400,
  TICK_VALUES: 5,
  COLOR_TEXT_DARK: '#ffffff',
  COLOR_TEXT_LIGHT: '#1f2023',
  COLOR_WHITE: '#ffffff',
  COLOR_2: '#00de8b',
  COLOR_3: '#1e242e',
  COLOR_4: '#555555',
  COLOR_5: '#ffc859',
  COLOR_6: '#2a78d1',
  COLOR_7: '#2e2e2e',
  COLOR_8: '#2e2e2e',
  COLOR_9: '#33b0ff',
  COLOR_RED: '#eb505a',
  COLOR_GREEN: '#00de8b',
  COLOR_TOOLTIP_BORDER: '#555555',
  COLOR_STOKE: '#555555',
  SM_SIZE: 10,
  MD_SIZE: 12,
  LG_SIZE: 14,
};

class ChartContent extends React.Component {
  tooltipContent = referencePrice => {
    return ({ currentItem, xAccessor }) => {
      if (currentItem.indexValueIndex) {
        return {
          y: [
            {
              label: currentItem.comGroupCode,
              value: formatTextFloat(currentItem.indexValueIndex),
              change: currentItem.indexValueIndex - referencePrice,
            },
          ],
        };
      }
    };
  };

  tooltipColor = currentItem => {
    if (currentItem.change >= 0) {
      return SETTINGS.COLOR_GREEN;
    }
    return SETTINGS.COLOR_RED;
  };

  tooltipContentLiquidity = displayTimeRange => {
    const labelAvg =
      displayTimeRange === '1D'
        ? I18n.t('marketInDepthLiquidity.LABEL_CHART_TOOLTIP_AVG.ONE_DAY')
        : I18n.t('marketInDepthLiquidity.LABEL_CHART_TOOLTIP_AVG.OTHERS', {
            timeRange: displayTimeRange,
          });

    return ({ currentItem, xAccessor }) => {
      if (currentItem.totalMatchValueIndex && currentItem.totalMatchValue) {
        return {
          y: [
            {
              label: I18n.t('marketInDepthLiquidity.LABEL_CHART_TOOLTIP_TODAY'),
              value:
                formatTextFloat(formatValue(currentItem.totalMatchValueIndex)) +
                'M',
            },
            {
              label: labelAvg,
              value:
                formatTextFloat(formatValue(currentItem.totalMatchValue)) + 'M',
            },
          ],
        };
      }
    };
  };

  tooltipCanvas = (_ref5, content, ctx) => {
    const X = 10;
    const Y = 7;

    var fontFamily = _ref5.fontFamily,
      fontSize = _ref5.fontSize,
      fontFill = _ref5.fontFill;

    var startY = Y;

    for (var i = 0; i < content.y.length; i++) {
      if (i === 0) {
        var y = content.y[i];

        ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
        var textY = startY + fontSize * (i + 1);
        ctx.fillStyle = y.stroke || fontFill;
        ctx.fillText(y.label, X, textY);

        const value1 = ' ' + y.value.split('.')[0];
        const value2 = '.' + y.value.split('.')[1];

        ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
        let startXText = X + ctx.measureText(y.label).width;
        ctx.fillStyle = this.tooltipColor(y);
        ctx.fillText(value1, startXText, textY);

        const smallFontSize = SETTINGS.SM_SIZE;
        startXText += ctx.measureText(value1).width;
        ctx.font = 'bold ' + smallFontSize + 'px ' + fontFamily;
        ctx.fillStyle = this.tooltipColor(y);
        ctx.fillText(value2, startXText, textY);
      }
    }
  };

  getAreaYAccessor = d => {
    return d.indexValueIndex;
  };

  getBarYAccessor = d => {
    return d.matchVolumeIndex;
  };

  getAreaLiquidityYAccessor = d => {
    return d.totalMatchValue;
  };

  getAreaIndexYAccessor = d => {
    return d.totalMatchValueIndex;
  };

  renderHoverTooltip = referencePrice => {
    return (
      <HoverTooltip
        offsetY={-35}
        bgOpacity={0.1}
        fill={SETTINGS.COLOR_WHITE}
        stroke={SETTINGS.COLOR_TOOLTIP_BORDER}
        opacity={1}
        yAccessor={this.getAreaYAccessor}
        fontSize={SETTINGS.LG_SIZE}
        tooltipContent={this.tooltipContent(referencePrice)}
        tooltipCanvas={this.tooltipCanvas}
      />
    );
  };

  render() {
    const {
      width,
      ratio,
      data,
      referencePrice,
      displayTimeRange,
      theme,
    } = this.props;

    const { max: yMax, min: yMin } = getMinMaxData(
      data,
      'indexValueIndex',
      'referenceIndex',
    );

    const { max: maxValueAverage } = getMinMaxData(data, 'totalMatchValue');

    const { max: maxValueToday } = getMinMaxData(data, 'totalMatchValueIndex');

    const maxValue =
      maxValueToday > maxValueAverage ? maxValueToday : maxValueAverage;

    const gridWidth = width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right;

    SETTINGS.COLOR_TEXT =
      theme === 'dark' ? SETTINGS.COLOR_TEXT_DARK : SETTINGS.COLOR_TEXT_LIGHT;

    return (
      <div>
        <ChartCanvas
          width={width}
          height={SETTINGS.HEIGHT}
          data={data}
          ratio={ratio}
          margin={SETTINGS.MARGIN}
        >
          <Chart
            id={0}
            yExtents={[
              yMin -
                ((yMax - yMin) * SETTINGS.BAR_HEIGHT) /
                  (SETTINGS.UPPER_AREA_HEIGHT - SETTINGS.BAR_HEIGHT),
              yMax,
            ]}
            height={SETTINGS.UPPER_AREA_HEIGHT}
            origin={(w, h) => [0, 0]}
          >
            <AreaChart theme={theme} yAccessor={this.getAreaYAccessor} />
            <CurrentCoordinate yAccessor={this.getAreaYAccessor} />
            {this.renderHoverTooltip(referencePrice)}
            <XAxis
              axisAt="bottom"
              orient="bottom"
              showTicks={false}
              stroke={SETTINGS.COLOR_STOKE} // x axis stroke color
              strokeWidth={1}
              opacity={0.4}
            />

            <PriceCoordinate price={referencePrice} />
          </Chart>

          <Chart
            id={1}
            height={SETTINGS.BAR_HEIGHT}
            yExtents={this.getBarYAccessor}
            origin={(w, h) => [
              0,
              SETTINGS.UPPER_AREA_HEIGHT - SETTINGS.BAR_HEIGHT,
            ]}
          >
            <BarChart theme={theme} yAccessor={this.getBarYAccessor} />
          </Chart>

          <Chart
            id={2}
            height={SETTINGS.LOWER_AREA_HEIGHT}
            origin={(w, h) => [0, h - SETTINGS.LOWER_AREA_HEIGHT]}
            yExtents={getYExtentsChart(0, maxValue, 5)}
          >
            <XAxis
              axisAt="bottom"
              orient="bottom"
              stroke={SETTINGS.COLOR_STOKE}
              opacity={0.4}
              tickStroke={SETTINGS.COLOR_TEXT}
              innerTickSize={0}
              fontSize={SETTINGS.SM_SIZE}
              zoomEnabled={false}
              tickValues={getTickValues(data.length, SETTINGS.TICK_VALUES)}
              tickPadding={10}
              tickFormat={d => {
                return moment(data[d].tradingDate)
                  .format('HH:mm')
                  .toString();
              }}
            />

            <YAxis
              axisAt="left"
              orient="left"
              tickInterval={5}
              tickStroke={SETTINGS.COLOR_TEXT}
              stroke={SETTINGS.COLOR_STOKE}
              tickStrokeOpacity={0.2}
              opacity={0.8}
              outerTickSize={0}
              edgeClip={true}
              showTicks={true}
              innerTickSize={-1 * gridWidth}
              tickFormat={d => formatTextFloat(formatValueBillion(d))}
              zoomEnabled={false}
              showDomain={false}
              fontSize={SETTINGS.SM_SIZE}
              tickIntervalFunction={tickIntervalFunction}
            />

            <YAxis
              axisAt="left"
              orient="left"
              tickInterval={5}
              tickStroke={SETTINGS.COLOR_TEXT}
              stroke={SETTINGS.COLOR_STOKE}
              tickStrokeOpacity={0.2}
              opacity={0.8}
              outerTickSize={0}
              edgeClip={true}
              showTicks={true}
              showTickLabel={false}
              innerTickSize={0}
              tickFormat={d => formatTextFloat(formatValueBillion(d))}
              zoomEnabled={false}
              showDomain={false}
              fontSize={SETTINGS.SM_SIZE}
              tickIntervalFunction={tickIntervalFunction}
            />

            <MouseCoordinateX />

            <AreaSeries
              yAccessor={this.getAreaLiquidityYAccessor}
              fill={SETTINGS.COLOR_5}
              strokeWidth={0}
              stroke={SETTINGS.COLOR_5}
              opacity={1}
            />
            <CurrentCoordinate yAccessor={this.getAreaIndexYAccessor} />
            <HoverTooltip
              bgOpacity={0.1}
              fill={SETTINGS.COLOR_WHITE}
              stroke={SETTINGS.COLOR_TOOLTIP_BORDER}
              opacity={1}
              yAccessor={this.getAreaIndexYAccessor}
              fontSize={SETTINGS.MD_SIZE}
              tooltipContent={this.tooltipContentLiquidity(displayTimeRange)}
              tooltipCanvas={(_ref5, content, ctx) => {
                const X = 10;
                const Y = 5;
                const LINE_SPACE = 5;

                var fontFamily = _ref5.fontFamily,
                  fontSize = _ref5.fontSize,
                  fontFill = _ref5.fontFill;

                var startY = Y;

                for (var i = 0; i < content.y.length; i++) {
                  if (i === 0) {
                    var y = content.y[i];

                    ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                    var textY = startY + fontSize * (i + 1);
                    ctx.fillStyle = SETTINGS.COLOR_6;
                    ctx.fillText(y.label, X, textY);

                    ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                    let startXText = X + ctx.measureText(y.label).width;
                    ctx.fillStyle = SETTINGS.COLOR_7;
                    ctx.fillText(y.value, startXText, textY);
                  }
                  if (i === 1) {
                    var y = content.y[i];

                    ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                    var textY = startY + fontSize * (i + 1) + LINE_SPACE;
                    ctx.fillStyle = SETTINGS.COLOR_5;
                    ctx.fillText(y.label, X, textY);

                    ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                    let startXText = X + ctx.measureText(y.label).width;
                    ctx.fillStyle = SETTINGS.COLOR_7;
                    ctx.fillText(y.value, startXText, textY);
                  }
                }
              }}
            />
            <AreaSeries
              yAccessor={this.getAreaIndexYAccessor}
              fill={SETTINGS.COLOR_9}
              strokeWidth={0}
              stroke={SETTINGS.COLOR_9}
              opacity={0.8}
            />

            <Label
              x={-60}
              y={270}
              rotate={-90}
              fill={SETTINGS.COLOR_TEXT}
              fontSize={SETTINGS.SM_SIZE}
              text={I18n.t('marketInDepthLiquidity.LABEL_CHART_LEFT')}
              opacity={0.6}
            />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(ChartContent);
