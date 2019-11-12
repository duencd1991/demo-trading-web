import React, { Component } from 'react';
import '../index.scss';
import _ from 'lodash';
import { formatTextFloat, val } from './../../../../helpers/Text';

class BarChartInfo extends Component {
  render() {
    const { title, currentTime, value, showYear } = this.props;

    return (
      <div className="barchart_info">
        <div className="barchart_info__title">
          <span style={{ fontWeight: 600 }}>{_.capitalize(title)}</span>
        </div>
        <div className="barchart_info__line fade_opacity" />
        <div>
          <span className="fade_opacity">
            {currentTime + (showYear ? "'" + showYear : '')}
          </span>
          &nbsp;
          <span>
            <strong>{val(formatTextFloat(value * 100))}%</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default BarChartInfo;
