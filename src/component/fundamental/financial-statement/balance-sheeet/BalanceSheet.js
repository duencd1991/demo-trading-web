import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SizeTracker from '../../../common/size-tracker/SizeTracker';
import FinancialStatementTable from '../common/financial-statement-table/FinancialStatementTable';
import { fetchBalanceSheet, REDUCER_NAME } from '../reducer';

class BalanceSheet extends PureComponent {
  componentDidMount() {
    const { fetchBalanceSheet, organCode, componentId } = this.props;
    fetchBalanceSheet(
      {
        OrganCode: organCode,
      },
      componentId,
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { organCode, fetchBalanceSheet, componentId } = this.props;
    if (organCode !== prevProps.organCode) {
      fetchBalanceSheet(
        {
          OrganCode: organCode,
        },
        componentId,
      );
    }
  }

  getDataFromRedux = state => {
    const { timeKey, componentId } = this.props;

    return state[REDUCER_NAME][componentId].balanceSheet.data[timeKey]
      .dataByIds;
  };

  render() {
    const { isLoading, ids, fields, timeKey, dataByIds, theme } = this.props;
    return (
      <SizeTracker className={`balance-sheet-wrapper flex-fill ${theme}`}>
        {(width, height) => (
          <FinancialStatementTable
            ids={ids}
            isLoading={isLoading}
            height={height}
            getDataFromRedux={this.getDataFromRedux}
            fields={fields}
            timeKey={timeKey}
            dataByIds={dataByIds}
          />
        )}
      </SizeTracker>
    );
  }
}

BalanceSheet.propTypes = {
  fetchBalanceSheet: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  organCode: PropTypes.string,
  timeKey: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  i18nPrefix: PropTypes.string,
  size: PropTypes.object,
  componentId: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

BalanceSheet.defaultProps = {
  size: {},
};

const mapStateToProps = (state, { timeKey, componentId }) => ({
  ids: state[REDUCER_NAME][componentId].balanceSheet.data[timeKey].ids,
  fields: state[REDUCER_NAME][componentId].balanceSheet.data[timeKey].fields,
  dataByIds:
    state[REDUCER_NAME][componentId].balanceSheet.data[timeKey].dataByIds,
  isLoading: state[REDUCER_NAME][componentId].balanceSheet.isLoading,
  size: state[REDUCER_NAME][componentId].size,
  theme: state.theme,
});

const mapDispatchToProps = {
  fetchBalanceSheet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceSheet);
