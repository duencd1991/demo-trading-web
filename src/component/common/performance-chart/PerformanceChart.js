import PropTypes from 'prop-types';
import React from 'react';
import { Chart } from 'react-stockcharts';
import ChartCanvas from './../../common/chart/lib/chart-canvas/ChartCanvas';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import {
  AlternatingFillAreaSeries,
  LineSeries,
} from 'react-stockcharts/lib/series';
import { mouseBasedZoomAnchor } from 'react-stockcharts/lib/utils/zoomBehavior';
import { connect } from 'react-redux';
import { THEMES } from '../../../configs/LayoutConfig';

class PerformanceChart extends React.PureComponent {
  render() {
    const {
      dataYesterday,
      dataToday,
      attributeName,
      topLineColor,
      bottomLineColor,
      ratio,
      twoDayWidthEqual,
      width,
      height,
      theme,
      yesterdayLightColor,
      yesterdayDarkColor,
    } = this.props;
    if (
      !(
        dataYesterday &&
        dataYesterday instanceof Array &&
        dataYesterday.length > 0
      )
    ) {
      return null;
    }
    let { dataYesterdayNew, dataTodayNew, rateTodayWidth } = this.resolveData(
      dataYesterday,
      dataToday,
      attributeName,
    );
    const { max, min } = this.getMinMaxData(
      [...dataYesterdayNew, ...dataTodayNew],
      'y',
    );

    let { widthYesterday, widthToday, widthTodayWrap } = this.getWidthCharts(
      dataYesterdayNew,
      dataTodayNew,
      width,
      twoDayWidthEqual,
      rateTodayWidth,
    );

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date,
    );
    const {
      data: dataYesterdayFinal,
      xScale: xScaleYesterday,
      xAccessor: xAccessorYesterday,
      displayXAccessor: displayXAccessorYesterday,
    } = xScaleProvider(dataYesterdayNew);
    const {
      data: dataTodayFinal,
      xScale: xScaleToday,
      xAccessor: xAccessorToday,
      displayXAccessor: displayXAccessorToday,
    } = xScaleProvider(dataTodayNew);

    const padding = ((max - min) * 5) / 100;
    let SETTINGS = {
      yExtents: [min - padding, max + padding],
      yAccessor: d => d.y,
    };

    const yesterdayColor =
      theme === THEMES.DARK ? yesterdayDarkColor : yesterdayLightColor;

    return (
      <div style={{ whiteSpace: 'nowrap', height: 15 }}>
        <div style={{ display: 'inline-block' }}>
          <ChartCanvas
            height={height}
            width={widthYesterday}
            ratio={ratio}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            seriesName="yesterday"
            data={dataYesterdayFinal}
            xAccessor={xAccessorYesterday}
            displayXAccessor={displayXAccessorYesterday}
            xScale={xScaleYesterday}
            pointsPerPxThreshold={10}
            minPointsPerPxThreshold={10}
            maintainPointsPerPixelOnResize={false} //necessary for resize chart
            zoomAnchor={mouseBasedZoomAnchor} //zoom direction
            panEvent={false}
            zoomEvent={false}
            clamp={false}
            xExtents={[0, dataYesterdayFinal.length - 1]}
          >
            <Chart
              id={1}
              height={height - 1} //minus 1: avoid error hidden line part
              yExtents={SETTINGS.yExtents}
              padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <LineSeries
                baseAt={0}
                yAccessor={SETTINGS.yAccessor}
                stroke={yesterdayColor}
              />
            </Chart>
          </ChartCanvas>
        </div>

        {dataToday.length >= 1 && (
          <div style={{ display: 'inline-block' }}>
            <div style={{ width: widthTodayWrap }}>
              <ChartCanvas
                width={Math.ceil(widthToday)}
                height={height}
                data={dataTodayFinal}
                xExtents={SETTINGS.xExtents}
                xAccessor={xAccessorToday}
                displayXAccessor={displayXAccessorToday}
                ratio={ratio}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                seriesName="today"
                xScale={xScaleToday}
                padding={0}
                pointsPerPxThreshold={10}
                minPointsPerPxThreshold={10}
                maintainPointsPerPixelOnResize={false}
                panEvent={false}
                zoomEvent={false}
                clamp={false}
              >
                <Chart
                  id={2}
                  height={height} //minus 1: avoid error hidden line part
                  yExtents={SETTINGS.yExtents}
                  padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <AlternatingFillAreaSeries
                    baseAt={0}
                    yAccessor={SETTINGS.yAccessor}
                    fillOpacity={{
                      top: 0,
                      bottom: 0,
                    }}
                    strokeWidth={{
                      top: 1,
                      bottom: 1,
                    }}
                    stroke={{
                      top: topLineColor,
                      bottom: bottomLineColor,
                    }}
                  />
                </Chart>
              </ChartCanvas>
            </div>
          </div>
        )}
      </div>
    );
  }

  resolveData(dataYesterday, dataToday, ATTRIBUTE_NAME) {
    let offset = dataYesterday[dataYesterday.length - 1][ATTRIBUTE_NAME];

    dataYesterday.map(item => {
      item.date = new Date(item.tradingDate);
      item.y = item[ATTRIBUTE_NAME] - offset;
    });
    dataToday.map(item => {
      item.date = new Date(item.tradingDate);
      item.y = item[ATTRIBUTE_NAME] - offset;
    });

    let { data: dataYesterdayNew } = this.addTimeData(dataYesterday, true);
    let { data: dataTodayNew, rateTodayWidth } = this.addTimeData(
      dataToday,
      false,
      dataYesterday,
    );

    return { dataYesterdayNew, dataTodayNew, rateTodayWidth };
  }

  addTimeData(data, isYesterday, dataYesterday) {
    let size = data.length;
    if (size > 0) {
      let beginObj = {};
      beginObj.date = data[0].date;
      beginObj.y = data[0].y;
      let endObj = {};
      endObj.date = data[size - 1].date;
      endObj.y = data[size - 1].y;
      beginObj.date = new Date(
        beginObj.date.getFullYear(),
        beginObj.date.getMonth(),
        beginObj.date.getDate(),
        9,
        0,
        0,
      );
      endObj.date = new Date(
        beginObj.date.getFullYear(),
        beginObj.date.getMonth(),
        beginObj.date.getDate(),
        15,
        0,
        0,
      );

      if (isYesterday) {
        return {
          data: [beginObj, ...data, endObj],
        };
      } else {
        let distance = endObj.date.getTime() - beginObj.date.getTime();
        let distanceActually =
          data[data.length - 1].date.getTime() - beginObj.date.getTime();
        let rateTodayWidth = distanceActually / distance;

        return {
          data: [dataYesterday[dataYesterday.length - 1], beginObj, ...data],
          rateTodayWidth,
        };
      }
    }
  }

  getWidthCharts(
    yedataYesterdayTmp,
    yesdataTodayTmp,
    width,
    twoDayWidthEqual,
    rateTodayWidth,
  ) {
    let widthYesterday, widthToday, widthTodayWrap;

    if (twoDayWidthEqual) {
      widthYesterday = width / 2;
      widthTodayWrap = width - widthYesterday;

      widthToday = widthTodayWrap * rateTodayWidth;
    } else {
      let rate =
        yedataYesterdayTmp.length /
        (yedataYesterdayTmp.length + yesdataTodayTmp.length);

      widthYesterday = width * rate;
      widthToday = width - widthYesterday;
      widthTodayWrap = widthToday;
    }

    return { widthYesterday, widthToday, widthTodayWrap };
  }

  getMinMaxData(array, valueAttributeName) {
    if (array.length === 0) {
      return { max: 0, min: 0 };
    }
    let max = array[0][valueAttributeName];
    let min = array[0][valueAttributeName];
    array.map(item => {
      let value = item[valueAttributeName];
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });

    return { max, min };
  }
}

PerformanceChart.propTypes = {
  dataYesterday: PropTypes.array,
  dataToday: PropTypes.array,
  topLineColor: PropTypes.string,
  bottomLineColor: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number,
  attributeName: PropTypes.string,
  twoDayWidthEqual: PropTypes.bool,
  yesterdayLightColor: PropTypes.string,
  yesterdayDarkColor: PropTypes.string,
};

PerformanceChart.defaultProps = {
  dataYesterday: [],
  dataToday: [],
  ratio: window.devicePixelRatio,
  topLineColor: 'green',
  bottomLineColor: 'red',
  twoDayWidthEqual: true,
  attributeName: 'matchPrice',
  yesterdayLightColor: '#969696',
  yesterdayDarkColor: '#d2d2d2',
};

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(PerformanceChart);
