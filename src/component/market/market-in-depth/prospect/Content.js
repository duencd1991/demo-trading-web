import React, { Component } from 'react';
import moment from 'moment';
import { mapTabTime, tabs } from './Const';
import AsianMarket from './prospect-items/AsianMarket';
import CentralBankRate from './prospect-items/CentralBankRate';
import EuroMarket from './prospect-items/EuroMarket';
import ForeignFlow from './prospect-items/ForeignFlow';
import OilWtiPrice from './prospect-items/OilWtiPrice';
import UsMarket from './prospect-items/UsMarket';
import VnIndex from './prospect-items/VnIndex';
import WorldGoldPrice from './prospect-items/WorldGoldPrice';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';

const MD_SIZE = 800;
const SM_SIZE = 600;

const types = {
  usMarket: 'usMarket',
  euroMarket: 'europMarket',
  asianMarket: 'asianMarket',
  oilWtiPrice: 'oilWtiPrice',
  centralBankRate: 'centralBankRate',
  worldGoldPrice: 'worldGoldPrice',
  vnIndex: 'vnIndex',
  foreignFlow: 'foreignFlow',
};

const mapComponent = {
  [types.usMarket]: UsMarket,
  [types.euroMarket]: EuroMarket,
  [types.asianMarket]: AsianMarket,
  [types.oilWtiPrice]: OilWtiPrice,
  [types.centralBankRate]: CentralBankRate,
  [types.worldGoldPrice]: WorldGoldPrice,
  [types.vnIndex]: VnIndex,
  [types.foreignFlow]: ForeignFlow,
};

class Content extends Component {
  getClassName = width => {
    let result = 'prospect-item-width-lg';
    if (width < MD_SIZE) {
      result = 'prospect-item-width-md';
    }
    if (width < SM_SIZE) {
      result = 'prospect-item-width-sm';
    }

    return result;
  };

  getDailyDate = market => {
    const { listProspectData } = this.props;
    const dailyData = listProspectData.heatMap.heatmaps.find(
      item => item.timeRange === mapTabTime[tabs.daily],
    )[market];
    if (Array.isArray(dailyData)) {
      return moment(dailyData[0].tradingDate).format('l');
    }

    return moment(dailyData.tradingDate).format('l');
  };

  render() {
    const { component, heatMap } = this.props;
    const className = this.getClassName(component.width);
    return (
      <div className="prospect-flex">
        {Object.values(types).map((market, index) => {
          const Component = mapComponent[market];

          return (
            <Component
              dailyDate={this.getDailyDate(market)}
              key={index}
              className={className}
              data={heatMap[market]}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    component: state[REDUCER_NAME].component,
  };
};

export default connect(mapStateToProps)(Content);
