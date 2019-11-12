import ConstTooltip from '../../../common/mixTable/tooltip/Const';
import { typeChart } from './../../../common/mixTable/Const';
const listColumn = [
  {
    key: 'ticker',
    textAlign: 'left',
    isIconGraph: true,
    width: '70px',
  },
  {
    key: 'message',
    textAlign: 'left',
    typeTooltip: ConstTooltip.typeHover.hoverAlertSystem,
    keyOrgCode: 'ticker',
  },
  {
    key: 'activate',
    textAlign: 'center',
    isToggleSwitch: true,
    keyIsActive: 'active',
    width: '64px',
    isDisSort: true,
  },
  {
    key: 'modify',
    textAlign: 'center',
    isModify: true,
    width: '64px',
    isDisSort: true,
  },
  {
    key: 'remove',
    textAlign: 'center',
    isRemove: true,
    width: '64px',
    isDisSort: true,
  },
];
export default {
  listColumn,
  idAlertPersonal: 'idAlertPersonal',
  idCondition: 'conditionId',
  defaultOption: 'VolPriceIncrease',
  maxRowData: 30,
};
