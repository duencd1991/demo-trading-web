import React from 'react';
import PropTypes from 'prop-types';
import { REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import ChartCommon from '../../common/mixChart/MixChart';
import Const from './Const';
import { Responsive } from './../../common/responsive';
import { compose } from 'redux';
import { withComponentId } from './../../common/ComponentIdContext';

class Chart extends React.Component {
  render() {
    const { dataChartPE, dataChartDE, component } = this.props;

    return (
      <Responsive
        component={component}
        offsetWidth={42}
        margin={10}
        ratioWidthItem={[4, 6]}
      >
        {width => (
          <ChartCommon
            configChart={Const.configChartPE}
            data={dataChartPE}
            width={width}
            ratio={window.devicePixelRatio}
          />
        )}
        {width => (
          <ChartCommon
            configChart={Const.configChartDE}
            data={dataChartDE}
            width={width}
            ratio={window.devicePixelRatio}
          />
        )}
      </Responsive>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  const { component, dataChartPE, dataChartDE } = state[
    REDUCER_NAME
  ].listMultiComponent[componentId];

  return {
    component,
    dataChartPE,
    dataChartDE,
  };
};

Chart.propTypes = {
  component: PropTypes.object,
  dataChartPE: PropTypes.array,
  dataChartDE: PropTypes.array,
};

Chart.defaultProps = {
  component: {},
  dataChartPE: [],
  dataChartDE: [],
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Chart);
