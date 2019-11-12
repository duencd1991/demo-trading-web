import React from 'react';
import Table from '../../common/TablePerformance';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataTopNewHighTicker,
    isLoading: state[REDUCER_NAME].isLoading,
  };
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listObjectDataTopNewHighByTicker;

function TablePerformanceNewHigh(props) {
  const { listId, isLoading, table } = props;

  return (
    <Table
      table={table}
      listId={listId}
      isLoading={isLoading}
      getDataFromRedux={getDataFromRedux}
      listColumns={Const.listColumn}
      resizable={true}
      columnDraggable={false}
      rowDraggable={false}
      i18nTitleKey="topVolume.performance.listTitleTable"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TablePerformanceNewHigh);
