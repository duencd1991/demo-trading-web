import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import { formatTextFloat } from '../../../helpers/Text';
import { REDUCER_NAME } from './reducer';
import { getColorRedWhite } from './../../../helpers/Color';
import './index.scss';

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].listYearTable,
    currentFilterDatetime: state[REDUCER_NAME].currentFilterDatetime,
  };
};

export default connect(mapStateToProps)(TableAnomaly);

const getDataFromRedux = state => state[REDUCER_NAME].listDataTableByYear;

function TableAnomaly(props) {
  const { ids, currentFilterDatetime } = props;

  let hideColumns = Const.listHideColumnWeekTable;
  if (currentFilterDatetime === Const.listFilterDateTimeByKey.month.key) {
    hideColumns = Const.listHideColumnMonthTable;
  }

  if (currentFilterDatetime === Const.listFilterDateTimeByKey.quarter.key) {
    hideColumns = Const.listHideColumnQuarterTable;
  }

  return (
    <>
      <div className="table-tilte fs-16 fw-600 mb-10">
        {I18n.t('marketInDepthAnomaly.averageReturn')}
      </div>
      <Table
        ids={ids}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        hideColumns={hideColumns}
        getDataFromRedux={getDataFromRedux}
        schema={Object.keys(Const.listColumn).map(item => {
          const key = Const.listColumn[item];
          const title = I18n.t(
            `marketInDepthAnomaly.marketAnomalyTable.${item}`,
          );
          const result = {
            key,
            title,
          };

          if (key === Const.listColumn.YEAR) {
            return {
              disableSort: true,
              ...result,
              render: text => <span>{text}</span>,
            };
          }

          return {
            disableSort: true,
            ...result,
            render: text => {
              const className = getColorRedWhite(text);
              return (
                text !== null && (
                  <span className={className}>
                    {formatTextFloat(text * 100) + ' %'}
                  </span>
                )
              );
            },
          };
        })}
      />
    </>
  );
}
