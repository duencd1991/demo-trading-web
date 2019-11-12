import React from 'react';
import Table from '../../common/TableFinancial';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataTopGainersTicker,
    isLoading: state[REDUCER_NAME].isLoading,
  };
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listObjectDataTopGainersByTicker;

function TableFinancial(props) {
  const { listId, isLoading, table } = props;

  return (
    <Table
      table={table}
      isLoading={isLoading}
      listId={listId}
      getDataFromRedux={getDataFromRedux}
      hideColumns={Const.listHideColumn}
      listColumns={Const.listColumn}
      i18nTitleKey="topVolume.financial.financialHeader"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableFinancial);
