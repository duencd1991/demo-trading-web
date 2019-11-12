import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { treemap, hierarchy } from 'd3-hierarchy';
import memoize from 'fast-memoize';
import './treemap.scss';
import Loading from '../../../common/loading/Loading';
import { fontSizeFitWidth } from '../../../helpers/Common';
import { formatTextFloat } from '../../../helpers/Text';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './Const';
import { getBgClassName } from '../../../helpers/ClassName';
import Sector from './Sector';
import { Provider } from './refContext';

const memoizedCalcFontSize = memoize(fontSizeFitWidth);

class TreeMap extends PureComponent {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      hideTickers: {},
    };
  }

  getStyle = node => {
    const width = node.x1 - node.x0;
    const height = node.y1 - node.y0;
    return {
      left: `${node.x0}px`,
      top: `${node.y0}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  getRoot = () => {
    const { width, height, data } = this.props;
    const root = hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    treemap()
      .size([width, height])
      .paddingInner(2)(root);

    return root;
  };

  toggleHideTicker = code => {
    const { hideTickers } = this.state;
    const map = {
      [undefined]: true,
      [true]: false,
      [false]: true,
    };

    this.setState({
      hideTickers: {
        ...hideTickers,
        [code]: map[hideTickers[code]],
      },
    });
  };

  isHideTicker = code => {
    const { hideTickers } = this.state;

    return !!hideTickers[code];
  };

  render() {
    const { width, height, isLoading } = this.props;
    const root = this.getRoot();

    return (
      <Provider value={this.rootRef}>
        <div
          ref={this.rootRef}
          style={{ width, height }}
          className={`treemap ${isLoading ? 'treemap-blur' : ''}`}
        >
          {isLoading && <Loading />}
          {root.leaves().map((node, index) => {
            const width = node.x1 - node.x0;
            const height = node.y1 - node.y0;
            const name = node.data.name ? node.data.name.toUpperCase() : '';
            const fontSize = memoizedCalcFontSize({
              width,
              height,
              max: MAX_FONT_SIZE,
              min: MIN_FONT_SIZE,
              mainText: name,
              subText: formatTextFloat(node.data.rate),
            });
            const className = getBgClassName(node.data.rate);
            return (
              <div
                key={index}
                style={this.getStyle(node)}
                className={`node ${className}`}
              >
                <Sector
                  sectorClassName={className}
                  width={width}
                  height={height}
                  data={node.data}
                  fontSize={fontSize}
                  toggleHideTicker={() =>
                    this.toggleHideTicker(node.data.icbCode)
                  }
                  isHideTicker={this.isHideTicker(node.data.icbCode)}
                />
              </div>
            );
          })}
        </div>
      </Provider>
    );
  }
}

TreeMap.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};

TreeMap.defaultProps = {
  isLoading: false,
};

export default TreeMap;
