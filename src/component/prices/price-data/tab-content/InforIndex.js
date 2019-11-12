import React from 'react';
import IndexSumary from './../top-content/index-summary';
import GroupButton from './../top-content/group-button';
import IndexInfor from './../top-content/index-infor';
import { connect } from 'react-redux';
import SearchBox from './searchPriceData/SearchBox';
import {
  fetchListSearch,
  REDUCER_NAME,
  subscribeRealtimeTick,
} from './../reducer';
import MessageHub from '../../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../../configs/GlobalConfig';

class InfoIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchListSearch());
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
    const { id, listMultiComponent, dispatch } = this.props;
    if (!Object.keys(listMultiComponent).length || !listMultiComponent[id]) {
      return;
    }
    const data = payload.find(
      item => item.organCode === listMultiComponent[id].currentSearch.code,
    );
    if (!data) {
      return;
    }
    dispatch(subscribeRealtimeTick(data, id));
  };

  render() {
    const { id, listMultiComponent } = this.props;
    let indexSumanyToProp = {};
    let indexSumary = {};
    let indexSumaryRealTime = {};
    if (id in listMultiComponent) {
      indexSumary = listMultiComponent[id].indexSumary;
      indexSumaryRealTime = listMultiComponent[id].indexSumaryRealTime;
    }
    const isRealTime =
      Object.keys(indexSumaryRealTime).length &&
      indexSumary.organCode === indexSumaryRealTime.organCode;
    if (isRealTime) {
      indexSumanyToProp = indexSumaryRealTime;
    } else {
      indexSumanyToProp = indexSumary;
    }

    return (
      <>
        <SearchBox id={this.props.id} />
        <div className="left-info-widget__metas ml-20">
          <IndexSumary
            id={this.props.id}
            indexSumaryRealTime={indexSumanyToProp}
            isRealTime={isRealTime}
          />
        </div>
        <IndexInfor id={this.props.id} />
        <GroupButton id={this.props.id} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
  };
};

export default connect(mapStateToProps)(InfoIndex);
