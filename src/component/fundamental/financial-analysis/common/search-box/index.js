import React from 'react';
import { REDUCER_NAME, fetchListSearch, setCondition } from '../../reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withComponentId } from '../../../../common/ComponentIdContext';
import './index.scss';
import IndexSummary from './index-summary';
import { SearchFilter } from '../../../../common/search-filter';

class SearchBox extends React.PureComponent {
  componentDidMount() {
    const { fetchListSearch } = this.props;
    fetchListSearch();
  }

  render() {
    const {
      searchParams = {},
      componentId,
      topContent,
      topContentRealTime,
    } = this.props;
    let currentSearch = {
      displayCode: 'AAA',
      code: 'AAA',
      companyName: 'An Phat Bioplastics /HOSE',
    };

    if (Object.keys(searchParams).length !== 0) {
      currentSearch = {
        displayCode: searchParams.displayCode,
        code: searchParams.code,
        companyName: searchParams.companyName,
      };
    }

    return (
      <div className="search-box-wrapper my-other-step">
        <SearchFilter
          schema={[
            { key: 'displayCode', className: 'w-20' },
            { key: 'codeName', className: 'w-55 text-truncate' },
            {
              key: 'exchange',
              className: 'w-25',
              render: text => text.toUpperCase(),
            },
          ]}
          isShowSmallInfoTicker={true}
          listKeyFilter={['displayCode', 'codeName']}
          mainKey={'code'}
          sortKey={'displayCode'}
          getListSearchFromRedux={state => state[REDUCER_NAME].listDataSearch}
          currentSearch={currentSearch}
          tickerNameAndExchange={currentSearch.companyName}
          clickItemSearch={code => {
            this.props.changeCode(componentId, code);
          }}
        />
        <IndexSummary
          topContent={topContent}
          topContentRealTime={topContentRealTime}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    listDataSearch: state[REDUCER_NAME].listDataSearch,
    searchParams:
      state[REDUCER_NAME].listMultiComponent[componentId].searchParams,
    topContent: state[REDUCER_NAME].listMultiComponent[componentId].topContent,
    topContentRealTime:
      state[REDUCER_NAME].listMultiComponent[componentId].topContentRealTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchListSearch: params => dispatch(fetchListSearch(params)),
    changeCode: (componentId, params) =>
      dispatch(setCondition(componentId, params)),
  };
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SearchBox);
