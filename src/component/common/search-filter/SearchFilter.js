import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import PropTypes from 'prop-types';
import './index.scss';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import { searchTextInListByListKey } from '../../helpers/Common';

const MAX_SHOW = 20;

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDropDown: false,
      currentSearch: props.currentSearch,
      currentItemActive: -1,
      tickerNameAndExchange: props.tickerNameAndExchange,
      tickerNameAndExchangeTemp: '',
      listFilter: [],
      listSearchPos: {
        left: null,
        top: null,
      },
    };
    this.inputRef = React.createRef();
    this.listSearchRef = {};
    this.parentListSearchRef = React.createRef();
    this.searchListEl = document.createElement('div');
  }

  componentDidMount() {
    const { parentSelector } = this.props;
    if (parentSelector) {
      this.inputRef.current
        .closest(parentSelector)
        .appendChild(this.searchListEl);
      this.table = this.inputRef.current.closest('table').parentNode.parentNode;
      if (this.table) {
        this.table.addEventListener('scroll', this.hideDropDown);
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.currentSearch !== this.props.currentSearch ||
      nextProps.tickerNameAndExchange !== this.props.tickerNameAndExchange
    ) {
      this.setState({
        ...this.state,
        currentSearch: nextProps.currentSearch,
        tickerNameAndExchange: nextProps.tickerNameAndExchange,
        isShowDropDown: false,
        currentItemActive: -1,
      });
    }
    if (nextProps.tickerNameAndExchange !== this.props.tickerNameAndExchange) {
      this.setState({
        ...this.state,
        tickerNameAndExchange: nextProps.tickerNameAndExchange,
        currentSearch: nextProps.currentSearch,
        isShowDropDown: false,
        currentItemActive: -1,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { listFilter } = this.state;
    const { parentSelector } = this.props;
    if (listFilter !== prevState.listFilter && parentSelector) {
      this.setState({
        listSearchPos: this.calcListSearchPos(),
      });
    }
  }

  componentWillUnmount() {
    const { parentSelector } = this.props;
    if (parentSelector && this.inputRef.current) {
      this.inputRef.current
        .closest(parentSelector)
        .appendChild(this.searchListEl);
    }

    if (this.table) {
      this.table.removeEventListener('scroll', this.hideDropDown);
    }
  }

  hideDropDown = () => {
    if (this.state.isShowDropDown) {
      this.setState({
        ...this.state,
        currentItemActive: -1,
        isShowDropDown: false,
        currentSearch: this.props.currentSearch,
        tickerNameAndExchange: this.props.tickerNameAndExchange,
      });
    }
  };

  handleClickOutside = () => {
    this.hideDropDown();
  };

  handleChange = textSearch => {
    const { listKeyFilter, listSearch, sortKey } = this.props;

    const listFilter = this.getListFilter(
      listSearch,
      listKeyFilter,
      textSearch,
      sortKey,
    );

    this.setState({
      isShowDropDown: true,
      currentSearch: {
        [sortKey]: textSearch,
      },
      currentItemActive: -1,
      listFilter,
    });
  };

  clickItemSearch = item => {
    const {
      clickItemSearch,
      currentSearch,
      tickerNameAndExchange,
      mainKey,
    } = this.props;

    if (currentSearch[mainKey] !== item[mainKey]) {
      clickItemSearch(item);
    } else {
      this.setState({
        ...this.state,
        currentSearch,
        isShowDropDown: false,
        currentItemActive: -1,
        tickerNameAndExchange,
      });
    }
  };

  calcListSearchPos = () => {
    const { parentSelector } = this.props;
    const { top, left, height } = this.inputRef.current.getBoundingClientRect();
    const parentRect = this.inputRef.current
      .closest(parentSelector)
      .getBoundingClientRect();
    const listSearchHeight = this.parentListSearchRef.current.clientHeight;
    const padding = 10;
    if (
      top + height + listSearchHeight > parentRect.bottom &&
      top - listSearchHeight - padding > parentRect.top
    ) {
      return {
        left,
        top: top - listSearchHeight - padding,
      };
    }
    return {
      left,
      top: top + height,
    };
  };

  clickSearchBox = e => {
    const { listKeyFilter, listSearch, sortKey, mainKey } = this.props;

    const listFilter = this.getListFilter(
      listSearch,
      listKeyFilter,
      '',
      sortKey,
    );

    this.setState({
      isShowDropDown: true,
      currentSearch: {
        [sortKey]: '',
        [mainKey]: '',
      },
      tickerNameAndExchangeTemp: this.state.tickerNameAndExchange,
      tickerNameAndExchange: '',
      listFilter,
    });
  };

  enterKeyBoard = listFilter => {
    const { currentItemActive } = this.state;
    const { currentSearch } = this.props;
    if (listFilter.length > 0) {
      const index = currentItemActive >= 0 ? currentItemActive : 0;
      this.clickItemSearch(listFilter[index]);
    } else {
      this.setState({
        ...this.state,
        isShowDropDown: false,
        currentSearch,
        tickerNameAndExchange: this.state.tickerNameAndExchangeTemp,
      });
    }
    this.inputRef.current.blur();
  };

  scrollView = (listFilter, count) => {
    const currentItemActive = this.state.currentItemActive + count;
    if (currentItemActive >= 0 && currentItemActive < listFilter.length) {
      this.parentListSearchRef.current.scrollTop = this.listSearchRef[
        currentItemActive
      ].offsetTop;
      this.setState({ currentItemActive });
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

  renderSearchList = () => {
    const { schema, parentSelector } = this.props;
    const {
      isShowDropDown,
      currentItemActive,
      listFilter,
      listSearchPos,
    } = this.state;

    return (
      <SearchList
        isShow={isShowDropDown}
        listSearchPos={parentSelector ? listSearchPos : null}
        parentListSearchRef={this.parentListSearchRef}
        schema={schema}
        listFilter={listFilter}
        clickItemSearch={this.clickItemSearch}
        listSearchRef={this.listSearchRef}
        currentItemActive={currentItemActive}
      />
    );
  };

  render() {
    const {
      isShowSmallInfoTicker,
      parentSelector,
      sortKey,
      mainKey,
    } = this.props;

    const {
      isShowDropDown,
      currentSearch,
      tickerNameAndExchange,
      listFilter,
    } = this.state;

    return (
      <div className="search-filter-wrapper d-inline-block">
        <div className="search-filter">
          <SearchBox
            isShowDropDown={isShowDropDown}
            isShowSmallInfoTicker={isShowSmallInfoTicker}
            tickerNameAndExchange={tickerNameAndExchange}
            listFilter={listFilter}
            enterKeyBoard={() => this.enterKeyBoard(listFilter)}
            inputRef={this.inputRef}
            textSearch={currentSearch[sortKey]}
            mainSearch={currentSearch[mainKey]}
            handleChange={this.handleChange}
            handleChangeTextSmall={this.handleChangeTextSmall}
            clickSearchBox={this.clickSearchBox}
            scrollView={count => this.scrollView(listFilter, count)}
          />
          {parentSelector
            ? ReactDOM.createPortal(this.renderSearchList(), this.searchListEl)
            : this.renderSearchList()}
        </div>
      </div>
    );
  }
}

SearchFilter.propTypes = {
  clickItemSearch: PropTypes.func,
  currentSearch: PropTypes.object,
  getListSearchFromRedux: PropTypes.func,
  listKeyFilter: PropTypes.array,
  schema: PropTypes.array,
  sortKey: PropTypes.string,
  mainKey: PropTypes.string,

  isShowSmallInfoTicker: PropTypes.bool,
  tickerNameAndExchange: PropTypes.string,

  parentSelector: PropTypes.string,
};

SearchFilter.defaultProps = {
  clickItemSearch: code => {},
  currentSearch: {},
  getListSearchFromRedux: state => {},
  listKeyFilter: [],
  schema: [],
  sortKey: '',
  mainKey: '',

  isShowSmallInfoTicker: false,
  tickerNameAndExchange: '',
  parentSelector: '',
};

const mapStateToProps = (state, { getListSearchFromRedux }) => {
  return {
    listSearch: getListSearchFromRedux(state),
  };
};

export default connect(mapStateToProps)(enhanceWithClickOutside(SearchFilter));
