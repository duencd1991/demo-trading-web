import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { formatPercent, formatPrice, formatTextFloat } from '../../../helpers/Text';
import { withComponentId } from '../../../common/ComponentIdContext';
import { REDUCER_NAME } from '../reducer';

const items = [
  {
    i18nKey: 'highest',
    key: 'highestPrice',
  },
  {
    i18nKey: 'average',
    key: 'averagePrice',
  },
  {
    i18nKey: 'lowest',
    key: 'lowestPrice',
  },
];

class TargetPrice extends PureComponent {
  isDown = (item) => {
    const { targetPrice } = this.props;
    return targetPrice[item.key] < targetPrice.closePrice;
  };

  getClassName = (item) => this.isDown(item) ? 'down' : 'up';

  getChange = (item) => {
    const { targetPrice } = this.props;
    const change = Math.abs(targetPrice[item.key] - targetPrice.closePrice);
    const percent = formatTextFloat(formatPercent(change / targetPrice.closePrice));

    const i18nKey = this.isDown(item) ? 'downside' : 'upside';
    return (
      <Translate
        percent={percent}
        value={`consensusAnalysis.${i18nKey}`}
      />
    );
  };

  renderContent = () => {
    const { targetPrice } = this.props;

    return targetPrice && (
      <div className="content">
        <div className="item">
          {items.map((item, index) => (
            <div key={index}>
                <span className="item-text">
                  <Translate value={`consensusAnalysis.${item.i18nKey}`} />
                </span>

              <span className={`item-value ${this.getClassName(item)}`}>
                  {formatTextFloat(formatPrice(targetPrice[item.key]))}
                </span>

              <span className="item-change">
                  {this.getChange(item)}
                </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="target-price">
        <div className="title">
          <Translate value="consensusAnalysis.targetPriceTitle" />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

TargetPrice.propTypes = {
  targetPrice: PropTypes.object,
};

TargetPrice.defaultProps = {
  targetPrice: {},
};

const mapStateToProps = (state, { componentId }) => ({
  targetPrice: state[REDUCER_NAME][componentId].targetPrice,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(TargetPrice);
