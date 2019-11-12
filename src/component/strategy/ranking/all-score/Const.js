import { formatTextFloat, formatValueBillion } from '../../../helpers/Text';
import ConstTooltip from '../../../common/mixTable/tooltip/Const';
const listColumn = [
  {
    key: 'ticker',
    typeTooltip: ConstTooltip.typeHover.hoverScore,
    textAlign: 'left',
    isIconGraph: true,
    keyOrgCode: 'organCode',
  },
  {
    key: 'ranking',
    textAlign: 'left',
    isRanking: true,
    keyRank: 'icbRank',
    keyTotalRank: 'icbTotalRanked',
    width: '70px',
  },
  { key: 'allIndustries', textAlign: 'left', isDisSort: true },
  { key: 'marketCap', format: formatValueBillion, textAlign: 'right' },
  {
    key: 'value',
    typeTooltip: ConstTooltip.typeHover.hoverValueScore,
    isSetColorText: true,
    textAlign: 'center',
    keyOrgCode: 'ticker',
  },
  {
    key: 'growth',
    isSetColorText: true,
    textAlign: 'center',
  },
  {
    key: 'momentum',
    isSetColorText: true,
    textAlign: 'center',
  },
  {
    key: 'vgm',
    isSetColorText: true,
    textAlign: 'center',
  },
];

export default {
  listColumn,
  organCode: 'organCode',
  maxRowData: 10,
};
