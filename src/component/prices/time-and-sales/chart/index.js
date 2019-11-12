import React from 'react';
import Chart from './BarChart';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { REDUCER_NAME } from '../reducer';
import Const from '../Const';
import {
  formatPrice,
  formatVolume,
  formatTextFloat,
} from '../../../helpers/Text';
import Loading from './Loading/Loading';
import { withComponentId } from './../../../common/ComponentIdContext';
import { compose } from 'redux';

const MAX_BARS = 15;

class ChartComponent extends React.Component {
  getMaxData(data) {
    const arrValue = [];
    data.map(item => {
      const total =
        item[Const.chartData.buyUpVolume] +
        item[Const.chartData.sellDownVolume] +
        item[Const.chartData.naVolume];
      arrValue.push(total);
    });
    return Math.max(...arrValue);
  }

  getMaxValue = array => {
    const maxValueY = array
      ? Math.max.apply(
          Math,
          array.map(function(item) {
            return item.y;
          }),
        )
      : null;
    const totalX1 = array
      ? array.reduce((item1, item2) => {
          return item1 + item2.x1;
        }, 0)
      : null;
    const totalX2 = array
      ? array.reduce((item1, item2) => {
          return item1 + item2.x2;
        }, 0)
      : null;
    const totalX3 = array
      ? array.reduce((item1, item2) => {
          return item1 + item2.x3;
        }, 0)
      : null;
    const x4 = array[0].x4;

    return {
      title: formatTextFloat(totalX1 + totalX2 + totalX3),
      y: maxValueY,
      x1: totalX1,
      x2: totalX2,
      x3: totalX3,
      x4,
    };
  };

  formatData = originalData => {
    const data = [...originalData];
    const totalItems = data.length;
    let itemPerSlice = null;

    // confirm BA max bars in chart is 15 not depend on total item === 20 or 80

    if (totalItems < 15) return originalData;
    // if (totalItems >= 80) itemPerSlice = 3;
    // if (totalItems >= 20 && totalItems < 80) itemPerSlice = 2;
    itemPerSlice = Math.ceil(totalItems / MAX_BARS);

    const totalSliceTime = Math.ceil(data.length / itemPerSlice);
    // const totalSliceTime = Math.round(data.length / itemPerSlice);
    const sliceIndexArr = [...Array(totalSliceTime)].map((_, index) => {
      const sliceTimeIndex = index + 1;
      const start = itemPerSlice * sliceTimeIndex - itemPerSlice;
      let end = itemPerSlice * sliceTimeIndex;
      if (end > totalItems) end = totalItems;
      return [start, end];
    });

    const formatedData = sliceIndexArr.map(item => {
      return this.getMaxValue(data.slice(...item));
    });

    return formatedData;
  };

  getHeightChart = length => {
    return length * 16 + (length - 1) * 10 + 70;
  };

  render() {
    const {
      width,
      data,
      info: { ReferencePrice },
      isFetching,
      theme,
      isDerivatives,
    } = this.props;
    const maxValue = this.getMaxData(data);
    const cloneData = data.map(item => {
      const price = isDerivatives
        ? item[Const.chartData.price]
        : formatPrice(item[Const.chartData.price]);
      const buyUpVolume = formatVolume(item[Const.chartData.buyUpVolume]);
      const sellDownVolume = formatVolume(item[Const.chartData.sellDownVolume]);
      const naVolume = formatVolume(item[Const.chartData.naVolume]);
      return {
        title: formatTextFloat(buyUpVolume + sellDownVolume + naVolume),
        y: price,
        x1: buyUpVolume === 0 ? null : buyUpVolume,
        x2: sellDownVolume === 0 ? null : sellDownVolume,
        x3: naVolume === 0 ? null : naVolume,
        x4: formatVolume(maxValue / 2.5),
        // x4 for bonus value width bar chart to show full label on the right side of bar equal 1/4 max value
      };
    });

    const sortedData = cloneData.slice().sort((a, b) => a.y - b.y);

    // const bonus = { x1: 0, x2: 0, x3: 0, x4: 0 };
    // if (sortedData.length === 1) sortedData.push(bonus);

    const formatedData = this.formatData(sortedData);

    const labelColor = theme === 'dark' ? '#ffffff' : '#1f2023';

    return (
      <div className="h-100">
        {isFetching && <Loading />}
        {sortedData.length && !isFetching ? (
          <>
            <Chart
              data={formatedData}
              width={width}
              height={this.getHeightChart(formatedData.length)}
              ratio={window.devicePixelRatio}
              middleValue={formatPrice(ReferencePrice)}
              labelColor={labelColor}
              theme={theme}
            />
            <div className="chart-legend">
              <div className="chart-legend__item">
                <div className="square square--green" />
                <div className="title">
                  {I18n.t('timeAndSale.chartLegend.buyUp')}
                </div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--red" />
                <div className="title">
                  {I18n.t('timeAndSale.chartLegend.sellDown')}
                </div>
              </div>
              <div className="chart-legend__item">
                <div className="square square--blue" />
                <div className="title">
                  {I18n.t('timeAndSale.chartLegend.unidentified')}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    i18n: state.i18n,
    theme: state.theme,
    isFetching: state[REDUCER_NAME].listMultiComponent[componentId].isFetching,
    data:
      state[REDUCER_NAME].listMultiComponent[componentId].timeAndSaleData
        .timeAndSales,
    info: state[REDUCER_NAME].listMultiComponent[componentId].topContent,
    isDerivatives:
      state[REDUCER_NAME].listMultiComponent[componentId].condition
        .isDerivatives,
  };
};

ChartComponent.defaultProps = {
  data: [],
  info: {},
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(ChartComponent);
