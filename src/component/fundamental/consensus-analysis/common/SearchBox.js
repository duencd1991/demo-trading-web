import React from 'react';
import { connect } from 'react-redux';
import { SearchFilter } from '../../../common/search-filter';
import { REDUCER_NAME, setCurrentSearch } from '../reducer';
import IndexSummary from './../../common/index-summary';
//TODO import './searchbox.scss';

const NAME_MAX_LENGTH = 22;

const getTickerName = currentSearch => {
  let { codeName } = currentSearch;
  if (codeName.length > NAME_MAX_LENGTH) {
    codeName = `${codeName.substr(0, NAME_MAX_LENGTH)}...`;
  }
  return `${codeName} / ${currentSearch.exchange}`;
};

const SearchBox = ({
  setCurrentSearch,
  currentSearch,
  latestPrice,
  componentId,
}) => {
  const priceData = {
    MatchPrice: latestPrice.matchPrice,
    PriceChange: latestPrice.priceChange,
    PercentPriceChange: latestPrice.percentPriceChange,
    ReferencePrice: latestPrice.referencePrice,
  };

  return (
    <div className="search-box-wrapper">
      <SearchFilter
        schema={[
          { key: 'displayCode', className: 'w-20' },
          { key: 'codeName', className: 'w-55 text-truncate' },
          {
            key: 'exchange',
            className: 'w-25',
            render: text => text.toUpperCase(),
          },
        ]}
        isShowSmallInfoTicker={true}
        listKeyFilter={['displayCode', 'codeName']}
        getListSearchFromRedux={state => state[REDUCER_NAME].listSearch}
        clickItemSearch={data => setCurrentSearch(data, componentId)}
        tickerNameAndExchange={getTickerName(currentSearch)}
        currentSearch={currentSearch}
        mainKey={'code'}
        sortKey={'displayCode'}
      />
      <IndexSummary topContent={priceData} />
    </div>
  );
};

const mapStateToProps = (state, { componentId }) => ({
  currentSearch: state[REDUCER_NAME][componentId].currentSearch,
  latestPrice: state[REDUCER_NAME][componentId].latestPrice,
});

const mapDispatchToProps = {
  setCurrentSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
