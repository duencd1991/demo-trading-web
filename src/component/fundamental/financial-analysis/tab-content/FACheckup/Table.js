import React, { PureComponent } from 'react';
import { REDUCER_NAME } from './../../reducer';
import { connect } from 'react-redux';
import Const from './Const';
import { getColorPrice } from '../../../../helpers/Color';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import { compose } from 'redux';
import Table from './../../../../common/table/Table';
import withScroll from '../../../../common/withScroll';
import CircleDot from './../../common/circle-dot/index';
import THeadCustom from './THeadCustom';
import { withComponentId } from '../../../../common/ComponentIdContext';
import THeadSearchBox from './THeadDropDown';
import { Translate } from 'react-redux-i18n';

class FACheckupTable extends PureComponent {
  getDataFromRedux = state => {
    const { componentId } = this.props;

    return state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
      .listFaCheckupByTicker;
  };

  getClassName = (item, listColumn) => {
    return getColorPrice(
      getDataFollowKeyByDot(item, listColumn.price),
      getDataFollowKeyByDot(item, listColumn.ref_price),
      getDataFollowKeyByDot(item, listColumn.high_price),
      getDataFollowKeyByDot(item, listColumn.low_price),
      'text',
    );
  };

  convertTextIcon = textIcon => {
    return textIcon.slice(0, textIcon.length);
  };

  getSchema = (i18nTitleKey, listColumnTable) => {
    const listColumn = Object.values(listColumnTable);
    return Object.keys(listColumnTable).map(item => {
      const key = Const.listColumn[item];
      const title = `${i18nTitleKey}.${item}`;
      const result = {
        key,
        title,
      };
      if (key === Const.listColumn.item) {
        return {
          disableSort: true,
          ...result,
          tdStyle: { width: '40%' },
          thStyle: { width: '40%' },
          render: (text, item) => {
            const textLinkIcon = item.icon;
            const textKey = item.item;
            const textValue = item.rateComment;
            return (
              <div className="fa-checkup-item">
                <div className="fa-checkup-item-icon">
                  <i className={textLinkIcon} style={{ fontSize: '15px' }} />
                </div>
                <div className="fa-checkup-item-body">
                  <label className="fa-checkup-item-title">
                    <Translate value={textKey} />
                  </label>
                  <p className="fa-checkup-item-content">{textValue}</p>
                </div>
              </div>
            );
          },
        };
      }
      if (key === Const.listColumn.checkupItem) {
        const titleCheckupItem = listColumn[1];
        return {
          disableSort: true,
          ...result,
          tdStyle: { width: '20%' },
          thStyle: { textAlign: 'center', width: '20%' },
          title: <THeadCustom title={titleCheckupItem} isDropDown={false} />,
          isHtml: true,
          render: (text, data) => {
            Object.keys(data).map((keyData, index) => {
              if (keyData === titleCheckupItem) {
                text = Object.values(data)[index];
              }
            });
            return <CircleDot keyTitle={0} value={text} />;
          },
        };
      }
      if (key === Const.listColumn.comparingCheckupItemOne) {
        const titleComparingOne = listColumn[2];
        return {
          disableSort: true,
          ...result,
          tdStyle: { width: '20%' },
          thStyle: { textAlign: 'center', width: '20%' },
          disableResize: false,
          isHtml: true,
          title: (
            <THeadCustom title={titleComparingOne}>
              <THeadSearchBox tickerChecked={titleComparingOne} keyItem={0} />
            </THeadCustom>
          ),
          render: (text, data) => {
            Object.keys(data).map((keyData, index) => {
              if (keyData === titleComparingOne) {
                text = Object.values(data)[index];
              }
            });
            return <CircleDot keyTitle={1} value={text} />;
          },
        };
      }
      if (key === Const.listColumn.comparingCheckupItemTwo) {
        const titleComparingTwo = listColumn[3];
        return {
          disableSort: true,
          ...result,
          tdStyle: { width: '20%' },
          thStyle: { textAlign: 'center', width: '20%' },
          disableResize: false,
          isHtml: true,
          title: (
            <THeadCustom title={titleComparingTwo}>
              <THeadSearchBox tickerChecked={titleComparingTwo} keyItem={1} />
            </THeadCustom>
          ),
          render: (text, data) => {
            Object.keys(data).map((keyData, index) => {
              if (keyData === titleComparingTwo) {
                text = Object.values(data)[index];
              }
            });
            return <CircleDot keyTitle={2} value={text} />;
          },
        };
      }
      return result;
    });
  };

  render() {
    const { ids, table } = this.props;
    let { listColumnTable } = this.props;

    if (!listColumnTable || listColumnTable.length === 0) {
      listColumnTable = {
        item: 'item',
        checkupItem: '--',
        comparingCheckupItemOne: '--',
        comparingCheckupItemTwo: '--',
      };
    }

    return (
      <Table
        thValign={'top'}
        table={table}
        resizable={true}
        columnDraggable={false}
        rowDraggable={false}
        hideColumns={Const.listHideColumn}
        getDataFromRedux={this.getDataFromRedux}
        ids={ids}
        schema={this.getSchema(
          'financialAnalysis.faCheckupHeader',
          listColumnTable,
        )}
      />
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    id: componentId,
    ids:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .listTickerFACheckup,
    listColumnTable:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .listColumnTable,
  };
};

FACheckupTable.defaultProps = {
  ids: [],
  listColumnTable: {
    item: 'item',
    checkupItem: '--',
    comparingCheckupItemOne: '--',
    comparingCheckupItemTwo: '--',
  },
};

const enhance = compose(
  withComponentId,
  connect(mapStateToProps),
  withScroll(185, REDUCER_NAME),
);

export default enhance(FACheckupTable);
