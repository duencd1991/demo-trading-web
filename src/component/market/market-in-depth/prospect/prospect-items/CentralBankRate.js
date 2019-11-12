import React, { Component } from 'react';
import moment from 'moment';
import { getColor } from '../helper';
import { formatTextFloat } from '../../../../helpers/Text';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import Status from './Status';

class CentralBankRate extends Component {
  getTimeRange = () => {
    const { data } = this.props;

    return `(${moment(data.previousPublicDate).format('l')} - ${moment(data.publicDate).format('l')})`;
  };

  render() {
    let { data, className } = this.props;
    const i18nKey = 'marketInDepthProspect.prospectItem';
    const name = I18n.t(`${i18nKey}.centralBankRate`);
    className = [className, 'prospect-item flip-container vertical'].join(' ');

    return (
      <div className={className} style={{
        backgroundColor: getColor(data.exchangeRate - data.previousExchangeRate),
      }}>
        <div className="flipper">
          <div className="prospect-no-hover front">
            <div className="prospect-item__title">
              <span>{name}</span>
            </div>

            <div className="prospect-item__content">
              <Status value={data.exchangeRate - data.previousExchangeRate} />
            </div>

          </div>

          <div className="prospect-item-hover back">

            <div className="prospect-item__title">
              <span>{name}</span>
              <span className="ml-5 time-range">{this.getTimeRange()}</span>
            </div>

            <div className="prospect-item__content">
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.ExchangeRate`)}</span>
                <strong>{formatTextFloat(data.exchangeRate)}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.PreviousExchangeRate`)}</span>
                <strong>{formatTextFloat(data.previousExchangeRate)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(CentralBankRate);
