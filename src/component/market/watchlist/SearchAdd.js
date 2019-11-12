import React from 'react';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../app/commonReducer';
import { SearchAdd } from '../../common/search-add';
import { connect } from 'react-redux';
import {
  fetchListNewsData,
  setQueryNewValue,
  updateWatchList,
} from './reducer';

import ConstCommon from './../../common/Const';

const mapStateToProps = state => {
  return {
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
  };
};

const mapDispatchToProps = {
  fetchListNewsData,
  setQueryNewValue,
  updateWatchList,
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
    updateWatchList,
    disabled,
    isBelongToWatchList,
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
      clickItemSearch={updateWatchList}
      mainKey={'organCode'}
      sortKey={'ticker'}
      isBelongToWatchList={isBelongToWatchList}
    />
  );
}
