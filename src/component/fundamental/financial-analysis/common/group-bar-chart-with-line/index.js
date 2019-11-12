import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import ChartWrapper from '../../common/chart-wrapper';
import { REDUCER_NAME } from '../../reducer';
import Chart from './BarChart';
import Loading from '../Loading/Loading';

class ChartComponent extends React.Component {
  render() {
    const {
      title,
      type,
      width,
      theme,
      data = [],
      isLoading = true,
    } = this.props;
    return (
      <ChartWrapper height={width} title={title} type={type}>
        {isLoading ? (
          <Loading />
        ) : (
          <Chart data={data} width={width} theme={theme} />
        )}
      </ChartWrapper>
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
