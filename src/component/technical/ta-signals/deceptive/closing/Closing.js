import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import TabFilter from '../../../../common/tab-filter';
import {
  cancelfetchDataClosing,
  fetchDataClosing,
  subscribeRealtimeTickClosing,
} from '../reducer';
import { SimpleTooltip } from '../../../../common/tooltip';
import Const from './Const';
import Table from './Table';
import { formatTextFloat } from '../../../../helpers/Text';
class Closing extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAvgVolume: 1,
      currentPercent: 4,
    };
  }

  componentDidMount() {
    const { fetchDataClosing } = this.props;
    fetchDataClosing(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterExceedPercent[this.state.currentPercent],
    );
    MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataClosing } = this.props;
    cancelfetchDataClosing();
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickClosing } = this.props;
    subscribeRealtimeTickClosing(data);
  };

  changeAvgVolume = currentAvgVolume => {
    this.setState({ ...this.state, currentAvgVolume });
    const { fetchDataClosing } = this.props;
    fetchDataClosing(
      Const.filterAvgVolume[currentAvgVolume],
      Const.filterExceedPercent[this.state.currentPercent],
    );
  };

  changeExceedPercent = currentPercent => {
    this.setState({ ...this.state, currentPercent });
    const { fetchDataClosing } = this.props;
    fetchDataClosing(
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterExceedPercent[currentPercent],
    );
  };

  render() {
    return (
      <div className="h-100">
        <div>
          <div className="mb-20">
            <span>{I18n.t('tasignals.closingContent.line_1')} </span>
            <SimpleTooltip
              position={'right'}
              message={I18n.t('tasignals.closingContent.tooltipContent')}
            >
              <i className="icon-info icon-infor-name-of-feature fs-10" />
            </SimpleTooltip>
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-3">
              {I18n.t('tasignals.closingContent.line_2')}
            </span>
            <TabFilter
              currentTab={this.state.currentAvgVolume}
              listTab="tasignals.filterAvgVolume"
              changeTab={this.changeAvgVolume}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label-3">
              {I18n.t('tasignals.closingContent.line_3.part_1')}
              <br />
              <small>{I18n.t('tasignals.closingContent.line_3.part_2')}</small>
            </span>
            <TabFilter
              currentTab={this.state.currentPercent}
              listTab="tasignals.filterExceedPercent"
              changeTab={this.changeExceedPercent}
            />
          </div>
          <div>
            <span className="light-text">
              {I18n.t('tasignals.closingContent.line_4.part_1')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.closingContent.line_4.part_2')}
            </span>
            <span className="bold-text">
              {formatTextFloat(
                Number(Const.filterAvgVolume[this.state.currentAvgVolume]),
                0,
              )}
              {I18n.t('tasignals.closingContent.line_4.part_3')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.closingContent.line_4.part_4')}
              {Const.filterExceedPercent[this.state.currentPercent] * 100}
              {I18n.t('tasignals.closingContent.line_4.part_5')}
            </span>
            <span className="light-text">
              {I18n.t('tasignals.closingContent.line_4.part_6')}
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
    fetchDataClosing: (currentAvgVolume, currentPercent) =>
      dispatch(fetchDataClosing(currentAvgVolume, currentPercent)),
    cancelfetchDataClosing: () => dispatch(cancelfetchDataClosing()),
    subscribeRealtimeTickClosing: data =>
      dispatch(subscribeRealtimeTickClosing(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Closing);
