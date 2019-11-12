import { convertStringToFloat } from './Text';
import { includes } from 'lodash';
import { minSizeComponent, resolution } from '../../configs/LayoutConfig';

export {
  getDataFollowKeyByDot,
  setDataFollowKeyByDot,
  searchTextInList,
  getItemMinInList,
  searchTextInListByListKey,
  searchTextInListByKey,
  compareSortArrayObjectByString,
  isTicker,
  getBase64FromDOM,
  formatComGroupCode,
  getMinSizeComponent,
  checkIsBank,
  getUnique,
};

function formatComGroupCode(code) {
  const map = {
    VNINDEX: 'HOSE',
    HNXIndex: 'HNX',
    UpcomIndex: 'UPCOM',
    VN30: 'HOSE',
    HNX30: 'HNX',
  };
  return map[code] || code;
}

function checkIsBank(comTypeCode) {
  return comTypeCode === 'NH';
}

function getDataFollowKeyByDot(data, strKey) {
  let result = data;
  const listKey = strKey.split('.');
  listKey.forEach(value => {
    if (includes([undefined, null], result[value])) {
      result = '--';
      return;
    }
    result = result[value];
  });

  return result;
}

function setDataFollowKeyByDot(data, strKey, value) {
  var listKey = strKey.split('.');
  while (listKey.length - 1) {
    var n = listKey.shift();
    if (!(n in data)) data[n] = {};
    data = data[n];
  }
  data[listKey[0]] = value;
}

function searchTextInList(list, key, text) {
  return list.filter(item => {
    if (item[key]) {
      return item[key].toLowerCase().indexOf(text.toLowerCase()) !== -1;
    }
  });
}

function searchTextInListByKey(list, text, key) {
  const noStartResult = [];
  const startResult = [];
  const remain = [];

  list = typeof list === 'undefined' ? [] : list;
  list.forEach(item => {
    const data = key ? item[key] : item;

    if (data) {
      if (data.toLowerCase().indexOf(text.toLowerCase()) === 0) {
        startResult.push(item);
      } else if (data.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        noStartResult.push(item);
      } else {
        remain.push(item);
      }
    } else {
      remain.push(item);
    }
  });

  if (key) {
    startResult.sort((a, b) => compareSortArrayObjectByString(a, b, key));
    noStartResult.sort((a, b) => compareSortArrayObjectByString(a, b, key));
  }

  return {
    result: startResult.concat(noStartResult),
    remain,
  };
}

function searchTextInListByListKey(list, text, listKey) {
  if (listKey) {
    const result = [];

    listKey.forEach(key => {
      const { result: listByKey, remain } = searchTextInListByKey(
        list,
        text,
        key,
      );
      list = remain;
      result.push(...listByKey);
    });
    return { result, remain: list };
  }

  return searchTextInListByKey(list, text);
}

function getItemMinInList(list, listIgnore = []) {
  let min = list.length > 0 ? list[0] : '--';

  list.forEach(item => {
    if (!includes(listIgnore, item)) {
      if (typeof item === 'number') {
        min = Math.min(min, item);
      }
      if (typeof item === 'string') {
        min = Math.min(convertStringToFloat(min), convertStringToFloat(item));
      }
    }
  });

  return min;
}

export const fontSizeFitWidth = ({
  width,
  height,
  max = 32,
  min = 8,
  mainText,
  subText,
  padding = 8,
}) => {
  const div = document.createElement('div');
  const mainTextEl = document.createElement('div');
  mainTextEl.innerText = mainText;
  const subTextEl = document.createElement('div');
  subTextEl.innerText = subText;
  subTextEl.style.fontSize = '0.75em';
  div.appendChild(mainTextEl);
  div.appendChild(subTextEl);
  div.style.position = 'absolute';
  div.style.left = '9999px';
  div.style.top = '9999px';
  div.style.padding = `${padding}px`;
  div.style.whiteSpace = 'nowrap';
  document.body.appendChild(div);
  let fontSize = max;
  while (fontSize > min) {
    div.style.fontSize = `${fontSize}px`;
    if (width > div.clientWidth && height > div.clientHeight) {
      break;
    }

    fontSize *= 0.6;
  }
  document.body.removeChild(div);
  return fontSize > min ? fontSize : 0;
};

function compareSortArrayObjectByString(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function isTicker(indexSummary) {
  return indexSummary.floorPrice && indexSummary.ceilingPrice;
}

function getBase64FromDOM(node, callback) {}

function getMinSizeComponent() {
  if (window.innerWidth <= resolution.MIN_SIZE) {
    return minSizeComponent.MIN_SIZE;
  }
  if (window.innerWidth <= resolution.SMALL_SIZE) {
    return minSizeComponent.SMALL_SIZE;
  }
  if (window.innerWidth <= resolution.MEDIUM_SIZE) {
    return minSizeComponent.MEDIUM_SIZE;
  }
  if (window.innerWidth <= resolution.MAX_SIZE) {
    return minSizeComponent.MAX_SIZE;
  }
}

function getUnique() {
  return new Date().getTime();
}
