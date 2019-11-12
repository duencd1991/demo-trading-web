import { formatTextFloat, formatValueBillion } from '../../../helpers/Text';
import ConstTooltip from '../../../common/mixTable/tooltip/Const';
import { typeChart } from './../../../common/mixTable/Const';
import _ from 'lodash';
const compareRanking = value => {
  if (!_.isEmpty(value.last5RankValues)) {
    return value.last5RankValues[value.last5RankValues.length - 1];
  } else {
    return value.rankValue;
  }
};
const listColumn = [
  { key: 'rankValue', textAlign: 'center', isTopRate: true, width: '40px' },
  {
    key: 'ticker',
    typeTooltip: ConstTooltip.typeHover.hoverScore,
    textAlign: 'left',
    height: '100%',
    isShowFullTicker: true,
    keyOrgCode: 'organCode',
    keyOrganShortName: 'organShortName',
    keyNameAndExchange: 'nameAndExchange',
    keyCompare: 'rankValue',
    keyPrevCompare: compareRanking,
  },
  { key: 'icbName', format: formatTextFloat, textAlign: 'left' },
  {
    key: 'last5RankValues',
    typeChart: typeChart.areaChart,
    textAlign: 'left',
    width: '95px',
  },
];

const listColumnRankingsIndicators = [
  { key: 'rankValue', textAlign: 'center', isTopRate: true, width: '40px' },
  {
    key: 'ticker',
    typeTooltip: ConstTooltip.typeHover.hoverScore,
    textAlign: 'left',
    height: '100%',
    isShowFullTicker: true,
    keyOrgCode: 'organCode',
    keyOrganShortName: 'organShortName',
    keyNameAndExchange: 'nameAndExchange',
    keyCompare: 'rankValue',
    keyPrevCompare: compareRanking,
  },
  { key: 'size', isSetColorText: true, textAlign: 'left' },
  { key: 'profit', isSetColorText: true, textAlign: 'left' },
  { key: 'cashflow', isSetColorText: true, textAlign: 'left' },
  { key: 'valuation', isSetColorText: true, textAlign: 'left' },
  { key: 'trading', isSetColorText: true, textAlign: 'left' },
  { key: 'analysisCover', isSetColorText: true, textAlign: 'left' },
];
const dropList = [
  {
    icbCode: 'VN30',
    icbName: 'VN30',
  },
  { icbCode: 'VNMid', icbName: 'VNMid' },
  {
    icbCode: 'VNSmall',
    icbName: 'VNSmall',
  },
];

export default {
  listColumn,
  dropList,
  organCode: 'organCode',
  idPriceVolume: 'idPriceVolume',
  defaultOption: 'VolumeIncreaseAndPriceIncrease',
  maxRowData: 50,
  listColumnRankingsIndicators,
};
