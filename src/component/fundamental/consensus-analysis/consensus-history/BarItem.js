import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { formatTextFloat } from '../../../helpers/Text';

const BAR_MAX_WIDTH = 30;

class BarItem extends PureComponent {
  state = {
    tooltip: {
      isShow: false,
      top: null,
      left: null,
      width: null,
      height: null,
    },
  };

  tooltipRef = React.createRef();

  componentDidMount() {
    this.calcTooltipSize();
  }

  componentWillUnmount() {
    clearTimeout(this.sizeTimeout);
  }

  calcTooltipSize = () => {
    this.sizeTimeout = setTimeout(() => {
      const { width, height } = this.tooltipRef.current.getBoundingClientRect();

      this.setTooltip({
        width,
        height,
      });
    }, 0);
  };

  setTooltip = obj => {
    const { tooltip } = this.state;
    this.setState({
      tooltip: {
        ...tooltip,
        ...obj,
      },
    });
  };

  getStyle = item => {
    const { data, height, width } = this.props;
    const itemHeight = (height * data[item.key]) / 100;

    return {
      backgroundColor: item.color,
      height: isNaN(itemHeight) ? 0 : itemHeight,
      maxWidth: Math.min(width, BAR_MAX_WIDTH),
    };
  };

  onMouseOver = e => {
    const { tooltip } = this.state;
    const top = e.pageY - tooltip.height - 5;
    const left = e.pageX - tooltip.width / 2;
    this.setTooltip({
      top,
      left,
      isShow: true,
    });
  };

  onMouseLeave = () => {
    this.setTooltip({
      isShow: false,
    });
  };

  renderTooltip = item => {
    const {
      tooltip: { isShow, left, top },
    } = this.state;
    const { data } = this.props;
    return (
      <div
        style={{
          top: isShow ? top : 9999,
          left: isShow ? left : 9999,
        }}
        className="recommendation-tooltip"
        ref={this.tooltipRef}
      >
        <div
          onMouseMove={this.onMouseOver}
          className="recommendation-tooltip-content"
        >
          <Translate
            value={`consensusAnalysis.stackBarChartTooltip${item.key}`}
            percent={formatTextFloat(data[item.key])}
          />
        </div>
      </div>
    );
  };

  render() {
    const { item } = this.props;
    return (
      <div
        onMouseMove={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        className="recommendation-item"
        style={this.getStyle(item)}
      >
        {this.renderTooltip(item)}
      </div>
    );
  }
}

BarItem.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default BarItem;
