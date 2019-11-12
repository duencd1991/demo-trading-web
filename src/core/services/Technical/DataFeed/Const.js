export const PRICE_SCALE = 100;

export const supportedResolutions = [
  '1',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  'D',
  'W',
  'M',
  '3M',
  '12M',
];
export const MAX_ITEM_LENGTH = 100;

export const EXCHANGES = {
  ALL: 'All',
  HSX: 'HSX',
  HNX: 'HNX',
  UPCOM: 'UPCOM',
};

export const MAP_EXCHANGES = {
  HSX: ['VNINDEX'],
  HNX: ['HNXIndex'],
  UPCOM: ['UpcomIndex'],
};

export const SYMBOL_TYPES = {
  ALL: 'All',
  STOCK: 'Stock',
  FUTURES: 'Futures',
  INDICES: 'Indices',
  ECONOMY: 'Economy',
};

export const config = {
  supported_resolutions: supportedResolutions,
  exchanges: [
    { value: EXCHANGES.ALL, name: 'All Exchanges' },
    { value: EXCHANGES.HSX, name: 'HSX' },
    { value: EXCHANGES.HNX, name: 'HNX' },
    { value: EXCHANGES.UPCOM, name: 'UPCOM' },
  ],
  supports_group_request: false,
  supports_marks: true,
  supports_search: true,
  supports_time: true,
  supports_timescale_marks: true,
  symbols_types: [
    { name: 'All', value: SYMBOL_TYPES.ALL },
    { name: 'Stock', value: SYMBOL_TYPES.STOCK },
    { name: 'Futures', value: SYMBOL_TYPES.FUTURES },
    { name: 'Indices', value: SYMBOL_TYPES.INDICES },
    { name: 'Economy', value: SYMBOL_TYPES.ECONOMY },
  ],
};
