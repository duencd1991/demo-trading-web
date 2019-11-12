import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import './index.scss';
import BarChart from '../../common/bar-chart';
import { fetchZMFScore, REDUCER_NAME } from '../../reducer';
import { Responsive } from './../../../../common/responsive';
import { withComponentId } from '../../../../common/ComponentIdContext';

const Z_CHART = 'Z-SCORE';
const M_CHART = 'M-SCORE';
const F_CHART = 'F-SCORE';

const GREEN = '#37a77d';
const RED = '#eb505a';
const YELLOW = '#facc5c';

const Z_TOOLTIP = (
  <div className="d-flex flex-column align-items-start">
    <div>The likelihood of bankruptcy of a publicly</div>
    <div>traded manufacturing company</div>
  </div>
);
const M_TOOLTIP = (
  <div className="d-flex flex-column align-items-start">
    <div>The ability to be manipulated</div>
    <div>in the reported earnings of the company</div>
  </div>
);
const F_TOOLTIP = (
  <div className="d-flex flex-column align-items-start">
    <div>The fundamental strength of the enterprise</div>
  </div>
);

class ZMFScore extends React.Component {
  getFillFunction = typeChart => {
    const fillZ = (d, i) => {
      if (d.x < 1.8) return GREEN;
      if (d.x >= 1.8 && d.x <= 2.9) return YELLOW;
      if (d.x >= 2.9) return RED;
    };

    const fillM = (d, i) => {
      if (d.x < -2.22) return GREEN;
      if (d.x >= -2.22) return RED;
    };

    const fillF = (d, i) => {
      if (d.x < 2) return RED;
      if (d.x >= 2 && d.x < 6) return YELLOW;
      if (d.x >= 6) return GREEN;
    };

    if (typeChart === Z_CHART) {
      return fillZ;
    }
    if (typeChart === M_CHART) {
      return fillM;
    }

    return fillF;
  };

  componentDidMount() {
    const { fetchZMFScore, searchParams, componentId } = this.props;
    const query = Object.keys(searchParams).length
      ? { OrganCode: searchParams.code }
      : { OrganCode: 'AAA' };
    fetchZMFScore(componentId, query);
  }

  render() {
    const {
      component,
      ZMFScoreData: { zData = [], mData = [], fData = [], isLoading = true },
    } = this.props;
    return (
      <div className="ZMF-score-wrapper" id="zmf-content-export">
        <Responsive component={component} margin={20} offsetWidth={40}>
          {width => (
            <BarChart
              toolTip={Z_TOOLTIP}
              fill={this.getFillFunction(Z_CHART)}
              title="Z-SCORE"
              isLoading={isLoading}
              data={zData}
              width={width}
            />
          )}
          {width => (
            <BarChart
              toolTip={M_TOOLTIP}
              fill={this.getFillFunction(M_CHART)}
              title="M-SCORE"
              isLoading={isLoading}
              data={mData}
              width={width}
            />
          )}
          {width => (
            <BarChart
              toolTip={F_TOOLTIP}
              fill={this.getFillFunction(F_CHART)}
              title="F-SCORE"
              isLoading={isLoading}
              data={fData}
              width={width}
            />
          )}
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    component: state[REDUCER_NAME].listMultiComponent[componentId].component,
    ZMFScoreData:
      state[REDUCER_NAME].listMultiComponent[componentId].ZMFScoreData,
    searchParams:
      state[REDUCER_NAME].listMultiComponent[componentId].searchParams,
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    listIndustry: state[REDUCER_NAME].listIndustry,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchZMFScore: (id, params) => dispatch(fetchZMFScore(id, params)),
  };
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ZMFScore);
