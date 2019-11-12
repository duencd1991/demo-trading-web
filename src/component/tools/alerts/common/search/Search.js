import React from 'react';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { searchTextInListByListKey } from '../../../../helpers/Common';

const MAX_SHOW = 20;

class Search extends React.Component {
  i18nHighLight = I18n.t('common.searchHighlight.search');

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      textSearch: '',
      currentItemActive: -1,
      currentItem: {},
      listFilter: [],
    };
    this.listSearchRef = {};
    this.parentListSearchRef = React.createRef();
    this.inputRef = React.createRef();
  }

  handleClickOutside() {
    if (this.state.isShow && this.state.listFilter.length > 0) {
      this.setState({ ...this.state, isShow: false, currentItemActive: -1 });
      this.clickItemSearch(this.state.currentItem);
    } else {
      this.setState({
        ...this.state,
        isShow: false,
        currentItemActive: -1,
        textSearch: this.state.textSearch,
        currentItem: this.state.currentItem,
      });
    }
  }

  handleShowHide = isShow => {
    this.setState({ ...this.state, isShow });
  };

  clearInput = () => {
    this.inputRef.current.value = '';
  };

  clickItemSearch = item => {
    const { clickItemSearch } = this.props;
    clickItemSearch(item);
    this.inputRef.current.value = item ? item.ticker || '' : '';
    this.inputRef.current.blur();
    this.setState({
      isShow: false,
      currentItemActive: -1,
      currentItem: item,
    });
  };
  handleChangeSearch = textSearch => {
    const { listSearch, listKeyFilter, sortKey } = this.props;
    const listFilter = this.getListFilter(
      listSearch,
      listKeyFilter,
      textSearch,
      sortKey,
    );
    // this.clearInput();
    this.setState({
      ...this.state,
      textSearch,
      isShow: true,
      currentItemActive: -1,
      listFilter,
    });
  };

  enterKeyBoard = () => {
    const { currentItemActive, listFilter, textSearch } = this.state;
    const { mainKey } = this.props;
    if (listFilter.length > 0) {
      if (textSearch || currentItemActive >= 0) {
        const index = currentItemActive >= 0 ? currentItemActive : 0;
        this.clickItemSearch(listFilter[index]);
      } else {
        this.clickItemSearch('');
      }
    } else {
      this.clickItemSearch('');
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

  render() {
    const { typeSearch, disabled } = this.props;
    const { currentItemActive, listFilter } = this.state;

    return (
      <div className="item-filter search-add">
        <div className="search-filter">
          <SearchBox
            disabled={disabled}
            inputRef={this.inputRef}
            handleShowHide={this.handleShowHide}
            handleChange={this.handleChangeSearch}
            typeSearch={typeSearch}
            scrollView={this.scrollView(listFilter)}
            enterKeyBoard={this.enterKeyBoard}
            textSearch={this.state.textSearch}
            isShowSearchList={true}
          />
          <SearchList
            clickItemSearch={this.clickItemSearch}
            isShow={this.state.isShow}
            listFilter={listFilter}
            parentListSearchRef={this.parentListSearchRef}
            listSearchRef={this.listSearchRef}
            currentItemActive={currentItemActive}
            enableSearchByTicker={true}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  listSearch: PropTypes.array,
  listKeyFilter: PropTypes.array,
  fetchListNewsData: PropTypes.func,
  setQueryNewValue: PropTypes.func,
  clickItemSearch: PropTypes.func,
  enableSearchByTicker: PropTypes.bool,
};

Search.defaultProps = {
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

export default connect(mapStateToProps)(enhanceWithClickOutside(Search));
