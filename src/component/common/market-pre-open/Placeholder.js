import PropTypes from 'prop-types';
import React from 'react';
import CountDown from '../count-down';

const Placeholder = ({
  openTime,
  showChildren,
  secondsToOpenMarket,
  className,
}) => (
  <CountDown
    className={className}
    totalSeconds={secondsToOpenMarket}
    onEnd={showChildren}
    openTime={openTime}
  />
);

Placeholder.propTypes = {
  openTime: PropTypes.object,
  secondsToOpenMarket: PropTypes.number.isRequired,
};

export default Placeholder;
