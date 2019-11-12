import { connect } from 'react-redux';
import { Filter } from './common/filters';
import {
  REDUCER_NAME,
  changeIndex,
  changeDerivative,
  changePutThrough,
  updateMyIndex,
  deleteMyIndex,
} from './reducer';

const mapStateToProps = state => {
  return {
    currentMyIndex: state[REDUCER_NAME].currentMyIndex,
    currentDefaultIndex: state[REDUCER_NAME].currentDefaultIndex,
    currentIndustry: state[REDUCER_NAME].currentIndustry,
    currentDerivative: state[REDUCER_NAME].currentDerivative,
    currentPutThrough: state[REDUCER_NAME].currentPutThrough,

    listMyIndex: state[REDUCER_NAME].listMyIndex,
    listDefaultIndex: state[REDUCER_NAME].listDefaultIndex,
    listIndustry: state[REDUCER_NAME].listIndustry,
    listDerivative: state[REDUCER_NAME].listDerivative,
    listPutThrough: state[REDUCER_NAME].listPutThrough,

    listMyIndexByKey: state[REDUCER_NAME].listMyIndexByKey,
    listDefaultIndexByKey: state[REDUCER_NAME].listDefaultIndexByKey,
    listIndustryByKey: state[REDUCER_NAME].listIndustryByKey,
    listDerivativeByKey: state[REDUCER_NAME].listDerivativeByKey,
    listPutThroughByKey: state[REDUCER_NAME].listPutThroughByKey,

    watchListId: state[REDUCER_NAME].watchListId,
  };
};

const mapDispatchToProps = {
  changeIndex,
  changeDerivative,
  changePutThrough,
  updateMyIndex,
  deleteMyIndex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
