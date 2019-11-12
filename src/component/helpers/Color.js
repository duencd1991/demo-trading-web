export {
  getColorPrice,
  getColorRefPrice,
  getColorRedWhite,
  getColorRedGreen,
  getColorSourceLink,
  getColorLevelsInAssessment,
  getIconPriceFollowReferencePrice,
};

const getColor = (val, type) => otherCondition => {
  if (val === '--') {
    return `${type}-s-color-1`;
  }

  return otherCondition();
};

// todo: check price = 0 again
function getColorPrice(
  price,
  refPrice,
  ceilingPrice = null,
  floorPrice = null,
  type = 'text',
) {
  return getColor(price, type)(() => {
    if (price === refPrice) {
      return `${type}-s-color-4`;
    }
    if (ceilingPrice !== null && price === ceilingPrice) {
      return `${type}-s-color-6`;
    }
    if (floorPrice !== null && price === floorPrice) {
      return `${type}-s-color-2`;
    }
    if (
      floorPrice !== null
        ? price > floorPrice && price < refPrice
        : price < refPrice
    ) {
      return `${type}-s-color-3`;
    }
    if (
      ceilingPrice !== null
        ? price > refPrice && price < ceilingPrice
        : price > refPrice
    ) {
      return `${type}-s-color-5`;
    }
    return `${type}-s-color-1`;
  });
}

function getIconPriceFollowReferencePrice(price, referencePrice) {
  if (price === referencePrice) {
    return 'icon-bi';
  }
  if (price > referencePrice) {
    return 'icon-caret-up';
  }
  if (price < referencePrice) {
    return 'icon-caret';
  }
}

function getColorRefPrice(value, type = 'text') {
  return getColor(value, type)(() => {
    return `${type}-s-color-4`;
  });
}

function getColorRedWhite(value, type = 'text') {
  return getColor(value, type)(() => {
    return value >= 0 ? '' : `${type}-s-color-3`;
  });
}

function getColorRedGreen(value, type = 'text') {
  return value >= 0 ? `${type}-s-color-5` : `${type}-s-color-3`;
}

function getColorSourceLink(type = 'text') {
  return `${type}-b-color-1 text-left`;
}
function getColorLevelsInAssessment(type = 'text') {
  const typeUpdate = type.toString();
  return `${typeUpdate.toLowerCase()}-b-color `;
}
