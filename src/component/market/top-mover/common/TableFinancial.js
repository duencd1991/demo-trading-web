import _ from 'lodash';
import React from 'react';
import { cellNegtiveRed } from '../../../common/table/CustomCellTable';
import { getColorPrice } from '../../../helpers/Color';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatValueBillion,
} from '../../../helpers/Text';
import Table from '../../../common/table/Table';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import CellHover from '../../watchlist/summary/CellHover';
import TextBlink from '../../../common/table/TextBlink';
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

function TableFinancial(props) {
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

export default TableFinancial;
