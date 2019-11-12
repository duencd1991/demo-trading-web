import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './index.scss';
import { getUnique } from './../../../helpers/Common';

export default function ChartFooter(props) {
  const { list } = props;

  return (
    <div className="chart-footer-swap">
      <div className="text-center mb-10">
        {list.map(({ text, color, type, color2 }, index) => {
          return (
            <Item
              key={getUnique() + index}
              text={text}
              color={color}
              color2={color2}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
}

ChartFooter.propTypes = {
  list: PropTypes.array,
};

ChartFooter.defaultProps = {
  list: [],
};
