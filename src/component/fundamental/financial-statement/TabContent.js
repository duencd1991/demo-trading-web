import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Tab from '../../common/tab-timer';
import BalanceSheet from './balance-sheeet/BalanceSheet';
import CashFlowStatement from './cash-flow-statement/CashFlowStatement';
import { TABS, TIME_FILTERS } from './Const';
import IncomeStatement from './income-statement/IncomeStatement';
import { REDUCER_NAME } from './reducer';

const tabMap = {
  [TABS.BALANCE_SHEET]: BalanceSheet,
  [TABS.CASH_FLOW_STATEMENT]: CashFlowStatement,
  [TABS.INCOME_STATEMENT]: IncomeStatement,
};

const timeMap = {
  [TIME_FILTERS.QUARTERLY]: 'quarterly',
  [TIME_FILTERS.YEARLY]: 'yearly',
};

class TabContent extends PureComponent {
  state = {
    timeFilter: TIME_FILTERS.QUARTERLY,
  };

  changeFilter = (timeFilter) => {
    this.setState({
      timeFilter,
    });
  };

  render() {
    const { timeFilter } = this.state;
    const { currentTab, organCode, componentId } = this.props;
    const ContentComponent = tabMap[currentTab];
    return (
      <div className="d-flex flex-column flex-fill">
        <div className="d-flex justify-content-end">
          <div className="mr-5">
            <Tab
              disableTabNormal={true}
              currentTab={timeFilter}
              listTab='financialStatement.timeTab'
              changeTab={this.changeFilter}
            />
          </div>
          <div className="mt-2 export-btn">
            <div className="btn btn-cus-nomal bg-b-color-3">
              <i className="icon-printer-tool" />
              <span className="font-weight-bold">{I18n.t('priceDepth.action.export')}</span>
            </div>
          </div>
        </div>

        <ContentComponent
          componentId={componentId}
          organCode={organCode}
          timeKey={timeMap[timeFilter]}
          key={currentTab}
        />
      </div>

    );
  }
}

TabContent.propTypes = {
  currentTab: PropTypes.number.isRequired,
  organCode: PropTypes.string.isRequired,
  componentId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { componentId }) => ({
  organCode: state[REDUCER_NAME][componentId].currentSearch.code,
});

export default connect(mapStateToProps)(TabContent);
