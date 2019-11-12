import React from 'react';
import { REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import Const from './Const';
import Table from '../../common/table/Table';
import './FADividendAnalysis.scss';
import { withComponentId } from './../../common/ComponentIdContext';
import { compose } from 'redux';
import { SimpleTooltip } from './../../common/tooltip';
import { I18n } from 'react-redux-i18n';

class FADividendAnalysisTable extends React.Component {
  getDataFromRedux = state => {
    const { componentId } = this.props;

    return state[REDUCER_NAME].listMultiComponent[componentId]
      .dataDividendTableByYear;
  };

  getSchema = () => {
    const currentYear = new Date().getFullYear();

    const getStyleCurrentYear = item => {
      return item && item.year === currentYear
        ? 'text-right pl-10 pr-10 isBlue'
        : 'text-right pl-10 pr-10';
    };

    return Object.keys(Const.listColumn).map(item => {
      const key = Const.listColumn[item];
      const title = `cashDividend.cashTable.${item}`;
      const result = {
        key,
        title,
        disableSort: true,
        thStyle: { textAlign: 'right' },
        tdStyle: { 'padding-left': 0, 'padding-right': 0 },
      };

      if (key === Const.listColumn.year) {
        return {
          ...result,
          title: '',
          render: text => <div className="text-right pl-10 pr-10">{text}</div>,
        };
      }

      if (key === Const.listColumn.jan) {
        return {
          ...result,
          ...this.renderItem(1),
        };
      }

      if (key === Const.listColumn.feb) {
        return {
          ...result,
          ...this.renderItem(2),
        };
      }

      if (key === Const.listColumn.mar) {
        return {
          ...result,
          ...this.renderItem(3),
        };
      }

      if (key === Const.listColumn.apr) {
        return {
          ...result,
          ...this.renderItem(4),
        };
      }

      if (key === Const.listColumn.may) {
        return {
          ...result,
          ...this.renderItem(5),
        };
      }

      if (key === Const.listColumn.jun) {
        return {
          ...result,
          ...this.renderItem(6),
        };
      }

      if (key === Const.listColumn.jul) {
        return {
          ...result,
          ...this.renderItem(7),
        };
      }

      if (key === Const.listColumn.aug) {
        return {
          ...result,
          ...this.renderItem(8),
        };
      }

      if (key === Const.listColumn.sep) {
        return {
          ...result,
          ...this.renderItem(9),
        };
      }

      if (key === Const.listColumn.oct) {
        return {
          ...result,
          ...this.renderItem(10),
        };
      }

      if (key === Const.listColumn.nov) {
        return {
          ...result,
          ...this.renderItem(11),
        };
      }

      if (key === Const.listColumn.dec) {
        return {
          ...result,
          ...this.renderItem(12),
        };
      }

      if (key === Const.listColumn.total) {
        return {
          ...result,
          render: (text, item) => (
            <>
              {item.year === currentYear && (
                <SimpleTooltip
                  message={
                    <span>{I18n.t('cashDividend.estimatedNumber')}</span>
                  }
                  position={'top'}
                  isLight={true}
                >
                  <div className={getStyleCurrentYear(item)}>{text}</div>
                </SimpleTooltip>
              )}
              {item.year !== currentYear && (
                <div className={getStyleCurrentYear(item)}>{text}</div>
              )}
            </>
          ),
        };
      }

      if (key === Const.listColumn.yield) {
        return {
          ...result,
          render: text => {
            let result = '';
            if (text) {
              result = text === '--' ? text : text + '%';
            }
            return <div className="text-right pl-10 pr-10">{result}</div>;
          },
        };
      }

      return result;
    });
  };

  renderItem = index => ({
    render: (text, item) => {
      const getStyle = item => {
        return item && item.isRed
          ? 'text-right pl-10 pr-10 isRed'
          : 'text-right pl-10 pr-10 ';
      };

      return (
        <div className={getStyle(item[index])}>
          {item[index] ? (
            item[index].isRed ? (
              <SimpleTooltip
                message={<span>{I18n.t('cashDividend.expectedNumber')}</span>}
                position={'top'}
                isLight={true}
              >
                {item[index].value}
              </SimpleTooltip>
            ) : (
              item[index].value
            )
          ) : (
            ''
          )}
        </div>
      );
    },
  });

  renderItem = index => ({
    render: (text, item) => {
      const getStyle = item => {
        return item && item.isRed
          ? 'text-right pl-10 pr-10 isRed'
          : 'text-right pl-10 pr-10 ';
      };

      return (
        <>
          {item[index] ? (
            item[index].isRed ? (
              <SimpleTooltip
                message={<span>{I18n.t('cashDividend.expectedNumber')}</span>}
                position={'top'}
                isLight={true}
              >
                <div className={getStyle(item[index])}>{item[index].value}</div>
              </SimpleTooltip>
            ) : (
              <div className={getStyle(item[index])}> {item[index].value} </div>
            )
          ) : (
            ''
          )}
        </>
      );
    },
  });

  render() {
    const { ids = [] } = this.props;

    return (
      <div className="tab-content h-100">
        <div className="tab-pane active h-100">
          <Table
            stickyFirstColumn={false}
            resizable={true}
            columnDraggable={false}
            rowDraggable={false}
            getDataFromRedux={this.getDataFromRedux}
            ids={ids}
            schema={this.getSchema()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    componentId,
    ids:
      state[REDUCER_NAME].listMultiComponent[componentId].listDataDividendTable,
    i18n: state.i18n,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(FADividendAnalysisTable);
