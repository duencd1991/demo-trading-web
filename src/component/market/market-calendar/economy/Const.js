import moment from 'moment';
const ids = {
  sortOrder: 'sortOrder',
};

const listColumn = {
  publicDate: 'publicDate',
  event: 'event',
  importance: 'importance',
  actual: 'actual',
  forecast: 'forecast',
  previous: 'previous',
  sourceURL: 'sourceURL',
  sourceURLFiin: 'sourceURLFiin',
};

const importance = {
  low: 'LOW',
  med: 'NOMAL',
  high: 'HIGH',
};
const importanceNew = {
  low: 'Low',
  med: 'Nomal',
  high: 'High',
};

const position = {
  monday: 2,
  exactdate: moment().weekday() + 1,
};

const listImportance = ['Low', 'Nomal', 'High'];

const listImportanceByKey = {
  low: { key: 'LOW' },
  med: { key: 'MED' },
  high: { key: 'HIGH' },
};

export default {
  ids,
  listColumn,
  importance,
  listImportance,
  listImportanceByKey,
  position,
  page: 1,
  pageSize: 50,
  importanceNew,
};
