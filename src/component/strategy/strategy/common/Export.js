import React from 'react';
import { connect } from 'react-redux';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import { exportCsv } from './../../../helpers/Export';
import { withComponentId } from './../../../common/ComponentIdContext';
import { compose } from 'redux';

class Export extends React.Component {
  initialInforExportCSV = () => {
    // const { dataDividendTableByYear = {} } = this.props;

    // const data = Object.keys(dataDividendTableByYear).map(function (key) {
    //   const item = dataDividendTableByYear[key];
    //   return {
    //     year: item ? item.year : '',
    //     jan: item && item[1] ? item[1].value : '',
    //     feb: item && item[2] ? item[2].value : '',
    //     mar: item && item[3] ? item[3].value : '',
    //     apr: item && item[4] ? item[4].value : '',
    //     may: item && item[5] ? item[5].value : '',
    //     jun: item && item[6] ? item[6].value : '',
    //     jul: item && item[7] ? item[7].value : '',
    //     aug: item && item[8] ? item[8].value : '',
    //     sep: item && item[9] ? item[9].value : '',
    //     oct: item && item[10] ? item[10].value : '',
    //     nov: item && item[11] ? item[11].value : '',
    //     dec: item && item[12] ? item[12].value : '',
    //     total: item && item.total ? item.total : '',
    //     yield: item && item.yield ? item.yield + '%' : '',
    //   }
    // }).reverse();

    // const options = {
    //   fieldSeparator: ',',
    //   filename: 'Export csv table',
    //   quoteStrings: '"',
    //   decimalSeparator: '.',
    //   showLabels: true,
    //   showTitle: false,
    //   useTextFile: false,
    //   useBom: true,
    //   useKeysAsHeaders: true,
    // };
    // exportCsv(data, Const.listColumnEx, null, options);
    console.log('vao day');
  };

  render() {
    return (
      <div className="export">
        <a
          href="#"
          onClick={this.initialInforExportCSV}
          className="btn btn-cus-nomal bg-b-color-3"
        >
          <i className="icon-printer-tool fs-12 mr-5" />
          {I18n.t('cashDividend.export')}
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { dataDividendTableByYear } = state[REDUCER_NAME].listMultiComponent[componentId];

  return {
    i18n: state.i18n,
    // dataDividendTableByYear,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Export);
