import React from 'react';
import { connect } from 'react-redux';
import { SearchFilter } from '../../../common/search-filter';
import { changeCurrentSearch, REDUCER_NAME } from '../reducer';
import './searchbox.scss';
import { compose } from 'redux';
import { withComponentId } from './../../../common/ComponentIdContext';

const NAME_MAX_LENGTH = 22;

const getTickerName = currentSearch => {
  let { codeName } = currentSearch;
  if (codeName.length > NAME_MAX_LENGTH) {
    codeName = `${codeName.substr(0, NAME_MAX_LENGTH)}...`;
  }
  return `${codeName} / ${currentSearch.exchange}`;
};

class SearchBox extends React.Component {
  clickItemSearch = code => {
    const { changeCurrentSearch, componentId } = this.props;

    changeCurrentSearch(code, componentId);
  };

  render() {
    const { currentSearch = {} } = this.props;

    return (
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
        getListSearchFromRedux={state => state[REDUCER_NAME].listSearch}
        clickItemSearch={this.clickItemSearch}
        tickerNameAndExchange={getTickerName(currentSearch)}
        currentSearch={currentSearch}
        mainKey={'code'}
        sortKey={'displayCode'}
      />
    );
  }
}

const mapDispatchToProps = {
  changeCurrentSearch,
};

const mapStateToProps = (state, { componentId }) => ({
  componentId,
  currentSearch:
    state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
});

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SearchBox);
