import React from 'react';
import PieSVG from './PieSVG';
import PropTypes from 'prop-types';
import './tooltip.scss';

class Doughnut extends React.Component {
  render() {
    const {
      listData,
      colors,
      title,
      tooltipPaddingX,
      tooltipPaddingY,
      renderTooltip,
    } = this.props;

    return (
      <div className="ownership">
        <div className="chart_wrap_ownership" style={{ width: 250 }}>
          <div className="title_tooltip">{title}</div>
          <PieSVG
            renderTooltip={renderTooltip}
            data={listData}
            colors={colors}
            width={120}
            height={120}
            innerRadius={35}
            outerRadius={60}
            tooltipPaddingX={tooltipPaddingX}
            tooltipPaddingY={tooltipPaddingY}
          />
        </div>
      </div>
    );
  }
}

Doughnut.propTypes = {
  listData: PropTypes.array,
  colors: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  renderTooltip: PropTypes.func,
};

Doughnut.defaultProps = {
  listData: [],
  colors: [],
  title: '',
  renderTooltip: null,
};

export default Doughnut;
