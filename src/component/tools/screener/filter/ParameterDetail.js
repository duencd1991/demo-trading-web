import React from 'react';
import ValueRange from './ValueRange';
import Checkbox from './Checkbox';

import { I18n } from 'react-redux-i18n';
import Const from '../Const';
import ScreenerRange from './ScreenerRange';
import ScrollComponent from '../../../common/ScrollComponent';

class ParameterDetail extends React.PureComponent {
  renderParam = (param, index) => {
    const {
      getSelectedValue,
      isCodeActive,
      onInputChange,
      onCheckboxChange,
    } = this.props;
    const selectedValue = getSelectedValue(param);
    if (
      param.type == Const.paramType.RANGE &&
      param.valueRange.length > 0 &&
      isCodeActive(param.code)
    ) {
      return (
        <ScreenerRange
          onChange={onInputChange}
          key={index}
          param={param}
          selectedValue={selectedValue}
        />
      );
    }

    if (param.type == Const.paramType.VALUE && isCodeActive(param.code)) {
      return (
        <ValueRange
          key={index}
          paramName={param.name}
          param={param}
          selectedValue={selectedValue || []}
          valueRange={param.valueRange}
          onChange={(e, value) => onCheckboxChange(e, value)}
        />
      );
    }

    if (param.type == Const.paramType.BOOLEAN && isCodeActive(param.code)) {
      return (
        <Checkbox
          key={index}
          selectedValue={selectedValue[0]}
          onChange={e => onInputChange(e, param)}
          param={param}
        />
      );
    }

    return null;
  };

  render() {
    const { listArrayCode, paramRef } = this.props;
    return (
      <div className="criteria-item ml-10">
        <div className="criteria-head">
          {I18n.t('stockScreener.screenerMessage.selectedCriteria')}
        </div>
        <div className="criteria-row">
          <div className="criteria-slider-content scroll-item w-100">
            <ScrollComponent scrollRef={paramRef}>
              <div className="pl-10 pr-10 scroll-item-content">
                {listArrayCode.map(this.renderParam)}
              </div>
            </ScrollComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default ParameterDetail;
