import React, { Component } from 'react';
import StockChart from './BarChartTempate';
import { connect } from 'react-redux';

class ChartContent extends Component {
  render() {
    const {
      chartName,
      data,
      widthAlign,
      barWidth,
      marginChartLeft,
      marginChartRight,
      chartHeight,
      rate,
      currentTime,
      isScaleHeight,
      showYear,
      theme,
    } = this.props;

    const SETTINGS_DARK = {
      CURRENT_TIME_BAR_COLOR: '#f1ffe7',
      CURRENT_TIME_BAR_COLOR_HOVER: '#47c3ff',
      BAR_COLOR: '#3581b8',
      BAR_COLOR_HOVER: '#47c3ff',
      XLABEL_HIGHT_LIGHT_COLOR: '#ffffff',
    };

    const SETTINGS_LIGHT = {
      CURRENT_TIME_BAR_COLOR: '#2c73e8',
      CURRENT_TIME_BAR_COLOR_HOVER: '#47c3ff',
      BAR_COLOR: '#2b457d',
      BAR_COLOR_HOVER: '#47c3ff',
      XLABEL_HIGHT_LIGHT_COLOR: '#1f2023',
    };

    const SETTINGS = theme === 'dark' ? SETTINGS_DARK : SETTINGS_LIGHT;

    if (widthAlign > 0) {
      return (
        <StockChart
          chartName={chartName}
          chartWidth={widthAlign}
          data={data}
          fillCondition={data => {
            return data.time === currentTime
              ? SETTINGS.CURRENT_TIME_BAR_COLOR
              : SETTINGS.BAR_COLOR;
          }}
          fillConditionHover={data => {
            return data.time === currentTime
              ? SETTINGS.CURRENT_TIME_BAR_COLOR_HOVER
              : SETTINGS.BAR_COLOR_HOVER;
          }}
          labelX={d => {
            if (data[d].time !== currentTime) {
              return (
                data[d].time_text +
                (chartName === 'trimester' && d === 0 && showYear
                  ? "'" + showYear
                  : '')
              );
            } else {
              return '';
            }
          }}
          labelXHightLight={d => {
            if (data[d].time === currentTime) {
              return (
                data[d].time_text +
                (chartName === 'trimester' && d === 0 && showYear
                  ? "'" + showYear
                  : '')
              );
            } else {
              return '';
            }
          }}
          labelXHightLightColor={SETTINGS.XLABEL_HIGHT_LIGHT_COLOR}
          barKey_xExtents={list =>
            list.map(d => {
              return d.time;
            })
          }
          barKey_xAccessor={d => {
            return d.time;
          }}
          Chart_yExtents={d => [-d.y, d.y]}
          barWidth={barWidth}
          marginLeft={marginChartLeft}
          marginRight={marginChartRight}
          chartHeight={chartHeight}
          barHeight={d => {
            return isScaleHeight ? d.y * rate : d.y;
          }}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(ChartContent);
