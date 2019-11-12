import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import TabFilter from '../../../../common/tab-filter';
import {
  cancelfetchDataPressing,
  fetchDataPressing,
  subscribeRealtimeTickPressing,
} from '../reducer';
import { SimpleTooltip } from '../../../../common/tooltip';
import Const from './Const';
import Table from './Table';
import { formatTextFloat } from '../../../../helpers/Text';
class Pressing extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAvgVolume: 1,
      currentOrder: 3,
      currentProportion: 1,
    };
  }

  componentDidMount() {
    const { fetchDataPressing } = this.props;
    fetchDataPressing(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterOrder[this.state.currentOrder].text,
      Const.filterProportion[this.state.currentProportion],
    );
    MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataPressing } = this.props;
    cancelfetchDataPressing();
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickPressing } = this.props;
    subscribeRealtimeTickPressing(data);
  };

  changeAvgVolume = currentAvgVolume => {
    this.setState({ ...this.state, currentAvgVolume });
    const { fetchDataPressing } = this.props;
    fetchDataPressing(
      Const.filterAvgVolume[currentAvgVolume],
      Const.filterOrder[this.state.currentOrder].text,
      Const.filterProportion[this.state.currentProportion],
    );
  };

  changeOrder = currentOrder => {
    this.setState({ ...this.state, currentOrder });
    const { fetchDataPressing } = this.props;
    fetchDataPressing(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterOrder[currentOrder].text,
      Const.filterProportion[this.state.currentProportion],
    );
  };

  changeProportion = currentProportion => {
    this.setState({ ...this.state, currentProportion });
    const { fetchDataPressing } = this.props;
    fetchDataPressing(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterOrder[this.state.currentOrder].text,
      Const.filterProportion[currentProportion],
    );
  };

  render() {
    return (
      <div className="h-100">
        <div>
          <div className="mb-20">
            <span>{I18n.t('tasignals.pressingContent.line_1')} </span>
            <SimpleTooltip
              position={'right'}
              message={I18n.t('tasignals.pressingContent.tooltipContent')}
            >
              <i className="icon-info icon-infor-name-of-feature fs-10" />
            </SimpleTooltip>
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2">
              {I18n.t('tasignals.pressingContent.line_2')}
            </span>
            <TabFilter
              currentTab={this.state.currentAvgVolume}
              listTab="tasignals.filterAvgVolume"
              changeTab={this.changeAvgVolume}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2">
              {I18n.t('tasignals.pressingContent.line_3')}
            </span>
            <TabFilter
              currentTab={this.state.currentOrder}
              listTab="tasignals.filterPressingOrderType"
              changeTab={this.changeOrder}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-2">
              {I18n.t('tasignals.pressingContent.line_4')}
            </span>
            <TabFilter
              currentTab={this.state.currentProportion}
              listTab="tasignals.filterProportion"
              changeTab={this.changeProportion}
            />
          </div>
          <div>
            <span className="light-text">
              {I18n.t('tasignals.pressingContent.line_5.part_1')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.pressingContent.line_5.part_2')}
              {formatTextFloat(
                Number(Const.filterAvgVolume[this.state.currentAvgVolume]),
                0,
              )}
            </span>
            <span className="light-text">
              {' '}
              {I18n.t('tasignals.pressingContent.line_5.part_3')}
            </span>
            <span className="bold-text">
              {I18n.t(Const.filterOrder[this.state.currentOrder].quote)}
              {Const.filterProportion[this.state.currentProportion] *
                100} %{' '}
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
    fetchDataPressing: (currentAvgVolume, currentOrder, currentProportion) =>
      dispatch(
        fetchDataPressing(currentAvgVolume, currentOrder, currentProportion),
      ),
    cancelfetchDataPressing: () => dispatch(cancelfetchDataPressing()),
    subscribeRealtimeTickPressing: data =>
      dispatch(subscribeRealtimeTickPressing(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pressing);
