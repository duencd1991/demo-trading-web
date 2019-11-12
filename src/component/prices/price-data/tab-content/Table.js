import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from '../Const';
import { includes } from 'lodash';
import {
  REDUCER_NAME,
  loadMoreOverviewTable,
  fetchListDataTable,
} from './../reducer';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
  formatValue,
} from './../../../../component/helpers/Text';
import {
  getColorPrice,
  getColorRedGreen,
} from './../../../../component/helpers/Color';
import { getDataFollowKeyByDot } from './../../../../component/helpers/Common';
import {
  formatDate,
  formatYear,
  formatMonthAndYear,
} from '../../../helpers/DateTime';
import { isTicker } from '../../../helpers/Common';
import withScroll from './../../../common/withScroll';

const valText = '--';

class TablePriceData extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: 60,
      tabTitle: props.title,
      schemaKey: props.schemaKey,
      timeRangeFilter: props.timeRangeFilter,
    };
    this.state = this.initialState;
    this.tableRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { id, fetchListDataTable, timeRangeFilter } = this.props;
    if (nextProps.currenPageScroll === 1) {
      this.resetScroll();
    }
    if (
      nextProps.schemaKey !== this.state.schemaKey &&
      nextProps.title !== this.state.tabTitle
    ) {
      this.resetScroll();
      this.setState(
        { page: 1, tabTitle: nextProps.title, schemaKey: nextProps.schemaKey },
        () => fetchListDataTable(id),
      );
    }
    if (nextProps.timeRangeFilter !== timeRangeFilter) {
      this.setState({ ...this.state, page: 1 });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currenPageScroll === 1) {
      this.resetScroll();
    }
    if (
      prevProps.schemaKey !== this.state.schemaKey &&
      prevProps.title !== this.state.tabTitle
    ) {
      const { id, fetchListDataTable } = this.props;
      this.resetScroll();
      this.setState(
        { page: 1, tabTitle: prevProps.title, schemaKey: prevProps.schemaKey },
        () => fetchListDataTable(id),
      );
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollToTop();
  };

  getClassName = item => {
    const { indexSumary } = this.props;
    if (!isTicker(indexSumary)) {
      return getColorPrice(
        getDataFollowKeyByDot(item, Const.priceDataTableOverview.LAST),
        getDataFollowKeyByDot(item, Const.colorChangeAndPercenChange.REF_PRICE),
        99999,
        0,
        'text',
      );
    }

    return getColorPrice(
      getDataFollowKeyByDot(item, Const.priceDataTableOverview.LAST),
      getDataFollowKeyByDot(item, Const.colorChangeAndPercenChange.REF_PRICE),
      getDataFollowKeyByDot(
        item,
        Const.colorChangeAndPercenChange.CEILING_PRICE,
      ),
      getDataFollowKeyByDot(item, Const.colorChangeAndPercenChange.FLOOR_PRICE),
      'text',
    );
  };

  getDataFromRedux = id => {
    return state =>
      state[REDUCER_NAME].listMultiComponent[id].listPriceDataById;
  };

  getIds = (id, listMultiComponent) => {
    const ids = listMultiComponent[id].listPriceDataId;
    return ids;
  };

  handleScroll = e => {
    const { id, listMultiComponent } = this.props;
    const totalPage = listMultiComponent[id].totalPage;
    const currenPageScroll = listMultiComponent[id].currenPageScroll;
    const bottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;
    if (currenPageScroll < totalPage) {
      if (bottom) {
        this.loadmoreActive(totalPage);
      }
    }
  };

  loadmoreActive = totalPage => {
    const { id, listMultiComponent, loadMoreOverviewTable } = this.props;
    const code = listMultiComponent[id].currentSearch.code;
    const isFetching = listMultiComponent[id].isFetching;
    if (isFetching) return;
    this.setState(
      prevState => {
        return {
          page:
            prevState.page === totalPage
              ? prevState.page
              : (prevState.page += 1),
        };
      },
      () => {
        const { page, pageSize } = this.state;
        loadMoreOverviewTable(
          { Code: code, Page: page, PageSize: pageSize },
          id,
        );
      },
    );
  };

  formatDateByTimeRangeFilter = (text, timeRangeFilter) => {
    let formatText = text;
    if (timeRangeFilter === Const.listTimeRangeByKey.Monthly.key) {
      return formatMonthAndYear(formatText);
    }
    if (timeRangeFilter === Const.listTimeRangeByKey.Yearly.key) {
      return formatYear(formatText);
    }
    return formatDate(formatText);
  };

  getSchema = (schemaKey, tabTitle) => {
    const ZERO_VALUE = 0;
    const { indexSumary } = this.props;
    return Object.keys(schemaKey).map((item, index) => {
      const key = schemaKey[item];
      const title = `${tabTitle}.${item}`;
      const result = {
        key,
        title,
      };

      if (includes([Const.priceDataTableOverview.LAST], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            return isTicker(indexSumary)
              ? formatTextFloat(formatPrice(text))
              : formatTextFloat(text);
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.HIGH,
            Const.priceDataTableOverview.LOW,
            Const.priceDataTableOverview.OPEN,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (!isTicker(indexSumary)) {
              return <span>{formatTextFloat(text)}</span>;
            }
            return formatTextFloat(formatPrice(text));
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOrderStatistic.VOLUMN_BUY_ORDER,
            Const.priceDataTableOrderStatistic.VOLUMN_SELL_ORDER,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (text === ZERO_VALUE) {
              return <span>{'--'}</span>;
            }
            return formatTextFloat(text);
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOrderStatistic.NR_OF_BUY_ORDER,
            Const.priceDataTableOrderStatistic.NR_OF_SELL_ORDER,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (text === ZERO_VALUE) {
              return <span>{'--'}</span>;
            }
            return formatTextFloat(formatPrice(text));
          },
        };
      }

      if (includes([Const.priceDataTableOverview.AVERAGE_PRICE], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            return formatTextFloat(formatPrice(text));
          },
        };
      }

      if (includes([Const.priceDataTableOverview.CHANGE], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            const className = this.getClassName(item);
            return (
              <span className={`${className} font-weight-bold`}>
                {formatTextFloat(
                  isTicker(indexSumary) ? formatPrice(text) : text,
                )}
              </span>
            );
          },
        };
      }

      if (includes([Const.priceDataTableOverview.PERCENT_PRICE_CHANGE], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            const className = this.getClassName(item);
            return (
              <span className={`${className} font-weight-bold`}>
                {formatTextFloat(text * 100)}%
              </span>
            );
          },
        };
      }

      if (includes([Const.priceDataTableForeign.OWNED_RATIO], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (text !== valText) {
              return <span>{formatTextFloat(text * 100)}%</span>;
            }
            return <span />;
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.MATCHED_VOLUME,
            Const.priceDataTableOverview.PUT_THROUGH_VOL,
            Const.priceDataTableOverview.TOTAL_VOL,
            Const.priceDataTableForeign.BUY_ORDER_VOL,
            Const.priceDataTableForeign.SELL_ORDER_VOL,
            Const.priceDataTableProprietary.BUY_VOL,
            Const.priceDataTableProprietary.SELL_VOL,
            Const.priceDataTableOrderStatistic.BUY_VOL,
            Const.priceDataTableOrderStatistic.SELL_VOL,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (text === ZERO_VALUE) {
              return <span>{'--'}</span>;
            }
            return formatTextFloat(formatVolume(text));
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.MATCHED_VALUE,
            Const.priceDataTableOverview.PUT_THROUGH_VALUE,
            Const.priceDataTableOverview.TOTAL_VALUE,
            Const.priceDataTableForeign.BUY_ORDER_VALUE,
            Const.priceDataTableForeign.SELL_ORDER_VALUE,
            Const.priceDataTableProprietary.BUY_VALUE,
            Const.priceDataTableProprietary.SELL_VALUE,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            if (text === ZERO_VALUE) {
              return <span>{'--'}</span>;
            }
            return formatTextFloat(formatValue(text));
          },
        };
      }

      if (includes([Const.priceDataTableOverview.DATE], key)) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            const { timeRangeFilter } = this.props;
            //let date = new Date(text);
            let date = this.formatDateByTimeRangeFilter(text, timeRangeFilter);

            if (item.rateAdjusted > 0) {
              console.log('Special date : ', item);
              return <div className="font-weight-light">{`${date} *`}</div>;
            }
            return <div className="font-weight-light">{date}</div>;
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableOrderStatistic.NET_VOL,
            Const.priceDataTableForeign.NET_VOLUME,

            Const.priceDataTableProprietary.NET_VOL,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            const className = getColorRedGreen(text, 'text');
            if (text === ZERO_VALUE || !text) {
              return <span>{'--'}</span>;
            }
            return (
              <span className={className}>
                {formatTextFloat(formatVolume(text))}
              </span>
            );
          },
        };
      }

      if (
        includes(
          [
            Const.priceDataTableForeign.NET_VALUE,
            Const.priceDataTableProprietary.NET_VALUE,
          ],
          key,
        )
      ) {
        return {
          ...result,
          disableSort: true,
          render: (text, item) => {
            const className = getColorRedGreen(text, 'text');
            if (text === ZERO_VALUE || !text) {
              return <span>{'--'}</span>;
            }
            return (
              <span className={className}>
                {formatTextFloat(formatValue(text))}
              </span>
            );
          },
        };
      }

      return {
        ...result,
        disableSort: true,
        render: text => text,
      };
    });
  };

  render() {
    const { id, listMultiComponent, hideColumns, height } = this.props;
    const isFetching = listMultiComponent[id].isFetching;
    const { schemaKey, tabTitle } = this.state;

    return (
      <Table
        table={{ height }}
        thValign="top"
        scrollRef={this.tableRef}
        ids={this.getIds(id, listMultiComponent)}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        getDataFromRedux={this.getDataFromRedux(id)}
        hideColumns={hideColumns}
        onScrollFunction={this.handleScroll}
        isLoading={isFetching}
        schema={this.getSchema(schemaKey, tabTitle)}
      />
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    currenPageScroll:
      state[REDUCER_NAME].listMultiComponent[id].currenPageScroll,
    indexSumary: state[REDUCER_NAME].listMultiComponent[id].indexSumary,
    timeRangeFilter: state[REDUCER_NAME].listMultiComponent[id].timeRangeFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreOverviewTable: (params, id) =>
      dispatch(loadMoreOverviewTable(params, id)),
    fetchListDataTable: id => dispatch(fetchListDataTable(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withScroll(180, REDUCER_NAME)(TablePriceData));
