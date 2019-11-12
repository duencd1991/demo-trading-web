import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

class SimpleTooltip extends React.Component {

  hasEnabled = (message) => {
    return message !== '';
  };

  render() {
    const { children, position, message, isLight } = this.props;

    return (
      <Tooltip
        isLight={isLight}
        enabled={this.hasEnabled(message)}
        render={(props) => <div {...props}>{message}</div>}
        position={position}>
        {children}
      </Tooltip>
    );
  }
}

SimpleTooltip.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  position: PropTypes.string.isRequired, // top || left || right || bottom
  children: PropTypes.node.isRequired,
  isLight: PropTypes.bool,
};

SimpleTooltip.defaultType = {
  isLight: false,
};

export default SimpleTooltip;
