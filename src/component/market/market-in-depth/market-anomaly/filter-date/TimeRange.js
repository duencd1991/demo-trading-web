import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import { getItemMinInList } from '../../../../helpers/Common';
import Const from './../Const';
import { I18n } from 'react-redux-i18n';

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    listYearTable: state[REDUCER_NAME].listYearTable,
  };
};

export default connect(mapStateToProps)(TimeRange);

function TimeRange(props) {
  const { listYearTable } = props;

  const timeRange_ = `${I18n.t('marketInDepthAnomaly.timeRange')} `;
  const from_ = `${I18n.t('marketInDepthAnomaly.from')} `;
  const to_ = `${I18n.t('marketInDepthAnomaly.to')} `;
  const present = I18n.t('marketInDepthAnomaly.present');

  return (
    <div className="w-100 float-right">
      <div className="text-right mt-10 mr-10">
        <span style={{ fontWeight: '600' }}>{timeRange_}</span>
        <span style={{ opacity: '0.5' }}>{from_}</span>
        <span style={{ fontWeight: '600' }}>
          {getItemMinInList(listYearTable, [Const.average])}{' '}
        </span>
        <span style={{ opacity: '0.5' }}>{to_}</span>
        <span style={{ fontWeight: '600' }}>{present}</span>
      </div>
    </div>
  );
}
