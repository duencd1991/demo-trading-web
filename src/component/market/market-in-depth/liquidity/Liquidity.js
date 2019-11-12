import React, { Component } from 'react';
import withMarketPreOpen from '../../../common/market-pre-open/withMarketPreOpen';
import Chart from './Chart';
import TimeRange from './TimeRange';
import Filter from './Filter';
import { subscribeRealtimeData } from './reducer';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRealtime from './../../../common/withRealtime';

class Liquidity extends Component {
  render() {
    return (
      <div className="tab-pane active liquidity">
        <div className="w-100 d-flex">
          <Filter />
          <TimeRange />
        </div>
        <Chart />
      </div>
    );
  }
}

const mapDispatchToProps = {
  subscribeRealtimeData,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRealtime(ChanelConfig.IndexChannel, 'subscribeRealtimeData'),
  withMarketPreOpen('flex-fill'),
)(Liquidity);
