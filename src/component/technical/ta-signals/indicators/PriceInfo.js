import React from 'react'
// import './index.scss'
import { formatTextFloat, formatPercent, val } from '../../../helpers/Text';
import TextBlinkCustom from '../../../common/text-blink-custom';


const RED = `#eb505a`
const GREEN = `#00de8b`
const YELLOW = `#facc5c`

class PriceInfo extends React.Component {
  getColor = (value, flag) => {
    if (value > flag) return GREEN
    if (value < flag) return RED
    return YELLOW
  }

  render() {
    const { indexData } = this.props;
    const MatchPrice = indexData === null ? 0 : indexData.matchPrice;
    const PriceChange = indexData === null ? 0 : indexData.priceChange;
    const PercentPriceChange = indexData === null ? 0 : indexData.percentPriceChange;
    const ReferencePrice = indexData === null ? 0 : indexData.referencePrice;

    const data = {
      MatchPrice: indexData === null ? 0 : indexData.matchPrice,
      PriceChange: indexData === null ? 0 : indexData.priceChange,
      PercentPriceChange: indexData === null ? 0 : indexData.percentPriceChange,
      ReferencePrice: indexData === null ? 0 : indexData.referencePrice,
      tradingDate: indexData === null ? '' : indexData.tradingDate,
    }

    const matchPrice = !isNaN(MatchPrice / 1000) ? (MatchPrice / 1000).toFixed(2).toString().split(".") : '--.--'
    const matchPriceColor = this.getColor(MatchPrice, ReferencePrice)
    const percentColor = this.getColor(PriceChange, 0)
    return (
      <TextBlinkCustom compareKey={'tradingDate'} data={data}>
        <div className="left-info-widget__metas">
          <div className="item-first">
            <strong className="mr-0" style={{ color: matchPriceColor }}>
              {
                `${matchPrice[0]}`
              }
            </strong>
            <span className="ml-0">
              <small className="" style={{ color: matchPriceColor }} >
                {
                  `.${matchPrice[1] || '00'}`
                }
              </small>
              <small>VND</small>
            </span>
            <span>
              <small className="" style={{ color: percentColor }}>
                {
                  formatTextFloat(PriceChange/1000)
                }
              </small>
              <small style={{ whiteSpace: 'nowrap' }} className="d-flex">
                <i style={{ color: this.getColor(PercentPriceChange, 0) }} className={`icon-caret${parseFloat(PercentPriceChange) >= 0 ? '-up' : ''} fs-10 mr-1`} />
                {
                  `${formatPercent(PercentPriceChange)}%`
                }
              </small>
            </span>
          </div>
        </div>
      </TextBlinkCustom>
    )
  }
}

PriceInfo.defaultProps = {
  data: {
    MatchPrice: 0,
    PriceChange: 0,
    PercentPriceChange: 0,
    ReferencePrice: 0,
  },
};

export default PriceInfo;


