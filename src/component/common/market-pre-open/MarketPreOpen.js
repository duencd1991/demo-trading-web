import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../app/commonReducer';
import Placeholder from './Placeholder';

const MarketPreOpen = props => {
  const { secondsToOpenMarket, children, className } = props;
  if (secondsToOpenMarket === 0) {
    return children;
  }
  return (
    <Placeholder
      className={className}
      secondsToOpenMarket={secondsToOpenMarket}
    />
  );
};

MarketPreOpen.propTypes = {
  children: PropTypes.node.isRequired,
  secondsToOpenMarket: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  secondsToOpenMarket: state[COMMON_REDUCER_NAME].secondsToOpenMarket,
});

export default connect(mapStateToProps)(MarketPreOpen);
