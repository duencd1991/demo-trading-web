import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { subscribeRealtimeData, REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
//TODO import { useAlert } from 'react-alert';
//TODO import withRealtime from './../../../../common/withRealtime';
//TODO import { ChanelConfig } from '../../../../../configs/GlobalConfig';
//TODO import messageHub from '../../../../../core/signalr/SignalrMessageHub';
import Alert from './Alerts';
import moment from 'moment';

const KEY_PREV_DELAY = 'PrevDelay';
const KEY_PREV_TIME = 'PrevDelayTime';
class SubscribeAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    this.subscribe();
    this.unsubscribe();
    localStorage.removeItem(KEY_PREV_TIME);
    localStorage.removeItem(KEY_PREV_DELAY);
    localStorage.setItem(KEY_PREV_TIME, moment());
    localStorage.setItem(KEY_PREV_DELAY, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    const { lstAlertGroupChanel } = this.props;
    const lstAlertGroupPrev = prevProps ? prevProps.lstAlertGroupChanel : [];
    if (!_.isEqual(lstAlertGroupChanel, lstAlertGroupPrev)) {
      this.subscribe();
      this.unsubscribe();
    }
    const alertDataPrev = prevProps ? prevProps.alertData : [];
    const now = moment();
    if (!_.isEqual(this.props.alertData, alertDataPrev)) {
      let delay = parseInt(localStorage.getItem(KEY_PREV_DELAY));
      let time = localStorage.getItem(KEY_PREV_TIME);
      let timeTmp = moment(time);
      const timeAgo = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(timeTmp, 'DD/MM/YYYY HH:mm:ss'),
      );
      if (timeAgo > 10000 || delay > 10000) {
        delay = 0;
        time = now;
        localStorage.setItem(KEY_PREV_DELAY, 0);
        localStorage.setItem(KEY_PREV_TIME, time);
      } else {
        delay += 1000;
        localStorage.setItem(KEY_PREV_DELAY, delay);
      }
      this.setState({ isShow: true });
    } else {
      if (this.state.isShow) {
        this.setState({ isShow: false });
      }
    }
  }
  onReceiveAlerts = alertData => {
    const { subscribeRealtimeData } = this.props;
    subscribeRealtimeData(alertData);
  };
  subscribe = () => {
    const { lstAlertGroupChanel } = this.props;
    _.map(lstAlertGroupChanel, item => {
      //TODO Realtime messageHub.subscribe(item, this.onReceiveAlerts);
    });
  };

  unsubscribe = () => {
    const { lstAlertGroupChanelUnSubscribed } = this.props;
    _.map(lstAlertGroupChanelUnSubscribed, item => {
      //TODO Realtime messageHub.unsubscribe(item, this.onReceiveAlerts);
    });
  };
  render() {
    const { alertData } = this.props;
    return <>{this.state.isShow && <Alert content={alertData} />}</>;
  }
}
SubscribeAlert.propTypes = {
  subscribeRealtimeData: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  subscribeRealtimeData,
};
const mapStateToProps = state => {
  return {
    ...state[REDUCER_NAME],
    lstAlertGroupChanel: state[REDUCER_NAME].lstAlertGroupChanel,
    alertData: state[REDUCER_NAME].alertData,
    lstAlertGroupChanelUnSubscribed:
      state[REDUCER_NAME].lstAlertGroupChanelUnSubscribed,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SubscribeAlert);
