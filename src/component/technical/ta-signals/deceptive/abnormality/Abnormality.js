import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
//TODO import MessageHub from '../../../../../core/signalr/SignalrMessageHub';
import TabFilter from '../../../../common/tab-filter';
import {
  cancelfetchDataAbnormality,
  fetchDataAbnormality,
  subscribeRealtimeTickAbnormality,
} from '../reducer';
import { SimpleTooltip } from '../../../../common/tooltip';
import Const from './Const';
import Table from './Table';
import { formatTextFloat } from '../../../../helpers/Text';

class Abnormality extends React.Component {
  constructor() {
    super();
    this.state = {
      currentType: 1,
      currentAvgVolume: 3,
      currentRate: 2,
    };
  }

  componentDidMount() {
    const { fetchDataAbnormality } = this.props;
    fetchDataAbnormality(
      Const.filterAbnormalityType[this.state.currentType].text,
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterRate[this.state.currentRate],
    );
    //TODO MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentWillUnmount() {
    const { cancelfetchDataAbnormality } = this.props;
    cancelfetchDataAbnormality();
    //TODO MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTickAbnormality } = this.props;
    subscribeRealtimeTickAbnormality(data);
  };

  changeType = currentType => {
    this.setState({ ...this.state, currentType });
    const { fetchDataAbnormality } = this.props;
    fetchDataAbnormality(
      Const.filterAbnormalityType[currentType].text,
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterRate[this.state.currentRate],
    );
  };

  changeAvgVolume = currentAvgVolume => {
    this.setState({ ...this.state, currentAvgVolume });
    const { fetchDataAbnormality } = this.props;
    fetchDataAbnormality(
      Const.filterAbnormalityType[this.state.currentType].text,
      Const.filterAvgVolume[currentAvgVolume],
      Const.filterRate[this.state.currentRate],
    );
  };

  changeRate = currentRate => {
    this.setState({ ...this.state, currentRate });
    const { fetchDataAbnormality } = this.props;
    fetchDataAbnormality(
      Const.filterAbnormalityType[this.state.currentType].text,
      Const.filterAvgVolume[this.state.currentAvgVolume],
      Const.filterRate[currentRate],
    );
  };

  render() {
    return (
      <div className="h-100">
        <div>
          <div className="mb-20">
            <span>{I18n.t('tasignals.abnormalityContent.line_1')} </span>
            <SimpleTooltip
              position={'right'}
              message={I18n.t('tasignals.abnormalityContent.tooltipContent')}
            >
              <i className="icon-info icon-infor-name-of-feature fs-10" />
            </SimpleTooltip>
          </div>
          <div className="list-filter top-nav">
            <span className="left-label">
              {I18n.t('tasignals.abnormalityContent.line_2')}
            </span>
            <TabFilter
              currentTab={this.state.currentType}
              listTab="tasignals.filterAbnormalityType"
              changeTab={this.changeType}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label">
              {I18n.t('tasignals.abnormalityContent.line_3')}
            </span>
            <TabFilter
              currentTab={this.state.currentAvgVolume}
              listTab="tasignals.filterAvgVolume"
              changeTab={this.changeAvgVolume}
            />
          </div>
          <div className="list-filter top-nav">
            <span className="left-label">
              {I18n.t('tasignals.abnormalityContent.line_4.part_1')}
              <small>
                {I18n.t('tasignals.abnormalityContent.line_4.part_2')}
              </small>
            </span>
            <TabFilter
              currentTab={this.state.currentRate}
              listTab="tasignals.filterRate"
              changeTab={this.changeRate}
            />
          </div>
          <div>
            <span className="light-text">
              {I18n.t('tasignals.abnormalityContent.line_5.part_1')}
            </span>
            <span className="bold-text">
              {I18n.t(
                Const.filterAbnormalityType[this.state.currentType].quote,
              )}
            </span>
            <span className="light-text">
              {I18n.t('tasignals.abnormalityContent.line_5.part_2')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.abnormalityContent.line_5.part_3')}
            </span>
            <span className="bold-text">
              {formatTextFloat(
                Number(Const.filterAvgVolume[this.state.currentAvgVolume]),
                0,
              )}
            </span>
            <span className="light-text">
              {I18n.t('tasignals.abnormalityContent.line_5.part_4')}
            </span>
            <span className="bold-text">
              {I18n.t('tasignals.abnormalityContent.line_5.part_5')}
              {Const.filterRate[this.state.currentRate]}
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
    fetchDataAbnormality: (currentType, currentAvgVolume, currentRate) =>
      dispatch(
        fetchDataAbnormality(currentType, currentAvgVolume, currentRate),
      ),
    cancelfetchDataAbnormality: () => dispatch(cancelfetchDataAbnormality()),
    subscribeRealtimeTickAbnormality: data =>
      dispatch(subscribeRealtimeTickAbnormality(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Abnormality);
