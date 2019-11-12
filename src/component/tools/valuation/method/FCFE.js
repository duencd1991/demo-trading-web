import React, { Component } from 'react';
import Const from './Const';
import iconInfo from './icon.png';
import { connect } from 'react-redux';
import { changeYearDropdow, REDUCER_NAME } from './../reducer';
import { DropDown } from '../../../common/dropdown';
//import Const from './../Const';
import { formatTextFloat } from '../../../helpers/Text';
import './index.scss';
import { I18n } from 'react-redux-i18n';
const iconWanning = require('./orange-warning-icon-3.png');

class FCFE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      estimateStockPrice: '',
      costOfEquity: 13,
      infoError: '',
      code: 'HPG',

      g1: '',
      g2: '',

      g1IsValidate: true,
      g2IsValidate: true,
      g1Error: '',
      g2Error: '',
    };
    this.validateG1 = this.validateFCFE.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps : ', nextProps);
    if (nextProps.currentSearch.code !== this.state.code) {
      this.setState({ code: nextProps.currentSearch.code });
      //call api valuation tool here
    }
  }

  changeCostOfEquity = value => {
    this.setState({ costOfEquity: value });
  };

  validateFCFE = (growthRateFCFEg1, growthRateFCFEg2, costOfEquity) => {
    let infoError = '';
    if (growthRateFCFEg1.length <= 0 || growthRateFCFEg1 == 0) {
      infoError = 'valuation.errorFCFE.g1Error';
      this.setState({ infoError, estimateStockPrice: '' });
    } else if (growthRateFCFEg2.length <= 0 || growthRateFCFEg2 == 0) {
      infoError = 'valuation.errorFCFE.g2Error';
      this.setState({ infoError, estimateStockPrice: '' });
    } else if (costOfEquity.length <= 0 || costOfEquity == 0) {
      infoError = 'valuation.errorFCFE.costOfEquityError';
      this.setState({ infoError, estimateStockPrice: '' });
    } else {
      if (growthRateFCFEg2 === costOfEquity) {
        infoError = 'valuation.errorFCFE.g2ErrorSameNumber';
        this.setState({ infoError, estimateStockPrice: '' });
      } else {
        this.setState({ infoError: '' });
      }
    }
    return infoError;
  };

  clickButtonCalculate = () => {
    const { yearDropDow } = this.props;
    const g1 = this.growthRateFCFEg1.value; //(%)
    const g2 = this.growthRateFCFEg2.value; //(%)
    const fcfe = this.fcfe.value; //Bn VND
    const costOfEquity = this.costOfEquity.value; //(%)
    const share = 20000000;
    const year = Const.listYearByKey[yearDropDow].value;

    //TODO: check validation
    let infoError = this.validateFCFE(g1, g2, costOfEquity);
    if (infoError !== '') {
      return;
    }

    // calculate FEFE for each year
    let sumPvFcff = 0;
    for (let i = 1; i <= year; i++) {
      const temp =
        (fcfe * Math.pow(1 + g1 / 100, i)) /
        Math.pow(1 + costOfEquity / 100, i);
      sumPvFcff += temp;
    }
    // console.log(PV_FCFF_Array);

    // calculate terminal value
    const terminalValue =
      (fcfe * Math.pow(1 + g1 / 100, year) * (1 + g2 / 100)) /
      (((costOfEquity - g2) / 100) * Math.pow(1 + costOfEquity / 100, year));
    // console.log('terminal value: ', terminalValue);

    const fcffValuation = terminalValue + sumPvFcff;
    // console.log('sum: ', terminalValue+sum_PV_FCFF_Array);

    let estimateStockPrice = (fcffValuation * 1000000000) / share;
    let formatEstimateStockPrice = formatTextFloat(estimateStockPrice).slice(
      0,
      -3,
    );

    this.setState({
      isClick: !this.state.isClick,
      estimateStockPrice: formatEstimateStockPrice,
    });
  };

  handleInput(e, refInput) {
    let infoError = '';
    if (e.target.value.length > 1) {
      for (let i = 0; i < e.target.value.length; i++) {
        let character = e.target.value.charAt(i);
        if (character.match(/^[a-zA-Z]+$/)) {
          console.log('Error : Only input number');
          if (refInput === this.growthRateFCFEg1) {
            this.setState({
              ...this.state,
              g1IsValidate: false,
              g1Error: 'Only input number',
              g1: e.target.value,
              estimateStockPrice: '',
              infoError,
            });
          } else {
            this.setState({
              ...this.state,
              g2IsValidate: false,
              g2Error: 'Only input number',
              g2: e.target.value,
              estimateStockPrice: '',
              infoError,
            });
          }
          return;
        }
      }
    }
    if (e.target.value.match(/^[a-zA-Z]+$/)) {
      console.log('Error : Only input number');
      if (refInput === this.growthRateFCFEg1) {
        this.setState({
          ...this.state,
          g1IsValidate: false,
          g1Error: 'Only input number',
          g1: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      } else {
        this.setState({
          ...this.state,
          g2IsValidate: false,
          g2Error: 'Only input number',
          g2: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      }
      return;
    }
    if (e.target.value.length > 8) {
      console.log('Error : Cannot enter more than eight numbers');
      if (refInput === this.growthRateFCFEg1) {
        this.setState({
          g1IsValidate: false,
          g1Error: 'Cannot enter more than eight numbers',
          g1: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      } else {
        this.setState({
          g2IsValidate: false,
          g2Error: 'Cannot enter more than eight numbers',
          g2: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      }
      return;
    }
    if (e.target.value.includes('-')) {
      console.log('Error : Cannot enter "-" charactext');
      if (refInput === this.growthRateFCFEg1) {
        this.setState({
          g1IsValidate: false,
          g1Error: 'Cannot enter "-" charactext',
          g1: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      } else {
        this.setState({
          g2IsValidate: false,
          g2Error: 'Cannot enter "-" charactext',
          g2: e.target.value,
          estimateStockPrice: '',
          infoError,
        });
      }
      return;
    }
    if (refInput === this.growthRateFCFEg1) {
      this.setState({ g1IsValidate: true, g1Error: '', g1: e.target.value });
    } else {
      this.setState({ g2IsValidate: true, g2Error: '', g2: e.target.value });
    }
  }

  render() {
    const { yearDropDow, changeYearDropdow, component, width } = this.props;
    const { infoError, g1IsValidate, g2IsValidate } = this.state;
    const method = I18n.t('valuation.method');
    const resultTitle = I18n.t('valuation.resultTitle');
    const buttonCalculate = I18n.t('valuation.buttonCalculate');
    const numOneFirstFCFE = I18n.t('valuation.methodFCFE.numOneFirst');
    const numOneLastFCFE = I18n.t('valuation.methodFCFE.numOneLast');
    const numTwoFirstFCFE = I18n.t('valuation.methodFCFE.numTwoFirst');
    const numTwoMidFCFE = I18n.t('valuation.methodFCFE.numTwoMid');
    const numTwoLastFCFE = I18n.t('valuation.methodFCFE.numTwoLast');
    const numThreeFirst = I18n.t('valuation.methodFCFE.numThreeFirst');
    const numThreeLast = I18n.t('valuation.methodFCFE.numThreeLast');
    const numFour = I18n.t('valuation.methodFCFE.numFour');
    const numOneFirstResultFCFE = I18n.t('valuation.resultFCFE.numOneFirst');
    const numOneLastResultFCFE = I18n.t('valuation.resultFCFE.numOneLast');

    let styleButton = {
      background: '#1d97ef',
    };
    if (!g1IsValidate || !g2IsValidate) {
      styleButton = {
        background: 'gray',
        cursor: 'not-allowed',
      };
    }

    return (
      <div className="valuation-tool-caculate-screen">
        <div className="right-method">
          <div className="first-div-right">
            <a className="title-method">{method} : </a>
            <a>FCFE</a>
            {/* <img src={iconInfo} style={{ width: 15, height: 15 }} /> */}
            <i
              style={{ opacity: 0.6, paddingLeft: 5, paddingRight: 5 }}
              className="icon-info fs-6"
            />
            <div className="recommended-box">RECOMMENDED</div>
          </div>

          <div className="after-div-right">
            <a>{numOneFirstFCFE}</a>
            <input
              className="input-method"
              disabled
              value="200"
              ref={input => {
                this.fcfe = input;
              }}
            />
            <a>{numOneLastFCFE}</a>
          </div>

          <div className="after-div-right" style={{ marginTop: -6 }}>
            <a>{numTwoFirstFCFE}</a>
            <div>
              <input
                className="input-method"
                type="text"
                defaultValue=""
                ref={input => (this.growthRateFCFEg1 = input)}
                value={this.state.g1}
                onChange={e => this.handleInput(e, this.growthRateFCFEg1)}
              />
              {!this.state.g1IsValidate ? (
                <div className="wanning-field-wrap">
                  <div className="position-relative point-wanning">
                    <img src={iconWanning} />
                    <span style={{ marginLeft: 5 }}>{this.state.g1Error}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <a>{numTwoMidFCFE}</a>
            <div className="line-drop-valuation-tool">
              <DropDown
                keyTitle="value"
                listKey={Const.listYear}
                listDataByKey={Const.listYearByKey}
                currentKey={yearDropDow}
                change={changeYearDropdow}
                isEditable={false}
              />
            </div>
            <a>{numTwoLastFCFE}</a>
          </div>

          <div className="after-div-right" style={{ marginTop: -6 }}>
            <a>{numThreeFirst}</a>
            <input
              className="input-method"
              type="text"
              defaultValue=""
              ref={input => (this.growthRateFCFEg2 = input)}
              value={this.state.g2}
              onChange={e => this.handleInput(e, this.growthRateFCFEg2)}
            />
            <a>{numThreeLast}</a>
          </div>

          <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numFour}</a>
            <input
              className="input-method"
              type="number"
              value={this.state.costOfEquity}
              onChange={e => this.changeCostOfEquity(e.target.value)}
              ref={input => (this.costOfEquity = input)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.costOfEquity.select()}
            />
            <a>{`%`}</a>
          </div>
        </div>

        <div className="left-group">
          <div className="middle-button">
            <button
              disabled={!g1IsValidate || !g2IsValidate}
              style={styleButton}
              className="valuation-tool-button"
              onClick={this.clickButtonCalculate}
            >
              {buttonCalculate}
            </button>
          </div>

          <div className="left-result">
            <div className="error-info">{I18n.t(infoError)}</div>
            <div className="wrap-result">
              <a className="result-title">{resultTitle}</a>
              <div className="line-under-title" />
              <div style={{ marginTop: 10 }}>
                <a>{numOneFirstResultFCFE}</a>
                <input
                  className="input-method"
                  value={this.state.estimateStockPrice}
                  defaultValue=""
                  disabled
                />
                <a>{numOneLastResultFCFE}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    yearDropDow: state[REDUCER_NAME].yearDropDow,
    component: state[REDUCER_NAME].component,
    currentSearch: state[REDUCER_NAME].currentSearch,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeYearDropdow: year => dispatch(changeYearDropdow(year)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FCFE);
