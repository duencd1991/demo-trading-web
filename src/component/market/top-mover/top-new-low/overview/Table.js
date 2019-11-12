import React from 'react';
import Table from '../../common/TableOverView';
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

function TableOverViewNewLow(props) {
  const { listId, isLoading, table } = props;
  return (
    <Table
      table={table}
      listId={listId}
      isLoading={isLoading}
      resizable={true}
      columnDraggable={false}
      rowDraggable={false}
      getDataFromRedux={getDataFromRedux}
      hideColumns={Const.listHideColumn}
      listColumns={Const.listColumn}
      i18nTitleKey="topVolume.overview.overviewTopNewLowHeader"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableOverViewNewLow);
