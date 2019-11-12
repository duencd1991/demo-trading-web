import React, { Component } from 'react';
import Tab from '../../common/tab';
import './Strategy.scss';
import { compose } from 'redux';
import FiinTradeStrategy from './fiinTradeStrategy/FiinTradeStrategy';
import TaStrategy from './taStrategy/TaStrategy';
import Canslim from './canslim/Canslim';
import ConstCommon from './../../common/Const';
import withPreRender from './../../common/withPreRender';

class Strategy extends Component {
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
      <div className="top-nav pl-20 pr-20 pt-8 h-100 d-flex flex-column">
        <Tab
          currentTab={this.state.currentTab}
          listTab="strategy.tabs"
          changeTab={this.changeTab}
        />
        <div className="tab-content flex-fill h-auto">
          {this.state.currentTab === 1 && <FiinTradeStrategy />}
          {this.state.currentTab === 3 && <TaStrategy />}
          {this.state.currentTab === 2 && <Canslim />}
        </div>
      </div>
    );
  }
}

export default compose(withPreRender(ConstCommon.listComponent.Strategy))(
  Strategy,
);
