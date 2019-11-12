import React from 'react';
import { Translate } from 'react-redux-i18n';
import StackedChartContent from './StackedChartContent';
import YAxis from './YAxis';

const RecommendationHistory = () => (
  <div className="d-flex position-relative recommendation-history">
    <YAxis />
    <StackedChartContent />
    <div className="y-axis-title">
      <Translate value="consensusAnalysis.recommendationHistoryTitle" />
    </div>
  </div>
);

export default RecommendationHistory;
