import React, { Component } from 'react';
import { formatTextFloat, formatValue } from '../../../../helpers/Text';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { getColor, getTimeRange } from '../helper';
import Status from './Status';

class ForeignFlow extends Component {
  render() {
    let { data, className, dailyDate } = this.props;
    const i18nKey = 'marketInDepthProspect.prospectItem';
    const prospectName = I18n.t(`${i18nKey}.foreignFlow`);
    className = [className, 'prospect-item flip-container vertical'].join(' ');

    return (
      <div className={className} style={{
        backgroundColor: getColor(data.foreignBuyValueMatched - data.foreignSellValueMatched),
      }}>
        <div className="flipper">
          <div className="prospect-no-hover front">
            {/* Name */}
            <div className="prospect-item__title">
              <span>{prospectName}</span>
            </div>

            {/* UP-DOWN */}
            <div className="prospect-item__content">
              <Status value={data.foreignBuyValueMatched - data.foreignSellValueMatched} />
            </div>

          </div>

          {/* HOVER ITEM */}
          <div className="prospect-item-hover back">
            <div className="prospect-item__title">
              <span>{prospectName}</span>
              <span className="ml-5 time-range">{getTimeRange(dailyDate, data)}</span>
            </div>

            <div className="prospect-item__content">
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.ForeignBuyValueMatched`)}</span>
                <strong>{formatTextFloat(formatValue(data.foreignBuyValueMatched))}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.ForeignSellValueMatched`)}</span>
                <strong>{formatTextFloat(formatValue(data.foreignSellValueMatched))}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.NetForeign`)}</span>
                <strong>{formatTextFloat(formatValue(data.foreignBuyValueMatched - data.foreignSellValueMatched))}</strong>
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

export default connect(mapStateToProps)(ForeignFlow);
