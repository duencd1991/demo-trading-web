import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { getTextClassName } from '../../../../helpers/ClassName';
import {
  formatChange,
  formatPercent,
  formatPrice,
  formatTextFloat,
  formatValue,
} from '../../../../helpers/Text';

class Tooltip extends PureComponent {
  getTextClassName = () => {
    const { data } = this.props;
    return getTextClassName({
      matchPrice: data.matchPrice,
      refPrice: data.referencePrice,
      floorPrice: data.floorPrice,
      ceilPrice: data.ceilingPrice,
    });
  };

  render() {
    const {
      data,
      secondTitle,
      thirdTitle,
      secondValue,
      thirdValue,
    } = this.props;
    const textClassName = this.getTextClassName();

    return (
      <>
        <div className="matched">
          <Translate value="moneyFlowCommon.tooltipMatched" />
          <strong>{`${formatTextFloat(formatPrice(data.matchPrice))} `}</strong>
          (
          <span className={`${textClassName} text-bold`}>
            {`${formatChange(formatTextFloat(formatPrice(data.priceChange)))} `}
          </span>
          /
          <span className={`${textClassName} text-bold`}>
            {` ${formatTextFloat(formatPercent(data.percentPriceChange))}`} %
          </span>
          )
        </div>
        <div className="value">
          <Translate value={secondTitle} />
          <strong>{formatTextFloat(formatValue(secondValue))}</strong>
        </div>
        <div className="net">
          <Translate value={thirdTitle} />
          <strong>{thirdValue}</strong>
        </div>
      </>
    );
  }
}

Tooltip.propTypes = {
  data: PropTypes.object.isRequired,
  secondTitle: PropTypes.string.isRequired,
  secondValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  thirdTitle: PropTypes.string.isRequired,
  thirdValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Tooltip;
