import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const values = [100, 80, 60, 40, 20, 0];

class YAxis extends PureComponent {
  render() {
    return (
      <div className="stacked-y-axis">
        {values.map(value => (
          <div key={value} className="stacked-y-axis-item text-right">
            {value}
          </div>
        ))}
      </div>
    );
  }
}

YAxis.propTypes = {};

export default YAxis;
