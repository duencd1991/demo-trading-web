export default {
  lstTab: {
    indicators: 'Indicators_v',
    deceptiveOrder: 'Deceptive Orders_v',
    priceVolume: 'Price–Volume Analysis_v',
  },

  deceptiveTab: {
    overview: 'OVERVIEW_v',
    abnormaly: 'CE / FL ABNORMALITY_v',
    cancelled: 'CANCELLED_v',
    pressing: 'PRESSING_v',
    aggressive: 'AGGRESSIVE_v',
    closing: 'CLOSING_v',
  },

  overviewHeader: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE',
    PERCENT_PRICE_CHANGE: '% 1D_v',
    VOLUME: 'VOLUME_v',
    CE_FL: 'CE / FL_v',
    CANCELED: 'CANCELLED_v',
    PRESSING: 'PRESSING_v',
    AGGRESSIVE: 'AGGRESSIVE_v',
    CLOSING: 'CLOSING_v',
  },

  overviewContent: {
    ceflTooltip:
      'Stocks are overbought at ceiling price or oversold at floor price_v',
    cancelledTooltip: 'Stocks are bought then the orders are cancelled_v',
    pressingTooltip:
      'Stocks are bought with high volume to influence the price_v',
    aggressiveTooltip: 'Stocks are bought and sold quickly to earn profit_v',
    closingTooltip: 'Stocks are bought and sold at the close of the market_v',
  },

  ceflAbnormalityHeader: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOLUME: 'VOL.',
    AVG_VOLUME: 'VOL.<br>(AVG. 10D)</br>_v',
    VOLUME_CE_FL_UNMATCHED: 'VOL.<br>(UNMATCHED CE / FL)</br>_v',
    RATIO: 'RATIO_v',
    SESSION: 'SESSION_v',
    PREV_SESSION: 'SESSION<br>(PREVIOUS)</br>_v',
    RANK: 'RANKING_v',
  },

  cancelledHeader: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOLUME: 'VOL._v',
    NR_CO: 'NR. OF CO_v',
    VOL_CO: 'VOL. OF CO_v',
    NR_CO_BUY: 'NR. OF CO<br>(BUY)</br>_v',
    VOL_CO_BUY: 'VOL. OF CO<br>(BUY)</br>_v',
    NR_CO_SELL: 'NR. OF CO<br>(SELL)</br>_v',
    VOL_SELL: 'VOL. OF CO<br>(SELL)</br>_v',
  },

  aggressiveHeader: {
    TICKER: 'TICKER_v',
    PRICE: 'PRICE_v',
    VOLUME: 'VOL._v',
    VOLUME_BU_SD: 'VOL.<br>(BU/SD)</br>_v',
    AVG_VOLUME: 'AVG.VOL.<br>(10D)</br>_v',
    TOTAL_VOLUME_BU: 'TOTAL VOL. BU_v',
    TOTAL_VOLUME_SD: 'TOTAL VOL. SD_v',
    RANK: 'RANKING_v',
  },

  aggressiveContent: {
    tooltipContent: 'Stocks have an imbalance in buy up or sell down',
    line_1: 'Aggressive Orders_v',
    line_2: 'Average Volume 10D_v',
    line_3: 'Total Volume BU / SD_v',
    line_4: {
      part_1: 'Condition: Stocks with ',
      part_2: 'average volume 10D > ',
      part_3: ' and ',
      part_4: 'total buy up / sell down volume ',
      part_5: ' times',
    },
  },

  abnormalityContent: {
    tooltipContent:
      'Stocks are overbought at ceiling price or oversold at floor price',
    line_1: 'CE / FL Abnormality_v',
    line_2: 'Abnormality Type_v',
    line_3: 'Average Volume 10D_v',
    line_4: {
      part_1: 'Rate of unmatched CE / FL vol. ',
      part_2: '(AVG. VOL. 10D)',
    },
    line_5: {
      part_1: 'Condition: Stocks ',
      part_2: ' with ',
      part_3: ' volume > ',
      part_4: ' and ',
      part_5: 'the rate of unmatched CE/ FL vol > ',
    },
    filter_quote_1: 'bought at ceiling price _v',
    filter_quote_2: 'sold at floor price _v',
  },

  cancelledContent: {
    tooltipContent: 'A high volume of stocks is cancelled',
    line_1: 'Cancelled Orders',
    line_2: 'Average Volume 10D',
    line_3: {
      part_1: 'Condition: Stocks with ',
      part_2: 'average volume 10D > ',
      part_3: ' and signals of ',
      part_4: 'cancelled orders',
    },
  },

  pressingHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    AVG_VOLUME_10D: 'AVG. VOL. 10D',
    PRESSING_VOL_BUY: 'PRESSING VOL. <br>(BUY)</br>',
    BID: 'BID',
    PRESSING_VOL_SELL: 'PRESSING VOL. <br>(SELL)</br>',
    ASK: 'ASK',
    RANK: 'RANKING',
  },

  pressingContent: {
    tooltipContent:
      'Traders order a high volume of stocks without matching prices',
    line_1: 'Pressing Orders',
    line_2: 'Average Volume 10D',
    line_3: 'Pressing Order',
    line_4: 'Proportion',
    line_5: {
      part_1: 'Condition: Stocks with ',
      part_2: 'average volume 10D > ',
      part_3: ' and signals of ',
    },
    filter_1: 'pressing buy > ',
    filter_2: 'sell orders > ',
    fitler_3: 'pressing buy and sell orders > ',
  },

  closingHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOLUME: 'VOLUME',
    VOLUME_AFTER_2PM: 'VOLUME<br>(AFTER 2PM)</br>',
    VOLUME_BEFORE_2PM: 'VOLUME<br>(8AM - 2PM)</br>',
    AVG_VOLUME_10D: 'AVG. VOLUME<br>(10D)</br>',
    VOLUME_PREVIOUS: 'VOLUME<br>(PREVIOUS)</br>',
    RANK: 'RANKING',
  },

  closingContent: {
    tooltipContent: 'Stocks that are actively traded from 2:00 PM (GMT+7)',
    line_1: 'Closing Orders',
    line_2: 'Average Volume 10D',
    line_3: {
      part_1: 'The exceeding percentage',
      part_2: '(COMPARED WITH PREVIOUS SESSION)',
    },
    line_4: {
      part_1: 'Condition: Stocks with ',
      part_2: 'average volume 10D > ',
      part_3: ' and ',
      part_4: ' the exceeding percentage is ',
      part_5: '% higher',
      part_6: ' than before',
    },
  },

  filterAbnormalityType: {
    ceilingBuy: 'Ceiling Buy',
    floorSell: 'Floor Sell',
  },

  filterAvgVolume: {
    1: '>10,000',
    2: '>50,000',
    3: '>100,000',
    4: '>300,000',
    5: '>500,000',
  },

  filterAvgVolumePressing: {
    1: '>10,000',
    2: '>20,000',
    3: '>30,000',
    4: '>40,000',
    5: '>50,000',
  },

  filterAvgVolumeClosing: {
    1: '>100,000',
    2: '>200,000',
    3: '>300,000',
    4: '>400,000',
    5: '>500,000',
  },

  filterExceedPercent: {
    1: '20%',
    2: '40%',
    3: '60%',
    4: '80%',
    5: '100%',
  },

  filterRate: {
    1: '>1',
    2: '>1.5',
    3: '>2',
    4: '>2.5',
    5: '>3',
  },

  filterOrderType: {
    more: 'More than',
    less: 'Less than',
  },

  filterPressingOrderType: {
    1: 'Buy',
    2: 'Sell',
    3: 'Both',
  },

  filterProportion: {
    1: '>10%',
    2: '>30%',
    3: '>50%',
    4: '>70%',
  },

  filterVolumeBU_SD: {
    1: '0.3',
    2: '0.6',
    3: '1.0',
    4: '1.5',
    5: '2.0',
  },

  opverviewWatchlist: {
    watchList1: 'Watch List 1',
    watchList2: 'Watch List 2',
  },

  deceptiveDataMessage: {
    noDataForFilter: 'There is no matching stock under defined conditions.',
    nodataClosing: 'Data is available after 2 PM.',
  },

  methodology: 'METHODOLOGY_v',
  listOfFeature: {
    VolPriceIncrease: 'Volume increase & price increase interface_v',
    VolIncPriceDecr: 'Volume increase & price decrease interface_v',
    PriceIncrease: 'Prce increase in many session consecutively_v',
    PriceDecr: 'Price decrease in many session consecutively_v',
    VolIncrease: 'Volume increase in many session consecutively_v',
  },
  tootipNameOfFeature:
    'The estimated volume is caculated per session by FiinTrade_v',
  priceVolumeHeader: {
    ticker: 'SYMBOL',
    price: 'PRICE',
    volume: 'VOLUME',
    volume_expected: 'Volume<br>(expected)</br>',
    nrOfDay: 'NR.OF DAY',
    lastClose: 'LAST CLOSE',
    lastVol: 'LAST VOL.',
    RSI: 'RSI14',
    ranking: 'RANKING',
  },
};
