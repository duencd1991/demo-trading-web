import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { THEMES } from '../../../../configs/LayoutConfig';
import {
  LAYOUT_ITEM_DESTROYED,
  LAYOUT_STACK_CREATED,
} from '../../../common/GoldenLayoutWrapper';
import { commonConfig, getOverrides } from '../../../helpers/Charting';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import Layout from '../../../helpers/Layout';
import { fetchTemplateRequest } from '../reducer';
import DataFeed from '../../../../core/services/Technical/DataFeed';
import LoadTemplatePopup from './components/load-template/LoadTemplatePopup';
import SaveTemplatePopup from './components/save-template/SaveTemplatePopup';
import { Provider } from '../context';
import SharePopup from './components/share-popup/SharePopup';
import { capitalizeFirstLetter } from './helper';
import { compose } from 'redux';

const LOCAL_STORAGE_KEY = 'CHARTING_DATA';
const ITEM_DESTROYED_WAIT = 20;

class TradingView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoadTemplatePopup: false,
      isShowSaveTemplate: false,
      isShowShare: false,
    };

    this.rootRef = React.createRef();
    this.debounceOnItemDestroyed = debounce(
      this.reInitChartWhenLayoutChange,
      ITEM_DESTROYED_WAIT,
    );
    this.prevIsMaximised = false;
  }

  componentDidMount() {
    this.initTimeout = setTimeout(() => {
      this.iniTradingView();
    }, 0);
    this.loadTemplate();
    window.addEventListener(
      LAYOUT_ITEM_DESTROYED,
      this.debounceOnItemDestroyed,
    );
    window.addEventListener(
      LAYOUT_STACK_CREATED,
      this.reInitChartWhenLayoutChange,
    );
    this.calcSize();
    Layout.layout.on('stateChanged', this.onGlStateChanged);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { theme } = this.props;
    if (theme !== prevProps.theme) {
      this.tvWidget.changeTheme(capitalizeFirstLetter(theme));
      this.tvWidget.applyOverrides(getOverrides(theme));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.initTimeout);
    window.removeEventListener(
      LAYOUT_ITEM_DESTROYED,
      this.debounceOnItemDestroyed,
    );
    window.removeEventListener(
      LAYOUT_STACK_CREATED,
      this.reInitChartWhenLayoutChange,
    );
    clearTimeout(this.sizeTimeout);
  }

  onGlStateChanged = () => {
    const { glContainer } = this.props;
    if (this.prevIsMaximised !== glContainer.parent.parent.isMaximised) {
      this.iniTradingView();
      this.prevIsMaximised = glContainer.parent.parent.isMaximised;
    }
  };

  calcSize = () => {
    this.getRootSize().then(({ width, height }) => {
      this.width = width;
      this.height = height;
    });
  };

  reInitChartWhenLayoutChange = () => {
    if (!this.rootRef.current) {
      return;
    }
    this.getRootSize().then(({ width, height }) => {
      if (width !== this.width || height !== this.height) {
        this.iniTradingView();
        this.width = width;
        this.height = height;
      }
    });
  };

  getRootSize = () =>
    new Promise(resolve => {
      this.sizeTimeout = setTimeout(() => {
        const { width, height } = this.rootRef.current.getBoundingClientRect();

        resolve({ width, height });
      }, 0);
    });

  getContainerId = () => {
    const { id, containerId } = this.props;

    return `${id}_${containerId}`;
  };

  getI18nText = key => {
    const { i18n } = this.props;

    return getDataFollowKeyByDot(i18n.translations[i18n.locale], key);
  };

  loadTemplate = () => {
    const { fetchTemplateRequest } = this.props;
    fetchTemplateRequest();
  };

  changeLoadPopupStatus = (bool = true) => {
    this.setState({
      isShowLoadTemplatePopup: bool,
    });
  };

  changeSaveTemplateStatus = (bool = true) => {
    this.setState({
      isShowSaveTemplate: bool,
    });
  };

  changeSharePopupStatus = (bool = true) => {
    this.setState({
      isShowShare: bool,
    });
  };

  iniTradingView = () => {
    const {
      theme,
      i18n,
      symbol,
      interval,
      libraryPath,
      chartsStorageUrl,
      chartsStorageApiVersion,
      clientId,
      userId,
      fullscreen,
    } = this.props;
    const savedData = this.getSavedData();

    const widgetOptions = {
      ...commonConfig,
      locale: i18n.locale,
      symbol: symbol,
      datafeed: DataFeed,
      interval: interval,
      container_id: this.getContainerId(),
      library_path: libraryPath,
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: fullscreen,
      snapshot_url:
        'http://42.112.22.42:2001/UserSetting/ExtractChartLayoutContnent',
      overrides: getOverrides(theme),
      loading_screen: {
        backgroundColor: theme === THEMES.DARK ? '#1F2329' : '#ffffff',
      },
      theme:
        savedData && savedData.theme
          ? savedData.theme
          : capitalizeFirstLetter(theme),
      ...(savedData ? { saved_data: savedData } : {}),
    };
    this.tvWidget = new window.TradingView.widget(widgetOptions);

    this.tvWidget.onChartReady(() => {
      this.addLoadTemplateBtn();
      this.addSaveTemplateBtn();
      this.addShareBtn();

      // Subscribe
      this.tvWidget.subscribe('onAutoSaveNeeded', this.onAutoSaveNeeded);
    });
  };

  addSaveTemplateBtn = () => {
    const button = this.tvWidget
      .createButton()
      .attr('title', this.getI18nText('charting.saveTemplate'))
      .addClass('apply-common-tooltip')
      .on('click', () => {
        this.changeSaveTemplateStatus();
      });

    button[0].innerHTML = this.getI18nText('charting.saveTemplate');
  };

  addLoadTemplateBtn = () => {
    const button = this.tvWidget
      .createButton()
      .attr('title', this.getI18nText('charting.loadTemplate'))
      .addClass('apply-common-tooltip')
      .on('click', () => {
        this.changeLoadPopupStatus();
      });

    button[0].innerHTML = this.getI18nText('charting.loadTemplate');
  };

  addShareBtn = () => {
    const button = this.tvWidget
      .createButton({ align: 'right' })
      .attr('title', this.getI18nText('charting.shareTemplate'))
      .addClass('apply-common-tooltip')
      .on('click', () => {
        this.changeSharePopupStatus();
      });

    button[0].innerHTML = this.getI18nText('charting.share');
  };

  onAutoSaveNeeded = () => {
    const { theme } = this.props;
    this.tvWidget.save(chartState => {
      chartState.theme = capitalizeFirstLetter(theme);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chartState));
    });
  };

  getSavedData = () => {
    return null;
    const savedString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedString) {
      return null;
    }

    return JSON.parse(savedString);
  };

  render() {
    const {
      isShowLoadTemplatePopup,
      isShowSaveTemplate,
      isShowShare,
    } = this.state;

    return (
      <Provider value={this.tvWidget}>
        <div ref={this.rootRef} className="h-100 position-relative">
          <div id={this.getContainerId()} className="h-100" />

          {isShowLoadTemplatePopup && (
            <LoadTemplatePopup changePopUpStatus={this.changeLoadPopupStatus} />
          )}
          {isShowSaveTemplate && (
            <SaveTemplatePopup
              changeSaveTemplateStatus={this.changeSaveTemplateStatus}
            />
          )}
          {isShowShare && (
            <SharePopup changeSharePopupStatus={this.changeSharePopupStatus} />
          )}
        </div>
      </Provider>
    );
  }
}

TradingView.propTypes = {
  theme: PropTypes.string.isRequired,
  fetchTemplateRequest: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

TradingView.defaultProps = {
  symbol: 'HPG',
  interval: 'D',
  containerId: 'tv_chart_container',
  libraryPath: '/charting_library/',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  studiesOverrides: {},
};

const mapStateToProps = ({ theme, i18n }) => ({ theme, i18n });
const mapDispatchToProps = { fetchTemplateRequest };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TradingView);
