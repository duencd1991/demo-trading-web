import React from 'react';
import Notifications from '../../../common/header/notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withComponentId } from '../../../../common/ComponentIdContext';
import { REDUCER_NAME } from '../../reducer';

class NotificationsWrapper extends React.Component {
  render() {
    const { companyScore } = this.props;

    return <Notifications data={companyScore} />;
  }
}

const mapStateToProps = (state, { componentId }) => ({
  companyScore:
    state[REDUCER_NAME].listMultiComponent[componentId].companyScore,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(NotificationsWrapper);
