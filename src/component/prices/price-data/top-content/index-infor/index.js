import React from 'react';
import { REDUCER_NAME } from './../../reducer';
import { connect } from 'react-redux';
import { getDataFollowKeyByDot } from '../../../../helpers/Common';
import { formatTextFloat, formatPrice, val } from '../../../../helpers/Text';
import Const from '../../Const';
import { I18n } from 'react-redux-i18n';
import { isTicker } from '../../../../helpers/Common';

const indexSumaryData = {
  OPEN_PRICE: 'openPrice',
  HIGHEST_PRICE: 'highestPrice',
  LOWEST_PRICE: 'lowestPrice',
};

const indexInforData = {
  BEST_BID: 'best1Bid',
  BEST_OFFER: 'best1Offer',
};

class IndexInfo extends React.Component {
  formatValueIndexInfo(value, dataMap) {
    const { indexSumary } = this.props;
    let valueArr = [];
    if (isTicker(indexSumary)) {
      valueArr = formatTextFloat(
        formatPrice(getDataFollowKeyByDot(value, dataMap)),
      ).split('.');
    } else {
      valueArr = formatTextFloat(getDataFollowKeyByDot(value, dataMap)).split(
        '.',
      );
    }
    let valueBeforeDot = valueArr[0];
    let valueAfterDot = valueArr[1];
    return val(valueBeforeDot) + '.' + val(valueAfterDot);
  }

  renderCellIndexInfo = (indexInfo, value) => {
    return (
      <div className="item">
        <div className="main-text">{indexInfo}:</div>
        <div className="sub-text">{value}</div>
      </div>
    );
  };

  renderFirstRowInfo = (indexInfo, indexSumary) => {
    const valueArrOpenPrice = this.formatValueIndexInfo(
      indexSumary,
      indexSumaryData.OPEN_PRICE,
    );
    const valueArrHighestPrice = this.formatValueIndexInfo(
      indexSumary,
      indexSumaryData.HIGHEST_PRICE,
    );
    const valueArrLowestPrice = this.formatValueIndexInfo(
      indexSumary,
      indexSumaryData.LOWEST_PRICE,
    );
    return (
      <div className="item-infor--first-row">
        {this.renderCellIndexInfo(indexInfo.Open, valueArrOpenPrice)}
        {this.renderCellIndexInfo(indexInfo.Hight, valueArrHighestPrice)}
        {this.renderCellIndexInfo(indexInfo.Low, valueArrLowestPrice)}
      </div>
    );
  };

  renderSecondRowInfo = (code, listDataSearch, indexInfor, indexInfo) => {
    const inforTicker = listDataSearch.find(item => item.displayCode === code);
    const valueArrBestBid = this.formatValueIndexInfo(
      indexInfor,
      indexInforData.BEST_BID,
    );
    const valueArrBestOffer = this.formatValueIndexInfo(
      indexInfor,
      indexInforData.BEST_OFFER,
    );
    let bidAskTicker = '';
    if (inforTicker && !inforTicker.isTicker) {
      bidAskTicker = <div className="item-infor--second-row mt-8 pt-10" />;
    } else {
      bidAskTicker = (
        <div className="item-infor--second-row">
          {this.renderCellIndexInfo(indexInfo.Bid, valueArrBestBid)}
          {this.renderCellIndexInfo(indexInfo.Ask, valueArrBestOffer)}
        </div>
      );
    }
    return bidAskTicker;
  };

  render() {
    let indexInfo = I18n.t('priceData.indexInfo');
    const { indexInfor, indexSumary, code, listDataSearch } = this.props;
    return (
      <div className="item-infor mr-3 ml-3">
        {this.renderFirstRowInfo(indexInfo, indexSumary)}
        {this.renderSecondRowInfo(code, listDataSearch, indexInfor, indexInfo)}
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    i18n: state.i18n,
    listDataSearch: state[REDUCER_NAME].listDataSearch,
    indexInfor: state[REDUCER_NAME].listMultiComponent[id].indexInfor,
    indexSumary: state[REDUCER_NAME].listMultiComponent[id].indexSumary,
    code: state[REDUCER_NAME].listMultiComponent[id].currentSearch.code,
  };
};

export default connect(mapStateToProps)(IndexInfo);
