import React from 'react';
import { connect } from 'react-redux';
import { setCode, REDUCER_NAME } from './reducer';
import { SearchFilter } from '../../../common/search-filter';
import ConstCommon from '../../../common/Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

const getListSearchFromRedux = (state) => state[REDUCER_NAME].listDataSearch;

class SearchBox extends React.Component {

  render() {
    const { code, displayCode, id , companyName} = this.props;

    return (
      <SearchFilter
        parentSelector=".technical-wrapper"
        schema={[
          { key: 'displayCode', className: 'w-20' },
          { key: 'codeName', className: 'w-55 text-truncate' },
          {
            key: 'exchange', className: 'w-25', render: (text) => {
              return text.toUpperCase();
            }
          },
        ]}
        listKeyFilter={['displayCode', 'codeName']}
        getListSearchFromRedux={getListSearchFromRedux}
        currentSearch={{ code, displayCode }}
        tickerNameAndExchange={companyName}
        isShowSmallInfoTicker={true}
        sortKey={'displayCode'}
        mainKey={'code'}
        clickItemSearch={(code) => {
          this.props.setCode(code, id);
        }}
      />
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setCode: (code, id) => dispatch(setCode(code, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    organization: state.organization
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
