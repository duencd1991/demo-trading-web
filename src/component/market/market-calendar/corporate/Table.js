import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import {
  formatTextFloat,
  formatPrice,
  formatValueBillion,
  formatValue,
  formatPercent,
} from '../../../helpers/Text';
import { formatDate } from '../../../helpers/DateTime';
import { getColorSourceLink } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import PerformanceChartWrap from '../../watchlist/summary/PerformanceChartWrap';
import { REDUCER_NAME, loadMoreCorporateDiv } from './../reducer';
import _ from 'lodash';
import Lazy from '../../../common/table/Lazy';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../common/TradingViewUrl';

const TYPES = {
  CASH: 'cashDividend',
  STOCK: 'stockDividend',
};

const valText = '--';

class TableAnomaly extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isCashDiv: true,
      page: 1,
      pageSize: 50,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    return this.setState({
      isCashDiv: this.props.typeDiv === TYPES.CASH ? true : false,
    });
  }

  getDataFromRedux = () => {
    const { typeDiv: type } = this.props;
    if (type === TYPES.CASH) {
      return state => state[REDUCER_NAME].listCashDividendByTicker;
    }
    if (type === TYPES.STOCK) {
      return state => state[REDUCER_NAME].listStockDividendByTicker;
    }
    return state => state[REDUCER_NAME].listDataByTicker;
  };

  getIds = () => {
    const {
      ids,
      cashDividendIds,
      stockDividendIds,
      typeDiv: type,
    } = this.props;

    if (type === TYPES.CASH) {
      return cashDividendIds;
    }

    if (type === TYPES.STOCK) {
      return stockDividendIds;
    }

    return ids;
  };

  handleScroll = e => {
    const { isCashDiv } = this.state;
    const {
      totalPageCash,
      totalPageStock,
      currenPageScrollCash,
      currenPageScrollStock,
    } = this.props;
    const bottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;

    let response = 0;
    let currenPageScroll = 1;
    if (isCashDiv) {
      console.log('scroll cash table');
      response = totalPageCash;
      currenPageScroll = currenPageScrollCash;
    } else {
      console.log('scroll stock table');
      response = totalPageStock;
      currenPageScroll = currenPageScrollStock;
    }

    if (currenPageScroll < response) {
      if (bottom) {
        this.loadmoreActive(response);
      }
    }
  };

  loadmoreActive = totalPage => {
    const { isCashDiv } = this.state;
    const { isFetchingCorporate, loadMoreCorporateDiv } = this.props;

    this.setState(
      prevState => {
        console.log('prevState : ', prevState);
        return {
          page:
            prevState.page === totalPage
              ? prevState.page
              : (prevState.page += 1),
        };
      },
      () => {
        const { page, pageSize } = this.state;
        loadMoreCorporateDiv({ Page: page, PageSize: pageSize, isCashDiv });
      },
    );
  };

  render() {
    const { isCashDiv } = this.state;
    const {
      currentFilterEvents,
      typeDiv,
      ids,
      isFetchingCorporate,
      isFetchingCorporateStock,
      table,
    } = this.props;
    let marketCarlendarTable = Const.marketCarlendarErnTable;
    let titleTable = `marketCalendarCorporate.marketCarlendarErnTable`;

    switch (currentFilterEvents) {
      case Const.listFilterEventByKey.div.key:
        if (typeDiv === Const.listTypeDivEventByKey.cash.key) {
          marketCarlendarTable = Const.marketCarlendarDivCashTable;
          titleTable = `marketCalendarCorporate.marketCarlendarDivCashTable`;
        } else {
          marketCarlendarTable = Const.marketCarlendarDivStockTable;
          titleTable = `marketCalendarCorporate.marketCarlendarDivStockTable`;
        }
        break;
      case Const.listFilterEventByKey.sis.key:
        marketCarlendarTable = Const.marketCarlendarSisTable;
        titleTable = `marketCalendarCorporate.marketCarlendarSisTable`;
        break;
      case Const.listFilterEventByKey.ipo.key:
        marketCarlendarTable = Const.marketCarlendarIpoTable;
        titleTable = `marketCalendarCorporate.marketCarlendarIpoTable`;
        break;
      case Const.listFilterEventByKey.agm.key:
        marketCarlendarTable = Const.marketCarlendarAgmTable;
        titleTable = `marketCalendarCorporate.marketCarlendarAgmTable`;
        break;
      default:
        break;
    }

    let isFetching;
    if (isCashDiv) {
      isFetching = isFetchingCorporate;
    } else {
      isFetching = isFetchingCorporateStock;
    }

    return (
      <Table
        table={table}
        thValign="top"
        ids={this.getIds()}
        getDataFromRedux={this.getDataFromRedux()}
        onScrollFunction={this.handleScroll}
        isLoading={isFetching}
        schema={Object.keys(marketCarlendarTable).map((item, index) => {
          const key = marketCarlendarTable[item];
          const title = `${titleTable}.${item}`;
          const result = {
            key,
            title,
          };

          if (index === 0) {
            return {
              disableSort: true,
              ...result,
              render: (text, item) => (
                <>
                  <TradingViewUrl code={item.organCode} />
                  &nbsp;{text}
                </>
              ),
            };
          }

          if (
            _.includes(
              [
                Const.marketCarlendarErnTable.REVENUE,
                Const.marketCarlendarErnTable.PROFIT,
              ],
              key,
            )
          ) {
            return {
              disableSort: true,
              ...result,
              //thStyle: { textAlign: 'right' },
              render: text => {
                return formatTextFloat(formatValueBillion(text));
              },
            };
          }

          if (
            _.includes(
              [
                // Const.marketCarlendarErnTable.REVENUEERN,
                Const.marketCarlendarErnTable.REV,
                // Const.marketCarlendarErnTable.PROFIT,
                Const.marketCarlendarErnTable.PROFIT_FORECAT,
              ],
              key,
            )
          ) {
            return {
              disableSort: true,
              ...result,
              render: (text, item) => {
                return formatTextFloat(formatPrice(text));
              },
            };
          }

          if (
            _.includes(
              [
                // Const.marketCarlendarErnTable.COMPANY,
                Const.marketCarlendarDivCashTable.DIV_YEAR,
                Const.marketCarlendarDivStockTable.DIV_YEAR,
                Const.marketCarlendarSisTable.YEAR,
                Const.marketCarlendarDivCashTable.DIV_TYPE,
                Const.marketCarlendarDivStockTable.DIV_TYPE,
              ],
              key,
            )
          ) {
            return {
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return <div className="text-left"> {text} </div>;
              },
            };
          }

          //==============================
          //DIV section
          //==============================
          if (
            _.includes(
              [
                Const.marketCarlendarDivCashTable.VALUE,
                Const.marketCarlendarSisTable.ISSUE_VOLUMN,
              ],
              key,
            )
          ) {
            return {
              ...result,
              render: (text, item) => {
                return formatTextFloat(formatPrice(text));
              },
            };
          }

          if (
            _.includes(
              [
                Const.marketCarlendarDivCashTable.RECORD_DATE,
                Const.marketCarlendarDivCashTable.PAYOUT_DATE,
                Const.marketCarlendarDivStockTable.RECORD_DATE,
                Const.marketCarlendarDivStockTable.PAYOUT_DATE,
                Const.marketCarlendarDivCashTable.AN_DATE,
                Const.marketCarlendarDivCashTable.EX_RIGHT_DATE,
                Const.marketCarlendarDivStockTable.AN_DATE,
                Const.marketCarlendarDivStockTable.EX_RIGHT_DATE,
                Const.marketCarlendarSisTable.ISSUE_DATE,
                Const.marketCarlendarSisTable.LISTING_DATE,
              ],
              key,
            )
          ) {
            return {
              ...result,
              thStyle: { textAlign: 'left' },
              render: (text, item) => {
                let date = new Date(text);
                return text !== valText ? (
                  <div className="text-left font-weight-light">
                    {formatDate(date)}
                  </div>
                ) : (
                  <div className="text-left" />
                );
              },
            };
          }

          if (
            _.includes(
              [
                Const.marketCarlendarDivCashTable.EX_RATIO,
                Const.marketCarlendarSisTable.ISSUE_PERCEN,
                Const.marketCarlendarIpoTable.IPO_RATIO,
              ],
              key,
            )
          ) {
            return {
              ...result,
              render: text => {
                return formatPercent(formatTextFloat(text)) + '%';
              },
            };
          }

          if (_.includes([Const.marketCarlendarDivCashTable.REFERENCE], key)) {
            return {
              ...result,
              disableSort: true,
              render: text => text,
            };
          }

          //==============================
          //SIS section
          //==============================
          if (_.includes([Const.marketCarlendarSisTable.STATUS], key)) {
            return {
              ...result,
              disableSort: true,
              thStyle: { textAlign: 'left' },
              render: text => {
                if (text === 'P') {
                  return <div className="text-left"> {'Pending'} </div>;
                } else {
                  return <div className="text-left"> {'Done'} </div>;
                }
              },
            };
          }

          if (_.includes([Const.marketCarlendarSisTable.ISSUE_VOLUMN], key)) {
            return {
              ...result,
              render: text => {
                return formatPrice(text);
              },
            };
          }

          if (_.includes([Const.marketCarlendarSisTable.ISSUE_METHOD], key)) {
            return {
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return <div className="text-left"> {text} </div>;
              },
            };
          }

          //==============================
          //IPO section
          //==============================
          if (_.includes([Const.marketCarlendarIpoTable.PROFIT], key)) {
            return {
              ...result,
              render: (text, item) => {
                return formatTextFloat(formatValueBillion(text));
              },
            };
          }

          if (_.includes([Const.marketCarlendarIpoTable.REVIPO], key)) {
            return {
              ...result,
              render: (text, item) => {
                return <a>{formatTextFloat(formatValueBillion(text))}</a>;
              },
            };
          }

          if (_.includes([Const.marketCarlendarIpoTable.PRICE], key)) {
            return {
              //disableSort: true,
              ...result,
              render: (text, item) => {
                return formatTextFloat(formatPrice(text));
              },
            };
          }

          if (
            _.includes([Const.marketCarlendarIpoTable.OFFERING_SHARES], key)
          ) {
            return {
              ...result,
              render: (text, item) => {
                return formatTextFloat(formatValue(text));
              },
            };
          }

          if (_.includes([Const.marketCarlendarIpoTable.EXCHANGE], key)) {
            return {
              //disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return <div className="text-left"> {text} </div>;
              },
            };
          }

          if (
            _.includes(
              [
                Const.marketCarlendarIpoTable.COMPANY,
                Const.marketCarlendarErnTable.COMPANY,
                Const.marketCarlendarAgmTable.COMPANY,
              ],
              key,
            )
          ) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return <div className="text-left"> {text} </div>;
              },
            };
          }

          //==============================
          //AGM section
          //==============================

          if (_.includes([Const.marketCarlendarAgmTable.LOCATION], key)) {
            return {
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return text !== valText ? (
                  <div className="text-left">{text}</div>
                ) : (
                  <div />
                );
              },
            };
          }

          if (_.includes([Const.marketCarlendarAgmTable.SOURCE], key)) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return text !== valText ? (
                  <div className={getColorSourceLink('text')}>{text}</div>
                ) : (
                  <div className={getColorSourceLink('text')} />
                );
              },
            };
          }

          if (_.includes([Const.marketCarlendarAgmTable.VENUE], key)) {
            return {
              disableSort: true,
              ...result,
              thStyle: { textAlign: 'left' },
              render: text => {
                return <div className="text-left"> {text} </div>;
              },
            };
          }

          if (
            _.includes(
              [
                Const.marketCarlendarErnTable.PERFORMANCE,
                Const.marketCarlendarDivCashTable.PERFORMANCE,
                Const.marketCarlendarDivStockTable.PERFORMANCE,
              ],
              key,
            )
          ) {
            return {
              disableSort: true,
              disableResize: true,
              thStyle: { textAlign: 'center', width: '120px' },
              ...result,
              render: (text, item) => {
                let organCode = getDataFollowKeyByDot(
                  item,
                  Const.index.ORGAN_CODE,
                );
                return (
                  <div style={{ margin: '0 auto' }}>
                    <PerformanceChartWrap ticker={organCode} />
                  </div>
                );
              },
            };
          }

          return {
            ...result,
            render: text => text,
          };
        })}
      />
    );
  }
}

const mapStateToProps = (state, { typeDiv }) => {
  return {
    ids: state[REDUCER_NAME].listTickerTable,
    cashDividendIds: state[REDUCER_NAME].listCashDividend,
    stockDividendIds: state[REDUCER_NAME].listStockDividend,
    currentFilterEvents: state[REDUCER_NAME].currentFilterEvents,
    typeDiv: typeDiv,

    totalPageCash: state[REDUCER_NAME].totalPageCash,
    totalPageStock: state[REDUCER_NAME].totalPageStock,

    isFetchingCorporate: state[REDUCER_NAME].isFetchingCorporate,
    isFetchingCorporateStock: state[REDUCER_NAME].isFetchingCorporateStock,

    currenPageScrollCash: state[REDUCER_NAME].currenPageScrollCash,
    currenPageScrollStock: state[REDUCER_NAME].currenPageScrollStock,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreCorporateDiv: params => dispatch(loadMoreCorporateDiv(params)),
  };
};

const enhance = compose(
  withScroll(130, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(TableAnomaly);
