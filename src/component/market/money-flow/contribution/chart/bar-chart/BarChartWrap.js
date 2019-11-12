import React from 'react';
import BarChart from './BarChart';

class BarChartWrap extends React.Component {
  render() {
    const { data, width, ratio, height } = this.props;
    return (
      <BarChart data={data} width={width - 30} ratio={ratio} height={height} />
    );
  }
}

export default BarChartWrap;
