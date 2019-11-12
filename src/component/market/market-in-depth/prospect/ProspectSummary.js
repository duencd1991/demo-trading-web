import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import { IndexSummary } from '../../../common/index-summary';

const mapStateToProps = state => {
  let indexData = [];
  if (Object.keys(state[REDUCER_NAME].listProspectData).length > 0) {
    indexData = state[REDUCER_NAME].listProspectData.series;
  }
  return {
    data: indexData,
  };
};

export default connect(mapStateToProps)(IndexSummary);
