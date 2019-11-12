import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

const TIMEOUT = 2000;

class ScrollComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  componentWillUnmount() {
    if (this.timeOutHiddenScroll) {
      clearTimeout(this.timeOutHiddenScroll);
    }
  }

  showScroll = () => {
    if (!this.state.hover) {
      this.setState({ hover: true });
    }
    if (this.timeOutHiddenScroll) {
      clearTimeout(this.timeOutHiddenScroll);
    }
    this.timeOutHiddenScroll = setTimeout(() => {
      if (this.state.hover) {
        this.setState({ hover: false });
      }
    }, TIMEOUT);
  };

  handleMouseEnter = () => {
    this.showScroll();
  };

  handleScroll = e => {
    const { appendHandleScroll } = this.props;

    if (appendHandleScroll) {
      appendHandleScroll(e);
    }

    this.showScroll();
  };

  handleMouseLeave = () => {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  };

  renderTrackHorizontal = ({ style, ...props }) => {
    const { hover } = this.state;

    return (
      <div
        className="track"
        style={{
          ...style,
          width: '100%',
          left: 0,
          bottom: 0,
          opacity: hover ? 1 : 0,
        }}
        {...props}
      />
    );
  };

  renderTrackVertical = ({ style, ...props }) => {
    const { hover } = this.state;
    const { theadHeight } = this.props;

    const paddingTop = theadHeight ? theadHeight : 0;
    const right = theadHeight ? 0 : 1;

    return (
      <div
        className="track"
        style={{
          ...style,
          height: '100%',
          top: 0,
          right,
          paddingTop,
          opacity: hover ? 1 : 0,
        }}
        {...props}
      />
    );
  };

  renderView = ({ style, ...props }) => {
    const { appendStyle } = this.props;

    const position =
      appendStyle && (appendStyle.height === '100%' || appendStyle.maxHeight)
        ? 'relative'
        : 'absolute';

    return (
      <div
        style={{
          ...style,
          position,
        }}
        {...props}
      />
    );
  };

  getClassName = () => {
    const { appendClassName } = this.props;

    return `scrollbars ${appendClassName}`;
  };

  getStyle = () => {
    const { appendStyle } = this.props;

    return { width: '100%', height: 'calc(100% - 6px)', ...appendStyle };
  };

  render() {
    const { scrollRef, appendStyle = { maxHeight: 0 } } = this.props;

    return (
      <Scrollbars
        className={this.getClassName()}
        style={this.getStyle()}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderView={this.renderView}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onScroll={this.handleScroll}
        ref={scrollRef}
        autoHeight={appendStyle.maxHeight > 0}
        autoHeightMax={appendStyle.maxHeight}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

ScrollComponent.propTypes = {
  appendStyle: PropTypes.object,
  appendClassName: PropTypes.string,
};

ScrollComponent.defaultProps = {
  appendStyle: {},
  appendClassName: '',
};

export default ScrollComponent;
