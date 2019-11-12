import React from 'react';
import { connect } from 'react-redux';
import { changeCode, REDUCER_NAME } from '../../reducer';
import { SearchFilter } from '../../../../common/search-filter';
import IndexSumary from './index-summary';
//TODO import './index.scss';

function SearchBox(props) {
  const { clickItemSearch, listMultiComponent, id } = props;

  const currentSearch = listMultiComponent[id].currentSearch;
  let tickerNameAndExchange = '';
  let indexSumary = {};
  let indexSumaryRealTime = {};
  let indexSumanyToProp = {};

  if (id in listMultiComponent) {
    tickerNameAndExchange = currentSearch.tickerNameAndExchange;
    indexSumary = listMultiComponent[id].indexSumary;
    indexSumaryRealTime = listMultiComponent[id].indexSumaryRealTime;
  }

  const isRealTime =
    Object.keys(indexSumaryRealTime).length &&
    indexSumary.organCode === indexSumaryRealTime.organCode;
  if (isRealTime) {
    indexSumanyToProp = indexSumaryRealTime;
  } else {
    indexSumanyToProp = indexSumary;
  }

  return (
    <div className="search-box-wrapper">
      <SearchFilter
        schema={[
          { key: 'displayCode', className: 'w-20' },
          { key: 'codeName', className: 'w-55 text-truncate' },
          {
            key: 'exchange',
            className: 'w-25',
            render: text => {
              return text.toUpperCase();
            },
          },
        ]}
        listKeyFilter={['displayCode', 'codeName']}
        getListSearchFromRedux={state =>
          state[REDUCER_NAME].listDataSearch || []
        }
        currentSearch={currentSearch}
        mainKey={'code'}
        sortKey={'displayCode'}
        clickItemSearch={code => {
          clickItemSearch(code, id);
        }}
        isShowSmallInfoTicker={true}
        tickerNameAndExchange={tickerNameAndExchange}
        idMultiComponent={id}
      />
      <div className="left-info-widget__metas">
        <IndexSumary
          id={id}
          indexSumaryRealTime={indexSumanyToProp}
          isRealTime={isRealTime}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    clickItemSearch: (code, id) => dispatch(changeCode(code, id)),
  };
};

const mapStateToProps = state => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
