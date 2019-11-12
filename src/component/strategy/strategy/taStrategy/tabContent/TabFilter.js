import React from 'react';
import { I18n } from 'react-redux-i18n';
import Const from '../Const';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './../reducer';
import TabFilter from '../../../../common/tab-filter';
import InfoFilterSelect from './InfoFilterSelect';
import './index.scss';

class TabFilterTaStrategy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTabState: 1,
      currentFilterLineOne: 1,
      currentFilterLineTwo: 2,
      currentFilterLineThree: 3,
      currentFilterLineFour: 2,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTab !== this.state.currentTabState) {
      let currenFilterDefault = this.changeDefaultCurrenTabFilter(
        nextProps.currentTab,
      );
      // if (currenFilterDefault.length > 3) {
      //   console.log('aaaaaaaaa');
      //   this.setState({
      //     currentFilterLineOne: currenFilterDefault[0],
      //     currentFilterLineTwo: currenFilterDefault[1],
      //     currentFilterLineThree: currenFilterDefault[2],
      //     currentFilterLineFour: currenFilterDefault[3],
      //     currentTabState: nextProps.currentTab,
      //   });
      // }
      this.setState({
        ...this.state,
        currentFilterLineOne: currenFilterDefault[0],
        currentFilterLineTwo: currenFilterDefault[1],
        currentFilterLineThree: currenFilterDefault[2],
        currentTabState: nextProps.currentTab,
      });
    }
  }

  changeDefaultCurrenTabFilter = currentTab => {
    console.log('currentTab : ', currentTab);
    const map = {
      [Const.tabs.accummulation]: [1, 2, 3],
      [Const.tabs.breakOut]: [1, 2, 2],
      [Const.tabs.breakOutMa]: [1, 2, 3],
      [Const.tabs.bestInDowntrend]: [1, 2, 2],
      [Const.tabs.marketAnomaly]: [1, 3, 2],
    };
    return map[currentTab];
  };

  changeFilterLineOne = currentFilterLineOne => {
    this.setState({
      ...this.state,
      currentFilterLineOne,
    });
  };

  changeFilterLineTwo = currentFilterLineTwo => {
    this.setState({
      ...this.state,
      currentFilterLineTwo,
    });
  };

  changeFilterLineThree = currentFilterLineThree => {
    this.setState({
      ...this.state,
      currentFilterLineThree,
    });
  };

  changeFilterLineFour = currentFilterLineFour => {
    this.setState({
      ...this.state,
      currentFilterLineFour,
    });
  };

  getInfoFilter = () => {
    const { currentTab } = this.props;
    const {
      currentFilterLineOne,
      currentFilterLineTwo,
      currentFilterLineThree,
      currentFilterLineFour,
    } = this.state;

    const map = {
      [Const.tabs.accummulation]: [
        `${
          I18n.t('taStrategy.filterAccumulationPeriodCondition')[
            currentFilterLineOne
          ]
        }`,
        `${
          I18n.t('taStrategy.filterVolumnRateOfChangeTabOneCondition')[
            currentFilterLineTwo
          ]
        }`,
        `${
          I18n.t('taStrategy.filterIncreaseInPriceTabOneCondition')[
            currentFilterLineThree
          ]
        }`,
      ],

      [Const.tabs.breakOut]: [
        `${
          I18n.t('taStrategy.filterStockGroupTabTwoCondition')[
            currentFilterLineThree
          ]
        }`,
        `${
          I18n.t('taStrategy.filterBreakoutTopWithinCondition')[
            currentFilterLineOne
          ]
        }`,
        `${
          I18n.t('taStrategy.filterVolumnRateOfChangeTabTwoCondition')[
            currentFilterLineTwo
          ]
        }`,
      ],

      [Const.tabs.breakOutMa]: [
        `${
          I18n.t('taStrategy.filterBreakoutMaBottomCondition')[
            currentFilterLineOne
          ]
        }`,
        `${
          I18n.t('taStrategy.filterVolumnRateOfChangeTabThreeCondition')[
            currentFilterLineTwo
          ]
        }`,
        `${
          I18n.t('taStrategy.filterIncreaseInPriceTabThreeCondition')[
            currentFilterLineThree
          ]
        }`,
      ],

      [Const.tabs.bestInDowntrend]: [
        `${
          I18n.t('taStrategy.filterStockGroupTabFourCondition')[
            currentFilterLineThree
          ]
        }`,
        `${
          I18n.t('taStrategy.filterAverageVol1mTabFourCondition')[
            currentFilterLineTwo
          ]
        }`,
        `the highest EPS`,
        `${
          I18n.t('taStrategy.filterVNIndexDowntrendCondition')[
            currentFilterLineOne
          ]
        }`,
      ],

      [Const.tabs.marketAnomaly]: [
        `${
          I18n.t('taStrategy.filterStockGroupTabFiveCondition')[
            currentFilterLineFour
          ]
        }`,
        `${
          I18n.t('taStrategy.filterHighestReturnCondition')[
            currentFilterLineOne
          ]
        }`,
        `${
          I18n.t('taStrategy.filterAverageVol1mTabFiveCondition')[
            currentFilterLineThree
          ]
        }`,
        `${
          I18n.t('taStrategy.filterCaculationPeriodCondition')[
            currentFilterLineTwo
          ]
        }`,
      ],
    };
    return map[currentTab];
  };

  getInfoFilterDefault = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.accummulation]: ['Stocks accumulate', 'with', 'and'],

      [Const.tabs.breakOut]: ['Stocks in', 'that', 'with'],

      [Const.tabs.breakOutMa]: ['Stocks that', 'with', 'and'],

      [Const.tabs.bestInDowntrend]: ['Stocks in', 'with', 'and', 'within'],

      [Const.tabs.marketAnomaly]: ['Stocks in', 'with', 'and', 'over'],
    };
    return map[currentTab];
  };

  render() {
    const { currentTab, titleFilter, filterTypeTab } = this.props;
    const infoFilterTabDefault = this.getInfoFilterDefault();
    const infoFilterTab = this.getInfoFilter();

    let filterTabLineFour = '';
    if (currentTab === Const.tabs.marketAnomaly) {
      filterTabLineFour = (
        <div className="list-filter-ta-strategy">
          <span
            className="left-label-ta-strategy"
            style={{ fontWeight: 'bold' }}
          >
            {I18n.t(titleFilter[3])}
          </span>
          <TabFilter
            currentTab={this.state.currentFilterLineFour}
            listTab={filterTypeTab[3]}
            changeTab={this.changeFilterLineFour}
          />
        </div>
      );
    }

    return (
      <>
        <div className="list-filter-ta-strategy">
          <span
            className="left-label-ta-strategy"
            style={{ fontWeight: 'bold' }}
          >
            {I18n.t(titleFilter[0])}
          </span>
          <TabFilter
            currentTab={this.state.currentFilterLineOne}
            listTab={filterTypeTab[0]}
            changeTab={this.changeFilterLineOne}
          />
        </div>

        <div className="list-filter-ta-strategy">
          <span
            className="left-label-ta-strategy"
            style={{ fontWeight: 'bold' }}
          >
            {I18n.t(titleFilter[1])}
          </span>
          <TabFilter
            currentTab={this.state.currentFilterLineTwo}
            listTab={filterTypeTab[1]}
            changeTab={this.changeFilterLineTwo}
          />
        </div>

        <div className="list-filter-ta-strategy">
          <span
            className="left-label-ta-strategy"
            style={{ fontWeight: 'bold' }}
          >
            {I18n.t(titleFilter[2])}
          </span>
          <TabFilter
            currentTab={this.state.currentFilterLineThree}
            listTab={filterTypeTab[2]}
            changeTab={this.changeFilterLineThree}
          />
        </div>

        {filterTabLineFour}

        <div className="mt-5">
          <InfoFilterSelect
            infoFilterTab={infoFilterTab}
            infoFilterTabDefault={infoFilterTabDefault}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(TabFilterTaStrategy);
