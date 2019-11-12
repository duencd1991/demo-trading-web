import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import ScrollComponent from '../../common/ScrollComponent';
import Tab from '../../common/tab';
import withPreRender from '../../common/withPreRender';
import { TABS } from './Const';
import {
  fetchCompanyScore,
  fetchLatestPrice,
  fetchLatestPriceSuccess,
  fetchListSearch,
  REDUCER_NAME,
  setComponentData,
  unmountComponent,
} from './reducer';
import TabContent from './TabContent';
import ScoreBox from '../common/header/score-box';
import GroupButton from '../common/header/group-button';
import SearchBox from './common/SearchBox';
import './financial-statement.scss';
import ConstCommon from './../../common/Const';

class FinancialStatement extends PureComponent {
  state = {
    currentTab: TABS.BALANCE_SHEET,
  };

  componentDidMount() {
    const { fetchListSearch, id, setComponentData } = this.props;
    setComponentData(id);
    fetchListSearch();
    MessageHub.subscribe(ChanelConfig.TickChanel, this.onReceivePriceData);
  }

  componentDidUpdate(prevProps) {
    const { code, locale } = this.props;
    if (code !== prevProps.code || locale !== prevProps.locale) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    const { unmountComponent, id } = this.props;
    unmountComponent(id);
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.onReceivePriceData);
  }

  fetchData = () => {
    const { code, fetchLatestPrice, id, fetchCompanyScore } = this.props;
    fetchLatestPrice(
      {
        Code: code,
      },
      id,
    );

    fetchCompanyScore(
      {
        OrganCode: code,
      },
      id,
    );
  };

  onReceivePriceData = data => {
    const { code, fetchLatestPriceSuccess, id } = this.props;
    const price = data.find(item => item.ticker === code);
    if (price) {
      fetchLatestPriceSuccess(
        {
          priceInfo: price,
        },
        id,
      );
    }
  };

  changeTab = currentTab => {
    this.setState({
      currentTab,
    });
  };

  render() {
    const { currentTab } = this.state;
    const { id, code, score } = this.props;
    if (!code) {
      return null;
    }

    return (
      <ScrollComponent>
        <div className="pl-20 pr-20 pt-8 financial-statement-wrapper h-100">
          <div className="top-nav d-flex flex-column h-100">
            <div className="d-flex mb-10 align-items-center">
              <SearchBox componentId={id} />
              <ScoreBox data={score} />
              <GroupButton />
            </div>
            <Tab
              currentTab={currentTab}
              listTab="financialStatement.tabs"
              changeTab={this.changeTab}
            />
            <div className="tab-content flex-fill h-auto d-flex flex-column">
              <TabContent componentId={id} currentTab={currentTab} />
              <div style={{ height: 20 }} />
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

FinancialStatement.propTypes = {
  fetchListSearch: PropTypes.func.isRequired,
  fetchLatestPrice: PropTypes.func.isRequired,
  fetchLatestPriceSuccess: PropTypes.func.isRequired,
  setComponentData: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  fetchCompanyScore: PropTypes.func.isRequired,
  score: PropTypes.object.isRequired,
};

const defaultScore = {};

const mapStateToProps = (state, { id }) => ({
  code:
    state[REDUCER_NAME][id] && state[REDUCER_NAME][id].currentSearch
      ? state[REDUCER_NAME][id].currentSearch.code
      : '',
  score:
    state[REDUCER_NAME][id] && state[REDUCER_NAME][id].score
      ? state[REDUCER_NAME][id].score
      : defaultScore,
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  fetchListSearch,
  fetchLatestPrice,
  fetchLatestPriceSuccess,
  setComponentData,
  unmountComponent,
  fetchCompanyScore,
};

export default compose(
  withPreRender(ConstCommon.listComponent.FinancialStatement),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FinancialStatement);
