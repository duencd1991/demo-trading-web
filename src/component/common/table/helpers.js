import { SORT_TYPES } from './TableHead';

export const sortByValueFromItem = (valueFromItem, type, data) => (a, b) => {
  if (valueFromItem(data[b]) === '--') {
    return -1;
  }

  if (valueFromItem(data[a]) < valueFromItem(data[b])) {
    return type === SORT_TYPES.ASC ? -1 : 1;
  }

  if (valueFromItem(data[a]) > valueFromItem(data[b])) {
    return type === SORT_TYPES.ASC ? 1 : -1;
  }

  return 0;
};

export const sort = ({ ids, data, valueFromItem, type }) => {
  return ids.concat().sort(sortByValueFromItem(valueFromItem, type, data));
};

export const sortGroup = ({ groups, data, valueFromItem, type }) =>
  groups.map(group => {
    const sortedIds = group.ids
      .concat()
      .sort(sortByValueFromItem(valueFromItem, type, data));

    return {
      ...group,
      ids: sortedIds,
    };
  });

export const randomKey = schema => {
  const randomIndex = Math.floor(Math.random() * schema.length);
  if (schema[randomIndex].disableResize) {
    return randomKey(schema);
  }
  return schema[randomIndex].key;
};

export const getNextIndex = (schema, index) => {
  const nextCol = schema[index + 1];
  if (!nextCol) {
    return null;
  }

  if (nextCol.disableResize) {
    return getNextIndex(schema, index + 1);
  }

  return index + 1;
};

export const getPrevIndex = (schema, index) => {
  if (index < 1) {
    return null;
  }
  const prevCol = schema[index - 1];
  if (prevCol.disableResize) {
    return getPrevIndex(schema, index - 1);
  }

  return index - 1;
};
