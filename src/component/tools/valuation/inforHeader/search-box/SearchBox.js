import React from 'react';
import { connect } from 'react-redux';
import { changeCode, REDUCER_NAME } from '../../reducer';
import { SearchFilter } from '../../../../common/search-filter';
import IndexSumary from './index-summary';
import './index.scss';

function SearchBox(props) {
  const {
    clickItemSearch,
    currentSearch,
    indexSumary,
    indexSumaryRealTime,
  } = props;
  const tickerNameAndExchange = currentSearch.tickerNameAndExchange;
  let indexSumanyToProp = {};
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
          clickItemSearch(code);
        }}
        isShowSmallInfoTicker={true}
        tickerNameAndExchange={tickerNameAndExchange}
      />
      <div className="left-info-widget__metas">
        <IndexSumary
          indexSumaryRealTime={indexSumanyToProp}
          isRealTime={isRealTime}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    clickItemSearch: code => dispatch(changeCode(code)),
  };
};

const mapStateToProps = state => {
  return {
    currentSearch: state[REDUCER_NAME].currentSearch,
    indexSumary: state[REDUCER_NAME].indexSumary,
    indexSumaryRealTime: state[REDUCER_NAME].indexSumaryRealTime,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
