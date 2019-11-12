import React from 'react';
import Const from '../Const';
import { CustomRange } from '../../../common/range';
import {
  formatValueBillion,
  formatPercent,
  formatTextFloat,
  formatPrice,
  formatValue,
} from '../../../helpers/Text';
import { REDUCER_NAME, changeRange } from '../reducer';
import { connect } from 'react-redux';

const getFormatParamRange = (param, type) => {
  if (type === Const.unitType.BillionVND.key) {
    return formatTextFloat(formatValueBillion(param));
  }
  if (type === Const.unitType.MillionVND.key) {
    return formatTextFloat(formatValue(param));
  }
  if (
    type === Const.unitType.ThousandVND.key ||
    type === Const.unitType.ThousandUnit.key
  ) {
    return formatTextFloat(formatPrice(param));
  }
  if (type === Const.unitType.Percentage.key) {
    return formatPercent(param);
  }
  return formatTextFloat(param, 0);
};

const removeParameter = param => {
  const { changeRange } = this.props;
  const parameters = this.props.parameters || [];
  const newparam = parameters.filter(p => p.code !== param.code);
  changeRange(newparam);
};

const ScreenerRange = ({ param, selectedValue, onChange }) => {
  const [min, max] = param.valueRange;

  return (
    <div style={{ marginBottom: '8px', marginTop: '8px' }}>
      <div className="slider-detail">
        <div className="text-left">{param.name}</div>
        <div className="text-right">
          {' '}
          <span>
            {`
            ${getFormatParamRange(min, param.unit)}
            ${Const.unitType[param.unit].text} -
            ${getFormatParamRange(max, param.unit)}
            ${Const.unitType[param.unit].text}
            `}
          </span>
          <i className="icon-cancel text-pointer" />
        </div>
      </div>
      <div className="criteria-slider pl-10">
        <CustomRange
          defaultValue={selectedValue || param.valueRange}
          min={min}
          max={max}
          step={0.0001}
          tipFormatter={params => (
            <div className="tooltip-content">
              {getFormatParamRange(params, param.unit)}
            </div>
          )}
          onChange={params => onChange(params, param)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    parameters: state[REDUCER_NAME].parameters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeRange: parameters => dispatch(changeRange(parameters)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenerRange);
