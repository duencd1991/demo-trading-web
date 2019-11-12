import React from 'react';
import { connect } from 'react-redux';
import { changeCode, REDUCER_NAME } from '../reducer';
import { SearchFilter } from '../../../common/search-filter';

const getListSearchFromRedux = state => state[REDUCER_NAME].listDataSearch;

class SearchBox extends React.Component {
  clickItemSearch = data => {
    const { id, changeCode } = this.props;
    changeCode(data.code, id);
  };

  render() {
    const { code, displayCode, companyName } = this.props;

    return (
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
        getListSearchFromRedux={getListSearchFromRedux}
        currentSearch={{ code, displayCode }}
        tickerNameAndExchange={companyName}
        isShowSmallInfoTicker={true}
        sortKey={'displayCode'}
        mainKey={'code'}
        clickItemSearch={code => this.clickItemSearch(code)}
      />
    );
  }
}

const mapDispatchToProps = {
  changeCode,
};

export default connect(
  null,
  mapDispatchToProps,
)(SearchBox);
