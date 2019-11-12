import React from 'react';
import PropTypes from 'prop-types';

class OHLInfo extends React.Component {
  renderItem = (label, className, value, key) => {
    return (
      <span key={key}>
        {label}:&nbsp;
        <small className={className}>{value}</small>
      </span>
    );
  };

  render() {
    const { list } = this.props;

    return (
      <div className="item-second mt-1">
        {list.map(({ label, className, value }, index) => {
          return this.renderItem(label, className, value, index);
        })}
      </div>
    );
  }
}

OHLInfo.propTypes = {
  list: PropTypes.array,
};

OHLInfo.defaultProps = {
  list: [],
};

export default OHLInfo;
