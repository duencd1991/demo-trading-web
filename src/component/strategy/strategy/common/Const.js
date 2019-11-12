import { formatValueBillion } from '../../../helpers/Text';
import ConstTooltip from '../../../common/mixTable/tooltip/Const';

//config table
const listColumn = [
  {
    key: 'ticker',
    typeTooltip: ConstTooltip.typeHover.hoverScore,
    textAlign: 'left',
    isIconGraph: true,
    keyOrgCode: 'ticker',
  },
  { key: 'ranking', textAlign: 'left', isRanking: true, width: '70px' },
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
  listCheckboxValueInvest: ['industry', 'group'],
  VALUE: 'VIS',
  GROWTH: 'GIS',
  MOMENTUM: 'MIS',
  VMG: 'VMG',
  LEADERS: 'LIS',
  listColumn,
  organCode: 'organCode',
  maxRowData: 10,
  COLORVALUE: '#f5761d',
  COLORGROWTH: '#f4485e',
  COLORMOMENTUM: '#2965cc',
  COLORVMG: '#6aaf5c',
  COLORLEADERS: '#9983d8',
};
