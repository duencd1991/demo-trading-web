import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FinancialStatementLayout from '../common/financial-statement-table/FinancialStatementLayout';
import { fetchIncomeStatement, REDUCER_NAME } from '../reducer';
import BankingChart from './BankingChart';
import Chart from './Chart';

class IncomeStatement extends PureComponent {
  getDataFromRedux = (state) => {
    const { timeKey, componentId } = this.props;

    return state[REDUCER_NAME][componentId].incomeStatement.data[timeKey].dataByIds;
  };

  render() {
    const {
      isLoading,
      ids,
      fields,
      timeKey,
      dataByIds,
      fetchIncomeStatement,
      organCode,
      locale,
      size,
      componentId,
      isBanking,
    } = this.props;

    const ChartComponent = isBanking ? BankingChart : Chart;

    return (
      <FinancialStatementLayout
        timeKey={timeKey}
        getDataFromRedux={this.getDataFromRedux}
        isLoading={isLoading}
        ids={ids}
        fields={fields}
        fetchData={fetchIncomeStatement}
        dataByIds={dataByIds}
        organCode={organCode}
        componentId={componentId}
      >
        {startIndex => (
          <ChartComponent
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

IncomeStatement.propTypes = {
  fetchIncomeStatement: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  organCode: PropTypes.string,
  timeKey: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  i18nPrefix: PropTypes.string,
  size: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  componentId: PropTypes.number.isRequired,
  isBanking: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { timeKey, componentId }) => ({
  ids: state[REDUCER_NAME][componentId].incomeStatement.data[timeKey].ids,
  fields: state[REDUCER_NAME][componentId].incomeStatement.data[timeKey].fields,
  dataByIds: state[REDUCER_NAME][componentId].incomeStatement.data[timeKey].dataByIds,
  isBanking: state[REDUCER_NAME][componentId].incomeStatement.data.isBanking,
  isLoading: state[REDUCER_NAME][componentId].incomeStatement.isLoading,
  size: state[REDUCER_NAME][componentId].size,
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  fetchIncomeStatement,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeStatement);
