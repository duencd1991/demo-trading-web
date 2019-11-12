import React, { PureComponent } from 'react';
import { REDUCER_NAME, changeRange } from '../reducer';
import { connect } from 'react-redux';

class ValueRange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkAll: false,
      selectedValue: this.props.selectedValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { valueRange } = this.props;
    const selectedValue = nextProps.selectedValue;
    this.setState({ selectedValue });
    this.setState({ checkAll: selectedValue.length == valueRange.length });
  }

  handleClick = (value, param) => {
    const { selectedValue } = this.state;
    const { changeRange, valueRange } = this.props;
    const isCodeExist = selectedValue.some(c => c === value);
    const newValue = isCodeExist
      ? selectedValue.filter(c => c !== value)
      : selectedValue.concat(value);
    this.setState({
      selectedValue: newValue,
    });

    const newParam = { ...param, selectedValue: newValue };
    const parameters = this.props.parameters || [];
    let foundIndex = parameters.findIndex(p => p.code == param.code);
    if (foundIndex >= 0) {
      parameters[foundIndex] = newParam;
    } else {
      parameters.push(newParam);
    }
    if (newParam.selectedValue.length == valueRange.length) {
      this.setState({ checkAll: true });
    } else {
      this.setState({ checkAll: false });
    }

    changeRange(parameters);
  };

  removeParameter = param => {
    const { changeRange } = this.props;
    const parameters = this.props.parameters || [];
    const newparam = parameters.filter(p => p.code !== param.code);
    changeRange(newparam);
  };

  checkAll(checkAll, param) {
    let newValue = [];
    if (!checkAll) {
      newValue = this.props.valueRange;
    }
    this.setState({ selectedValue: newValue });
    const newParam = { ...param, selectedValue: newValue };
    const parameters = this.props.parameters || [];
    let foundIndex = parameters.findIndex(p => p.code == param.code);
    if (foundIndex >= 0) {
      parameters[foundIndex] = newParam;
    } else {
      parameters.push(newParam);
    }

    this.setState({ checkAll: !this.state.checkAll });
  }

  render() {
    const { paramName, valueRange, param } = this.props;
    const { selectedValue, checkAll } = this.state;
    return (
      <div className="value-range-content">
        <div className="slider-detail">
          <div className="text-left">
            <div className="checkbox">
              <input
                id="checkbox"
                type="checkbox"
                checked={checkAll}
                onChange={() => this.checkAll(checkAll, param)}
                style={{ width: '100px', cursor: 'pointer' }}
              />
              <label
                htmlFor="checkbox"
                style={{ width: '300px', height: '20px' }}
              >
                <span className="text-white" />
                {paramName}
              </label>
            </div>
          </div>
          <div className="text-right">
            {' '}
            <span>
              {selectedValue &&
                selectedValue.map((value, index) => {
                  return index === selectedValue.length - 1 ? (
                    <span key={index}>{`${value} `}</span>
                  ) : (
                    <span key={index}>{value} - </span>
                  );
                })}
            </span>
            <i
              className="icon-cancel text-pointer"
              onClick={() => this.removeParameter(param)}
            />
          </div>
        </div>
        <div className="range-value">
          {valueRange.map((value, index) => {
            return (
              <label className="check-radio" key={index}>
                <label key={index} className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedValue.includes(value)}
                    onChange={() => this.handleClick(value, param)}
                  />
                  <span className="checkbox__icon" />
                </label>
                <span className="text-content">{value}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

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
)(ValueRange);
