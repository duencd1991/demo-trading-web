import React from 'react';
import { connect } from 'react-redux';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import DropDownWatchList from '../DropDownWatchList';
import {
  fetchMyWatchList,
  cancelfetchDataOverview,
  subscribeRealtimeTickDeceptive,
} from '../reducer';
import { REDUCER_NAME } from '../../../../market/watchlist/reducer';
import Table from './Table';

class Overview extends React.Component {
  componentDidMount() {
    const { fetchMyWatchList, watchListId } = this.props;
    fetchMyWatchList(watchListId);
    MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataOverview } = this.props;
    cancelfetchDataOverview();
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickDeceptive } = this.props;
    subscribeRealtimeTickDeceptive(data);
  };

  render() {
    return (
      <>
        <div className="deceptive-dropdown mb-20 ">
          <DropDownWatchList />
        </div>
        <Table />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    watchListId: state[REDUCER_NAME].watchListId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMyWatchList: watchListId => dispatch(fetchMyWatchList(watchListId)),
    cancelfetchDataOverview: () => dispatch(cancelfetchDataOverview()),
    subscribeRealtimeTickDeceptive: data =>
      dispatch(subscribeRealtimeTickDeceptive(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
