import React, { Component } from 'react';
import {
  fetchListSearch,
  REDUCER_NAME,
  subscribeRealtimeTick,
  fetchInfoTicker,
  fetchCompanyScore,
} from './reducer';
import { connect } from 'react-redux';
import GroupButton from '../common/header/group-button';
import ScoreBox from './inforHeader/score-box';
import Notice from './inforHeader/notifications';
import SearchBox from './inforHeader/search-box/SearchBox';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../configs/GlobalConfig';

class InforHeader extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    //dispatch(fetchListSearch());
    dispatch(fetchInfoTicker(id));
    dispatch(fetchCompanyScore(id));
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
    const { currentSearch, dispatch, id } = this.props;
    const data = payload.find(item => item.organCode === currentSearch.code);
    if (!data) {
      return;
    }
    dispatch(subscribeRealtimeTick(data, id));
  };

  render() {
    const { id } = this.props;
    return (
      <>
        <SearchBox id={id} />
        <ScoreBox id={id} />
        <GroupButton />
        <Notice id={id} />
      </>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    currentSearch: state[REDUCER_NAME].listMultiComponent[id].currentSearch,
  };
};

export default connect(mapStateToProps)(InforHeader);
