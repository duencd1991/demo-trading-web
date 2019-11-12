import React from 'react';
import './index.scss';
import {
  formatPrice,
  formatTextFloat,
  formatVolume,
} from '../../../../../helpers/Text';

const OPACITY = 0.75;
const RED = `rgba(230, 57, 70, ${OPACITY})`;
const GREEN = `rgba(0, 157, 91, ${OPACITY})`;
const YELLOW = `rgba(250, 204, 92, ${OPACITY})`;
const arrColour = [RED, GREEN, YELLOW];

class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getColor = value => {
    const { REFERENCE_PRICE } = this.props;
    if (value > REFERENCE_PRICE) return arrColour[1];
    if (value < REFERENCE_PRICE) return arrColour[0];
    return arrColour[2];
  };

  render() {
    const {
      item: { BID, BID_VOLUME, ASK, ASK_VOLUME },
      maxBidValue,
      maxAskValue,
      isDerivatives,
    } = this.props;
    const bidWidth = (BID_VOLUME * 100) / maxBidValue || 0;
    const askWidth = (ASK_VOLUME * 100) / maxAskValue || 0;

    const bidColor = this.getColor(BID);
    const askColor = this.getColor(ASK);

    return (
      <div className="row-wrapper">
        <div className="box-column">
          <div className="box-column--left">
            <div />
            <div
              className="main-text d-flex justify-content-end"
              style={{ width: `${bidWidth}%`, backgroundColor: bidColor }}
            >
              <span className="bar-text mr-3">
                {formatTextFloat(isDerivatives ? BID : formatPrice(BID))}
              </span>
            </div>
            <span className="absolute-text-left">
              {formatTextFloat(
                isDerivatives ? BID_VOLUME : formatVolume(BID_VOLUME),
              )}
            </span>
          </div>
          <div className="box-column--right">
            <div
              className="main-text d-flex justify-content-start"
              style={{ width: `${askWidth}%`, backgroundColor: askColor }}
            >
              <span className="bar-text ml-3">
                {formatTextFloat(isDerivatives ? ASK : formatPrice(ASK))}
              </span>
            </div>
            <div />
            <span className="absolute-text-right">
              {formatTextFloat(
                isDerivatives ? ASK_VOLUME : formatVolume(ASK_VOLUME),
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Row;
