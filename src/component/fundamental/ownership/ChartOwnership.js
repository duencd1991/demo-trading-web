import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import Doughnut from './../../common/donut-chart/Doughnut';

class ChartOwnerShip extends Component {
  render() {
    //dougnut chart overview
    const { overViewChartData } = this.props;
    const colorsOverview = ['#45b29d', '#facc5c', '#df5a49'];
    const title = 'OVERVIEW';

    //dougnut chart major ownerships
    const { majorOwnerShipChartData } = this.props;
    const colorsMajorOwnership = [
      '#f46139',
      '#feff9d',
      '#beeb9f',
      '#79bd8f',
      '#45b29d',
    ];
    const titleMajor = 'MAJOR OWNERSHIPS';

    return (
      <div>
        <Doughnut
          listData={overViewChartData}
          colors={colorsOverview}
          title={title}
          tooltipPaddingX={50}
          tooltipPaddingY={85}
        />
        <div style={{ marginTop: 10, marginBottom: 10 }} />
        <Doughnut
          listData={majorOwnerShipChartData}
          colors={colorsMajorOwnership}
          title={titleMajor}
          tooltipPaddingX={50}
          tooltipPaddingY={85}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    // overViewChartData : state[REDUCER_NAME].overViewChartData,
    // majorOwnerShipChartData : state[REDUCER_NAME].majorOwnerShipChartData,
    overViewChartData:
      state[REDUCER_NAME].listMultiComponent[id].overViewChartData,
    majorOwnerShipChartData:
      state[REDUCER_NAME].listMultiComponent[id].majorOwnerShipChartData,
  };
};

export default connect(mapStateToProps)(ChartOwnerShip);
