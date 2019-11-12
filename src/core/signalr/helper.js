import { ChanelConfig } from '../../configs/GlobalConfig';
import { getLanguage } from '../../component/helpers/Language';

export const formatTickers = tickers => unique(tickers, 'ticker');

export const formatIndexs = indexs => unique(indexs, 'comGroupCode');

export const formatDerivatives = derivatives =>
  unique(derivatives, 'derivativeCode');

const unique = (items, field) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.reduce((result, item) => {
    const existIndex = result.findIndex(it => it[field] === item[field]);
    if (existIndex !== -1) {
      result[existIndex] = item;

      return result;
    }
    result.push(item);

    return result;
  }, []);
};

export const formatMessageData = (channel, data) => {
  //heat map - map language
  if (channel.indexOf('HeatMap') > -1) {
    const lang = getLanguage();
    switch (lang) {
      case 'en':
        data.sectors.forEach(el => {
          el.name = el.en_Name;
          el.tickers.forEach(t => {
            t.name = t.en_Name;
          });
        });
        break;
      case 'ja':
        data.sectors.forEach(el => {
          el.name = el.jp_Name;
          el.tickers.forEach(t => {
            t.name = t.jp_Name;
          });
        });
        break;
      default:
        break;
    }
  }

  switch (channel) {
    case ChanelConfig.TickChanel:
      return formatTickers(data);
    case ChanelConfig.IndexChannel:
      return formatIndexs(data);
    case ChanelConfig.DerivativeChannel:
      return formatDerivatives(data);
    default:
      return data;
  }
};
