import { includes } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  formatTextFloat,
  formatValueBillion,
  formatPrice,
} from '../../../helpers/Text';
import { toggleConfirmPopupDelete, REDUCER_NAME } from '../reducer';
import Table from '../../../common/table/Table';
import { getColorRedWhite } from './../../../helpers/Color';
import Const from './Const';
import CellHover from '../summary/CellHover';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import TradingViewUrl from '../../../common/TradingViewUrl';

const getDataFromRedux = state => state[REDUCER_NAME].listSummaryTableByTicker;

class TableFun extends React.Component {
  handleDelete = (isShow, organCode) => () => {
    const { toggleConfirmPopupDelete } = this.props;

    toggleConfirmPopupDelete(isShow, organCode);
  };

  render() {
    const { ids, isFetching, idHover, isShowDeleteIcon, table } = this.props;

    return (
      <Table
        thValign="top"
        ids={ids}
        table={table}
        resizable={true}
        columnDraggable={true}
        rowDraggable={true}
        hideColumns={[]}
        isLoading={isFetching}
        getDataFromRedux={getDataFromRedux}
        idHover={idHover}
        schema={Object.keys(Const.listColumn).map((item, index) => {
          const key = Const.listColumn[item];
          const title = `watchListFundamental.listTitleTable.${item}`;
          const result = {
            key,
            title,
          };

          if (index === 0) {
            return {
              thStyle: {
                width: '10%',
              },
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
                  <TradingViewUrl code={item.organCode} />
                  &nbsp;
                  {text}
                </CellHover>
              ),
            };
          }

          if (
            includes(
              [
                Const.listColumn.RTD11,
                Const.listColumn.ISA5,
                Const.listColumn.ISA20,
              ],
              key,
            )
          ) {
            return {
              ...result,
              render: text => {
                const className = getColorRedWhite(text);
                return (
                  <span className={className}>
                    {formatTextFloat(formatValueBillion(text))}
                  </span>
                );
              },
            };
          }

          if (includes([Const.listColumn.ISA3], key)) {
            return {
              ...result,
              render: text => {
                const className = getColorRedWhite(text);
                return (
                  <span className={className}>
                    {formatTextFloat(formatValueBillion(text), 0)}
                  </span>
                );
              },
            };
          }

          if (
            includes(
              [
                Const.listColumn.RTD7,
                Const.listColumn.RTD53,
                Const.listColumn.RTD14,
              ],
              key,
            )
          ) {
            return {
              ...result,
              render: text => {
                const className = getColorRedWhite(text);
                return (
                  <span className={className}>{formatTextFloat(text, 0)}</span>
                );
              },
            };
          }

          return {
            ...result,
            render: text => {
              const className = getColorRedWhite(text);
              return <span className={className}>{formatTextFloat(text)}</span>;
            },
          };
        })}
      />
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

export default enhance(TableFun);
