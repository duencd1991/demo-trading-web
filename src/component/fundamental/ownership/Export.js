import React from 'react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import { exportCsv } from '../../helpers/Export';
import { formatDate } from '../../helpers/DateTime';
import {
  formatPrice,
  formatTextFloat,
  formatPercent,
} from '../../helpers/Text';
import Const from './Const';

class ExportCsv extends React.Component {
  getSchemaKey = indexSelectTab => {
    if (indexSelectTab === Const.listTab.MajorShareHolders.Index) {
      return Const.listTitleTableMajorShareHolders;
    }
    return Const.listTitleTableBOD;
  };

  getDataTableByTab = indexSelectTab => {
    const { listMajorShareHolders, listBoardOfDirectors } = this.props;
    if (indexSelectTab === Const.listTab.MajorShareHolders.Index) {
      return listMajorShareHolders;
    }
    return listBoardOfDirectors;
  };

  getPatchOfFileNameExport = indexSelectTab => {
    if (indexSelectTab === Const.listTab.MajorShareHolders.Index) {
      return Const.listTab.MajorShareHolders.Name;
    }
    return Const.listTab.BoardOfDirectors.Name;
  };

  formatData = data => {
    let formatData = data;
    formatData.map(item => {
      item.publicDate = formatDate(item.publicDate);
      item.percentage = formatPercent(formatTextFloat(item.percentage)) + '%';
      item.quantity = formatTextFloat(formatPrice(item.quantity));
    });
    return formatData;
  };

  initialInforExportCsv = () => {
    const { indexSelectTab } = this.props;
    let data = this.getDataTableByTab(indexSelectTab);
    const dataFormat = this.formatData(data);
    const getSchemaKey = this.getSchemaKey(indexSelectTab);
    const patchOfFileName = this.getPatchOfFileNameExport(indexSelectTab);

    const options = {
      fieldSeparator: ',',
      filename: `${patchOfFileName}_historical ownership`,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    exportCsv(dataFormat, getSchemaKey, null, options);
  };

  render() {
    let exportLabel = I18n.t('ownerShip.export');
    return (
      <>
        <a
          href="#"
          onClick={this.initialInforExportCsv}
          className="btn btn-cus-nomal bg-b-color-3"
        >
          <i className="icon-printer-tool fs-12 mr-5" />
          {exportLabel}
        </a>
      </>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    i18n: state.i18n,
    listMajorShareHolders:
      state[REDUCER_NAME].listMultiComponent[id].listMajorShareHolders,
    listBoardOfDirectors:
      state[REDUCER_NAME].listMultiComponent[id].listBoardOfDirectors,
  };
};

export default connect(mapStateToProps)(ExportCsv);
