import React from 'react';
import Market from './Market';

const UsMarket = ({ data, className, dailyDate }) => (
  <Market
    dailyDate={dailyDate}
    data={data}
    className={className}
    marketName="usMarket"
  />
);

export default UsMarket;
