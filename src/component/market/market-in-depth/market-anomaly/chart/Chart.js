import React, { Component } from 'react';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

import BarChartWrap from './BarChartWrap';
import BarChartInfo from './BarChartInfo';

import { fetchData, fetchListDataTable, REDUCER_NAME } from '../reducer';
import Const from '../Const';

const I18N_NAME = 'marketInDepthAnomaly.';

class Chart extends Component {
  DAYS = [
    I18n.t(`${I18N_NAME}monday`),
    I18n.t(`${I18N_NAME}tuesday`),
    I18n.t(`${I18N_NAME}wednesday`),
    I18n.t(`${I18N_NAME}thursday`),
    I18n.t(`${I18N_NAME}friday`),
  ];

  MONTHS = [
    I18n.t(`${I18N_NAME}january`),
    I18n.t(`${I18N_NAME}february`),
    I18n.t(`${I18N_NAME}march`),
    I18n.t(`${I18N_NAME}april`),
    I18n.t(`${I18N_NAME}may`),
    I18n.t(`${I18N_NAME}june`),
    I18n.t(`${I18N_NAME}july`),
    I18n.t(`${I18N_NAME}august`),
    I18n.t(`${I18N_NAME}september`),
    I18n.t(`${I18N_NAME}october`),
    I18n.t(`${I18N_NAME}november`),
    I18n.t(`${I18N_NAME}december`),
  ];

  TRIMESTER = [
    I18n.t(`${I18N_NAME}q1`),
    I18n.t(`${I18N_NAME}q2`),
    I18n.t(`${I18N_NAME}q3`),
    I18n.t(`${I18N_NAME}q4`),
  ];

  constructor(props) {
    super(props);
    this.CHART_HEIGHT = 400;

    this.state = {
      widthAlignWeek: -1,
      widthAlignMonth: -1,
      widthAlignTrimester: -1,
      barWidth: 1,

      marginWeekLeft: 0,
      marginWeekRight: 0,
      marginMonthLeft: 0,
      marginMonthRight: 0,
      marginTrimesterLeft: 0,
      marginTrimesterRight: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchListDataTable());

    dispatch(fetchData());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.component.width !== nextProps.component.width ||
      this.props.averageData !== nextProps.averageData
    ) {
      // _.debounce(() => {
      if (this.divElement != null) {
        let lackWidthDontKnowReason = 5;
        let totalWidth = this.divElement.clientWidth - lackWidthDontKnowReason;

        // * return [{
        //   *  widthTotal,
        //   *  widthMarginLeft,
        //   *  widthMarginRight,
        //   *  widthBar,
        //   *  widthPaddingBar,
        //   * }]
        let charts = this.getResponsiveStyleGeneral(
          Const.anomalyChart.CHART_CONFIG,
          Const.anomalyChart.MARGINS,
          totalWidth,
          Const.anomalyChart.MIN_BAR_WIDTH,
        );

        this.setState({
          widthAlignWeek:
            charts[Const.anomalyChart.CHART_TYPE.WEEK.index].widthTotal,
          widthAlignMonth:
            charts[Const.anomalyChart.CHART_TYPE.MONTH.index].widthTotal,
          widthAlignTrimester:
            charts[Const.anomalyChart.CHART_TYPE.TRIMESTER.index].widthTotal,

          barWidth: charts[Const.anomalyChart.CHART_TYPE.WEEK.index].widthBar,

          marginWeekLeft:
            charts[Const.anomalyChart.CHART_TYPE.WEEK.index].widthMarginLeft,
          marginWeekRight:
            charts[Const.anomalyChart.CHART_TYPE.WEEK.index].widthMarginRight,
          marginMonthLeft:
            charts[Const.anomalyChart.CHART_TYPE.MONTH.index].widthMarginLeft,
          marginMonthRight:
            charts[Const.anomalyChart.CHART_TYPE.MONTH.index].widthMarginRight,
          marginTrimesterLeft:
            charts[Const.anomalyChart.CHART_TYPE.TRIMESTER.index]
              .widthMarginLeft,
          marginTrimesterRight:
            charts[Const.anomalyChart.CHART_TYPE.TRIMESTER.index]
              .widthMarginRight,

          columnMarketAnomalyIsCheck: this.props.columnMarketAnomalyIsCheck,
        });
      }
      // }, render.delay)
    }
  }

  /**
   * return [{
   *  widthTotal,
   *  widthMarginLeft,
   *  widthMarginRight,
   *  widthBar,
   *  widthPaddingBar,
   * }]
   * @param {*} charts
   * @param {*} margins
   * @param {*} totalWidth
   * @param {*} MIN_BAR_WIDTH
   * @param {*} MAX_BAR_WIDTH
   */
  getResponsiveStyleGeneral(charts, margins, totalWidth, MIN_BAR_WIDTH) {
    let total2 = 0;
    let totalMargin = 0;

    //set property
    charts.forEach(item => {
      item.paddingBarNumber = item.barNumber + 1;
      item.totalPaddingBar = item.paddingBar * item.paddingBarNumber;

      item.marginLeft = margins.marginInner;
      item.marginRight = margins.marginInner;
    });
    charts[0].marginLeft = margins.marginOuter;
    charts[charts.length - 1].marginRight = margins.marginOuter;

    charts.forEach(item => {
      totalMargin += item.marginLeft + item.marginRight;

      item.totalMargin = item.marginLeft + item.marginRight;
      item.totalBar = item.bar * item.barNumber;
      item.totalChart = item.totalPaddingBar + item.totalBar;
      item.total = item.totalChart + item.totalMargin;

      total2 += item.total;
      totalMargin += item.marginLeft + item.marginRight;
    });

    let unit = totalWidth / total2;

    let bar = Math.floor(totalWidth / total2);
    if (bar < MIN_BAR_WIDTH) {
      //get rows that contain charts and caculate chart width
      var chartTotal = [];
      var chartRows = [];
      var widthRun = 0;

      // charts.forEach(item => {
      for (var i = 0; i < charts.length; i++) {
        let item = charts[i];

        item.widthBar = MIN_BAR_WIDTH;
        let unitTmp = item.widthBar / item.bar;
        //item.widthTotalChart = Math.floor(unitTmp * item.totalChart);
        item.widthTotal = Math.floor(unitTmp * item.total);

        widthRun += item.widthTotal;
        if (widthRun <= totalWidth) {
          chartRows.push(item);
        } else {
          chartRows.length > 0 && chartTotal.push(chartRows);
          chartRows = [];
          chartRows.push(item);
          widthRun = item.widthTotal;
        }
      }
      if (chartRows.length > 0) {
        chartTotal.push(chartRows);
      }

      for (let i = 0; i < chartTotal.length; i++) {
        //totalWidth - total of widthTotalChart
        let row = chartTotal[i];

        let widthChartInRow = 0;
        let marginTotal = 0;

        row[0].marginLeft = margins.marginOuter;
        row[row.length - 1].marginRight = margins.marginOuter;
        row.forEach(item => {
          let unitTmp = item.widthBar / item.bar;

          item.widthBarTotal = item.widthBar * item.barNumber;

          item.widthPaddingBar = Math.floor(unitTmp * item.paddingBar);
          item.widthPaddingBarTotal =
            item.widthPaddingBar * item.paddingBarNumber;

          item.widthChartTotal = item.widthBarTotal + item.widthPaddingBarTotal;

          widthChartInRow += item.widthChartTotal;
          marginTotal += item.marginLeft + item.marginRight;
        });

        //set margin
        let unitMargin = (totalWidth - widthChartInRow) / marginTotal;
        //console.log('totalWidth: ', totalWidth, ', widthChartInRow: ', widthChartInRow,', chartMarginTotal[i]: ', chartMarginTotal[i], ', unitMargin: ', unitMargin)
        row.forEach(item => {
          item.widthMarginLeft = Math.floor(unitMargin * item.marginLeft);
          item.widthMarginRight = Math.floor(unitMargin * item.marginRight);
          if (item.widthMarginLeft < 0) {
            item.widthMarginLeft = 0;
          }
          if (item.widthMarginRight < 0) {
            item.widthMarginLeft = 0;
          }

          item.widthTotal =
            item.widthChartTotal + item.widthMarginLeft + item.widthMarginRight;
        });
      }

      //set widths to charts
      let index = 0;
      chartTotal.forEach(row => {
        row.forEach(chart => {
          charts[index].widthBar = chart.widthBar;
          charts[index].widthBarTotal = chart.widthBarTotal;
          charts[index].widthPaddingBar = chart.widthPaddingBar;
          charts[index].widthChartTotal = chart.widthChartTotal;
          charts[index].widthMarginLeft = chart.widthMarginLeft;
          charts[index].widthMarginRight = chart.widthMarginRight;

          index++;
        });
      });
    } else {
      charts.forEach(item => {
        item.widthBar = Math.floor(unit * item.bar);
        item.widthBarTotal = item.widthBar * item.barNumber;

        item.widthPaddingBar = Math.floor(unit * item.paddingBar);
        item.widthPaddingBarTotal =
          item.widthPaddingBar * item.paddingBarNumber;

        item.widthTotal = Math.floor(unit * item.total);
        item.widthChartTotal = item.widthBarTotal + item.widthPaddingBarTotal;
        item.widthMarginTotal = item.widthTotal - item.widthChartTotal;

        item.widthMarginLeft = Math.floor(unit * item.marginLeft);
        item.widthMarginRight = item.widthMarginTotal - item.widthMarginLeft;
      });
    }
    return charts;
  }

  findMax(array) {
    let max = array[0].y;

    array.forEach(item => {
      let value = Math.abs(item.y);
      if (value > max) {
        max = value;
      }
    });

    return max;
  }

  findMaxInArray(...arr) {
    let max = arr[0];
    arr.forEach(a => {
      if (a > max) {
        max = a;
      }
    });
    return max;
  }

  isWeekend(day) {
    return day >= this.DAYS.length;
  }

  getPositiveOffsetOrZero = (a, b) => {
    return a > b ? a - b : 0;
  };

  getMarginLeftRight(a, b) {
    return {
      marginLeft: this.getPositiveOffsetOrZero(a, b),
      marginRight: this.getPositiveOffsetOrZero(b, a),
    };
  }

  render() {
    let chartHeight = this.CHART_HEIGHT;

    const { averageData } = this.props;
    if (averageData == null) {
      return null;
    }

    //get date
    const { day, month, trimester, year } = this.getCurrentTimeIndex();

    let dataWeek = Const.dataWeek.map(item => {
      item.y = averageData[item.key];
      return item;
    });
    let dataMonth = Const.dataMonth.map(item => {
      item.y = averageData[item.key];
      return item;
    });
    let dataTrimester = Const.dataTrimester.map(item => {
      item.y = averageData[item.key];
      return item;
    });

    let valueMax = {
      week: this.findMax(dataWeek),
      month: this.findMax(dataMonth),
      trimester: this.findMax(dataTrimester),
    };
    let maxHeightValue = this.findMaxInArray(
      valueMax.week,
      valueMax.month,
      valueMax.trimester,
    );

    //get margin title
    let weekTitle = this.getMarginLeftRight(
      this.state.marginWeekLeft,
      this.state.marginWeekRight,
    );
    let monthTitle = this.getMarginLeftRight(
      this.state.marginMonthLeft,
      this.state.marginMonthRight,
    );
    let trimesterTitle = this.getMarginLeftRight(
      this.state.marginTrimesterLeft,
      this.state.marginTrimesterRight,
    );

    return (
      <div className="chart_wrap stock-chart">
        <div className="chart_wrap__title">
          {I18n.t(`${I18N_NAME}averageReturn`)}
        </div>
        <div ref={divElement => (this.divElement = divElement)}>
          <div className="chart_item">
            <div
              style={{
                marginLeft: weekTitle.marginLeft,
                marginRight: weekTitle.marginRight,
              }}
            >
              <BarChartInfo
                title={I18n.t(`${I18N_NAME}daily`)}
                currentTime={
                  this.isWeekend(day) ? this.DAYS[4] : this.DAYS[day]
                }
                value={this.isWeekend(day) ? dataWeek[4].y : dataWeek[day].y}
              />
            </div>

            <BarChartWrap
              chartName="week"
              data={dataWeek}
              widthAlign={this.state.widthAlignWeek}
              barWidth={this.state.barWidth}
              marginChartLeft={this.state.marginWeekLeft}
              marginChartRight={this.state.marginWeekRight}
              chartHeight={chartHeight}
              rate={valueMax.week / maxHeightValue}
              isScaleHeight={false}
              currentTime={this.isWeekend(day) ? this.DAYS.length - 1 : day}
            />
          </div>

          <div className="chart_item">
            <div
              style={{
                marginLeft: monthTitle.marginLeft,
                marginRight: monthTitle.marginRight,
              }}
            >
              <BarChartInfo
                title={I18n.t(`${I18N_NAME}monthly`)}
                currentTime={this.MONTHS[month]}
                value={dataMonth[month].y}
              />
            </div>

            <BarChartWrap
              chartName="month"
              data={dataMonth}
              widthAlign={this.state.widthAlignMonth}
              barWidth={this.state.barWidth}
              marginChartLeft={this.state.marginMonthLeft}
              marginChartRight={this.state.marginMonthRight}
              chartHeight={chartHeight}
              rate={valueMax.month / maxHeightValue}
              currentTime={month}
              isScaleHeight={false}
            />
          </div>

          <div className="chart_item">
            <div
              style={{
                marginLeft: trimesterTitle.marginLeft,
                marginRight: trimesterTitle.marginRight,
              }}
            >
              <BarChartInfo
                title={I18n.t(`${I18N_NAME}quarterly`)}
                currentTime={this.TRIMESTER[trimester]}
                showYear={year}
                value={dataTrimester[trimester].y}
              />
            </div>

            <BarChartWrap
              chartName="trimester"
              data={dataTrimester}
              widthAlign={this.state.widthAlignTrimester}
              barWidth={this.state.barWidth}
              marginChartLeft={this.state.marginTrimesterLeft}
              marginChartRight={this.state.marginTrimesterRight}
              chartHeight={chartHeight}
              rate={valueMax.trimester / maxHeightValue}
              currentTime={trimester}
              isScaleHeight={false}
              showYear={year}
            />
          </div>
        </div>
      </div>
    );
  }

  getCurrentTimeIndex = () => {
    let date = new Date();
    let day = date.getDay() - 1;
    if (day === -1) {
      day = 4;
    }
    let month = date.getMonth();
    let trimester;

    let year = moment().format('YY');

    switch (month) {
      case 0:
      case 1:
      case 2:
        trimester = 0;
        break;
      case 3:
      case 4:
      case 5:
        trimester = 1;
        break;
      case 6:
      case 7:
      case 8:
        trimester = 2;
        break;
      case 9:
      case 10:
      case 11:
        trimester = 3;
        break;
      default:
        trimester = -1;
    }
    return { day, month, trimester, year };
  };
}

const mapStateToProps = state => {
  return {
    averageData: state[REDUCER_NAME].averageData,
    component: state[REDUCER_NAME].component,
  };
};

export default connect(mapStateToProps)(Chart);
