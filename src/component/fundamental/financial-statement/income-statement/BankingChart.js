import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { THEMES } from '../../../../configs/LayoutConfig';
import { formatValueBillion } from '../../../helpers/Text';
import ConstChart from '../../../common/mixChart/Const';
import ChartCommon from '../../../common/mixChart/MixChart';
import { NUMBER_FLEXIBLE } from '../Const';
import {
  generateChartConfig,
  SETTINGS,
  incomeStatementBankingMapping,
  LIGHT_SETTINGS,
} from './BankingConst';

class BankingChart extends PureComponent {
  getData = () => {
    const { dataByIds } = this.props;
    const fields = this.getFields();
    return [...Array(5)].map((_, index) => {
      const hasData =
        dataByIds[incomeStatementBankingMapping.netInterestIncome] &&
        dataByIds[incomeStatementBankingMapping.netFeeAndCommissionIncome] &&
        dataByIds[incomeStatementBankingMapping.totalOperatingIncome] &&
        dataByIds[incomeStatementBankingMapping.provisionForCreditLosses] &&
        dataByIds[incomeStatementBankingMapping.netProfitForTheYear];
      if (fields[index] && hasData) {
        return {
          netInterestIncome: formatValueBillion(
            dataByIds[incomeStatementBankingMapping.netInterestIncome][
              fields[index].key
            ],
          ),
          netFeeAndCommissionIncome: formatValueBillion(
            dataByIds[incomeStatementBankingMapping.netFeeAndCommissionIncome][
              fields[index].key
            ],
          ),
          operatingIncome: formatValueBillion(
            dataByIds[incomeStatementBankingMapping.totalOperatingIncome][
              fields[index].key
            ],
          ),
          provisionForCreditLoses: formatValueBillion(
            dataByIds[incomeStatementBankingMapping.provisionForCreditLosses][
              fields[index].key
            ],
          ),
          netProfitAfterTax: formatValueBillion(
            dataByIds[incomeStatementBankingMapping.netProfitForTheYear][
              fields[index].key
            ],
          ),
          time: this.getFieldTitle(fields[index]),
        };
      }

      return {
        netInterestIncome: 0,
        netFeeAndCommissionIncome: 0,
        operatingIncome: 0,
        provisionForCreditLoses: 0,
        netProfitAfterTax: 0,
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
      COLUMN_FOUR_COLOR,
      COLUMN_FIVE_COLOR,
    } = theme === THEMES.DARK ? SETTINGS : LIGHT_SETTINGS;
    const tooltips = [
      {
        i18nKey:
          'financialStatement.incomeStatementChart.netInterestIncomeTooltip',
        key: 'netInterestIncome',
      },
      {
        i18nKey:
          'financialStatement.incomeStatementChart.operatingIncomeTooltip',
        key: 'operatingIncome',
      },
      {
        i18nKey:
          'financialStatement.incomeStatementChart.netProfitAfterTaxTooltip',
        key: 'netProfitAfterTax',
      },
      {
        i18nKey:
          'financialStatement.incomeStatementChart.netFeeAndCommissionIncomeTooltip',
        key: 'netFeeAndCommissionIncome',
      },
      {
        i18nKey:
          'financialStatement.incomeStatementChart.provisionForCreditLosesTooltip',
        key: 'provisionForCreditLoses',
      },
    ];

    const listLegendChart = [
      ConstChart.setLegendConfig(
        ConstChart.GROUPCHART,
        I18n.t('financialStatement.incomeStatementChart.netInterestIncome'),
        COLUMN_ONE_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.BARCHART,
        I18n.t('financialStatement.incomeStatementChart.operatingIncome'),
        COLUMN_TWO_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.BARCHART,
        I18n.t('financialStatement.incomeStatementChart.netProfitAfterTax'),
        COLUMN_THREE_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.CIRCLEMARKERLINE,
        I18n.t(
          'financialStatement.incomeStatementChart.netFeeAndCommissionIncome',
        ),
        COLUMN_FOUR_COLOR,
      ),
      ConstChart.setLegendConfig(
        ConstChart.CIRCLEMARKERLINE,
        I18n.t(
          'financialStatement.incomeStatementChart.provisionForCreditLoses',
        ),
        COLUMN_FIVE_COLOR,
      ),
    ];

    return generateChartConfig({
      tooltips,
      listLegendChart,
      title: {
        title: I18n.t('financialStatement.incomeStatementChart.profitAndLoss'),
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

BankingChart.propTypes = {
  startIndex: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,
  dataByIds: PropTypes.object.isRequired,
  width: PropTypes.number,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(BankingChart);
