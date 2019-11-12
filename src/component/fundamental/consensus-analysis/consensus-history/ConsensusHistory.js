import React from 'react';
import Legend from './Legend';
import RecommendationHistory from './RecommendationHistory';
import TargetPriceHistory from './TargetPriceHistory';
import Title from './Title';

class ConsensusHistory extends React.Component {
  render() {
    return (
      <div className="consensus-history flex-fill d-flex flex-column">
        <Title />
        <TargetPriceHistory />
        <RecommendationHistory />
        <Legend />
      </div>
    );
  }
}

ConsensusHistory.propTypes = {};

ConsensusHistory.defaultProps = {};

export default ConsensusHistory;
