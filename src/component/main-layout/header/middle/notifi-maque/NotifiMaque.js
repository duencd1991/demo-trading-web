import React, { Component } from 'react';
import MalarqueeContent from './MalarqueeContent';
import { fetchListTable, subscribeRealtimeData } from './reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRealtime from './../../../../common/withRealtime';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
class NotifiMaque extends Component {
  componentDidMount() {
    const { fetchListTable } = this.props;
    fetchListTable(999999, 1);
  }
  render() {
    return (
      <div className="notifi-maque-wrap w-100-150px float-left">
        <div className="notifi-maque">
          <div className="action-button">
            <button type="button">
              <i className="icon-caret-left" />
            </button>
            <button type="button">
              <i className="icon-pause" />
            </button>
            <button type="button">
              <i className="icon-caret-right" />
            </button>
          </div>
          <div className="content-maque">
            <MalarqueeContent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  subscribeRealtimeData,
  fetchListTable,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRealtime(ChanelConfig.IndexChannel, 'subscribeRealtimeData'),
)(NotifiMaque);
