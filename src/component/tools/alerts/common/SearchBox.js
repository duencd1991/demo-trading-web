import React from 'react';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { Search } from '../common/search/index';
import { connect } from 'react-redux';
import { clickItemSearch } from './../reducer';

import ConstCommon from './../../../common/Const';

const mapStateToProps = state => {
  return {
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
  };
};

const mapDispatchToProps = {
  clickItemSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);

function SearchBox(props) {
  const {
    listSearch,
    typeSearch,
    dateRangeOption,
    clickItemSearch,
    disabled,
  } = props;

  return (
    <Search
      disabled={disabled}
      listSearch={listSearch}
      listKeyFilter={[
        ConstCommon.listOrganization.TICKER,
        ConstCommon.listOrganization.ORGAN_SHORT_NAME,
      ]}
      typeSearch={typeSearch}
      dateRangeOption={dateRangeOption}
      clickItemSearch={clickItemSearch}
      mainKey={'ticker'}
      sortKey={'ticker'}
      enableSearchByTicker={true}
    />
  );
}
