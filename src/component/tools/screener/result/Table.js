import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { cellNegtiveRed } from '../../../common/table/CustomCellTable';
import Table from '../../../common/table/Table';
import TextBlink from '../../../common/table/TextBlink';
import {
  formatPercent,
  formatTextFloat,
  formatValueBillion,
  formatVolume,
  formatPrice,
  formatValue,
} from '../../../helpers/Text';
import CellHover from '../../../market/watchlist/summary/CellHover';
import { REDUCER_NAME, loadMoreData } from '../reducer';
import withScroll from './../../../common/withScroll';
import TradingViewUrl from '../../../common/TradingViewUrl';
import Const from './Const';

class TableResult extends React.PureComponent {
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

  getSector(icbCode) {
    const { listSector } = this.props;
    return (
      listSector.filter(item => item.icbCode === icbCode).pop().icbName || '--'
    );
  }

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

      if (_.includes([listColumn.SECTOR], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            return (
              <TextBlink
                item={item}
                tradingDate="tradingDate"
                className="text-left"
              >
                {this.getSector(text)}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.RTD21], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {cellNegtiveRed(text)}
              </TextBlink>
            );
          },
        };
      }

      if (
        _.includes(
          [
            listColumn.RTD11,
            listColumn.ISA20TTM,
            listColumn.ISA20Y,
            listColumn.RTQ25,
            listColumn.RTQ25,
            listColumn.RYQ25,
          ],
          key,
        )
      ) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(formatValueBillion(text))}
              </TextBlink>
            );
          },
        };
      }

      if (
        _.includes(
          [
            listColumn.RTD36,
            listColumn.RTQ12,
            listColumn.RTQ14,
            listColumn.RQD52,
            listColumn.RTD55,
            listColumn.RTQ160,
            listColumn.FREE_FLOAT_RATE,
            listColumn.ROE,
            listColumn.RTQ166,
            listColumn.RTQ176,
            listColumn.ORGANIZATION_OWNERSHIP,
            listColumn.PERCENTPRICECHANGE1DAY,
            listColumn.PERCENTPRICECHANGE1WEEK,
            listColumn.PERCENTPRICECHANGE1MONTH,
            listColumn.PERCENTPRICECHANGE3MONTH,
            listColumn.PERCENTPRICECHANGE6MONTH,
            listColumn.PERCENTPRICECHANGE52WEEK,
            listColumn.PERCENTPRICECHANGEYTD,
            listColumn.PERCENTPRICECHANGEYTD,
            listColumn.RTD51,
          ],
          key,
        )
      ) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatPercent(text)} %
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.AVERAGE_VOLUME_3MONTH], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(formatVolume(text))}
              </TextBlink>
            );
          },
        };
      }

      if (
        _.includes(
          [
            listColumn.AVERAGE_VALUE_1MONTH,
            listColumn.TOTALMATCHVALUE,
            listColumn.AVERAGEVALUE1WEEK,
            listColumn.AVERAGEVALUE2WEEK,
            listColumn.AVERAGEVALUE1MONTH,
            listColumn.AVERAGEVALUE3MONTH,
          ],
          key,
        )
      ) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(formatValue(text))}
              </TextBlink>
            );
          },
        };
      }

      if (
        _.includes(
          [
            listColumn.CLOSE_PRICE,
            listColumn.MA20,
            listColumn.MA50,
            listColumn.MA100,
            listColumn.MA100,
            listColumn.TOTALMATCHVOLUME,
            listColumn.AVERAGEVOLUME1WEEK,
            listColumn.AVERAGEVOLUME2WEEK,
            listColumn.AVERAGEVOLUME1MONTH,
            listColumn.AVERAGEVOLUME3MONTH,
          ],
          key,
        )
      ) {
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

      if (_.includes([listColumn.ICBRANK], key)) {
        return {
          ...result,
          render: (text, item) => {
            return (
              <TextBlink item={item} tradingDate="tradingDate">
                {formatTextFloat(text, 0)}
              </TextBlink>
            );
          },
        };
      }

      if (_.includes([listColumn.OVER_SMA50], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'center' },
          render: text => {
            if (text === false)
              return (
                <div className="text-center">
                  <span className="text-center text-s-color-3">
                    <i className="icon-remove-symbol" />
                  </span>
                </div>
              );
            else {
              return '';
            }
          },
        };
      }

      return {
        ...result,
        render: text => (
          <TextBlink item={item} tradingDate="tradingDate">
            {formatTextFloat(text)}
          </TextBlink>
        ),
      };
    });

  render() {
    const { isLoading, table, ids, listHideColumn } = this.props;
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
        hideColumns={listHideColumn || Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        schema={this.schema(Const.listColumn, 'stockScreener.resultHeader')}
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
    listSector: state[REDUCER_NAME].listSector,
    listHideColumn: state[REDUCER_NAME].listHideColumn,
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

export default enhance(TableResult);
