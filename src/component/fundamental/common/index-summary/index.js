import React from 'react';
import './index.scss';
import {
  formatTextFloat,
  formatPercent,
  formatPrice,
} from '../../../helpers/Text';
import TextBlinkCustom from '../../../common/text-blink-custom';
import {
  getColorPrice,
  getIconPriceFollowReferencePrice,
} from './../../../helpers/Color';

class indexSummary extends React.Component {
  render() {
    const {
      topContent: {
        MatchPrice,
        PriceChange,
        PercentPriceChange,
        ReferencePrice,
      },
      keyToCompare,
    } = this.props;
    const matchPrice = !isNaN(MatchPrice / 1000)
      ? (MatchPrice / 1000)
          .toFixed(2)
          .toString()
          .split('.')
      : '--.--';

    const classNameColor = getColorPrice(MatchPrice, ReferencePrice);
    const classNameIcon = getIconPriceFollowReferencePrice(
      MatchPrice,
      ReferencePrice,
    );

    return (
      <TextBlinkCustom data={this.props.data} compareKey={keyToCompare}>
        <div className={`summary-info-wrapper justify-content-start`}>
          <div className="left-container">
            <div className={`main-price ${classNameColor}`}>
              {`${matchPrice[0]}`}
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div className={`sub-price ${classNameColor}`}>
                {`. ${matchPrice[1] || '00'}`}
              </div>
              <div className="currency">VND</div>
            </div>
          </div>
          <div className="right-container d-flex flex-column">
            <div className={`sub-price ${classNameColor}`}>
              {`${formatTextFloat(formatPrice(PriceChange))}`}
            </div>
            <div className="percent d-flex">
              <i className={`${classNameColor} ${classNameIcon} fs-10 mr-1`} />
              {`${formatTextFloat(formatPercent(PercentPriceChange))}%`}
            </div>
          </div>
        </div>
      </TextBlinkCustom>
    );
  }
}

indexSummary.defaultProps = {
  topContent: {
    MATCH_PRICE: 0,
    PRICE_CHANGE: 0,
    PERCENT_PRICE_CHANGE: 0,
    REFERENCE_PRICE: 0,
  },
  keyToCompare: 'tradingDate',
};

export default indexSummary;
