import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { THEMES } from '../../../../configs/LayoutConfig';
import { formatValueBillion } from '../../../helpers/Text';
import ConstChart from '../../../common/mixChart/Const';
import ChartCommon from '../../../common/mixChart/MixChart';
import { NUMBER_FLEXIBLE } from '../Const';
import {
  mapping,
  generateChartConfig,
  SETTINGS,
  LIGHT_SETTINGS,
} from './Const';

class Chart extends PureComponent {
  getData = () => {
    const { dataByIds } = this.props;
    const fields = this.getFields();
    return [...Array(NUMBER_FLEXIBLE)].map((_, index) => {
      const hasData =
        dataByIds[mapping.netCashInflowsFromOperatingActivities] &&
        dataByIds[mapping.netCashInflowsFromOperatingActivities] &&
        dataByIds[mapping.netCashInflowsOutflowsFromFinancingActivities] &&
        dataByIds[mapping.cashAndCashEquivalentsAtTheEndOfPeriod];

      if (fields[index] && hasData) {
        return {
          CFFromOperating: formatValueBillion(
            dataByIds[mapping.netCashInflowsFromOperatingActivities][
              fields[index].key
            ],
          ),
          CFFromInvesting: formatValueBillion(
            dataByIds[mapping.netCashInflowsOutflowsFromInvestingActivities][
              fields[index].key
            ],
          ),
          CFFromFinancing: formatValueBillion(
            dataByIds[mapping.netCashInflowsOutflowsFromFinancingActivities][
              fields[index].key
            ],
          ),
          cashEquivalentsEnding: formatValueBillion(
            dataByIds[mapping.cashAndCashEquivalentsAtTheEndOfPeriod][
              fields[index].key
            ],
          ),
          time: this.getFieldTitle(fields[index]),
        };
      }

      return {
        revenue: 0,
        operatingProfit: 0,
        netProfit: 0,
        netProfitMargin: 0,
        time: '',
      };
    });
  };

  getFieldTitle = item => {
    const { timeKey } = this.props;
    const key =
      timeKey === 'yearly'
        ? 'financialStatement.yearName'
        : 'financialStatement.quarterName';

    return I18n.t(key, {
      quarter: item.quarter,
      year: item.year,
    });
  };

  getFields = () => {
    const { fields, startIndex } = this.props;
    return fields.slice(startIndex, NUMBER_FLEXIBLE + startIndex);
  };

  getConfigChart = () => {
    const { theme } = this.props;
    const {
      COLUMN_ONE_COLOR,
      COLUMN_TWO_COLOR,
      COLUMN_THREE_COLOR,
      COLOR_CIRCLE_MARKER_LINE,
    } = theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS;
    const tooltips = [
      {
        i18nKey:
          'financialStatement.cashFlowStatementChart.CFFromOperatingTooltip',
        key: 'CFFromOperating',
      },
      {
        i18nKey:
          'financialStatement.cashFlowStatementChart.CFFromInvestingTooltip',
        key: 'CFFromInvesting',
      },
      {
        i18nKey:
          'financialStatement.cashFlowStatementChart.CFFromFinancingTooltip',
        key: 'CFFromFinancing',
      },
      {
        i18nKey:
          'financialStatement.cashFlowStatementChart.cashEquivalentsEndingTooltip',
        key: 'cashEquivalentsEnding',
      },
    ];

    const listLegendChart = [
      ConstChart.setLegendConfig(
        ConstChart.GROUPCHART,
        I18n.t('financialStatement.cashFlowStatementChart.CFFromOperating'),
        COLUMN_ONE_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.BARCHART,
        I18n.t('financialStatement.cashFlowStatementChart.CFFromInvesting'),
        COLUMN_TWO_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.BARCHART,
        I18n.t('financialStatement.cashFlowStatementChart.CFFromFinancing'),
        COLUMN_THREE_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.CIRCLEMARKERLINE,
        I18n.t(
          'financialStatement.cashFlowStatementChart.cashEquivalentsEnding',
        ),
        COLOR_CIRCLE_MARKER_LINE,
      ),
    ];

    return generateChartConfig({
      tooltips,
      listLegendChart,
      title: {
        title: I18n.t('financialStatement.cashFlowStatementChart.chartTitle'),
      },
      theme,
    });
  };

  render() {
    const { width, locale } = this.props;
    if (!width) {
      return null;
    }

    return (
      <div className="income-statement-chart">
        <ChartCommon
          key={locale}
          configChart={this.getConfigChart()}
          data={this.getData()}
          width={width - 40}
          ratio={window.devicePixelRatio}
        />
      </div>
    );
  }
}

Chart.propTypes = {
  startIndex: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,
  dataByIds: PropTypes.object.isRequired,
  width: PropTypes.number,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(Chart);
