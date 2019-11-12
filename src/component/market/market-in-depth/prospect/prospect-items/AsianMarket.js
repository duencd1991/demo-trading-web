import React  from 'react';
import Market from './Market';

const AsianMarket = ({ data, className, dailyDate }) => (
  <Market dailyDate={dailyDate} data={data} className={className} marketName="asianMarket" />
);

export default AsianMarket;
