import React from 'react';
import PropTypes from 'prop-types';
import { getIconPriceFollowReferencePrice } from './../../helpers/Color';

class PriceInfo extends React.Component {
  render() {
    const {
      price,
      referencePrice,
      change,
      percentChange,
      classNameColor,
    } = this.props;

    return (
      <div className="item-first">
        <strong className={classNameColor}>
          {price.toString().split('.')[0]}
        </strong>
        <span>
          <small className={classNameColor}>
            .{price.toString().split('.')[1]}
          </small>
          <small>VND</small>
        </span>
        <span>
          <small className={classNameColor}>{change}</small>
          <small className="d-flex">
            <i
              className={`${getIconPriceFollowReferencePrice(
                price,
                referencePrice,
              )} ${classNameColor} mt-2 fs-10`}
            />
            <span>
              &nbsp;
              {percentChange}
              {percentChange !== '--' && ' %'}
            </span>
          </small>
        </span>
      </div>
    );
  }
}

PriceInfo.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  referencePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  percentChange: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  classNameColor: PropTypes.string.isRequired,
};

export default PriceInfo;
