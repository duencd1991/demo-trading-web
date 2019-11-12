import React from 'react';
import { REDUCER_NAME, toggleConfirmPopupDelete } from '../reducer';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from './Const';
import { includes } from 'lodash';
import { getColorRedGreen } from '../../../helpers/Color';
import { formatPrice, formatTextFloat } from '../../../helpers/Text';
import TextBlink from '../../../common/table/TextBlink';
import CellHover from '../summary/CellHover';
import './table.scss';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import withScroll from './../../../common/withScroll';
import TradingViewUrl from '../../../common/TradingViewUrl';
import { compose } from 'redux';

const getDataFromRedux = state => state[REDUCER_NAME].listSummaryTableByTicker;

class TablePerformance extends React.Component {
  handleDelete = (isShow, organCode) => () => {
    const { toggleConfirmPopupDelete } = this.props;

    toggleConfirmPopupDelete(isShow, organCode);
  };

  render() {
    const { ids, isFetching, idHover, isShowDeleteIcon, table } = this.props;

    return (
      <div className="watchlist-performance-wrap h-100">
        <Table
          ids={ids}
          table={table}
          resizable={true}
          columnDraggable={true}
          rowDraggable={true}
          hideColumns={[]}
          isLoading={isFetching}
          getDataFromRedux={getDataFromRedux}
          idHover={idHover}
          schema={Object.keys(Const.listColumn).map((item2, index) => {
            const key = Const.listColumn[item2];
            const title = `watchListPerformance.listTitleTable.${item2}`;
            const result = {
              key,
              title,
            };

            if (index === 0) {
              return {
                ...result,
                render: (text, item, rowIndex) => (
                  <CellHover
                    rowIndex={rowIndex}
                    isShowDeleteIcon={isShowDeleteIcon}
                    handleDelete={this.handleDelete(
                      true,
                      getDataFollowKeyByDot(item, Const.ORGAN_CODE),
                    )}
                  >
                    <TextBlink
                      item={item}
                      tradingDate={Const.listIgnoreColumn.TRADING_DATE}
                    >
                      <TradingViewUrl code={item.organCode} />
                      &nbsp;{text}
                    </TextBlink>
                  </CellHover>
                ),
              };
            }

            if (includes([Const.listColumn.MATCH_PRICE], key)) {
              return {
                ...result,
                render: (text, item) => {
                  return (
                    <TextBlink
                      item={item}
                      tradingDate={Const.listIgnoreColumn.TRADING_DATE}
                    >
                      {formatTextFloat(formatPrice(text))}
                    </TextBlink>
                  );
                },
              };
            }

            return {
              ...result,
              render: (text, item) => {
                const className = getColorRedGreen(text, 'text');
                return (
                  <TextBlink
                    item={item}
                    tradingDate={Const.listIgnoreColumn.TRADING_DATE}
                    className={className}
                  >
                    {formatTextFloat(text * 100) + ' %'}
                  </TextBlink>
                );
              },
            };
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerSummaryTable,
    isFetching: state[REDUCER_NAME].isFetching,
    idHover: state[REDUCER_NAME].organCodeHover,
  };
};

const mapDispatchToProps = {
  toggleConfirmPopupDelete: toggleConfirmPopupDelete,
};

const enhance = compose(
  withScroll(100, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TablePerformance);
