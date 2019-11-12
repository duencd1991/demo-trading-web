import React from 'react';
import { connect } from 'react-redux';
import { changeCode, REDUCER_NAME } from '../reducer';
import { SearchFilter } from '../../../../common/search-filter';

const mapDispatchToProps = dispatch => {
  return {
    clickItemSearch: code => dispatch(changeCode(code)),
  };
};

const mapStateToProps = state => {
  return {
    currentSearch: state[REDUCER_NAME].currentSearch,
    tickerNameAndExchange: state[REDUCER_NAME].tickerNameAndExchange,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);

function SearchBox(props) {
  const { clickItemSearch, currentSearch, tickerNameAndExchange } = props;

  return (
    <SearchFilter
      schema={[
        { key: 'ticker', className: 'w-20' },
        { key: 'codeName', className: 'w-55 text-truncate' },
        {
          key: 'exchange',
          className: 'w-25',
          render: text => {
            return text.toUpperCase();
          },
        },
      ]}
      listKeyFilter={['ticker', 'codeName']}
      getListSearchFromRedux={state => state[REDUCER_NAME].listDataSearch}
      currentSearch={currentSearch}
      sortKey={'ticker'}
      mainKey={'organCode'}
      clickItemSearch={clickItemSearch}
      isShowSmallInfoTicker={true}
      tickerNameAndExchange={tickerNameAndExchange}
    />
  );
}
