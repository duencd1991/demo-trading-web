import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  formatChange,
  formatPercent,
  formatPrice,
  formatTextFloat,
  formatValue,
  formatValueBillion,
  formatVolume,
} from '../../../helpers/Text';
import { CRITERIAS, CurrentCriteriaContext } from '../Const';
import { REDUCER_NAME } from '../reducer';
import {
  getTextClassName,
  getTickerBgClassname,
} from '../../../helpers/ClassName';

const getTickerName = data => data.name;

const getClassName = (organCode, hoverCode, item) => {
  if (organCode !== hoverCode) {
    return '';
  }

  return `active ${getTickerBgClassname({
    matchPrice: item.matchPrice,
    refPrice: item.referencePrice,
    floorPrice: item.floorPrice,
    ceilPrice: item.ceilingPrice,
  })}`;
};

class TopTenItem extends React.PureComponent {
  getThirdValue = () => {
    const { item } = this.props;
    const currentCriteria = this.context;
    const mapFormatFunc = {
      [CRITERIAS.MARKET_CAP]: formatValueBillion,
      [CRITERIAS.VOLUME]: formatVolume,
      [CRITERIAS.VALUE]: formatValue,
      [CRITERIAS.BUY_VOL]: formatVolume,
      [CRITERIAS.SELL_VOL]: formatVolume,
    };
    const formatFunc = mapFormatFunc[currentCriteria];

    return formatTextFloat(formatFunc(item.value));
  };

  render() {
    const { item, organCode, hoverCode } = this.props;
    if (!item || !item.organCode) {
      return null;
    }

    const percentChangeClassName = getTextClassName({
      matchPrice: item.matchPrice,
      refPrice: item.referencePrice,
      floorPrice: item.floorPrice,
      ceilPrice: item.ceilingPrice,
    });
    const trClassName = getClassName(organCode, hoverCode, item);

    return (
      <tr className={trClassName}>
        <td>
          <div className="table-value text-bold">{getTickerName(item)}</div>
        </td>
        <td>
          <div className="table-value text-right text-bold">
            {formatTextFloat(formatPrice(item.matchPrice))}
          </div>
        </td>
        <td>
          <div className={`table-value text-right ${percentChangeClassName}`}>
            {`${formatChange(
              formatTextFloat(formatPercent(item.percentPriceChange)),
            )}%`}
          </div>
        </td>
        <td>
          <div className="table-value text-right">{this.getThirdValue()}</div>
        </td>
      </tr>
    );
  }
}

TopTenItem.propTypes = {
  organCode: PropTypes.string,
  item: PropTypes.object,
};

TopTenItem.defaultProps = {
  item: null,
  organCode: null,
};

TopTenItem.contextType = CurrentCriteriaContext;

const mapStateToProps = (state, { organCode }) => ({
  item: state[REDUCER_NAME].topTen[organCode],
});

export default connect(mapStateToProps)(TopTenItem);
