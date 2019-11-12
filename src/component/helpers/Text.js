export {
  formatTextFloat,
  formatPrice,
  formatValue,
  formatVolume,
  formatChange,
  formatValueBillion,
  val,
  convertStringToFloat,
  substr,
  formatPercent,
  formatValueTrillion,
};

function formatTextFloat(
  text,
  count = 2,
  displayNullWhenValueEqualZero = false,
) {
  if (text) {
    return text.toLocaleString('en', {
      minimumFractionDigits: count,
      maximumFractionDigits: count,
    });
  }
  if (text === 0 && !displayNullWhenValueEqualZero) {
    return parseFloat(text).toFixed(count);
  }
  return '--';
}

function formatPrice(text) {
  const value = text / 1000;
  if (!isNaN(value)) return value;
  return '--';
}

function formatVolume(text) {
  const value = text / 1000;
  if (!isNaN(value)) return value;
  return '--';
}

function formatValue(text) {
  const value = text / 1000000;
  if (!isNaN(value)) return value;
  return '--';
}

function formatValueBillion(text) {
  const value = text / 1000000000;
  if (!isNaN(value)) return value;
  return '--';
}
function formatValueTrillion(text) {
  const value = text / 1000000000000;
  if (!isNaN(value)) return value;
  return '--';
}

function formatChange(text) {
  if (parseFloat(text) > 0) {
    return '+' + text;
  }
  return text;
}

function val(text) {
  return !isNaN(convertStringToFloat(text)) ? text : '--';
}

function convertStringToFloat(text) {
  if (typeof text === 'string') {
    return parseFloat(text.replace(',', ''));
  }
  return text;
}

function substr(str, count, typeMore = '...') {
  if (str.length > count) {
    return str.substring(0, count) + typeMore;
  }
  return str;
}

function formatPercent(text) {
  const value = text * 100;
  if (!isNaN(value)) return value.toFixed(2);
  return '--';
}
