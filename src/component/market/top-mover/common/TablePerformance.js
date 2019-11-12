import _ from 'lodash';
import React from 'react';
import { getColorRedGreen } from '../../../helpers/Color';
import { formatPrice, formatTextFloat } from '../../../helpers/Text';
import Table from '../../../common/table/Table';
import CellHover from '../../watchlist/summary/CellHover';
import TextBlink from '../../../common/table/TextBlink';
import TradingViewUrl from '../../../common/TradingViewUrl';

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

function TablePerformance(props) {
  const {
    listId,
    getDataFromRedux,
    listColumns,
    resizable,
    columnDraggable,
    rowDraggable,
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
      resizable={resizable}
      columnDraggable={columnDraggable}
      rowDraggable={rowDraggable}
      getDataFromRedux={getDataFromRedux}
      schema={schema(listColumns, i18nTitleKey)}
    />
  );
}

export default TablePerformance;
