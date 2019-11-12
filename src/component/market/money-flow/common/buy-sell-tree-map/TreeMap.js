import React, { PureComponent } from 'react';
import { treemap, hierarchy } from 'd3-hierarchy';
import { Translate } from 'react-redux-i18n';
import memoize from 'fast-memoize';
import PropTypes from 'prop-types';
import SizeTracker from '../../../../common/size-tracker/SizeTracker';
import { fontSizeFitWidth } from '../../../../helpers/Common';
import { formatTextFloat } from '../../../../helpers/Text';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './Const';
import Ticker from './Ticker';

const memoizedCalcFontSize = memoize(fontSizeFitWidth);

class TreeMap extends PureComponent {
  constructor(props) {
    super(props);
    this.treeMapRef = React.createRef();
  }

  formatData = data => {
    const { title } = this.props;

    return {
      name: title,
      children: data,
    };
  };

  getRoot = (width, height) => {
    const { data, valueAttr } = this.props;
    const treeMapData = this.formatData(data);
    const root = hierarchy(treeMapData)
      .sum(d => d[valueAttr])
      .sort((a, b) => b.data[valueAttr] - a.data[valueAttr]);
    treemap()
      .size([width, height])
      .paddingTop(2)
      .paddingInner(2)(root);

    return root;
  };

  getNodeStyle = node => {
    const fontSize = memoizedCalcFontSize({
      width: node.x1 - node.x0,
      height: node.y1 - node.y0,
      mainText: node.data.ticker,
      subText: `${formatTextFloat(node.data.percentPriceChange)} %`,
      max: MAX_FONT_SIZE,
      min: MIN_FONT_SIZE,
    });

    return {
      width: node.x1 - node.x0,
      height: node.y1 - node.y0,
      left: node.x0,
      top: node.y0,
      fontSize: `${fontSize}px`,
    };
  };

  isNoData = () => {
    const { data, valueAttr } = this.props;
    const isAllEmpty = data.every(item => item[valueAttr] === 0);

    return !!(!data.length || isAllEmpty);
  };

  renderTreeMap = (width, height) => {
    const { renderTooltip, valueAttr, isRealtimeTicker } = this.props;
    if (this.isNoData()) {
      return (
        <div className="no-data">
          <Translate value="moneyFlowCommon.noData" />
        </div>
      );
    }
    const root = this.getRoot(width, height);
    return root
      .leaves()
      .map((node, index) => (
        <Ticker
          isRealtimeTicker={isRealtimeTicker}
          renderTooltip={renderTooltip}
          valueAttr={valueAttr}
          rootRef={this.treeMapRef}
          style={this.getNodeStyle(node)}
          key={index}
          node={node}
        />
      ));
  };

  render() {
    const { title, noDataTitleKey } = this.props;

    return (
      <div className="money-flow-tree-map d-flex flex-column flex-fill">
        <div className="title">
          {this.isNoData() ? <Translate value={noDataTitleKey} /> : title}
        </div>
        <SizeTracker className="map flex-fill position-relative">
          {(width, height) => (
            <div
              ref={this.treeMapRef}
              className="map flex-fill position-relative"
            >
              {width && height && this.renderTreeMap(width, height)}
            </div>
          )}
        </SizeTracker>
      </div>
    );
  }
}

TreeMap.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.object.isRequired,
  valueAttr: PropTypes.string.isRequired,
  height: PropTypes.number,
  noDataTitleKey: PropTypes.string.isRequired,
  renderTooltip: PropTypes.func.isRequired,
  isRealtimeTicker: PropTypes.bool.isRequired,
};

TreeMap.defaultProps = {
  height: null,
};

export default TreeMap;
