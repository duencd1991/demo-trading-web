import React from 'react';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { SearchHighlight } from './search-hightlight';
import { connect } from 'react-redux';
import { changeIdHover } from './../reducer';

import ConstCommon from './../../../common/Const';

const mapStateToProps = state => {
  return {
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
  };
};

const mapDispatchToProps = {
  changeIdHover,
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
    changeIdHover,
    disabled,
  } = props;

  return (
    <SearchHighlight
      disabled={disabled}
      listSearch={listSearch}
      listKeyFilter={[
        ConstCommon.listOrganization.TICKER,
        ConstCommon.listOrganization.ORGAN_SHORT_NAME,
      ]}
      typeSearch={typeSearch}
      dateRangeOption={dateRangeOption}
      clickItemSearch={changeIdHover}
      mainKey={'ticker'}
      sortKey={'ticker'}
      enableSearchByTicker={true}
    />
  );
}
