import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Const from '../../../Const';
import Table from '../../../../../common/table/Table';
import {
  formatTextFloat,
  formatValueBillion,
  formatPercent,
} from '../../../../../helpers/Text';
import ExpandRow from './ExpandRow';
import withScroll from './../../../../../common/withScroll';
import { compose } from 'redux';
import { REDUCER_NAME } from './../../../reducer';

const LIST_KEY_FORMAT_PERCENT = [
  //stock
  'rtq12',
  'rtq14',
  'rtq44',
  'rtq45',
  'rtq25',
  'rtq29',
  'rtq51',
  'rtq50',
  'rtq85',
  'rtq86',
  'rtq47',
  'rtq118',
  'rtq78',
  'rtq81',
  'rtd20',
  //industry
  'rsq51',
  'rsq50',
  'rsq85',
  'rsq86',
  'rsq12',
  'rsq14',
  'rsq44',
  'rsq47',
  'rsq11',
  'rsq23',
  'rsq25',
  'rsd20',
  'rsq78',
  'rsq81',
  'rsq83',
];
const LIST_KEY_FORMAT_BILLION = ['rtd11', 'rsd11', 'ryd11'];

class FATable extends React.PureComponent {
  formatRowData = (key, value) => {
    let returnText = value;
    if (LIST_KEY_FORMAT_PERCENT.findIndex(item => item === key) !== -1) {
      returnText = `${formatTextFloat(formatPercent(value))} ${
        value ? '%' : ''
      }`;
    } else if (LIST_KEY_FORMAT_BILLION.findIndex(item => item === key) !== -1) {
      returnText = formatTextFloat(formatValueBillion(value));
    } else {
      returnText = formatTextFloat(value);
    }

    return returnText;
  };

  transformData = sortedListYears => {
    const {
      data: { ratios = [], ratiosIndustry = [], isBank },
    } = this.props;

    const dataMapping = isBank ? Const.FATable.bank : Const.FATable.nonBank;
    const listGroups = Object.keys(dataMapping);
    const dataByID = {};
    const listGroupIDs = [];
    listGroups.map(group => {
      const listIDs = [];
      Object.keys(dataMapping[group]).forEach(element => {
        const row = {};
        const stockKey = dataMapping[group][element];
        const industryKey = Const.industry[element];
        sortedListYears.forEach(year => {
          const result = ratios.find(data => data.yearReport === year);

          const currentYear = new Date().getFullYear();

          if (year === currentYear) {
            const yearTitle = `${year} (TTM)`;
            let currentKey = stockKey;
            // add "TTM" string to current year,  TTM have some diff keys with other year
            // const listSpecialKeys = Object.keys(Const.specialTtmKeysSwap);
            // if (listSpecialKeys.findIndex(key => key === stockKey) !== -1) {
            //   currentKey = listSpecialKeys[stockKey];
            //   //if key in list special key swap current key with special keys
            // }
            row[yearTitle] = this.formatRowData(currentKey, result[currentKey]);
          } else {
            row[year] = this.formatRowData(stockKey, result[stockKey]);
          }
        });
        const id = `${group}-${element}`;
        const childName = I18n.t(
          `financialAnalysis.tableChildCaption.${element}`,
        );

        let industryValue = null;

        industryValue = this.formatRowData(
          industryKey,
          ratiosIndustry[industryKey],
        );

        dataByID[id] = {
          ...row,
          item: childName,
          industry: industryValue,
        };
        listIDs.push(id);
      });

      const groupName = I18n.t(`financialAnalysis.tableParentCaption.${group}`);

      const groupProps = {
        renderTitle: () => <ExpandRow value={groupName} />,
        ids: listIDs,
        canToggle: true,
        rowStyle: {
          cursor: 'pointer',
        },
      };

      listGroupIDs.push(groupProps);
    });
    return [listGroupIDs, dataByID];
  };

  render() {
    const {
      data: { ratios },
      data,
      table,
      theme,
    } = this.props;
    const checkData = data && Object.keys(data).length !== 0;
    const listYears = checkData ? ratios.map(year => year.yearReport) : [];
    const sortedListYears = listYears
      .sort((a, b) => a - b)
      .slice(Math.max(listYears.length - 3, 1));
    const currentYear = new Date().getFullYear();
    const listColumn = [
      ...[{ item: 'item' }],
      ...sortedListYears.map(item => {
        if (item === currentYear) return { [`${item} (TTM)`]: `${item} (TTM)` };
        else
          return {
            [item]: item,
          };
      }),
      ...[{ industry: 'industry' }],
    ];

    const groupData = this.transformData(sortedListYears);
    const textColor =
      theme === 'dark'
        ? { color: 'white', opacity: 0.5 }
        : { color: '#1f2023', opacity: 0.5 };

    return (
      <Table
        table={table}
        stickyFirstColumn
        groups={groupData[0]}
        resizeable={false}
        columnDraggable={false}
        rowDraggable={false}
        getDataFromRedux={() => {
          return groupData[1];
        }}
        schema={listColumn.map(item => {
          const keyObject = Object.keys(item)[0];
          const title = keyObject;
          const key = keyObject;
          const result = {
            key,
            title,
          };
          if (key === 'item') {
            return {
              disableSort: true,
              ...result,
              render: text => (
                <div
                  style={{
                    ...textColor,
                    paddingLeft: 24,
                    fontWeight: 300,
                    fontStyle: 'italic',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {text}
                </div>
              ),
            };
          }

          return result;
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    theme: state.theme,
  };
};

export default compose(
  connect(mapStateToProps),
  withScroll(180, REDUCER_NAME),
)(FATable);
