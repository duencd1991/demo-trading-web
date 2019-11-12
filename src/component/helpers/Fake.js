import {range} from 'lodash';

export function makeData(len, model) {
  return {
    items: range(len).map((index) => {
      return {
        ...model(index)
      }
    })
  };
}

export function makeRealtime(len, model) {
  return range(len).map((index) => {
    return {
      ...model(index)
    }
  })
}
