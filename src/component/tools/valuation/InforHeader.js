import React, { Component } from 'react';
import {
  REDUCER_NAME,
  subscribeRealtimeTick,
  fetchInfoTicker,
  fetchCompanyScore,
} from './reducer';
import { connect } from 'react-redux';
import GroupButton from './inforHeader/group-button';
import ScoreBox from './inforHeader/score-box';
import Notice from './inforHeader/notifications';
import SearchBox from './inforHeader/search-box/SearchBox';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../configs/GlobalConfig';

class InforHeader extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchInfoTicker());
    dispatch(fetchCompanyScore());
    MessageHub.subscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  componentWillUnmount() {
    MessageHub.unsubscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  dispatchDataRealtimeTick = payload => {
    const { currentSearch, dispatch } = this.props;
    const data = payload.find(item => item.ticker === currentSearch.code);
    if (!data) {
      return;
    }
    dispatch(subscribeRealtimeTick(data));
  };

  render() {
    return (
      <>
        <SearchBox />
        <ScoreBox />
        <GroupButton />
        <Notice />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentSearch: state[REDUCER_NAME].currentSearch,
  };
};

export default connect(mapStateToProps)(InforHeader);
