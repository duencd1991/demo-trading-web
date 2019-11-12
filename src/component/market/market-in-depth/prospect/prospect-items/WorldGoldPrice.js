import React, { Component } from 'react';
import { formatPercent, formatTextFloat } from '../../../../helpers/Text';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { getColor, getTimeRange } from '../helper';
import Status from './Status';

class WorldGoldPrice extends Component {
  render() {
    let { data, className, dailyDate } = this.props;
    const i18nKey = 'marketInDepthProspect.prospectItem';
    const name = I18n.t(`${i18nKey}.worldGoldPrice`);
    className = [className, 'prospect-item flip-container vertical'].join(' ');

    return (

      <div className={className} style={{
        backgroundColor: getColor(data.buyPriceChange),
      }}>
        <div className="flipper">
          <div className="prospect-no-hover front">
            <div className="prospect-item__title">
              <span>{name}</span>
            </div>

            <div className="prospect-item__content">
              <Status value={data.buyPriceChange} />
            </div>
          </div>

          <div className="prospect-item-hover back">
            <div className="prospect-item__title">
              <span>{name}</span>
              <span className="ml-5 time-range">{getTimeRange(dailyDate, data)}</span>
            </div>
            <div className="prospect-item__content">
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.Price`)}</span>
                <strong>{formatTextFloat(data.buyPrice)}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.PriceChange`)}</span>
                <strong>{formatTextFloat(data.buyPriceChange)}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.PercentPriceChange`)}</span>
                <strong>{formatTextFloat(formatPercent(data.percentBuyPriceChange))}%</strong>
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

export default connect(mapStateToProps)(WorldGoldPrice);
