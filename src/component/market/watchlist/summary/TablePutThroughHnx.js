import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TablePutThrough from './TablePutThrough';

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listIdPutThroughHnx,
  };
};

const enhance = compose(connect(mapStateToProps));

export default enhance(TablePutThroughHnx);

const getDataFromRedux = state => state[REDUCER_NAME].listPutThroughHnxById;

function TablePutThroughHnx(props) {
  return (
    <TablePutThrough
      {...props}
      name={'MATCHED - HNX'}
      getDataFromRedux={getDataFromRedux}
    />
  );
}
