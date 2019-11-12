import React, { Component } from 'react';
import { ChanelConfig } from '../../../../configs/GlobalConfig';
//TODO import MessageHub from '../../../../core/signalr/SignalrMessageHub';
import TextBlink from '../../../common/table/TextBlink';
import { REDUCER_NAME, updateListDerivative } from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { omit, includes } from 'lodash';
import { getColorPrice, getColorRefPrice } from '../../../helpers/Color';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../helpers/Text';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import DayRange from './DayRange';
import { formatDate } from '../../../helpers/DateTime';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../common/TradingViewUrl';

const getDataFromRedux = state =>
  state[REDUCER_NAME].listDerivativeTableByTicker;

class TableDerivative extends Component {
  componentDidMount() {
    //TODO MessageHub.subscribe(
    //   ChanelConfig.DerivativeChannel,
    //   this.onReceiveDerivatives,
    // );
  }

  componentWillUnmount() {
    //TODO MessageHub.unsubscribe(
    //   ChanelConfig.DerivativeChannel,
    //   this.onReceiveDerivatives,
    // );
  }

  onReceiveDerivatives = derivatives => {
    const { ids, updateListDerivative, derivativeData } = this.props;

    const data = derivatives.reduce((result, derivative) => {
      const id = getDataFollowKeyByDot(
        derivative,
        Const.derivative.DERIVATIVE_CODE,
      );
      if (ids.includes(id)) {
        return {
          ...result,
          [id]: {
            ...derivativeData[id],
            ...derivative,
          },
        };
      }

      return result;
    }, {});
    updateListDerivative(data);
  };

  render() {
    const { ids, table } = this.props;

    return (
      <div className="watchlist-summary-wrap">
        <Table
          table={table}
          ids={ids}
          resizable={true}
          columnDraggable={true}
          rowDraggable={false}
          getDataFromRedux={getDataFromRedux}
          schema={Object.keys(
            omit(Const.derivative, Const.listIgnoreColumnDerivative),
          ).map((item, index) => {
            const key = Const.derivative[item];
            const title = `watchListSummary.listTitleDerivativeTable.${item}`;
            const result = {
              key,
              title,
            };

            if (index === 0) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => (
                  <div className="px-10">
                    <span>
                      <TradingViewUrl
                        code={getDataFollowKeyByDot(
                          item,
                          Const.derivative.DERIVATIVE_CODE,
                        )}
                      />
                      &nbsp;{text}
                    </span>
                  </div>
                ),
              };
            }

            if (key === Const.derivative.REFERENCE_PRICE) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => (
                  <span
                    className={getColorRefPrice(
                      formatTextFloat(formatPrice(text)),
                      'text',
                    )}
                  >
                    <span>
                      <TextBlink
                        item={item}
                        tradingDate={Const.derivative.TRADING_DATE}
                      >
                        {formatTextFloat(text)}
                      </TextBlink>
                    </span>
                  </span>
                ),
              };
            }

            if (key === Const.derivative.MATCHED) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => {
                  const matchPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.MATCH_PRICE,
                  );
                  const currentPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.CURRENT_PRICE,
                  );
                  const className = getColorPrice(
                    currentPrice || matchPrice,
                    getDataFollowKeyByDot(
                      item,
                      Const.derivative.REFERENCE_PRICE,
                    ),
                    getDataFollowKeyByDot(item, Const.derivative.CEILING_PRICE),
                    getDataFollowKeyByDot(item, Const.derivative.FLOOR_PRICE),
                    'text',
                  );
                  return (
                    <span className={className}>
                      <TextBlink
                        item={item}
                        tradingDate={Const.derivative.TRADING_DATE}
                      >
                        {formatTextFloat(currentPrice || matchPrice)}
                      </TextBlink>
                    </span>
                  );
                },
              };
            }

            if (
              includes(
                [
                  Const.derivative.CEILING_PRICE,
                  Const.derivative.HIGHEST_PRICE,
                  Const.derivative.FLOOR_PRICE,
                  Const.derivative.OPEN_PRICE,
                  Const.derivative.LOWEST_PRICE,
                ],
                key,
              )
            ) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => {
                  const className = getColorPrice(
                    getDataFollowKeyByDot(item, key),
                    getDataFollowKeyByDot(
                      item,
                      Const.derivative.REFERENCE_PRICE,
                    ),
                    getDataFollowKeyByDot(item, Const.derivative.CEILING_PRICE),
                    getDataFollowKeyByDot(item, Const.derivative.FLOOR_PRICE),
                    'text',
                  );
                  return (
                    <span className={className}>
                      <TextBlink
                        item={item}
                        tradingDate={Const.derivative.TRADING_DATE}
                      >
                        {formatTextFloat(formatPrice(text))}
                      </TextBlink>
                    </span>
                  );
                },
              };
            }

            if (
              includes(
                [
                  Const.derivative.FOREIGN_BUY_VOLUME_MATCHED,
                  Const.derivative.TOTAL_SELL_TRADE_VOLUME,
                  Const.derivative.TOTAL_BUY_TRADE_VOLUME,
                  Const.derivative.FOREIGN_SELL_VOLUME_MATCHED,
                ],
                key,
              )
            ) {
              return {
                disableSort: true,
                ...result,
                render: text => (
                  <span>{formatTextFloat(formatVolume(text))}</span>
                ),
              };
            }

            if (includes([Const.derivative.MATCH_VOLUME], key)) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => (
                  <span>
                    <TextBlink
                      item={item}
                      tradingDate={Const.derivative.TRADING_DATE}
                    >
                      {formatTextFloat(text, 0)}
                    </TextBlink>
                  </span>
                ),
              }; //NOTE: match volume in derivative does not device 1000
            }

            if (key === Const.derivative.LAST_TRADING_DATE) {
              return {
                disableSort: true,
                ...result,
                render: text => (
                  <div className="px-10 font-weight-light">
                    <span>{formatDate(text)}</span>
                  </div>
                ),
              };
            }

            if (key === Const.derivative.BASIS) {
              return {
                disableSort: true,
                ...result,
                render: (text, item) => {
                  const matchPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.MATCH_PRICE,
                  );
                  const currentPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.CURRENT_PRICE,
                  );
                  const matched = currentPrice || matchPrice;

                  return (
                    <span>
                      <TextBlink
                        item={item}
                        tradingDate={Const.derivative.TRADING_DATE}
                      >
                        {formatTextFloat(
                          matched -
                            getDataFollowKeyByDot(
                              item,
                              Const.derivative.INDEX_VALUE,
                            ),
                        )}
                      </TextBlink>
                    </span>
                  );
                },
              };
            }

            if (key === Const.derivative.DAY_RANGE) {
              return {
                disableSort: true,
                disableResize: true,
                thStyle: { width: '150px', textAlign: 'center' },
                ...result,
                render: (text, item) => {
                  const matchPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.MATCH_PRICE,
                  );
                  const currentPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.CURRENT_PRICE,
                  );
                  const matched = currentPrice || matchPrice;
                  const lowestPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.LOWEST_PRICE,
                  );
                  const highestPrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.HIGHEST_PRICE,
                  );
                  const referencePrice = getDataFollowKeyByDot(
                    item,
                    Const.derivative.REFERENCE_PRICE,
                  );
                  console.log('matched:', matched);
                  return (
                    <div className="px-10">
                      <DayRange
                        lowestPrice={lowestPrice}
                        highestPrice={highestPrice}
                        matchPrice={matched}
                        referencePrice={referencePrice}
                      />
                    </div>
                  );
                },
              };
            }

            if (key === Const.derivative.OPEN_INTEREST) {
              return {
                disableSort: true,
                // disableResize: true,
                ...result,
                render: (text, item) => (
                  <span>
                    <TextBlink
                      item={item}
                      tradingDate={Const.derivative.TRADING_DATE}
                    >
                      {formatTextFloat(text, 0)}
                    </TextBlink>
                  </span>
                ),
              };
            }

            return {
              disableSort: true,
              ...result,
              render: (text, item) => (
                <span>
                  <TextBlink
                    item={item}
                    tradingDate={Const.derivative.TRADING_DATE}
                  >
                    {formatTextFloat(text)}
                  </TextBlink>
                </span>
              ),
            };
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerDerivativeTable,
    derivativeData: state[REDUCER_NAME].listDerivativeTableByTicker,
  };
};

const mapDispatchToProps = {
  updateListDerivative,
};

const enhance = compose(
  withScroll(83, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TableDerivative);
