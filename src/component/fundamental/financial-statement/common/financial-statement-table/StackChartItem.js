import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { formatPercent, formatTextFloat, formatValueBillion } from '../../../../helpers/Text';

const TRIANGLE_HEIGHT = 4;

class StackChartItem extends PureComponent {
  state = {
    toolTip: {
      isShow: false,
      top: null,
      left: null,
      text: '',
    }
  };

  tooltipRef = React.createRef();

  isTooltipShowLeft = (e) => {
    const { width } = this.tooltipRef.current.getBoundingClientRect();
    const tableRect = this.tooltipRef.current.closest('table').getBoundingClientRect();
    return e.pageX + width / 2 > tableRect.right;
  };

  calcPosition = (e, isShowLeft) => {
    const { width, height } = this.tooltipRef.current.getBoundingClientRect();
    return {
      left: isShowLeft ? e.pageX - width : e.pageX - width / 2,
      top: e.pageY - height - TRIANGLE_HEIGHT,
    };
  };

  getTooltipText = (key) => {
    const { data, total } = this.props;
    const percent = formatPercent(data[key] / total);

    return (
      <Translate
        value={`financialStatement.${key}Tooltip`}
        tooltipValue={formatTextFloat(formatValueBillion(data[key]))}
        percent={percent}
      />
    );
  };

  onMouseMove = (key, e) => {
    const isShowLeft = this.isTooltipShowLeft(e);
    const { top, left } = this.calcPosition(e, isShowLeft);

    this.setState({
      toolTip: {
        top,
        left,
        isShowLeft,
        isShow: true,
        text: this.getTooltipText(key),
      },
    });
  };

  onMouseLeave = () => {
    const { toolTip } = this.state;
    this.setState({
      toolTip: {
        ...toolTip,
        isShow: false,
      },
    });
  };

  getStyle = (field) => {
    const { data, item } = this.props;

    return {
      flex: formatValueBillion(data[field]),
      backgroundColor: item.color,
    };
  };

  render() {
    const { toolTip: { top, left, isShowLeft, isShow } } = this.state;
    const { item, color } = this.props;

    return (
      <div
        onMouseLeave={this.onMouseLeave}
        onMouseMove={(e) => this.onMouseMove(item.key, e)}
        style={this.getStyle(item.key)}
        className="chart-item"
      >
        <div
          ref={this.tooltipRef}
          style={{
            top: `${isShow ? top : 9999}px`,
            position: 'fixed',
            left: `${isShow ? left : 9999}px`
          }}
          className="chart-tooltip"
        >
          <div className="tooltip-wrapper">
            <div style={{
              backgroundColor: color,
            }} className="circle" />
            <div className="text">{this.getTooltipText(item.key)}</div>
            <div
              className={isShowLeft ? 'triangle-top-right' : 'triangle'}
            />
          </div>
        </div>
      </div>
    );
  }
}

StackChartItem.propTypes = {
  data: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default StackChartItem;
