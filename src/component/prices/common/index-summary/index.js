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
      data: { MatchPrice, PriceChange, PercentPriceChange, ReferencePrice },
      isDerivatives,
      keyToCompare,
      isIndex,
    } = this.props;

    const matchPrice = !isNaN(MatchPrice / 1000)
      ? (isDerivatives || isIndex ? MatchPrice : formatPrice(MatchPrice))
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
      <TextBlinkCustom compareKey={keyToCompare} data={this.props.data}>
        <div className={`summary-info-wrapper-price`}>
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
              {isIndex
                ? formatTextFloat(PriceChange)
                : formatTextFloat(formatPrice(PriceChange))}
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
  data: {
    MatchPrice: 0,
    PriceChange: 0,
    PercentPriceChange: 0,
    ReferencePrice: 0,
  },
  isDerivatives: false,
  keyToCompare: 'tradingDate',
  isIndex: false,
};

export default indexSummary;
