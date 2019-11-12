import React from 'react';
import { connect } from 'react-redux';
import Const from '../Const';
import { I18n } from 'react-redux-i18n';
import { includes } from 'lodash';
import { REDUCER_NAME } from './../reducer';
import { exportCsv } from './../../../helpers/Export';
import {
  formatChange,
  formatPrice,
  formatTextFloat,
  formatVolume,
  formatValue,
} from './../../../../component/helpers/Text';
import { formatDate } from '../../../helpers/DateTime';
import priceDataService from './../../../../core/services/Prices/PriceData/PriceDataService';
import { isTicker } from '../../../helpers/Common';

class ExportCsv extends React.Component {
  format(item) {
    const { listMultiComponent, id } = this.props;
    const indexSumary = listMultiComponent[id].indexSumary;
    const formatItem = { ...item };
    Object.keys(item).map(key => {
      if (
        includes(
          [
            Const.priceDataTableOverview.LAST,
            Const.priceDataTableOverview.HIGH,
            Const.priceDataTableOverview.LOW,
            Const.priceDataTableOverview.OPEN,
            Const.priceDataTableOverview.CHANGE,
          ],
          key,
        )
      ) {
        formatItem[key] = formatTextFloat(
          isTicker(indexSumary) ? formatPrice(item[key]) : item[key],
        );
      }

      if (includes([Const.priceDataTableOverview.AVERAGE_PRICE], key)) {
        formatItem[key] = formatTextFloat(formatPrice(item[key]));
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.PERCENT_PRICE_CHANGE,
            Const.priceDataTableForeign.OWNED_RATIO,
          ],
          key,
        )
      ) {
        formatItem[key] = formatTextFloat(item[key] * 100) + '%';
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.MATCHED_VOLUME,
            Const.priceDataTableOverview.PUT_THROUGH_VOL,
            Const.priceDataTableOverview.TOTAL_VOL,
            Const.priceDataTableForeign.BUY_ORDER_VOL,
            Const.priceDataTableForeign.SELL_ORDER_VOL,
            Const.priceDataTableForeign.NET_VOLUME,
            Const.priceDataTableProprietary.BUY_VOL,
            Const.priceDataTableProprietary.SELL_VOL,
            Const.priceDataTableProprietary.NET_VOL,
            Const.priceDataTableOrderStatistic.BUY_VOL,
            Const.priceDataTableOrderStatistic.SELL_VOL,
          ],
          key,
        )
      ) {
        formatItem[key] = formatTextFloat(formatVolume(item[key]));
      }

      if (
        includes(
          [
            Const.priceDataTableOverview.MATCHED_VALUE,
            Const.priceDataTableOverview.PUT_THROUGH_VALUE,
            Const.priceDataTableOverview.TOTAL_VALUE,
            Const.priceDataTableForeign.BUY_ORDER_VALUE,
            Const.priceDataTableForeign.SELL_ORDER_VALUE,
            Const.priceDataTableForeign.NET_VALUE,
            Const.priceDataTableProprietary.BUY_VALUE,
            Const.priceDataTableProprietary.SELL_VALUE,
            Const.priceDataTableProprietary.NET_VALUE,
          ],
          key,
        )
      ) {
        formatItem[key] = formatTextFloat(formatValue(item[key]));
      }

      if (includes([Const.priceDataTableOverview.DATE], key)) {
        formatItem[key] = formatDate(item[key]);
      }

      if (
        includes(
          [
            Const.priceDataTableOrderStatistic.NR_OF_BUY_ORDER,
            Const.priceDataTableOrderStatistic.NR_OF_SELL_ORDER,
          ],
          key,
        )
      ) {
        formatItem[key] = formatTextFloat(formatPrice(item[key]));
      }
    });
    return formatItem;
  }

  formatedParams(params, timeRange, dateRangeOption) {
    let { Code, Page, PageSize } = params || '';
    let { FromDate, ToDate } = dateRangeOption || '';
    let dateRange = this.getPreviousYearFromCurrentDate();
    const formatParams = {
      Code: 'VNINDEX',
      Frequently: 'Daily',
      Page: 1,
      PageSize: 30,
      From: dateRange.from,
      To: dateRange.to,
    };
    if (Code) formatParams.Code = Code;
    if (Page) formatParams.Page = Page;
    if (PageSize) formatParams.PageSize = PageSize;
    if (timeRange) formatParams.Frequently = timeRange;
    if (FromDate) formatParams.From = FromDate;
    if (ToDate) formatParams.To = ToDate;
    return formatParams;
  }

  getPreviousYearFromCurrentDate() {
    let currenDateYear = new Date();
    let pastYear = currenDateYear.getFullYear() - 1;

    let lastDateYear = new Date();
    lastDateYear.setFullYear(pastYear);
    lastDateYear = formatDate(lastDateYear);
    currenDateYear = formatDate(currenDateYear);
    let dateRange = { from: lastDateYear, to: currenDateYear };
    return dateRange;
  }

  initialInforExportCsv = () => {
    const { id, listMultiComponent } = this.props;
    const code = listMultiComponent[id].currentSearch.code;
    const displayCode = listMultiComponent[id].currentSearch.displayCode;
    const dateRangeOption = listMultiComponent[id].dateRangeOption;

    const formatParams = this.formatedParams(
      { Code: code, Page: 1, PageSize: 300 },
      'Daily',
      dateRangeOption,
    );

    priceDataService.getPriceData(formatParams).then(({ items = [] }) => {
      const { hideColumns, schemaKey: priceDataTable } = this.props;
      const data = items.map(
        item => (
          (item.averageValue = formatTextFloat(
            formatPrice(item.totalMatchValue / item.totalMatchVolume),
          )),
          (item.netVol = formatTextFloat(
            formatVolume(
              item.foreignBuyVolumeMatched - item.foreignSellVolumeMatched,
            ),
          )),
          (item.netValue = formatTextFloat(
            formatValue(
              item.foreignBuyValueMatched - item.foreignSellValueMatched,
            ),
          )),
          (item.netVolProprietary = formatTextFloat(
            formatVolume(
              item.totalMatchBuyTradeVolume - item.totalMatchSellTradeVolume,
            ),
          )),
          (item.netValueProprietary = formatTextFloat(
            formatValue(
              item.totalMatchBuyTradeValue - item.totalMatchSellTradeValue,
            ),
          )),
          (item.netVolOrderStatistic = formatTextFloat(
            formatVolume(item.totalBuyTradeVolume - item.totalSellTradeVolume),
          )),
          (item.buyOrderAvgVol = formatTextFloat(
            item.totalBuyTradeVolume / item.totalBuyTrade,
          )),
          (item.sellOrderAvgVol = formatTextFloat(
            item.totalSellTradeVolume / item.totalSellTrade,
          )),
          this.format(item)
        ),
      );

      const options = {
        fieldSeparator: ',',
        filename: `${displayCode}_historical price_date`,
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
      exportCsv(data, priceDataTable, hideColumns, options);
    });
  };

  render() {
    const { listMultiComponent, id } = this.props;
    const isDailyView = listMultiComponent[id].isDailyView;
    let exportLabel = I18n.t('priceData.export');

    if (isDailyView) {
      return (
        <div className="pd-top-navigation--right">
          <a
            href="#"
            onClick={this.initialInforExportCsv}
            className="btn btn-cus-nomal bg-b-color-3"
          >
            <i className="icon-printer-tool fs-12 mr-5" />
            {exportLabel}
          </a>
        </div>
      );
    }

    return <div className="pd-top-navigation--right" />;
  }
}

const mapStateToProps = state => {
  return {
    isDailyView: state[REDUCER_NAME].isDailyView,
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(ExportCsv);
