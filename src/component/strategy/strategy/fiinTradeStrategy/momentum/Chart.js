import React from 'react';
import PropTypes from 'prop-types';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import ChartCommon from '../../../../common/mixChart/MixChart';
import Const from './Const';
import { compose } from 'redux';
import { withComponentId } from './../../../../common/ComponentIdContext';
import moment from 'moment';
import { THEMES } from './../../../../../configs/LayoutConfig';

class Chart extends React.Component {
  render() {
    const { listChart, listTickValue, width, theme } = this.props;
    // console.log(this.props.theme);
    return (
      <ChartCommon
        configChart={
          theme === THEMES.DARK ? Const.configChart : Const.configChartLight
        }
        data={listChart}
        xTickValues={listTickValue}
        width={width}
        ratio={window.devicePixelRatio}
        tickFormat={d => {
          return moment(d).format('YYYY');
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    theme: state.theme,
    component: state[REDUCER_NAME].component,
    listValue: state[REDUCER_NAME].listValue,
    listChart: state[REDUCER_NAME].listChart,
    listTickValue: state[REDUCER_NAME].listTickValue,
  };
};
Chart.propTypes = {
  component: PropTypes.object,
  listChart: PropTypes.array,
};

Chart.defaultProps = {
  component: {},
  listTickValue: [],
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Chart);
