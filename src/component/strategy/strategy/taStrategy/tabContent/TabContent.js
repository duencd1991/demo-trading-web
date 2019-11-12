import React from 'react';
import { I18n } from 'react-redux-i18n';
import TaStrategyTable from './../table/TaStrategyTable';
import SizeTracker from '../../../../common/size-tracker/SizeTracker';
import Const from '../Const';
import TopInfoStrategy from './../common-top-info/TopInfoStrategy';
import TabFilterTaStrategy from './TabFilter';
import './index.scss';

class TabContent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getTableTitle = () => {
    const { currentTab } = this.props;
    const mapTitle = {
      [Const.tabs.accummulation]: 'taStrategy.tableAccumulation',
      [Const.tabs.breakOut]: 'taStrategy.tableBreakOut',
      [Const.tabs.breakOutMa]: 'taStrategy.tableBreakOutMa',
      [Const.tabs.bestInDowntrend]: 'taStrategy.tableBestInDowntrend',
      [Const.tabs.marketAnomaly]: 'taStrategy.tableMarketAnomaly',
    };
    return mapTitle[currentTab];
  };

  getSchemaKey = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.accummulation]: Const.tableAccumulation,
      [Const.tabs.breakOut]: Const.tableBreakOut,
      [Const.tabs.breakOutMa]: Const.tableBreakOutMa,
      [Const.tabs.bestInDowntrend]: Const.tableBestInDowntrend,
      [Const.tabs.marketAnomaly]: Const.tableMarketAnomaly,
    };
    return map[currentTab];
  };

  getDefaultFilterTab = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.accummulation]: [
        'taStrategy.filterAccumulationPeriod',
        'taStrategy.filterVolumnRateOfChangeTabOne',
        'taStrategy.filterIncreaseInPriceTabOne',
      ],

      [Const.tabs.breakOut]: [
        'taStrategy.filterBreakoutTopWithin',
        'taStrategy.filterVolumnRateOfChangeTabTwo',
        'taStrategy.filterStockGroupTabTwo',
      ],

      [Const.tabs.breakOutMa]: [
        'taStrategy.filterBreakoutMaBottom',
        'taStrategy.filterVolumnRateOfChangeTabThree',
        'taStrategy.filterIncreaseInPriceTabThree',
      ],

      [Const.tabs.bestInDowntrend]: [
        'taStrategy.filterVNIndexDowntrend',
        'taStrategy.filterAverageVol1mTabFour',
        'taStrategy.filterStockGroupTabFour',
      ],

      [Const.tabs.marketAnomaly]: [
        'taStrategy.filterHighestReturn',
        'taStrategy.filterCaculationPeriod',
        'taStrategy.filterAverageVol1mTabFive',
        'taStrategy.filterStockGroupTabFive',
      ],
    };
    return map[currentTab];
  };

  getTitleFilter = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.accummulation]: [
        'taStrategy.titleFilterAccumulation.titleOne',
        'taStrategy.titleFilterAccumulation.titleTwo',
        'taStrategy.titleFilterAccumulation.titleThree',
      ],

      [Const.tabs.breakOut]: [
        'taStrategy.titleFilterBreakout.titleOne',
        'taStrategy.titleFilterBreakout.titleTwo',
        'taStrategy.titleFilterBreakout.titleThree',
      ],

      [Const.tabs.breakOutMa]: [
        'taStrategy.titleFilterBreakoutMa.titleOne',
        'taStrategy.titleFilterBreakoutMa.titleTwo',
        'taStrategy.titleFilterBreakoutMa.titleThree',
      ],

      [Const.tabs.bestInDowntrend]: [
        'taStrategy.titleFilterBestInDowntrend.titleOne',
        'taStrategy.titleFilterBestInDowntrend.titleTwo',
        'taStrategy.titleFilterBestInDowntrend.titleThree',
      ],

      [Const.tabs.marketAnomaly]: [
        'taStrategy.titleFilterMarketAnomaly.titleOne',
        'taStrategy.titleFilterMarketAnomaly.titleTwo',
        'taStrategy.titleFilterMarketAnomaly.titleThree',
        'taStrategy.titleFilterMarketAnomaly.titleFour',
      ],
    };
    return map[currentTab];
  };

  getInfoStrategy = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.accummulation]: {
        summaryName: 'ANB',
        name: 'Accumulation & Break',
        characteristics: 'SIGNIFICANT VOLUME INCREASE DURING A PERIOD',
        color: '#5392ff',
      },

      [Const.tabs.breakOut]: {
        summaryName: 'BTB',
        name: 'Breakout Top & Bottom',
        characteristics: 'STOCKS BREAKING OUT THE TOP OR THE BOTTOM',
        color: '#e24938',
      },

      [Const.tabs.breakOutMa]: {
        summaryName: 'BMA',
        name: 'Breakout MA',
        characteristics: 'STOCKS BREAKING MA20 / MA50 / MA100 / MA200',
        color: '#f0b04f',
      },

      [Const.tabs.bestInDowntrend]: {
        summaryName: 'BID',
        name: 'Best in Downtrend',
        characteristics: 'STOCKS WITH THE HIGHEST RETURN IN DOWNTREND',
        color: '#5b4587',
      },

      [Const.tabs.marketAnomaly]: {
        summaryName: 'ANO',
        name: 'Market Anomaly',
        characteristics: 'PRICE & RATE OF RETURN DISTORTION IS ANOMALY',
        color: '#f59b9b',
      },
    };
    return map[currentTab];
  };

  render() {
    const { currentTab } = this.props;
    const filterTypeTab = this.getDefaultFilterTab();
    const infoStrategy = this.getInfoStrategy();
    const titleFilter = this.getTitleFilter();

    return (
      <div className="body-strategy-ta">
        <TopInfoStrategy currentTab={currentTab} infoStrategy={infoStrategy} />
        <TabFilterTaStrategy
          currentTab={currentTab}
          titleFilter={titleFilter}
          filterTypeTab={filterTypeTab}
        />

        <div className="mt-20">
          {/* <SizeTracker className="w-100 h-100 mt-20">
            {(width, height) => ( */}
          <TaStrategyTable
            title={this.getTableTitle()}
            schemaKey={this.getSchemaKey()}
          />
          {/* )}
          </SizeTracker> */}
        </div>
      </div>
    );
  }
}

export default TabContent;
