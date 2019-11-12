import ScoreBox from './../common/header/score-box';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';
import { compose } from 'redux';

const mapStateToProps = (state, { componentId }) => {
  return {
    data: state[REDUCER_NAME].listMultiComponent[componentId].score,
  }
};

export default compose(
  withComponentId,
  connect(mapStateToProps)
)(ScoreBox)
