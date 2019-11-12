import React from 'react';
import './index.scss';
import { formatPrice, formatTextFloat } from '../../../helpers/Text';

class IndexInfo extends React.Component {
  render() {
    const {
      data: { Bid, Ask, OpenPrice, HighestPrice, LowestPrice },
      isDerivatives,
    } = this.props;

    return (
      <div className="item-infor mr-3 ml-3">
        <div className="item-infor--first-row">
          <div className="item">
            <div className="main-text">O:</div>
            <div className="sub-text">
              {`${formatTextFloat(
                isDerivatives ? OpenPrice : formatPrice(OpenPrice),
              )}`}
            </div>
          </div>
          <div className="item">
            <div className="main-text">H:</div>
            <div className="sub-text">
              {`${formatTextFloat(
                isDerivatives ? HighestPrice : formatPrice(HighestPrice),
              )}`}
            </div>
          </div>
          <div className="item">
            <div className="main-text">L:</div>
            <div className="sub-text">
              {`${formatTextFloat(
                isDerivatives ? LowestPrice : formatPrice(LowestPrice),
              )}`}
            </div>
          </div>
        </div>
        <div className="item-infor--second-row">
          <div className="item">
            <div className="main-text">BID:</div>
            <div className="sub-text">
              {`${formatTextFloat(isDerivatives ? Bid : formatPrice(Bid))}`}
            </div>
          </div>
          <div className="item">
            <div className="main-text">ASK:</div>
            <div className="sub-text">
              {`${formatTextFloat(isDerivatives ? Ask : formatPrice(Ask))}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IndexInfo.defaultProps = {
  data: {
    MatchPrice: 0,
    PriceChange: 0,
    PercentPriceChange: 0,
    ReferencePrice: 0,
  },
  isDerivatives: false,
};

export default IndexInfo;
