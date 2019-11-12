import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import BarChartWrapper from '../../common/bar-chart-wrapper';
import { REDUCER_NAME } from '../../reducer';
import Chart from './BarChart';
import Loading from '../Loading/Loading';

class ChartComponent extends React.Component {
  render() {
    const { isLoading, title, data, toolTip, theme } = this.props;
    const labelColor = theme === 'dark' ? '#ffffff' : '#1f2023';
    if (data.length === 0 && !isLoading)
      return <div>{`No Data available for ${title}`}</div>;
    return (
      <BarChartWrapper title={title} toolTip={toolTip}>
        {isLoading ? (
          <Loading />
        ) : (
          <Chart {...this.props} labelColor={labelColor} />
        )}
      </BarChartWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    component: state[REDUCER_NAME].component,
    i18n: state.i18n,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(ChartComponent);
