import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FinancialStatementLayout from '../common/financial-statement-table/FinancialStatementLayout';
import { fetchCashFlowStatement, REDUCER_NAME } from '../reducer';
import Chart from './Chart';

class CashFlowStatement extends PureComponent {
  getDataFromRedux = (state) => {
    const { timeKey, componentId } = this.props;

    return state[REDUCER_NAME][componentId].cashFlowStatement.data[timeKey].dataByIds;
  };

  render() {
    const {
      isLoading,
      ids,
      fields,
      timeKey,
      dataByIds,
      fetchCashFlowStatement,
      organCode,
      locale,
      size,
      componentId,
    } = this.props;

    return (
      <FinancialStatementLayout
        timeKey={timeKey}
        getDataFromRedux={this.getDataFromRedux}
        isLoading={isLoading}
        ids={ids}
        fields={fields}
        fetchData={fetchCashFlowStatement}
        dataByIds={dataByIds}
        organCode={organCode}
        componentId={componentId}
      >
        {startIndex => (
          <Chart
            locale={locale}
            timeKey={timeKey}
            width={size.width}
            fields={fields}
            dataByIds={dataByIds}
            startIndex={startIndex}
          />
        )}
      </FinancialStatementLayout>
    );
  }
}

CashFlowStatement.propTypes = {
  fetchCashFlowStatement: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  organCode: PropTypes.string,
  timeKey: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  i18nPrefix: PropTypes.string,
  size: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  componentId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { timeKey, componentId }) => ({
  ids: state[REDUCER_NAME][componentId].cashFlowStatement.data[timeKey].ids,
  fields: state[REDUCER_NAME][componentId].cashFlowStatement.data[timeKey].fields,
  dataByIds: state[REDUCER_NAME][componentId].cashFlowStatement.data[timeKey].dataByIds,
  isLoading: state[REDUCER_NAME][componentId].cashFlowStatement.isLoading,
  size: state[REDUCER_NAME][componentId].size,
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  fetchCashFlowStatement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CashFlowStatement);
