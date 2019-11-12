import _ from 'lodash';
import React from 'react';
import TextBlink from '../../../common/table/TextBlink';
import {
  candleStickCalculation,
  DOWN,
  UP,
} from '../../../helpers/CandleStickCalculation';
import { getColorPrice } from '../../../helpers/Color';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../helpers/Text';
import CellHover from '../../watchlist/summary/CellHover';
import Table from '../../../common/table/Table';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import TradingViewUrl from '../../../common/TradingViewUrl';

const getClassName = (item, listColumn) => {
  return getColorPrice(
    getDataFollowKeyByDot(item, listColumn.PRICE),
    getDataFollowKeyByDot(item, listColumn.REF_PRICE),
    getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
    getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
    'text',
  );
};

const candleStickCal = (item, listColumn) => {
  return candleStickCalculation(
    getDataFollowKeyByDot(item, listColumn.HIGH_PRICE),
    getDataFollowKeyByDot(item, listColumn.LOW_PRICE),
    getDataFollowKeyByDot(item, listColumn.OPEN_PRICE),
    getDataFollowKeyByDot(item, listColumn.PRICE),
    getDataFollowKeyByDot(item, listColumn.H1),
    getDataFollowKeyByDot(item, listColumn.L1),
    getDataFollowKeyByDot(item, listColumn.O1),
    getDataFollowKeyByDot(item, listColumn.C1),
    getDataFollowKeyByDot(item, listColumn.H2),
    getDataFollowKeyByDot(item, listColumn.L2),
    getDataFollowKeyByDot(item, listColumn.O2),
    getDataFollowKeyByDot(item, listColumn.C2),
    getDataFollowKeyByDot(item, listColumn.SMA20),
    getDataFollowKeyByDot(item, listColumn.SMA20Past4),
  );
};

const getTrend = trend => {
  if (trend === DOWN) {
    return <i className="icon-down-arrow fs-12 text-s-color-3" />;
  } else if (trend === UP) {
    return <i className="icon-up-arrow fs-12 text-s-color-5" />;
  }
};

const schema = (listColumn, i18nTitleKey) =>
  Object.keys(listColumn).map((item, index) => {
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
          <CellHover organCode={item.organCode} isShowDeleteIcon={false}>
            <TextBlink item={item} tradingDate="tradingDate">
              <TradingViewUrl code={item.organCode} />
              &nbsp;{text}
            </TextBlink>
          </CellHover>
        ),
      };
    }

    if (_.includes([listColumn.VOLUME], key)) {
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

    if (_.includes([listColumn.PRICE], key)) {
      return {
        ...result,
        render: (text, item) => {
          const className = getClassName(item, listColumn);
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
          const className = getClassName(item, listColumn);
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

    if (_.includes([listColumn.RSI], key)) {
      return {
        ...result,
        render: text => {
          return (
            <TextBlink item={item} tradingDate="tradingDate">
              {formatTextFloat(text)}
            </TextBlink>
          );
        },
      };
    }

    if (_.includes([listColumn.CANDLE_STICK], key)) {
      return {
        disableSort: true,
        ...result,
        thStyle: { textAlign: 'left' },
        render: (text, item) => {
          const candleStickData = candleStickCal(item, listColumn);
          const trend = getTrend(candleStickData.trend);
          return (
            <TextBlink
              item={item}
              tradingDate="tradingDate"
              className="text-left"
            >
              {candleStickData.candleStick} {trend}
            </TextBlink>
          );
        },
      };
    }

    return {
      ...result,
      render: text => (
        <TextBlink item={item} tradingDate="tradingDate">
          {formatTextFloat(text, 0)}
        </TextBlink>
      ),
    };
  });

function TableTechnical(props) {
  const {
    listId,
    listColumns,
    getDataFromRedux,
    hideColumns,
    i18nTitleKey,
    isLoading,
    table,
  } = props;

  return (
    <Table
      table={table}
      thValign="top"
      isLoading={isLoading}
      ids={listId}
      resizable={true}
      columnDraggable={false}
      rowDraggable={false}
      hideColumns={hideColumns}
      getDataFromRedux={getDataFromRedux}
      schema={schema(listColumns, i18nTitleKey)}
    />
  );
}

export default TableTechnical;
