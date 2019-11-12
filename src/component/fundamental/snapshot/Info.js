import React from 'react';
import InForItem from './InForItem';
import Const from './Const';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withComponentId } from './../../common/ComponentIdContext';
import { REDUCER_NAME } from './reducer';
import { withSize } from 'react-sizeme';
import { TickerChartWrap } from './ticker-chart';

class Info extends React.PureComponent {
  render() {
    const {
      data = [],
      currentSearch = {},
      latestPrice = {},
      width,
    } = this.props;

    const priceData = {
      MatchPrice: latestPrice.matchPrice,
      PriceChange: latestPrice.priceChange,
      PercentPriceChange: latestPrice.percentPriceChange,
      ReferencePrice: latestPrice.referencePrice,
    };

    return (
      <div className="snapShot-table">
        <div className="snapShotTable-Chart h-100">
          <TickerChartWrap width={width} />
        </div>
        <div className="snapShotTable-Infor h-100">
          <InForItem
            data={data}
            priceData={priceData}
            listItem={
              currentSearch.isBank
                ? Const.listItemBank.listItemInforLeft
                : Const.listItemNonBank.listItemInforLeft
            }
          />
          <InForItem
            data={data}
            priceData={priceData}
            listItem={
              currentSearch.isBank
                ? Const.listItemBank.listItemInforRight
                : Const.listItemNonBank.listItemInforRight
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    data: state[REDUCER_NAME].listMultiComponent[componentId].data,
    currentSearch:
      state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
    latestPrice:
      state[REDUCER_NAME].listMultiComponent[componentId].latestPrice,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
  withSize(),
)(Info);
