import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import { formatTextFloat } from '../../../helpers/Text';
import Icon2 from './icon/icon-pen-2';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './../reducer';
import './index.scss';

class PE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: true,
      eoyStockPrice: '',
      ennOfNextYearStockPrice: '',
      estimatedEOY: 2000,
      epsForecast: 3000,
      infoError: '',
    };
    this.calculatePE.bind(this);
    this.estimatedEOY = React.createRef();
    this.epsForecast = React.createRef();
    this.currentEPS = React.createRef();
  }

  changeEstimatedEOY = value => {
    this.setState({ estimatedEOY: value });
  };

  changeEpsForecast = value => {
    this.setState({ epsForecast: value });
  };

  validatePE(estimatedEOY, epsForecast, peMultiple) {
    let infoError = '';
    if (estimatedEOY.length <= 0 || estimatedEOY == 0) {
      infoError = 'valuation.errorPE.estimatedEOYError';
      this.setState({
        infoError,
        eoyStockPrice: '',
        ennOfNextYearStockPrice: '',
      });
    } else if (epsForecast.length <= 0 || epsForecast == 0) {
      infoError = 'valuation.errorPE.epsForecastError';
      this.setState({
        infoError,
        eoyStockPrice: '',
        ennOfNextYearStockPrice: '',
      });
    } else if (peMultiple === null) {
      infoError = 'valuation.errorPE.peMultipleError';
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

  calculatePE = () => {
    const { averagePE } = this.props;

    const currentEPS = this.currentEPS.current.value;
    const estimatedEOY = this.estimatedEOY.current.value;
    const epsForecast = this.epsForecast.current.value;
    const peMultiple = averagePE;

    let infoError = this.validatePE(estimatedEOY, epsForecast, peMultiple);
    if (infoError !== '') {
      return;
    }

    const eoyStockPrice = peMultiple * estimatedEOY;
    const ennOfNextYearStockPrice = peMultiple * epsForecast;
    this.setState({
      eoyStockPrice: formatTextFloat(eoyStockPrice).slice(0, -3),
      ennOfNextYearStockPrice: formatTextFloat(ennOfNextYearStockPrice).slice(
        0,
        -3,
      ),
    });
  };

  renderRowInfoMethod = (
    textFirst,
    textLast,
    refInput,
    stateInput,
    funtionOnChange,
    isShowIconPopup = false,
  ) => {
    return (
      <div className="after-div-right" style={{ display: 'inherit' }}>
        <a>{textFirst}</a>
        {!isShowIconPopup ? (
          <>
            <input
              className="input-method"
              type="number"
              value={stateInput}
              onChange={e => funtionOnChange(e.target.value)}
              ref={refInput}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => refInput.current.select()}
            />
            <a>{textLast}</a>
          </>
        ) : (
          <>
            <input
              className="input-method"
              type="number"
              value={stateInput}
              disabled
            />
            <div style={{ position: 'relative' }}>
              <Icon2 />
            </div>
          </>
        )}
      </div>
    );
  };

  render() {
    const { averagePE } = this.props;
    const { infoError } = this.state;
    const buttonCalculate = I18n.t('valuation.buttonCalculate');
    const method = I18n.t('valuation.method');
    const resultTitle = I18n.t('valuation.resultTitle');
    const numOneFirstPE = I18n.t('valuation.methodPE.numOneFirst');
    const numOneLastPE = I18n.t('valuation.methodPE.numOneLast');
    const numTwoFirstPE = I18n.t('valuation.methodPE.numTwoFirst');
    const numTwoLastPE = I18n.t('valuation.methodPE.numbTwoLast');
    const numThreeFirstPE = I18n.t('valuation.methodPE.numThreeFirst');
    const numThreeLastPE = I18n.t('valuation.methodPE.numbThreeLast');
    const numFourPE = I18n.t('valuation.methodPE.numFour');
    const numOneFirstResultPE = I18n.t('valuation.resultPE.numOneFirst');
    const numOneLastResultPE = I18n.t('valuation.resultPE.numOneLast');
    const numTwoFirstResultPE = I18n.t('valuation.resultPE.numTwoFirst');
    const numTwoLastResultPE = I18n.t('valuation.resultPE.numTwoLast');

    return (
      <div className="valuation-tool-caculate-screen">
        <div className="right-method">
          <div className="first-div-right">
            <a className="title-method">{method}: </a>
            <a>P/E</a>
            <i
              style={{ opacity: 0.6, paddingLeft: 5, paddingRight: 5 }}
              className="icon-info fs-6"
            />
            <div className="recommended-box" style={{ display: 'none' }}>
              RECOMMENDED
            </div>
          </div>

          <div className="after-div-right">
            <a>{numOneFirstPE}</a>
            <input
              className="input-method"
              disabled
              value="1000"
              ref={this.currentEPS}
              //   // input => {
              //   // this.currentEPS = input;
              // }}
            />
            <a>{numOneLastPE}</a>
          </div>

          {/* <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numTwoFirstPE}</a>
            <input
              className="input-method"
              type="number"
              value={this.state.estimatedEOY}
              onChange={e => this.changeEstimatedEOY(e.target.value)}
              ref={input => (this.estimatedEOY = input)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.estimatedEOY.select()}
            />
            <a>{numTwoLastPE}</a>
          </div> */}
          {this.renderRowInfoMethod(
            numTwoFirstPE,
            numTwoLastPE,
            this.estimatedEOY,
            this.state.estimatedEOY,
            this.changeEstimatedEOY,
          )}
          {this.renderRowInfoMethod(
            numThreeFirstPE,
            numThreeLastPE,
            this.epsForecast,
            this.state.epsForecast,
            this.changeEpsForecast,
          )}
          {this.renderRowInfoMethod(
            numFourPE,
            null,
            null,
            averagePE === null ? '' : averagePE,
            null,
            true,
          )}

          {/* <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numThreeFirstPE}</a>
            <input
              className="input-method"
              type="number"
              value={this.state.epsForecast}
              onChange={e => this.changeEpsForecast(e.target.value)}
              ref={input => (this.epsForecast = input)}
            />
            <i
              className="icon-edit2 margin-icon"
              onClick={() => this.epsForecast.select()}
            />
            <a>{numThreeLastPE}</a>
          </div> */}

          {/* <div className="after-div-right" style={{ display: 'inherit' }}>
            <a>{numFourPE}</a>
            <input
              className="input-method"
              type="number"
              value={averagePE === null ? '' : averagePE}
              disabled
            />
            <div style={{ position: 'relative' }}>
              <Icon2 />
            </div>
          </div> */}
        </div>

        <div className="left-group">
          <div className="middle-button">
            <button
              className="valuation-tool-button"
              onClick={this.calculatePE}
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
                <a>{numOneFirstResultPE}</a>
                <input
                  className="input-method"
                  value={this.state.eoyStockPrice}
                  disabled
                />
                <a>{numOneLastResultPE}</a>
              </div>
              <div style={{ marginTop: 10 }}>
                <a>{numTwoFirstResultPE}</a>
                <input
                  className="input-method"
                  value={this.state.ennOfNextYearStockPrice}
                  disabled
                />
                <a>{numTwoLastResultPE}</a>
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
    averagePE: state[REDUCER_NAME].averagePE,
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(PE);
