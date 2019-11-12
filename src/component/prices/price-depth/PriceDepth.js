import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import withMarketPreOpen from '../../common/market-pre-open/withMarketPreOpen';

import {
  fetchDataPriceDepth,
  setCondition,
  fetchListSearch,
  REDUCER_NAME,
  subscribeRealtimeBidAsk,
  subscribeRealtimeTick,
} from './reducer';

import IndexSummary from './top-content/index-summary';
import GroupButton from './top-content/group-button';
import IndexInfor from '../common/index-info';
import SwitchTab from './body-content/switch-tab';
import BoxContent from './body-content/box-content';
import InforBoard from './body-content/infor-board';
import { getDataFollowKeyByDot } from './../../helpers/Common';
import Const from './Const';
import ConstCommon from '../../common/Const';
import './index.scss';
import { SearchFilter } from '../../common/search-filter';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import { Export } from '../../common/export';
import Footer from '../../common/table/Footer';
import ScrollComponent from './../../common/ScrollComponent';
import withPreRender from './../../common/withPreRender';
import { compose } from 'redux';

const initialState = {
  currentTab: 1,
  isPremiumAccount: false,
  relatedInformations: {},
  symbolInformation: {},
  list3Data: null,
  list10Data: null,
};

class PriceDepth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
      isPremiumAccount: false,
      relatedInformations: {},
      symbolInformation: {},
      list10Data: null,
    };
  }

  componentDidMount() {
    const {
      fetchDataPriceDepth,
      fetchListSearch,
      id,
      dragCode,
      setCondition,
    } = this.props;
    const params = dragCode
      ? {
          code: dragCode.organCode,
        }
      : {};
    fetchDataPriceDepth(params, id);
    fetchListSearch();
    MessageHub.subscribe(
      ChanelConfig.BidAskChannel,
      this.dispatchDataRealtimeBidAsk,
    );
    MessageHub.subscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
    if (dragCode) {
      setCondition(
        {
          code: dragCode.organCode,
          displayCode: dragCode.ticker,
          codeName: dragCode.organShortName,
          exchange: ConstCommon.listExchange[dragCode.comGroupCode],
        },
        id,
      );
    }
  }

  componentWillUnmount() {
    MessageHub.unsubscribe(
      ChanelConfig.BidAskChannel,
      this.dispatchDataRealtimeBidAsk,
    );
    MessageHub.unsubscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  getDefaultCode = () => {
    const { dragCode } = this.props;

    return dragCode ? dragCode.organCode : 'AAA';
  };

  dispatchDataRealtimeTick = data => {
    const { subscribeRealtimeTick, listMultiCondition, id } = this.props;
    let code = this.getDefaultCode();
    if (Object.keys(listMultiCondition).length && listMultiCondition[id])
      code = listMultiCondition[id].condition.code;
    subscribeRealtimeTick(data, code, id);
  };

  dispatchDataRealtimeBidAsk = data => {
    const { subscribeRealtimeBidAsk, listMultiCondition, id } = this.props;
    let code = this.getDefaultCode();
    if (Object.keys(listMultiCondition).length && listMultiCondition[id])
      code = listMultiCondition[id].condition.code;
    subscribeRealtimeBidAsk(data, code, id);
  };

  componentWillReceiveProps(nextProps) {
    const {
      listMultiComponent,
      listMultiCondition,
      fetchDataPriceDepth,
      id,
    } = this.props;
    // todo: refresh data when change search key
    if (
      Object.keys(listMultiCondition).length &&
      listMultiCondition[id] != nextProps.listMultiCondition[id]
    ) {
      fetchDataPriceDepth(nextProps.listMultiCondition[id].condition, id);
    }

    // todo: check list component from nextProps to set new data
    if (
      listMultiComponent[id] &&
      listMultiComponent[id].priceDepthData &&
      (nextProps.listMultiComponent[id] &&
        nextProps.listMultiComponent[id].priceDepthData)
    ) {
      if (Object.keys(nextProps.listMultiComponent[id].priceDepthData).length) {
        const nextPriceDepthData =
          nextProps.listMultiComponent[id].priceDepthData;
        const { isDerivatives } = nextProps.listMultiCondition[id].condition;
        const { extraInfo = null } = nextPriceDepthData;
        const relatedInformations = {
          BID: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.BID,
          ),
          ASK: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.ASK,
          ),
          Fr_Buy_Vol: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.Fr_Buy_Vol,
          ),
          Fr_Sell_Vol: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.Fr_Sell_Vol,
          ),
          VOLUME: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.VOLUME,
          ),
          AVG_PRICE:
            getDataFollowKeyByDot(
              nextPriceDepthData,
              Const.relatedInformations.TOTAL_MATCH_VALUE,
            ) /
            getDataFollowKeyByDot(
              nextPriceDepthData,
              Const.relatedInformations.TOTAL_MATCH_VOLUME,
            ),
          RANKING: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.RANKING,
          ),
        };

        if (!isDerivatives && extraInfo) {
          relatedInformations.AVG_Vol_1M = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.AVG_Vol_1M,
          );
          relatedInformations.AVG_Vol_10D = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.AVG_Vol_10D,
          );
          relatedInformations.PE = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.PE,
          );
          relatedInformations.ROE = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.ROE,
          );
          relatedInformations.PB = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.PB,
          );
          relatedInformations.FOREIGN_OWNER = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.FOREIGN_OWNER,
          );
          relatedInformations.EPS = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.EPS,
          );
          relatedInformations.BETA = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.BETA,
          );
          relatedInformations.FOREIGN_OWNER = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.FOREIGN_OWNER,
          );
          relatedInformations.MARKET_CAP = getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.relatedInformations.MARKET_CAP,
          );
        }

        const symbolInformation = {
          MatchPrice: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.MATCH_PRICE,
          ),
          PriceChange: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.PRICE_CHANGE,
          ),
          PercentPriceChange: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.PERCENT_PRICE_CHANGE,
          ),
          OpenPrice: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.OPEN_PRICE,
          ),
          HighestPrice: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.HIGHEST_PRICE,
          ),
          LowestPrice: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.LOWEST_PRICE,
          ),
          Bid: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.BID,
          ),
          Ask: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.ASK,
          ),
          ReferencePrice: getDataFollowKeyByDot(
            nextPriceDepthData,
            Const.symbolInformation.REFERENCE_PRICE,
          ),
        };

        const list10Data = Const.list10Data.map((_, index) => {
          return {
            BID:
              getDataFollowKeyByDot(
                nextPriceDepthData,
                Const.list10Data[index].BID,
              ) || 0,
            BID_VOLUME:
              getDataFollowKeyByDot(
                nextPriceDepthData,
                Const.list10Data[index].BID_VOLUME,
              ) || 0,
            ASK:
              getDataFollowKeyByDot(
                nextPriceDepthData,
                Const.list10Data[index].ASK,
              ) || 0,
            ASK_VOLUME:
              getDataFollowKeyByDot(
                nextPriceDepthData,
                Const.list10Data[index].ASK_VOLUME,
              ) || 0,
          };
        });

        this.setState({
          relatedInformations,
          symbolInformation,
          list10Data,
        });
      } else this.setState({ ...initialState });
    }
  }

  changeTab = currentTab => {
    this.setState({ currentTab });
  };

  upgradeAccount = () => {
    this.setState({ isPremiumAccount: true });
  };

  getDataIndexSummary = (realTimeData, data) => {
    if (Object.keys(realTimeData).length) {
      // if (Object.keys(realTimeData).length === 2) return data;
      return realTimeData.symbolInformation;
    }
    return data;
  };

  getDataIndexInfor = (realTimeData, data) => {
    // if (Object.keys(realTimeData).length) {
    //   if (!('BID' in realTimeData) || !('ASK' in realTimeData)) {
    //     realTimeData.symbolInformation.BID = data.BID
    //     realTimeData.symbolInformation.ASK = data.ASK
    //   }

    //   return realTimeData.symbolInformation
    // }
    return data;
  };

  getList10Data = (realTimeData, data) => {
    if (Object.keys(realTimeData).length && 'LIST_10_DATA' in realTimeData) {
      return realTimeData.LIST_10_DATA;
    }
    return data;
  };

  render() {
    const {
      currentTab,
      isPremiumAccount,
      relatedInformations,
      symbolInformation,
      list10Data,
    } = this.state;
    const { id, listMultiCondition, listMultiComponent } = this.props;
    const realTimeData =
      id in listMultiComponent && Object.keys(listMultiComponent).length !== 0
        ? listMultiComponent[id].realTimeData
        : {};
    const currentSearch =
      id in listMultiCondition
        ? listMultiCondition[id].condition
        : {
            displayCode: 'AAA',
            code: 'AAA',
          };

    let isDerivatives = false;
    if (id in listMultiCondition) {
      isDerivatives = listMultiCondition[id].condition.isDerivatives;
    }
    return (
      <div
        id={`price-depth-export-${id}`}
        className="h-100"
        style={{ overflow: 'auto' }}
      >
        <ScrollComponent>
          <div className="price-depth-wrapper ">
            <div className="pt-8 pb-10 px-20">
              <div className="pd-top-navigation">
                <div className="pd-top-navigation--left">
                  <div style={{ minWidth: 200, marginRight: 20 }}>
                    <SearchFilter
                      schema={[
                        { key: 'displayCode', className: 'w-20' },
                        { key: 'codeName', className: 'w-55 text-truncate' },
                        {
                          key: 'exchange',
                          className: 'w-25',
                          render: text => text.toUpperCase(),
                        },
                      ]}
                      isShowSmallInfoTicker={true}
                      listKeyFilter={['displayCode', 'codeName']}
                      getListSearchFromRedux={state =>
                        state[REDUCER_NAME].listDataSearch
                      }
                      currentSearch={currentSearch}
                      tickerNameAndExchange={
                        id in listMultiCondition
                          ? listMultiCondition[id].condition.companyName
                          : 'An Phat Plastic'
                      }
                      mainKey={'code'}
                      sortKey={'displayCode'}
                      clickItemSearch={code => {
                        this.props.clickItemSearch(code, id);
                      }}
                    />
                  </div>
                  <IndexSummary
                    isDerivatives={isDerivatives}
                    keyToCompare={'TradingDate'}
                    data={this.getDataIndexSummary(
                      realTimeData,
                      symbolInformation,
                    )}
                  />
                  <IndexInfor
                    isDerivatives={isDerivatives}
                    data={this.getDataIndexInfor(
                      realTimeData,
                      symbolInformation,
                    )}
                  />
                  <GroupButton />
                </div>
                <div className="pd-top-navigation--right">
                  <Export
                    exportId={`price-depth-export-${id}`}
                    exportName={`price-depth-${id}.png`}
                    title={I18n.t('priceDepth.action.export')}
                  />
                </div>
              </div>
              <div className="pd-body">
                <div className="left-content">
                  <SwitchTab
                    isPremiumAccount={isPremiumAccount}
                    changeTab={this.changeTab}
                  />
                  <BoxContent
                    isDerivatives={isDerivatives}
                    currentTab={currentTab}
                    isPremiumAccount={isPremiumAccount}
                    upgradeAccount={this.upgradeAccount}
                    list10Data={this.getList10Data(realTimeData, list10Data)}
                    symbolInformation={this.getDataIndexInfor(
                      realTimeData,
                      symbolInformation,
                    )}
                  />
                </div>
                <div className="right-content">
                  <InforBoard
                    relatedInformations={relatedInformations}
                    isDerivatives={isDerivatives}
                  />
                </div>
              </div>
            </div>
            <div className="p-10">{!isDerivatives && <Footer />}</div>
          </div>
        </ScrollComponent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state[REDUCER_NAME].isFetching,
    priceDepthData: state[REDUCER_NAME].priceDepthData,
    i18n: state.i18n,
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    listMultiCondition: state[REDUCER_NAME].listMultiCondition,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDataPriceDepth: (params, id) =>
      dispatch(fetchDataPriceDepth(params, id)),
    setCondition: (value, id) => dispatch(setCondition(value, id)),
    fetchListSearch: () => dispatch(fetchListSearch()),
    clickItemSearch: (code, id) => dispatch(setCondition(code, id)),
    subscribeRealtimeBidAsk: (data, code, id) =>
      dispatch(subscribeRealtimeBidAsk(data, code, id)),
    subscribeRealtimeTick: (data, code, id) =>
      dispatch(subscribeRealtimeTick(data, code, id)),
  };
};

export default compose(
  withPreRender(ConstCommon.listComponent.PriceDepth),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withMarketPreOpen(),
)(PriceDepth);
