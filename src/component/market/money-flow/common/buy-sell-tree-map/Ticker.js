import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTickerBgClassname } from '../../../../helpers/ClassName';
import {
  formatChange,
  formatPercent,
  formatTextFloat,
} from '../../../../helpers/Text';
import { REDUCER_NAME } from '../../reducer';

const BLUR_DELAY = 500;

class Ticker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowInfo: false,
      top: 0,
      left: 0,
      triangleClassName: '',
    };
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.tickerInfoRef = React.createRef();
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.div);
  }

  componentDidUpdate(prevProps) {
    const { isRealtimeTicker, realtimeDataTicker } = this.props;

    if (
      isRealtimeTicker &&
      realtimeDataTicker &&
      realtimeDataTicker !== prevProps.realtimeDataTicker
    ) {
      this.nodeRef.current.classList.add('blur');
      this.blurTimeout = setTimeout(() => {
        this.nodeRef.current.classList.remove('blur');
      }, BLUR_DELAY);
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.div);
    clearTimeout(this.blurTimeout);
  }

  isTopRight = (top, left) => {
    const { rootRef } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const {
      width,
      height,
    } = this.tickerInfoRef.current.getBoundingClientRect();
    return top - height < rootRect.top && left + width > rootRect.right;
  };

  isBottomRight = (top, left) => {
    const { rootRef } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const { width } = this.tickerInfoRef.current.getBoundingClientRect();
    return left + width > rootRect.right;
  };

  isTopLeft = (top, left) => {
    const { rootRef } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const { height } = this.tickerInfoRef.current.getBoundingClientRect();
    return top - height < rootRect.top;
  };

  getTriangleClassName = (top, left) => {
    if (this.isTopRight(top, left)) {
      return 'triangle-top-right';
    }

    if (this.isBottomRight(top, left)) {
      return 'triangle-bottom-right';
    }

    if (this.isTopLeft(top, left)) {
      return 'triangle-top-left';
    }

    return 'triangle-bottom-left';
  };

  calcPosition = e => {
    const padding = 8;
    const {
      width,
      height,
    } = this.tickerInfoRef.current.getBoundingClientRect();
    if (this.isTopRight(e.pageY, e.pageX)) {
      return {
        top: e.pageY,
        left: e.pageX - width - padding,
      };
    }

    if (this.isBottomRight(e.pageY, e.pageX)) {
      return {
        top: e.pageY - height - padding,
        left: e.pageX - width,
      };
    }

    if (this.isTopLeft(e.pageY, e.pageX)) {
      return {
        top: e.pageY,
        left: e.pageX + padding,
      };
    }

    return {
      top: e.pageY - height - padding,
      left: e.pageX,
    };
  };

  onMouseMove = e => {
    const { top, left } = this.calcPosition(e);
    this.setState({
      top,
      left,
      isShowInfo: true,
      triangleClassName: this.getTriangleClassName(e.pageY, e.pageX),
    });
  };

  onMouseLeave = () => {
    this.setState({
      isShowInfo: false,
    });
  };

  renderTooltip = () => {
    const { top, isShowInfo, left, triangleClassName } = this.state;
    const { renderTooltip } = this.props;
    const data = this.getData();
    return (
      <div
        ref={this.tickerInfoRef}
        style={{
          top: isShowInfo ? top : '9999px',
          left: isShowInfo ? left : '9999px',
        }}
        className="buy-sell-tree-map-ticker-info"
      >
        <div className="ticker-info-wrapper">
          <div className="name">{data.ticker}</div>
          {renderTooltip &&
            typeof renderTooltip === 'function' &&
            renderTooltip(data)}
          <div className={triangleClassName} />
        </div>
      </div>
    );
  };

  getData = () => {
    const { node, realtimeDataTicker, isRealtimeTicker } = this.props;

    return realtimeDataTicker && isRealtimeTicker
      ? realtimeDataTicker
      : node.data;
  };

  render() {
    const { style } = this.props;
    const data = this.getData();

    return (
      <div
        ref={this.nodeRef}
        style={style}
        className={`node ${getTickerBgClassname({
          matchPrice: data.matchPrice,
          ceilPrice: data.ceilingPrice,
          refPrice: data.referencePrice,
          floorPrice: data.floorPrice,
        })}`}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="ticker">
          <div className="name">{data.ticker}</div>
          <div className="price-change">
            {formatChange(
              formatTextFloat(formatPercent(data.percentPriceChange)),
            )}{' '}
            %
          </div>
        </div>
        {ReactDOM.createPortal(this.renderTooltip(), this.div)}
      </div>
    );
  }
}

Ticker.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  rootRef: PropTypes.object.isRequired,
  valueAttr: PropTypes.string.isRequired,
  renderTooltip: PropTypes.func.isRequired,
  realtimeDataTicker: PropTypes.object,
  isRealtimeTicker: PropTypes.bool.isRequired,
};

const defaultRealtimeDataTicker = null;

Ticker.defaultProps = {
  realtimeDataTicker: defaultRealtimeDataTicker,
};

const mapStateToProps = (state, { node }) => ({
  realtimeDataTicker:
    node && node.data
      ? state[REDUCER_NAME].realtimeData[node.data.organCode]
      : defaultRealtimeDataTicker,
});

export default connect(mapStateToProps)(Ticker);
