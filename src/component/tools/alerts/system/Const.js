import ConstTooltip from '../../../common/mixTable/tooltip/Const';
import { typeChart } from './../../../common/mixTable/Const';
import moment from 'moment';
const listColumn = [
  {
    key: 'createDate',
    textAlign: 'left',
    format: el => moment(el).format('HH:mm:ss'),
    width: '70px',
  },
  {
    key: 'ticker',
    textAlign: 'left',
    isIconGraph: true,
    width: '70px',
    keyOrgCode: 'organCode',
  },
  {
    key: 'message',
    textAlign: 'left',
    typeTooltip: ConstTooltip.typeHover.hoverAlertSystem,
    keyOrgCode: 'organCode',
  },
];

export default {
  listColumn,
  maxRowData: 30,
};
