const listColumn = {
  ticker: 'organCode',
  anDate: 'publicDate',
  title: 'eventTitle',
  recordDate: 'recordDate',
  ex: 'exrightDate',
  excercise: 'exerciseDate',
  eventType: 'eventListCode',
  reference: '',
  sourceUrl: 'sourceUrl',
};

const listId = {
  eventId: 'eventId',
  watchListId: 'watchListId',
};

const listEvenType = ['ALL', 'ERN', 'DIV', 'SIS', 'IPO', 'AGM'];

const textEventType = {
  ERN: 'ERN',
  DIV: 'DIV',
  SIS: 'SIS',
  IPO: 'IPO',
  AGM: 'AGM',
};

const listWatchListDrop = ['watchList'];

const listWatchListDropbyKey = {
  [0]: { key: 'watchListId #1', name: 'watchListId #1' },
};

const listEvenTypeByKey = {
  ALL: { key: 'All', name: 'watchlistCalendar.all' },
  ERN: { key: 'ERN', name: 'watchlistCalendar.ern' },
  DIV: { key: 'DIV', name: 'watchlistCalendar.div' },
  SIS: { key: 'SIS', name: 'watchlistCalendar.sis' },
  IPO: { key: 'IPO', name: 'watchlistCalendar.ipo' },
  AGM: { key: 'AGM', name: 'watchlistCalendar.agm' },
};

const fakeEventType = ['FS', 'ERN', 'SIS', 'DIV', 'AGME'];

const eventType = {
  Earning: {
    KQCT: 'KQCT',
    KQQY: 'KQQY',
    KQSB: 'KQSB',
  },
  Dividend: {
    DIV: 'DIV',
    CDIV: 'C_DIV',
  },
  Share: {
    ISS: 'ISS',
    AIS: 'AIS',
  },
  IPO: {
    NLIS: 'NLIS',
  },
  AGM: {
    AGME: 'AGME',
    EGME: 'EGME',
  },
};

export default {
  listColumn,
  listId,
  listEvenType,
  listEvenTypeByKey,
  defaultEvenType: 'ALL',
  listWatchListDrop,
  listWatchListDropbyKey,
  fakeEventType,
  eventType,
  textEventType,
  typeCodeDefault: 'code',
  ticker: 'ticker',
  organCode: 'organCode',
};
