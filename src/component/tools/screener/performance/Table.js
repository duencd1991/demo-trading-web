import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Table from '../../../common/table/Table';
import TextBlink from '../../../common/table/TextBlink';
import TradingViewUrl from '../../../common/TradingViewUrl';
import { getColorRedGreen } from '../../../helpers/Color';
import { formatPrice, formatTextFloat } from '../../../helpers/Text';
import CellHover from '../../../market/watchlist/summary/CellHover';
import { loadMoreData, REDUCER_NAME } from '../reducer';
import withScroll from './../../../common/withScroll';
import Const from './Const';

class TablePerformance extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 30,
    };
    this.tableRef = React.createRef();
  }

  getDataFromRedux = state =>
    state[REDUCER_NAME].listObjectScreenerDataByTicker;

  handleScroll = e => {
    const { totalPage, loadMoreData, page, isLoading } = this.props;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (page === totalPage || isLoading) return;

    if (bottom) {
      const newpage = page + 1;
      loadMoreData(newpage);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.page === 1) {
      this.resetScroll();
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollToTop();
  };

  schema = (listColumn, i18nTitleKey) =>
    Object.keys(Const.listColumn).map((item, index) => {
      const key = listColumn[item];
      const title = `${i18nTitleKey}.${item}`;

      const result = {
        key,
        title,
      };

      if (index === 0) {
        return {
          ...result,
          render: (text, item) => (
            <CellHover isShowDeleteIcon={false}>
              <TextBlink item={item} tradingDate="tradingDate">
                <TradingViewUrl code={item.stockScreenerItem.organCode} />
                &nbsp;{text}
              </TextBlink>
            </CellHover>
          ),
        };
      }

      if (_.includes([listColumn.PRICE], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(formatPrice(text))}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.PERCENT_PRICE_CHANGE_1DAY], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className={getColorRedGreen(text, 'text')}
              >
                {formatTextFloat(text * 100)}%
              </TextBlink>
            );
          },
        };
      }

      return {
        ...result,
        render: text => {
          return (
            <TextBlink item={item} tradingDate="tradingDate">
              <span className={getColorRedGreen(text, 'text')}>
                {formatTextFloat(text * 100)} %
              </span>
            </TextBlink>
          );
        },
      };
    });

  render() {
    const { ids, isLoading, table } = this.props;
    return (
      <Table
        scrollRef={this.tableRef}
        table={table}
        isLoading={isLoading}
        ids={ids}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        onScrollFunction={this.handleScroll}
        getDataFromRedux={this.getDataFromRedux}
        schema={this.schema(
          Const.listColumn,
          'topVolume.performance.listTitleTable',
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listScreenerDataTicker,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    page: state[REDUCER_NAME].page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreData: page => dispatch(loadMoreData(page)),
  };
};

const enhance = compose(
  withScroll(360, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TablePerformance);
