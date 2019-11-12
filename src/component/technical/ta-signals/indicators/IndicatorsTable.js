import React from 'react';
import { connect } from 'react-redux';
import './Indicators.scss';
import { REDUCER_NAME } from './reducer';
import Table from '../../../common/table/Table';
import Const from './Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import IndicatorsSearch from './IndicatorsSearch';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';

const MIN_RSI = 30;
const MAX_RSI = 70;
const unValiable = '--';

const getStyle = val => {
  if (val === Const.BULLISH) {
    return <span className="text-s-color-5">Bullish</span>;
  }
  if (val === Const.BEARISH) {
    return <span className="text-s-color-3">Bearish</span>;
  }
  if (val === Const.NEUTRAL) {
    return <span className="text-s-color-4">Neutral</span>;
  }
  if (val === Const.STRONG_BULLISH) {
    return <span className="text-s-color-5">Strong Bullish</span>;
  }
  if (val === Const.STRONG_BEARISH) {
    return <span className="text-s-color-3">Strong Bearish</span>;
  }
  return unValiable;
};

const getText = val => {
  if (val === Const.BULLISH) {
    return 'Bullish';
  }
  if (val === Const.BEARISH) {
    return 'Bearish';
  }
  if (val === Const.NEUTRAL) {
    return 'Neutral';
  }
  return unValiable;
};

const getRsi = (rsi, oldRsi) => {
  if (rsi < MIN_RSI && rsi > oldRsi) {
    return Const.BULLISH;
  }
  if (rsi > MAX_RSI && rsi < oldRsi) {
    return Const.BEARISH;
  }
  return Const.NEUTRAL;
};

const getCmf = cmf => {
  if (cmf > 0) {
    return Const.BULLISH;
  }
  if (cmf < 0) {
    return Const.BEARISH;
  }
  return Const.NEUTRAL;
};

const getRoc = (roc, oldRoc) => {
  if (roc > 0.3 && roc < oldRoc) {
    return Const.BULLISH;
  }
  if (roc < -0.3 && roc > oldRoc) {
    return Const.BEARISH;
  }
  return Const.NEUTRAL;
};

const getIndicator = (valRsi, valCmf, valRoc) => {
  let countBullish = 0;
  let countBearish = 0;
  if (valRsi === Const.BULLISH) {
    countBullish++;
  }
  if (valRoc === Const.BULLISH) {
    countBullish++;
  }
  if (valCmf === Const.BULLISH) {
    countBullish++;
  }

  if (valRsi === Const.BEARISH) {
    countBearish++;
  }
  if (valCmf === Const.BEARISH) {
    countBearish++;
  }
  if (valRoc === Const.BEARISH) {
    countBearish++;
  }

  if (countBullish > countBearish) {
    return Const.BULLISH;
  }
  if (countBullish < countBearish) {
    return Const.BEARISH;
  }
  return Const.NEUTRAL;
};

const getSummary = (valMoving, valIndicator) => {
  let countBullish = 0;
  let countBearish = 0;
  let countNeutral = 0;

  if (valMoving === Const.BULLISH) {
    countBullish++;
  }
  if (valIndicator === Const.BULLISH) {
    countBullish++;
  }
  if (valMoving === Const.BEARISH) {
    countBearish++;
  }
  if (valIndicator === Const.BEARISH) {
    countBearish++;
  }
  if (valMoving === Const.NEUTRAL) {
    countNeutral++;
  }
  if (valIndicator === Const.NEUTRAL) {
    countNeutral++;
  }
  if (countBullish === 1 && countBearish === 1) {
    return Const.NEUTRAL;
  }
  if (countBullish === 2) {
    return Const.STRONG_BULLISH;
  }
  if (countBearish === 2) {
    return Const.STRONG_BEARISH;
  }
  if (countBullish === 1 && countNeutral === 1) {
    return Const.BULLISH;
  }
  if (countBearish === 1 && countNeutral === 1) {
    return Const.BEARISH;
  }
  return unValiable;
};

const getMoving = (matchPrice, ma5) => {
  return matchPrice > ma5 ? Const.BULLISH : Const.BEARISH;
};

const getSchema = () => {
  return Object.keys(Const.listColumnTableVisibility).map(item2 => {
    const key = Const.listColumnTableVisibility[item2];
    const title = `watchListTechnical.listTitleTable.${item2}`;
    const result = {
      key,
      title,
    };

    if (key === Const.listColumnTableVisibility.TICKER) {
      return {
        ...result,
        valueFromItem: item => {
          return item.displayCode;
        },
        tdClassName: 'bg-blue border-bottom-ex bor-ta-color-4',
        render: (text, item) => (
          <IndicatorsSearch
            code={item.organCode}
            displayCode={item.displayCode}
            companyName={item.companyName}
            id={item.id}
            zIndex={item.zIndex}
          />
        ),
      };
    }

    if (key === Const.listColumnTableVisibility.TYPE) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          return (
            <div className="text-left">
              <div className="bg-blue p-8">
                {item.daily !== null ? Const.MOVING_AVERAGE : unValiable}
              </div>
              <div className="bg-blue p-8">
                {item.daily !== null ? Const.INDICATORS : unValiable}
              </div>
              <div className="bg-grey p-8 border-bottom bor-p-color-3 bg-ta-color-8">
                {item.daily !== null ? Const.SUMMARY : unValiable}
              </div>
            </div>
          );
        },
      };
    }

    if (key === Const.listColumnTableVisibility._15MINUTES) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          const valMoving15Minutes =
            item.daily === null
              ? '-'
              : getMoving(
                  getDataFollowKeyByDot(
                    item,
                    Const.listColumnTable.MATCH_PRICE,
                  ),
                  getDataFollowKeyByDot(
                    item,
                    Const.listColumnTable._15MINUTES_MA5,
                  ),
                );
          const valIndicator15Minutes =
            item.daily === null
              ? '-'
              : getIndicator(
                  getRsi(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable._15MINUTES_RSI,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable._15MINUTES_OLD_RSI,
                    ),
                  ),
                  getCmf(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable._15MINUTES_CMF,
                    ),
                  ),
                  getRoc(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable._15MINUTES_ROC,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable._15MINUTES_OLD_ROC,
                    ),
                  ),
                );
          return (
            <div className="text-left">
              <div className="bg-blue p-8">{getText(valMoving15Minutes)}</div>
              <div className="bg-blue p-8">
                {getText(valIndicator15Minutes)}
              </div>
              <div className="bg-grey p-8 border-bottom bor-p-color-3 bg-ta-color-8">
                {getStyle(
                  getSummary(valMoving15Minutes, valIndicator15Minutes),
                )}
              </div>
            </div>
          );
        },
      };
    }

    if (key === Const.listColumnTableVisibility.HOURLY) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          const valMovingHourly =
            item.daily === null
              ? '-'
              : getMoving(
                  getDataFollowKeyByDot(
                    item,
                    Const.listColumnTable.MATCH_PRICE,
                  ),
                  getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_MA5),
                );
          const valIndicatorHourly =
            item.daily === null
              ? '-'
              : getIndicator(
                  getRsi(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.HOURLY_RSI,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.HOURLY_OLD_RSI,
                    ),
                  ),
                  getCmf(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.HOURLY_CMF,
                    ),
                  ),
                  getRoc(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.HOURLY_ROC,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.HOURLY_OLD_ROC,
                    ),
                  ),
                );
          return (
            <div className="text-left">
              <div className="bg-blue p-8">{getText(valMovingHourly)}</div>
              <div className="bg-blue p-8">{getText(valIndicatorHourly)}</div>
              <div className="bg-grey p-8 border-bottom bor-p-color-3 bg-ta-color-8">
                {getStyle(getSummary(valMovingHourly, valIndicatorHourly))}
              </div>
            </div>
          );
        },
      };
    }

    if (key === Const.listColumnTableVisibility.DAILY) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          const valMovingDaily =
            item.daily === null
              ? '-'
              : getMoving(
                  getDataFollowKeyByDot(
                    item,
                    Const.listColumnTable.MATCH_PRICE,
                  ),
                  getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_MA5),
                );
          const valIndicatorDaily =
            item.daily === null
              ? '-'
              : getIndicator(
                  getRsi(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.DAILY_RSI,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.DAILY_OLD_RSI,
                    ),
                  ),
                  getCmf(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.DAILY_CMF,
                    ),
                  ),
                  getRoc(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.DAILY_ROC,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.DAILY_OLD_ROC,
                    ),
                  ),
                );
          return (
            <div className="text-left">
              <div className="bg-blue p-8">{getText(valMovingDaily)}</div>
              <div className="bg-blue p-8">{getText(valIndicatorDaily)}</div>
              <div className="bg-grey p-8 border-bottom bor-p-color-3 bg-ta-color-8">
                {getStyle(getSummary(valMovingDaily, valIndicatorDaily))}
              </div>
            </div>
          );
        },
      };
    }

    if (key === Const.listColumnTableVisibility.WEEKLY) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          const valMovingWeekly =
            item.daily === null
              ? '-'
              : getMoving(
                  getDataFollowKeyByDot(
                    item,
                    Const.listColumnTable.MATCH_PRICE,
                  ),
                  getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_MA5),
                );
          const valIndicatorWeekly =
            item.daily === null
              ? '-'
              : getIndicator(
                  getRsi(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.WEEKLY_RSI,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.WEEKLY_OLD_RSI,
                    ),
                  ),
                  getCmf(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.WEEKLY_CMF,
                    ),
                  ),
                  getRoc(
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.WEEKLY_ROC,
                    ),
                    getDataFollowKeyByDot(
                      item,
                      Const.listColumnTable.WEEKLY_OLD_ROC,
                    ),
                  ),
                );
          return (
            <div className="text-left">
              <div className="bg-blue p-8">{getText(valMovingWeekly)}</div>
              <div className="bg-blue p-8">{getText(valIndicatorWeekly)}</div>
              <div className="bg-grey p-8 border-bottom bor-p-color-3 bg-ta-color-8">
                {getStyle(getSummary(valMovingWeekly, valIndicatorWeekly))}
              </div>
            </div>
          );
        },
      };
    }

    return {
      ...result,
    };
  });
};

const getDataFromRedux = state =>
  state[REDUCER_NAME].listTickerIndicatorsByTicker;

function IndicatorsTable({ ids, isLoading, table }) {
  return (
    <div className="technical-wrapper h-100">
      <Table
        ids={ids}
        table={table}
        isLoading={isLoading}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        hideColumns={[]}
        getDataFromRedux={getDataFromRedux}
        schema={getSchema()}
        isTrHover={false}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerIndicators,
    listTickerIndicatorsByTicker:
      state[REDUCER_NAME].listTickerIndicatorsByTicker,
    isFetching: state[REDUCER_NAME].isLoading,
    listDataSearch: state[REDUCER_NAME].listDataSearch,
    isLoading: state[REDUCER_NAME].isLoading,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  withScroll(80, REDUCER_NAME),
);
export default enhance(IndicatorsTable);
