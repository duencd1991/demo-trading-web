import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatChange, formatPercent, formatTextFloat } from '../../../../helpers/Text';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { getColor } from '../helper';
import Status from './Status';

class Market extends Component {
  getTimeRange = () => {
    const { dailyDate: endDate, data } = this.props;
    const startDate = moment(data[0].tradingDate).format('l');

    return `(${startDate} - ${endDate})`;
  };

  getValue = () => {
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return 0;
    }

    return data.reduce((total, item) => {
      return total + item.indexChange > 0 ? 1 : -1;
    }, 0);
  };

  getClassName = (value) => {
    return value > 0 ? 'text-increase index-change' : 'text-decrease index-change';
  };

  render() {
    let { data, className, marketName } = this.props;
    const i18nKey = 'marketInDepthProspect.prospectItem';
    const prospectName = I18n.t(`${i18nKey}.${marketName}`);
    className = [className, 'prospect-item flip-container vertical'].join(' ');
    const value = this.getValue();
    return (
      <div className={className} style={{
        backgroundColor: getColor(value),
      }}>
        <div className="flipper">
          <div className="prospect-no-hover front">
            {/* Name */}
            <div className="prospect-item__title">
              <span>{prospectName}</span>
            </div>

            <Status value={value} />
          </div>

          <div className="prospect-item-hover back">
            <div className="prospect-item__title">
              <span>{prospectName}</span>
              <span className="ml-5 time-range">{this.getTimeRange()}</span>
            </div>

            <div className="prospect-item__content">
              {data.map(item => (
                <div key={item.worldIndexCode} className="prospect-item__row">
                  <span className="label">{item.worldIndexCode}</span>
                  <strong>
                    {`${formatTextFloat(item.indexValue)} `}
                    <span className={this.getClassName(item.indexChange)}>
                      ({`${formatChange(formatTextFloat(item.indexChange))} ~ ${formatTextFloat(formatPercent(item.percentIndexChange))}%`})
                    </span>
                  </strong>
                </div>
              ))}
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

Market.defaultProps = {
  marketName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Market);
