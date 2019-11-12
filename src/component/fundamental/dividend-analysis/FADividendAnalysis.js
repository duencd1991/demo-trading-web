import React, { Component } from 'react';
import Chart from './Chart';
import {
  fetchAnalysis,
  fetchCompanyScore,
  fetchListTicker,
  setUpData,
  subscribeRealtimeTick,
  fetchLastprice,
} from './reducer';
import FADividendTab from './FADividendTab';
import { connect } from 'react-redux';
import GroupButton from './../common/header/group-button';
import ScoreBox from './ScoreBox';
import './FADividendAnalysis.scss';
import Const from './Const';
import Search from './search/Search';
import ScrollComponent from './../../common/ScrollComponent';
import { Provider } from './../../common/ComponentIdContext';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';
import { compose } from 'redux';

class FADividendAnalysis extends Component {
  componentDidMount() {
    const {
      id,
      fetchListTicker,
      fetchAnalysis,
      fetchCompanyScore,
      fetchLastprice,
    } = this.props;

    fetchListTicker();
    fetchAnalysis(Const.codeDefault, id);
    fetchLastprice(Const.codeDefault, id);
    fetchCompanyScore(Const.codeDefault, id);

    MessageHub.subscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  dispatchDataRealtimeTick = data => {
    const { subscribeRealtimeTick, id } = this.props;
    subscribeRealtimeTick(data, id);
  };

  componentWillUnmount() {
    MessageHub.unsubscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  render() {
    const { id } = this.props;
    return (
      <Provider value={id}>
        <ScrollComponent>
          <div className="dividend-analysis-wrapper pt-8 pl-20 pr-20">
            <div className="da-top-content">
              <Search />
              <ScoreBox />
              <GroupButton />
            </div>
            <div className="cast-chart mt-8">
              <Chart />
            </div>
            <FADividendTab />
          </div>
        </ScrollComponent>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

const mapDispatchToProps = {
  fetchAnalysis,
  fetchListTicker,
  fetchCompanyScore,
  subscribeRealtimeTick,
  fetchLastprice,
};

export default compose(
  withPreRender(ConstCommon.listComponent.FADividendAnalysis),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FADividendAnalysis);
