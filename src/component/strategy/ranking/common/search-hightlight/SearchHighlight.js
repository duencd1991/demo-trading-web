import React from 'react';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { searchTextInListByListKey } from '../../../../helpers/Common';

const MAX_SHOW = 20;

class SearchHighlight extends React.Component {
  i18nHighLight = I18n.t('common.searchHighlight.search');

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      textSearch: '',
      currentItemActive: -1,
      listFilter: [],
    };
    this.listSearchRef = {};
    this.parentListSearchRef = React.createRef();
    this.inputRef = React.createRef();
  }

  handleClickOutside() {
    if (this.state.isShow && this.state.listFilter.length > 0) {
      this.setState({ ...this.state, isShow: false, currentItemActive: -1 });
      this.clickItemSearch('');
    } else {
      this.setState({
        ...this.state,
        isShow: false,
        currentItemActive: -1,
        textSearch: '',
      });
      //this.clearInput();
    }
  }

  handleShowHide = isShow => {
    this.setState({ ...this.state, isShow });
  };

  clearInput = () => {
    this.inputRef.current.value = '';
  };

  clickItemSearch = code => {
    const { clickItemSearch } = this.props;
    clickItemSearch(code);
    this.inputRef.current.value = code;
    //this.clearInput();
    this.inputRef.current.blur();
    this.setState({ isShow: false, currentItemActive: -1 });
  };

  handleChangeSearch = textSearch => {
    const { listSearch, listKeyFilter, sortKey } = this.props;
    const listFilter = this.getListFilter(
      listSearch,
      listKeyFilter,
      textSearch,
      sortKey,
    );

    this.setState({
      ...this.state,
      textSearch,
      isShow: true,
      currentItemActive: -1,
      listFilter,
    });
  };

  enterKeyBoard = listFilter => () => {
    const { currentItemActive } = this.state;
    const { mainKey, sortKey, enableSearchByTicker } = this.props;

    if (this.props.typeSearch === 'highlight') {
      if (listFilter.length > 0) {
        const index = currentItemActive >= 0 ? currentItemActive : 0;
        this.clickItemSearch(listFilter[index][mainKey]);
      }
    }
    this.inputRef.current.blur();
  };

  scrollView = listFilter => count => {
    const currentItemActive = this.state.currentItemActive + count;
    if (currentItemActive >= 0 && currentItemActive < listFilter.length) {
      this.parentListSearchRef.current.scrollTop = this.listSearchRef[
        currentItemActive
      ].offsetTop;
      this.setState({ ...this.state, currentItemActive });
    }
  };

  getListFilter = (listSearch, listKeyFilter, textSearch, sortKey) => {
    const { result: totalListFilter } = searchTextInListByListKey(
      listSearch,
      textSearch,
      listKeyFilter,
    );
    return totalListFilter.filter((item, index) => index < MAX_SHOW);
  };

  handleCondition = (typeSearch, isBelongToWatchList) => {
    if (isBelongToWatchList) {
      return typeSearch === 'highlight';
    }
    return true;
  };

  render() {
    const {
      typeSearch,
      fetchListNewsData,
      setQueryNewValue,
      dateRangeOption,
      disabled,
      isBelongToWatchList,
      enableSearchByTicker,
    } = this.props;
    const { currentItemActive, listFilter } = this.state;
    const isShowSearchList = this.handleCondition(
      typeSearch,
      isBelongToWatchList,
    );

    return (
      <div className="item-filter search-add">
        <div className="search-filter">
          <SearchBox
            disabled={disabled}
            inputRef={this.inputRef}
            handleShowHide={this.handleShowHide}
            handleChange={this.handleChangeSearch}
            typeSearch={typeSearch}
            fetchListNewsData={fetchListNewsData}
            setQueryNewValue={setQueryNewValue}
            dateRangeOption={dateRangeOption}
            scrollView={this.scrollView(listFilter)}
            enterKeyBoard={this.enterKeyBoard(listFilter)}
            textSearch={this.state.textSearch}
            isShowSearchList={isShowSearchList}
          />
          {// (typeSearch === 'Add' || typeSearch === 'Search') ?
          isShowSearchList && (
            <SearchList
              clickItemSearch={this.clickItemSearch}
              isShow={this.state.isShow}
              listFilter={listFilter}
              parentListSearchRef={this.parentListSearchRef}
              listSearchRef={this.listSearchRef}
              currentItemActive={currentItemActive}
              enableSearchByTicker={enableSearchByTicker}
            />
          )}
        </div>
      </div>
    );
  }
}

SearchHighlight.propTypes = {
  listSearch: PropTypes.array,
  listKeyFilter: PropTypes.array,
  fetchListNewsData: PropTypes.func,
  setQueryNewValue: PropTypes.func,
  clickItemSearch: PropTypes.func,
  enableSearchByTicker: PropTypes.bool,
};

SearchHighlight.defaultProps = {
  enableSearchByTicker: false,
  listSearch: [],
  listKeyFilter: search => {},
  fetchListNewsData: query => {},
  setQueryNewValue: query => {},
  clickItemSearch: code => {},
};

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(
  enhanceWithClickOutside(SearchHighlight),
);
