import React from 'react';
import IndexSummary from './top-content/index-summary';
import IndexInfo from './top-content/index-infor';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';

class TopInfoContent extends React.Component {
  getRealTimeData = (realTimeData, baseData) => {
    if (Object.keys(realTimeData).length) {
      return realTimeData;
    }
    return baseData;
  };
  render() {
    const { topContentRealTime, topContent, isDerivatives } = this.props;
    console.log(this.props);

    return (
      <>
        <IndexSummary
          data={this.getRealTimeData(topContentRealTime, topContent)}
          isDerivatives={isDerivatives}
          keyToCompare={'TradingDate'}
        />
        <IndexInfo
          data={this.getRealTimeData(topContentRealTime, topContent)}
          isDerivatives={isDerivatives}
        />
      </>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    topContent: state[REDUCER_NAME].listMultiComponent[componentId].topContent,
    topContentRealTime:
      state[REDUCER_NAME].listMultiComponent[componentId].topContentRealTime,
    isDerivatives:
      state[REDUCER_NAME].listMultiComponent[componentId].condition
        .isDerivatives,
  };
};

TopInfoContent.defaultProps = {
  topContent: {},
  topContentRealTime: {},
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(TopInfoContent);
