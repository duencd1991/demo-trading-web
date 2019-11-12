import React from 'react';
import { connect } from 'react-redux';
import { changeCode, REDUCER_NAME } from './../../reducer';
import { SearchFilter } from '../../../../common/search-filter';

const mapDispatchToProps = (dispatch) => {
  return {
    clickItemSearch: (code, id) => dispatch(changeCode(code, id)),
  }
};

const mapStateToProps = (state) => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

function SearchBox(props) {
  const { clickItemSearch, id, listMultiComponent } = props;
  let tickerNameAndExchange = '';
  if (id in listMultiComponent) {
    tickerNameAndExchange = listMultiComponent[id].currentSearch.tickerNameAndExchange;
  }
  
  return (
    <SearchFilter
      schema={[
        { key: 'displayCode', className: 'w-20' },
        { key: 'codeName', className: 'w-55 text-truncate' },
        {
          key: 'exchange', className: 'w-25', render: (text) => {
            return text.toUpperCase()
          }
        },
      ]}
      listKeyFilter={['displayCode', 'codeName']}
      getListSearchFromRedux={(state) => state[REDUCER_NAME].listDataSearch || []}
      currentSearch={listMultiComponent[id].currentSearch}
      mainKey={'code'}
      sortKey={'displayCode'}
      clickItemSearch={(code) => {
        clickItemSearch(code, id)
      }}
      isShowSmallInfoTicker={true}
      tickerNameAndExchange={tickerNameAndExchange}
      idMultiComponent={id}/>
  );
}

