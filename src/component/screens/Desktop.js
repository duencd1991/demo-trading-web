import React, { Component } from 'react';
import ConsensusAnalysis from '../fundamental/consensus-analysis/ConsensusAnalysis';
import MarketInDepth from '../market/market-in-depth';
import Watchlist from '../market/watchlist';
import TopVolume from '../market/top-mover/top-volume';
import TopValue from '../market/top-mover/top-value';
import TopBreakout from '../market/top-mover/top-breakout';
import TopGainers from '../market/top-mover/top-gainers';
import TopLosers from '../market/top-mover/top-losers';
import TopNewHigh from '../market/top-mover/top-new-high';
import TopNewLow from '../market/top-mover/top-new-low';
import TopForeignTrade from '../market/top-mover/top-foreign-trading';
import MoneyFlow from '../market/money-flow/MoneyFlow';
import MarketCalendar from '../market/market-calendar/MarketCalendar';
import HeatMap from '../market/heatmap/HeatMap';
import TimeAndSales from '../prices/time-and-sales';
import PriceData from '../prices/price-data/';
import PriceDepth from '../prices/price-depth';
import TASignals from '../technical/ta-signals/TASignals';
import Charting from '../technical/charting/Charting';
import Ownership from '../fundamental/ownership/Ownership';
import FinancialAnalysis from '../fundamental/financial-analysis';
import FADividendAnalysis from '../fundamental/dividend-analysis/FADividendAnalysis';
import FinancialStatement from '../fundamental/financial-statement/FinancialStatement';
import FASnapshot from '../fundamental/snapshot/FASnapshot';
import News from '../news-and-analysis/News';
import Valuation from '../tools/valuation/Valuation';
import STRanking from '../strategy/ranking/STRanking';
import Strategy from '../strategy/strategy/Strategy';

import LayoutHelper from '../helpers/Layout';
import GoldenLayoutWrapper from '../common/GoldenLayoutWrapper';
import MainLayout from './../main-layout';
import { I18n } from 'react-redux-i18n';
import widgetConfig from './../../configs/WidgetConfig';
import Alerts from './../tools/alerts/index';
import Screener from './../tools/screener/Screener';
import { TradeData } from './../tools/trade-data';

import authProvider from './../../core/AuthenticationProvider';
import { setUserInfo } from '../app/reducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from '../common/alert-template';
import Modal from '../common/securities-firms';
import IntroModal from '../common/intro-modal';

const options = {
  timeout: 10000,
  position: positions.BOTTOM_LEFT,
  transitions: transitions.SCALE,
  containerStyle: {
    zIndex: 9999999,
    maxHeight: 435,
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'hidden',
  },
};

const objComponent = {
  MarketInDepth,
  Watchlist,
  TopVolume,
  TopValue,
  TopBreakout,
  TopGainers,
  TopLosers,
  TopNewHigh,
  TopNewLow,
  TopForeignTrade,
  MoneyFlow,
  MarketCalendar,
  HeatMap,
  TimeAndSales,
  PriceData,
  PriceDepth,
  TASignals,
  Charting,
  FinancialAnalysis,
  Ownership,
  FADividendAnalysis,
  FinancialStatement,
  FASnapshot,
  News,
  Alerts,
  Screener,
  ConsensusAnalysis,
  Valuation,
  STRanking,
  Strategy,
  TradeData,
};

class Desktop extends Component {
  constructor(props) {
    super(props);

    //TODO authProvider
    //   .getUser()
    //   .then(user => {
    //     if (!user || user.expired) {
    //       alert('Your login session is expired! Please login again.');
    //       window.location = '/';
    //     }
    //   })
    //   .catch(e => {
    //     window.location = '/';
    //   });

    this.listComponent = {};
    widgetConfig.forEach(item => {
      item.list.forEach(item2 => {
        this.listComponent[item2.name] = React.createRef();
      });
    });
  }

  componentDidMount() {
    const listComponentTitle = I18n.t('common.listComponent');

    widgetConfig.forEach(item => {
      item.list.forEach(({ name }) => {
        const component = {
          name,
          component: objComponent[name],
          title: listComponentTitle[name],
          tooltip: listComponentTitle[name],
        };

        LayoutHelper.register(component);
        LayoutHelper.drag(this.listComponent[name].current, component);
      });
    });

    const { setUserInfo } = this.props;
    authProvider.getUser().then(user => {
      if (user) {
        setUserInfo(user);
      }
    });
  }

  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <MainLayout {...this.listComponent}>
          <GoldenLayoutWrapper store={this.props.store}/>
          <Modal />
          <IntroModal />
        </MainLayout>
      </AlertProvider>
    );
  }
}

const mapDispatchToProps = {
  setUserInfo,
};

Desktop.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Desktop);
