import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';

import Const from '../../Const';
import Table from '../../../common/table/Table';
import ExpandTitle from '../../common/expand-title';
import SourceSpan from '../../common/source-span';
import FavoriteSpan from '../../common/favorite-span';
import withScroll from '../../../common/withScroll';
import { compose } from 'redux';
import { REDUCER_NAME, setAPIParams } from '../../reducer';

class NATable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  resetScroll = () => {
    // this.tableRef.current.scrollToTop(500)
    this.tableRef.current.scrollTop(500);
  };

  transformData = (filteredIds = []) => {
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
    const { ids } = this.props;
    return this.transformData(ids);
  };

  handleScroll = e => {
    const {
      currentChildTab,
      currentTab,
      setAPIParams,
      commonData,
      isShortByFavorite,
    } = this.props;

    if (isShortByFavorite) return;
    // disable call api cause list fav get from local storage

    const {
      totalPage,
      apiParams: { Page },
    } = commonData;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;

    const top = e.target.scrollTop === 0;

    let newPage = null;

    if (bottom) {
      console.log('bottom');
      if (Page >= totalPage) return;
      newPage = Page + 1;
      setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { Page: newPage },
      );
      this.resetScroll();
    }

    if (top) {
      console.log('on the top');
      if (Page === 1) return;
      newPage = Page - 1;
      setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { Page: newPage },
      );
      this.resetScroll();
    }
  };

  render() {
    const {
      table,
      listColumn = [],
      list,
      ids,
      isLoading = true,
      type,
      isGroupData = true,
      isShortByFavorite = false,
    } = this.props;
    const optionalProps = isGroupData
      ? {
          groups: this.getIds(),
        }
      : {
          ids,
        };
    return (
      <Table
        {...optionalProps}
        scrollRef={this.tableRef}
        onScrollFunction={this.handleScroll}
        className="custom-table scroll-table table-striped border-table table-hover table-news w-100"
        table={table}
        stickyFirstColumn={false}
        // groups={this.getIds()}
        getDataFromRedux={() => {
          return list;
        }}
        hideColumns={[listColumn.ID]}
        resizeable={false}
        columnDraggable={false}
        rowDraggable={false}
        isLoading={isLoading}
        schema={Object.keys(listColumn).map(item => {
          const title = item;
          const key = listColumn[item];
          const result = {
            key,
            title,
          };

          if (key === Const.CommonTable.TIME) {
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

          if (key === Const.CommonTable.TICKER) {
            return {
              ...result,
              thStyle: { width: '100px', textAlign: 'center' },
              render: text => <div className="text-center">{text}</div>,
            };
          }

          if (key === Const.CommonTable.NEWS) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: (text, item) => (
                <ExpandTitle item={item}>{text}</ExpandTitle>
              ),
            };
          }

          if (key === Const.CommonTable.RUMORS) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: (text, item) => (
                <ExpandTitle item={item}>{text}</ExpandTitle>
              ),
            };
          }

          if (key === Const.CommonTable.SOURCE) {
            if (type === 'pa') {
              return {
                disableSort: true,
                disableResize: true,
                ...result,
                thStyle: { width: '80px', textAlign: 'center' },
                render: () => <SourceSpan type="pa" text="FiinTrade" />,
                //TYPE = PA => dont have filter by source cause all source is "FiinTrade"
              };
            }
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '80px', textAlign: 'center' },
              render: text => <SourceSpan text={text} />,
            };
          }

          if (key === Const.CommonTable.TRUSTABILITY) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '80px', textAlign: 'center' },
              render: text => <SourceSpan type="r" text={text} />,
            };
          }

          if (key === Const.CommonTable.TYPE) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '80px', textAlign: 'center' },
              render: text => <SourceSpan text={text} />,
            };
          }

          if (key === Const.CommonTable.CONTRIBUTOR) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '80px', textAlign: 'center' },
              render: text => <SourceSpan text={text} />,
            };
          }

          if (key === Const.CommonTable.FAVORITE) {
            return {
              disableSort: true,
              disableResize: true,
              ...result,
              thStyle: { width: '40px', textAlign: 'center' },
              render: (text, item) => <FavoriteSpan text={text} item={item} />,
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
    theme: state.theme,
    currentTab: state[REDUCER_NAME].currentTab,
    currentChildTab: state[REDUCER_NAME].currentChildTab,
  };
};

const mapDispatchToProps = {
  setAPIParams,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withScroll(180, REDUCER_NAME),
)(NATable);
