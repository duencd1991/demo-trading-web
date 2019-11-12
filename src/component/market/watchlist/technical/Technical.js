import React from 'react';
import { connect } from 'react-redux';
import './technical.scss';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { REDUCER_NAME, changeIdHover } from './../reducer';
import Table from '../../../common/table/Table';
import Const from './Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import ConstCommon from '../../../common/Const';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';

const MIN_RSI = 30;
const MAX_RSI = 70;

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
};

const getMoving = (matchPrice, ma5) => {
  return matchPrice > ma5 ? Const.BULLISH : Const.BEARISH;
};

const renderCustomCell = (top, center, bottom) => {
  return (
    <div className="text-left">
      <div className="bg-blue p-8 hover-item">{top}</div>
      <div className="bg-blue p-8 hover-item">{center}</div>
      <div className="bg-gray p-8 border-bottom bor-p-color-3 bg-ta-color-8 font-weight-bold hover-item">
        {bottom}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerTechnical,
    listOrganizationByOrganCode:
      state[COMMON_REDUCER_NAME].listOrganizationByOrganCode,
    isFetching: state[REDUCER_NAME].isFetching,
    idHover: state[REDUCER_NAME].organCodeHover,
  };
};

const mapDispatchToProps = {
  changeIdHover,
};

const enhance = compose(
  withScroll(100, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(Technical);

const getSchema = listOrganizationByOrganCode => {
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
        tdClassName: 'bg-blue border-bottom-ex bor-ta-color-4',
        valueFromItem: item => {
          return item[Const.listColumnTableVisibility.TICKER];
        },
        render: text => {
          const tickerName = getDataFollowKeyByDot(
            listOrganizationByOrganCode[text],
            ConstCommon.listOrganization.TICKER,
          );
          const companyNameLong = getDataFollowKeyByDot(
            listOrganizationByOrganCode[text],
            ConstCommon.listOrganization.ORGAN_SHORT_NAME,
          );
          const companyName =
            companyNameLong.length > 16
              ? `${companyNameLong.substring(0, 16)}...`
              : companyNameLong;
          const exchangeName =
            ConstCommon.listExchange[
              getDataFollowKeyByDot(
                listOrganizationByOrganCode[text],
                ConstCommon.listOrganization.COM_GROUP_CODE,
              )
            ];
          return (
            <div>
              <div className="group-sticker">
                <h2
                  className="left-info-widget__title border-bottom-0 pb-0"
                  title={companyNameLong}
                >
                  {tickerName}
                  <small className="fs-12 text-l-color-7 ml-1">
                    {companyName}
                    &nbsp;/&nbsp;
                    {exchangeName}
                  </small>
                </h2>
              </div>
            </div>
          );
        },
      };
    }

    if (key === Const.listColumnTableVisibility.TYPE) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: () => {
          return renderCustomCell(
            Const.MOVING_AVERAGE,
            Const.INDICATORS,
            Const.SUMMARY,
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
          const valMoving15Minutes = getMoving(
            getDataFollowKeyByDot(item, Const.listColumnTable.MATCH_PRICE),
            getDataFollowKeyByDot(item, Const.listColumnTable._15MINUTES_MA5),
          );
          const valIndicator15Minutes = getIndicator(
            getRsi(
              getDataFollowKeyByDot(item, Const.listColumnTable._15MINUTES_RSI),
              getDataFollowKeyByDot(
                item,
                Const.listColumnTable._15MINUTES_OLD_RSI,
              ),
            ),
            getCmf(
              getDataFollowKeyByDot(item, Const.listColumnTable._15MINUTES_CMF),
            ),
            getRoc(
              getDataFollowKeyByDot(item, Const.listColumnTable._15MINUTES_ROC),
              getDataFollowKeyByDot(
                item,
                Const.listColumnTable._15MINUTES_OLD_ROC,
              ),
            ),
          );
          return renderCustomCell(
            getText(valMoving15Minutes),
            getText(valIndicator15Minutes),
            getStyle(getSummary(valMoving15Minutes, valIndicator15Minutes)),
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
          const valMovingHourly = getMoving(
            getDataFollowKeyByDot(item, Const.listColumnTable.MATCH_PRICE),
            getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_MA5),
          );
          const valIndicatorHourly = getIndicator(
            getRsi(
              getDataFollowKeyByDot(item, Const.listColumnTable.HOURLY_RSI),
              getDataFollowKeyByDot(item, Const.listColumnTable.HOURLY_OLD_RSI),
            ),
            getCmf(
              getDataFollowKeyByDot(item, Const.listColumnTable.HOURLY_CMF),
            ),
            getRoc(
              getDataFollowKeyByDot(item, Const.listColumnTable.HOURLY_ROC),
              getDataFollowKeyByDot(item, Const.listColumnTable.HOURLY_OLD_ROC),
            ),
          );
          return renderCustomCell(
            getText(valMovingHourly),
            getText(valIndicatorHourly),
            getStyle(getSummary(valMovingHourly, valIndicatorHourly)),
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
          const valMovingDaily = getMoving(
            getDataFollowKeyByDot(item, Const.listColumnTable.MATCH_PRICE),
            getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_MA5),
          );
          const valIndicatorDaily = getIndicator(
            getRsi(
              getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_RSI),
              getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_OLD_RSI),
            ),
            getCmf(
              getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_CMF),
            ),
            getRoc(
              getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_ROC),
              getDataFollowKeyByDot(item, Const.listColumnTable.DAILY_OLD_ROC),
            ),
          );
          return renderCustomCell(
            getText(valMovingDaily),
            getText(valIndicatorDaily),
            getStyle(getSummary(valMovingDaily, valIndicatorDaily)),
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
          const valMovingWeekly = getMoving(
            getDataFollowKeyByDot(item, Const.listColumnTable.MATCH_PRICE),
            getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_MA5),
          );
          const valIndicatorWeekly = getIndicator(
            getRsi(
              getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_RSI),
              getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_OLD_RSI),
            ),
            getCmf(
              getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_CMF),
            ),
            getRoc(
              getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_ROC),
              getDataFollowKeyByDot(item, Const.listColumnTable.WEEKLY_OLD_ROC),
            ),
          );
          return renderCustomCell(
            getText(valMovingWeekly),
            getText(valIndicatorWeekly),
            getStyle(getSummary(valMovingWeekly, valIndicatorWeekly)),
          );
        },
      };
    }

    return {
      ...result,
    };
  });
};

const getDataFromRedux = state => state[REDUCER_NAME].listTechnicalByTicker;

function Technical(props) {
  const {
    ids,
    listOrganizationByOrganCode,
    isFetching,
    table,
    idHover,
    changeIdHover,
  } = props;

  return (
    <div className="technical-wrapper h-100">
      <Table
        ids={ids}
        table={table}
        isLoading={isFetching}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        hideColumns={[]}
        getDataFromRedux={getDataFromRedux}
        schema={getSchema(listOrganizationByOrganCode)}
        idHover={idHover}
        changeIdHover={changeIdHover}
        // isTrHover={false}
      />
    </div>
  );
}
