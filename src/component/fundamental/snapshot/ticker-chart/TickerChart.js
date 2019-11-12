import React from 'react';
import {
  AreaChart,
  BarChart,
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  PriceCoordinate,
  XAxis,
} from '../../../common/chart';
import { Chart } from 'react-stockcharts';
import Const from './../Const';
import HoverTooltip from '../../../common/chart/lib/tooltip/HoverTooltip';
import { formatTextFloat, formatPrice } from '../../../helpers/Text';
import { getMinMaxData, getTickValues } from './../../../helpers/Chart';
import { connect } from 'react-redux';

const SETTINGS = {
  HEIGHT: 180, // NOTE: HEIGHT = FOOT_HEIGHT + AREA_HEIGHT + MARGIN.top + MARGIN.bottom
  FOOT_HEIGHT: 15,
  BAR_HEIGHT: 50,
  AREA_HEIGHT: 115,
  MARGIN: { left: 20, right: 50, top: 30, bottom: 15 },
  COLOR_WHITE: '#ffffff',
  COLOR_GREEN: '#00de8b',
  COLOR_RED: '#eb505a',
  COLOR_TOOLTIP_BORDER: '#555555',
  MD_SIZE: 14,
  SM_SIZE: 10,
};

class TickerChart extends React.Component {
  tooltipContent = (referencePrice, fieldAreaChart) => {
    return ({ currentItem, xAccessor }) => {
      if (currentItem[fieldAreaChart]) {
        return {
          y: [
            {
              label: currentItem.ticker,
              value: formatTextFloat(formatPrice(currentItem[fieldAreaChart])),
              change: currentItem[fieldAreaChart] - referencePrice,
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

  getXAxisFormatAndTicks = (length, timeRange) => {
    switch (timeRange) {
      case Const.timeRange['1D']:
        return { format: 'HH:mm', tickValues: getTickValues(length, 5) };
      case Const.timeRange['1W']:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange['1M']:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange['3M']:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange['6M']:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange.YTD:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange['1Y']:
        return { format: 'MM/DD', tickValues: getTickValues(length, 5) };
      case Const.timeRange['3Y']:
        return { format: 'YYYY', tickValues: getTickValues(length, 3) };
      case Const.timeRange['5Y']:
        return { format: 'YYYY', tickValues: getTickValues(length, 5) };
    }
  };

  render() {
    const {
      width,
      ratio,
      data,
      timeRange,
      theme,
      fieldAreaChart,
      refPriceKey,
    } = this.props;
    const { max, min } = getMinMaxData(data, fieldAreaChart, refPriceKey);
    const yMin = formatPrice(min);
    const yMax = formatPrice(max);

    const areaY = d => formatPrice(d[fieldAreaChart]);
    const barY = d => d.matchVolume;

    const length = data.length;
    const referencePrice = length > 0 ? data[length - 1].referencePrice : 0;

    const {
      format: xAxisFormat,
      tickValues: xAxisTickValues,
    } = this.getXAxisFormatAndTicks(length, timeRange);

    return (
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
                (SETTINGS.AREA_HEIGHT - SETTINGS.BAR_HEIGHT),
            yMax,
          ]}
          height={SETTINGS.AREA_HEIGHT}
          origin={(w, h) => [
            0,
            h - SETTINGS.AREA_HEIGHT - SETTINGS.FOOT_HEIGHT,
          ]}
        >
          <AreaChart theme={theme} yAccessor={areaY} />
          <CurrentCoordinate yAccessor={areaY} />
          <HoverTooltip
            offsetY={-35}
            bgOpacity={0.1}
            fill={SETTINGS.COLOR_WHITE}
            stroke={SETTINGS.COLOR_TOOLTIP_BORDER}
            opacity={1}
            yAccessor={areaY}
            fontSize={SETTINGS.MD_SIZE}
            tooltipContent={this.tooltipContent(referencePrice, fieldAreaChart)}
            tooltipCanvas={(_ref5, content, ctx) => {
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

                  startXText += ctx.measureText(value1).width;
                  ctx.font = 'bold ' + SETTINGS.SM_SIZE + 'px ' + fontFamily;
                  ctx.fillStyle = this.tooltipColor(y);
                  ctx.fillText(value2, startXText, textY);
                }
              }
            }}
          />
          <MouseCoordinateX />
          <PriceCoordinate price={formatPrice(referencePrice)} />
        </Chart>

        <Chart
          id={1}
          height={SETTINGS.BAR_HEIGHT}
          yExtents={barY}
          origin={(w, h) => [0, h - SETTINGS.BAR_HEIGHT - SETTINGS.FOOT_HEIGHT]}
        >
          <BarChart theme={theme} yAccessor={barY} />
        </Chart>

        <Chart id={2} yExtents={areaY}>
          <XAxis
            theme={theme}
            footHeight={SETTINGS.FOOT_HEIGHT * 2}
            data={data}
            format={xAxisFormat}
            tickValues={xAxisTickValues}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(TickerChart);
