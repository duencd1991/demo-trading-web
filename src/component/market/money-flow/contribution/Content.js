import React from 'react';
import Filter from './filter/Filter';
import IndexSummary from './index-summary/IndexSummary';
import Chart from './chart/Chart';
import { withSize } from 'react-sizeme';

class Content extends React.Component {
  render() {
    return (
      <div style={{ position: 'unset' }}>
        <Filter />
        <IndexSummary />
        <Chart />
      </div>
    );
  }
}

export default withSize({ monitorHeight: true })(Content);
