export const getBgClassName = value => {
  if (value < 0) {
    return 'reduced-price-bg';
  }

  if (value > 0) {
    return 'increase-price-bg';
  }

  if(value === 0) {
    return 'ref-price-bg';
  }

  return 'normal-bg'
};

export const getTickerBgClassname = ({ matchPrice: currentPrice, refPrice, floorPrice, ceilPrice }) => {
  if (currentPrice === ceilPrice) {
    return 'ceil-price-bg';
  }

  if (currentPrice > refPrice) {
    return 'increase-price-bg';
  }

  if (currentPrice === refPrice) {
    return 'ref-price-bg';
  }

  if (currentPrice < refPrice) {
    return 'reduced-price-bg';
  }

  if (currentPrice === floorPrice) {
    return 'floor-price-bg';
  }

  return 'normal-bg';
};

export const getBorderTopClassName = value => {
  if (value < 0) {
    return 'reduced-border-top-color';
  }

  if (value > 0) {
    return 'increase-border-top-color';
  }

  return 'ref-border-top-color';
};

export const getTextClassName = ({ matchPrice: currentPrice, refPrice, floorPrice, ceilPrice }) => {
  if (currentPrice === ceilPrice) {
    return 'ceil-text-color';
  }

  if (currentPrice > refPrice) {
    return 'increase-text-color';
  }

  if (currentPrice === refPrice) {
    return 'ref-text-color';
  }

  if (currentPrice < refPrice) {
    return 'reduced-text-color';
  }

  if (currentPrice === floorPrice) {
    return 'floor-text-color';
  }

  return '';
};

export const getSectorTitleBg = value => {
  if (value < 0) {
    return 'reduced-sector-title-bg';
  }

  if (value > 0) {
    return 'increase-sector-title-bg';
  }

  return 'ref-sector-title-bg';
};
