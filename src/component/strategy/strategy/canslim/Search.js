import React from 'react';
import ConstCommon from './../../../common/Const';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { SearchAdd } from './../../../common/search-add/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
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
      listSearch={[]}
      listKeyFilter={[
        ConstCommon.listOrganization.TICKER,
        ConstCommon.listOrganization.ORGAN_SHORT_NAME,
      ]}
      typeSearch={typeSearch}
      dateRangeOption={dateRangeOption}
      fetchListNewsData={[]}
      setQueryNewValue={{}}
      clickItemSearch={{}}
      mainKey={'organCode'}
      sortKey={'ticker'}
      lastTickerSelect={{}}
    />
  );
}
