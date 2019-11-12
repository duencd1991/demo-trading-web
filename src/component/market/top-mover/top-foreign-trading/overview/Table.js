import React from 'react';
import Table from '../../common/TableOverView';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import Const from './Const';
import { remove } from 'lodash';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    listId: state[REDUCER_NAME].listDataTopForeignTradeTicker,
    isLoading: state[REDUCER_NAME].isLoading,
    option: state[REDUCER_NAME].option,
  };
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listObjectDataTopForeignTradeByTicker;

function TableOverViewForeign(props) {
  const { listId, isLoading, option, table } = props;
  let hideColumnsNew = [...Const.listHideColumn];
  if (!option) {
    remove(hideColumnsNew, function(n) {
      return n === 'foreignBuyVolumeMatched';
    });
  }
  if (option === 'NetBuyVol') {
    remove(hideColumnsNew, function(n) {
      return n === 'foreignBuyVolumeMatched';
    });
  } else if (option === 'NetBuyVal') {
    remove(hideColumnsNew, function(n) {
      return n === 'foreignBuyValueMatched';
    });
  } else if (option === 'NetSellVol') {
    remove(hideColumnsNew, function(n) {
      return n === 'foreignSellVolumeMatched';
    });
  } else if (option === 'NetSellVal') {
    remove(hideColumnsNew, function(n) {
      return n === 'foreignSellValueMatched';
    });
  }

  return (
    <Table
      table={table}
      listId={listId}
      isLoading={isLoading}
      resizable={true}
      columnDraggable={false}
      rowDraggable={false}
      getDataFromRedux={getDataFromRedux}
      hideColumns={hideColumnsNew}
      listColumns={Const.listColumn}
      i18nTitleKey="topVolume.overview.overviewTopForeignTradeHeader"
    />
  );
}

const enhance = compose(
  withScroll(105, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableOverViewForeign);
