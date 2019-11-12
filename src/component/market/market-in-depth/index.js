import React, { Component } from 'react';
import Tab from '../../common/tab';
import Index from './index2';
import Prospect from './prospect';
import Valuation from './valuation';
import Liquidity from './liquidity';
import MarketAnomaly from './market-anomaly';
import withPreRender from './../../common/withPreRender';
import ScrollComponent from './../../common/ScrollComponent';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';

class MarketInDepth extends Component {
  state = {
    currentTab: 1,
  };

  changeTab = currentTab => {
    this.setState({ currentTab });
  };

  renderContentTab = () => {
    const { currentTab } = this.state;

    switch (currentTab) {
      case 1:
        return <Index />;
      case 2:
        return <Prospect />;
      case 3:
        return <Valuation />;
      case 4:
        return <Liquidity />;
      case 5:
        return <MarketAnomaly />;
      default:
        return <Index />;
    }
  };

  renderTab = () => {
    const { currentTab } = this.state;

    return (
      <Tab
        currentTab={currentTab}
        listTab="marketInDepthCommon.tab"
        changeTab={this.changeTab}
      />
    );
  };

  render() {
    return (
      <ScrollComponent>
        <div className="top-nav pl-20 pr-20 pt-8 h-100 d-flex flex-column">
          {this.renderTab()}
          <div className="tab-content flex-fill d-flex flex-column h-auto">
            {this.renderContentTab()}
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

export default compose(withPreRender(ConstCommon.listComponent.MarketInDepth))(
  MarketInDepth,
);
