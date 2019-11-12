import React from 'react';
import memoize from 'fast-memoize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTickerBgClassname } from '../../../helpers/ClassName';
import { fontSizeFitWidth } from '../../../helpers/Common';
import {
  formatChange,
  formatPercent,
  formatTextFloat,
} from '../../../helpers/Text';
import { REDUCER_NAME } from '../reducer';
import { MIN_FONT_SIZE } from './Const';

const memoizedCalcFontSize = memoize(fontSizeFitWidth);
const BLINK_TIMEOUT = 500;

class Ticker extends React.PureComponent {
  nodeRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const { tickerFromTopTen, node } = this.props;
    const isPriceChange =
      tickerFromTopTen &&
      prevProps.tickerFromTopTen &&
      tickerFromTopTen.percentPriceChange !==
        prevProps.tickerFromTopTen.percentPriceChange;
    const isSameCode =
      node.data.organCode &&
      node.data.organCode === prevProps.node.data.organCode;
    if (isSameCode && isPriceChange) {
      this.nodeRef.current.classList.add('blink');
      this.blinkTimeout = setTimeout(() => {
        this.nodeRef.current.classList.remove('blink');
      }, BLINK_TIMEOUT);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.blinkTimeout);
  }

  getTickerName = data => data.name;

  getPercentChange = () => {
    const { tickerFromTopTen } = this.props;
    if (!tickerFromTopTen) {
      return '';
    }

    return `${formatChange(
      formatTextFloat(formatPercent(tickerFromTopTen.percentPriceChange)),
    )} %`;
  };

  getClassName = () => {
    const { node, tickerFromTopTen, sectorClassName } = this.props;
    if (!node.data.organCode) {
      return sectorClassName;
    }
    if (tickerFromTopTen) {
      return getTickerBgClassname({
        matchPrice: tickerFromTopTen.matchPrice,
        ceilPrice: tickerFromTopTen.ceilingPrice,
        floorPrice: tickerFromTopTen.floorPrice,
        refPrice: tickerFromTopTen.referencePrice,
      });
    }

    return getTickerBgClassname(node.data);
  };

  render() {
    const { node, onMouseMove } = this.props;
    const nodeWidth = node.x1 - node.x0;
    const nodeHeight = node.y1 - node.y0;
    const tickerName = this.getTickerName(node.data);

    const fontSize = memoizedCalcFontSize({
      width: nodeWidth,
      height: nodeHeight,
      max: 32,
      min: 5,
      mainText: tickerName,
      subText: `${formatTextFloat(node.data.rate)} %`,
    });
    const percentChange = this.getPercentChange();
    return (
      <div
        ref={this.nodeRef}
        onMouseMove={e => onMouseMove(e, node.data.organCode)}
        style={{
          left: `${node.x0}px`,
          top: `${node.y0}px`,
          width: `${nodeWidth}px`,
          height: `${nodeHeight}px`,
          fontSize: fontSize,
        }}
        className={`node ${this.getClassName()}`}
      >
        {fontSize >= MIN_FONT_SIZE && (
          <div className="text-center ticker">
            <div>{tickerName}</div>
            <div className="ticker-rate">
              {node.data.organCode && percentChange}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Ticker.propTypes = {
  node: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  tickerFromTopTen: PropTypes.object,
  onMouseMove: PropTypes.func.isRequired,
  sectorClassName: PropTypes.string,
};

Ticker.defaultProps = {
  tickerFromTopTen: null,
  sectorClassName: '',
};

const mapStateToProps = (state, { node }) => ({
  locale: state.i18n.locale,
  tickerFromTopTen: state[REDUCER_NAME].topTen[node.data.organCode],
});

export default connect(mapStateToProps)(Ticker);
