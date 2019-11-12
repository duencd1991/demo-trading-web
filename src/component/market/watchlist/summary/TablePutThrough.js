import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { omit, includes } from 'lodash';
import { getColorPrice } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
  formatValue,
} from '../../../helpers/Text';
import { formatTime } from '../../../helpers/DateTime';
import { compose } from 'redux';
import withScroll from '../../../common/withScroll';
import TradingViewUrl from '../../../common/TradingViewUrl';

const enhance = compose(withScroll(88, REDUCER_NAME));

export default enhance(TablePutThrough);

function TablePutThrough(props) {
  const { ids, table, getDataFromRedux, name } = props;

  return (
    <Table
      table={table}
      ids={ids}
      resizable={true}
      columnDraggable={true}
      rowDraggable={false}
      multiHead={{ name, isBlack: false }}
      getDataFromRedux={getDataFromRedux}
      schema={Object.keys(
        omit(Const.putThrough, Const.listIgnoreColumnPutThrough),
      ).map((item, index) => {
        const key = Const.putThrough[item];
        const title = `watchListSummary.listTitlePutThroughMatchedTable.${item}`;
        const result = {
          key,
          title,
        };

        if (index === 0) {
          return {
            ...result,
            render: (text, item) => (
              <>
                <TradingViewUrl
                  code={getDataFollowKeyByDot(
                    item,
                    Const.putThrough.ORGAN_CODE,
                  )}
                />
                &nbsp;{text}
              </>
            ),
          };
        }
        if (includes([Const.putThrough.DEAL_PRICE], key)) {
          return {
            ...result,
            render: (text, item) => {
              const className = getColorPrice(
                text,
                getDataFollowKeyByDot(item, Const.putThrough.REFERENCE_PRICE),
              );
              return (
                <span className={className}>
                  {formatTextFloat(formatPrice(text))}
                </span>
              );
            },
          };
        }

        if (includes([Const.putThrough.DEAL_VOLUME], key)) {
          return {
            ...result,
            render: text => <span>{formatTextFloat(formatVolume(text))}</span>,
          };
        }

        if (
          includes(
            [Const.putThrough.DEAL_VALUE, Const.putThrough.TOTAL_DEAL_VALUE],
            key,
          )
        ) {
          return {
            ...result,
            render: text => <span>{formatTextFloat(formatValue(text))}</span>,
          };
        }

        if (key === Const.putThrough.TRADING_DATE) {
          return {
            ...result,
            thStyle: { textAlign: 'left' },
            render: text => <div className="text-left">{formatTime(text)}</div>,
          };
        }

        return {
          ...result,
          render: text => <span>{formatTextFloat(text)}</span>,
        };
      })}
    />
  );
}
