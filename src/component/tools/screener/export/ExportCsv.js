import { includes } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
//TODO import screenerService from '../../../../core/services/Tools/Screener/ScreenerService';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import Const from '../Const';
import { REDUCER_NAME } from '../reducer';
import {
  formatPercent,
  formatPrice,
  formatTextFloat,
  formatValueBillion,
  formatVolume,
} from './../../../../component/helpers/Text';

class ExportCsv extends React.PureComponent {
  format(item, listColumnKey, listColumn) {
    const text = getDataFollowKeyByDot(item, listColumnKey);
    if (
      includes(
        [
          listColumn.RTD21,
          listColumn.RTD14,
          listColumn.RTD7,
          listColumn.RTD21,
          listColumn.RTD25,
          listColumn.RSI,
          listColumn.SMA20,
          listColumn.SMA50,
          listColumn.SMA100,
        ],
        listColumnKey,
      )
    ) {
      return formatTextFloat(text);
    }

    if (
      includes(
        [listColumn.RTD11, listColumn.ISA3, listColumn.ISA20],
        listColumnKey,
      )
    ) {
      return formatTextFloat(formatValueBillion(text));
    }

    if (includes([listColumn.RTD36], listColumnKey)) {
      return formatPercent(text);
    }

    if (
      includes(
        [listColumn.AVERAGE_VOLUME_3MONTH, listColumn.VOLUME],
        listColumnKey,
      )
    ) {
      return formatTextFloat(formatVolume(text));
    }

    if (includes([listColumn.PRICE], listColumnKey)) {
      return formatTextFloat(formatPrice(text));
    }

    if (includes([listColumn.TICKER], listColumnKey)) {
      return text;
    }
  }

  initialInforExportCsv = () => {
    const { comGroupCode, icbCode, parameters, locale } = this.props;
    //TODO screenerService
    //   .getScreenerExport({
    //     comGroupCode: comGroupCode || Const.defaultWatchList,
    //     icbCode: icbCode || Const.defaultIcbCode,
    //     parameters: parameters,
    //     language: locale,
    //   })
    //   .then(res => {
    //     let blob = new Blob([]);
    //     if (res) {
    //       blob = new Blob(['\uFEFF', res]);
    //     }

    //     if (typeof navigator.msSaveOrOpenBlob === 'function') {
    //       navigator.msSaveOrOpenBlob(blob, 'ExportData.csv');
    //     } else {
    //       const link = document.createElement('a');
    //       const csvUrl = URL.createObjectURL(blob);

    //       link.textContent = 'download';
    //       link.href = csvUrl;
    //       link.setAttribute('download', 'ExportData.csv');

    //       link.style.visibility = 'hidden';

    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     }

    //     // const url = window.URL.createObjectURL(new Blob(['\ufeff', res]));
    //     // // const url = window.URL.createObjectURL(new Blob([(res)],{type:'text/csv;charset=UTF-16LE;'}));
    //     // const link = document.createElement('a');
    //     // link.href = url;
    //     // link.setAttribute('download', 'ExportData.csv');
    //     // document.body.appendChild(link);
    //     // link.click();
    //     // if (items) {
    //     //   const data = items.map(item => {
    //     //     return Object.keys(listColumn).reduce((result, key) => {
    //     //       return {
    //     //         ...result,
    //     //         [key]: this.format(item, listColumn[key], listColumn),
    //     //       };
    //     //     }, {});
    //     //   });

    //     //   const options = {
    //     //     fieldSeparator: ',',
    //     //     filename: 'Export Result Data',
    //     //     quoteStrings: '"',
    //     //     decimalSeparator: '.',
    //     //     showLabels: true,
    //     //     showTitle: false,
    //     //     useTextFile: false,
    //     //     useBom: true,
    //     //     useKeysAsHeaders: true,
    //     //   };
    //     //   exportCsv(data, Const.listColumnEx, null, options);
    //     // }
    //   });
  };

  render() {
    return (
      <div className="pd-top-navigation--right">
        <a
          href="#"
          onClick={this.initialInforExportCsv}
          className="btn btn-cus-nomal bg-b-color-3"
        >
          <i className="icon-printer-tool fs-12 mr-5" />
          {I18n.t('stockScreener.button.export')}
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    parameters: state[REDUCER_NAME].parameters,
    comGroupCode: state[REDUCER_NAME].comGroupCode,
    icbCode: state[REDUCER_NAME].icbCode,
    locale: state.i18n.locale,
  };
};

export default connect(mapStateToProps)(ExportCsv);
