import React, { Component } from 'react';
import Tab from '../../common/tab';
import WatchList from './watchlist/WatchList';
import Corporate from './corporate/Corporate';
import Economy from './economy/Economy';
//TODO import './index.scss';
import ScrollComponent from './../../common/ScrollComponent';
import { compose } from 'redux';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';

class MarketCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }

  changeTab = currentTab => {
    this.setState({ ...this.state, currentTab });
  };

  render() {
    return (
      <ScrollComponent>
        <div className="top-nav pl-20 pr-20 pt-8">
          <Tab
            currentTab={this.state.currentTab}
            listTab="marketCalendar.lstTab"
            changeTab={this.changeTab}
          />
          <div className="tab-content">
            {this.state.currentTab === 1 && <Economy />}
            {this.state.currentTab === 2 && <WatchList />}
            {this.state.currentTab === 3 && <Corporate />}
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

export default compose(withPreRender(ConstCommon.listComponent.MarketCalendar))(
  MarketCalendar,
);
