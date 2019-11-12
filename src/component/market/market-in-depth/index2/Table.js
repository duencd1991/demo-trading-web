import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import {
  formatTextFloat,
  formatValue,
  formatVolume,
} from '../../../helpers/Text';
import { clickRowTable, REDUCER_NAME } from './reducer';
import { getColorPrice } from '../../../helpers/Color';
import { getDataFollowKeyByDot } from './../../../helpers/Common';
import _ from 'lodash';
import TextBlink from '../../../common/table/TextBlink';
import './table.scss';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../common/TradingViewUrl';

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listComGroupCodeTable,
  };
};

const mapDispatchToProps = {
  clickRowTable,
};

const enhance = compose(
  withScroll(340, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TableIndex);

const getDataFromRedux = state => state[REDUCER_NAME].listTableByComGroupCode;

const getScheme = () => {
  return Object.keys(Const.listColumnTable).map((item, index) => {
    const key = Const.listColumnTable[item];
    const title = `marketInDepthIndex.listTitleTable.${item}`;
    const result = {
      key,
      title,
    };

    if (index === 0) {
      return {
        ...result,
        render: (text, item) => (
          <TextBlink
            item={item}
            tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
          >
            <TradingViewUrl
              code={getDataFollowKeyByDot(
                item,
                Const.listColumnTable.COM_GROUP_CODE,
              )}
            />
            &nbsp;{text}
          </TextBlink>
        ),
      };
    }

    if (
      _.includes(
        [Const.listColumnTable.INDEX_VALUE, Const.listColumnTable.INDEX_CHANGE],
        key,
      )
    ) {
      return {
        ...result,
        render: (text, item) => {
          const className = getColorPrice(
            getDataFollowKeyByDot(item, Const.listColumnTable.INDEX_VALUE),
            getDataFollowKeyByDot(
              item,
              Const.listIgnoreColumnTable.REFERENCE_INDEX,
            ),
          );
          return (
            <TextBlink
              className={className}
              item={item}
              tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
            >
              {formatTextFloat(text)}
            </TextBlink>
          );
        },
      };
    }

    if (key === Const.listColumnTable.PERCENT_INDEX_CHANGE) {
      return {
        ...result,
        render: (text, item) => {
          const className = getColorPrice(
            getDataFollowKeyByDot(item, Const.listColumnTable.INDEX_VALUE),
            getDataFollowKeyByDot(
              item,
              Const.listIgnoreColumnTable.REFERENCE_INDEX,
            ),
          );
          return (
            <TextBlink
              className={className}
              item={item}
              tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
            >
              {formatTextFloat(text * 100) + ' %'}
            </TextBlink>
          );
        },
      };
    }

    if (
      _.includes(
        [
          Const.listColumnTable.TOTAL_DEAL_VOLUME,
          Const.listColumnTable.TOTAL_MATCH_VOLUME,
        ],
        key,
      )
    ) {
      return {
        ...result,
        render: (text, item) => (
          <TextBlink
            item={item}
            tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
          >
            {formatTextFloat(formatVolume(text))}
          </TextBlink>
        ),
      };
    }

    if (_.includes([Const.listColumnTable.TOTAL_MATCH_VALUE], key)) {
      return {
        ...result,
        render: (text, item) => (
          <TextBlink
            item={item}
            tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
          >
            {formatTextFloat(formatValue(text), 0)}
          </TextBlink>
        ),
      };
    }

    if (_.includes([Const.listColumnTable.TOTAL_DEAL_VALUE], key)) {
      return {
        ...result,
        render: (text, item) => (
          <TextBlink
            item={item}
            tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
          >
            {formatTextFloat(formatValue(text))}
          </TextBlink>
        ),
      };
    }

    if (key === Const.listColumnTable.FOREIGN_NET_VOLUME) {
      return {
        ...result,
        valueFromItem: item =>
          getDataFollowKeyByDot(
            item,
            Const.listColumnTable.FOREIGN_BUY_VOL_MATCHED,
          ) -
          getDataFollowKeyByDot(
            item,
            Const.listColumnTable.FOREIGN_SELL_VOL_MATCHED,
          ),
        render: (text, item) => {
          const foreignNet =
            getDataFollowKeyByDot(
              item,
              Const.listColumnTable.FOREIGN_BUY_VOL_MATCHED,
            ) -
            getDataFollowKeyByDot(
              item,
              Const.listColumnTable.FOREIGN_SELL_VOL_MATCHED,
            );
          return (
            <TextBlink
              item={item}
              tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
            >
              {formatTextFloat(formatVolume(foreignNet))}
            </TextBlink>
          );
        },
      };
    }

    if (key === Const.listColumnTable.FOREIGN_NET_VALUE) {
      return {
        ...result,
        valueFromItem: item =>
          getDataFollowKeyByDot(
            item,
            Const.listColumnTable.FOREIGN_BUY_VALUE_MATCHED,
          ) -
          getDataFollowKeyByDot(
            item,
            Const.listColumnTable.FOREIGN_SELL_VALUE_MATCHED,
          ),
        render: (text, item) => {
          const foreignNet =
            getDataFollowKeyByDot(
              item,
              Const.listColumnTable.FOREIGN_BUY_VALUE_MATCHED,
            ) -
            getDataFollowKeyByDot(
              item,
              Const.listColumnTable.FOREIGN_SELL_VALUE_MATCHED,
            );
          return (
            <TextBlink
              item={item}
              tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
            >
              {formatTextFloat(formatValue(foreignNet))}
            </TextBlink>
          );
        },
      };
    }

    return {
      ...result,
      render: (text, item) => (
        <TextBlink
          item={item}
          tradingDate={Const.listIgnoreColumnTable.TRADING_DATE}
        >
          {formatTextFloat(text)}
        </TextBlink>
      ),
    };
  });
};

function TableIndex(props) {
  const { ids, clickRowTable, table } = props;

  return (
    <div className="market-in-depth-index-wrap">
      <Table
        ids={ids}
        table={table}
        resizable={true}
        columnDraggable={true}
        rowDraggable={true}
        hideColumns={[
          Const.listIgnoreColumnTable.FOREIGN_BUY_VALUE_MATCHED,
          Const.listIgnoreColumnTable.FOREIGN_SELL_VALUE_MATCHED,
          Const.listIgnoreColumnTable.FOREIGN_BUY_VOL_MATCHED,
          Const.listIgnoreColumnTable.FOREIGN_SELL_VOL_MATCHED,
        ]}
        clickRow={clickRowTable}
        getDataFromRedux={getDataFromRedux}
        schema={getScheme()}
      />
    </div>
  );
}
