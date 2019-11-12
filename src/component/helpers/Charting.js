import { THEMES } from '../../configs/LayoutConfig';

export const getOverrides = theme => {
  return {
    'mainSeriesProperties.candleStyle.upColor': '#379448',
    'mainSeriesProperties.candleStyle.borderUpColor': '#026E30',
    'mainSeriesProperties.candleStyle.downColor': '#BB0001',
    'mainSeriesProperties.candleStyle.borderDownColor': '#9A0000',
    'mainSeriesProperties.barStyle.upColor': '#379448',
    'mainSeriesProperties.barStyle.downColor': '#BB0001',
    'paneProperties.background': theme === THEMES.DARK ? '#1F2329' : '#ffffff',
    'paneProperties.vertGridProperties.color':
      theme === THEMES.DARK ? '#1F2329' : '#ffffff',
    'paneProperties.horzGridProperties.color':
      theme === THEMES.DARK ? '#1F2329' : '#ffffff',
  };
};

export const commonConfig = {
  autosize: true,
  timezone: 'Asia/Bangkok',
  debug: false,
  disabled_features: [
    'header_saveload',
    'header_screenshot',
    'header_fullscreen_button',
    'use_localstorage_for_settings',
    'display_market_status',
    'symbol_search_hot_key',
    'show_dialog_on_snapshot_ready',
  ],
  enabled_features: ['countdown'],
  indicators_file_name: '/charting_library/indicators.js',
  studies_overrides: {
    'volume.volume.color.0': '#BB0001',
    'volume.volume.color.1': '#379448',
  },
  time_frames: [
    { text: '1d', resolution: '1', title: '1D' },
    { text: '5d', resolution: '5', title: '5D' },
    { text: '1m', resolution: 'D', title: '1M' },
    { text: '3m', resolution: 'D', title: '3M' },
    { text: '1y', resolution: 'D', title: '1Y' },
    { text: '5y', resolution: 'W', title: '5Y' },
  ],
  custom_css_url: '/charting_library/style.css',
};
