import React from 'react';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { searchTextInListByListKey } from '../../helpers/Common';

const MAX_SHOW = 20;

class SearchAdd extends React.Component {
  i18nSearch = I18n.t('common.searchAdd.search');
  i18nAdd = I18n.t('common.searchAdd.add');

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
    const { lastTickerSelect } = this.props;
    const { textSearch } = this.state;
    if (this.props.typeSearch === 'Add') {
      if (this.state.isShow && this.state.listFilter.length > 0) {
        this.setState({ ...this.state, isShow: false, currentItemActive: -1 });
      } else {
        this.setState({
          ...this.state,
          isShow: false,
          currentItemActive: -1,
          textSearch: '',
        });
        this.clearInput();
      }
    }

    if (this.props.typeSearch === 'Search') {
      if (
        this.state.isShow &&
        this.state.listFilter.length > 0 &&
        textSearch === ''
      ) {
        this.setState({
          ...this.state,
          isShow: false,
          currentItemActive: -1,
          textSearch: lastTickerSelect,
        });
      }
    }
  }

  handleShowHide = isShow => {
    this.setState({ ...this.state, isShow });
  };

  clearInput = () => {
    this.inputRef.current.value = '';
  };

  clickItemSearch = (code, displayCode) => {
    const { clickItemSearch } = this.props;
    clickItemSearch(code);

    this.clearInput();
    if (displayCode) {
      this.setState({
        isShow: false,
        textSearch: displayCode,
        currentItemActive: -1,
      });
    }
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
    // if (this.props.typeSearch === 'Add') {
    const { currentItemActive, textSearch } = this.state;
    const { mainKey, sortKey, enableSearchByTicker } = this.props;

    if (this.props.typeSearch === 'Add') {
      if (listFilter.length > 0) {
        const index = currentItemActive >= 0 ? currentItemActive : 0;
        this.clickItemSearch(listFilter[index][mainKey]);
      }
    }

    if (this.props.typeSearch === 'Search') {
      if (listFilter.length > 0) {
        const index = currentItemActive >= 0 ? currentItemActive : 0;
        if (
          currentItemActive >= 0 ||
          (currentItemActive === -1 && listFilter.length < 20) ||
          (listFilter.length >= 20 && textSearch.length > 0)
        ) {
          this.clickItemSearch(listFilter[index][mainKey]);
          this.setState({ textSearch: listFilter[index][sortKey] });
        } else {
          this.clickItemSearch('');
        }
      } else {
        this.setState({ isShow: false, textSearch: '' });
        this.clearInput();
      }
    }
    this.inputRef.current.blur();
  };

  scrollView = listFilter => count => {
    //if (this.props.typeSearch === 'Add') {
    const currentItemActive = this.state.currentItemActive + count;
    if (currentItemActive >= 0 && currentItemActive < listFilter.length) {
      this.parentListSearchRef.current.scrollTop = this.listSearchRef[
        currentItemActive
      ].offsetTop;
      this.setState({ ...this.state, currentItemActive });
    }
    //}
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
      return typeSearch === 'Add';
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
      lastTickerSelect,
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
            //lastTickerSelect={lastTickerSelect}
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
              //enableSearchByTicker={enableSearchByTicker}
            />
          )}
        </div>
      </div>
    );
  }
}

SearchAdd.propTypes = {
  listSearch: PropTypes.array,
  listKeyFilter: PropTypes.array,
  fetchListNewsData: PropTypes.func,
  setQueryNewValue: PropTypes.func,
  clickItemSearch: PropTypes.func,
  enableSearchByTicker: PropTypes.bool,
};

SearchAdd.defaultProps = {
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

export default connect(mapStateToProps)(enhanceWithClickOutside(SearchAdd));
