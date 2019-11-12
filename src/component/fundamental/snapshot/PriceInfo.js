import IndexSummary from '../common/index-summary';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withComponentId } from './../../common/ComponentIdContext';
import { fetchLatestPrice, REDUCER_NAME } from './reducer';

class PriceInfo extends React.Component {
  getCurrentSearch = () => {
    const { currentSearch = {}, dragCode } = this.props;

    return dragCode
      ? {
          code: dragCode.organCode,
        }
      : currentSearch;
  };

  componentDidMount() {
    const { fetchLatestPrice, componentId } = this.props;
    fetchLatestPrice(this.getCurrentSearch(), componentId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentSearch, fetchLatestPrice, componentId } = this.props;

    if (currentSearch !== prevProps.currentSearch) {
      fetchLatestPrice(currentSearch, componentId);
    }
  }

  render() {
    const { latestPrice = {} } = this.props;

    const priceData = {
      MatchPrice: latestPrice.matchPrice,
      PriceChange: latestPrice.priceChange,
      PercentPriceChange: latestPrice.percentPriceChange,
      ReferencePrice: latestPrice.referencePrice,
    };

    return <IndexSummary topContent={priceData} />;
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    componentId,
    latestPrice:
      state[REDUCER_NAME].listMultiComponent[componentId].latestPrice,
    currentSearch:
      state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
  };
};

const mapDispatchToProps = {
  fetchLatestPrice,
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PriceInfo);
