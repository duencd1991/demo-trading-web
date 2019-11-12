import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommonCost from '../../common/Const';
import { I18n } from 'react-redux-i18n';
import withMarketPreOpen from '../../common/market-pre-open/withMarketPreOpen';

import {
  fetchDataTimeAndSale,
  fetchListSearch,
  changeCode,
  fetchInfoTicker,
  subscribeRealtimeTick,
} from './reducer';

import Footer from '../../common/table/Footer';
import GroupButton from './top-content/group-button';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import './index.scss';
import ScrollComponent from './../../common/ScrollComponent';
import { Provider } from './../../common/ComponentIdContext';
import Search from './Search';
import TopInfoContent from './TopInfoContent';
import { Export } from '../../common/export';
import Content from './Content';
import ConstCommon from './../../common/Const';
import withPreRender from './../../common/withPreRender';
import { compose } from 'redux';

class TimeAndSale extends Component {
  getDefaultCode = () => {
    const { dragCode } = this.props;

    return dragCode ? dragCode.organCode : 'AAA';
  };

  componentDidMount() {
    const {
      fetchInfoTicker,
      fetchDataTimeAndSale,
      fetchListSearch,
      id,
      dragCode,
      changeCode,
    } = this.props;
    MessageHub.subscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
    const code = this.getDefaultCode();
    fetchInfoTicker(id, code);
    const params = dragCode ? { Code: dragCode.organCode } : {};
    fetchDataTimeAndSale(params, id);
    fetchListSearch();
    if (dragCode) {
      changeCode(
        {
          code: dragCode.organCode,
          displayCode: dragCode.ticker,
          codeName: dragCode.organShortName,
          exchange: CommonCost.listExchange[dragCode.comGroupCode],
        },
        id,
        false,
      );
    }
  }

  dispatchDataRealtimeTick = data => {
    const { subscribeRealtimeTick, id } = this.props;
    subscribeRealtimeTick(data, id);
  };

  componentWillUnmount() {
    MessageHub.unsubscribe(
      ChanelConfig.TickChanel,
      this.dispatchDataRealtimeTick,
    );
  }

  render() {
    const { id } = this.props;

    return (
      <Provider value={id}>
        <ScrollComponent appendClassName="ts-wrapper">
          <div className="px-20 pt-8 pb-10">
            <div>
              <div className="ts-top-navigation">
                <div className="ts-top-navigation--left">
                  <div style={{ minWidth: 200, marginRight: 20 }}>
                    <Search />
                  </div>
                  <TopInfoContent />
                  <GroupButton />
                </div>
                <div className="ts-top-navigation--right">
                  <Export
                    exportId={`time-and-sale-export-${id}`}
                    exportName={`time-and-sale-${id}.png`}
                    title={I18n.t(`timeAndSale.action.export`)}
                  />
                </div>
              </div>
              <div className="ts-body">
                <Content />
              </div>
            </div>
            <div className="mb-8">
              <Footer
                listTextLang={[
                  {
                    text: I18n.t(`common.table.SIMPLE_TABLE_FOOTER_TEXT`),
                  },
                ]}
              />
            </div>
          </div>
        </ScrollComponent>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  fetchDataTimeAndSale,
  changeCode,
  fetchListSearch,
  fetchInfoTicker,
  subscribeRealtimeTick,
};

export default compose(
  withPreRender(ConstCommon.listComponent.TimeAndSales),
  connect(
    null,
    mapDispatchToProps,
  ),
  withMarketPreOpen(),
)(TimeAndSale);
