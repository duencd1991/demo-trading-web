import React from 'react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import IndicatorsTable from './IndicatorsTable';
import {
  REDUCER_NAME,
  fetchListIndicators,
  subscribeRealtimeTick,
} from './reducer';
import MessageHub from '../../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
import ConstIn from './Const';

class Indicators extends React.Component {
  componentDidMount() {
    this.props.fetchListIndicators();
    // this.props.fetchListSearch();
    MessageHub.subscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      this.props.fetchListIndicators();
    }
  }

  dispatchDataRealtimeTick = data => {
    const { subscribeRealtimeTick, indexDataById } = this.props;
    if (typeof indexDataById !== 'undefined') {
      subscribeRealtimeTick(data);
    }
  };

  componentWillUnmount() {
    MessageHub.unsubscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  render() {
    return (
      <div className="tab-content">
        <div className="pd-top-navigation--right pd-top-navigation--right-indica">
          <a
            href={ConstIn.linkPDF}
            className="btn btn-cus-nomal bg-b-color-3"
            target="_blank"
          >
            <i className="icon-printer-tool" />{' '}
            {I18n.t('tasignals.methodology')}
          </a>
        </div>
        <div className="tab-pane active" id="m_tabs_2_1" role="tabpanel">
          <div className="data-table-wrap mt-10">
            <div className="content-scroll-table">
              <IndicatorsTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  indexDataById: state[REDUCER_NAME].indexDataById,
  id: state[REDUCER_NAME].id,
});

const mapDispatchToProps = {
  fetchListIndicators,
  subscribeRealtimeTick,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Indicators);
