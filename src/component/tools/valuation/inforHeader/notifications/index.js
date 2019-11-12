import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { REDUCER_NAME } from '../../reducer';
import Notifications from '../../../../fundamental/common/header/notifications';
import { withComponentId } from '../../../../common/ComponentIdContext';
import './index.scss';

class NotificationsWrapper extends React.Component {
  render() {
    const { companyScore } = this.props;
    return <Notifications data={companyScore} />;
  }
}

const mapStateToProps = state => ({
  companyScore: state[REDUCER_NAME].companyScore,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(NotificationsWrapper);
