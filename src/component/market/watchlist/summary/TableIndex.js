import React from 'react';
import TradingViewUrl from '../../../common/TradingViewUrl';
import {
  changeIdHover,
  notifyResizeColumnTable,
  REDUCER_NAME,
  toggleConfirmPopupDelete,
} from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { includes, omit } from 'lodash';
import {
  getColorPrice,
  getColorRedWhite,
  getColorRefPrice,
  getColorRedGreen,
} from '../../../helpers/Color';
import {
  formatPrice,
  formatTextFloat,
  formatValue,
  formatVolume,
  formatPercent,
} from '../../../helpers/Text';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import HeadTrend from './HeadTrend';
import CellTrend from './CellTrend';
import CellHover from './CellHover';
import DayRange from './DayRange';
import PerformanceChartWrap from './PerformanceChartWrap';
import TextBlink from '../../../common/table/TextBlink';
import './table.scss';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    isFetching: state[REDUCER_NAME].isFetching,
    ids: state[REDUCER_NAME].listTickerSummaryTable,
    listHideColumnIndex: state[REDUCER_NAME].listHideColumnIndex,
    idHover: state[REDUCER_NAME].organCodeHover,
  };
};

const mapDispatchToProps = {
  toggleConfirmPopupDelete,
  changeIdHover,
};

const getDataFromRedux = state => state[REDUCER_NAME].listSummaryTableByTicker;

class TableIndex extends React.Component {
  handleDelete = (isShow, organCode) => () => {
    const { toggleConfirmPopupDelete } = this.props;

    toggleConfirmPopupDelete(isShow, organCode);
  };

  getSchema = () => {
    return Object.keys(omit(Const.index, Const.listIgnoreColumnIndex)).map(
      (item2, index) => {
        const key = Const.index[item2];
        const title = `watchListSummary.listTitleIndexTable.${item2}`;
        const result = {
          key,
          title,
        };

        if (index === 0) {
          return {
            thStyle: {
              width: '10%',
            },
            ...result,
            render: (text, item, rowIndex) => {
              return (
                <CellHover
                  organCode={item.organCode}
                  rowIndex={rowIndex}
                  isShowDeleteIcon={this.props.isShowDeleteIcon}
                  handleDelete={this.handleDelete(
                    true,
                    getDataFollowKeyByDot(item, Const.index.ORGAN_CODE),
                  )}
                >
                  <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                    <TradingViewUrl code={item.organCode} />
                    &nbsp;
                    {text}
                  </TextBlink>
                </CellHover>
              );
            },
          };
        }

        if (key === Const.index.REFERENCE_PRICE) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink
                item={item}
                tradingDate={Const.index.TRADING_DATE}
                className={getColorRefPrice(
                  formatTextFloat(formatPrice(text)),
                  'text',
                )}
              >
                {formatTextFloat(formatPrice(text), 2, true)}
              </TextBlink>
            ),
          };
        }

        if (
          includes(
            [
              Const.index.AVERAGE_PRICE,
              Const.index.CEILING_PRICE,
              Const.index.HIGHEST_PRICE,
              Const.index.FLOOR_PRICE,
              Const.index.DEAL_PRICE,
              Const.index.LOWEST_PRICE,
              Const.index.OPEN_PRICE,
              Const.index.BEST_1_BID,
              Const.index.BEST_1_OFFER,
            ],
            key,
          )
        ) {
          return {
            ...result,
            render: (text, item) => {
              const className = getColorPrice(
                getDataFollowKeyByDot(item, key),
                getDataFollowKeyByDot(item, Const.index.REFERENCE_PRICE),
                getDataFollowKeyByDot(item, Const.index.CEILING_PRICE),
                getDataFollowKeyByDot(item, Const.index.FLOOR_PRICE),
                'text',
              );
              return (
                <TextBlink
                  item={item}
                  tradingDate={Const.index.TRADING_DATE}
                  className={className}
                >
                  {formatTextFloat(formatPrice(text), 2, true)}
                </TextBlink>
              );
            },
          };
        }

        if (includes([Const.index.MATCH_PRICE], key)) {
          return {
            ...result,
            render: (text, item) => {
              const className = getColorPrice(
                getDataFollowKeyByDot(item, key),
                getDataFollowKeyByDot(item, Const.index.REFERENCE_PRICE),
                getDataFollowKeyByDot(item, Const.index.CEILING_PRICE),
                getDataFollowKeyByDot(item, Const.index.FLOOR_PRICE),
                'text',
              );
              return (
                <TextBlink
                  item={item}
                  tradingDate={Const.index.TRADING_DATE}
                  className={className}
                >
                  {formatTextFloat(formatPrice(text))}
                </TextBlink>
              );
            },
          };
        }

        if (includes([Const.index.PRICE_CHANGE, Const.index.D_CHANGE], key)) {
          return {
            ...result,
            render: (text, item) => {
              const className = getColorPrice(
                getDataFollowKeyByDot(item, Const.index.MATCH_PRICE),
                getDataFollowKeyByDot(item, Const.index.REFERENCE_PRICE),
                getDataFollowKeyByDot(item, Const.index.CEILING_PRICE),
                getDataFollowKeyByDot(item, Const.index.FLOOR_PRICE),
                'text',
              );
              if (includes([Const.index.D_CHANGE], key)) {
                const val = formatTextFloat(text * 100);
                return (
                  <TextBlink
                    item={item}
                    tradingDate={Const.index.TRADING_DATE}
                    className={className}
                  >
                    {val === '--' ? val : val + ' %'}
                  </TextBlink>
                );
              }
              return (
                <TextBlink
                  item={item}
                  tradingDate={Const.index.TRADING_DATE}
                  className={className}
                >
                  {formatTextFloat(formatPrice(text))}
                </TextBlink>
              );
            },
          };
        }

        if (key === Const.index.NET_FOREIGN_VOLUME_MATCHED) {
          return {
            ...result,
            thStyle: {
              width: '70px',
            },
            render: (text, item) => {
              let volume =
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_BUY_VOLUME_MATCHED,
                ) -
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_SELL_VOLUME_MATCHED,
                );
              if (
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_BUY_VOLUME_MATCHED,
                ) === '--' ||
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_SELL_VOLUME_MATCHED,
                ) === '--'
              ) {
                volume = '--';
              }

              const className = getColorRedWhite(volume, 'text');
              return (
                <TextBlink
                  item={item}
                  tradingDate={Const.index.TRADING_DATE}
                  className={className}
                >
                  {formatTextFloat(formatVolume(volume), 2, true)}
                </TextBlink>
              );
            },
            valueFromItem: item =>
              getDataFollowKeyByDot(
                item,
                Const.index.FOREIGN_BUY_VOLUME_MATCHED,
              ) -
              getDataFollowKeyByDot(
                item,
                Const.index.FOREIGN_SELL_VOLUME_MATCHED,
              ),
          };
        }

        if (
          includes(
            [
              Const.index.FOREIGN_SELL_VOLUME_MATCHED,
              Const.index.FOREIGN_BUY_VOLUME_MATCHED,
              Const.index.FOREIGN_BUY_VOLUME_TOTAL,
              Const.index.FOREIGN_SELL_VOLUME_TOTAL,
              Const.index.TOTAL_BUY_TRADE_VOLUME,
              Const.index.TOTAL_SELL_TRADE_VOLUME,
              Const.index.TOTAL_DEAL_VOLUME,
            ],
            key,
          )
        ) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                {formatTextFloat(formatVolume(text), 2, true)}
              </TextBlink>
            ),
          };
        }

        if (
          includes(
            [
              Const.index.AVERAGE_MATCHED_VOLUME_2WEEK,
              Const.index.AVERAGE_MATCHED_VOLUME_1MONTH,
              Const.index.AVERAGE_MATCHED_VOLUME_3MONTH,
              Const.index.AVERAGE_MATCHED_VOLUME_1YEAR,
              Const.index.TOTAL_MATCH_VOLUME,
              Const.index.TOTAL_VOLUME,
              Const.index.MATCH_VOLUME,
              Const.index.FOREIGN_CURRENT_ROOM,
            ],
            key,
          )
        ) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                {formatTextFloat(formatVolume(text))}
              </TextBlink>
            ),
          };
        }

        if (
          includes(
            [
              Const.index.FOREIGN_BUY_VALUE_TOTAL,
              Const.index.FOREIGN_SELL_VALUE_TOTAL,
              Const.index.TOTAL_DEAL_VALUE,
            ],
            key,
          )
        ) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                {formatTextFloat(formatValue(text), 2, true)}
              </TextBlink>
            ),
          };
        }

        if (includes([Const.index.TOTAL_MATCH_VALUE], key)) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                {formatTextFloat(formatValue(text), 0)}
              </TextBlink>
            ),
          };
        }

        if (includes([Const.index.MATCH_VALUE, Const.index.FREE_FLOAT], key)) {
          return {
            ...result,
            render: (text, item) => (
              <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                {formatTextFloat(formatValue(text))}
              </TextBlink>
            ),
          };
        }

        if (includes([Const.index.FOREIGN_NET_VALUE_TOTAL], key)) {
          return {
            ...result,
            render: (text, item) => {
              const foreignBuyValue = formatPrice(
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_BUY_VALUE_TOTAL,
                ),
              );
              const foreignSellValue = formatPrice(
                getDataFollowKeyByDot(
                  item,
                  Const.index.FOREIGN_SELL_VALUE_TOTAL,
                ),
              );
              if (includes([foreignBuyValue, foreignSellValue], '--')) {
                return;
              }
              return (
                <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                  {formatTextFloat(
                    formatValue(foreignBuyValue - foreignSellValue),
                  )}
                </TextBlink>
              );
            },
          };
        }

        if (includes([Const.index.FREE_FLOAT_RATE], key)) {
          return {
            ...result,
            render: (text, item) => {
              const totalMatchVolume = formatPrice(
                getDataFollowKeyByDot(item, Const.index.TOTAL_MATCH_VOLUME),
              );
              const freeFloat = formatPrice(
                getDataFollowKeyByDot(item, Const.index.FREE_FLOAT),
              );
              if (
                includes([totalMatchVolume, freeFloat], '--') ||
                freeFloat === 0
              ) {
                return;
              }
              return (
                <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                  {formatTextFloat(formatPercent(totalMatchVolume / freeFloat))}
                </TextBlink>
              );
            },
          };
        }

        if (key === Const.index.RANKING) {
          return {
            key,
            title,
            thStyle: { textAlign: 'center', width: '70px' },
            render: text => {
              const width = `${(text / 5) * 100}%`;
              return (
                <div className="star-vote">
                  <span className="star-real" style={{ width }}>
                    <i className="icon-star-fill" />
                  </span>
                  <span className="star-out">
                    <i className="icon-star-strock" />
                  </span>
                </div>
              );
            },
          };
        }

        if (key === Const.index.CLOSE_PRICE) {
          return {
            key,
            disableSort: true,
            disableResize: true,
            isHtml: true,
            title: <HeadTrend>{title}</HeadTrend>,
            thStyle: { width: '50px' },
            render: (text, item) => <CellTrend>{item}</CellTrend>,
          };
        }

        if (includes([Const.index.ORGAN_SHORT_NAME], key)) {
          return {
            ...result,
            thStyle: { textAlign: 'left' },
            render: (text, item) => <div className="text-left">{text}</div>,
          };
        }

        if (key === Const.index.DAY_RANGE) {
          return {
            disableSort: true,
            disableResize: true,
            thStyle: { width: '153px', textAlign: 'center' },
            ...result,
            render: (text, item) => {
              const lowestPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.LOWEST_PRICE),
              );
              const highestPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.HIGHEST_PRICE),
              );
              const matchPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.MATCH_PRICE),
              );
              const referencePrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.REFERENCE_PRICE),
              );
              if (
                includes(
                  [lowestPrice, highestPrice, matchPrice, referencePrice],
                  '--',
                )
              ) {
                return;
              }
              return (
                <div style={{ padding: '0 8px', width: '150px' }}>
                  <DayRange
                    key={Const.index.DAY_RANGE}
                    lowestPrice={lowestPrice}
                    highestPrice={highestPrice}
                    matchPrice={matchPrice}
                    referencePrice={referencePrice}
                  />
                </div>
              );
            },
          };
        }

        if (key === Const.index._52W_RANGE) {
          return {
            disableSort: true,
            disableResize: true,
            thStyle: { width: '153px', textAlign: 'center' },
            ...result,
            render: (text, item) => {
              const lowestPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.ONE_YEAR_LOW),
              );
              const highestPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.ONE_YEAR_HIGH),
              );
              const matchPrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.MATCH_PRICE),
              );
              const referencePrice = formatPrice(
                getDataFollowKeyByDot(item, Const.index.REFERENCE_PRICE),
              );
              if (
                includes(
                  [lowestPrice, highestPrice, matchPrice, referencePrice],
                  '--',
                )
              ) {
                return;
              }
              return (
                <div style={{ padding: '0 8px', width: '150px' }}>
                  <DayRange
                    key={Const.index._52W_RANGE}
                    lowestPrice={lowestPrice}
                    highestPrice={highestPrice}
                    matchPrice={matchPrice}
                    referencePrice={referencePrice}
                  />
                </div>
              );
            },
          };
        }

        if (key === Const.index.PERFORMANCE) {
          return {
            disableSort: true,
            disableResize: true,
            ...result,
            thClassName: 'fix-width-chart',
            tdClassName: 'fix-width-chart',
            thStyle: { textAlign: 'center', width: '125px' },
            onResize: width => {},
            render: (text, item) => {
              let tickerKey = getDataFollowKeyByDot(
                item,
                Const.index.ORGAN_CODE,
              );
              return (
                <div style={{ paddingRight: 10, paddingLeft: 10 }}>
                  <div style={{ margin: '0 auto' }}>
                    <PerformanceChartWrap ticker={tickerKey} />
                  </div>
                </div>
              );
            },
          };
        }

        if (
          includes(
            [
              Const.index.PERCENT_PRICE_CHANGE_1WEEK,
              Const.index.PERCENT_PRICE_CHANGE_1MONTH,
              Const.index.PERCENT_PRICE_CHANGE_3MONTH,
              Const.index.PERCENT_PRICE_CHANGE_1YEAR,
            ],
            key,
          )
        ) {
          return {
            ...result,
            render: (text, item) => {
              const colorClass = getColorRedGreen(text);
              return (
                <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
                  <div className={colorClass}>{formatPercent(text) + '%'}</div>
                </TextBlink>
              );
            },
          };
        }

        return {
          ...result,
          render: (text, item) => (
            <TextBlink item={item} tradingDate={Const.index.TRADING_DATE}>
              {formatTextFloat(text)}
            </TextBlink>
          ),
        };
      },
    );
  };

  render() {
    const {
      ids,
      listHideColumnIndex,
      isFetching,
      idHover,
      table,
      changeIdHover,
    } = this.props;

    return (
      <div className="watchlist-summary-wrap">
        <Table
          ids={ids}
          table={table}
          isLoading={isFetching}
          resizable={true}
          columnDraggable={true}
          rowDraggable={true}
          hideColumns={listHideColumnIndex}
          getDataFromRedux={getDataFromRedux}
          schema={this.getSchema()}
          onResize={() => {
            this.props.dispatch(notifyResizeColumnTable());
          }}
          idHover={idHover}
          changeIdHover={changeIdHover}
        />
      </div>
    );
  }
}

const enhance = compose(
  withScroll(106, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TableIndex);
