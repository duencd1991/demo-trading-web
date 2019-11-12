import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import './index.scss';
import RadarChart from './RadarChart';
import BarChart from '../../common/bar-chart-with-line';
import GroupBarChart from '../../common/group-bar-chart-with-line';
import Table from './Table';
import { fetchFinancialRatio, REDUCER_NAME } from '../../reducer';
import { Responsive } from './../../../../common/responsive';
import { withComponentId } from '../../../../common/ComponentIdContext';
import Const from '../../Const';
import {
  formatValueTrillion,
  formatTextFloat,
  formatPercent,
} from '../../../../helpers/Text';

const XS_SIZE = 400;
const OFFSET_WIDTH = 40;
const REVERSE_SIZE = 800;

class FinancialRatio extends React.PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { locale } = this.props;
    if (locale !== prevProps.locale) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { fetchFinancialRatio, searchParams, componentId } = this.props;
    const query =
      searchParams && Object.keys(searchParams).length
        ? { OrganCode: searchParams.code }
        : { OrganCode: 'AAA' };
    fetchFinancialRatio(componentId, query);
  };

  render() {
    const {
      financialRatioData: {
        ratios = [],
        ratiosIndustry = {},
        isBank = false,
        isLoading,
      },
      financialRatioData,
      listIndustry,
      component,
      searchParams,
    } = this.props;
    const currentYear = new Date().getFullYear();

    const dupontBarData =
      ratios &&
      ratios.map(item => {
        return {
          x: item.yearReport === currentYear ? 'TTM' : item.yearReport,
          y: item[Const.dupontChart.nonBank.roe] || 0,
          y1: item[Const.dupontChart.nonBank.npm] || 0,
          y2: item[Const.dupontChart.nonBank.rtq71] || 0,
          y3: item[Const.dupontChart.nonBank.tat] || 0,
        };
      });

    const dupontBarDataSorted = dupontBarData.slice(0, 3).reverse();

    const assetQualityData =
      ratios &&
      ratios.map(item => {
        return {
          x: item.yearReport === currentYear ? 'TTM' : item.yearReport,
          y: item[Const.assetQualityChart.bank.npl] || 0,
          y1: formatValueTrillion(item[Const.assetQualityChart.bank.ta]) || 0,
          y2: formatValueTrillion(item[Const.assetQualityChart.bank.tl]) || 0,
          y3: formatValueTrillion(item[Const.assetQualityChart.bank.tnpl]) || 0,
        };
      });

    const assetQualityDataSorted = assetQualityData.slice(0, 3).reverse();

    const legendProfitAbilityChart = {
      stockName: searchParams.displayCode,
      industryName:
        ratiosIndustry &&
        Object.keys(ratiosIndustry).length &&
        (listIndustry && listIndustry.length)
          ? listIndustry.find(
              industry => industry.icbCode === ratiosIndustry.icbCode,
            ).icbName
          : '',
      // getIndustryName
    };

    return (
      <div>
        <Responsive
          component={component}
          offsetWidth={OFFSET_WIDTH}
          margin={5}
          ratioWidthItem={[6, 4]}
          appendClass={
            component.width <= REVERSE_SIZE + OFFSET_WIDTH
              ? 'flex-column-reverse'
              : ''
          }
        >
          {() => <Table data={financialRatioData} />}
          {width => (
            <Responsive
              component={{ width }}
              offsetWidth={0}
              margin={5}
              XS_SIZE={XS_SIZE}
            >
              {width =>
                ratios && ratios.length !== 0 && !isBank ? (
                  <BarChart
                    title="DUPONT"
                    type="DUPONT"
                    data={dupontBarDataSorted}
                    width={width}
                    isLoading={isLoading}
                  />
                ) : (
                  <GroupBarChart
                    title="ASSET QUALITY"
                    type="ASSET QUALITY"
                    data={assetQualityDataSorted}
                    width={width}
                    isLoading={isLoading}
                  />
                )
              }
              {width =>
                ratios &&
                ratios.length !== 0 && (
                  <RadarChart
                    legendProfitAbilityChart={legendProfitAbilityChart}
                    title="PROFITABILITY"
                    type="PROFITABILITY"
                    data={financialRatioData}
                    width={width}
                    isLoading={isLoading}
                  />
                )
              }
            </Responsive>
          )}
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    financialRatioData:
      state[REDUCER_NAME].listMultiComponent[componentId].financialRatioData,
    searchParams:
      state[REDUCER_NAME].listMultiComponent[componentId].searchParams,
    listIndustry: state[REDUCER_NAME].listIndustry,
    component: state[REDUCER_NAME].listMultiComponent[componentId].component,
    locale: state.i18n.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFinancialRatio: (id, params) =>
      dispatch(fetchFinancialRatio(id, params)),
  };
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FinancialRatio);
