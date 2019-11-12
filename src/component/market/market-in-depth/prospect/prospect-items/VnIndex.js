import React, { Component } from 'react';
import { formatPercent, formatTextFloat, formatValue } from '../../../../helpers/Text';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { getColor, getTimeRange } from '../helper';
import Status from './Status';

class VnIndex extends Component {
  render() {
    let { data, className, dailyDate } = this.props;
    const i18nKey = 'marketInDepthProspect.prospectItem';
    const prospectName = I18n.t(`${i18nKey}.vnIndex`);

    className = [className, 'prospect-item flip-container vertical'].join(' ');

    return (
      <div className={className} style={{
        backgroundColor: getColor(data.indexChange),
      }}>
        <div className="flipper">
          <div className="prospect-no-hover front">
            {/* Name */}
            <div className="prospect-item__title">
              <span>{prospectName}</span>
            </div>
            <Status value={data.indexChange} />
          </div>

          <div className="prospect-item-hover back">
            <div className="prospect-item__title">
              <span>{prospectName}</span>
              <span className="ml-5 time-range">{getTimeRange(dailyDate, data)}</span>
            </div>

            <div className="prospect-item__content">
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.IndexValue`)}</span>
                <strong>{formatTextFloat(data.indexValue)}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.IndexChange`)}</span>
                <strong>{formatTextFloat(data.indexChange)}</strong>
              </div>
              <div className="prospect-item__row">
                <span className="label">{I18n.t(`${i18nKey}.PercentIndexChange`)}</span>
                <strong>{formatTextFloat(formatPercent(data.percentIndexChange))}%</strong>
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

export default connect(mapStateToProps)(VnIndex);
