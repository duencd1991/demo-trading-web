import React from 'react';
import { connect } from 'react-redux';
import TabFilter from '../../../../common/tab-filter';
import {
  fetchDataAggressive,
  cancelfetchDataAggressive,
  subscribeRealtimeTickAggressive,
} from '../reducer';
import Const from './Const';
import Table from './Table';
import { I18n } from 'react-redux-i18n';
import { SimpleTooltip } from '../../../../common/tooltip';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import { formatTextFloat } from '../../../../helpers/Text';

class Aggressive extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAvgVolume: 3,
      currentOrderType: 2,
      currentTotalBuSd: 1,
    };
  }

  componentDidMount() {
    const { fetchDataAggressive } = this.props;
    fetchDataAggressive(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterTotalBuSd[this.state.currentTotalBuSd],
      Const.filterOrderType[this.state.currentOrderType].text,
    );
    MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataAggressive } = this.props;
    cancelfetchDataAggressive();
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickAggressive } = this.props;
    subscribeRealtimeTickAggressive(data);
  };

  changeAvgVolume = currentAvgVolume => {
    this.setState({ ...this.state, currentAvgVolume });
    const { fetchDataAggressive } = this.props;
    fetchDataAggressive(
      Const.filterAvgVolume[currentAvgVolume],
      Const.filterTotalBuSd[this.state.currentTotalBuSd],
      Const.filterOrderType[this.state.currentOrderType].text,
    );
  };

  changeTotalBuSd = currentTotalBuSd => {
    this.setState({ ...this.state, currentTotalBuSd });
    const { fetchDataAggressive } = this.props;
    fetchDataAggressive(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterTotalBuSd[currentTotalBuSd],
      Const.filterOrderType[this.state.currentOrderType].text,
    );
  };

  changeOrderType = currentOrderType => {
    this.setState({ ...this.state, currentOrderType });
    const { fetchDataAggressive } = this.props;
    fetchDataAggressive(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterTotalBuSd[this.state.currentTotalBuSd],
      Const.filterOrderType[currentOrderType].text,
    );
  };

  render() {
    return (
      <div className="h-100">
        <div>
          <div className="mb-20">
            <span>{I18n.t('tasignals.aggressiveContent.line_1')} </span>
            <SimpleTooltip
              position={'right'}
              message={I18n.t('tasignals.aggressiveContent.tooltipContent')}
            >
              <i className="icon-info icon-infor-name-of-feature fs-10" />
            </SimpleTooltip>
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2">
              {I18n.t('tasignals.aggressiveContent.line_2')}
            </span>
            <TabFilter
              currentTab={this.state.currentAvgVolume}
              listTab="tasignals.filterAvgVolume"
              changeTab={this.changeAvgVolume}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2">
              {I18n.t('tasignals.aggressiveContent.line_3')}
            </span>
            <TabFilter
              currentTab={this.state.currentOrderType}
              listTab="tasignals.filterOrderType"
              changeTab={this.changeOrderType}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2"> </span>
            <TabFilter
              currentTab={this.state.currentTotalBuSd}
              listTab="tasignals.filterVolumeBU_SD"
              changeTab={this.changeTotalBuSd}
            />
          </div>
          <div>
            <span className="light-text">
              {I18n.t('tasignals.aggressiveContent.line_4.part_1')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.aggressiveContent.line_4.part_2')}
              {formatTextFloat(
                Number(Const.filterAvgVolume[this.state.currentAvgVolume]),
                0,
              )}
            </span>
            <span className="light-text">
              {I18n.t('tasignals.aggressiveContent.line_4.part_3')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.aggressiveContent.line_4.part_4')}
              {Const.filterOrderType[this.state.currentOrderType].quote}
              {Const.filterTotalBuSd[this.state.currentTotalBuSd]}
              {I18n.t('tasignals.aggressiveContent.line_4.part_5')}
            </span>
          </div>
        </div>
        <div className="mt-20">
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDataAggressive: (currentAvgVolume, totalBuSd, orderType) =>
      dispatch(fetchDataAggressive(currentAvgVolume, totalBuSd, orderType)),
    cancelfetchDataAggressive: () => dispatch(cancelfetchDataAggressive()),
    subscribeRealtimeTickAggressive: data =>
      dispatch(subscribeRealtimeTickAggressive(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aggressive);
