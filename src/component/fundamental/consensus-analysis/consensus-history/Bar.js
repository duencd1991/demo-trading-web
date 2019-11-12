import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RECOMMENDATIONS } from '../Const';
import BarItem from './BarItem';

const items = [
  {
    key: RECOMMENDATIONS.SELL,
    color: '#ea2e48',
  },
  {
    key: RECOMMENDATIONS.NOCMT,
    color: '#f57404',
  },

  {
    key: RECOMMENDATIONS.HOLD,
    color: '#00de8b',
  },
  {
    key: RECOMMENDATIONS.NEU,
    color: '#fdf0a5',
  },
  {
    key: RECOMMENDATIONS.BUY,
    color: '#009d5b',
  },
];

class Bar extends PureComponent {
  render() {
    const { data, index, width, height } = this.props;

    return (
      <div
        onMouseLeave={this.onMouseLeave}
        className="bar flex-fill position-relative"
      >
        {items.map(item => (
          <BarItem
            height={height}
            width={width}
            key={item.key}
            item={item}
            data={data}
          />
        ))}
        {index % 2 === 0 && (
          <div className="text recommendation-date">{data.date}</div>
        )}
      </div>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Bar;
