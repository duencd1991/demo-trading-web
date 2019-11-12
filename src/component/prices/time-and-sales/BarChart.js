import React from 'react';
import { Translate } from 'react-redux-i18n';
import Chart from './chart';
import sizeMe from 'react-sizeme';

class BarChart extends React.Component {
  render() {
    const { componentId, width } = this.props;
    return (
      <div
        className="ts-chart stock-chart"
        id={`time-and-sale-export-${componentId}`}
      >
        <div className="chart-title">
          <Translate value="timeAndSale.chartTitle" />
        </div>
        <Chart width={width} />
      </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(BarChart);
