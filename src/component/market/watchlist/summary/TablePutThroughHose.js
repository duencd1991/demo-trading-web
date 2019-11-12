import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TablePutThrough from './TablePutThrough';

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listIdPutThroughHose,
  };
};

const enhance = compose(connect(mapStateToProps));

export default enhance(TablePutThroughAsk);

const getDataFromRedux = state => state[REDUCER_NAME].listPutThroughHoseById;

function TablePutThroughAsk(props) {
  return (
    <TablePutThrough
      {...props}
      name={'MATCHED - HOSE'}
      getDataFromRedux={getDataFromRedux}
    />
  );
}
