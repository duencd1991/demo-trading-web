import React, { Component } from 'react';
import MainContent from './MainContent';
import { FilterDate } from './filter-date';
import { IndexSummary } from './index-summary';

class MarketAnomaly extends Component {
  render() {
    return (
      <div className="market-anomaly tab-pane active" role="tabpanel">
        <div className="chart-view-wrap">
          <div className="d-flex ">
            <div className="w-185px">
              <IndexSummary />
            </div>
            <div className="w-100-185px">
              <FilterDate />
            </div>
          </div>
          <MainContent />
        </div>
      </div>
    );
  }
}

export default MarketAnomaly;
