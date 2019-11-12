import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TablePutThrough from './TablePutThrough';

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listIdPutThroughUpcom,
  };
};

const enhance = compose(connect(mapStateToProps));

export default enhance(TablePutThroughUpcom);

const getDataFromRedux = state => state[REDUCER_NAME].listPutThroughUpcomById;

function TablePutThroughUpcom(props) {
  return (
    <TablePutThrough
      {...props}
      name={'MATCHED - UPCOM'}
      getDataFromRedux={getDataFromRedux}
    />
  );
}
