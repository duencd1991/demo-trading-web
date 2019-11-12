import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME, toggleViewChart } from './reducer';
import { I18n } from 'react-redux-i18n';

class ViewChart extends React.Component {
  render() {
    const { toggleViewChart, viewChart } = this.props;

    return (
      <div className="item-btn">
        <button
          type="button"
          className="btn btn-cus bg-b-color-3"
          onClick={toggleViewChart}
        >
          {viewChart ? (
            <i
              className="icon-view-table fs-11"
              title={I18n.t('watchListSummary.viewTableIcon')}
            />
          ) : (
            <i
              className="icon-chart-btn fs-11"
              title={I18n.t('watchListSummary.viewChartIcon')}
            />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    viewChart: state[REDUCER_NAME].viewChart,
  };
};

const mapDispatchToProps = {
  toggleViewChart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewChart);
