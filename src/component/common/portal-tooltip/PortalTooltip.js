import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import './portal-tooltip.scss';

const RIGHT = 'right';
const TOP = 'top';

class PortalTooltip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      top: null,
      left: null,
    };

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.tooltipRef = React.createRef();
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.div);
    window.addEventListener('wheel', this.onMouseWheel);
  }

  componentWillUnmount() {
    document.body.removeChild(this.div);
    window.removeEventListener('wheel', this.onMouseWheel);
  }

  onMouseWheel = () => {
    const { isShow } = this.state;
    if (isShow) {
      this.hideTooltip();
    }
  };

  getTooltipPos = () => {
    const {
      width: tooltipWidth,
      height: tooltipHeight,
    } = this.tooltipRef.current.getBoundingClientRect();
    const {
      width: rootWidth,
      top: rootTop,
      left: rootLeft,
    } = this.rootRef.current.getBoundingClientRect();

    return {
      top: rootTop - tooltipHeight - 6,
      left: rootLeft + (rootWidth - tooltipWidth) / 2,
    };
  };

  onMouseEnter = () => {
    const { top, left } = this.getTooltipPos();

    this.setState({
      left,
      top,
      isShow: true,
    });
  };

  onMouseLeave = () => {
    this.hideTooltip();
  };

  hideTooltip = () => {
    this.setState({
      isShow: false,
    });
  };

  renderTooltip = () => {
    const { top, left, isShow } = this.state;
    const { tooltip } = this.props;
    return (
      <div
        onMouseEnter={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{ top: isShow ? top : '9999px', left: isShow ? left : '9999px' }}
        ref={this.tooltipRef}
        className="portal-tooltip-content"
      >
        <div className="portal-tooltip-content-inner">{tooltip}</div>
      </div>
    );
  };

  render() {
    const { children } = this.props;
    return (
      <div className="portal-tooltip">
        <div
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={this.rootRef}
          className="d-flex"
        >
          {children}
        </div>

        {ReactDOM.createPortal(this.renderTooltip(), this.div)}
      </div>
    );
  }
}

PortalTooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  position: PropTypes.oneOf([RIGHT, TOP]),
};

PortalTooltip.defaultProps = {
  position: TOP,
};

export default PortalTooltip;
