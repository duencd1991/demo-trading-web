import React from 'react';
import PropTypes from 'prop-types';

const NoDataMiniBarChart = ({ className }) => (
  <div className={`no-data-mini-bar-chart ${className}`}>
    {[...Array(5)].map((_, index) => (
      <div key={index} className="bar" />
    ))}
  </div>
);

NoDataMiniBarChart.propTypes = {
  className: PropTypes.string.isRequired,
};

export default NoDataMiniBarChart;
