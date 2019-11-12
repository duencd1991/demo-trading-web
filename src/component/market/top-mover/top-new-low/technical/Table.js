import React from 'react';
import Table from '../../common/TableTechnical';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataTopNewLowTicker,
    isLoading: state[REDUCER_NAME].isLoading,
  };
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listObjectDataTopNewLowByTicker;

function TableTechnical(props) {
  const { listId, isLoading } = props;

  return (
    <Table
      listId={listId}
      isLoading={isLoading}
      getDataFromRedux={getDataFromRedux}
      hideColumns={Const.listHideColumn}
      listColumns={Const.listColumn}
      i18nTitleKey="topBreakout.technical.technicalHeader"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableTechnical);
