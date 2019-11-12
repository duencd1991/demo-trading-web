import React from 'react';
import { connect } from 'react-redux';

import {
  formatTextFloat,
  formatPercent,
  formatPrice,
} from '../../../../../helpers/Text';

import IndexSummary from '../../../../common/index-summary';

class indexSummary extends React.Component {
  getData = (realTimeData, currentData) => {
    if (Object.keys(realTimeData).length) return realTimeData;
    return currentData;
  };

  render() {
    const { topContentRealTime = {}, topContent = {} } = this.props;
    const data = this.getData(topContentRealTime, topContent);
    return <IndexSummary topContent={data} />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(indexSummary);
