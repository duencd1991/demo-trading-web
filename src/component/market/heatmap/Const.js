import React from 'react';

export const EXCHANGES = {
  ALL: 1,
  HOSE: 2,
  HNX: 3,
  UPCOM: 4,
};

export const mapExchange = {
  [EXCHANGES.ALL]: 'All',
  [EXCHANGES.HOSE]: 'HOSE',
  [EXCHANGES.HNX]: 'HNX',
  [EXCHANGES.UPCOM]: 'UPCOM',
};

export const CRITERIAS = {
  MARKET_CAP: 1,
  VOLUME: 2,
  VALUE: 3,
  BUY_VOL: 4,
  SELL_VOL: 5,
};

export const mapCriteria = {
  [CRITERIAS.MARKET_CAP]: 'MarketCap',
  [CRITERIAS.VOLUME]: 'Volume',
  [CRITERIAS.VALUE]: 'Value',
  [CRITERIAS.BUY_VOL]: 'FrBuyVol',
  [CRITERIAS.SELL_VOL]: 'FrSellVol',
};

export const CurrentCriteriaContext = React.createContext(CRITERIAS.MARKET_CAP);
