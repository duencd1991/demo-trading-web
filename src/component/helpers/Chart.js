import moment from 'moment';
import Const from '../common/Const';

export {
  customDataChart,
  getMinMaxData,
  executeRealtimeData,
  getTickValues,
  getYExtentsChart,
  getColumnSizeInBarChart,
  yExtentsCharts,
  tickIntervalFunction,
  getMinMax,
};

function getMinMaxData(array, valueAttributeName, referenceIndex) {
  if (array.length === 0) {
    return { max: 0, min: 0 };
  }

  const tmpVal = referenceIndex
    ? array[array.length - 1][referenceIndex] // get last reference Price/value of index/ticker for latest info
    : array[0][valueAttributeName];

  let max = tmpVal;
  let min = tmpVal;

  array.map(item => {
    let value = item[valueAttributeName];
    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }
  });

  return { max, min };
}

function addPointBetweenTwoDate(
  startTradingDate,
  endTradingDate,
  data,
  time = 1,
) {
  let result = [];

  while (endTradingDate.diff(startTradingDate, 'minute') >= 1) {
    const newData = {
      tradingDate: startTradingDate.toString(),
      ...data,
    };
    result = [...result, newData];
    startTradingDate.add(time, 'minute');
  }

  return result;
}

function ignoreDataAfterDate(data, hour) {
  const result = [];
  data.some(item => {
    const tradingDateInHour = moment(item.tradingDate)
      .hours(hour)
      .minutes(0)
      .seconds(0);
    if (
      moment(item.tradingDate)
        .startOf('minute')
        .diff(tradingDateInHour) > 0
    ) {
      return true;
    }
    result.push(item);
  });
  return result;
}

function customDataChart(data, timeRange, type = 'index') {
  let result = [];

  if (timeRange === Const.timeRange['1D']) {
    data = ignoreDataAfterDate(data, 15);

    const length = data.length;
    if (length < 1) {
      return [];
    }

    // start point
    let currentPoint = data[0];
    let newPoint = {};
    switch (type) {
      case 'index':
        newPoint = {
          comGroupCode: currentPoint.comGroupCode,
          indexValue: currentPoint.indexValue,
          totalMatchValue: currentPoint.totalMatchValue,
          totalMatchVolume: currentPoint.totalMatchVolume,
          referenceIndex: currentPoint.referenceIndex,
        };
        break;
      case 'ticker':
        newPoint = {
          ticker: currentPoint.ticker,
          matchPrice: currentPoint.matchPrice,
          matchVolume: currentPoint.matchVolume,
          referencePrice: currentPoint.referencePrice,
        };
        break;
      case 'foreign':
        newPoint = {
          foreignBuyValueMatched: currentPoint.foreignBuyValueMatched,
          foreignSellValueMatched: currentPoint.foreignSellValueMatched,
        };
        break;
      default:
        break;
    }
    let startTradingDate = moment(currentPoint.tradingDate)
      .hours(9)
      .minutes(0)
      .seconds(0);
    let endTradingDate = moment(currentPoint.tradingDate).startOf('minute');

    result = addPointBetweenTwoDate(startTradingDate, endTradingDate, newPoint);

    const tradingDateIn13H = moment(data[0].tradingDate)
      .hours(13)
      .minutes(0)
      .seconds(0);

    for (let i = 0; i < length - 1; i++) {
      currentPoint = data[i];
      const nextPoint = data[i + 1];
      startTradingDate = moment(currentPoint.tradingDate).startOf('minute');
      endTradingDate = moment(nextPoint.tradingDate).startOf('minute');

      if (
        endTradingDate.diff(tradingDateIn13H, 'minute') >= 0 &&
        startTradingDate.diff(tradingDateIn13H, 'minute') < 0
      ) {
        switch (type) {
          case 'index':
            newPoint = {
              comGroupCode: currentPoint.comGroupCode,
              matchVolume: 0,
              indexValue: currentPoint.indexValue,
              totalMatchValue: currentPoint.totalMatchValue,
              totalMatchVolume: currentPoint.totalMatchVolume,
              referenceIndex: currentPoint.referenceIndex,
            };
            break;
          case 'ticker':
            newPoint = {
              ticker: currentPoint.ticker,
              matchVolume: 0,
              matchPrice: currentPoint.matchPrice,
              referencePrice: currentPoint.referencePrice,
            };
            break;
          case 'foreign':
            newPoint = {
              foreignBuyValueMatched: currentPoint.foreignBuyValueMatched,
              foreignSellValueMatched: currentPoint.foreignSellValueMatched,
            };
            break;
          default:
            break;
        }

        result.push(
          ...addPointBetweenTwoDate(
            startTradingDate,
            endTradingDate,
            newPoint,
            2,
          ),
        );
      } else {
        newPoint = {
          ...currentPoint,
        };
        result.push(newPoint);
        startTradingDate.add(1, 'minute');
      }
    }

    // End point
    currentPoint = data[length - 1];
    newPoint = {
      ...currentPoint,
    };
    result.push(newPoint);
    startTradingDate = moment(newPoint.tradingDate)
      .startOf('minute')
      .add(1, 'minute');
    endTradingDate = moment(currentPoint.tradingDate)
      .hours(15)
      .minutes(1)
      .seconds(0);

    switch (type) {
      case 'index':
        newPoint = {
          comGroupCode: currentPoint.comGroupCode,
          referenceIndex: currentPoint.referenceIndex,
        };
        break;
      case 'ticker':
        newPoint = {
          ticker: currentPoint.ticker,
          referencePrice: currentPoint.referencePrice,
        };
        break;
      case 'foreign':
        newPoint = {
          foreignBuyValueMatched: null,
          foreignSellValueMatched: null,
        };
        break;
      default:
        break;
    }
    result.push(
      ...addPointBetweenTwoDate(startTradingDate, endTradingDate, newPoint),
    );

    return result;
  }
  return data;
}

function executeRealtimeData(data, state, keyCode, keyListChart) {
  let newDataByCode = null;
  data.forEach(item => {
    if (item[keyCode] === state[keyCode]) {
      newDataByCode = item;
    }
  });

  if (newDataByCode) {
    const newTradingDate = moment(newDataByCode.tradingDate).startOf('minute');

    const listDataChart = [...state[keyListChart]];
    const lengthListDataChart = listDataChart.length;

    if (lengthListDataChart > 0) {
      const currentNode = { ...listDataChart[lengthListDataChart - 1] };
      const currentTradingDate = moment(currentNode.tradingDate).startOf(
        'minute',
      );

      const diffTradingDate = newTradingDate.diff(currentTradingDate, 'minute');
      if (diffTradingDate === 0) {
        listDataChart.splice(lengthListDataChart - 1, 1);
        listDataChart.push(newDataByCode);
      } else if (diffTradingDate > 0) {
        listDataChart.push(newDataByCode);
      }
    }
    return listDataChart;
  }

  return null;
}

function getTickValues(length, count) {
  let result = [];
  const min = Math.min(length, count);
  const step = Math.floor((length - 1) / (min - 1));

  for (let index = 0; index < min - 1; index++) {
    result.push(step * index);
  }

  result.push(length - 1);

  return result;
}

const getMaxData = data => {
  let max = 0;
  data.forEach(value => {
    max = parseFloat(value) > max ? parseFloat(value) : max;
  });
  return max;
};

const getMinData = data => {
  let min = 1000000;
  data.forEach(value => {
    min = parseFloat(value) < min ? parseFloat(value) : min;
  });
  return min;
};

const formatMinMaxWithZero = (max, min, newMax, newMin, isWithZero) => {
  return isWithZero
    ? {
        max: max < newMax ? newMax : max,
        min: min > newMin ? newMin : min,
      }
    : {
        min: newMin,
        max: newMax,
      };
};

const getMinMax = (
  data,
  arrKey,
  tickInterval,
  isStackedBar = false,
  isWithZero = true,
) => {
  let max = 0,
    min = 0;
  if (isStackedBar) {
    data.forEach(element => {
      let newMax = 0;
      let newMin = 0;
      arrKey.forEach(key => {
        newMax += element[key] < 0 ? 0 : element[key];
        newMin += element[key] > 0 ? 0 : element[key];
      });
      const maxMinData = formatMinMaxWithZero(
        max,
        min,
        newMax,
        newMin,
        isWithZero,
      );
      max = maxMinData.max;
      min = maxMinData.min;
    });
  } else {
    arrKey.forEach(element => {
      let arrData = data.map(a => a[element]);
      let newMax = getMaxData(arrData);
      let newMin = getMinData(arrData);
      const maxMinData = formatMinMaxWithZero(
        max,
        min,
        newMax,
        newMin,
        isWithZero,
      );
      max = maxMinData.max;
      min = maxMinData.min;
    });
  }
  return [Math.floor(min), max];
};

const yExtentsCharts = (
  data,
  arrKey,
  tickInterval,
  isStackedBar = false,
  isWithZero = true,
) => {
  const minMaxArr = getMinMax(
    data,
    arrKey,
    tickInterval,
    isStackedBar,
    isWithZero,
  );
  return getYExtentsChart(minMaxArr[0], minMaxArr[1], tickInterval);
};

function getYExtentsChart(yMin, yMax, tickInterval, format = val => val) {
  const step = Math.abs(Math.ceil((yMax - yMin) / tickInterval));
  const newMin = Math.floor(yMin / step) * step;
  const newMax = Math.ceil(yMax / step) * step;

  return [format(newMin), format(newMax)];
}

function tickIntervalFunction(min, max, tickInterval) {
  if (min < 0) {
    tickInterval += 1;
  }
  const step = Math.abs((max - min) / tickInterval);
  let i = -1,
    n = Math.max(0, Math.ceil(Math.abs(max - min) / step)) | 0,
    range = new Array(n);
  while (++i <= n) {
    range[i] = min + i * step;
  }
  return range;
}

function getColumnSizeInBarChart(width, count = 1, size = 500) {
  return width > size ? 30 * count : 16 * count;
}
