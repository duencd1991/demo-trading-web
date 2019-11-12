import React from 'react';
import PropTypes from 'prop-types';
import ChartContent from './ChartContent';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './../reducer';
import { ChartFooter } from '../../../common/chart/footer';
import { Translate } from 'react-redux-i18n';
import Loading from './../../../common/loading/Loading';
import { getUnique } from './../../../helpers/Common';
import { customDataChart } from './../../../helpers/Chart';
import { LabelLeftRight } from '../../../common/chart/label';

const MIN_WIDTH = 0;

class ChartWrap extends React.Component {
  state = {
    keyChart: getUnique(),
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.component !== this.props.component ||
      nextProps.data !== this.props.data
    ) {
      this.setState({ keyChart: getUnique() });
    }
  }

  render() {
    const { data: foreignData, component } = this.props;
    const { series: chartData = [] } = foreignData || {};

    const customChartData = customDataChart(chartData, 'OneDay', 'foreign');
    if (customChartData.length < 2) {
      return <Loading />;
    }

    return (
      <div
        style={{
          border: '1px solid #555',
          minWidth: MIN_WIDTH + 30,
        }}
        className="stock-chart position-relative w-100 mt-20 mb-20 border-radius-5 bg-t-color-2 pl-10 pr-10 pt-10"
      >
        <LabelLeftRight text="moneyFlowForeign.billion_vnd" />
        <div className="fs-12 font-weight-bold">
          <Translate value={'moneyFlowForeign.total_foreign_trading'} />
        </div>
        <div className="ml-20">
          <ChartContent
            key={this.state.keyChart}
            data={customChartData}
            width={Math.max(component.width - 70, MIN_WIDTH)}
            ratio={window.devicePixelRatio}
          />
        </div>
        <ChartFooter
          list={[
            {
              text: 'moneyFlowForeign.foreign_buy',
              color: '#009cff',
              type: 'circle',
            },
            {
              text: 'moneyFlowForeign.foreign_sell',
              color: '#ffc859',
              type: 'circle',
            },
            {
              text: 'moneyFlowForeign.net_foreign',
              color: '#1d97ef',
              type: 'half-circle',
              color2: '#eb505a',
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state[REDUCER_NAME].foreign.data,
    component: state[REDUCER_NAME].component,
  };
};

ChartWrap.propTypes = {
  data: PropTypes.object,
  component: PropTypes.object,
};

ChartWrap.defaultProps = {
  data: [],
  component: {},
};

export default connect(mapStateToProps)(ChartWrap);
