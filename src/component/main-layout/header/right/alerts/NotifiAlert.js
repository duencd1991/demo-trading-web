import React, { Component } from 'react';
import { fetchListAlertGroups, REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { useAlert } from 'react-alert';
import SubscribeAlert from './SubscribeAlert';

class NotifiAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  componentDidMount() {
    const { fetchListAlertGroups } = this.props;
    fetchListAlertGroups();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps && prevProps.i18n.locale !== this.props.i18n.locale) {
      const { fetchListAlertGroups } = this.props;
      fetchListAlertGroups();
    }
  }

  render() {
    const { listAlertGroups } = this.props;
    if (_.isEmpty(listAlertGroups)) return null;
    return <SubscribeAlert />;
  }
}

const mapDispatchToProps = {
  fetchListAlertGroups,
};
const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    listAlertGroups: state[REDUCER_NAME].listAlertGroups,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(NotifiAlert);
