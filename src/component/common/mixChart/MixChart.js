import { scalePoint } from 'd3-scale';
import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-stockcharts';
import ChartCanvas from './../chart/lib/chart-canvas/ChartCanvas';
import HoverTooltip from './../chart/lib/tooltip/HoverTooltip';
import { THEMES } from '../../../configs/LayoutConfig';
import {
  CircleMarker,
  GroupedBarSeries,
  SquareMarker,
  TriangleMarker,
} from 'react-stockcharts/lib/series';
import StackedBarSeries from './bar-series/StackedBarSeries';
import LineSeries from './LineSeries';
import ScatterSeries from './ScatterSeries';
import BarSeries from './bar-series/BarSeries';
import { Label } from 'react-stockcharts/lib/annotation';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import './MixChart.scss';
import MixChartFooter from './MixChartFooter';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getColumnSizeInBarChart,
  yExtentsCharts,
  tickIntervalFunction,
} from './../../helpers/Chart';

function tooltipContent(ys) {
  return ({ currentItem, xAccessor }) => {
    return {
      x: '',
      y: []
        .concat(
          ys.map(each => ({
            label: '',
            value: stringFormat(
              each.keyLabel,
              each.value(currentItem),
              each.isContent2,
            ),
            stroke: each.stroke,
          })),
        )
        .filter(line => line.value),
    };
  };
}

const stringFormat = (keyLabel, arrValue, isContent2) => {
  let strValue = I18n.t(keyLabel);
  if (arrValue) {
    if (isContent2) {
      strValue = I18n.t(keyLabel, arrValue);
    } else {
      if (strValue.includes('{')) {
        for (let i = 0; i < arrValue.length; i++) {
          const reg = '{' + i + '}';
          strValue = strValue.replace(reg, arrValue[i]);
        }
      } else {
        strValue += arrValue;
      }
    }
  }

  return strValue;
};
function tooltipCanvas(_ref, _isSynchronizingTooltip, _eventSynchTooltipName) {
  return (_ref5, content, ctx, pointer, height, moreProps, _this) => {
    const LINE_SPACE = 3;

    if (_isSynchronizingTooltip) {
      if (_ref) {
        _ref(moreProps, _eventSynchTooltipName, true);
      }
    }
    const X = 10;
    const Y = 2;
    var fontFamily = _ref5.fontFamily,
      fontSize = _ref5.fontSize,
      fontFill = _ref5.fontFill;
    var startY = Y;
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

function onMouseLeave(_ref, _isSynchronizingTooltip, _eventSynchTooltipName) {
  return _this => {
    if (_isSynchronizingTooltip) {
      if (_ref) {
        _ref({}, _eventSynchTooltipName, false);
      }
    }
  };
}
function getMakerType(series, theme) {
  let makerType =
    series.markerType === Const.CircleMarker
      ? CircleMarker
      : series.markerType === Const.TriangleMarker
      ? TriangleMarker
      : SquareMarker;
  makerType.fill = theme
    ? makerType.fill
    : makerType.fillLight
    ? makerType.fillLight
    : makerType.fill;
  return makerType;
}

class MixChart extends React.Component {
  calculatePositionLabel = yaxisAt => {
    const { configChart, width, height } = this.props;
    let heightChart = configChart.height || Const.SETTINGS.HEIGHT;
    const margin = configChart.margin || Const.SETTINGS.MARGIN;
    if (height) {
      heightChart = height - 90;
    }
    const labelLeft = {
      x: -margin.left / 2,
      y: margin.top + (heightChart - margin.top - margin.bottom) / 2,
    };

    const labelRight = {
      x: width - margin.left - margin.right / 2,
      y: margin.top + (heightChart - margin.top - margin.bottom) / 2,
    };

    return yaxisAt === 'left' ? labelLeft : labelRight;
  };

  render() {
    const {
      data,
      width,
      height,
      ratio,
      configChart,
      handleChecked,
      idComponent,
      key,
      xTickValues,
      tickFormat,
      theme,
    } = this.props;
    const isDark = theme === THEMES.DARK ? true : false;
    const isCheck = (data && data.length > 0) || false;
    const fixStyle = {
      fontSize: configChart.titleChart.fontSize || Const.titleChart.fontSize,
      color: configChart.titleChart.fill || Const.titleChart.fill,
    };
    let heightConfig = configChart.height || Const.SETTINGS.HEIGHT;
    let heightChart = heightConfig;

    if (height) {
      heightChart = height - 90;
    }
    let isSynchronizingTooltip = configChart.isSynchronizingTooltip || false;
    const eventSynchTooltipName = configChart.eventSynchTooltipName
      ? configChart.eventSynchTooltipName + idComponent
      : '';

    const grid = configChart.margin
      ? -1 * (width - configChart.margin.left - configChart.margin.right)
      : -1 * width;
    const unixKey = moment().unix() + idComponent;
    let hoverTooltipEle = {};
    return (
      <div className="mix-chart" key={'ChartCanvas' + unixKey}>
        {configChart.titleChart && (
          <div className="mix-chart-title" style={fixStyle}>
            {I18n.t(configChart.titleChart.title)}
            {configChart.titleChart.isCheck && (
              <>
                <br />
                <span className="under-title">
                  {I18n.t(configChart.titleChart.underTitle)}
                </span>
              </>
            )}
          </div>
        )}
        {isCheck && (
          <ChartCanvas
            ratio={ratio}
            width={width}
            height={heightChart}
            margin={configChart.margin || Const.SETTINGS.MARGIN}
            seriesName="Fruits"
            xExtents={list => list.map(d => d[configChart.xExtents])}
            data={data}
            xAccessor={configChart.xAccessor}
            xScale={scalePoint()}
            padding={1}
            isSynchronizingTooltip={isSynchronizingTooltip}
            eventSynchTooltipName={eventSynchTooltipName}
            onMouseLeave={onMouseLeave(
              handleChecked,
              isSynchronizingTooltip,
              eventSynchTooltipName,
            )}
          >
            {configChart.charts.map((element, index) => {
              const labelPosition = this.calculatePositionLabel(
                element.YAxis.yaxisAt,
              );
              if (element.YAxis.yGrid.innerTickSize) {
                element.YAxis.yGrid.innerTickSize = grid;
              }
              if (element.HoverTooltip) {
                hoverTooltipEle = element.HoverTooltip;
              }
              return (
                <Chart
                  key={'keyChart' + idComponent + index}
                  id={'keyChart' + idComponent + index}
                  yExtents={yExtentsCharts(
                    data,
                    element.yExtentsKeys,
                    element.YAxis.tickInterval || Const.YAxis.tickInterval,
                    element.isStackedBar,
                  )}
                >
                  {element.XAxis && (
                    <XAxis
                      axisAt={element.XAxis.axisAt || Const.XAxis.axisAt}
                      orient={element.XAxis.orient || Const.XAxis.orient}
                      tickStroke={
                        element.XAxis.tickStroke ||
                        (isDark
                          ? Const.XAxis.tickStroke
                          : Const.XAxis.tickStrokeLight)
                      }
                      stroke={
                        element.XAxis.stroke ||
                        (isDark ? Const.XAxis.stroke : Const.XAxis.strokeLight)
                      }
                      innerTickSize={
                        element.XAxis.innerTickSize || Const.XAxis.innerTickSize
                      }
                      opacity={element.XAxis.opacity || Const.XAxis.opacity}
                      tickStrokeOpacity={
                        element.XAxis.tickStrokeOpacity ||
                        Const.XAxis.tickStrokeOpacity
                      }
                      fontSize={element.XAxis.fontSize || Const.XAxis.fontSize}
                      zoomEnabled={
                        element.XAxis.zoomEnabled || Const.XAxis.zoomEnabled
                      }
                      ticks={element.XAxis.ticks || Const.XAxis.ticks}
                      // showDomain={false}
                      // showTickLabel={false}
                      tickPadding={20}
                      tickValues={xTickValues}
                      tickFormat={tickFormat}
                    />
                  )}

                  {element.YAxis && (
                    <YAxis
                      axisAt={element.YAxis.yaxisAt || Const.YAxis.yaxisAt}
                      orient={element.YAxis.yorient || Const.YAxis.yorient}
                      tickInterval={
                        element.YAxis.tickInterval || Const.YAxis.tickInterval
                      }
                      ticks={element.YAxis.ticks || Const.YAxis.ticks}
                      tickStroke={
                        element.YAxis.tickStroke ||
                        (isDark
                          ? Const.YAxis.tickStroke
                          : Const.YAxis.tickStrokeLight)
                      }
                      tickStrokeOpacity={
                        element.YAxis.tickStrokeOpacity ||
                        Const.YAxis.tickStrokeOpacity
                      }
                      innerTickSize={
                        element.YAxis.innerTickSize || Const.YAxis.innerTickSize
                      }
                      stroke={
                        element.YAxis.stroke ||
                        (isDark ? Const.YAxis.stroke : Const.XAxis.strokeLight)
                      }
                      showDomain={false}
                      showTickLabel={false}
                      tickIntervalFunction={tickIntervalFunction}
                      edgeClip={true}
                      showTicks={true}
                      tickFormat={element.YAxis.tickFormat}
                      {...element.YAxis.yGrid}
                    />
                  )}
                  {element.YAxis && (
                    <YAxis
                      axisAt={element.YAxis.yaxisAt || Const.YAxis.yaxisAt}
                      orient={element.YAxis.yorient || Const.YAxis.yorient}
                      tickInterval={
                        element.YAxis.tickInterval || Const.YAxis.tickInterval
                      }
                      fontSize={element.YAxis.fontSize || Const.YAxis.fontSize}
                      ticks={element.YAxis.ticks || Const.YAxis.ticks}
                      tickStroke={
                        element.YAxis.tickStrokeLabelAxis ||
                        (isDark
                          ? Const.YAxis.tickStrokeLabelAxis
                          : Const.YAxis.tickStrokeLabelAxisLight)
                      }
                      tickStrokeOpacity={
                        element.YAxis.tickStrokeOpacity ||
                        Const.YAxis.tickStrokeOpacity
                      }
                      stroke={
                        element.YAxis.stroke ||
                        (isDark ? Const.YAxis.stroke : Const.XAxis.strokeLight)
                      }
                      showDomain={false}
                      edgeClip={true}
                      showTicks={true}
                      tickFormat={element.YAxis.tickFormat}
                      tickIntervalFunction={tickIntervalFunction}
                      {...element.YAxis.yGrid}
                      innerTickSize={0}
                    />
                  )}
                  {element.YAxis.title && (
                    <Label
                      x={element.YAxis.title.x || Const.YAxis.title.x}
                      y={element.YAxis.title.y || Const.YAxis.title.y}
                      rotate={
                        element.YAxis.title.rotate || Const.YAxis.title.rotate
                      }
                      fill={
                        element.YAxis.title.fill ||
                        (isDark
                          ? Const.YAxis.title.fill
                          : Const.YAxis.title.fillLight)
                      }
                      fontSize={
                        element.YAxis.title.fontSize ||
                        Const.YAxis.title.fontSize
                      }
                      text={
                        element.YAxis.title.text
                          ? I18n.t(element.YAxis.title.text)
                          : Const.YAxis.title.text
                      }
                      opacity={
                        element.YAxis.title.opacity
                          ? I18n.t(element.YAxis.title.opacity)
                          : Const.YAxis.title.opacity
                      }
                      className={'mix-y-chart-title'}
                      {...labelPosition}
                    />
                  )}

                  {element.series.map(function(series, index2) {
                    if (series.type === Const.BarSeries) {
                      let colorHover = series.fillHover || series.fill;
                      let colorHoverLight =
                        series.fillHoverLight || series.fillLight;
                      return (
                        <BarSeries
                          key={'BarSeries' + index2}
                          width={getColumnSizeInBarChart(width, 1)}
                          yAccessor={d => d[series.yAccessor]}
                          fill={
                            isDark
                              ? series.fill
                              : series.fillLight || series.fill
                          }
                          fillHover={
                            isDark ? colorHover : colorHoverLight || colorHover
                          }
                          opacity={series.opacity || Const.serie.opacity}
                          highlightOnHover={
                            series.highlightOnHover ||
                            Const.serie.highlightOnHover
                          }
                          baseAt={(xScale, yScale, d) => yScale(0)}
                          clip={true}
                        />
                      );
                    } else if (series.type === Const.StackedBarSeries) {
                      let arrayColorHover =
                        series.arrayColorHover || series.arrayColor;
                      let arrayColorLight =
                        series.arrayColorLight || series.arrayColor;
                      let arrayColorHoverLight =
                        series.arrayColorHoverLight || series.arrayColorLight;
                      arrayColorHoverLight = arrayColorHoverLight
                        ? arrayColorHoverLight
                        : arrayColorHover;
                      let arrayColor = isDark
                        ? series.arrayColor
                        : arrayColorLight;
                      arrayColorHover = isDark
                        ? arrayColorHover
                        : arrayColorHoverLight;
                      return (
                        <StackedBarSeries
                          key={'StackedBarSeries' + index2}
                          width={getColumnSizeInBarChart(width)}
                          yAccessor={series.yAccessor}
                          fill={(d, i) => arrayColor[i]}
                          fillHover={(d, i) => arrayColorHover[i]}
                          opacity={series.opacity || Const.serie.opacity}
                          baseAt={(xScale, yScale, d) => yScale(0)}
                          highlightOnHover={
                            series.highlightOnHover ||
                            Const.serie.highlightOnHover
                          }
                          clip={true}
                        />
                      );
                    } else if (series.type === Const.GROUPCHART) {
                      return (
                        <GroupedBarSeries
                          key={'GroupedBarSeries' + index2}
                          width={getColumnSizeInBarChart(
                            width,
                            series.fill.length,
                          )}
                          yAccessor={series.yAccessor}
                          opacity={series.opacity || Const.serie.opacity}
                          baseAt={(xScale, yScale, d) => yScale(0)}
                          clip={true}
                          fill={(d, i) => series.fill[i]}
                          spaceBetweenBar={series.spaceBetweenBar}
                        />
                      );
                    } else if (series.type === Const.LineSeries) {
                      return (
                        <div key={'LineSeries' + index2}>
                          <LineSeries
                            yAccessor={d => d[series.yAccessor]}
                            strokeDasharray={
                              series.strokeDasharray ||
                              Const.serie.strokeDasharray
                            }
                            stroke={
                              isDark
                                ? series.stroke
                                : series.strokeLight || series.stroke
                            }
                            opacity={series.opacity || Const.serie.opacity}
                            strokeWidth={
                              series.strokeWidth || Const.serie.strokeWidth
                            }
                            highlightOnHover={
                              series.highlightOnHover ||
                              Const.serie.highlightOnHover
                            }
                          />
                          <ScatterSeries
                            yAccessor={d => d[series.yAccessor]}
                            marker={getMakerType(series, theme)}
                            highlightOnHover={
                              series.highlightOnHover ||
                              Const.serie.highlightOnHover
                            }
                            markerProps={series.markerProps}
                          />
                        </div>
                      );
                    }
                  })}
                </Chart>
              );
            })}

            {hoverTooltipEle && (
              <HoverTooltip
                bgOpacity={hoverTooltipEle.bgOpacity}
                stroke={
                  isDark
                    ? hoverTooltipEle.fill || Const.hoverTooltip.stroke
                    : hoverTooltipEle.strokeLight ||
                      Const.hoverTooltip.strokeLight
                }
                fill={
                  isDark
                    ? hoverTooltipEle.fill || Const.hoverTooltip.fill
                    : hoverTooltipEle.fillLight || Const.hoverTooltip.fillLight
                }
                opacity={hoverTooltipEle.opacity}
                tooltipContent={tooltipContent(hoverTooltipEle.contents)}
                tooltipCanvas={tooltipCanvas(
                  handleChecked,
                  isSynchronizingTooltip,
                  eventSynchTooltipName,
                )}
                fontSize={Const.SETTINGS.TEXT_SM_SIZE}
              />
            )}
          </ChartCanvas>
        )}
        {isCheck && configChart.listLegend && (
          <MixChartFooter listLegend={configChart.listLegend} theme={theme} />
        )}
      </div>
    );
  }
}

MixChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

MixChart.defaultProps = {
  type: 'svg',
};

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

export default connect(mapStateToProps)(MixChart);
