import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import TabFilter from '../../../../common/tab-filter';
import {
  cancelfetchDataCancelled,
  fetchDataCancelled,
  subscribeRealtimeTickCancelled,
} from '../reducer';
import { SimpleTooltip } from '../../../../common/tooltip';
import Const from './Const';
import Table from './Table';
import { formatTextFloat } from '../../../../helpers/Text';
class Cancelled extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAvgVolume: 3,
    };
  }

  componentDidMount() {
    const { fetchDataCancelled } = this.props;
    fetchDataCancelled(Const.filterAvgVolume[this.state.currentAvgVolume]);
    MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataCancelled } = this.props;
    cancelfetchDataCancelled();
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickCancelled } = this.props;
    subscribeRealtimeTickCancelled(data);
  };

  changeAvgVolume = currentAvgVolume => {
    this.setState({ ...this.state, currentAvgVolume });
    const { fetchDataCancelled } = this.props;
    fetchDataCancelled(Const.filterAvgVolume[currentAvgVolume]);
  };

  render() {
    return (
      <div className="h-100">
        <div>
          <div className="mb-20">
            <span>{I18n.t('tasignals.cancelledContent.line_1')} </span>
            <SimpleTooltip
              position={'right'}
              message={I18n.t('tasignals.cancelledContent.tooltipContent')}
            >
              <i className="icon-info icon-infor-name-of-feature fs-10" />
            </SimpleTooltip>
          </div>
          <div className="list-filter top-nav">
            <span className="mr-10">
              {I18n.t('tasignals.cancelledContent.line_2')}{' '}
            </span>
            <TabFilter
              currentTab={this.state.currentAvgVolume}
              listTab="tasignals.filterAvgVolume"
              changeTab={this.changeAvgVolume}
            />
          </div>
          <div>
            <span className="light-text">
              {I18n.t('tasignals.cancelledContent.line_3.part_1')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.cancelledContent.line_3.part_2')}
              {formatTextFloat(
                Number(Const.filterAvgVolume[this.state.currentAvgVolume]),
                0,
              )}
            </span>
            <span className="light-text">
              {I18n.t('tasignals.cancelledContent.line_3.part_3')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.cancelledContent.line_3.part_4')}
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
    fetchDataCancelled: currentAvgVolume =>
      dispatch(fetchDataCancelled(currentAvgVolume)),
    cancelfetchDataCancelled: () => dispatch(cancelfetchDataCancelled()),
    subscribeRealtimeTickCancelled: data =>
      dispatch(subscribeRealtimeTickCancelled(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cancelled);
