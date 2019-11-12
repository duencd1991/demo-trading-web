import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withMarketPreOpen from '../../common/market-pre-open/withMarketPreOpen';
import ScrollComponent from '../../common/ScrollComponent';
import Footer from '../../common/table/Footer';
import Tab from '../../common/tab';
import withPreRender from '../../common/withPreRender';
import {
  CRITERIAS,
  EXCHANGES,
  mapCriteria,
  mapExchange,
  CurrentCriteriaContext,
} from './Const';
import {
  fetchHeatMap,
  fetchHeatMapSuccess,
  REDUCER_NAME,
  setTopTen,
} from './reducer';
import { ChanelConfig } from './../../../configs/GlobalConfig';
import TabContent from './TabContent';
import messageHub from '../../../core/signalr/SignalrMessageHub';
import './heatmap.scss';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';

class HeatMap extends PureComponent {
  state = {
    currentExchange: EXCHANGES.ALL,
    currentCriteria: CRITERIAS.MARKET_CAP,
  };

  componentDidMount() {
    const { currentExchange, currentCriteria } = this.state;
    this.getHeatMap();
    this.subscribe(currentExchange, currentCriteria);
    messageHub.subscribe(ChanelConfig.TickChanel, this.onReceiveTickers);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentCriteria, currentExchange } = this.state;
    const { locale } = this.props;
    if (
      currentCriteria !== prevState.currentCriteria ||
      currentExchange !== prevState.currentExchange
    ) {
      this.getHeatMap();
      this.unsubscribe(prevState.currentExchange, prevState.currentCriteria);
      this.subscribe(currentExchange, currentCriteria);
    }

    if (locale !== prevProps.locale) {
      this.getHeatMap();
    }
  }

  componentWillUnmount() {
    const { currentCriteria, currentExchange } = this.state;
    this.unsubscribe(currentExchange, currentCriteria);
    messageHub.unsubscribe(ChanelConfig.TickChanel, this.onReceiveTickers);
  }

  getChannelName = (exchange, criteria) => {
    return `${ChanelConfig.HeatMapChanelPrefix}${exchange}${criteria}`;
  };

  subscribe = (exchange, criteria) => {
    messageHub.subscribe(
      this.getChannelName(mapExchange[exchange], mapCriteria[criteria]),
      this.onReceiveHeatMap,
    );
  };

  unsubscribe = (exchange, criteria) => {
    messageHub.unsubscribe(
      this.getChannelName(mapExchange[exchange], mapCriteria[criteria]),
      this.onReceiveHeatMap,
    );
  };

  onReceiveTickers = tickers => {
    const { setTopTen } = this.props;
    setTopTen(tickers);
  };

  onReceiveHeatMap = heatMapData => {
    const { fetchHeatMapSuccess } = this.props;
    fetchHeatMapSuccess({
      data: heatMapData.sectors,
    });
  };

  getHeatMap = () => {
    const { currentCriteria, currentExchange } = this.state;
    const { fetchHeatMap } = this.props;
    if (this.source) {
      this.source.cancel();
      this.source = null;
    }
    this.source = fetchHeatMap({
      Exchange: mapExchange[currentExchange],
      Creiteria: mapCriteria[currentCriteria],
    });
  };

  changeExchange = exchange => {
    this.setState({
      currentExchange: exchange,
    });
  };

  changeCriteria = criteria => {
    this.setState({
      currentCriteria: criteria,
    });
  };

  render() {
    const { currentExchange, currentCriteria } = this.state;
    return (
      <ScrollComponent>
        <CurrentCriteriaContext.Provider value={currentCriteria}>
          <div className="p-10 pl-20 pr-20 h-100 heat-map-wrapper d-flex flex-column">
            <div className="top-nav d-flex flex-column flex-fill">
              <Tab
                currentTab={currentExchange}
                listTab="heatmap.tab"
                changeTab={this.changeExchange}
              />
              <div className="flex-fill d-flex flex-column mb-20">
                <TabContent
                  changeCriteria={this.changeCriteria}
                  currentCriteria={currentCriteria}
                />
              </div>

              <div className="tab-pane active">
                <Footer />
              </div>
            </div>
          </div>
        </CurrentCriteriaContext.Provider>
      </ScrollComponent>
    );
  }
}

HeatMap.propTypes = {
  sectors: PropTypes.array.isRequired,
  fetchHeatMap: PropTypes.func.isRequired,
  fetchHeatMapSuccess: PropTypes.func.isRequired,
  setTopTen: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  sectors: state[REDUCER_NAME].sectors,
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  fetchHeatMap,
  fetchHeatMapSuccess,
  setTopTen,
};

export default compose(
  withPreRender(ConstCommon.listComponent.HeatMap),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withMarketPreOpen(),
)(HeatMap);
