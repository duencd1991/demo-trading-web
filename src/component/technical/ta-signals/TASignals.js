import React, { Component } from 'react';
import Tab from '../../common/tab';
import Indicators from '../ta-signals/indicators/Indicators';
import Deceptive from '../ta-signals/deceptive/Deceptive';
import PriceVolume from '../ta-signals/price-volume/PriceVolume';
import ScrollComponent from './../../common/ScrollComponent';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';

class TASignals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }

  changeTab = currentTab => {
    this.setState({ currentTab });
  };

  render() {
    return (
      <ScrollComponent>
        <div className="top-nav pl-20 pr-20 pt-8">
          <Tab
            currentTab={this.state.currentTab}
            listTab="tasignals.lstTab"
            changeTab={this.changeTab}
          />
          <div className="tab-content">
            {this.state.currentTab === 1 && <Indicators />}
            {this.state.currentTab === 2 && <Deceptive />}
            {this.state.currentTab === 3 && <PriceVolume />}
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

export default withPreRender(ConstCommon.listComponent.TASignals)(TASignals);
