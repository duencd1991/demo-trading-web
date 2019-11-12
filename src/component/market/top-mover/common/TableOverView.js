import { includes } from 'lodash';
import React from 'react';
import { cellNegtiveRed } from '../../../common/table/CustomCellTable';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatValueBillion,
  formatVolume,
  formatValue,
} from '../../../helpers/Text';
import Table from '../../../common/table/Table';
import { getColorPrice } from '../../../helpers/Color';
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

const getForeignData = (item, listColumn, key) => {
  const buyVol = getDataFollowKeyByDot(item, listColumn.FOREIGN_BUY_VOL);
  const sellVol = getDataFollowKeyByDot(item, listColumn.FOREIGN_SELL_VOL);
  const buyVal = getDataFollowKeyByDot(item, listColumn.FOREIGN_BUY_VALUE);
  const sellVal = getDataFollowKeyByDot(item, listColumn.FOREIGN_SELL_VALUE);

  var result;
  if (key === listColumn.FOREIGN_BUY_VOL) {
    result = buyVol - sellVol;
  }
  if (key === listColumn.FOREIGN_SELL_VOL) {
    result = sellVol - buyVol;
  }
  if (key === listColumn.FOREIGN_SELL_VALUE) {
    result = sellVal - buyVal;
  }
  if (key === listColumn.FOREIGN_BUY_VALUE) {
    result = buyVal - sellVal;
  }

  return formatVolume(result);
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

    if (includes([listColumn.VOLUME, listColumn.AVG_VOLUME], key)) {
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
      includes(
        [
          listColumn.FOREIGN_BUY_VOL,
          listColumn.FOREIGN_BUY_VALUE,
          listColumn.FOREIGN_SELL_VOL,
          listColumn.FOREIGN_SELL_VALUE,
        ],
        key,
      )
    ) {
      return {
        ...result,
        valueFromItem: item => getForeignData(item, listColumn, key),
        render: (text, item) => {
          return (
            <TextBlink item={item} tradingDate="tradingDate">
              {formatTextFloat(getForeignData(item, listColumn, key))}
            </TextBlink>
          );
        },
      };
    }

    if (includes([listColumn.VALUE], key)) {
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

    if (includes([listColumn.PRICE, listColumn.CHANGE_PRICE], key)) {
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

    if (includes([listColumn.PERCENT_PRICE_CHANGE], key)) {
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

    if (includes([listColumn.OLD_LOW, listColumn.OLD_HIGH], key)) {
      return {
        ...result,
        render: (text, item) => {
          return (
            <TextBlink item={item} tradingDate="tradingDate">
              <span>{formatTextFloat(formatPrice(text))}</span>
            </TextBlink>
          );
        },
      };
    }

    if (includes([listColumn.RTD11], key)) {
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

    if (includes([listColumn.RTD21], key)) {
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

    if (includes([listColumn.SECTOR_NAME], key)) {
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
              {text}
            </TextBlink>
          );
        },
      };
    }

    if (result.key === listColumn.RANKING) {
      return {
        ...result,
        thStyle: { textAlign: 'center', width: '70px' },
        disableResize: true,
        render: (text, item) => {
          const width = `${(item.rank / 5) * 100}%`;
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

    return {
      ...result,
      render: text => text,
    };
  });

function TableOverview(props) {
  const {
    listId,
    getDataFromRedux,
    hideColumns,
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
      thValign="top"
      isLoading={isLoading}
      ids={listId}
      table={table}
      resizable={resizable}
      columnDraggable={columnDraggable}
      rowDraggable={rowDraggable}
      hideColumns={hideColumns}
      getDataFromRedux={getDataFromRedux}
      schema={schema(listColumns, i18nTitleKey)}
    />
  );
}

export default TableOverview;
