import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import Loading from '../../common/loading/Loading';
import withMarketPreOpen from '../../common/market-pre-open/withMarketPreOpen';
import ScrollComponent from '../../common/ScrollComponent';
import ScoreBox from '../common/header/score-box';
import GroupButton from '../common/header/group-button';
import SearchBox from './common/SearchBox';
import ConsensusHistory from './consensus-history/ConsensusHistory';
import { Provider } from '../../common/ComponentIdContext';
import './consensus-analysis.scss';
import Recommendation from './recommendation/Recommendation';
import {
  fetchCompanyScore,
  fetchData,
  fetchLatestPrice,
  fetchListSearch,
  initComponent,
  REDUCER_NAME,
  unmountComponent,
} from './reducer';
import TargetPrice from './target-price/TargetPrice';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';

class ConsensusAnalysis extends PureComponent {
  componentDidMount() {
    const { id, initComponent, fetchListSearch } = this.props;
    fetchListSearch();
    initComponent(id);
  }

  componentDidUpdate(prevProps) {
    const { organCode, locale } = this.props;
    if (locale !== prevProps.locale) {
      this.fetchData();
    }
    if (organCode !== prevProps.organCode && organCode) {
      this.fetchData();

      MessageHub.subscribe(ChanelConfig.TickChanel, this.onReceivePriceData);
    }
  }

  componentWillUnmount() {
    const { id, unmountComponent } = this.props;
    unmountComponent(id);
  }

  fetchData = () => {
    const {
      id,
      organCode,
      fetchData,
      fetchLatestPrice,
      fetchCompanyScore,
    } = this.props;
    fetchLatestPrice(
      {
        Code: organCode,
      },
      id,
    );
    fetchData(
      {
        OrganCode: organCode,
      },
      id,
    );

    fetchCompanyScore(
      {
        OrganCode: organCode,
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

  render() {
    const { id, organCode, score, isLoading, locale } = this.props;
    return (
      organCode && (
        <Provider value={id}>
          <ScrollComponent>
            <div className="pl-20 pr-20 pt-8 consensus-analysis-wrapper h-100 position-relative">
              {isLoading && <Loading />}
              <div
                className={`top-nav d-flex flex-column h-100 ${
                  isLoading ? 'loading' : ''
                }`}
              >
                <div className="d-flex mb-10 align-items-center">
                  <SearchBox componentId={id} />
                  <ScoreBox data={score} />
                  <GroupButton />
                </div>

                <div className="tab-content flex-fill h-auto d-flex flex-row">
                  <div className="left-column d-flex flex-column">
                    <Recommendation key={locale} />
                    <TargetPrice />
                  </div>
                  <div className="right-column d-flex">
                    <ConsensusHistory />
                  </div>
                </div>
              </div>
            </div>
          </ScrollComponent>
        </Provider>
      )
    );
  }
}

ConsensusAnalysis.propTypes = {
  id: PropTypes.number.isRequired,
  organCode: PropTypes.string.isRequired,
  initComponent: PropTypes.func.isRequired,
  unmountComponent: PropTypes.func.isRequired,
  fetchListSearch: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  score: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
};

const defaultScore = {};

const mapStateToProps = (state, { id }) => ({
  organCode: state[REDUCER_NAME][id]
    ? state[REDUCER_NAME][id].currentSearch.code
    : '',
  score:
    state[REDUCER_NAME][id] && state[REDUCER_NAME][id].score
      ? state[REDUCER_NAME][id].score
      : defaultScore,
  isLoading: state[REDUCER_NAME][id]
    ? state[REDUCER_NAME][id].isLoading
    : false,
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  initComponent,
  unmountComponent,
  fetchListSearch,
  fetchData,
  fetchLatestPrice,
  fetchCompanyScore,
};

export default compose(
  withPreRender(ConstCommon.listComponent.ConsensusAnalysis),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ConsensusAnalysis);
