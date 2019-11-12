import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import ScrollComponent from '../../../common/ScrollComponent';
import Const from '../Const';
import {
  changeRange,
  getScreenerParameter,
  REDUCER_NAME,
  changeCriteria,
} from '../reducer';
import ParameterDetail from './ParameterDetail';

class ScreenerParameter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 3,
      activeIndex: 0,
      listArrayCode: [],
      listApplyParameters: {},
    };

    this.paramRef = React.createRef();
  }

  componentDidMount() {
    const { getScreenerParameter } = this.props;
    getScreenerParameter();
  }

  changeGroup = index => {
    this.setState({ activeIndex: index });
    const { changeCriteria, listParam } = this.props;
    const criteria = listParam[index].code;
    changeCriteria(criteria);
  };

  getName = item => item.name;

  getParameters = () => {
    const { activeIndex } = this.state;
    const { listParam } = this.props;
    if (!Array.isArray(listParam)) {
      return [];
    }

    return listParam[activeIndex].parameters;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.listArrayCode.length >= prevState.listArrayCode.length) {
      this.paramRef.current.scrollToBottom();
    } else {
      this.paramRef.current.scrollToTop();
    }
    const { getScreenerParameter } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      getScreenerParameter();
    }
  }

  changeParamCode = param => {
    let selectedValue = param.valueRange;
    if (param.type === Const.paramType.BOOLEAN) {
      selectedValue = [false];
    }
    if (param.type === Const.paramType.VALUE) {
      selectedValue = [];
    }
    if (param.type === Const.paramType.RANGE) {
      selectedValue = param.valueRange;
    }
    const newParam = { ...param, selectedValue: selectedValue };

    const { listArrayCode } = this.state;
    const { changeRange } = this.props;
    const isCodeExist = listArrayCode.some(c => c.code === newParam.code);
    const selectedCode = isCodeExist ? null : param.code;
    const newCodes = isCodeExist
      ? listArrayCode.filter(c => c.code !== newParam.code)
      : listArrayCode.concat(newParam);
    this.setState({
      selectedCode,
      listArrayCode: newCodes,
    });
    changeRange(newCodes);
  };

  onInputChange = (value, param) => {
    const { changeRange } = this.props;
    const { listArrayCode } = this.state;
    let newParam = { ...param };
    if (param.type === Const.paramType.BOOLEAN) {
      newParam = { ...param, selectedValue: [value] };
    }
    if (param.type === Const.paramType.RANGE) {
      newParam = { ...param, selectedValue: value };
    }
    let foundIndex = listArrayCode.findIndex(p => p.code == param.code);
    if (foundIndex >= 0) {
      listArrayCode[foundIndex] = newParam;
    } else {
      listArrayCode.push(newParam);
    }
    changeRange(listArrayCode);
  };

  componentWillReceiveProps(nextProps) {
    const { parameters = [], criteria } = nextProps;
    const { listParam } = this.props;
    if (!Array.isArray(listParam)) {
      return;
    }
    const activeIndex = this.getActiveIndex(criteria);
    this.setState({
      activeIndex,
      listArrayCode: parameters,
    });
  }

  getActiveIndex(criteria) {
    const { listParam } = this.props;
    const activeIndex = listParam.findIndex(p => p.code === criteria);
    return activeIndex > -1 ? activeIndex : 0;
  }

  isCodeActive = code => {
    const { listArrayCode } = this.state;
    return listArrayCode.some(c => c.code === code);
  };

  getSelectedValue = param => {
    if (this.isCodeActive(param.code)) {
      const { listArrayCode } = this.state;
      const paramCode = listArrayCode.filter(p => p.code === param.code).pop();
      return paramCode.selectedValue || [];
    }
  };

  renderFilter = () => {
    const { activeIndex } = this.state;
    const { listParam } = this.props;
    return (
      <div className="row-left scroll-item">
        <ScrollComponent>
          {listParam &&
            listParam.map((item, index) => {
              const className = index === activeIndex ? 'group-active' : '';
              return (
                <div
                  className={className + ' text-pointer'}
                  onClick={() => this.changeGroup(index)}
                  key={index}
                >
                  <span className="pl-10">{this.getName(item)}</span>
                </div>
              );
            })}
        </ScrollComponent>
      </div>
    );
  };

  render() {
    const { listArrayCode } = this.state;
    return (
      <div className="criteria-table pt-10">
        <div className="criteria-item mr-10">
          <div className="criteria-head">
            {I18n.t('stockScreener.screenerMessage.addCriteria')}
          </div>
          <div className="criteria-row">
            {this.renderFilter()}
            <div className="row-right scroll-item">
              <ScrollComponent>
                <div className="pl-10">
                  {this.getParameters().map(
                    (param, index) =>
                      param.valueRange.length > 0 && (
                        <div
                          className="text-pointer"
                          onClick={() => this.changeParamCode(param)}
                          key={index}
                        >
                          <span className="text-pointer">
                            {this.getName(param)}
                          </span>
                          {this.isCodeActive(param.code) && (
                            <span className="text-s-color-5 fs-16 float-right mr-10">
                              <i className="icon-correct" />
                            </span>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </ScrollComponent>
            </div>
          </div>
        </div>

        <ParameterDetail
          paramRef={this.paramRef}
          onCheckboxChange={this.onCheckboxChange}
          onInputChange={this.onInputChange}
          listParam={this.props.listParam}
          parameters={this.getParameters()}
          getSelectedValue={this.getSelectedValue}
          listArrayCode={listArrayCode}
          isCodeActive={this.isCodeActive}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    listParam: state[REDUCER_NAME].listParam,
    locale: state.i18n.locale,
    parameters: state[REDUCER_NAME].parameters,
    criteria: state[REDUCER_NAME].criteria,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeRange: parameters => dispatch(changeRange(parameters)),
    getScreenerParameter: () => dispatch(getScreenerParameter()),
    changeCriteria: criteria => dispatch(changeCriteria(criteria)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenerParameter);
