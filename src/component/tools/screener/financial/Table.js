import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { cellNegtiveRed } from '../../../common/table/CustomCellTable';
import Table from '../../../common/table/Table';
import TextBlink from '../../../common/table/TextBlink';
import { getColorPrice } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatValueBillion,
} from '../../../helpers/Text';
import CellHover from '../../../market/watchlist/summary/CellHover';
import { REDUCER_NAME, loadMoreData } from '../reducer';
import withScroll from './../../../common/withScroll';
import TradingViewUrl from '../../../common/TradingViewUrl';
import Const from './Const';

class TableFinancial extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 30,
    };
    this.tableRef = React.createRef();
  }

  getDataFromRedux = state =>
    state[REDUCER_NAME].listObjectScreenerDataByTicker;

  getClassName = (item, listColumn) => {
    return getColorPrice(
      getDataFollowKeyByDot(item, listColumn.PRICE),
      getDataFollowKeyByDot(item, listColumn.REF_PRICE),
      getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
      getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
      'text',
    );
  };

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
    if (nextProps.page == 1) {
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
            const className = this.getClassName(item, listColumn);
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className={className}
              >
                {formatTextFloat(formatPrice(text))}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.PERCENT_PRICE_CHANGE], key)) {
        return {
          ...result,
          render: (text, item) => {
            const className = this.getClassName(item, listColumn);
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className={className}
              >
                {formatTextFloat(text * 100)}%
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.ISA3], key)) {
        return {
          ...result,
          render: text => (
            <TextBlink item={item} tradingDate="tradingDate">
              {formatTextFloat(formatValueBillion(text), 0)}
            </TextBlink>
          ),
        };
      }

      if (_.includes([listColumn.ISA20], key)) {
        return {
          ...result,
          render: text => (
            <TextBlink item={item} tradingDate="tradingDate">
              {cellNegtiveRed(formatValueBillion(text), 2)}
            </TextBlink>
          ),
        };
      }

      if (_.includes([listColumn.RTD14], key)) {
        return {
          ...result,
          render: text => (
            <TextBlink item={item} tradingDate="tradingDate">
              {cellNegtiveRed(text)}
            </TextBlink>
          ),
        };
      }

      if (_.includes([listColumn.RTD7], key)) {
        return {
          ...result,
          render: text => (
            <TextBlink item={item} tradingDate="tradingDate">
              {formatTextFloat(text, 0)}
            </TextBlink>
          ),
        };
      }

      return {
        ...result,
        render: text => (
          <TextBlink item={item} tradingDate="tradingDate">
            {cellNegtiveRed(text)}
          </TextBlink>
        ),
      };
    });

  render() {
    const { isLoading, table, ids } = this.props;
    return (
      <Table
        scrollRef={this.tableRef}
        table={table}
        thValign="top"
        ids={ids}
        isLoading={isLoading}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        onScrollFunction={this.handleScroll}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        schema={this.schema(Const.listColumn, 'stockScreener.financialHeader')}
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

export default enhance(TableFinancial);
