import React from 'react';
import SearchFilter from '../../common/search-filter/SearchFilter';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changeCode, REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';

const getListSearchFromRedux = state => state[REDUCER_NAME].listDataSearch;

class Search extends React.Component {
  clickItemSearch = () => code => {
    const { changeCode, componentId } = this.props;

    changeCode(code, componentId);
  };

  render() {
    const { condition } = this.props;

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
        getListSearchFromRedux={getListSearchFromRedux}
        currentSearch={condition}
        tickerNameAndExchange={condition.companyName}
        mainKey={'code'}
        sortKey={'displayCode'}
        clickItemSearch={this.clickItemSearch()}
      />
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    condition: state[REDUCER_NAME].listMultiComponent[componentId].condition,
  };
};

const mapDispatchToProps = {
  changeCode,
};

Search.defaultProps = {
  condition: {
    displayCode: 'AAA',
    code: 'AAA',
    companyName: 'An Phat Plastic',
  },
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Search);
