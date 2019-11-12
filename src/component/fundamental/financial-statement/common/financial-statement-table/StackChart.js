import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';
import StackChartItem from './StackChartItem';

const formatNumber = num => {
  if (!num || isNaN(num)) {
    return 0;
  }

  return num;
};

const getTotal = (list, data) => {
  return list.reduce((total, item) => total + formatNumber(data[item.key]), 0);
};

const memoizedTotal = memoize(getTotal);

class StackChart extends React.PureComponent {
  render() {
    const { data, titles } = this.props;
    const leftTitles = titles.concat().splice(0, 4);
    const rightTitles = titles.concat().splice(4, 8);

    return (
      <div className="stack-chart h-100 d-flex justify-content-end">
        <div className="column h-100 d-flex flex-column">
          {leftTitles.map((item, index) => (
            <StackChartItem
              color={item.color}
              total={memoizedTotal(leftTitles, data)}
              data={data}
              item={item}
              key={index}
            />
          ))}
        </div>

        <div className="column h-100 d-flex flex-column">
          {rightTitles.map((item, index) => (
            <StackChartItem
              color={item.color}
              total={memoizedTotal(rightTitles, data)}
              data={data}
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

StackChart.propTypes = {
  data: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
};

export default StackChart;
