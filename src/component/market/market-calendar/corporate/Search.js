import React from 'react';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { SearchAdd } from './../../../common/search-add/index';
import { connect } from 'react-redux';
import { REDUCER_NAME as MARKET_CALENDAR_CORPORATE } from './../reducer';

import { filterListSearch, setQueryNewValue, changeCode } from './../reducer';
import ConstCommon from './../../../common/Const';

const mapStateToProps = state => {
  return {
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
    lastTickerSelect: state[MARKET_CALENDAR_CORPORATE].textSearch,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchListNewsData: query => dispatch(filterListSearch(query)),
    setQueryNewValue: query => dispatch(setQueryNewValue(query)),
    clickItemSearch: organCode => dispatch(changeCode(organCode)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

function Search(props) {
  const {
    listSearch,
    typeSearch,
    dateRangeOption,
    fetchListNewsData,
    setQueryNewValue,
    clickItemSearch,
    disabled,
    lastTickerSelect,
  } = props;

  return (
    <SearchAdd
      disabled={disabled}
      listSearch={listSearch}
      listKeyFilter={[
        ConstCommon.listOrganization.TICKER,
        ConstCommon.listOrganization.ORGAN_SHORT_NAME,
      ]}
      typeSearch={typeSearch}
      dateRangeOption={dateRangeOption}
      fetchListNewsData={fetchListNewsData}
      setQueryNewValue={setQueryNewValue}
      clickItemSearch={clickItemSearch}
      mainKey={'organCode'}
      sortKey={'ticker'}
      lastTickerSelect={lastTickerSelect}
    />
  );
}
