const NewsAggregatorTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  SOURCE: 'sourceCode',
  FAVORITE: 'isFavorite',
};

const CommonTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  SOURCE: 'sourceCode',
  TYPE: 'newsCategoryCode',
  CONTRIBUTOR: 'fullName',
  FAVORITE: 'isFavorite',
  RUMORS: 'newsTitle',
  TRUSTABILITY: 'trustAbility',
};

const AutoNewsTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  TYPE: 'newsCategoryCode',
  FAVORITE: 'isFavorite',
};

const PremiumAnalysisTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  SOURCE: 'sourceCode',
  FAVORITE: 'isFavorite',
};

const MostRecentTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  CONTRIBUTOR: 'fullName',
  FAVORITE: 'isFavorite',
};

const MostPopularTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  NEWS: 'newsTitle',
  CONTRIBUTOR: 'fullName',
  FAVORITE: 'isFavorite',
};

const RumorsTable = {
  ID: 'newsId',
  TIME: 'publicDate',
  TICKER: 'ticker',
  RUMORS: 'newsTitle',
  TRUSTABILITY: 'trustAbility',
  FAVORITE: 'isFavorite',
};

const TAB_MAPPING = {
  1: 'aggregatorNewsData',
  2: 'autoNewsData',
  3: 'premiumAnalysisData',
  4: {
    1: 'mostRecentData',
    2: 'mostPopularData',
    3: 'contributorsData',
    4: 'favoriteData',
  },
  5: 'rumorsData',
};

export default {
  NewsAggregatorTable,
  AutoNewsTable,
  CommonTable,
  PremiumAnalysisTable,
  MostRecentTable,
  MostPopularTable,
  RumorsTable,
  TAB_MAPPING,
};
