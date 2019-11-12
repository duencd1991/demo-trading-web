import { I18n } from 'react-redux-i18n';
import {
  formatPrice,
  formatTextFloat,
  formatValueBillion,
} from '../../../../component/helpers/Text';
import chartingService from '../Charting';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../../component/app/commonReducer';
import store from '../../../../component/app/store';
import { SYMBOL_TYPES } from './Const';

const mapResolution = {
  1: 'EachMinute',
  5: 'EachFiveMinutes',
  15: 'EachFifteenMinutes',
  30: 'EachThirteenMinutes',
  60: 'EachOneHour',
  D: 'Daily',
  W: 'Weekly',
  M: 'Monthly',
  '3M': 'Quarterly',
  '12M': 'Yearly',
  '1D': 'Daily',
};

const getLang = () => store.getState().i18n.locale;

const getIssueMethodKey = () => {
  const mapLang = {
    en: 'en_IssueMethodName',
    vi: 'issueMethodName',
  };
  return mapLang[getLang()];
};

const getInternalTransactionName = () => {
  const mapLang = {
    en: 'en_FullName',
    vi: 'fullName',
  };

  return mapLang[getLang()];
};

const formatTime = time => {
  const date = new Date(time);
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatPercent = percent => {
  return percent % 1 === 0 ? percent : formatTextFloat(percent);
};

const timeScaleMarkTypes = {
  Earning: {
    color: 'brown',
    label: 'E',
    tooltips: [
      {
        i18nKey: 'revenue',
        getValue: item => formatTextFloat(formatValueBillion(item.profit)),
      },
      {
        i18nKey: 'profit',
        getValue: item => formatTextFloat(formatValueBillion(item.profit)),
      },
      {
        i18nKey: 'periodEnding',
        getValue: item => `Q${item.lengthReport} - ${item.yearReport}`,
      },
    ],
  },
  Dividend: {
    color: 'yellow',
    label: 'D',
    tooltips: [
      {
        i18nKey: 'dividends',
        getValue: item => formatTextFloat(item.valuePershare, 0),
      },
      {
        i18nKey: 'exRatio',
        getValue: item => formatPercent(item.exerciseRate * 100),
      },
      {
        i18nKey: 'exrightDate',
        getValue: item => formatTime(item.exrightDate),
      },
    ],
  },
  ShareIssuance: {
    color: 'blue',
    label: 'I',
    tooltips: [
      {
        i18nKey: 'issueMethod',
        getValue: item => item[getIssueMethodKey()],
      },
      {
        i18nKey: 'volume',
        getValue: item => formatTextFloat(item.issueVolumn, 0),
      },
      {
        i18nKey: 'exRatio',
        getValue: item => formatPercent(item.exerciseRatio * 100),
      },
      {
        i18nKey: 'exIssueDate',
        getValue: item => formatTime(item.exrightDate),
      },
    ],
  },
};

const markTypes = {
  InternalTransaction: {
    S: {
      color: 'red',
      label: 'S',
      i18nKey: 'sell',
      getValue: item => formatTextFloat(Math.abs(item.shareAcquire), 0),
    },
    B: {
      color: 'green',
      label: 'B',
      i18nKey: 'buy',
      getValue: item => formatTextFloat(Math.abs(item.shareAcquire), 0),
    },
  },
};

const getOrganCode = ticker => {
  const stocks = store.getState()[COMMON_REDUCER_NAME].listOrganizationByTicker;

  return stocks[ticker] ? stocks[ticker].organCode : ticker;
};

const getTimescaleTooltip = (eventItem, item) =>
  eventItem.tooltips.map(tooltip =>
    I18n.t(`charting.${tooltip.i18nKey}`, { value: tooltip.getValue(item) }),
  );

const getUnixTime = publicDate => {
  return Math.round(new Date(publicDate).getTime() / 1000);
};

const formatTimescaleMarks = (result, item) => {
  const obj = {
    time: getUnixTime(item.publicDate),
    id: item.id,
    labelFontColor: '#ffffff',
    minSize: 10,
  };
  if (!timeScaleMarkTypes[item.type]) {
    return result;
  }

  return result.concat({
    ...obj,
    color: timeScaleMarkTypes[item.type].color,
    label: timeScaleMarkTypes[item.type].label,
    tooltip: [''].concat(
      getTimescaleTooltip(timeScaleMarkTypes[item.type], item),
    ),
  });
};

const getMarkTooltip = (item, mark) => `
    <div style="margin-bottom: 5px">
      <strong>${item[getInternalTransactionName()]}</strong>
    </div>
    <div>
      <strong>
        ${I18n.t(`charting.${mark.i18nKey}`, {
          value: mark.getValue(item),
        })}
      </strong>
    </div>
  `;

const formatMarks = (result, item) => {
  const obj = {
    time: getUnixTime(item.publicDate),
    id: item.id,
    minSize: 20,
  };
  if (!markTypes[item.type] || !markTypes[item.type][item.actionTypeCode]) {
    return result;
  }
  const mark = markTypes[item.type][item.actionTypeCode];
  return result.concat({
    ...obj,
    labelFontColor: mark.color,
    color: {
      border: mark.color,
      background: 'transparent',
    },
    label: mark.label,
    text: getMarkTooltip(item, mark),
  });
};

const getEventParam = (symbolInfo, from, to) => ({
  OrganCode: getOrganCode(symbolInfo.ticker),
  From: new Date(from * 1000).toISOString(),
  To: new Date(to * 1000).toISOString(),
});

export const getPrice = (symbolInfo, value) => {
  if (symbolInfo.type === SYMBOL_TYPES.STOCK) {
    return formatPrice(value);
  }

  return value;
};

const getBarTime = (time, resolution) => {
  if (resolution.includes('D')) {
    const date = new Date(time);

    return Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    );
  }

  return new Date(time).getTime();
};

export default {
  getBars: async (symbolInfo, resolution, from, to) => {
    const mapTypeToParam = {
      [SYMBOL_TYPES.STOCK]: 'Stock',
      [SYMBOL_TYPES.INDICES]: 'Index',
      [SYMBOL_TYPES.FUTURES]: 'Derivative',
      [SYMBOL_TYPES.ECONOMY]: 'Economy',
    };
    const data = await chartingService
      .getTradingViewData({
        Code: getOrganCode(symbolInfo.ticker),
        Frequency: mapResolution[resolution],
        From: new Date(from * 1000).toISOString(),
        To: new Date(to * 1000).toISOString(),
        Type: mapTypeToParam[symbolInfo.type],
      })
      .then(({ data }) => data);
    if (!data || !data.items) {
      return [];
    }
    return data.items.map(item => {
      const time = getBarTime(item.tradingDate, resolution);
      return {
        time,
        low: getPrice(symbolInfo, item.lowestPrice),
        high: getPrice(symbolInfo, item.highestPrice),
        open: getPrice(symbolInfo, item.openPrice),
        close: getPrice(symbolInfo, item.closePrice),
        volume: item.totalMatchVolume,
      };
    });
  },

  getTimescaleMarks: async (symbolInfo, from, to) => {
    const response = await chartingService.getStockEvents(
      getEventParam(symbolInfo, from, to),
    );

    return response.data.items.reduce(formatTimescaleMarks, []);
  },

  getMarks: async (symbolInfo, from, to) => {
    const response = await chartingService.getStockEvents(
      getEventParam(symbolInfo, from, to),
    );

    return response.data.items.reduce(formatMarks, []);
  },
};
