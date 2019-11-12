import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { ChanelConfig } from '../../../../../configs/GlobalConfig';
import messageHub from '../../../../../core/signalr/SignalrMessageHub';
import Loading from '../../../../common/loading/Loading';
import Tab from '../../../../common/tab-timer';
import { formatTextFloat, formatValueBillion } from '../../../../helpers/Text';
import { setRealtimeData } from '../../reducer';
import TreeMap from './TreeMap';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './../../reducer';

const XS_SIZE = 800;

const TIMES = {
  TODAY: 1,
  ONE_WEEK: 2,
  ONE_MONTH: 3,
  YEAR_TO_DATE: 4,
};

const mapTimesToValue = {
  [TIMES.TODAY]: 'today',
  [TIMES.ONE_WEEK]: 'oneWeek',
  [TIMES.ONE_MONTH]: 'oneMonth',
  [TIMES.YEAR_TO_DATE]: 'yearToDate',
};

class BuySellTreeMap extends PureComponent {
  state = {
    currentFilter: TIMES.TODAY,
  };

  componentDidMount() {
    const { isRealtimeTicker } = this.props;
    if (isRealtimeTicker) {
      messageHub.subscribe(ChanelConfig.TickChanel, this.onReceiveTickers);
    }
  }

  componentWillUnmount() {
    const { isRealtimeTicker } = this.props;
    if (isRealtimeTicker) {
      messageHub.unsubscribe(ChanelConfig.TickChanel, this.onReceiveTickers);
    }
  }

  onReceiveTickers = tickers => {
    const { setRealtimeData } = this.props;
    setRealtimeData(tickers);
  };

  changeFilter = filter => {
    this.setState({
      currentFilter: filter,
    });
  };

  isXsSize = () => {
    const { component } = this.props;

    return component.width < XS_SIZE;
  };

  getWrapperClassName = () => {
    return this.isXsSize() ? 'flex-column' : 'flex-row';
  };

  getSellTreeMapClassName = () => {
    return this.isXsSize() ? 'mt-10' : 'ml-10';
  };

  render() {
    const { currentFilter } = this.state;
    const {
      data,
      isLoading,
      height,
      buyKey,
      sellKey,
      renderSellTooltip,
      renderBuyTooltip,
      isRealtimeTicker,
    } = this.props;
    const currentData = data[mapTimesToValue[currentFilter]];
    if (!currentData) {
      if (isLoading) {
        return (
          <div className="flex-fill">
            <Loading />
          </div>
        );
      }
      return <div className="flex-fill" />;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div
        className={`flex-fill mb-20 d-flex flex-column position-relative ${
          isLoading ? 'bg-blur' : ''
        }`}
      >
        <div>
          <Tab
            disableTabNormal={true}
            currentTab={currentFilter}
            listTab="moneyFlowProprietary.timeTab"
            changeTab={this.changeFilter}
          />
        </div>

        <div
          className={`flex-fill d-flex ${this.getWrapperClassName()} buy-sell-tree-map position-relative`}
        >
          <div className="tree-map-wrapper d-flex flex-column">
            <TreeMap
              isRealtimeTicker={isRealtimeTicker}
              renderTooltip={renderBuyTooltip}
              valueAttr={buyKey}
              height={height}
              title={
                <Translate
                  value="moneyFlowProprietary.treeMapBuyTitle"
                  tradeValue={formatTextFloat(
                    formatValueBillion(currentData[buyKey]),
                  )}
                />
              }
              noDataTitleKey="moneyFlowCommon.noDataBuy"
              data={currentData.buy}
            />
          </div>

          <div
            className={`tree-map-wrapper d-flex flex-column ${this.getSellTreeMapClassName()}`}
          >
            <TreeMap
              isRealtimeTicker={isRealtimeTicker}
              renderTooltip={renderSellTooltip}
              valueAttr={sellKey}
              height={height}
              title={
                <Translate
                  value="moneyFlowProprietary.treeMapSellTitle"
                  tradeValue={formatTextFloat(
                    formatValueBillion(currentData[sellKey]),
                  )}
                />
              }
              noDataTitleKey="moneyFlowCommon.noDataSell"
              data={currentData.sell}
            />
          </div>
        </div>
      </div>
    );
  }
}

BuySellTreeMap.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  height: PropTypes.number,
  buyKey: PropTypes.string,
  sellKey: PropTypes.string,
  renderBuyTooltip: PropTypes.func.isRequired,
  renderSellTooltip: PropTypes.func.isRequired,
  isRealtimeTicker: PropTypes.bool,
  setRealtimeData: PropTypes.func.isRequired,
};

BuySellTreeMap.defaultProps = {
  isLoading: false,
  data: null,
  height: null,
  buyKey: 'totalBuyTradeValue',
  sellKey: 'totalSellTradeValue',
  isRealtimeTicker: false,
};

const mapStateToProps = state => ({
  component: state[REDUCER_NAME].component,
});

const mapDispatchToProps = {
  setRealtimeData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuySellTreeMap);
