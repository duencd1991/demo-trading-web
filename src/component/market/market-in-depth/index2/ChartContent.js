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
import Const from './Const';
import HoverTooltip from '../../../common/chart/lib/tooltip/HoverTooltip';
import { formatTextFloat } from '../../../helpers/Text';
import { getMinMaxData, getTickValues } from './../../../helpers/Chart';
import { connect } from 'react-redux';

const SETTINGS = {
  HEIGHT: 245,
  MARGIN: { left: 20, right: 50, top: 30, bottom: 30 },
  COLOR_WHITE: '#ffffff',
  COLOR_GREEN: '#00de8b',
  COLOR_RED: '#eb505a',
  COLOR_TOOLTIP_BORDER: '#555555',
  MD_SIZE: 14,
  SM_SIZE: 10,
  FOOT_HEIGHT: 15,
  BAR_HEIGHT: 50,
  AREA_HEIGHT: 180,
};

class ChartContent extends React.Component {
  getXAxisFormatAndTicks = timeRange => {
    const { data } = this.props;
    const length = data.length;

    const tickValuesByCount5 = { tickValues: getTickValues(length, 5) };
    const tickValuesByCount3 = { tickValues: getTickValues(length, 3) };
    const formatHourMinute = { format: 'HH:mm' };
    const formatMonthDay = { format: 'MM/DD' };
    const formatYear = { format: 'YYYY' };

    switch (timeRange) {
      case Const.timeRange['1D']:
        return { ...formatHourMinute, ...tickValuesByCount5 };
      case Const.timeRange['1W']:
      case Const.timeRange['1M']:
      case Const.timeRange['3M']:
      case Const.timeRange['6M']:
      case Const.timeRange.YTD:
      case Const.timeRange['1Y']:
        return { ...formatMonthDay, ...tickValuesByCount5 };
      case Const.timeRange['3Y']:
        return { ...formatYear, ...tickValuesByCount3 };
      case Const.timeRange['5Y']:
        return { ...formatYear, ...tickValuesByCount5 };
    }
  };

  getReferencePrice = () => {
    const { data } = this.props;
    const length = data.length;

    return length > 0 ? data[length - 1].referenceIndex : 0;
  };

  getAreaYAccessor = d => {
    return d.indexValue;
  };

  getBarYAccessor = d => {
    return d.matchVolume;
  };

  tooltipContent = referencePrice => {
    return ({ currentItem, xAccessor }) => {
      if (currentItem.indexValue) {
        return {
          y: [
            {
              label: currentItem.comGroupCode,
              value: formatTextFloat(currentItem.indexValue),
              change: currentItem.indexValue - referencePrice,
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

        startXText += ctx.measureText(value1).width;
        ctx.font = 'bold ' + SETTINGS.SM_SIZE + 'px ' + fontFamily;
        ctx.fillStyle = this.tooltipColor(y);
        ctx.fillText(value2, startXText, textY);
      }
    }
  };

  renderHoverTooltip = referencePrice => {
    return (
      <HoverTooltip
        offsetY={-40}
        bgOpacity={0.1}
        fill={SETTINGS.COLOR_WHITE}
        stroke={SETTINGS.COLOR_TOOLTIP_BORDER}
        opacity={1}
        yAccessor={this.getAreaYAccessor}
        fontSize={SETTINGS.MD_SIZE}
        tooltipContent={this.tooltipContent(referencePrice)}
        tooltipCanvas={this.tooltipCanvas}
      />
    );
  };

  render() {
    const { width, ratio, data, timeRange, theme } = this.props;

    let { max: yMax, min: yMin } = getMinMaxData(
      data,
      'indexValue',
      'referenceIndex',
    );

    const referencePrice = this.getReferencePrice();

    if (yMax === yMin) {
      yMax = referencePrice + 1;
      yMin = referencePrice - 1;
    }

    const {
      format: xAxisFormat,
      tickValues: xAxisTickValues,
    } = this.getXAxisFormatAndTicks(timeRange);

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
          <AreaChart theme={theme} yAccessor={this.getAreaYAccessor} />
          <CurrentCoordinate yAccessor={this.getAreaYAccessor} />
          {this.renderHoverTooltip(referencePrice)}
          <MouseCoordinateX />
          <PriceCoordinate price={referencePrice} />
        </Chart>

        <Chart
          id={1}
          height={SETTINGS.BAR_HEIGHT}
          yExtents={this.getBarYAccessor}
          origin={(w, h) => [0, h - SETTINGS.BAR_HEIGHT - SETTINGS.FOOT_HEIGHT]}
        >
          <BarChart theme={theme} yAccessor={this.getBarYAccessor} />
        </Chart>

        <Chart id={2} yExtents={this.getAreaYAccessor}>
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

export default connect(mapStateToProps)(ChartContent);
