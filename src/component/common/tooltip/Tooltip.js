import React from 'react';
import PropTypes from 'prop-types';
import './tooltip.scss';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      // isShow: true,
    };
  }

  show = () => {
    this.setState({ isShow: true });
  };

  hide = () => {
    this.setState({ isShow: false });
  };

  handleMouseEnter = () => {
    if (!this.state.isShow) {
      this.show();
    }
  };

  handleMouseLeave = () => {
    if (this.state.isShow) {
      this.hide();
    }
  };

  render() {
    const { isShow } = this.state;
    const { render, position, enabled, isLight } = this.props;

    return (
      <span
        className={isLight ? `tooltip-light-wrap` : `tooltip-wrap`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {enabled && isShow && (
          <div className={`tooltip-content tooltip-${position}`}>
            {render({ className: 'tooltip-message ' })}
          </div>
        )}
        {this.props.children}
      </span>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  isLight: PropTypes.bool,
};

Tooltip.defaultProps = {
  isLight: false,
};

export default Tooltip;
