import React from 'react';
import PropTypes from 'prop-types';
import ChartCanvas from '../../../common/chart/ChartCanvas';
import { Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import LineSeries from './lib/LineSeries';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import moment from 'moment';
import { formatTextFloat, formatValueBillion } from './../../../helpers/Text';
import MouseCoordinateX from '../../../common/chart/MouseCoordinateX';
import HoverTooltip from './../../../common/chart/lib/tooltip/HoverTooltip';
import { CrossHairCursor } from 'react-stockcharts/lib/coordinates';
import { I18n } from 'react-redux-i18n';
import {
  getTickValues,
  getYExtentsChart,
  tickIntervalFunction,
} from './../../../helpers/Chart';
import { CurrentCoordinate } from './../../../common/chart';
import { THEMES } from './../../../../configs/LayoutConfig';
import withSwitchTheme from '../../../common/withSwitchTheme';

const SETTINGS_COMMON = {
  HEIGHT: 200,
  MARGIN: { left: 30, right: 30, top: 10, bottom: 30 },
  WHITE_COLOR: '#ffffff',
  TICK_INTERVAL: 5,
  TICK_VALUES: 5,
  RED_COLOR: '#eb505a',
  RED_COLOR_B: '#e63946',
  ORANGE_COLOR: '#facc5c',
  BLUE_COLOR: '#2a78d1',
  BLUE_COLOR_B: '#47c3ff',
  BLUE_COLOR_AREA: '#1d97ef',
  GREY_COLOR: '#555555',
  GREY_COLOR_B: '#1e242e',
  COLOR_TEXT: '#ffffff',
};

const SETTINGS = {
  [THEMES.DARK]: {
    ...SETTINGS_COMMON,
  },
  [THEMES.LIGHT]: {
    ...SETTINGS_COMMON,
    RED_COLOR: '#e94235',
    BLUE_COLOR_B: '#2c73e8',
    ORANGE_COLOR: '#f8bc06',
    COLOR_TEXT: '#1f2023',
  },
};

class ChartContent extends React.Component {
  getItemMinMax = item => {
    const { foreignBuyValueMatched, foreignSellValueMatched } = item;

    return {
      min: Math.min(
        foreignBuyValueMatched,
        foreignSellValueMatched,
        foreignBuyValueMatched - foreignSellValueMatched,
      ),
      max: Math.max(
        foreignBuyValueMatched,
        foreignSellValueMatched,
        foreignBuyValueMatched - foreignSellValueMatched,
      ),
    };
  };

  getMinMaxData = data => {
    if (data.length < 1) {
      return {
        min: 0,
        max: 0,
      };
    }

    let { min, max } = this.getItemMinMax(data[0]);

    const length = data.length;
    for (let index = 1; index < length; index++) {
      const { min: tmpMin, max: tmpMax } = this.getItemMinMax(data[index]);
      min = Math.min(tmpMin, min);
      max = Math.max(tmpMax, max);
    }
    return {
      min,
      max,
    };
  };

  getGridWidth = () => {
    const { width, SETTINGS } = this.props;

    return width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right;
  };

  render() {
    const { data, width, ratio, SETTINGS } = this.props;

    const { max: yMax, min: yMin } = this.getMinMaxData(data);

    return (
      <ChartCanvas
        width={width}
        height={SETTINGS.HEIGHT}
        data={data}
        ratio={ratio}
        margin={SETTINGS.MARGIN}
      >
        <Chart
          id={1}
          yExtents={getYExtentsChart(
            formatValueBillion(yMin),
            formatValueBillion(yMax),
            5,
          )}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickStroke={SETTINGS.GREY_COLOR}
            tickStrokeOpacity={0.5}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            showTickLabel={false}
            innerTickSize={-1 * this.getGridWidth()}
            tickIntervalFunction={tickIntervalFunction}
          />

          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickStroke={SETTINGS.COLOR_TEXT}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            innerTickSize={0}
            tickIntervalFunction={tickIntervalFunction}
          />

          <XAxis
            axisAt="bottom"
            orient="bottom"
            innerTickSize={0}
            tickStroke={SETTINGS.COLOR_TEXT}
            tickValues={getTickValues(data.length, SETTINGS.TICK_VALUES)}
            zoomEnabled={false}
            showDomain={false}
            tickPadding={10}
            tickFormat={d => {
              const tradingDate = moment(data[d].tradingDate);
              return tradingDate.format('HH:mm').toString();
            }}
          />

          <LineSeries
            yAccessor={d => formatValueBillion(d.foreignBuyValueMatched)}
            stroke={SETTINGS.BLUE_COLOR_B}
            field={'foreignBuyValueMatched'}
          />

          <LineSeries
            yAccessor={d => formatValueBillion(d.foreignSellValueMatched)}
            stroke={SETTINGS.ORANGE_COLOR}
            field={'foreignSellValueMatched'}
          />

          <AreaSeries
            yAccessor={d => {
              return (
                formatValueBillion(
                  d.foreignBuyValueMatched - d.foreignSellValueMatched,
                ) <= 0 &&
                formatValueBillion(
                  d.foreignBuyValueMatched - d.foreignSellValueMatched,
                )
              );
            }}
            fill={SETTINGS.RED_COLOR}
            strokeOpacity={0}
            stroke={SETTINGS.RED_COLOR}
            baseAt={scale => scale(0)}
          />

          <AreaSeries
            yAccessor={d => {
              return (
                formatValueBillion(
                  d.foreignBuyValueMatched - d.foreignSellValueMatched,
                ) > 0 &&
                formatValueBillion(
                  d.foreignBuyValueMatched - d.foreignSellValueMatched,
                )
              );
            }}
            fill={SETTINGS.BLUE_COLOR_AREA}
            strokeOpacity={0}
            stroke={SETTINGS.RED_COLOR}
            baseAt={scale => scale(0)}
          />

          <MouseCoordinateX timeFormat="%H:%M %m/%d/%Y" />

          <HoverTooltip
            bgOpacity={0}
            stroke={SETTINGS.GREY_COLOR}
            fill={SETTINGS.WHITE_COLOR}
            opacity={1}
            tooltipContent={tooltipContent(SETTINGS)}
            tooltipCanvas={tooltipCanvas()}
            fontSize={11}
          />
          <CrossHairCursor stroke={SETTINGS.WHITE_COLOR} />
          <CurrentCoordinate
            field={'foreignBuyValueMatched'}
            yAccessor={d => formatValueBillion(d.foreignBuyValueMatched)}
          />
          <CurrentCoordinate
            field={'foreignSellValueMatched'}
            yAccessor={d => formatValueBillion(d.foreignSellValueMatched)}
            color="rgba(250, 204, 92, 0.15)"
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

function tooltipContent(SETTINGS) {
  return ({ currentItem, xAccessor }) => {
    if (
      currentItem.foreignBuyValueMatched &&
      currentItem.foreignSellValueMatched
    ) {
      return {
        x: '',
        y: [
          {
            label: I18n.t('moneyFlowForeign.total_foreign_buy_value'),
            value:
              formatTextFloat(
                formatValueBillion(currentItem.foreignBuyValueMatched),
              ) + ' Bn.',
            stroke: SETTINGS.BLUE_COLOR,
          },
          {
            label: I18n.t('moneyFlowForeign.total_foreign_sell_value'),
            value:
              formatTextFloat(
                formatValueBillion(currentItem.foreignSellValueMatched),
              ) + ' Bn.',
            stroke: SETTINGS.ORANGE_COLOR,
          },
          {
            label: I18n.t('moneyFlowForeign.net_foreign_value'),
            value:
              formatTextFloat(
                formatValueBillion(
                  currentItem.foreignBuyValueMatched -
                    currentItem.foreignSellValueMatched,
                ),
              ) + ' Bn.',
            stroke: SETTINGS.RED_COLOR_B,
          },
        ],
      };
    }
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
    ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
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

ChartContent.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  SETTINGS: PropTypes.object.isRequired,
};

export default withSwitchTheme(SETTINGS)(ChartContent);
