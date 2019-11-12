import React, { Component } from 'react';
import { connect } from 'react-redux';
import Const from './../Const';
import { formatTextFloat } from './../../../../helpers/Text';
import { getDataFollowKeyByDot } from './../../../../helpers/Common';
import { REDUCER_NAME } from './../reducer';
import { getColorPrice } from '../../../../helpers/Color';
import { PriceInfo, Title } from './../../../../common/index-summary';

class IndexSummary extends Component {
  renderTitle = data => {
    const indexName = Const.listFilterByOrganCode[
      getDataFollowKeyByDot(data, Const.listIndex.COM_GROUP_CODE)
    ]
      ? Const.listFilterByOrganCode[
          getDataFollowKeyByDot(data, Const.listIndex.COM_GROUP_CODE)
        ].key
      : '--';

    return (
      <Title title={indexName} style={{ minWidth: 126, marginRight: 20 }} />
    );
  };

  renderPriceInfo = data => {
    const price = getDataFollowKeyByDot(data, Const.listIndex.INDEX_VALUE);
    const referencePrice = getDataFollowKeyByDot(
      data,
      Const.listIndex.REFERENCE_INDEX,
    );
    return (
      <PriceInfo
        price={formatTextFloat(price)}
        referencePrice={formatTextFloat(referencePrice)}
        change={formatTextFloat(
          getDataFollowKeyByDot(data, Const.listIndex.INDEX_CHANGE),
        )}
        percentChange={formatTextFloat(
          getDataFollowKeyByDot(data, Const.listIndex.PERCENT_INDEX_CHANGE) *
            100,
        )}
        classNameColor={getColorPrice(price, referencePrice)}
      />
    );
  };
  render() {
    const { contributionData } = this.props;
    const data = contributionData[Const.SERIES] || {};

    return (
      <div className="left-info-widget mb-10">
        <div className="left-info-widget__metas d-flex">
          {this.renderTitle(data)}
          {this.renderPriceInfo(data)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contributionData: state[REDUCER_NAME].contributionData,
  };
};

export default connect(mapStateToProps)(IndexSummary);
