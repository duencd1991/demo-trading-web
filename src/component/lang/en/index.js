import marketInDepth from './market/market-in-depth';
import watchList from './market/watchlist';
import topMover from './market/top-mover';
import marketCalendar from './market/market-calendar';
import moneyFlow from './market/money-flow';
import common from './common';
import heatmap from './market/heatmap/index';
import timeAndSale from './prices/time-and-sales/index';
import priceData from './prices/price-data/index';
import priceDepth from './prices/price-depth/';
import technical from './technical';
import fundamental from './fundamental';
import newsAndAnalysis from './news-and-analysis';
import alerts from './tools/alerts';
import stockScreener from './tools/screener';
import strategy from './strategy';
import message from './message';
import valuation from './tools/valuation/index';
import layout from './layout';

export default {
  ...marketInDepth,
  ...watchList,
  ...topMover,
  ...marketCalendar,
  ...moneyFlow,
  ...priceData,
  ...technical,
  ...fundamental,
  ...newsAndAnalysis,
  ...alerts,
  ...stockScreener,
  ...strategy,
  ...valuation,
  common,
  heatmap,
  timeAndSale,
  priceDepth,
  message,
  layout,
};
