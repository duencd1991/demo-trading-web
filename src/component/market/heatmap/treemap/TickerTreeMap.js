import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { treemap, hierarchy } from 'd3-hierarchy';

import {
  getBorderTopClassName,
  getSectorTitleBg,
} from '../../../helpers/ClassName';
import Ticker from './Ticker';
import TopTen from './TopTen';
import { withRootRef } from './refContext';

const TITLE_HEIGHT = 23;
const MIN_WIDTH = 40;
const PADDING = 10;
const MIN_HEIGHT = 40;

class TickerTreeMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowList: false,
      top: 0,
      left: 0,
      hoverIndex: null,
    };
    this.tickerRef = React.createRef();
  }

  componentDidMount() {}

  getRoot = (width, height, data) => {
    const paddingTop = this.isTooTiny() ? 0 : TITLE_HEIGHT;
    const root = hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => {
        if (!a.data.organCode) {
          return 1;
        }
        return b.value - a.value;
      });
    treemap()
      .size([width, height])
      .paddingTop(paddingTop)
      .paddingInner(2)(root);

    return root;
  };

  getHeight = () => {
    const { height } = this.props;

    return this.isTooTiny() ? height : height - TITLE_HEIGHT + 2;
  };

  calcPosition = e => {
    const { rootRef } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const tickerHeight = this.tickerRef.current.scrollHeight;
    const tickerWidth = this.tickerRef.current.scrollWidth;
    const header = document.querySelector('.lm_root');
    const isOverHeader =
      e.pageY - tickerHeight - PADDING > header.getBoundingClientRect().top;
    const isShowTop = e.pageY + tickerHeight > rootRect.bottom && isOverHeader;
    const isShowLeft = e.pageX + tickerWidth > rootRect.right;

    return {
      top: isShowTop ? e.pageY - tickerHeight - PADDING : e.pageY + PADDING,
      left: isShowLeft ? e.pageX - tickerWidth - PADDING : e.pageX + PADDING,
    };
  };

  onMouseMove = (e, code) => {
    const { top, left } = this.calcPosition(e);
    this.setState({
      top,
      left,
      isShowList: true,
      hoverCode: code,
    });
  };

  onMouseLeave = () => {
    this.setState({
      isShowList: false,
    });
  };

  onTitleEnter = () => {
    const { isShowList } = this.state;
    if (isShowList) {
      this.setState({
        isShowList: false,
      });
    }
  };

  showList = (bool = true) => {
    this.setState({
      isShowList: bool,
    });
  };

  isTooTiny = () => {
    const { width, height } = this.props;

    return width < MIN_WIDTH || height < MIN_HEIGHT;
  };

  renderTitle = () => {
    const { title, value, parentRate } = this.props;
    if (parentRate === null || this.isTooTiny()) {
      return null;
    }

    return (
      <div
        onMouseEnter={this.onTitleEnter}
        className={`sector-title ${getSectorTitleBg(parentRate)}`}
      >
        <div className="text">{title}</div>
        <div className="arrow-down">
          <div className="triangle-wrapper">
            <div className={`triangle ${getBorderTopClassName(value)}`} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isShowList, top, left, hoverCode } = this.state;
    const { width, height, data, sectorName, sectorClassName } = this.props;
    const root = this.getRoot(width, height, data);

    return (
      <div
        ref={this.rootRef}
        style={{
          width: width,
          height: height,
        }}
        className={isShowList ? 'sector-hover' : ''}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderTitle()}
        <div
          style={{
            width: `${width}px`,
            height: `${this.getHeight()}px`,
          }}
          className="ticker-treemap"
        >
          {root.leaves().map((node, index) => (
            <Ticker
              key={index}
              sectorClassName={sectorClassName}
              onMouseMove={this.onMouseMove}
              node={node}
            />
          ))}
        </div>
        <TopTen
          ref={this.tickerRef}
          sectorName={sectorName}
          showList={this.showList}
          icbCode={data.icbCode}
          hoverCode={hoverCode}
          topTen={data.children}
          style={{
            top: top,
            left: left,
            position: 'fixed',
            maxHeight: isShowList ? 1000 : 0,
          }}
        />
      </div>
    );
  }
}

TickerTreeMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.number,
  parentRate: PropTypes.number,
  sectorName: PropTypes.string,
  sectorClassName: PropTypes.string,
};

TickerTreeMap.defaultProps = {
  value: 0,
  parentRate: null,
  sectorName: '',
  sectorClassName: '',
};

export default compose(withRootRef)(TickerTreeMap);
