import React from 'react';
import { THEMES } from '../../configs/LayoutConfig';
import userSettingService from '../../core/services/Common/UserSettingService';
import DataFeed from '../../core/services/Technical/DataFeed';
import ChartingPreRender from '../common/ChartingPreRender';
import { commonConfig, getOverrides } from '../helpers/Charting';
//TODO import authProvider from './../../core/AuthenticationProvider';

const capitalizeFirstLetter = string => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

class Charting extends React.PureComponent {
  constructor(props) {
    super(props);

    //TODO authProvider
    //   .getUser()
    //   .then(user => {
    //     if (!user || user.expired) {
    //       alert('Your login session is expired! Please login again.');
    //       window.location = '/';
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     window.location = '/';
    //   });

    this.rootRef = React.createRef();
    this.query = new URLSearchParams(window.location.search);
    this.state = {
      isRender: this.getIsRender(),
    };
  }

  componentDidMount() {
    const { isRender } = this.state;
    if (isRender) {
      this.initTimeout = setTimeout(() => {
        this.iniTradingView();
      }, 0);
      return;
    }
    this.getSharedTemplate();
  }

  componentWillUnmount() {
    clearTimeout(this.initTimeout);
  }

  getSharedTemplate = () => {
    const shareId = this.query.get('shareId');
    const chartLayoutId = this.query.get('chartLayoutId');
    const signature = this.query.get('signature');

    userSettingService
      .getSharedChartLayout({
        ShareId: shareId,
        ChartLayoutId: chartLayoutId,
        Signature: signature,
      })
      .then(res => {
        const chartState = JSON.parse(res.items[0].layout);
        this.iniTradingView(chartState);
      });
  };

  getIsRender = () => {
    return !this.query.get('shareId');
  };

  getContainerId = () => 'trading_view';

  getTheme = () => {
    return capitalizeFirstLetter(this.query.get('theme')) || 'Light';
  };

  getSymbol = () => {
    return this.query.get('code') || 'AAA';
  };

  getLocale = () => {
    return this.query.get('lang') || 'en';
  };

  iniTradingView = chartState => {
    const {
      interval,
      libraryPath,
      chartsStorageUrl,
      chartsStorageApiVersion,
      clientId,
      userId,
      fullscreen,
    } = this.props;

    const widgetOptions = {
      ...commonConfig,
      saved_data: chartState || null,
      locale: this.getLocale(),
      symbol: this.getSymbol(),
      datafeed: DataFeed,
      interval: interval,
      container_id: this.getContainerId(),
      library_path: libraryPath,
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: fullscreen,
      overrides: getOverrides(this.query.get('theme')),
      loading_screen: {
        backgroundColor:
          this.query.get('theme') === THEMES.LIGHT ? '#ffffff' : '#1F2329',
      },
      theme: chartState ? chartState.theme : this.getTheme(),
    };
    this.tvWidget = new window.TradingView.widget(widgetOptions);
  };

  render() {
    return <div id={this.getContainerId()} style={{ height: '100vh' }} />;
  }
}

Charting.defaultProps = {
  interval: 'D',
  libraryPath: 'tv114/charting_library/',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  chartsStorageApiVersion: '1.3',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
};

export default () => (
  <ChartingPreRender>
    <Charting />
  </ChartingPreRender>
);
