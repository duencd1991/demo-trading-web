import React from 'react';
import { REDUCER_NAME } from '../reducer';
import { connect } from 'react-redux';
import ConstSummary from './Const';
import { getDataFollowKeyByDot } from '../../../helpers/Common';

class CellTrend extends React.Component {
  checkTrend = (price, matchPrice) => {
    if (price > matchPrice) {
      return (
        <span className="text-center text-s-color-3">
          <i className="icon-down fs-12" />
        </span>
      );
    }
    return (
      <span className="text-center text-s-color-5">
        <i className="icon-up fs-12" />
      </span>
    );
  };

  getTrend = (item, typeTrendIndex) => {
    switch (typeTrendIndex) {
      case ConstSummary.index.AVERAGE_PRICE_DAILY:
        return this.checkTrend(
          getDataFollowKeyByDot(item, ConstSummary.index.AVERAGE_PRICE_DAILY),
          getDataFollowKeyByDot(item, ConstSummary.index.MATCH_PRICE),
        );
      case ConstSummary.index.AVERAGE_PRICE_5SESSION_WEEKLY:
        return this.checkTrend(
          getDataFollowKeyByDot(
            item,
            ConstSummary.index.AVERAGE_PRICE_5SESSION_WEEKLY,
          ),
          getDataFollowKeyByDot(item, ConstSummary.index.MATCH_PRICE),
        );
      case ConstSummary.index.AVERAGE_PRICE_5SESSION_MONTHLY:
        return this.checkTrend(
          getDataFollowKeyByDot(
            item,
            ConstSummary.index.AVERAGE_PRICE_5SESSION_MONTHLY,
          ),
          getDataFollowKeyByDot(item, ConstSummary.index.MATCH_PRICE),
        );
      case ConstSummary.index.AVERAGE_PRICE_5SESSION_QUARTERLY:
        return this.checkTrend(
          getDataFollowKeyByDot(
            item,
            ConstSummary.index.AVERAGE_PRICE_5SESSION_QUARTERLY,
          ),
          getDataFollowKeyByDot(item, ConstSummary.index.MATCH_PRICE),
        );
      default:
        return this.checkTrend(
          getDataFollowKeyByDot(item, ConstSummary.index.AVERAGE_PRICE_DAILY),
          getDataFollowKeyByDot(item, ConstSummary.index.MATCH_PRICE),
        );
    }
  };

  render() {
    const { children, typeTrendIndex } = this.props;
    return (
      <div className="text-center">
        {this.getTrend(children, typeTrendIndex)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    typeTrendIndex: state[REDUCER_NAME].typeTrendIndex,
  };
};

export default connect(mapStateToProps)(CellTrend);
