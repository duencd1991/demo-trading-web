import React from 'react';
import Notifications from './../common/header/notifications';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';

class Noti extends React.Component {
  render() {
    const { currentSearch = {}, companyScore } = this.props;
    return <>{currentSearch.isBank || <Notifications data={companyScore} />}</>;
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    currentSearch:
      state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
    companyScore: state[REDUCER_NAME].listMultiComponent[componentId].score,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Noti);
