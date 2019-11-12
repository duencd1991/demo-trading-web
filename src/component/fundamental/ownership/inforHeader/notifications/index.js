import React from 'react';
//TODO import './index.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Notifications from '../../../common/header/notifications';
import { REDUCER_NAME } from '../../reducer';

class NotificationsWrapper extends React.Component {
  render() {
    const { companyScore } = this.props;
    return <Notifications data={companyScore} />;
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    companyScore: state[REDUCER_NAME].listMultiComponent[id].companyScore,
  };
};

export default connect(mapStateToProps)(NotificationsWrapper);
