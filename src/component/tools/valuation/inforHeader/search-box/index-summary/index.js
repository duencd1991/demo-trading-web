import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './../../../reducer';
import { formatTextFloat, formatPrice, val } from '../../../../../helpers/Text';
import { getDataFollowKeyByDot } from '../../../../../helpers/Common';
import { getColorPrice } from './../../../../../helpers/Color';
import TextBlinkCustom from '../../../../../common/text-blink-custom';
import { isTicker } from '../../../../../helpers/Common';
import PriceInfo from '../../../../../common/index-summary/PriceInfo';
import Const from '../../../../../common/Const';

class IndexSumary extends React.Component {
  getDataByTypeSearch = (priceParam, referencePriceParam) => {
    const { indexSumary } = this.props;
    let price = formatTextFloat(priceParam);
    let referencePrice = formatTextFloat(referencePriceParam);
    if (isTicker(indexSumary)) {
      price = formatPrice(priceParam);
      referencePrice = formatPrice(referencePriceParam);
    }
    return [price, referencePrice];
  };

  getChangeByTypeSearch = () => {
    const { indexSumary, indexSumaryRealTime } = this.props;
    let change = formatTextFloat(
      getDataFollowKeyByDot(indexSumaryRealTime, Const.indexData.VALUE_CHANGE),
    );
    if (isTicker(indexSumary)) {
      change = formatTextFloat(
        formatPrice(
          getDataFollowKeyByDot(
            indexSumaryRealTime,
            Const.indexData.VALUE_CHANGE,
          ),
        ),
      );
    }
    return change;
  };

  renderPriceInfo = () => {
    const { indexSumaryRealTime } = this.props;
    const price = getDataFollowKeyByDot(
      indexSumaryRealTime,
      Const.indexData.VALUE,
    );
    const referencePrice = getDataFollowKeyByDot(
      indexSumaryRealTime,
      Const.indexData.REFERENCE_PRICE,
    );
    const dataFormat = this.getDataByTypeSearch(price, referencePrice);
    return (
      <PriceInfo
        price={formatTextFloat(dataFormat[0])}
        referencePrice={dataFormat[1]}
        change={this.getChangeByTypeSearch()}
        percentChange={formatTextFloat(
          getDataFollowKeyByDot(
            indexSumaryRealTime,
            Const.indexData.PERCENT_VALUE_CHANGE,
          ) * 100,
        )}
        classNameColor={getColorPrice(price, referencePrice)}
      />
    );
  };

  render() {
    const { indexSumaryRealTime, isRealTime } = this.props;
    if (isRealTime) {
      return (
        <TextBlinkCustom data={indexSumaryRealTime} compareKey={'tradingDate'}>
          {this.renderPriceInfo()}
        </TextBlinkCustom>
      );
    }
    return this.renderPriceInfo();
  }
}

const mapStateToProps = state => {
  return {
    indexSumary: state[REDUCER_NAME].indexSumary,
  };
};

export default connect(mapStateToProps)(IndexSumary);
