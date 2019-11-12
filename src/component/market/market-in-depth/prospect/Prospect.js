import React, { Component } from 'react';
import { mapTabTime, tabs } from './Const';
import ProspectSummary from './ProspectSummary';
import Tab from '../../../common/tab-timer';
import Content from './Content';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchListProspect,
  REDUCER_NAME,
  subscribeRealtimeTickListProspect,
} from './reducer';
//TODO import MessageHub from '../../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
import './prospect.scss';

class Prospect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: tabs.weekly,
      heightContent: null,
    };
  }

  changeTab = currentTab => {
    this.setState({ ...this.state, currentTab });
  };

  componentDidMount() {
    this.props.dispatch(fetchListProspect());
    //TODO MessageHub.subscribe(ChanelConfig.IndexChannel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    //TODO MessageHub.unsubscribe(
    //   ChanelConfig.IndexChannel,
    //   this.dispatchDataRealtime,
    // );
  }

  dispatchDataRealtime = data => {
    const { dispatch } = this.props;
    dispatch(subscribeRealtimeTickListProspect(data));
  };

  hasData = () => {
    const { listProspectData } = this.props;
    return (
      listProspectData.heatMap &&
      listProspectData.heatMap.heatmaps &&
      Array.isArray(listProspectData.heatMap.heatmaps)
    );
  };

  getHeatMapByTimeRange = () => {
    const { currentTab } = this.state;
    const { listProspectData } = this.props;

    return listProspectData.heatMap.heatmaps.find(
      item => item.timeRange === mapTabTime[currentTab],
    );
  };

  formatDate = date => {
    return moment(date).format('l');
  };

  getTimeRange = () => {
    const { currentTab } = this.state;
    const { listProspectData } = this.props;
    const endDate = this.formatDate(
      listProspectData.heatMap.heatmaps.find(
        item => item.timeRange === mapTabTime[tabs.daily],
      ),
    );

    const startDate = this.formatDate(
      listProspectData.heatMap.heatmaps.find(
        item => item.timeRange === mapTabTime[currentTab],
      ),
    );

    return `${startDate} - ${endDate}`;
  };

  render() {
    const { currentTab } = this.state;
    const { listProspectData } = this.props;

    return (
      <div className="prospect-layout">
        <div className="d-flex">
          <div className="w-185px">
            <div className="">
              <ProspectSummary />
            </div>
          </div>

          <div className="w-100-185px">
            <div className="top-nav market-in-depth-tabs">
              <Tab
                disableTabNormal={true}
                currentTab={currentTab}
                listTab="marketInDepthProspect.tab"
                changeTab={this.changeTab}
              />
              <div className="prospect-content">
                {this.hasData() && (
                  <Content
                    timeTab={mapTabTime[currentTab]}
                    listProspectData={listProspectData}
                    key={currentTab}
                    heatMap={this.getHeatMapByTimeRange()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listProspectData: state[REDUCER_NAME].listProspectData,
    component: state[REDUCER_NAME].component,
  };
};

export default connect(mapStateToProps)(Prospect);
