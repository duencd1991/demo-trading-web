import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import { formatTextFloat } from '../../../helpers/Text';
import { connect } from 'react-redux';
import './index.scss';

class PB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eoyStockPrice: '',
      ennOfNextYearStockPrice: '',
      estimateBookValuedEOY: 2000,
      bookValueForecast: 3000,
      pbMultiple: 4000,
      infoError: '',
    };
    this.calculatePB.bind(this);
  }

  changeEstimateBookValuedEOY(value) {
    this.setState({ estimateBookValuedEOY: value });
  }
  changeBookValueForecast(value) {
    this.setState({ bookValueForecast: value });
  }

  changePbMultiple(value) {
    this.setState({ pbMultiple: value });
  }

  validatePB(estimateBookValuedEOY, bookValueForecast, pbMultiple) {
    let infoError = '';
    if (estimateBookValuedEOY.length <= 0 || estimateBookValuedEOY == 0) {
      infoError = 'valuation.errorPB.estimateBookValuedEOYError';
      this.setState({
        infoError,
        eoyStockPrice: '',
        ennOfNextYearStockPrice: '',
      });
    } else if (bookValueForecast.length <= 0 || bookValueForecast == 0) {
      infoError = 'valuation.errorPB.bookValueForecastError';
      this.setState({
        infoError,
        eoyStockPrice: '',
        ennOfNextYearStockPrice: '',
      });
    } else if (pbMultiple.length <= 0 || pbMultiple == 0) {
      infoError = 'valuation.errorPB.pbMultiple';
      this.setState({
        infoError,
        eoyStockPrice: '',
        ennOfNextYearStockPrice: '',
      });
    } else {
      this.setState({ infoError: '' });
    }
    return infoError;
  }

  calculatePB() {
    const currentBookValue = this.currentBookValue.value;
    const estimateBookValuedEOY = this.estimateBookValuedEOY.value;
    const bookValueForecast = this.bookValueForecast.value;
    const pbMultiple = this.pbMultiple.value;

    let infoError = this.validatePB(
      estimateBookValuedEOY,
      bookValueForecast,
      pbMultiple,
    );
    if (infoError !== '') {
      return;
    }

    const eoyStockPrice = pbMultiple * estimateBookValuedEOY;
    const ennOfNextYearStockPrice = pbMultiple * bookValueForecast;
    this.setState({
      eoyStockPrice: formatTextFloat(eoyStockPrice).slice(0, -3),
      ennOfNextYearStockPrice: formatTextFloat(ennOfNextYearStockPrice).slice(
        0,
        -3,
      ),
    });
  }

  render() {
    const { infoError } = this.state;
    const buttonCalculate = I18n.t('valuation.buttonCalculate');
    const method = I18n.t('valuation.method');
    const resultTitle = I18n.t('valuation.resultTitle');
    const numOnePB = I18n.t('valuation.methodPB.numOne');
    const numTwoFirstPB = I18n.t('valuation.methodPB.numTwoFirst');
    const numTwoLastPB = I18n.t('valuation.methodPB.numTwoLast');
    const numThreeFirstPB = I18n.t('valuation.methodPB.numThreeFirst');
    const numThreeLastPB = I18n.t('valuation.methodPB.numThreeLast');
    const numFourPB = I18n.t('valuation.methodPB.numFour');
    const numOneFirstResultPB = I18n.t('valuation.resultPB.numOneFirst');
    const numOneLastResultPB = I18n.t('valuation.resultPB.numOneLast');
    const numTwoFirstResultPB = I18n.t('valuation.resultPB.numTwoFirst');
    const numTwoLastResultPB = I18n.t('valuation.resultPB.numTwoLast');

    return (
      <div className="valuation-tool-caculate-screen">
        <div className="right-method">
          <div className="first-div-right">
            <a className="title-method">{method}: </a>
            <a>P/B</a>
            <i
              style={{ opacity: 0.6, paddingLeft: 5, paddingRight: 5 }}
              className="icon-info fs-6"
            />
            <div className="recommended-box" style={{ display: 'none' }}>
              RECOMMENDED
            </div>
          </div>

          <div className="after-div-right">
            <a>{numOnePB}</a>
            <input
              className="input-method"
              disabled
              value="1000"
              ref={input => {
                this.currentBookValue = input;
              }}
            />
          </div>

          <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numTwoFirstPB}</a>
            <input
              className="input-method"
              value={this.state.estimateBookValuedEOY}
              onChange={e => this.changeEstimateBookValuedEOY(e.target.value)}
              ref={input => (this.estimateBookValuedEOY = input)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.estimateBookValuedEOY.select()}
            />
            <a>{numTwoLastPB}</a>
          </div>

          <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numThreeFirstPB}</a>
            <input
              className="input-method"
              ref={input => (this.bookValueForecast = input)}
              value={this.state.bookValueForecast}
              onChange={e => this.changeBookValueForecast(e.target.value)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.bookValueForecast.select()}
            />
            <a>{numThreeLastPB}</a>
          </div>

          <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numFourPB}</a>
            <input
              className="input-method"
              value={this.state.pbMultiple}
              onChange={e => this.changePbMultiple(e.target.value)}
              ref={input => (this.pbMultiple = input)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.pbMultiple.select()}
            />
          </div>
        </div>

        <div className="left-group">
          <div className="middle-button">
            <button
              className="valuation-tool-button"
              onClick={() => this.calculatePB()}
            >
              {buttonCalculate}
            </button>
          </div>

          <div className="left-result-langer-wrap">
            <div className="error-info">{I18n.t(infoError)}</div>
            <div className="wrap-result-long">
              <a className="result-title">{resultTitle}</a>
              <div className="line-under-title" />
              <div style={{ marginTop: 10 }}>
                <a>{numOneFirstResultPB}</a>
                <input
                  className="input-method"
                  value={this.state.eoyStockPrice}
                  disabled
                />
                <a>{numOneLastResultPB}</a>
              </div>
              <div style={{ marginTop: 10 }}>
                <a>{numTwoFirstResultPB}</a>
                <input
                  className="input-method"
                  value={this.state.ennOfNextYearStockPrice}
                  disabled
                />
                <a>{numTwoLastResultPB}</a>
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
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(PB);
