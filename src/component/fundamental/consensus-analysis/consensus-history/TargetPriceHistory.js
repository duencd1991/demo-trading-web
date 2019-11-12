import React from 'react';
import SizeTracker from '../../../common/size-tracker/SizeTracker';
import TargetPriceChart from './TargetPriceChart';

const TargetPriceHistory = () => (
  <SizeTracker className="target-price-history">
    {(width, height) => (
      <TargetPriceChart
        key={width}
        width={width}
        height={height}
      />
    )}
  </SizeTracker>
);

export default TargetPriceHistory;

