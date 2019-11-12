import React, { Component } from 'react';
//TODO import '../index.scss';
import FilterDatetimeTable from './FilterDatetimeTable';
import FilterYearTable from './FilterYearTable';
import { connect } from 'react-redux';
import { REDUCER_NAME, toggleChartAndTable } from './../reducer';
import TimeRange from './TimeRange';
import { I18n } from 'react-redux-i18n';

class FilterDate extends Component {
  render() {
    const { isTable, toggleChartAndTable } = this.props;
    const viewChart = I18n.t('marketInDepthAnomaly.viewChart');
    const viewData = I18n.t('marketInDepthAnomaly.viewData');

    return (
      <div>
        <div className="w-100 float-right">
          <a
            className="btn btn-cus-nomal text-nomal border-radius-30 bg-b-color-3 float-right btn-anomaly"
            onClick={() => toggleChartAndTable(!isTable)}
          >
            {isTable ? viewChart : viewData}
          </a>
        </div>

        <FilterYearTable />

        <TimeRange />

        {isTable && <FilterDatetimeTable />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    isTable: state[REDUCER_NAME].isTable,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleChartAndTable: isTable => dispatch(toggleChartAndTable(isTable)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDate);
