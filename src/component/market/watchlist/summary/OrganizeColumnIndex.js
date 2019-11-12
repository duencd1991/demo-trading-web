import React from 'react';
import { connect } from 'react-redux';
import {OrganizeColumn} from '../common/organize-column';
import Const from './../summary/Const';
import _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import { changeListHideColumnIndex, REDUCER_NAME } from './../reducer';

const mapStateToProps = (state) => {
  return {
    listHideColumnIndex: state[REDUCER_NAME].listHideColumnIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeListHideColumn: (listHideColumn) => dispatch(changeListHideColumnIndex(listHideColumn)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeColumnIndex);

function OrganizeColumnIndex(props) {
  const { changeListHideColumn, listHideColumnIndex } = props;
  return (
    <OrganizeColumn
      listColumn={Object.keys(_.omit(Const.index, Const.listIgnoreColumnInMangageColumn)).map(item => {
        return {
          key: Const.index[item],
          title: I18n.t(`watchListSummary.listTitleIndexTable.${item}`)
        }
      })}
      listUnCheckedColumn={listHideColumnIndex}
      listUnCheckedColumnDefault={Const.listHideColumnIndex}
      changeListHideColumn={changeListHideColumn}
    />
  );
}

