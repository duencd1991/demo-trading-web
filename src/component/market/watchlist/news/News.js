import React from 'react';
import {
  loadMoreNews,
  REDUCER_NAME,
  setFilterNewValue,
  toggleNewFavorite,
  fetchListNewsData,
} from '../reducer';
import { connect } from 'react-redux';
import moment from 'moment';

import Table from '../../../common/table/Table';
import Const from './Const';
import ExpandTitle from './ExpandTitle';
import FavoriteSpan from './FavoriteSpan';
import SourceSpan from './SourceSpan';

import './hidden-div.scss';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
class TableNew extends React.PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      pageSize: 100,
      page: 1,
      currentNewsId: null,
    };
    this.state = this.initialState;
    this.tableRef = React.createRef();

    const { KEY_LOCAL_STORAGE } = this.props;

    if (localStorage.getItem(KEY_LOCAL_STORAGE) === null) {
      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify([]));
    }
  }

  selectNewsId = currentNewsId => {
    this.setState({ currentNewsId });
  };

  loadMoreActive = () => {
    const { page } = this.state;
    const { loadMoreNews, isFetching, totalPage } = this.props;
    if (page === totalPage || isFetching) return;
    this.setState(
      prevState => {
        return {
          page:
            prevState.page === totalPage ? prevState.page : prevState.page + 1,
        };
      },
      () => {
        const { page, pageSize } = this.state;
        loadMoreNews({
          Page: page,
          PageSize: pageSize,
          KeyWord: this.props.queryNews,
          ...this.props.dateRangeOption,
        });
      },
    );
  };

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.dateRangeOption.FromDate &&
      nextProps.dateRangeOption.FromDate !== this.props.dateRangeOption.FromDate
    ) {
      // this.props.fetchListNewsData(nextProps.dateRangeOption)
      this.resetScroll();
      this.setState({ ...this.initialState });
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { ids } = this.props;
    if (prevProps.ids.length > ids.length) {
      this.setState({ ...this.initialState });
      this.resetScroll();
    }

    const { fetchListNewsData, dateRangeOption } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchListNewsData(dateRangeOption);
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollTop = 0;
  };

  getDataFromRedux = state => state[REDUCER_NAME].listNewsByTicker;

  transformData = filteredIds => {
    const { list } = this.props;

    const listStartFormat = filteredIds.map(id => {
      return {
        id,
        date: moment(list[id].publicDate).format('dddd, MMMM DD, YYYY'),
      };
    });

    const groups = listStartFormat.reduce((groups, item) => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item.id);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map(date => {
      return {
        renderTitle: () => date,
        ids: groups[date],
        canToggle: true,
        rowStyle: {
          cursor: 'pointer',
        },
      };
    });
    return groupArrays;
  };

  getIds = () => {
    const {
      filterOption: { filterKey, filterValue },
      list,
      ids,
    } = this.props;
    if (filterKey) {
      const filtedData = Object.keys(list).filter(key => {
        if (list[key][filterKey] === filterValue) return list[key][filterKey];
      });
      return this.transformData(filtedData);
    }
    return this.transformData(ids);
  };

  handleScroll = e => {
    const { page } = this.state;
    const { totalPage } = this.props;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage) return;
    if (this.props.ids.length < 50) return;
    if (bottom) {
      this.loadMoreActive();
    }
  };

  render() {
    const {
      toggleNewFavorite,
      setFilterNewValue,
      isFetching,
      filterOption,
      table,
    } = this.props;
    const { currentNewsId } = this.state;
    return (
      <Table
        scrollRef={this.tableRef}
        table={table}
        onScrollFunction={this.handleScroll}
        stickyFirstColumn={false}
        hideColumns={['newsId']}
        groups={this.getIds()}
        className="custom-table scroll-table table-striped border-table table-hover table-news w-100"
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        getDataFromRedux={this.getDataFromRedux}
        isLoading={isFetching}
        schema={Object.keys(Const.listColumn).map(item => {
          const key = Const.listColumn[item];
          const title = `watchListNews.listTitleTable.${item}`;
          const result = {
            key,
            title,
          };

          if (key === Const.listColumn.PUBLIC_DATE) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '50px' },
              render: text => (
                <div className="font-weight-light">
                  {moment(text).format('HH:mm')}
                </div>
              ),
            };
          }

          if (key === Const.listColumn.TICKER) {
            return {
              ...result,
              thStyle: { width: '100px', textAlign: 'center' },
              render: text => <div className="text-center">{text}</div>,
            };
          }

          if (key === Const.listColumn.NEWS_TITLE) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: (text, item) => (
                <ExpandTitle
                  currentNewsId={currentNewsId}
                  item={item}
                  selectNewsId={this.selectNewsId}
                >
                  {text}
                </ExpandTitle>
              ),
            };
          }

          if (key === Const.listColumn.NEWS_SOURCE) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '80px', textAlign: 'center' },
              render: text => (
                <SourceSpan
                  setFilterNewValue={setFilterNewValue}
                  text={text}
                  filterOption={filterOption}
                />
              ),
            };
          }

          if (key === Const.listColumn.FAVORITE) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '40px', textAlign: 'center' },
              render: (text, item) => (
                <FavoriteSpan
                  toggleNewFavorite={toggleNewFavorite}
                  text={text}
                  item={item}
                  currentNewsId={currentNewsId}
                />
              ),
            };
          }

          return result;
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].listTickerNews,
    list: state[REDUCER_NAME].listNewsByTicker,
    filterOption: state[REDUCER_NAME].filterOption,
    dateRangeOption: state[REDUCER_NAME].dateRangeOption,
    isFetching: state[REDUCER_NAME].isFetching,
    queryNews: state[REDUCER_NAME].queryNews,
    totalPage: state[REDUCER_NAME].totalPage,
    KEY_LOCAL_STORAGE: state[REDUCER_NAME].KEY_LOCAL_STORAGE,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewFavorite: (key, value) => dispatch(toggleNewFavorite(key, value)),
    setFilterNewValue: (filterKey, filterValue) =>
      dispatch(setFilterNewValue(filterKey, filterValue)),
    loadMoreNews: params => dispatch(loadMoreNews(params)),
    fetchListNewsData: params => dispatch(fetchListNewsData(params)),
  };
};

const enhance = compose(
  withScroll(135, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TableNew);
