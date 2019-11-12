import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './th-tooltip.scss';

const RIGHT = 'right';
const CENTER = 'center';
const LEFT = 'left';

class ThTooltip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      top: null,
      left: null,
    };
    this.el = document.createElement('div');
    this.el.style.position = 'absolute';

    this.tooltipRef = React.createRef();
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    window.addEventListener('wheel', this.onMouseWheel);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    window.removeEventListener('wheel', this.onMouseWheel);
  }

  onMouseWheel = () => {
    const { isShow } = this.state;
    if (isShow) {
      this.hideTooltip();
    }
  };

  hideTooltip = () => {
    this.setState({
      isShow: false,
    });
  };

  isOuterRight = () => {
    const align = getComputedStyle(this.rootRef.current).textAlign;
    const { left, width, right } = this.rootRef.current.getBoundingClientRect();
    const tableDom = this.rootRef.current.closest('.scrollbars');
    const { right: tableRight } = tableDom.getBoundingClientRect();
    const {
      width: tooltipWidth,
    } = this.tooltipRef.current.getBoundingClientRect();
    if (align === LEFT) {
      return left + tooltipWidth > tableRight;
    }

    if (align === CENTER) {
      return left + width / 2 + tooltipWidth > tableRight;
    }

    return right > tableRight;
  };

  getTheadTextAlign = () => {
    if (!this.rootRef.current) {
      return '';
    }
    if (this.isOuterRight()) {
      return RIGHT;
    }
    return this.rootRef.current
      ? getComputedStyle(this.rootRef.current).textAlign
      : '';
  };

  getTooltipPos = () => {
    const {
      top,
      left,
      width: rootWidth,
    } = this.rootRef.current.getBoundingClientRect();
    const {
      height: tooltipHeight,
      width: tooltipWidth,
    } = this.tooltipRef.current.getBoundingClientRect();
    const align = this.getTheadTextAlign();
    const tooltipTop = top - tooltipHeight - 6;
    if (this.isOuterRight()) {
      const { right: tableRight } = this.rootRef.current
        .closest('.scrollbars')
        .getBoundingClientRect();
      return {
        left: tableRight - tooltipWidth,
        top: tooltipTop,
      };
    }

    if (align === RIGHT) {
      return {
        left: left + rootWidth - tooltipWidth,
        top: tooltipTop,
      };
    }

    if (align === CENTER) {
      return {
        left: left + (rootWidth - tooltipWidth) / 2,
        top: tooltipTop,
      };
    }

    return {
      left: left,
      top: tooltipTop,
    };
  };

  onMouseEnter = () => {
    const { top, left } = this.getTooltipPos();
    this.setState({
      top,
      left,
      isShow: true,
    });
  };

  onMouseLeave = () => {
    this.hideTooltip();
  };

  renderTooltip = () => {
    const { isShow, top, left } = this.state;
    const { tooltip } = this.props;
    return (
      <div
        ref={this.tooltipRef}
        style={{
          top: isShow ? top : 9999,
          left: isShow ? left : 9999,
          position: 'fixed',
        }}
        className="th-tooltip-content"
      >
        <div className={`tooltip-content-inner ${this.getTheadTextAlign()}`}>
          {tooltip}
        </div>
      </div>
    );
  };

  render() {
    const { children } = this.props;
    return (
      <div className="portal-tooltip position-relative">
        <div
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className="portal-tooltip-inner"
          ref={this.rootRef}
        >
          {children}
        </div>

        {ReactDOM.createPortal(this.renderTooltip(), this.el)}
      </div>
    );
  }
}

ThTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default ThTooltip;
