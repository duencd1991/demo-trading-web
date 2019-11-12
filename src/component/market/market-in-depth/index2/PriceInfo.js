import React from 'react';
import { connect } from 'react-redux';
import { IndexSummary } from '../../../common/index-summary';
import { REDUCER_NAME } from './reducer';

const mapStateToProps = state => {
  return {
    comGroupCode: state[REDUCER_NAME].comGroupCode,
    listTableByComGroupCode: state[REDUCER_NAME].listTableByComGroupCode,
  };
};

export default connect(mapStateToProps)(PriceInfo);

function PriceInfo({ comGroupCode, listTableByComGroupCode }) {
  const data = comGroupCode ? listTableByComGroupCode[comGroupCode] : {};

  return <IndexSummary data={data} />;
}
