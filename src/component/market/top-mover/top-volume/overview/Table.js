import React from 'react';
import Table from '../../common/TableOverView';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataOverviewTicker,
    isLoading: state[REDUCER_NAME].isLoading,
  };
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listObjectDataOverviewByTicker;

function TableOverViewVolume(props) {
  const { listId, isLoading, table } = props;

  return (
    <Table
      isLoading={isLoading}
      table={table}
      listId={listId}
      resizable={true}
      columnDraggable={false}
      rowDraggable={false}
      getDataFromRedux={getDataFromRedux}
      hideColumns={Const.listHideColumn}
      listColumns={Const.listColumn}
      i18nTitleKey="topVolume.overview.overviewHeader"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableOverViewVolume);
