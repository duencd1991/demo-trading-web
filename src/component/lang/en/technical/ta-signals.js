export default {
  lstTab: {
    indicators: 'Indicators',
    deceptiveOrder: 'Deceptive Orders',
    priceVolume: 'Price–Volume Analysis',
  },

  deceptiveTab: {
    overview: 'OVERVIEW',
    abnormaly: 'CE / FL ABNORMALITY',
    cancelled: 'CANCELLED',
    pressing: 'PRESSING',
    aggressive: 'AGGRESSIVE',
    closing: 'CLOSING',
  },

  overviewHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    PERCENT_PRICE_CHANGE: '% 1D',
    VOLUME: 'VOLUME',
    CE_FL: 'CE / FL',
    CANCELED: 'CANCELLED',
    PRESSING: 'PRESSING',
    AGGRESSIVE: 'AGGRESSIVE',
    CLOSING: 'CLOSING',
  },

  overviewContent: {
    ceflTooltip:
      'Stocks are overbought at ceiling price or oversold at floor price',
    cancelledTooltip: 'Stocks are bought then the orders are cancelled',
    pressingTooltip:
      'Stocks are bought with high volume to influence the price',
    aggressiveTooltip: 'Stocks are bought and sold quickly to earn profit',
    closingTooltip: 'Stocks are bought and sold at the close of the market',
  },

  ceflAbnormalityHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOLUME: 'VOL.',
    AVG_VOLUME: 'VOL.<br>(AVG. 10D)</br>',
    VOLUME_CE_FL_UNMATCHED: 'VOL.<br>(UNMATCHED CE / FL)</br>',
    RATIO: 'RATIO',
    SESSION: 'SESSION',
    PREV_SESSION: 'SESSION<br>(PREVIOUS)</br>',
    RANK: 'RANKING',
  },

  cancelledHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOLUME: 'VOL.',
    NR_CO: 'NR. OF CO',
    VOL_CO: 'VOL. OF CO',
    NR_CO_BUY: 'NR. OF CO<br>(BUY)</br>',
    VOL_CO_BUY: 'VOL. OF CO<br>(BUY)</br>',
    NR_CO_SELL: 'NR. OF CO<br>(SELL)</br>',
    VOL_SELL: 'VOL. OF CO<br>(SELL)</br>',
  },

  aggressiveHeader: {
    TICKER: 'TICKER',
    PRICE: 'PRICE',
    VOLUME: 'VOL.',
    VOLUME_BU_SD: 'VOL.<br>(BU/SD)</br>',
    AVG_VOLUME: 'AVG.VOL.<br>(10D)</br>',
    TOTAL_VOLUME_BU: 'TOTAL VOL. BU',
    TOTAL_VOLUME_SD: 'TOTAL VOL. SD',
    RANK: 'RANKING',
  },

  aggressiveContent: {
    tooltipContent: 'Stocks have an imbalance in buy up or sell down',
    line_1: 'Aggressive Orders',
    line_2: 'Average Volume 10D',
    line_3: 'Total Volume BU / SD',
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
    line_1: 'CE / FL Abnormality',
    line_2: 'Abnormality Type',
    line_3: 'Average Volume 10D',
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
    filter_quote_1: 'bought at ceiling price ',
    filter_quote_2: 'sold at floor price ',
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

  methodology: 'METHODOLOGY',
  listOfFeature: {
    VolPriceIncrease: 'Volume Increase & Price Increase',
    VolIncPriceDecr: 'Volume Increase & Price Decrease',
    PriceIncrease: 'Price Increase in Many Sessions',
    PriceDecr: 'Price Decrease in Many Sessions',
    VolIncrease: 'Volume Increase in Many Sessions',
  },
  tootipNameOfFeature:
    'The estimated volume is caculated per session by FiinTrade',
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
