import React from 'react';
import withMarketPreOpen from '../../../common/market-pre-open/withMarketPreOpen';
import Chart from './Chart';
import PriceInfo from './PriceInfo';
import Table from './Table';
import { fetchListTable, subscribeRealtimeData } from './reducer';
import Footer from '../../../common/table/Footer';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRealtime from './../../../common/withRealtime';

class Index2 extends React.Component {
  componentDidMount() {
    const { fetchListTable } = this.props;
    fetchListTable(999999, 1);
  }

  render() {
    return (
      <div className="tab-pane active">
        <div className="chart-view-wrap">
          <div className="d-flex">
            <div className="w-185px">
              <PriceInfo />
            </div>
            <div className="w-100-185px">
              <div className="insert-chart-view">
                <Chart />
              </div>
            </div>
          </div>
        </div>
        <Table />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  subscribeRealtimeData,
  fetchListTable,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRealtime(ChanelConfig.IndexChannel, 'subscribeRealtimeData'),
  withMarketPreOpen('flex-fill'),
)(Index2);
