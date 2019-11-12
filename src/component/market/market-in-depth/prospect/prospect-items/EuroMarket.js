import React from 'react';
import Market from './Market';

const EuroMarket = ({ data, className, dailyDate }) => (
  <Market dailyDate={dailyDate} data={data} className={className} marketName="euroMarket" />
);

export default EuroMarket;
